import { NextResponse, NextRequest } from "next/server";
import User from "@/backends/schema/userSchema";
import myDb from "@/backends/utils/db";
import bcrypt from 'bcryptjs'

export async function GET() {
    try {
        myDb()

        const users = await User.find({})
        return NextResponse.json({
            allUser: users
        })
    } catch (error) {
        return NextResponse.json({
            message: "Admin user api not working",
            error: error.message
        })
    }
}

export async function POST(NextRequest) {
    try {
        myDb()
        const { name, email, password, } = await NextRequest.json()


        if (!name || !email || !password) {
            return NextResponse.json({
                success: false,
                message: "Enter All fields"
            }, { status: 400 })
        }

        const chekEmail = await User.findOne({ email })

        if (chekEmail) {
            return NextResponse.json({
                success: false,
                message: "Email already Exists"
            }, { status: 400 })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        })

        return NextResponse.json({
            success: true,
            message: "User Created Succesfull",
            user: newUser
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "signUp api not working",
            error: error.message
        }, { status: 500 })
    }
}



export async function PUT(request) {
    try {
        const { id, name, email, isAdmin } = await request.json();

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, isAdmin },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
    }
}

export async function DELETE(request) {
    await myDb();

    const { id } = await request.json();

    try {
        await User.findByIdAndDelete(id);
        return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error deleting user' }), { status: 500 });
    }
}