import Stripe from 'stripe';

export const onRequestPost = async (context: any) => {
    const { env, request } = context;
    const stripe = new Stripe(env.STRIPE_SECRET_KEY);
    const signature = request.headers.get('stripe-signature');

    try {
        // 1. Verify the request came from Stripe
        const body = await request.text();
        const event = await stripe.webhooks.constructEventAsync(
            body,
            signature,
            env.STRIPE_WEBHOOK_SECRET
        );

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const planSlug = session.metadata?.planSlug;
            const customerEmail = session.customer_details?.email;
            const customerName = session.customer_details?.name || 'Valued Customer';

            console.log(`🚀 Payment Success! Unlocking vault for: ${planSlug}`);

            // 2. Corrected Query based on Vision Output (image_5f3ce1.png)
            // Using internal keys: blueprintFile and title
            const sanityQuery = encodeURIComponent(`*[_type == "digitalProduct" && slug.current == "${planSlug}"][0]{ 
                title, 
                "fileUrl": blueprintFile.asset->url 
            }`);

            const sanityRes = await fetch(
                `https://${env.VITE_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${env.VITE_SANITY_DATASET}?query=${sanityQuery}`,
                { headers: { Authorization: `Bearer ${env.SANITY_API_TOKEN}` } }
            );
            const { result } = await sanityRes.json();

            // Debug logs for Cloudflare Console
            console.log(`🔍 Sanity Match: ${result ? 'YES' : 'NO'}`);
            console.log(`📂 File URL Found: ${result?.fileUrl ? 'YES' : 'NO'}`);

            if (result?.fileUrl && customerEmail) {
                // 3. Send via MailChannels
                const emailPayload = {
                    personalizations: [{
                        to: [{ email: customerEmail, name: customerName }],
                        bcc: [{ email: 'logs@heartcadence.com', name: 'System Debug' }]
                    }],
                    from: {
                        email: 'plans@bluehouseplanning.ca',
                        name: 'Bluehouse Planning'
                    },
                    subject: `Your ${result.title} Blueprints are Ready!`,
                    content: [{
                        type: 'text/html',
                        value: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                                <h2 style="color: #1a3a3a;">Thank you, ${customerName}!</h2>
                                <p>Your purchase of the <strong>${result.title}</strong> plan set is complete.</p>
                                <p>Access your architectural blueprints at the secure link below:</p>
                                <div style="margin: 30px 0;">
                                    <a href="${result.fileUrl}" style="background-color: #C4A484; color: white; padding: 15px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
                                        Download Plan Set (PDF)
                                    </a>
                                </div>
                                <p style="font-size: 12px; color: #666;">If you have any questions, reply to this email.</p>
                            </div>
                        `
                    }]
                };

                const mailRes = await fetch('https://relay.mailchannels.net/tx/v1', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(emailPayload)
                });

                if (mailRes.ok) {
                    console.log(`✅ Email sent successfully to ${customerEmail}`);
                } else {
                    const mailError = await mailRes.text();
                    console.error(`❌ MailChannels Error: ${mailError}`);
                }
            } else {
                console.error(`⚠️ Delivery Skipped: Sanity data missing for slug: ${planSlug}`);
            }
        }

        return new Response(JSON.stringify({ received: true }), { status: 200 });
    } catch (err: any) {
        console.error(`⚠️ Webhook Error: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
};