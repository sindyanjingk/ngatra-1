import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {

    const params = req.nextUrl.searchParams.get("action")
    const key = req.nextUrl.searchParams.get("key")
    console.log({key});
    if (params === "services") {
        const data = await prisma.siteServices.findMany({})
        return NextResponse.json(data)
    }

    return NextResponse.json({})
}