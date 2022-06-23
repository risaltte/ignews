/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
    const chunks = [];

    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === 'string' ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chunks);
}

const relevantEvents = new Set([
    'checkout.session.completed'
]);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {
        const buf = await buffer(request);
        const secret = request.headers['stripe-signature'];
        console.log(secret, process.env.STRIPE_WEBHOOK_SECRET);

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (error) {
            console.log(error);
            return response.status(400).send(`Webhook error: ${error.message}`);
        }

        const { type } = event;
        console.log(event);

        if (relevantEvents.has(type)) {
            try {
                switch (type) {
                    case 'checkout.session.completed':
                        const checkoutSession = event.data.object as Stripe.Checkout.Session;

                        await saveSubscription(
                            checkoutSession.subscription.toString(),
                            checkoutSession.customer.toString()
                        );

                        break;
                
                    default:
                        throw new Error('Unhandler event.');
                }
            } catch (error) {
                return response.json({ error: 'Webhook handler failed.' });
            }
        }
    
        response.json({ received: true});
        
    } else {
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method not allowed');
    }
}