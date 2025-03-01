import prisma from '../../../lib/prisma';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const data = await request.formData()
    const file = data.get("file") as File | null;
    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const buffer = await file.arrayBuffer();
    const filename = file.name;
    const blob = await put(filename, buffer, {
        access: 'public',
    });

    const siteDesigns = await prisma.siteDesigns.findFirst({
        where: {
            siteId: data.get("siteId") as string,
        },
    });

    if(!siteDesigns) {
        await prisma.siteDesigns.create({
            data: {
                siteId: data.get("siteId") as string,
                logo: blob.url,
            },
        });
    } else {
        await prisma.siteDesigns.update({
            where: {
                id : siteDesigns.id,
            },
            data: {
                logo: blob.url,
            },
        });
    }


    return NextResponse.json({ msg: "Success", url: blob.url });
}