import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

app.post('/api/checkout', async (req, res) => {
    try {
        const { slug, planTitle, totalPrice } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: planTitle || 'Bluehouse Blueprint Plan',
                        },
                        unit_amount: Math.round(totalPrice * 100), // Stripe expects amounts in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://www.bluehouseplanning.ca/success',
            cancel_url: 'https://www.bluehouseplanning.ca/',
            metadata: {
                planSlug: slug,
            },
        });

        res.json({ id: session.id, url: session.url });
    } catch (error: any) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
