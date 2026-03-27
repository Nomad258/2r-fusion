import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { scanAnomalies } from "@/lib/engines/anomaly";

export async function POST() {
  try {
    await requireAuth();

    const anomalies = await scanAnomalies();

    const createdAnomalies = [];
    for (const anomaly of anomalies) {
      const existing = await db.anomaly.findFirst({
        where: {
          type: anomaly.type,
          status: "NEW",
          createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
      });

      if (!existing) {
        const dbAnomaly = await db.anomaly.create({
          data: {
            type: anomaly.type,
            severity: anomaly.severity,
            riskScore: anomaly.riskScore,
            employeeId: anomaly.employeeId,
            description: anomaly.description,
            details: JSON.stringify(anomaly.details),
            evidence: JSON.stringify(anomaly.evidence),
            status: "NEW",
          },
          include: { employee: true },
        });

        createdAnomalies.push(dbAnomaly);
      }
    }

    return NextResponse.json(
      { anomalies: createdAnomalies, count: createdAnomalies.length, scannedCount: anomalies.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("Scan anomalies error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
