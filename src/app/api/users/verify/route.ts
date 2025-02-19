import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;
        console.log('token', token)


        const user =await User.findOne({
            verifyToken : token,
            verifyTokenExpiry: { $gt: Date.now() }
        })
        
        if(!user){
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "User verified successfully",
            user,
            status: 200,
        })
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        }, { status: 500 })
    }
}