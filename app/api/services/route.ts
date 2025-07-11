import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

//saya pakai method post
export async function POST(req: NextRequest) {
    try {
        const { url, apiKey} = await req.json();
        //saya ngambil service dari provider lain
        const response = await axios.get(`${url}/api/v2?action=services&key=${apiKey}`)
        if(response.status === 200) {
          return NextResponse.json({
            message: "Success get services",
            data : response.data
          });
        }
    } catch (error) {
        console.log({error});
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}