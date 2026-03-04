import Stripe from 'stripe';

export const onRequestPost = async (context: any) => {
    try {
        const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);
        const body = await context.request.json();
        const { slug, includeBCIN } = body;

        if (!slug) throw new Error("Product slug is required.");

        const projectId = context.env.SANITY_PROJECT_ID;
        const dataset = context.env.SANITY_DATASET;
        const token = context.env.SANITY_API_TOKEN;

        const groqQuery = `*[_type == "digitalProduct" && slug.current == $slug][0]{ title, price }`;
        const sanityUrl = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${encodeURIComponent(groqQuery)}&$slug="${slug}"`;

        const sanityRes = await fetch(sanityUrl, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const { result } = await sanityRes.json();

        if (!result || result.price === undefined) throw new Error("Price not found.");

        const BCIN_SURCHARGE = 150;
        const finalPrice = includeBCIN ? (result.price + BCIN_SURCHARGE) : result.price;
        const domain = context.env.NEXT_PUBLIC_DOMAIN.replace(/\/$/, '');

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'cad',
                    product_data: { name: `${result.title}${includeBCIN ? ' + BCIN' : ''}` },
                    unit_amount: Math.round(finalPrice * 100),
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${domain}/thank-you`,
            cancel_url: `${domain}/`,
            // THIS FIXES THE METADATA VISIBILITY IN DASHBOARD
            payment_intent_data: {
                metadata: { planSlug: slug, includeBCIN: includeBCIN ? 'true' : 'false' },
            },
            metadata: { planSlug: slug, includeBCIN: includeBCIN ? 'true' : 'false' },
        });

        return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};