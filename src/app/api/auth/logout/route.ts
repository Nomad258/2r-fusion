import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser, clearSessionCookie } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const user = await getCurrentUser();

    if (user) {
      const cookieStore = await cookies();
      const token = cookieStore.get("2r-session-token")?.value;

      if (token) {
        await db.session.deleteMany({
          where: { token },
        });
      }
    }

    await clearSessionCookie();

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
