import { db } from "@/lib/db";

export interface ForecastResult {
  itemId: string;
  itemName: string;
  currentStock: number;
  averageDailyUsage: number;
  projectedDemand: number;
  daysUntilStockout: number;
  suggestedReorderQty: number;
  confidence: number;
  methodology: string;
  preferredSupplier?: string;
  estimatedCost: number;
}

export async function generateForecasts(
  items: any[],
  periodDays: number
): Promise<ForecastResult[]> {
  const forecasts: ForecastResult[] = [];

  for (const item of items) {
    const forecast = await generateSingleForecast(item, periodDays);
    forecasts.push(forecast);
  }

  return forecasts;
}

async function generateSingleForecast(
  item: any,
  periodDays: number
): Promise<ForecastResult> {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const movements = await db.stockMovement.findMany({
    where: {
      inventoryItemId: item.id,
      type: "REMOVAL",
      createdAt: { gte: thirtyDaysAgo },
    },
    orderBy: { createdAt: "asc" },
  });

  let totalUsed = 0;
  for (const movement of movements) {
    totalUsed += movement.quantity;
  }

  const averageDailyUsage = movements.length > 0 ? totalUsed / 30 : 0;

  const dayOfWeek = now.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const weekendMultiplier = isWeekend ? 1.3 : 1.0;
  const adjustedDailyUsage = averageDailyUsage * weekendMultiplier;

  const projectedDemand = adjustedDailyUsage * periodDays;

  const daysUntilStockout = adjustedDailyUsage > 0 
    ? Math.floor(item.currentStock / adjustedDailyUsage)
    : 999;

  const parLevel = item.parLevel || item.maxStock || (item.minStock * 2);
  const buffer = (adjustedDailyUsage * 7);
  const suggestedReorderQty = Math.max(0, parLevel - item.currentStock + buffer);

  const preferredSupplier = await findPreferredSupplier(item.id);

  let estimatedCost = suggestedReorderQty * item.costPerUnit;
  if (preferredSupplier) {
    const supplierProduct = await db.supplierProduct.findUnique({
      where: {
        supplierId_inventoryItemId: {
          supplierId: preferredSupplier.id,
          inventoryItemId: item.id,
        },
      },
    });

    if (supplierProduct) {
      estimatedCost = suggestedReorderQty * supplierProduct.unitPrice;
    }
  }

  const dataQuality = movements.length / 30;
  const confidence = Math.min(1, Math.max(0.3, dataQuality * 0.9));

  const methodology = `
Demand Forecasting Methodology:
- Analysis Period: Last 30 days
- Total Historical Removals: ${totalUsed} units
- Average Daily Usage: ${averageDailyUsage.toFixed(2)} units/day
- Day-of-Week Adjustment: ${isWeekend ? "Weekend (1.3x multiplier)" : "Weekday"}
- Adjusted Daily Usage: ${adjustedDailyUsage.toFixed(2)} units/day
- Projection Period: ${periodDays} days
- Projected Demand: ${projectedDemand.toFixed(0)} units
- Current Stock Level: ${item.currentStock} units
- Par Level: ${parLevel} units
- Safety Buffer: ${buffer.toFixed(0)} units (7-day buffer)
- Confidence Score: ${(confidence * 100).toFixed(0)}% (based on ${movements.length} data points)
  `.trim();

  return {
    itemId: item.id,
    itemName: item.name,
    currentStock: item.currentStock,
    averageDailyUsage: parseFloat(adjustedDailyUsage.toFixed(2)),
    projectedDemand: parseFloat(projectedDemand.toFixed(0)),
    daysUntilStockout,
    suggestedReorderQty: Math.ceil(suggestedReorderQty),
    confidence,
    methodology,
    preferredSupplier: preferredSupplier?.name,
    estimatedCost: parseFloat(estimatedCost.toFixed(2)),
  };
}

async function findPreferredSupplier(inventoryItemId: string) {
  const preferred = await db.supplierProduct.findFirst({
    where: {
      inventoryItemId,
      isPreferred: true,
    },
    include: { supplier: true },
  });

  if (preferred) return preferred.supplier;

  const mostRecent = await db.stockBatch.findFirst({
    where: { inventoryItemId },
    include: { supplier: true },
    orderBy: { receivedAt: "desc" },
  });

  return mostRecent?.supplier || null;
}
