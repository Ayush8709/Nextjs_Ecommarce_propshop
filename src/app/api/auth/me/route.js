// pages/api/user.js
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import User from "@/backends/schema/userSchema";
import myDb from "@/backends/utils/db";

const jwt_token = process.env.JWT_TOKEN; 

//ye postom se header me Authanticate and Bearer me userlogin token dalne me kam kare ga
// const getDataToken = (req) => {
//     try {
//         const authHeader = req.headers.get('Authorization');
//         if (!authHeader) {
//             throw new Error('Authorization header not found');
//         }

//         const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'
//         if (!token) {
//             throw new Error('Token not found');
//         }
//         return jwt.verify(token, jwt_token);
//     } catch (error) {
//         console.error('Token data not found', error);
//         return null; // Return null to signify an invalid token
//     }
// }

const getDataToken = (req) => {
    try {
        const token = req.cookies.get('token')?.value || '';
        if (!token) {
            throw new Error('Token not found');
        }
        return jwt.verify(token, jwt_token);
    } catch (error) {
        console.error('Token data not found', error);
        return null; // Return null to signify an invalid token
    }
}

export async function GET(req) {
    try {
        await myDb(); // Ensure you're awaiting the DB connection

        const userId = getDataToken(req);
        if (!userId) {
            return NextResponse.json({
                message: 'Unauthorized: Invalid token'
            }, { status: 401 });
        }

        const { id } = userId;
        const user = await User.findOne({ _id: id }).select('-password');

        if (!user) {
            return NextResponse.json({
                message: 'User not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            message: 'User found',
            data: user
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Error fetching user data',
            error: error.message
        }, { status: 400 });
    }
}
