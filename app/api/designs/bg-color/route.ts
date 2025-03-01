import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "Success! API is working." });
}


export async function POST(req: Request) {
    const { bgColor, textColor, siteId } = await req.json();
    try {
        const siteDesigns = await prisma.siteDesigns.findFirst({
            where: {
                siteId: siteId,
            },
        });
        if (!siteDesigns) {
            await prisma.siteDesigns.create({
                data: {
                    backgroundColor: bgColor,
                    textColor: textColor,
                    siteId: siteId,
                },
            });
        } else {
            await prisma.siteDesigns.update({
                where: {
                    id: siteDesigns.id,
                },
                data: {
                    backgroundColor: bgColor,
                    textColor: textColor,
                },
            });
        }
        return NextResponse.json({ message: "Success update designs." });
    } catch (error) {
        console.log({error});
        return NextResponse.json({ message: "Error update designs." });
    }
}