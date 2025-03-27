import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";


const SECRET_KEY = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email, password, siteId } = await req.json();

    // Cari user berdasarkan email
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });

    // Validasi password (pastikan ada hashing)
    // const isValidPassword = user.password === password; // Sebaiknya gunakan bcrypt
    // if (!isValidPassword) return NextResponse.json({ error: "Password salah" }, { status: 401 });
    const isValidPassword = await bcrypt.compare(password, user.password!);
    console.log({isValidPassword, password, user : user.password});
    if (!isValidPassword) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }
    // Cek apakah user terdaftar di site ini
    const userSite = await prisma.userSite.findFirst({
      where: { userId: user.id, siteId },
    });

    if (!userSite) return NextResponse.json({ error: "Akses tidak diizinkan" }, { status: 403 });

    // Buat token JWT
    const token = jwt.sign({ userId: user.id, siteId, role: userSite.role }, SECRET_KEY, {
      expiresIn: "7d",
    });

    // Simpan token ke database
    await prisma.userToken.upsert({
      where: { userId_siteId: { userId: user.id, siteId } },
      update: { token, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // 7 hari
      create: { userId: user.id, siteId, token, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    });

    // Kirim token ke client
    return NextResponse.json({ token, message : "Login berhasil" });
  } catch (error) {
    console.log({error});
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
