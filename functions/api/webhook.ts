import Stripe from 'stripe';

export const onRequestPost = async (context: any) => {
    const { env, request } = context;
    const stripe = new Stripe(env.STRIPE_SECRET_KEY);
    const signature = request.headers.get('stripe-signature');

    try {
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

            // 1. Claude's Variable Fix: Use non-VITE versions
            const projectId = env.SANITY_PROJECT_ID || env.VITE_SANITY_PROJECT_ID;
            const dataset = env.SANITY_DATASET || env.VITE_SANITY_DATASET;
            const token = env.SANITY_API_TOKEN;

            console.log(`🔧 Config: project=${projectId} | dataset=${dataset} | token=${!!token}`);
            console.log(`🚀 Payment Success! Unlocking: ${planSlug}`);

            // 2. Hardened GROQ Query
            const groqQuery = `*[_type == "digitalProduct" && slug.current == '${planSlug}'][0]{ title, "fileUrl": blueprintFile.asset->url }`;
            const sanityUrl = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${encodeURIComponent(groqQuery)}`;

            console.log(`📡 Fetching: ${sanityUrl}`);

            const sanityRes = await fetch(sanityUrl, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // 3. Raw Response Logging
            console.log(`📊 Sanity HTTP Status: ${sanityRes.status} ${sanityRes.statusText}`);
            const rawBody = await sanityRes.text();
            console.log(`📦 Sanity Raw Response: ${rawBody}`);

            let result = null;
            try {
                const parsed = JSON.parse(rawBody);
                result = parsed.result;
            } catch (e) {
                console.error(`❌ JSON Parse Error: ${rawBody}`);
            }

            if (result?.fileUrl && customerEmail) {
                // 4. Send via MailChannels
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
                    console.log(`✅ Email sent to ${customerEmail}`);
                } else {
                    const mailErr = await mailRes.text();
                    console.error(`❌ MailChannels Error: ${mailErr}`);
                }
            } else {
                console.error(`⚠️ Missing Data: Result: ${!!result} | File: ${!!result?.fileUrl}`);
            }
        }
        return new Response(JSON.stringify({ received: true }), { status: 200 });
    } catch (err: any) {
        console.error(`⚠️ Webhook Error: ${err.message}`);
        return new Response(`Error: ${err.message}`, { status: 400 });
    }
};