import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const session = await getSession()
    if (!session?.user) {
        return NextResponse.json({ msg: "Unauthorized" })
    }
    try {

        const {  clientKey, serverKey, siteId } = await req.json()
        

        const response = await prisma.sitePaymentMethod.create({
            data : {
                siteId,
                serverKey,
                clientKey,
            }
        })
        return NextResponse.json({
            response,
        });
    } catch (error: any) {
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