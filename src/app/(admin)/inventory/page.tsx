"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, ScanBarcode } from "lucide-react";
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
import { ScanDialog } from "./components/scan-dialog";
const inventory = [
  { id: 1, name: "Filet de Hammour", barcode: "6111234567890", category: "Fruits de Mer", current: 45, minimum: 50, unit: "kg", status: "LOW", value: 9000 },
  { id: 2, name: "Filaments de Safran", barcode: "6111234567891", category: "Épices", current: 5, minimum: 20, unit: "g", status: "CRITICAL", value: 2500 },
  { id: 3, name: "Mélange d'Herbes Fraîches", barcode: "6111234567892", category: "Produits Frais", current: 12, minimum: 30, unit: "kg", status: "LOW", value: 360 },
  { id: 4, name: "Huile d'Argan", barcode: "6111234567893", category: "Huiles", current: 8, minimum: 5, unit: "L", status: "OK", value: 2400 },
  { id: 5, name: "Bœuf Premium", barcode: "6111234567894", category: "Viande", current: 18, minimum: 25, unit: "kg", status: "LOW", value: 3600 },
  { id: 6, name: "Citrons Bio", barcode: "6111234567895", category: "Produits Frais", current: 40, minimum: 50, unit: "unités", status: "LOW", value: 400 },
  { id: 7, name: "Huile d'Olive (Premium)", barcode: "6111234567896", category: "Huiles", current: 25, minimum: 10, unit: "L", status: "OK", value: 5000 },
  { id: 8, name: "Couscous", barcode: "6111234567897", category: "Céréales", current: 120, minimum: 50, unit: "kg", status: "OK", value: 2400 },
];

export default function InventoryPage() {
  const [scanOpen, setScanOpen] = useState(false);
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
                <p className="text-sm text-stone-400 mb-1">Total Articles</p>
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
              <p className="text-xs text-stone-400 mt-2">Nécessite réapprovisionnement</p>            </div>
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
      {/* Filters + Scan Button */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="text-sm text-stone-400 block mb-2">
                Rechercher Articles
              </label>
              <Input
                placeholder="Rechercher par nom d&apos;article ou code-barres..."
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
            </div>            <Button
              onClick={() => setScanOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 gap-2"
            >
              <ScanBarcode className="h-4 w-4" />
              Scanner Code-Barres
            </Button>
            <Button className="bg-stone-700 hover:bg-stone-600">
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
                  <TableHead className="text-stone-400">Code-Barres</TableHead>
                  <TableHead className="text-stone-400">Catégorie</TableHead>
                  <TableHead className="text-stone-400">Stock Actuel</TableHead>
                  <TableHead className="text-stone-400">Stock Min</TableHead>                  <TableHead className="text-stone-400">Statut</TableHead>
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
                    <TableCell className="font-mono text-xs text-stone-400">
                      {item.barcode}
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
                          item.status === "CRITICAL"                            ? "bg-red-900/30 text-red-200"
                            : item.status === "LOW"
                              ? "bg-yellow-900/30 text-yellow-200"
                              : "bg-emerald-900/30 text-emerald-200"
                        }
                      >
                        {item.status === "CRITICAL" ? "CRITIQUE" : item.status === "LOW" ? "BAS" : "OK"}
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
                        <Link href={`/inventory/${item.id}`}>Voir</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Barcode Scan Dialog */}
      <ScanDialog open={scanOpen} onOpenChange={setScanOpen} />
    </div>
  );
}