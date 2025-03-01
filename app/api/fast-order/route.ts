

import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const {
            siteId,
            fastOrder,
            discount,
            showOrderPage,
            showDiscount,
            showPurchase
        } = await req.json();
        const siteSettings = await prisma.siteSettings.findFirst({
            where: {
                siteId: siteId,
            }
        })
        if (!siteSettings) {
            await prisma.siteSettings.create({
                data: {
                    siteId: siteId,
                    fastOrder: fastOrder,
                    dicount: discount,
                    showOrder: showOrderPage,
                    showDiscount: showDiscount,
                    showRecentPurchase: showPurchase
                }
            })
        } else {
            await prisma.siteSettings.update({
                where: {
                    id: siteSettings.id,
                },
                data: {
                    fastOrder: fastOrder,
                    dicount: discount,
                    showOrder: showOrderPage,
                    showDiscount: showDiscount,
                    showRecentPurchase: showPurchase
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
