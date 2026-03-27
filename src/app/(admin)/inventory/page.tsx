"use client";


import Link from "next/link";
import { Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/shared";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const inventory = [
  {
    id: 1,
    name: "Hammour Fillet",
    category: "Seafood",
    current: 45,
    minimum: 50,
    unit: "kg",
    status: "LOW",
    value: 9000,
  },
  {
    id: 2,
    name: "Saffron Threads",
    category: "Spices",
    current: 5,
    minimum: 20,
    unit: "g",
    status: "CRITICAL",
    value: 2500,
  },
  {
    id: 3,
    name: "Fresh Herbs Mix",
    category: "Produce",
    current: 12,
    minimum: 30,
    unit: "kg",
    status: "LOW",
    value: 360,
  },
  {
    id: 4,
    name: "Argan Oil",
    category: "Oils",
    current: 8,
    minimum: 5,
    unit: "L",
    status: "OK",
    value: 2400,
  },
  {
    id: 5,
    name: "Premium Beef",
    category: "Meat",
    current: 18,
    minimum: 25,
    unit: "kg",
    status: "LOW",
    value: 3600,
  },
  {
    id: 6,
    name: "Organic Lemons",
    category: "Produce",
    current: 40,
    minimum: 50,
    unit: "units",
    status: "LOW",
    value: 400,
  },
  {
    id: 7,
    name: "Olive Oil (Premium)",
    category: "Oils",
    current: 25,
    minimum: 10,
    unit: "L",
    status: "OK",
    value: 5000,
  },
  {
    id: 8,
    name: "Couscous",
    category: "Grains",
    current: 120,
    minimum: 50,
    unit: "kg",
    status: "OK",
    value: 2400,
  },
];

export default function InventoryPage() {
  const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);
  const lowStock = inventory.filter((item) => item.status !== "OK").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion de l&apos;Inventaire"
        description="Surveiller et gérer les niveaux de stock"
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Total Artikelen</p>
                <p className="text-3xl font-semibold text-stone-100">
                  {inventory.length}
                </p>
              </div>
              <Package className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Articles en Stock Faible</p>
              <p className="text-3xl font-semibold text-yellow-400">{lowStock}</p>
              <p className="text-xs text-stone-400 mt-2">Nécessite réapprovisionnement</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Valeur Totale</p>
              <p className="text-3xl font-semibold text-stone-100">
                {(totalValue / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-stone-400 mt-2">MAD</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Santé de l&apos;Inventaire</p>
              <p className="text-3xl font-semibold text-emerald-400">75%</p>
              <p className="text-xs text-stone-400 mt-2">Au-dessus du minimum</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="text-sm text-stone-400 block mb-2">
                Rechercher Articles
              </label>
              <Input
                placeholder="Rechercher par nom d&apos;article..."
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm text-stone-400 block mb-2">
                Catégorie
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-stone-800 border-stone-700">
                  <SelectItem value="all">Toutes les Catégories</SelectItem>
                  <SelectItem value="seafood">Fruits de Mer</SelectItem>
                  <SelectItem value="meat">Viande</SelectItem>
                  <SelectItem value="produce">Produits Frais</SelectItem>
                  <SelectItem value="spices">Épices</SelectItem>
                  <SelectItem value="oils">Huiles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              + Nouvel Article
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Articles de l&apos;Inventaire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Article</TableHead>
                  <TableHead className="text-stone-400">Catégorie</TableHead>
                  <TableHead className="text-stone-400">Stock Actuel</TableHead>
                  <TableHead className="text-stone-400">Stock Min</TableHead>
                  <TableHead className="text-stone-400">Statut</TableHead>
                  <TableHead className="text-stone-400">Valeur</TableHead>
                  <TableHead className="text-stone-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-stone-100">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-stone-100">
                      {item.current} {item.unit}
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {item.minimum} {item.unit}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.status === "CRITICAL"
                            ? "bg-red-900/30 text-red-200"
                            : item.status === "LOW"
                              ? "bg-yellow-900/30 text-yellow-200"
                              : "bg-emerald-900/30 text-emerald-200"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {item.value.toLocaleString()} MAD
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-400 hover:text-amber-300"
                        asChild
                      >
                        <Link href={`/admin/inventory/${item.id}`}>Voir</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}