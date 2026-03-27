"use client";


import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dish } from "@prisma/client";

interface DishCardProps {
  dish: Dish;
  onSelect: (dish: Dish) => void;
}

const getDietaryIcons = (tags: string | null) => {
  if (!tags) return null;
  const tagsArray = tags.split(",").map((t) => t.trim());
  const icons: { [key: string]: { label: string; symbol: string } } = {
    vegan: { label: "Vegan", symbol: "🌱" },
    vegetarian: { label: "Vegetarian", symbol: "🥬" },
    glutenfree: { label: "Gluten Free", symbol: "🌾" },
    dairyfree: { label: "Dairy Free", symbol: "🥛" },
    spicy: { label: "Spicy", symbol: "🌶️" },
    nuts: { label: "Contains Nuts", symbol: "🥜" },
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tagsArray.map((tag) => {
        const icon = icons[tag.toLowerCase()];
        return icon ? (
          <div key={tag} className="flex items-center gap-1 text-xs">
            <span>{icon.symbol}</span>
          </div>
        ) : null;
      })}
    </div>
  );
};

export function DishCard({ dish, onSelect }: DishCardProps) {
  return (
    <Card
      className="group cursor-pointer bg-gradient-to-br from-stone-900 to-stone-950 border-amber-900/20 hover:border-amber-700/50 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-amber-900/20"
      onClick={() => onSelect(dish)}
    >
      {/* Image placeholder */}
      <div className="relative w-full h-40 bg-gradient-to-b from-amber-950/20 to-stone-950 border-b border-amber-900/20 flex items-center justify-center overflow-hidden">
        {dish.imageUrl ? (
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-amber-900/40 text-4xl">✦</div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-2 justify-end">
          {dish.isChefSpecial && (
            <Badge className="bg-amber-900 text-amber-50 hover:bg-amber-800 text-xs">
              Chef&apos;s Special
            </Badge>
          )}
          {dish.isNew && (
            <Badge className="bg-emerald-900 text-emerald-50 hover:bg-emerald-800 text-xs">
              New
            </Badge>
          )}
          {!dish.isAvailable && (
            <Badge className="bg-red-900 text-red-50 hover:bg-red-800 text-xs">
              Unavailable
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <div className="mb-2">
          <h3 className="font-semibold text-stone-100 text-sm leading-tight">
            {dish.name}
          </h3>
          {dish.nameFr && (
            <p className="text-xs text-amber-700/70 font-light italic">
              {dish.nameFr}
            </p>
          )}
        </div>

        {/* Description */}
        {dish.description && (
          <p className="text-xs text-stone-400 mb-3 line-clamp-2">
            {dish.description}
          </p>
        )}

        {/* Dietary icons */}
        {dish.dietaryTags && (
          <div className="mb-3">{getDietaryIcons(dish.dietaryTags)}</div>
        )}

        {/* Price */}
        <div className="flex items-baseline justify-between pt-3 border-t border-amber-900/10">
          <span className="text-amber-100 font-light">
            {dish.price.toFixed(0)} MAD
          </span>
          {dish.compareAtPrice && (
            <span className="text-xs text-stone-500 line-through">
              {dish.compareAtPrice.toFixed(0)} MAD
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
