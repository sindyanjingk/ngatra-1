import { oneUsd } from "@/lib/helpers";
import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { siteId, providerId, selected, categoryId, extraPrice } = await req.json();

    const provider = await prisma.siteProviders.findFirst({
      where: { id: providerId },
    });

    // Jika categoryId = 'same', kita harus pastikan kategori unik sudah ada / dibuat dulu
    let transformData = [];

    if (categoryId === "same") {
      // Ambil kategori unik dari selected
      const uniqueCategories = Array.from(new Set(selected.map((item: any) => item.category as string)));

      // Map untuk menyimpan kategori yang sudah ditemukan / dibuat
      const categoryMap = new Map<string, { id: string }>();

      // Cari atau buat kategori per kategori unik
      for (const catName of uniqueCategories) {
        let category = await prisma.category.findFirst({
          where: { category_name: catName as string, siteId },
        });

        if (!category) {
          category = await prisma.category.create({
            data: {
              category_name: catName as string,
              iconUrl: "", // sesuaikan kalau ada iconUrl
              siteId,
            },
          });
        }

        categoryMap.set(catName as string, { id: category.id });
      }

      // Buat transformData, ambil categoryId dari categoryMap
      transformData = selected.map((item: any) => {
        const category = categoryMap.get(item.category);
        return {
          name: item.name,
          siteId,
          providerId: providerId || "",
          rate:
            provider?.currency === "IDR"
              ? +item.rate + (+item.rate * extraPrice) / 100
              : (+item.rate * oneUsd) + ((+item.rate * extraPrice) / 100) * oneUsd,
          min: +item.min,
          max: +item.max,
          providersRate:
            provider?.currency === "IDR" ? +item.rate : +item.rate * oneUsd,
          extraPrice,
          categoryId: category?.id || "",
          description: item.description || "",
          cancel: item.cancel || false,
          dripfeed: item.dripfeed,
          network: item.network || "",
          serviceId: +item.service || 0,
          refill: item.refill || false,
          updatedAt: new Date(),
          type: item?.type,
        };
      });
    } else {
      // Kalau categoryId bukan 'same', pakai categoryId yang diberikan
      transformData = selected.map((item: any) => ({
        name: item.name,
        siteId,
        providerId: providerId || "",
        rate:
          provider?.currency === "IDR"
            ? +item.rate + (+item.rate * extraPrice) / 100
            : (+item.rate * oneUsd) + ((+item.rate * extraPrice) / 100) * oneUsd,
        min: +item.min,
        max: +item.max,
        providersRate: provider?.currency === "IDR" ? +item.rate : +item.rate * oneUsd,
        extraPrice,
        categoryId: categoryId,
        description: item.description || "",
        cancel: item.cancel || false,
        dripfeed: item.dripfeed,
        network: item.network || "",
        serviceId: +item.service || 0,
        refill: item.refill || false,
        updatedAt: new Date(),
        type: item?.type,
      }));
    }

    // Simpan banyak data sekaligus
    const response = await prisma.siteServices.createMany({
      data: transformData,
    });

    return NextResponse.json({ message: "success", response }, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}