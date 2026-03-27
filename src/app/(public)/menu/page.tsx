"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { AlertCircle, Leaf } from "lucide-react";

export default function MenuPage() {
interface MenuType {
  menuName: string;
  categories: Array<{
    id: string;
    name: string;
    description?: string;
    dishes: Array<{
      id: string;
      name: string;
      description?: string;
      price: number;
      isChefSpecial?: boolean;
      isNew?: boolean;
      allergens?: string[];
      dietaryTags?: string[];
    }>;
  }>;
}
  const [menu, setMenu] = useState<MenuType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok) throw new Error("Erreur de chargement du menu");
        const data = await response.json();
        setMenu(data);
        if (data.categories && data.categories.length > 0) {
          setActiveCategory(data.categories[0].id);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Erreur de chargement du menu");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-400">Chargement du menu...</p>
        </div>
      </div>
    );
  }

  const activeCat = menu?.categories?.find((c: any) => c.id === activeCategory);

  return (
    <>
      <section className="section-spacing border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="container-premium text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-heading font-bold">Notre Menu</h1>
            <div className="h-1 w-16 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto" />
            {menu?.menuName && <p className="text-lg text-stone-300">{menu.menuName}</p>}
          </div>
        </div>
      </section>

      <section className="section-spacing border-b border-stone-800">
        <div className="container-premium space-y-12">
          {menu?.categories && menu.categories.length > 0 && (
            <>
              <div className="flex flex-wrap gap-3 justify-center">
                {menu.categories.map((category: any) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-gold-500 text-black"
                        : "bg-stone-900 border border-stone-800 text-gold-400 hover:border-gold-500/50"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {activeCat && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-heading font-bold text-center text-gold-400">{activeCat.name}</h2>
                  {activeCat.description && (
                    <p className="text-center text-stone-300 max-w-2xl mx-auto">{activeCat.description}</p>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {activeCat.dishes && activeCat.dishes.map((dish: any) => (
                      <Card
                        key={dish.id}
                        className="bg-stone-900 border-stone-800 hover:border-gold-500/50 transition-all duration-300 p-6 space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-heading font-semibold text-gold-400">{dish.name}</h3>
                              {dish.description && (
                                <p className="text-stone-400 text-sm mt-1">{dish.description}</p>
                              )}
                            </div>
                            <p className="text-gold-500 font-semibold whitespace-nowrap">{dish.price} MAD</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                          {dish.isChefSpecial && (
                            <span className="px-3 py-1 bg-gold-500/20 border border-gold-500/50 rounded text-gold-400 text-xs font-semibold">
                              Spécialité du Chef
                            </span>
                          )}
                          {dish.isNew && (
                            <span className="px-3 py-1 bg-bronze-500/20 border border-bronze-500/50 rounded text-bronze-400 text-xs font-semibold">
                              Nouveau
                            </span>
                          )}
                        </div>

                        {(dish.allergens || dish.dietaryTags) && (
                          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-800">
                            {dish.allergens && dish.allergens.length > 0 && (
                              <div className="flex items-center gap-1 text-orange-400 text-xs">
                                <AlertCircle size={14} />
                                <span>{dish.allergens.join(", ")}</span>
                              </div>
                            )}
                            {dish.dietaryTags && dish.dietaryTags.length > 0 && (
                              <div className="flex items-center gap-1 text-green-400 text-xs">
                                <Leaf size={14} />
                                <span>{dish.dietaryTags.join(", ")}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}