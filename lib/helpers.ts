import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0, // Agar selalu bulat
  }).format(Math.round(amount));
}

export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const convertUsdToIdr = (amount: number, exchangeRate: number): string => {
  const convertedAmount = amount * exchangeRate;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(convertedAmount);
};

export const oneUsd = 16350


const SECRET_KEY = process.env.JWT_SECRET!;

export async function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 };
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string; siteId: string; role: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return { error: "User not found", status: 401 };
    }

    return { userId: decoded.userId, siteId: decoded.siteId, role: decoded.role }; // ✅ Kembalikan data user
  } catch (error) {
    return { error: "Invalid token", status: 401 };
  }
}


export function generateOtp(length = 6): string {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}
