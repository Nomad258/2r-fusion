"use client";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const dishData = {
  id: 201,
  name: "Grilled Hammour",
  category: "Main Courses",
  price: 450,
  costPrice: 180,
  available: true,
  description:
    "Fresh Gulf hammour grilled with Moroccan spices and served with seasonal vegetables",
  recipe: {
    prep_time: "15 min",
    cook_time: "25 min",
    servings: 1,
    ingredients: [
      { name: "Hammour Fillet", qty: "400g", cost: 120 },
      { name: "Olive Oil", qty: "30ml", cost: 8 },
      { name: "Saffron Threads", qty: "0.5g", cost: 25 },
      { name: "Lemon Juice", qty: "30ml", cost: 2 },
      { name: "Garlic", qty: "10g", cost: 1 },
      { name: "Seasonal Vegetables", qty: "150g", cost: 24 },
    ],
  },
  allergens: ["Fish", "Sulfites"],
  tags: ["Signature", "Premium", "Gluten-Free"],
};

export default function DishDetailPage({ params }: { params: { id: string } }) {
  const profit = dishData.price - dishData.recipe.ingredients.reduce((sum, i) => sum + i.cost, 0);
  const margin = ((profit / dishData.price) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <PageHeader
        title={dishData.name}
        description={`${dishData.category} • ${dishData.price} MAD`}
      />

      {/* Main Info */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-stone-900 border-stone-800 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-stone-100">Informations Plat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-stone-400 mb-2">Description</p>
              <p className="text-stone-100">{dishData.description}</p>
            </div>

            {/* Tags */}
            <div>
              <p className="text-sm text-stone-400 mb-3">Étiquettes</p>
              <div className="flex flex-wrap gap-2">
                {dishData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-amber-900/30 text-amber-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Allergens */}
            <div>
              <p className="text-sm text-stone-400 mb-3">Allergènes</p>
              <div className="flex flex-wrap gap-2">
                {dishData.allergens.map((allergen) => (
                  <Badge
                    key={allergen}
                    className="bg-red-900/30 text-red-200"
                  >
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Analysis */}
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Analyse Coûts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-stone-400">Prix Vente</p>
              <p className="text-3xl font-semibold text-stone-100">
                {dishData.price}
              </p>
              <p className="text-xs text-stone-400">MAD</p>
            </div>
            <div>
              <p className="text-sm text-stone-400">Coût Prix</p>
              <p className="text-2xl font-semibold text-stone-100">
                {dishData.recipe.ingredients.reduce((sum, i) => sum + i.cost, 0)}
              </p>
              <p className="text-xs text-stone-400">MAD</p>
            </div>
            <div>
              <p className="text-sm text-stone-400">Bénéfice</p>
              <p className="text-2xl font-semibold text-emerald-400">
                {profit}
              </p>
              <p className="text-xs text-stone-400">MAD</p>
            </div>
            <div>
              <p className="text-sm text-stone-400">Marge</p>
              <p className="text-2xl font-semibold text-amber-400">
                {margin}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recipe Tab */}
      <Tabs defaultValue="recipe" className="space-y-6">
        <TabsList className="bg-stone-800 border-stone-700">
          <TabsTrigger value="recipe">Recette & Ingrédients</TabsTrigger>
          <TabsTrigger value="linked">Recettes Liées</TabsTrigger>
        </TabsList>

        <TabsContent value="recipe">
          <Card className="bg-stone-900 border-stone-800">
            <CardHeader>
              <CardTitle className="text-stone-100">Détails Recette</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prep Info */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-4 rounded-lg bg-stone-800/50">
                  <p className="text-sm text-stone-400 mb-1">Temps Préparation</p>
                  <p className="text-lg font-semibold text-stone-100">
                    {dishData.recipe.prep_time}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-stone-800/50">
                  <p className="text-sm text-stone-400 mb-1">Temps Cuisson</p>
                  <p className="text-lg font-semibold text-stone-100">
                    {dishData.recipe.cook_time}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-stone-800/50">
                  <p className="text-sm text-stone-400 mb-1">Portions</p>
                  <p className="text-lg font-semibold text-stone-100">
                    {dishData.recipe.servings}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-stone-800/50">
                  <p className="text-sm text-stone-400 mb-1">Statut</p>
                  <Badge className="bg-emerald-900/30 text-emerald-200">
                    Disponible
                  </Badge>
                </div>
              </div>

              {/* Ingredients Table */}
              <div>
                <h3 className="text-lg font-semibold text-stone-100 mb-4">
                  Ingrédients
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-stone-800 hover:bg-transparent">
                        <TableHead className="text-stone-400">Article</TableHead>
                        <TableHead className="text-stone-400">Quantité</TableHead>
                        <TableHead className="text-stone-400">Coût</TableHead>
                        <TableHead className="text-stone-400">Inventaire</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dishData.recipe.ingredients.map((ingredient) => (
                        <TableRow
                          key={ingredient.name}
                          className="border-stone-800 hover:bg-stone-800/50"
                        >
                          <TableCell className="font-medium text-stone-100">
                            {ingredient.name}
                          </TableCell>
                          <TableCell className="text-stone-400">
                            {ingredient.qty}
                          </TableCell>
                          <TableCell className="text-stone-400">
                            {ingredient.cost} MAD
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-amber-400 hover:text-amber-300"
                            >
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="linked">
          <Card className="bg-stone-900 border-stone-800">
            <CardHeader>
              <CardTitle className="text-stone-100">Recettes Liées</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-stone-400">Aucune recette liée trouvée.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button className="bg-amber-600 hover:bg-amber-700">
              Modifier Plat
            </Button>
            <Button variant="outline" className="border-stone-700">
              Imprimer Recette
            </Button>
            <Button variant="outline" className="border-stone-700">
              Voir Ventes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
