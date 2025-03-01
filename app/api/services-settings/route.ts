import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const {
            siteId,
            cancelOrder,
            averageCompletionTime,
            showApiPage,
            showMultipleOrder,
            showServicePage
        } = await req.json()

        const siteSettings = await prisma.siteSettings.findFirst({
            where: {
                siteId: siteId,
            }
        })
        if (!siteSettings) {
            await prisma.siteSettings.create({
                data: {
                    siteId: siteId,
                    cancelFail: cancelOrder,
                    averageComplete: averageCompletionTime,
                    showApiPage: showApiPage,
                    showMultiple: showMultipleOrder,
                    showServicesPage: showServicePage
                }
            })
        } else {
            await prisma.siteSettings.update({
                where: {
                    id: siteSettings.id,
                },
                data: {
                    cancelFail: cancelOrder,
                    averageComplete: averageCompletionTime,
                    showApiPage: showApiPage,
                    showMultiple: showMultipleOrder,
                    showServicesPage: showServicePage
                }
            })
        }
        // Kirim token ke client
        return NextResponse.json({ msg: "Success update settings" });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
    }
}
