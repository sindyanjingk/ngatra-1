import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const session = await getSession()
    const { domain, currency, name } = await req.json();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const goodDomain = domain.replace(/[^a-zA-Z0-9.-]/g, "");
    try {
        const createVercelDomain = await axios.post(`https://api.vercel.com/v9/projects/${process.env.PROJECT_VERCEL_ID}/domains`, {
            name: goodDomain,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.PROJECT_VERCEL_TOKEN}`
            }
        })
        if (createVercelDomain.status !== 200) {
            return NextResponse.json({ error: createVercelDomain.data?.error?.code || "Error creating domain" }, { status: 400 });
        }
        const response = await prisma.sites.create({
            data: {
                name: name,
                customDomain: domain,
                subdomain: domain,
                userId: session?.user?.id,
                updatedAt: new Date(),
                currency,
                siteSettings: {
                    create: {
                        currency,
                    }
                },
                siteDesigns: {
                    create: {

                    }
                },
                siteLanguage: {
                    create: {
                        siteLanding: {
                            create: {}
                        }
                    }
                },
            }
        })
        return NextResponse.json({ message: "success", response }, { status: 200 });
    } catch (error: any) {
        console.log({ error });
        console.log({ error: error?.response?.data });
        return NextResponse.json({ error: error?.response?.data?.error?.code || "Something went wrong" }, { status: 500 });
    }
}