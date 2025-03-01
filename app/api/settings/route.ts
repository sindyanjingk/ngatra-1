import { NextRequest, NextResponse } from "next/server";


const SECRET_KEY = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email, password, siteId } = await req.json();

    
    // Kirim token ke client
    return NextResponse.json({  });
  } catch (error) {
    console.log({error});
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
