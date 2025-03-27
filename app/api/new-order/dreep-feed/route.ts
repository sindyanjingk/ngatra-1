import { NextResponse, NextRequest } from "next/server";
import { generateOrderId } from "@/lib/generate";
import prisma from "@/lib/prisma";
import axios from "axios";
import { authMiddleware } from "@/lib/helpers";

export async function POST(req: NextRequest) {
    const auth = await authMiddleware(req);
    if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

    try {
        const { providerUrl, serviceId, link, quantity, amount, runs, interval } = await req.json();

        const provider = await prisma.siteProviders.findFirst({
            where: { url: providerUrl }
        });

        if (!provider) {
            return NextResponse.json({ error: "Provider not found" }, { status: 400 });
        }

        const service = await prisma.siteServices.findFirst({
            where: { serviceId: +serviceId }
        });

        if (!service) {
            return NextResponse.json({ error: "Service not found" }, { status: 400 });
        }

        // **KIRIM RESPONSE DULU SEBELUM EKSEKUSI TRANSAKSI**
        const response = NextResponse.json({ msg: "Order is being processed in the background" });

        setImmediate(async () => {
            const hargaAsli = (service.providersRate! / 1000) * quantity;

            for (let i = 0; i < runs; i++) {
                if (i > 0) await new Promise(resolve => setTimeout(resolve, interval * 60 * 1000)); // interval dalam menit

                try {
                    const apiResponse = await axios.post(
                        `${providerUrl}/api/v2?action=add&service=${serviceId}&link=${link}&quantity=${quantity}&key=${provider.apiKey}`
                    );

                    if (apiResponse.status === 200) {
                        await prisma.user.update({
                            where: { id: auth.userId },
                            data: {
                                balance: { decrement: +amount },
                                transaction: {
                                    create: {
                                        id: generateOrderId(),
                                        status: "pending",
                                        name: "ORDER",
                                        qty: quantity,
                                        siteId: auth.siteId,
                                        totalAmount: +amount,
                                        link,
                                        profit: amount - hargaAsli,
                                        providerOrderId: apiResponse?.data?.order || "",
                                        siteServiceId: service.id,
                                    }
                                },
                                spent: { increment: +amount }
                            }
                        });
                    }
                } catch (orderError: any) {
                    console.error(`Error on run ${i + 1}:`, orderError.message);
                }
            }
        });

        return response;

    } catch (error: any) {
        console.log({ error });

        if (error.response) {
            return NextResponse.json(
                { error: error.response.data },
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
    return NextResponse.json({ msg: "Welcome" });
}
