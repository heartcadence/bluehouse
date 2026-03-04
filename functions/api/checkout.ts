import Stripe from 'stripe';

export const onRequestPost = async (context: any) => {
    try {
        const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);
        const body = await context.request.json();

        // We only take the slug from the frontend. 
        // We IGNORE any 'price' sent to prevent price manipulation.
        const { slug } = body;

        if (!slug) {
            throw new Error("Product slug is required for checkout.");
        }

        // 1. Sanity Configuration from Environment Variables
        const projectId = context.env.SANITY_PROJECT_ID;
        const dataset = context.env.SANITY_DATASET;
        const token = context.env.SANITY_API_TOKEN;

        // 2. Fetch Price and Title from Sanity Private Dataset
        // We use a GROQ query to find the specific product by its slug
        const groqQuery = `*[_type == "digitalProduct" && slug.current == $slug][0]{ title, price }`;
        const sanityUrl = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${encodeURIComponent(groqQuery)}&$slug="${slug}"`;

        const sanityRes = await fetch(sanityUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const { result } = await sanityRes.json();

        // Safety Check: If the slug doesn't exist or price is missing, stop the checkout
        if (!result || result.price === undefined || result.price === null) {
            console.error(`Checkout Error: Product not found or price missing for slug: ${slug}`);
            throw new Error(`Pricing information for "${slug}" is currently unavailable.`);
        }

        // 3. Prepare Redirect Domain
        const domain = context.env.NEXT_PUBLIC_DOMAIN.replace(/\/$/, '');

        // 4. Create Stripe Session using VERIFIED Sanity Data
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'cad',
                        product_data: {
                            name: result.title || 'Bluehouse Blueprint Plan',
                        },
                        // Stripe expects amounts in cents (e.g., $850.00 = 85000)
                        unit_amount: Math.round(result.price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${domain}/thank-you`,
            cancel_url: `${domain}/`,
            metadata: {
                planSlug: slug,
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
};