import prisma from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { orderId, provider, providerOrderId } = await req.json();

        const order = await prisma.transaction.findFirst({
            where: {
                id: orderId,
            },
            include : {
                siteService : {
                    include : {
                        provider : true
                    }
                }
            }
        })

        const response = await axios.get(`https://${provider}/api/v2?action=status&order=${providerOrderId}&key=${order?.siteService?.provider?.apiKey}`)
        if(response.status === 200){
            await prisma.transaction.update({
                where : {
                    id : orderId
                },
                data : {
                    status : response.data?.status || "",
                }
            })
        }
        return NextResponse.json({ msg: "Success update order", data : response.data});
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}


export async function GET() {
    return NextResponse.json({ msg: "Hello World" });
}