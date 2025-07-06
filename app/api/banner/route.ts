import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { showBanner, siteId } = await req.json();
        const siteSettings = await prisma.siteSettings.findFirst({
            where: {
                siteId: siteId,
            }
        })
        if (!siteSettings) {
            await prisma.siteSettings.create({
                data: {
                    siteId: siteId,
                    showBanner: showBanner,
                }
            })
        } else {
            await prisma.siteSettings.update({
                where: {
                    id: siteSettings.id,
                },
                data: {
                    showBanner: showBanner,
                }
            })
        }
        // Kirim token ke client
        return NextResponse.json({msg : "Success update banner"});
    } catch (error) {
        return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
    }
}
