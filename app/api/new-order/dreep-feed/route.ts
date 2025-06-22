import { NextResponse, NextRequest } from "next/server";
import { generateOrderId } from "@/lib/generate";
import prisma from "@/lib/prisma";
import axios from "axios";
import { getSession } from "@/lib/auth";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }

  console.log("Received request to create dreep feed order");

  try {
    const { providerUrl, serviceId, link, quantity, amount, runs, interval } = await req.json();

    if (!providerUrl || !serviceId || !link || !quantity || !amount || !runs || !interval) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (runs < 1) {
      return NextResponse.json({ error: "Runs must be at least 1" }, { status: 400 });
    }

    const userSite = await prisma.userSite.findFirst({ where: { userId: session.user.id } });
    if (!userSite) {
      return NextResponse.json({ error: "User site not found" }, { status: 400 });
    }

    const provider = await prisma.siteProviders.findFirst({ where: { url: providerUrl } });
    if (!provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 400 });
    }

    const service = await prisma.siteServices.findFirst({ where: { serviceId: +serviceId } });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userSite.userId } });

    // Return langsung ke user, proses lanjut di belakang
    const response = NextResponse.json({ message: "Order is being processed", balance: user?.balance });

    setImmediate(async () => {
      const hargaAsli = (service.providersRate! / 1000) * quantity;

      for (let i = 0; i < runs; i++) {
        if (i > 0) await delay(interval * 60 * 1000); // delay antar runs

        try {
          const response = await axios.post(
            `${providerUrl}/api/v2?action=add&service=${serviceId}&link=${encodeURIComponent(link)}&quantity=${quantity}&key=${provider.apiKey}`
          );

          await prisma.user.update({
            where: { id: userSite.userId },
            data: {
              balance: { decrement: +amount },
              transaction: {
                create: {
                  id: generateOrderId(),
                  status: "pending",
                  name: "ORDER",
                  qty: +quantity,
                  siteId: userSite.siteId,
                  totalAmount: +amount,
                  link,
                  profit: amount - hargaAsli,
                  providerOrderId: response?.data?.order || "",
                  siteServiceId: service.id,
                },
              },
              spent: { increment: +amount },
            },
          });

          console.log(`Run ${i + 1} successful, order ID: ${response?.data?.order || "N/A"}`);
        } catch (orderError: any) {
          console.log({ orderError });
          console.error(`Run ${i + 1} failed:`, orderError?.response?.data || orderError.message);
        }
      }
    });
    return response
  } catch (error: any) {
    console.log({ error });
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ status: 200, message: "OK" });
}