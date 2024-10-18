import Product from "@/backends/schema/productSchema";
import myDb from "@/backends/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        await myDb(); // Ensure proper database connection
        const myAllData = await Product.find({});
        return NextResponse.json({
            success: true,
            myAllData
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error); // Log the error for debugging
        return NextResponse.json({
            success: false,
            message: "No Product",
            error: error.message // Return only the error message
        }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        const data = await req.json(); // Get the incoming data
        const newProduct = new Product(data); // Assuming you have a Product model
        await newProduct.save(); // Save the new product to the database
        return NextResponse.json({
            success: true,
            message: "Product created successfully",
            product: newProduct,
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error); // Log the error for debugging
        return NextResponse.json({
            success: false,
            message: "Failed to create product",
            error: error.message // Return only the error message
        }, { status: 500 });
    }
};
