import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const response = await prisma.user.findMany({
            where: {
                deletedAt: null
            }
        })
        return NextResponse.json({
            message: "Success get users",
            data : response
        });
    } catch (error) {
        console.log({error});
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}