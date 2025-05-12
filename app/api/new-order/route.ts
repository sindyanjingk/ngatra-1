import { NextResponse, NextRequest } from "next/server";
import { generateOrderId } from "@/lib/generate";
import prisma from "@/lib/prisma";
import axios from "axios";
import { authMiddleware } from "@/lib/helpers";

export async function POST(req: NextRequest) {
    const auth = await authMiddleware(req);
    if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
    try {
        const {
            providerUrl,
            serviceId,
            link,
            quantity,
            amount,
        } = await req.json()
        const provider = await prisma.siteProviders.findFirst({
            where: { url: providerUrl }
        })
        console.log({ 
            provider,  
            providerUrl,
            serviceId,
            link,
            quantity,
            amount, 
        });
        
        const response = await axios.post(`${providerUrl}/api/v2?action=add&service=${serviceId}&link=${link}&quantity=${quantity}&key=${provider?.apiKey}`)
        const service = await prisma.siteServices.findFirst({
            where : {
                serviceId : +serviceId
            }
        })
        console.log({response : response.data});
        if (response.status === 200) {
            const hargaAsli = service?.providersRate! / 1000 * quantity
            const user = await prisma.user.update({
                where : {
                    id : auth.userId
                },
                data :{
                    balance : {
                        decrement : +amount
                    },
                    transaction : {
                        create : {
                            id : generateOrderId(),
                            status : "pending",
                            name : "ORDER",
                            qty : quantity,
                            siteId : auth.siteId,
                            totalAmount : +amount,
                            link,
                            profit : amount - hargaAsli,
                            providerOrderId : response?.data?.order || "",
                            siteServiceId : service?.id,
                        }
                    },
                    spent : {
                        increment : +amount
                    }
                }
            })

            return NextResponse.json({
                msg: "Success create order",
                balance : user.balance,
                orderId : response.data?.order || ""
            })
        }
    } catch (error: any) {
        console.log({ error });
        if (error.response) {
            console.error("Midtrans API Response Error:", error.response.data);
            return NextResponse.json(
                { error: error.response.data },
                { status: error.response.status }
            );
        }

        console.error("Midtrans API Error:", error.message);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {

    return NextResponse.json({
        msg: "Wellcome"
    });
}