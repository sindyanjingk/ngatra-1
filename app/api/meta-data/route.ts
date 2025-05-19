import { getSession } from "@/lib/auth";
import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { 
        siteId,
        title,
        description,
        keywords,
        metaTags,
        footerTags
     } = await req.json();

     const session = await getSession();
     if (!session) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized",
        });
    }
     const siteSettings = await prisma.siteSettings.findFirst({
        where: {
            siteId: siteId,
        }
    })    
    if (!siteSettings) {
        await prisma.siteSettings.create({
            data: {
                siteId: siteId,
                pageTitle: title,
                pageDescription: description,
                pageKeywords: keywords,
                metaTags,
                footerTags
            }
        })
    } else {
        await prisma.siteSettings.update({
            where: {
                id: siteSettings.id,
            },
            data: {
                pageTitle: title,
                pageDescription: description,
                pageKeywords: keywords,
                metaTags,
                footerTags
            }
        })
    }
    return NextResponse.json({ msg : "Success update meta data" });
  } catch (error) {
    console.log({error});
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
