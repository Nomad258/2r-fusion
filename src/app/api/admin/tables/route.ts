import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tables = await db.table.findMany({
      where: { isActive: true },
      include: {
        venue: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: [{ venueId: "asc" }, { number: "asc" }],
    });

    return NextResponse.json({
      success: true,
      tables,
    });
  } catch (error) {
    console.error("[TABLES_API_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch tables" },
      { status: 500 }
    );
  }
}
