import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: {
    tableId: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { tableId } = params;

    // Fetch table to get venue and zone info
    const table = await db.table.findUnique({
      where: { id: tableId },
      include: { venue: true },
    });

    if (!table) {
      return NextResponse.json(
        { error: "Table not found" },
        { status: 404 }
      );
    }

    // Check if table is in VIP zone
    const isVipZone = table.zone === "VIP" || table.zone === "PRIVATE";

    // Fetch active menu with available dishes
    const menu = await db.menu.findFirst({
      where: {
        venueId: table.venueId,
        isActive: true,
      },
      include: {
        categories: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
          include: {
            dishes: {
              where: {
                isAvailable: true,
              },
              orderBy: { sortOrder: "asc" },
            },
          },
        },
      },
    });

    if (!menu) {
      return NextResponse.json(
        { error: "Menu not found" },
        { status: 404 }
      );
    }

    // Filter VIP-only items based on table zone
    const filteredCategories = menu.categories
      .map((cat: any) => ({
        ...cat,
        dishes: cat.dishes.filter((dish: any) => {
          if (dish.isVipOnly && !isVipZone) {
            return false;
          }
          return true;
        }),
      }))
      .filter((cat: any) => cat.dishes.length > 0); // Remove empty categories

    return NextResponse.json({
      success: true,
      data: {
        menu: {
          ...menu,
          categories: filteredCategories,
        },
        table: {
          id: table.id,
          number: table.number,
          zone: table.zone,
          capacity: table.capacity,
        },
        isVipZone,
      },
    });
  } catch (error) {
    console.error("[MENU_API_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}
