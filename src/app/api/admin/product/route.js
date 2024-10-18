import myDb from "@/backends/utils/db";
import Product from "@/backends/schema/productSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await myDb();
        const allProduct = await Product.find({});
        return NextResponse.json({ allProduct });
    } catch (error) {
        return NextResponse.json({ msg: 'User get API not working' });
    }
}

export async function POST(req) {
    try {
        // Connect to the database
        await myDb();

        // Parse the request body
        const data = await req.json();

        // Create a new product instance
        const newProduct = new Product({
            image: data.image,
            name: data.name,
            brand: data.brand,
            category: data.category,
            description: data.description,
            countInStock: Number(data.countInStock),
            price: Number(data.price),
            rating: Number(data.rating),
            numReviews: Number(data.numReviews),
        });

        await newProduct.save();

        return NextResponse.json({ message: 'Product added successfully' })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error adding product' })
    }
}

export async function PUT(req) {
    await myDb();
    try {
        const userData = await req.json();
        const { id } = userData;

        if (!id) {
            return NextResponse.json({ message: "User ID is required." }, { status: 400 });
        }

        const updatedUser = await Product.findByIdAndUpdate(id, userData, { new: true });

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "User updated successfully.", user: updatedUser });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error updating user.", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    await myDb();
    try {
        const { id } = await req.json(); // Expecting the ID in the request body

        if (!id) {
            return NextResponse.json({ message: "User ID is required." }, { status: 400 });
        }

        const deletedUser = await Product.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully." });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error deleting user.", error: error.message }, { status: 500 });
    }
}
