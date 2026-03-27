import { NextRequest, NextResponse } from "next/server";

const PASSCODE = process.env.SITE_PASSCODE || "Surfcast9!";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (code === PASSCODE) {
      const response = NextResponse.json({ ok: true });
      response.cookies.set("site_access", "granted", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json(
      { error: "Invalid code" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Bad request" },
      { status: 400 }
    );
  }
}