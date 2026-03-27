"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, AlertCircle, Zap, Package } from "lucide-react";
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

const demandByCategory = [
  { category: "Seafood", demand: 3100 },
  { category: "Premium Meats", demand: 2890 },
  { category: "Vegetables", demand: 2340 },
  { category: "Dairy", demand: 1560 },
  { category: "Spices", demand: 1240 },
  { category: "Beverages", demand: 1670 },
  { category: "Oils & Sauces", demand: 890 },
  { category: "Grains & Pasta", demand: 1120 },
];

const forecastItems = [
  { id: 1, item: "Saffron Threads (Premium)", currentStock: 45, predictedNeed: 120, reorderQty: 100, confidence: 94, supplier: "Spice Masters Maroc", estCost: 12500 },
  { id: 2, item: "Argan Oil (Bio)", currentStock: 28, predictedNeed: 85, reorderQty: 75, confidence: 91, supplier: "Cooperative Taznakht", estCost: 4200 },
  { id: 3, item: "Bluefin Tuna (Mediterranean)", currentStock: 12, predictedNeed: 45, reorderQty: 40, confidence: 97, supplier: "Port de Tanger Frais", estCost: 3800 },
  { id: 4, item: "Wagyu A5 (Japan)", currentStock: 18, predictedNeed: 60, reorderQty: 50, confidence: 89, supplier: "Luxury Meat Imports", estCost: 15600 },
  { id: 5, item: "Black Truffle (Perigord)", currentStock: 8, predictedNeed: 22, reorderQty: 18, confidence: 86, supplier: "France Delice", estCost: 8900 },
  { id: 6, item: "Foie Gras Premium", currentStock: 15, predictedNeed: 38, reorderQty: 30, confidence: 92, supplier: "Maison du Foie", estCost: 4500 },
  { id: 7, item: "Capers (Pantelleria)", currentStock: 32, predictedNeed: 75, reorderQty: 60, confidence: 88, supplier: "Italy Imports", estCost: 2100 },
  { id: 8, item: "Sweetbreads (French)", currentStock: 22, predictedNeed: 55, reorderQty: 40, confidence: 90, supplier: "French Butcher Select", estCost: 6800 },
  { id: 9, item: "King Prawns (Giant)", currentStock: 16, predictedNeed: 50, reorderQty: 42, confidence: 95, supplier: "Maroc Seafood Pro", estCost: 5200 },
  { id: 10, item: "Blue Lobster (Live)", currentStock: 6, predictedNeed: 18, reorderQty: 15, confidence: 96, supplier: "Atlantic Premium", estCost: 7200 },
  { id: 11, item: "Mozzarella di Bufala", currentStock: 20, predictedNeed: 65, reorderQty: 55, confidence: 93, supplier: "Campania Direct", estCost: 3400 },
  { id: 12, item: "Arborio Rice (Premium)", currentStock: 42, predictedNeed: 95, reorderQty: 65, confidence: 87, supplier: "Riseria Italiana", estCost: 1400 },
  { id: 13, item: "Fresh Herbs Mix", currentStock: 35, predictedNeed: 110, reorderQty: 85, confidence: 85, supplier: "Herbes du Rif", estCost: 1950 },
  { id: 14, item: "Yuzu Juice (Imported)", currentStock: 10, predictedNeed: 30, reorderQty: 25, confidence: 89, supplier: "Japan House Imports", estCost: 3200 },
  { id: 15, item: "Fleur de Sel (Guerande)", currentStock: 56, predictedNeed: 110, reorderQty: 75, confidence: 91, supplier: "Sel Blanc", estCost: 980 },
];

export default function ForecastsPage() {
  const totalCost = forecastItems.reduce((acc, item) => acc + item.estCost, 0);
  const itemsToReorder = forecastItems.filter((i) => i.currentStock < i.predictedNeed * 0.4).length;
  const avgConfidence = Math.round(forecastItems.reduce((acc, i) => acc + i.confidence, 0) / forecastItems.length);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Predictive Ordering"
        description="AI-powered demand forecasting and reorder recommendations"
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Forecast Total</p>
                <p className="text-3xl font-semibold text-stone-100">{totalCost.toLocaleString()}</p>
                <p className="text-xs text-stone-500 mt-1">MAD next week</p>
              </div>
              <TrendingUp className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Items to Reorder</p>
                <p className="text-3xl font-semibold text-red-400">{itemsToReorder}</p>
                <p className="text-xs text-stone-500 mt-1">below threshold</p>
              </div>
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Avg Confidence</p>
                <p className="text-3xl font-semibold text-emerald-400">{avgConfidence}%</p>
                <p className="text-xs text-stone-500 mt-1">model accuracy</p>
              </div>
              <Zap className="h-6 w-6 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Potential Savings</p>
                <p className="text-3xl font-semibold text-amber-400">8,450</p>
                <p className="text-xs text-stone-500 mt-1">MAD vs manual ordering</p>
              </div>
              <Package className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demand Chart */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Forecasted Demand by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demandByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#44403c" />
              <XAxis dataKey="category" stroke="#a8a29e" fontSize={12} />
              <YAxis stroke="#a8a29e" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1c1917", border: "1px solid #78716b" }}
                labelStyle={{ color: "#fef3c7" }}
              />
              <Bar dataKey="demand" fill="#b45309" radius={[4, 4, 0, 0]} name="Predicted Units" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Forecast Table */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-stone-100">Reorder Recommendations ({forecastItems.length} items)</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" className="border-stone-700 text-stone-300">Export</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Approve All</Button>
              <Button className="bg-amber-600 hover:bg-amber-700">Generate PO</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Item</TableHead>
                  <TableHead className="text-stone-400 text-right">Current</TableHead>
                  <TableHead className="text-stone-400 text-right">Predicted</TableHead>
                  <TableHead className="text-stone-400 text-right">Reorder</TableHead>
                  <TableHead className="text-stone-400 text-center">Confidence</TableHead>
                  <TableHead className="text-stone-400">Supplier</TableHead>
                  <TableHead className="text-stone-400 text-right">Est. Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forecastItems.map((item) => {
                  const urgent = item.currentStock < item.predictedNeed * 0.3;
                  return (
                    <TableRow
                      key={item.id}
                      className={`border-stone-800 ${urgent ? "bg-red-900/10" : "hover:bg-stone-800/50"}`}
                    >
                      <TableCell className="font-medium text-stone-100">
                        <div className="flex items-center gap-2">
                          {item.item}
                          {urgent && <Badge className="bg-red-900/30 text-red-200 text-xs">URGENT</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-stone-400">{item.currentStock}</TableCell>
                      <TableCell className="text-right text-stone-300">{item.predictedNeed}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className={urgent ? "border-red-500 text-red-400" : "border-amber-500 text-amber-400"}>
                          {item.reorderQty}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`font-mono text-sm ${item.confidence >= 90 ? "text-emerald-400" : item.confidence >= 85 ? "text-amber-400" : "text-stone-400"}`}>
                          {item.confidence}%
                        </span>
                      </TableCell>
                      <TableCell className="text-stone-400 text-sm">{item.supplier}</TableCell>
                      <TableCell className="text-right font-mono text-stone-300">{item.estCost.toLocaleString()} MAD</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
