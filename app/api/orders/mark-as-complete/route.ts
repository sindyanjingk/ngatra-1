import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { orderId } = await req.json();

        const order = await prisma.transaction.update({
            where: {
                id: orderId,
            },
            data: {
                status: 'Completed'
            }
        })

        return NextResponse.json({ msg: "Success update order", order });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}


export async function GET() {
    return NextResponse.json({ msg: "Hello World" });
}