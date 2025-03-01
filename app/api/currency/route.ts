import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { currency, siteId } = await req.json();
    const siteSettings = await prisma.siteSettings.findFirst({
        where: {
            siteId: siteId,
        }
    })
    if (!siteSettings) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    await prisma.siteSettings.update({
        where : {
            id : siteSettings.id
        },
        data : {
            currency : currency
        }
    })
    // Kirim token ke client
    return NextResponse.json({ msg : "Success update currency" });
  } catch (error) {
    console.log({error});
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
