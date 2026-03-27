import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MenuClient } from "./components/menu-client";

interface MenuPageProps {
  params: {
    tableId: string;
  };
}

export const metadata: Metadata = {
  title: "2R Fusion - Menu de Table",
  description: "Parcourez notre menu de restauration premium",
};

export default async function MenuPage({ params }: MenuPageProps) {
  const { tableId } = params;

  // Fetch table info
  const table = await db.table.findUnique({
    where: { id: tableId },
    include: {
      venue: true,
    },
  });

  if (!table) {
    notFound();
  }

  // Fetch active menu for this venue
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
              OR: [
                { isVipOnly: false },
                {
                  isVipOnly: true,
                },
              ],
            },
            orderBy: { sortOrder: "asc" },
          },
        },
      },
    },
  });

  if (!menu) {
    notFound();
  }

  // Check if table is in VIP zone
  const isVipZone = table.zone === "VIP" || table.zone === "PRIVATE";

  // Filter dishes for VIP access if needed
  const processedCategories = menu.categories.map((cat) => ({
    ...cat,
    dishes: cat.dishes.filter((dish) => {
      if (dish.isVipOnly && !isVipZone) {
        return false;
      }
      return true;
    }),
  }));

  return (
    <MenuClient
      tableNumber={table.number}
      categories={processedCategories}
      isVipZone={isVipZone}
    />
  );
}
