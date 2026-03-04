import Stripe from 'stripe';

export const onRequestPost = async (context: any) => {
    try {
        const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);
        const body = await context.request.json();

        // 1. Get both the slug AND the BCIN preference from the frontend
        const { slug, includeBCIN } = body;

        if (!slug) {
            throw new Error("Product slug is required.");
        }

        const projectId = context.env.SANITY_PROJECT_ID;
        const dataset = context.env.SANITY_DATASET; // production-private
        const token = context.env.SANITY_API_TOKEN;

        // 2. Fetch the "Source of Truth" base price from the Private Vault
        const groqQuery = `*[_type == "digitalProduct" && slug.current == $slug][0]{ title, price }`;
        const sanityUrl = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${encodeURIComponent(groqQuery)}&$slug="${slug}"`;

        const sanityRes = await fetch(sanityUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const { result } = await sanityRes.json();

        if (!result || result.price === undefined) {
            throw new Error(`Plan details or price not found in Vault for: ${slug}`);
        }

        // 3. SECURE CALCULATION: Add $150 if BCIN was selected
        const BCIN_SURCHARGE = 150;
        const basePrice = result.price;
        const finalPrice = includeBCIN ? (basePrice + BCIN_SURCHARGE) : basePrice;

        const domain = context.env.NEXT_PUBLIC_DOMAIN.replace(/\/$/, '');

        // 4. Create Stripe Session with the final calculated price
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'cad',
                        product_data: {
                            // Update name if BCIN is included so the customer sees it on their receipt
                            name: `${result.title}${includeBCIN ? ' + BCIN Designation' : ''}`,
                        },
                        unit_amount: Math.round(finalPrice * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${domain}/thank-you`,
            cancel_url: `${domain}/`,
            metadata: {
                planSlug: slug,
                includeBCIN: includeBCIN ? 'true' : 'false' // Stored for your records/webhook
            },
        });

        return new Response(JSON.stringify({ id: session.id, url: session.url }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};// Triggering build: 03/03/2026 21:03:35
