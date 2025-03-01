import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const services = await prisma.siteServices.findMany({
            include: {
                category: true
            }
        });
        return NextResponse.json({
            message: "Success get services",
            data: services
        }); 
    } catch (error) {
        console.log({error});
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}