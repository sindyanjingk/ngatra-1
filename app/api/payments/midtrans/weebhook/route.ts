import { NextResponse, NextRequest } from "next/server";
import Midtrans from "midtrans-client-typescript";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Midtrans Callback Received:", body);

        const { order_id, transaction_status, gross_amount } = body;

        if (!order_id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const transaction = await prisma.transaction.findUnique({
            where: { id: order_id },
            include: { user: true },
        });

        if (!transaction || !transaction.user) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        if (transaction_status === "settlement") {
            await prisma.$transaction([
                prisma.transaction.update({
                    where: { id: order_id },
                    data: { status  : 'completed' },
                }),
                prisma.user.update({
                    where: { id: transaction.user.id },
                    data: {
                        balance: { increment: Number(gross_amount) },
                    },
                }),
            ]);
        }else{
            await prisma.transaction.update({
                where: { id: order_id },
                data: { status: 'failed' },
            });
        }

        return NextResponse.json({ msg: "Success update balance" });

    } catch (error) {
        console.error("Midtrans Callback Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
