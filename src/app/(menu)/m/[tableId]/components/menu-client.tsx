"use client";

import { useState, useEffect } from "react";
import { Dish, MenuCategory } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { DishCard } from "./dish-card";
import { DishDetail } from "./dish-detail";
import { CategoryNav } from "./category-nav";

interface CategoryWithDishes extends MenuCategory {
  dishes: Dish[];
}

interface MenuClientProps {
  tableNumber: number;
  categories: CategoryWithDishes[];
  isVipZone: boolean;
}

export function MenuClient({
  tableNumber,
  categories,
  isVipZone,
}: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.id || ""
  );
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  return (
    <div className="pb-20">
      {/* Table info badge */}
      <div className="sticky top-16 z-40 px-4 py-3 bg-stone-950/80 backdrop-blur-sm border-b border-amber-900/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="border-amber-700 text-amber-200 bg-amber-950/30 px-3 py-1"
          >
            Table {tableNumber}
          </Badge>
          {isVipZone && (
            <Badge className="bg-amber-700 text-stone-950 px-3 py-1">
              VIP Menu
            </Badge>
          )}
        </div>
        <p className="text-xs text-stone-500">Scan for updates</p>
      </div>

      {/* Category navigation */}
      {categories.length > 0 && (
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      )}

      {/* Dishes grid */}
      <div className="px-4 py-6 space-y-6">
        {activeCategoryData && activeCategoryData.dishes.length > 0 ? (
          <>
            {/* Category title */}
            <div className="pt-2 pb-2 border-b border-amber-900/20">
              <h2 className="text-xl font-light text-stone-100 tracking-wide">
                {activeCategoryData.name}
              </h2>
              {activeCategoryData.description && (
                <p className="text-xs text-stone-500 mt-1">
                  {activeCategoryData.description}
                </p>
              )}
            </div>

            {/* Dishes */}
            <div className="grid grid-cols-1 gap-4">
              {activeCategoryData.dishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onSelect={(selected) => {
                    setSelectedDish(selected);
                    setDetailOpen(true);
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-stone-500 text-sm">
              No dishes available in this category
            </p>
          </div>
        )}
      </div>

      {/* Dish detail modal */}
      <DishDetail
        dish={selectedDish}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent px-4 py-4 border-t border-amber-900/20 text-center text-xs text-stone-500">
        <p>Questions? Ask your server for menu details</p>
      </div>
    </div>
  );
}
