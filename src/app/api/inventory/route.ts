import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const skip = (page - 1) * limit;

    const where: any = { isActive: true };
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
        { barcode: { contains: search, mode: "insensitive" } },
      ];
    }

    const items = await db.inventoryItem.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: "asc" },
    });

    const total = await db.inventoryItem.count({ where });

    const itemsWithStatus = items.map((item) => ({
      ...item,
      stockStatus: item.currentStock <= item.minStock ? "LOW" : "OK",
    }));

    return NextResponse.json(
      { items: itemsWithStatus, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get inventory error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const { name, sku, barcode, category, unit, minStock, maxStock, parLevel, costPerUnit, isPerishable, shelfLifeDays, storageLocation } = body;

    if (!name || !category || !unit) {
      return NextResponse.json(
        { error: "Name, category, and unit required" },
        { status: 400 }
      );
    }

    const item = await db.inventoryItem.create({
      data: {
        name,
        sku,
        barcode,
        category,
        unit,
        minStock: minStock || 0,
        maxStock,
        parLevel,
        costPerUnit: costPerUnit || 0,
        isPerishable: isPerishable || false,
        shelfLifeDays,
        storageLocation,
        isActive: true,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Create inventory item error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
