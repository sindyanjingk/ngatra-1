import { NextResponse, NextRequest } from "next/server";
import Midtrans from "midtrans-client-typescript";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const serverKey = `${process.env.MIDTRANS_SANBOX_SERVER_KEY}`
        const clientKey = `${process.env.MIDTRANS_SANBOX_CLIENT_KEY}`
        const snap = new Midtrans.Snap({
            clientKey,
            serverKey,
            isProduction: false
        })

        const body = await req.json();
        console.log("Midtrans Callback Received:", body);

        const { order_id, transaction_status, fraud_status, gross_amount } = body;

        if (!order_id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        const transaction = await prisma.transaction.findUnique({
            where: { id: order_id },
            include: { user: true }, // Ambil data user
        });

        if (!transaction || !transaction.user) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        console.log("Ini transaksi top-up");
        const user = await prisma.user.findUnique({ where: { id: transaction.user.id } })
        await prisma.user.update({
            where: {
                id: transaction?.user?.id,
            },
            data: {
                balance: Number(user?.balance) + Number(gross_amount)
            }
        })
        return NextResponse.json({ msg: "Success update balance" })

    } catch (error: any) {
        console.error("Midtrans Callback Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}


// export async function GET() {
//     return NextResponse.json({msg : "success process transaction"})
// }