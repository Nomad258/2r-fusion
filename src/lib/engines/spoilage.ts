import { db } from "@/lib/db";

export interface SpoilageAlert {
  itemId: string;
  itemName: string;
  batchId: string;
  expiresAt: Date;
  daysUntilExpiry: number;
  remainingQty: number;
  estimatedValue: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  suggestedActions: string[];
  relatedDishes: string[];
}

export async function checkSpoilageRisks(): Promise<SpoilageAlert[]> {
  const alerts: SpoilageAlert[] = [];

  const now = new Date();

  const expiringSoon = await db.stockBatch.findMany({
    where: {
      expiresAt: { lte: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000) },
      status: "ACTIVE",
      remainingQty: { gt: 0 },
    },
    include: { inventoryItem: true, supplier: true },
  });

  for (const batch of expiringSoon) {
    const daysUntilExpiry = Math.ceil(
      ((batch.expiresAt ?? now).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    let riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "LOW";
    if (daysUntilExpiry < 1) riskLevel = "CRITICAL";
    else if (daysUntilExpiry < 3) riskLevel = "HIGH";
    else if (daysUntilExpiry < 7) riskLevel = "MEDIUM";
    else riskLevel = "LOW";

    const estimatedValue = batch.remainingQty * batch.costPerUnit;

    const relatedDishes = await findRelatedDishes(batch.inventoryItemId);

    const suggestedActions = generateSpoilageSuggestions(
      batch.inventoryItem.name,
      batch.remainingQty,
      riskLevel,
      relatedDishes
    );

    alerts.push({
      itemId: batch.inventoryItemId,
      itemName: batch.inventoryItem.name,
      batchId: batch.batchNumber || batch.id,
      expiresAt: batch.expiresAt as Date,
      daysUntilExpiry: Math.max(0, daysUntilExpiry),
      remainingQty: batch.remainingQty,
      estimatedValue,
      riskLevel,
      suggestedActions,
      relatedDishes,
    });
  }

  return alerts;
}

async function findRelatedDishes(inventoryItemId: string): Promise<string[]> {
  const recipes = await db.recipeIngredient.findMany({
    where: { inventoryItemId },
    include: { recipe: { include: { dish: true } } },
  });

  return recipes.map((r) => r.recipe.dish.name);
}

function generateSpoilageSuggestions(
  itemName: string,
  quantity: number,
  riskLevel: string,
  relatedDishes: string[]
): string[] {
  const suggestions: string[] = [];

  if (riskLevel === "CRITICAL") {
    suggestions.push(
      `URGENT: ${itemName} expires today or tomorrow. Immediate action required.`
    );
    suggestions.push(`Remove from inventory and dispose properly.`);
  } else if (riskLevel === "HIGH") {
    if (relatedDishes.length > 0) {
      suggestions.push(
        `Create daily special featuring ${itemName}: ${relatedDishes.slice(0, 2).join(", ")}`
      );
    }
    suggestions.push(`Offer limited-time discount on dishes using this ingredient`);
    suggestions.push(`Consider family meal or staff meal options`);
  } else if (riskLevel === "MEDIUM") {
    if (relatedDishes.length > 0) {
      suggestions.push(
        `Feature ${itemName} in specials within next week (used in: ${relatedDishes.slice(0, 2).join(", ")})`
      );
    }
    suggestions.push(`Monitor usage and plan menu accordingly`);
  } else {
    suggestions.push(`Standard rotation - use before expiry date`);
  }

  return suggestions;
}
