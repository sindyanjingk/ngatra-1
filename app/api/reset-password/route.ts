import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    try {
        const {
            email,
            otpCode,
            password
        } = await req.json();
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (user.forgot_code !== +otpCode) {
            return NextResponse.json({ error: "Invalid OTP code" }, { status: 400 });
        }
        const salt = await bcrypt.genSalt()
        const hasedPassword = await bcrypt.hash(password, salt)
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hasedPassword
            }
        })
        return NextResponse.json({ msg: "Success send email" });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
    }
}