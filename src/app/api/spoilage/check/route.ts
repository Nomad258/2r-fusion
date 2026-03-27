import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { checkSpoilageRisks } from "@/lib/engines/spoilage";

export async function POST() {
  try {
    await requireAuth();

    const alerts = await checkSpoilageRisks();

    const createdAlerts = [];
    for (const alert of alerts) {
      const existingAlert = await db.alert.findFirst({
        where: {
          type: `SPOILAGE_${alert.itemId}`,
          isDismissed: false,
          createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
      });

      if (!existingAlert) {
        const dbAlert = await db.alert.create({
          data: {
            type: `SPOILAGE_${alert.itemId}`,
            severity: alert.riskLevel,
            title: `${alert.itemName} expiring soon`,
            message: `${alert.itemName} (Batch: ${alert.batchId}) expires in ${alert.daysUntilExpiry} days. ${alert.suggestedActions.join("; ")}`,
            data: JSON.stringify(alert),
          },
        });

        createdAlerts.push(dbAlert);
      }
    }

    return NextResponse.json(
      { alerts: createdAlerts, count: createdAlerts.length, riskCount: alerts.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("Check spoilage error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
