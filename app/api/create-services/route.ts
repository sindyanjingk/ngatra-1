import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { 
            name, 
            siteId, 
            providerId, 
            rate, 
            categoryId, 
            description,
            cancel,
            dripfeed,
            max,
            min,
            network,
            refill,
            type
        } = await req.json();
        const response = await prisma.siteServices.create({
            data: {
                name,
                siteId,
                providerId,
                rate,
                categoryId,
                description,
                cancel,
                dripfeed,
                max,
                min ,
                network,
                refill ,
                type
            }
        })
        return NextResponse.json({ message: "success", response }, { status: 200 });
    } catch (error) {
        console.log({error});
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}