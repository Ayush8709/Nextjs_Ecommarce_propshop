import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import User from "@/backends/schema/userSchema";
import myDb from "@/backends/utils/db";

const jwt_token = process.env.jwt_token;

export async function POST(NextRequest) {
    try {
        await myDb(); // Ensure to await if it returns a promise

        const { email, password } = await NextRequest.json();

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: 'Email or password must be provided'
            }, { status: 400 });
        }

        // Check User
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 });
        }

        const isAdmin = user.isAdmin;

        // Create token
        const token = jwt.sign({ id: user._id }, jwt_token, {
            expiresIn: "7d"
        });

        const response = NextResponse.json({
            status: true,
            message: "Login successful",
            token,
            isAdmin
        }, { status: 201 });

        // Set cookies for token and isAdmin
        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/' 
        });

        response.cookies.set('isAdmin', isAdmin ? 'true' : 'false', {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/' 
        });

        return response;

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Login API not working",
            error: error.message 
        }, { status: 500 });
    }
}
