import Order from "@/backends/schema/orderModel";
import myDb from "@/backends/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await myDb(); 
        const { order } = params; 
        // console.log('User ID:', order);


        const foundOrders = await Order.find({ user: order }); 

        if (foundOrders.length === 0) {
            return NextResponse.json({ message: "No orders found for this user" }, { status: 404 });
        }

        return NextResponse.json({ orders: foundOrders });
    } catch (error) {
        console.error('Fetch orders error:', error);
        return NextResponse.json({ message: "Failed to get orders" }, { status: 500 });
    }
}
