import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get the main menu
    const menu = await db.menu.findFirst({
      where: { isActive: true },
      include: {
        categories: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
          include: {
            dishes: {
              where: { isAvailable: true },
              orderBy: { sortOrder: "asc" },
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                allergens: true,
                dietaryTags: true,
                isChefSpecial: true,
                isNew: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    if (!menu) {
      return NextResponse.json(
        {
          categories: [],
          message: "No active menu found",
        },
        { status: 200 }
      );
    }

    // Format response
    const categories = menu.categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      dishes: category.dishes,
    }));

    return NextResponse.json(
      {
        categories,
        menuId: menu.id,
        menuName: menu.name,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Menu fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}
