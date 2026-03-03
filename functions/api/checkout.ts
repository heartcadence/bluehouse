import Stripe from 'stripe';

// Use 'any' to bypass the 'Cannot find name PagesFunction' error
export const onRequestPost = async (context: any) => {
    try {
        // Initializing without a hardcoded apiVersion to fix the 'not assignable' error
        const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);

        const body = await context.request.json();
        const { slug, planTitle, totalPrice } = body;

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
            // UPDATED: Points to your new Thank You route
            success_url: `${context.env.NEXT_PUBLIC_DOMAIN}/thank-you`,
            cancel_url: `${context.env.NEXT_PUBLIC_DOMAIN}/`,
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