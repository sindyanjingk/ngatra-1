import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";



export async function POST(req: NextRequest) {
    try {
        const { username, password, siteId, role, email } = await req.json();

        if (!password || !username || !siteId || !email) {
            return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
        }

        // Cek apakah child site ada
        const site = await prisma.sites.findUnique({ where: { id: siteId } });
        if (!site) {
            return NextResponse.json({ error: "Site tidak ditemukan" }, { status: 404 });
        }

        // Cek apakah user sudah ada berdasarkan email
        let user = await prisma.user.findFirst({ where: { name: username } });

        if (!user) {
            // Jika user belum ada, buat akun baru
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name: username,
                },
            });
        }

        // Cek apakah user sudah terdaftar di site ini


        const existingUserSite = await prisma.userSite.findFirst({
            where: { userId: user.id, siteId },
        });


        if (existingUserSite) {
            return NextResponse.json({ error: "User sudah terdaftar di site ini" }, { status: 409 });
        }

        // Daftarkan user ke child site dengan role default "member"
        await prisma.userSite.create({
            data: {
                userId: user.id,
                siteId,
                role: role,
                updatedAt: new Date
            },
        });


        return NextResponse.json({
            message: "Success add user",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
    }
}
