import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const key = process.env.SECRET_KEY;

const stripe = new Stripe(key);

export async function POST(request) {
    try {
        const { items, shippingAddress, paymentMode, totalPrice } = await request.json();
        // console.log('items', items)
        // console.log('ahipping', shippingAddress)
        // console.log('payment', paymentMode)
        // console.log('total', totalPrice)

        // console.log('items id', items.name)

        // Validate input
        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'Items not found or empty' }, { status: 400 });
        }

        if (!shippingAddress || typeof shippingAddress !== 'object') {
            return NextResponse.json({ error: 'Shipping address is missing or invalid' }, { status: 400 });
        }

        if (!totalPrice || isNaN(totalPrice)) {
            return NextResponse.json({ error: 'Invalid total price provided' }, { status: 400 });
        }

        // Create a new customer in Stripe
        const customer = await stripe.customers.create({
            name: 'Ayush', // Consider passing this dynamically
            email: 'ayush@gmail.com', // Consider passing this dynamically
            address: {
                city: shippingAddress.city,
                country: shippingAddress.country,
                line1: shippingAddress.address,
                postal_code: shippingAddress.pincode,
            },
        });

        // Create line items for the checkout session
        const line_items = items.map(item => {
            if (!item.name || !item.price || !item.qty || !item.image || !item.category) {
                throw new Error('Item name, price, or quantity not found');
            }
            return {
                price_data: {
                    product_data: {
                        name: item.name,
                        description: item.description,
                        // images: [item.image], // yaha problum ho raha hai
                        metadata: {
                            category: item.category ,
                        },
                    },
                    unit_amount: Math.round(item.price * 100), 
                    currency: 'inr',
                },
                quantity: item.qty, 
            };
        });


        // Create a checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `http://localhost:3000/payment?token=${customer.id}`,
            cancel_url: `http://localhost:3000/payment?token=${customer.id}`,
            line_items,
        });

        return NextResponse.json({
            sessionId: checkoutSession.id,
            msg: "Checkout session created successfully.",
            success:true,
            url: checkoutSession.url,
            customer_id:customer.id,
            success:true,
            orderDetails: {
                orderStatus: 'conform',
                line_items,
                customer,
                createdAt: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error("Error creating checkout session:"); 
        return NextResponse.json({
            error: "Error creating checkout session.",
        });
    }
}



