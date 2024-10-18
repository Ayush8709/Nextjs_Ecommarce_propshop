import { NextResponse, NextRequest } from "next/server";
import myDb from "@/backends/utils/db";
import User from "@/backends/schema/userSchema";

export async function PUT(req) {
    try {
        await myDb(); // Ensure the database connection is awaited

        const { id, name, email } = await req.json(); // Parse JSON from the request body

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({
                message: 'User not found',
            }, { status: 404 });
        }

        if (name) user.name = name;
        if (email) user.email = email;

        const updatedUser = await user.save();

        return NextResponse.json({
            message: 'User update successful',
            data: updatedUser
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Update API not working',
            data: error.message
        }, { status: 500 }); // Send a 500 status for server errors
    }
}


