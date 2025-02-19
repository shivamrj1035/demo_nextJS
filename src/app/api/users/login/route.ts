import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import toast from "react-hot-toast";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email: email, isVerified: true})

        if (!user) {
            return NextResponse.json({error: "User not exists or not verified"}, {status: 400});
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({error: "Password is not valid"}, {status: 400});
        }

    //     create token data
        const tokenData = {userId: user._id,username : user.username ,email: user.email};

        // generate token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message : "Login successful",
            suuccess : true
        })

        response.cookies.set('demo_token', token, {httpOnly : true});

        return response;
    } catch (e: any) {
        toast.error(e.message)
    }
}