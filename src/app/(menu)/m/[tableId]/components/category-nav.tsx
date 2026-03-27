"use client";

import { useRef, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MenuCategory } from "@prisma/client";

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll active category into view
    if (scrollRef.current) {
      const activeButton = scrollRef.current.querySelector(
        `[data-category="${activeCategory}"]`
      );
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-16 z-40 bg-stone-950/95 backdrop-blur-sm border-b border-amber-900/20">
      <ScrollArea className="w-full">
        <div ref={scrollRef} className="flex gap-2 px-4 py-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              data-category={category.id}
              variant={activeCategory === category.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={`whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? "bg-amber-700 text-stone-950 hover:bg-amber-600"
                  : "text-stone-400 hover:text-amber-200"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
