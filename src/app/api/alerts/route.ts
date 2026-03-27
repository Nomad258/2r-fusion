import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const severity = searchParams.get("severity");
    const isRead = searchParams.get("isRead");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (type) where.type = type;
    if (severity) where.severity = severity;
    if (isRead !== null && isRead !== undefined) where.isRead = isRead === "true";

    const alerts = await db.alert.findMany({
      where,
      include: { user: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await db.alert.count({ where });

    return NextResponse.json(
      { alerts, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get alerts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const { type, severity, title, message, data, userId } = body;

    if (!type || !title || !message) {
      return NextResponse.json(
        { error: "Required fields: type, title, message" },
        { status: 400 }
      );
    }

    const alert = await db.alert.create({
      data: {
        type,
        severity: severity || "INFO",
        title,
        message,
        data,
        userId,
        isRead: false,
        isDismissed: false,
      },
      include: { user: true },
    });

    return NextResponse.json({ alert }, { status: 201 });
  } catch (error) {
    console.error("Create alert error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const { alertIds, isRead, isDismissed } = body;

    if (!Array.isArray(alertIds) || alertIds.length === 0) {
      return NextResponse.json(
        { error: "alertIds must be a non-empty array" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (isRead !== undefined) updateData.isRead = isRead;
    if (isDismissed !== undefined) updateData.isDismissed = isDismissed;
    if (isRead) updateData.readAt = new Date();

    const result = await db.alert.updateMany({
      where: { id: { in: alertIds } },
      data: updateData,
    });

    return NextResponse.json(
      { updated: result.count, message: `Updated ${result.count} alert(s)` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update alerts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
