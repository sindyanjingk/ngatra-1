import { getSession } from "../../../lib/auth";
import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    const session = await getSession() 
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const {
            subdomain,
            currency,
        } = await req.json();
        const existSite = await prisma.sites.findUnique({
            where :{
                subdomain: subdomain
            }
        })
        if(existSite){
            return NextResponse.json({ error: "Subdomain already exists" }, { status: 400 });
        }
        const site = await prisma.sites.create({
            data: {
                name: subdomain,
                subdomain,
                currency,
                userId: session?.user.id,
                updatedAt: new Date(),
                siteSettings: {
                    create: {
                        currency,
                    }
                },
                siteDesigns :{
                    create :{
                        
                    }
                },
                siteLanguage :{
                    create :{
                        siteLanding : {
                            create : {}
                        }
                    }
                },
            },
        });
        return NextResponse.json({ msg: "Success create sub domain", site }, { status: 200 });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}