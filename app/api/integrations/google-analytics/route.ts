import { getSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { siteId, measurementId } = await req.json()

    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const siteIntegrations = await prisma.siteIntegrations.findFirst({
      where: { siteId }
    })

    if (!siteIntegrations) {
      await prisma.siteIntegrations.create({
        data: {
          siteId,
          googleAnalytics: measurementId
        }
      })
    } else {
      await prisma.siteIntegrations.update({
        where: { id: siteIntegrations.id },
        data: {
          googleAnalytics: measurementId
        }
      })
    }

    return NextResponse.json(
      { msg: "Success update Google Analytics ID" },
      { status: 200 }
    )
  } catch (error) {
    console.error("[GA_UPDATE_ERROR]", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan Analytics ID" },
      { status: 500 }
    )
  }
}
