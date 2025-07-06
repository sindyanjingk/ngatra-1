import { NextResponse, NextRequest } from "next/server";
import { generateOrderId } from "@/lib/generate";
import prisma from "@/lib/prisma";
import axios from "axios";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const session = await getSession()
    if (!session) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized"
        })
    }
    const userSite = await prisma.userSite.findFirst({
        where: {
            userId: session.user.id,
        }
    })

    if (!userSite || !userSite.userId || !userSite.siteId) {
        return NextResponse.json(
            { error: "User site not found or not linked properly" },
            { status: 400 }
        );
    }
    try {
        const {
            providerUrl,
            serviceId,
            link,
            quantity,
            amount,
        } = await req.json()
        const provider = await prisma.siteProviders.findFirst({
            where: { url: providerUrl }
        })

        const response = await axios.post(`${providerUrl}/api/v2?action=add&service=${serviceId}&link=${link}&quantity=${quantity}&key=${provider?.apiKey}`)
        const service = await prisma.siteServices.findFirst({
            where: {
                serviceId: +serviceId
            }
        })
        if (response.status === 200) {
            const hargaAsli = service?.providersRate! / 1000 * quantity
            const userDiscount = await prisma.user.findFirst({
                where : {
                    id : userSite.id,
                }
            })

            const totalAmmount = userDiscount?.discount ? amount - (+amount * +userDiscount.discount / 100) : +amount
            
            const user = await prisma.user.update({
                where: {
                    id: userSite?.userId
                },
                data: {
                    balance: {
                        decrement: +totalAmmount
                    },
                    transaction: {
                        create: {
                            id: generateOrderId(),
                            status: "pending",
                            name: "ORDER",
                            qty: +quantity,
                            siteId: userSite?.siteId,
                            totalAmount: +totalAmmount,
                            link,
                            profit: amount - hargaAsli,
                            providerOrderId: response?.data?.order || "",
                            siteServiceId: service?.id,
                        }
                    },
                    spent: {
                        increment: +totalAmmount
                    },
                    income : {
                        increment: +totalAmmount
                    }
                }
            })

            return NextResponse.json({
                msg: "Success create order",
                balance: user.balance,
                orderId: response.data?.order || ""
            })
        } else {
            return NextResponse.json({
                msg: "Failed create order",
                orderId: response.data?.order || ""
            })
        }
    } catch (error: any) {
        console.log({ error });
        if (error.response) {
            return NextResponse.json(
                { message: error.response.data?.error },
                { status: error.response.status }
            );
        }
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {

    return NextResponse.json({
        msg: "Wellcome"
    });
}