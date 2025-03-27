// https://viralpanel.my.id/api/v2?action=status&order=1&key=yourKey

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const { id, providerUrl, providerOrderId, key } = await req.json()
        const response = await axios.post(`${providerUrl}/api/v2?action=status&order=${providerOrderId}&key=${key}`)
        
        if (response.status === 200) {
            await prisma.transaction.update({
                where: {
                    id
                },
                data: {
                    status: response.data?.status || ""
                }
            })
        }
        const status = await prisma.transaction.findUnique({
            where: {
                id
            },
            select: {
                status: true
            }
        })
        return NextResponse.json({ msg: "Success get status", data: response.data?.status, status: status?.status })
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ msg: error || "Something went wrong" })
    }
}