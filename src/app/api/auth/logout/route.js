import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "logout succesful!",
            success:true
        })

        response.cookies.set('token','',{
            httpOnly: true,
            maxAge: 0
        })
        return response
    } catch (error) {
        return NextResponse.json({
            message: "logout API not working",
            error: error.message,
        }, { status: 500 });
    }
}