import prisma from "../../../lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, name, siteId, apiKey} = await req.json();
    const response = await axios.get(`${url}/api/v2?action=services&key=${apiKey}`)
    const ballanceResponse = await axios.get(`${url}/api/v2?action=balance&key=${apiKey}`)
    if(response.status === 200 && ballanceResponse.status === 200) {
        await prisma.siteProviders.create({
            data: {
                siteId,
                url: url,
                name: name,
                apiKey,
                balance : ballanceResponse.data.balance,
                currency : ballanceResponse.data.currency,
                updatedAt : new Date()
            }
        })
      return NextResponse.json({
        message: "Success add provider",
        data : response.data
      });
    }
    if(response.status === 401) {
      return NextResponse.json({
        message: "Invalid API Key",
      });
    }
    if(response.status === 403) {
      return NextResponse.json({
        message: "Forbidden",
      });
    }
    if(response.status === 404) {
      return NextResponse.json({
        message: "Not Found",
      });
    }
    return NextResponse.json({
      message: "Success add provider",
    });
  } catch (error) {
    console.log({error});
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        const response = await prisma.siteProviders.delete({
            where: {
                id
            }
        })
        return NextResponse.json({
            message: "Success delete provider",
            data: response
        });
    } catch (error) {
        console.log({error});
        return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
    }
}

export async function GET(req:NextRequest) {
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")
  
  try {
    const data = await prisma.siteProviders.findMany({
      where : {
        siteId : siteId || ""
      }
    })
    if(data){
      return NextResponse.json({
        message: "Success get provider",
        data
      });
    }
  } catch (error) {
    console.log({error});
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}