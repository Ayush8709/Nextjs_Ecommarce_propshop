import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";
import User from "@/backends/schema/userSchema";
import myDb from "@/backends/utils/db";
const jwt_token = process.env.jwt_token;

export async function POST(NextRequest) {
    try {
        myDb();
        console.log("the log is", process.env.SECRET_KEY)
        const { email, password } = await NextRequest.json()

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: 'email or passord enter'
            }, { status: 400 })
        }

        //chek User
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'invalid User'
            }, { status: 400 })
        }

        

        //token
        const token = jwt.sign({ id: user._id }, jwt_token, {
            expiresIn: "7d"
        }) // user._id is coming from datbase id

        const response = NextResponse.json({
            status: true,
            message: "Login succesfull",
            token
        }, { status: 201 })

        response.cookies.set('token', token, {
            httpOnly: true,
        })
        return response

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Login api not working",
            error
        }, { status: 500 })
    }
}