import { oneUsd } from "@/lib/helpers";
import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { siteId, providerId, selected, categoryId, extraPrice } = await req.json();
        console.log({siteId, categoryId});
        const provider = await prisma.siteProviders.findFirst({
            where: { id: providerId },
        });

        let transformData = [];

        if (categoryId === "same") {
            transformData = await Promise.all(
                selected.map(async (item: any) => {
                    let category = await prisma.category.findFirst({
                        where: { category_name: item.category, siteId: siteId },
                    });                  
                    if (!category) {
                        category = await prisma.category.create({
                            data: {
                                category_name: item.category,
                                iconUrl: item.iconUrl || "",
                                siteId: siteId,
                            },
                        });
                    }

                    return {
                        name: item.name,
                        siteId: siteId ,
                        providerId: providerId || "",
                        rate:
                            provider?.currency === "IDR"
                                ? +item.rate! + (+item.rate! * extraPrice / 100)
                                : (+item.rate! * oneUsd) + ((+item.rate! * extraPrice / 100) * oneUsd),
                        min: +item.min!,
                        providersRate: provider?.currency === "IDR" ? +item.rate! : +item.rate! * oneUsd,
                        extraPrice,
                        max: +item.max!,
                        categoryId: category.id,
                        description: item.description || "",
                        cancel: item.cancel || false,
                        dripfeed: item.dripfeed,
                        network: item.network || "",
                        serviceId: +item.service || 0,
                        refill: item.refill || false,
                        updatedAt: new Date(),
                        type : item?.type
                    };
                })
            );
        } else {
            transformData = selected.map((item: any) => ({
                name: item.name,
                siteId: siteId ,
                providerId: providerId || "",
                rate:
                    provider?.currency === "IDR"
                        ? +item.rate! + (+item.rate! * extraPrice / 100)
                        : (+item.rate! * oneUsd) + ((+item.rate! * extraPrice / 100) * oneUsd),
                min: +item.min!,
                max: +item.max!,
                providersRate: provider?.currency === "IDR" ? +item.rate! : +item.rate! * oneUsd,
                extraPrice,
                categoryId: categoryId,
                description: item.description || "",
                cancel: item.cancel || false,
                dripfeed: item.dripfeed,
                network: item.network || "",
                serviceId: +item.service || 0,
                refill: item.refill || false,
                updatedAt: new Date(),
                type : item?.type
            }));
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
