import { NextResponse, NextRequest } from "next/server";
import Midtrans from 'midtrans-client-typescript'
import { generateTopUpOrderId } from "@/lib/generate";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/helpers";

export async function POST(req: NextRequest) {
    const auth = await authMiddleware(req);
    if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
    try {
        const serverKey = `${process.env.MIDTRANS_SANBOX_SERVER_KEY}`
        const clientKey = `${process.env.MIDTRANS_SANBOX_CLIENT_KEY}`
        const snap = new Midtrans.Snap({
            clientKey,
            serverKey,
            isProduction: false
        })

        const order_id = generateTopUpOrderId()

        const { ammount } = await req.json()

        const user = await prisma.user.findFirst({
            where : {
                id : auth.userId
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
                siteId: auth.siteId,
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