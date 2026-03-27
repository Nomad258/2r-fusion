import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    const item = await db.inventoryItem.findUnique({
      where: { id: params.id },
      include: { stockBatches: true, stockMovements: { take: 20, orderBy: { createdAt: "desc" } } },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    console.error("Get inventory item error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const body = await request.json();
    const { name, sku, barcode, category, unit, minStock, maxStock, parLevel, costPerUnit, isPerishable, shelfLifeDays, storageLocation, isActive } = body;

    const item = await db.inventoryItem.findUnique({
      where: { id: params.id },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (sku !== undefined) updateData.sku = sku;
    if (barcode !== undefined) updateData.barcode = barcode;
    if (category !== undefined) updateData.category = category;
    if (unit !== undefined) updateData.unit = unit;
    if (minStock !== undefined) updateData.minStock = minStock;
    if (maxStock !== undefined) updateData.maxStock = maxStock;
    if (parLevel !== undefined) updateData.parLevel = parLevel;
    if (costPerUnit !== undefined) updateData.costPerUnit = costPerUnit;
    if (isPerishable !== undefined) updateData.isPerishable = isPerishable;
    if (shelfLifeDays !== undefined) updateData.shelfLifeDays = shelfLifeDays;
    if (storageLocation !== undefined) updateData.storageLocation = storageLocation;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedItem = await db.inventoryItem.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ item: updatedItem }, { status: 200 });
  } catch (error) {
    console.error("Update inventory item error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
