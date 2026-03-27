import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { generateForecasts } from "@/lib/engines/forecasting";

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const { itemIds, periodDays = 30 } = body;

    let items;
    if (itemIds && Array.isArray(itemIds)) {
      items = await db.inventoryItem.findMany({
        where: { id: { in: itemIds }, isActive: true },
      });
    } else {
      items = await db.inventoryItem.findMany({
        where: { isActive: true },
      });
    }

    const forecasts = await generateForecasts(items, periodDays);

    const createdForecasts = [];
    for (const forecast of forecasts) {
      const dbForecast = await db.forecast.create({
        data: {
          type: "DEMAND",
          period: `${periodDays}d`,
          targetDate: new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000),
          status: "GENERATED",
          confidence: forecast.confidence,
          methodology: forecast.methodology,
          data: JSON.stringify(forecast),
        },
      });

      const recommendation = await db.recommendation.create({
        data: {
          forecastId: dbForecast.id,
          type: "PROCUREMENT",
          priority: forecast.confidence > 0.8 ? "HIGH" : "MEDIUM",
          title: `Reorder ${forecast.itemName}`,
          description: `Suggested reorder quantity: ${forecast.suggestedReorderQty}`,
          actionRequired: `Order ${forecast.suggestedReorderQty} units from ${forecast.preferredSupplier || "preferred supplier"}`,
          rationale: `Current stock will run out in ${forecast.daysUntilStockout} days at current usage rate`,
          data: JSON.stringify(forecast),
          status: "PENDING",
        },
      });

      createdForecasts.push({ forecast: dbForecast, recommendation });
    }

    return NextResponse.json(
      { forecasts: createdForecasts, count: createdForecasts.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("Generate forecasts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
