import { getSession } from "../../../lib/auth";
import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getSession()
    try {
        const {
            name,
            subdomain,
            whatsapp,
            currency,// Default currency
            description
        } = await req.json();

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const existingSite = await prisma.sites.findFirst({
            where: {
                subdomain,
            },
        });
        if (existingSite) {
            return NextResponse.json({ message: "Site already exists" }, { status: 400 });
        }

        const site = await prisma.sites.create({
            data: {
                name,
                subdomain,
                whatsapp,
                currency,
                description,
                userId: session.user.id,
                updatedAt: new Date(),
                siteSettings: {
                    create: {
                        currency,
                        pageDescription: description,
                        name,
                        pageTitle: name,
                    }
                },
                siteDesigns: {
                    create: {

                    }
                },
                siteLanguage: {
                    create: {
                        siteLanding: {
                            create: {
                                signIn: "Sign In",
                                signUp: "Sign Up",
                                newOrder: "New Order",
                                service: "Services",
                            }
                        }
                    }
                }
            },
            include: {
                siteSettings: true,
                siteDesigns: true,
                siteLanguage: true
            }
        })

        console.log({ site });

        // Kirim token ke client
        return NextResponse.json({ msg: "Success create site" }, { status: 200 });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
    }
}