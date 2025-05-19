import { NextResponse, NextRequest } from "next/server";
import Midtrans from 'midtrans-client-typescript'
import { generateTopUpOrderId } from "@/lib/generate";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/helpers";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const session = await getSession()
    if(!session) {
        return NextResponse.json({
            status : 401,
            message : "Unauthorized"
        })
    }
    const userSite = await prisma.userSite.findFirst({
        where : {
            id : session.user.id,
        }
    })


    try {
        const serverKey =  `${process.env.MIDTRANS_SANDBOX_SERVER_KEY}`
        const clientKey =   `${process.env.MIDTRANS_SANDBOX_CLIENT_KEY}`
        const snap = new Midtrans.Snap({
            clientKey,
            serverKey,
            isProduction: false
        })

        const order_id = generateTopUpOrderId()

        const { ammount } = await req.json()

        const user = await prisma.user.findFirst({
            where : {
                id : userSite?.userId
            }
        })
        const response = await snap.createTransaction({
            transaction_details: {
                order_id,
                gross_amount: ammount,
            },
            customer_details: {
                first_name: user?.name,
                email: user?.email,
            },
            credit_card: {
                secure: true,
            },
        })
        const transaction = await prisma.transaction.create({
            data: {
                id: order_id,
                status: "waiting_payment",
                name: "TOPUP",
                siteId: userSite?.siteId,
                userId: user?.id,
                totalAmount: +ammount,
            }
        })

        // Response URL Snap
        return NextResponse.json({
            response,
            transaction
        });
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