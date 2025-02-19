import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req : NextRequest)=> {
    try{
    // Fetch data from token endpoint
        const token = req.cookies.get('demo_token')?.value || '';
        const decodedToken : any = jwt.verify(token,process.env.TOKEN_SECRET!)
        return decodedToken.userId;
    }catch(e: any){
        throw  new Error(e.message)
    }
}