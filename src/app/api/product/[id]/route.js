import Product from "@/backends/schema/productSchema";
import myDb from "@/backends/utils/db";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    const { id } = params;
    console.log("this is id", id);

    try {
        await myDb(); 
        const product = await Product.findById(id);
        // console.log(product);

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, product }, { status: 200 });
    } catch (error) {
        console.error("Error retrieving product:", error); 
        return NextResponse.json({ message: "Error retrieving product", error: error.message }, { status: 500 });
    }
};
