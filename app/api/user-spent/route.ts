import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { isShow, siteId } = await req.json();

    const siteSettings = await prisma.siteSettings.findFirst({
        where : {
            siteId
        }
    })

    if(!siteSettings){
        await prisma.siteSettings.create({
            data : {
                siteId,
                showUserSpent : isShow
            }
        })
    }else{
        await prisma.siteSettings.update({
            where : {
                id : siteSettings.id
            },
            data : {
                showUserSpent : isShow
            }
        })
    }
    // Kirim token ke client
    return NextResponse.json({ msg : "Success update show total panel order" });
  } catch (error) {
    console.log({error});
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
