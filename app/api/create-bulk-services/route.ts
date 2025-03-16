import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {
            siteId,
            providerId,
            selected,
            categoryId,
            extraPrice,
        } = await req.json();
        let transformData = []
        if (categoryId === "same") {
            transformData = await Promise.all(
                selected.map(async (item: any) => {
                    // Cek apakah kategori dengan nama yang sama sudah ada
                    let category = await prisma.category.findFirst({
                        where: { category_name: item.category },
                    });

                    // Jika kategori belum ada, buat baru
                    if (!category) {
                        category = await prisma.category.create({
                            data: {
                                category_name: item.category, // Nama kategori unik
                                iconUrl: item.iconUrl || "", // Opsional: jika ada icon URL
                                siteId: siteId || "", // Hubungkan dengan site jika perlu
                            },
                        });
                    }

                    return {
                        name: item.name,
                        siteId: siteId || "",
                        providerId: providerId || "",
                        rate: item.rate,
                        categoryId: category.id, // Pakai ID kategori yang sudah ditemukan / dibuat
                        description: item.description || "",
                        cancel: item.cancel || false,
                        dripfeed: item.dripfeed,
                        max: item.max || 0,
                        min: item.min || 0,
                        network: item.network || "",
                        refill: item.refill || false,
                    };
                })
            );
        } else {
            transformData = selected.map(((item: any) => ({
                name: item.name,
                siteId: siteId || "",
                providerId: providerId || "",
                rate: item.rate,
                categoryId: categoryId, // Pakai ID kategori yang sudah ditemukan / dibuat
                description: item.description || "",
                cancel: item.cancel || false,
                dripfeed: item.dripfeed,
                max: item.max || 0,
                min: item.min || 0,
                network: item.network || "",
                refill: item.refill || false,
            })))
        }
        const response = await prisma.siteServices.createMany({
            data: transformData,
        });
        return NextResponse.json({ message: "success", response }, { status: 200 });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}