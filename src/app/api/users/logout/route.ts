import {NextResponse} from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message: 'Logout successfully',
            success : true
        });

        response.cookies.set("demo_token", "", {httpOnly : true, expires : new Date(0)});
        return response;
    }
    catch (e : any){
        console.log('error', e.message)
    }
}