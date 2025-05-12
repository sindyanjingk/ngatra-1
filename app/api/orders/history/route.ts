import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await getSession()
        if(!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const { id } = await req.json();
        const order = await prisma.transaction.findMany({
            where: {
                userId : id
            },
            include: {
                user: true,
                siteService : true,
                sites : true
            }
        })

        return NextResponse.json({ msg: "Success get order", order });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}


export async function GET() {
    return NextResponse.json({ msg: "Hello World" });
}