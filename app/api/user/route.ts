import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/lib/helpers";

export async function GET(req: NextRequest) {
    const auth = await authMiddleware(req);
    if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const users = await prisma.user.findUnique({
        where: {
            id: auth.userId,
        },
        select: { name: true, balance: true, spent : true, transaction : {
            where : {
                status : "Completed"
            }
        } }
    })

    return NextResponse.json(users);
}

