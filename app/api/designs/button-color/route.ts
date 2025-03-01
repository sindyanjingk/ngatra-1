// app/api/designs/bg-color/route.ts
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "Success! API is working." });
}


export async function POST(req: Request) {
    const { bgColor, siteId } = await req.json();
    if(!siteId) return NextResponse.json({ message: "Error update designs. siteId is required" });
    try {
        const siteDesigns = await prisma.siteDesigns.findFirst({
            where: {
                siteId: siteId,
            },
        });
        if (!siteDesigns) {
            await prisma.siteDesigns.create({
                data: {
                    buttonColor: bgColor,
                    siteId: siteId,
                },
            });
        } else {
            await prisma.siteDesigns.update({
                where: {
                    id: siteDesigns.id,
                },
                data: {
                    buttonColor: bgColor,
                },
            });
        }
        return NextResponse.json({ message: "Success update designs." });
    } catch (error) {
        console.log({error});
        return NextResponse.json({ message: "Error update designs." });
    }
}