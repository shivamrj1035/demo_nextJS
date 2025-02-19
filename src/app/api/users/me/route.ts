import {getDataFromToken} from "@/helpers/getDataFromToken";
import {NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request : NextRequest){
    try {
        const userId = await getDataFromToken(request);
        console.log(userId)
        const user = await User.findOne({_id : userId}).select("-password");

        return NextResponse.json({
            message : "user fetched successfully",
            user
        })

    }catch (e:any) {
        console.log('error', e.message);
    }
}