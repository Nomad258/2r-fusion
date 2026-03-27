import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { action, notes } = body;

    if (!action) {
      return NextResponse.json(
        { error: "Action required (ACKNOWLEDGED, DISMISSED, RESOLVED, ESCALATED)" },
        { status: 400 }
      );
    }

    const anomaly = await db.anomaly.findUnique({
      where: { id: params.id },
    });

    if (!anomaly) {
      return NextResponse.json({ error: "Anomaly not found" }, { status: 404 });
    }

    const review = await db.anomalyReview.create({
      data: {
        anomalyId: params.id,
        reviewerId: user.id,
        action,
        notes,
      },
      include: { reviewer: true },
    });

    let statusUpdate = "IN_REVIEW";
    if (action === "RESOLVED") statusUpdate = "RESOLVED";
    if (action === "DISMISSED") statusUpdate = "DISMISSED";

    const updatedAnomaly = await db.anomaly.update({
      where: { id: params.id },
      data: { status: statusUpdate },
      include: { employee: true, reviews: { include: { reviewer: true } } },
    });

    return NextResponse.json({ review, anomaly: updatedAnomaly }, { status: 201 });
  } catch (error) {
    console.error("Add anomaly review error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
