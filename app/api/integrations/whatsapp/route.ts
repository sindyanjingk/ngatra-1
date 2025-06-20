import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { 
        siteId,
        whatsappNumber,
     } = await req.json();

     const session = await getSession();
     if (!session) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized",
        });
    }
     const siteIntegrations = await prisma.siteIntegrations.findFirst({
        where: {
            siteId: siteId,
        }
    })    
    if (!siteIntegrations) {
        await prisma.siteIntegrations.create({
            data: {
                siteId: siteId,
                whatsapp : whatsappNumber
            }
        })
    } else {
        await prisma.siteIntegrations.update({
            where: {
                id: siteIntegrations.id,
            },
            data: {
                whatsapp : whatsappNumber
            }
        })
    }
    return NextResponse.json({ msg : "Success update whatsapp number" }, { status: 200 });
  } catch (error) {
    console.log({error});
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}