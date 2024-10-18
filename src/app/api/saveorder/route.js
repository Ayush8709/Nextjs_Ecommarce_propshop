// Import necessary modules
import Order from "@/backends/schema/orderModel";
import myDb from "@/backends/utils/db";
// import { getDataToken } from "@/helper/gettokendata";  // Uncommented the import
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    try {
        await myDb();

        const data = getDataToken(request);
        const { id } = data;
        console.log('User ID:', id);

        const { cartItems, shippingAddress, paymentMode } = await request.json();

        const order = new Order({
            user: id,
            cartItems,
            shippingAddress,
            paymentMode,
        });

        // Save the order to the database
        const result = await order.save();

        // Return success response
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
    }
}

import jwt from 'jsonwebtoken';
const jwt_token = process.env.JWT_TOKEN; 

 const getDataToken = (request) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(token, jwt_token);
        return decodedToken;
    } catch (error) {
        console.log('Token data not found', error);
        return null; 
    }
};
