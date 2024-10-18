import { NextRequest, NextResponse } from "next/server";
import products from "../../../../product"; // Ensure this path is correct and exports an array of product objects
import Product from "@/backends/schema/productSchema";

export const POST = async (req) => {
    try {
        const saveData = await Product.insertMany(products);
        return NextResponse.json({ message: "Products saved successfully", saveData }, { status: 201 });
    } catch (error) {
        console.error("Error saving products:", error); // Log the error to the console
        return NextResponse.json({ message: "Error saving products", error: error.message }, { status: 400 });
    }
};

export const DELETE = async (req)=>{
    try {
        const saveData = await Product.deleteMany();
        return NextResponse.json({ message: "Products delete successfully", saveData }, { status: 201 });
    } catch (error) {
        console.error("Error delting products:", error); // Log the error to the console
        return NextResponse.json({ message: "Error deleting products", error: error.message }, { status: 400 });
    }
}
