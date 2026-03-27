"use client";


import Link from "next/link";
import { Eye, EyeOff, Edit, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared";
import { Switch } from "@/components/ui/switch";


const categories = [
  {
    id: 1,
    name: "Appetizers",
    order: 1,
    items: 8,
    visible: true,
    vipOnly: false,
    dishes: [
      { id: 101, name: "Seafood Platter", price: 280, available: true },
      { id: 102, name: "Vegetable Crudites", price: 120, available: true },
      { id: 103, name: "Saffron Hummus", price: 95, available: false },
    ],
  },
  {
    id: 2,
    name: "Main Courses",
    order: 2,
    items: 12,
    visible: true,
    vipOnly: false,
    dishes: [
      { id: 201, name: "Grilled Hammour", price: 450, available: true },
      { id: 202, name: "Tagine Lamb", price: 380, available: true },
      { id: 203, name: "Couscous Royal", price: 320, available: true },
    ],
  },
  {
    id: 3,
    name: "VIP Specials",
    order: 3,
    items: 5,
    visible: true,
    vipOnly: true,
    dishes: [
      { id: 301, name: "Premium Wagyu", price: 650, available: true },
      { id: 302, name: "Lobster Thermidor", price: 580, available: true },
    ],
  },
  {
    id: 4,
    name: "Desserts",
    order: 4,
    items: 6,
    visible: true,
    vipOnly: false,
    dishes: [
      { id: 401, name: "Baklava", price: 85, available: true },
      { id: 402, name: "Pastilla", price: 95, available: true },
    ],
  },
  {
    id: 5,
    name: "Beverages",
    order: 5,
    items: 10,
    visible: true,
    vipOnly: false,
    dishes: [
      { id: 501, name: "Moroccan Mint Tea", price: 45, available: true },
      { id: 502, name: "Fresh Orange Juice", price: 50, available: true },
    ],
  },
];

export default function MenuManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Menu Management"
          description="Manage categories and dishes"
        />
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Plus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="space-y-4">
        {categories.map((category) => (
          <Card key={category.id} className="bg-stone-900 border-stone-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-stone-100">
                      {category.name}
                    </CardTitle>
                    {category.vipOnly && (
                      <Badge className="bg-amber-900/30 text-amber-200">
                        VIP ONLY
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-stone-400">
                    {category.items} items • Position {category.order}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    {category.visible ? (
                      <Eye className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-stone-500" />
                    )}
                    <Switch checked={category.visible} />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-amber-400 hover:text-amber-300"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-stone-800/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-stone-100">
                          {dish.name}
                        </p>
                        {!dish.available && (
                          <Badge
                            variant="secondary"
                            className="bg-red-900/30 text-red-200 text-xs"
                          >
                            UNAVAILABLE
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-stone-400">{dish.price} MAD</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-400 hover:text-amber-300"
                        asChild
                      >
                        <Link href={`/admin/menu-management/dishes/${dish.id}`}>
                          Edit
                        </Link>
                      </Button>
                      <Switch checked={dish.available} />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-stone-700 text-amber-400"
              >
                + Add Dish
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
