import User from "@/backends/schema/userSchema";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import myDb from "@/backends/utils/db";

export async function GET() {
    return NextResponse.json({
        msg: "Signup api is Testing"
    })
}

export async function POST(NextRequest) {
    try {
        myDb()
        const { name, email, password, } = await NextRequest.json()

        console.log(name, email, password)

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

