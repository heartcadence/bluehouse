import Stripe from 'stripe';

export const onRequestPost = async (context: any) => {
    try {
        // Initialize Stripe with your Secret Key from environment variables
        const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);

        const body = await context.request.json();
        const { slug, planTitle, totalPrice } = body;

        // SANITY CHECK: Ensure the domain doesn't have a trailing slash to prevent //thank-you
        const domain = context.env.NEXT_PUBLIC_DOMAIN.replace(/\/$/, '');

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'cad',
                        product_data: {
                            name: planTitle || 'Bluehouse Blueprint Plan',
                        },
                        unit_amount: Math.round(totalPrice * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // Correctly formatted success and cancel URLs
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