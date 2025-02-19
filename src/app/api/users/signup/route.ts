import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {email, username,password } = reqBody;

        const user = await User.findOne({ email: email})

        if(user){
            return NextResponse.json({ error : "User already exists"}, {status : 400});
        }


    //     Now hash the password
        const salt = await  bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email,
            username,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        sendEmail({
            email: savedUser.email,
            emailType: "VERIFY",
            userId: savedUser._id,
        })
        return NextResponse.json({
            message: "User registered successfully",
            user: savedUser,
            status: 201,
        })
    }catch (e : any){
        return NextResponse.json({error : e.message}, {status : 500});
    }
}

