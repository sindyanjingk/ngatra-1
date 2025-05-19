import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";

const SECRET_KEY = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email, password, username, siteId } = await req.json();
  
    if (!email || !password || !username || !siteId) {
      return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }

    // Cek apakah child site ada
    const site = await prisma.sites.findUnique({ where: { id: siteId } });
    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    // Cek apakah user sudah ada berdasarkan email
    let user = await prisma.user.findFirst({ where: { email } });  

    if (!user) {
      // Jika user belum ada, buat akun baru
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name : username,
        },
      });
    }

    // Cek apakah user sudah terdaftar di site ini
    
    
    const existingUserSite = await prisma.userSite.findFirst({
      where: { userId: user.id, siteId },
    });
    

    if (existingUserSite) {
      return NextResponse.json({ error: "User has been registered" }, { status: 409 });
    }

    // Daftarkan user ke child site dengan role default "member"
    await prisma.userSite.create({
      data: {
        userId: user.id,
        siteId,
        role: "USER",
        updatedAt : new Date
      },
    });

    // Buat token JWT
    const token = jwt.sign({ userId: user.id, siteId, role: "member" }, SECRET_KEY, {
      expiresIn: "7d",
    });

    // Simpan token di database
    await prisma.userToken.create({
      data: {
        userId: user.id,
        siteId,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 hari
      },
    });

    return NextResponse.json({
      message: "Success register user",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.name,
      },
    });
  } catch (error) {
    console.log({error});
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
