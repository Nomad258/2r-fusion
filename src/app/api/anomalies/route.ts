import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const type = searchParams.get("type");
    const severity = searchParams.get("severity");
    const status = searchParams.get("status");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (type) where.type = type;
    if (severity) where.severity = severity;
    if (status) where.status = status;

    const anomalies = await db.anomaly.findMany({
      where,
      include: { employee: true, reviews: { include: { reviewer: true } } },
      skip,
      take: limit,
      orderBy: [{ severity: "asc" }, { createdAt: "desc" }],
    });

    const total = await db.anomaly.count({ where });

    return NextResponse.json(
      { anomalies, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get anomalies error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
