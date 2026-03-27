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
    const { quantity, reason, notes } = body;

    if (quantity === undefined || quantity === 0) {
      return NextResponse.json(
        { error: "Adjustment quantity required and must not be zero" },
        { status: 400 }
      );
    }

    const item = await db.inventoryItem.findUnique({
      where: { id: params.id },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const previousStock = item.currentStock;
    const newStock = previousStock + quantity;

    if (newStock < 0) {
      return NextResponse.json(
        { error: "Adjustment would result in negative stock" },
        { status: 400 }
      );
    }

    const updatedItem = await db.inventoryItem.update({
      where: { id: params.id },
      data: { currentStock: newStock },
    });

    const movement = await db.stockMovement.create({
      data: {
        inventoryItemId: params.id,
        type: quantity > 0 ? "ADDITION" : "REMOVAL",
        quantity: Math.abs(quantity),
        previousStock,
        newStock,
        reason,
        performedBy: user.id,
        notes,
      },
    });

    return NextResponse.json({ item: updatedItem, movement }, { status: 200 });
  } catch (error) {
    console.error("Adjust stock error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
