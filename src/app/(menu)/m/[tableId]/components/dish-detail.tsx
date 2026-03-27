"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dish } from "@prisma/client";
import { X } from "lucide-react";

interface DishDetailProps {
  dish: Dish | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relatedDishes?: Dish[];
}

export function DishDetail({
  dish,
  open,
  onOpenChange,
  relatedDishes = [],
}: DishDetailProps) {
  const [quantity, setQuantity] = useState(1);

  if (!dish) return null;

  const ingredients = dish.ingredients
    ? dish.ingredients.split("\n").filter((i) => i.trim())
    : [];

  const allergens = dish.allergens
    ? dish.allergens.split(",").map((a) => a.trim())
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto bg-gradient-to-b from-stone-900 to-stone-950 border-amber-900/30 rounded-lg">
        <DialogHeader className="relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="pr-4 space-y-6">
            {/* Image */}
            <div className="w-full h-64 bg-gradient-to-b from-amber-950/20 to-stone-950 rounded-lg border border-amber-900/20 flex items-center justify-center overflow-hidden">
              {dish.imageUrl ? (
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-amber-900/40 text-6xl">✦</div>
              )}
            </div>

            {/* Title & badges */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h2 className="text-2xl font-semibold text-stone-100">
                    {dish.name}
                  </h2>
                  {dish.nameFr && (
                    <p className="text-sm text-amber-700/70 font-light italic">
                      {dish.nameFr}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  {dish.isChefSpecial && (
                    <Badge className="bg-amber-900 text-amber-50">
                      Chef&apos;s Special
                    </Badge>
                  )}
                  {dish.isNew && (
                    <Badge className="bg-emerald-900 text-emerald-50">
                      New
                    </Badge>
                  )}
                  {dish.isSeasonal && (
                    <Badge className="bg-blue-900 text-blue-50">
                      Seasonal
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-light text-amber-100">
                {dish.price.toFixed(0)} MAD
              </span>
              {dish.compareAtPrice && (
                <span className="text-lg text-stone-500 line-through">
                  {dish.compareAtPrice.toFixed(0)} MAD
                </span>
              )}
            </div>

            {/* Description */}
            {dish.description && (
              <div>
                <p className="text-stone-300 leading-relaxed">
                  {dish.description}
                </p>
              </div>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-stone-900/50 rounded-lg border border-amber-900/10">
              {dish.prepTimeMinutes && (
                <div>
                  <p className="text-xs text-stone-500">Prep Time</p>
                  <p className="text-sm font-light text-stone-200">
                    {dish.prepTimeMinutes} min
                  </p>
                </div>
              )}
              {dish.spiceLevel && (
                <div>
                  <p className="text-xs text-stone-500">Spice Level</p>
                  <p className="text-sm font-light text-stone-200">
                    {"🌶️".repeat(dish.spiceLevel)}
                  </p>
                </div>
              )}
              {dish.totalOrdered > 0 && (
                <div>
                  <p className="text-xs text-stone-500">Most Popular</p>
                  <p className="text-sm font-light text-stone-200">
                    {dish.totalOrdered} ordered
                  </p>
                </div>
              )}
              {dish.rating > 0 && (
                <div>
                  <p className="text-xs text-stone-500">Rating</p>
                  <p className="text-sm font-light text-stone-200">
                    ⭐ {dish.rating.toFixed(1)}
                  </p>
                </div>
              )}
            </div>

            {/* Ingredients */}
            {ingredients.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-amber-100 mb-3">
                  Ingredients
                </h3>
                <ul className="space-y-2">
                  {ingredients.map((ingredient, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-stone-400 flex items-start"
                    >
                      <span className="text-amber-700 mr-2">•</span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Allergens */}
            {allergens.length > 0 && (
              <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-lg">
                <h3 className="text-sm font-semibold text-red-200 mb-2">
                  Allergens
                </h3>
                <p className="text-sm text-red-200/80">{allergens.join(", ")}</p>
              </div>
            )}

            {/* Pairing suggestion */}
            {dish.pairingSuggestion && (
              <div className="p-3 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                <h3 className="text-sm font-semibold text-amber-200 mb-2">
                  Wine Pairing
                </h3>
                <p className="text-sm text-amber-200/80">
                  {dish.pairingSuggestion}
                </p>
              </div>
            )}

            {/* Chef notes */}
            <div className="p-3 bg-stone-900/50 border border-amber-900/10 rounded-lg">
              <p className="text-xs text-stone-500 italic">
                &quot;At 2R Fusion, we craft every dish with precision and passion,
                using the finest ingredients from local artisans and global
                suppliers.&quot;
              </p>
            </div>

            {/* CTA */}
            <div className="sticky bottom-0 bg-gradient-to-t from-stone-950 to-transparent pt-4 pb-2 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-stone-900/50 rounded-lg border border-amber-900/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-amber-700 hover:text-amber-600"
                >
                  −
                </Button>
                <span className="flex-1 text-center text-sm font-light">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-amber-700 hover:text-amber-600"
                >
                  +
                </Button>
              </div>
              <Button
                disabled={!dish.isAvailable}
                className="w-full bg-amber-700 hover:bg-amber-600 text-stone-950 font-semibold"
              >
                {dish.isAvailable ? "Add to Order" : "Currently Unavailable"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
