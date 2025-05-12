

import { generateOtp } from "@/lib/helpers";
import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
    try {
        const {
            email
        } = await req.json();
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const otpCode = generateOtp();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Forgot Password",
            text: "Password reset link",
            html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Halo ${user.name || 'Pengguna'},</h2>
      <p>Kami menerima permintaan untuk mereset kata sandi akun Anda.</p>
      <p>Gunakan kode OTP berikut untuk melanjutkan proses reset password:</p>
      <div style="background-color: #f3f3f3; padding: 20px; border-radius: 8px; font-size: 24px; text-align: center; font-weight: bold; letter-spacing: 4px;">
        ${otpCode}
      </div>
      <p>Kode ini berlaku selama <strong>10 menit</strong>.</p>
      <p>Jika Anda tidak meminta reset kata sandi, abaikan email ini.</p>
      <br />
      <p>Terima kasih,</p>
      <p><strong>Tim Support</strong></p>
    </div>
  `,
        };
        const info = await transporter.sendMail(mailOptions);
        if (info && user) {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    forgot_code: +otpCode
                }
            })
        }
        return NextResponse.json({ msg: "Success send email", info });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const {
            email,
            otp,
        } = await req.json();
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (user.forgot_code !== +otp) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }
        return NextResponse.json({ msg: "Success verify otp" }, { status: 200 });
    } catch (error) {
        console.log({ error });
        return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
    }
}
