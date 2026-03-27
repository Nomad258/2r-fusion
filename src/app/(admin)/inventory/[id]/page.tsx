"use client";


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const stockData = [
  { date: "Mar 20", quantity: 35 },
  { date: "Mar 21", quantity: 38 },
  { date: "Mar 22", quantity: 42 },
  { date: "Mar 23", quantity: 48 },
  { date: "Mar 24", quantity: 52 },
  { date: "Mar 25", quantity: 45 },
];

const batches = [
  {
    id: "B-001",
    qty: 25,
    unit: "kg",
    supplier: "Premium Seafood Co",
    date: "2026-03-15",
    expiry: "2026-04-15",
  },
  {
    id: "B-002",
    qty: 20,
    unit: "kg",
    supplier: "Atlantic Fish Imports",
    date: "2026-03-20",
    expiry: "2026-04-20",
  },
];

const movements = [
  { date: "2026-03-25", type: "USAGE", qty: 7, note: "3 commandes - Hammour Grilled" },
  { date: "2026-03-25", type: "USAGE", qty: 5, note: "2 commandes - Hammour Tagine" },
  { date: "2026-03-24", type: "USAGE", qty: 8, note: "4 commandes - Hammour Grilled" },
  { date: "2026-03-23", type: "PURCHASE", qty: 20, note: "Livraison de Atlantic Fish" },
  { date: "2026-03-22", type: "USAGE", qty: 6, note: "3 commandes - Hammour Grilled" },
];

export default function InventoryDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hammour Fillet"
        description="Fruits de Mer • 45 kg • Statut: Stock Faible"
      />

      {/* Key Info */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Stock Actuel</p>
              <p className="text-3xl font-semibold text-stone-100">45</p>
              <p className="text-xs text-stone-400 mt-2">kg</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Niveau Minimum</p>
              <p className="text-3xl font-semibold text-yellow-400">50</p>
              <p className="text-xs text-stone-400 mt-2">kg</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Valeur du Stock</p>
              <p className="text-3xl font-semibold text-amber-400">9,000</p>
              <p className="text-xs text-stone-400 mt-2">MAD</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Utilisation Moyenne Quotidienne</p>
              <p className="text-3xl font-semibold text-stone-100">6.5</p>
              <p className="text-xs text-stone-400 mt-2">kg</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Chart */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Tendance du Niveau de Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#44403c" />
              <XAxis dataKey="date" stroke="#a8a29e" />
              <YAxis stroke="#a8a29e" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1c1917",
                  border: "1px solid #78716b",
                }}
                labelStyle={{ color: "#fef3c7" }}
              />
              <Line
                type="monotone"
                dataKey="quantity"
                stroke="#b45309"
                strokeWidth={2}
                dot={{ fill: "#b45309" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Batches */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Lots Actuels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">ID Lot</TableHead>
                  <TableHead className="text-stone-400">Quantité</TableHead>
                  <TableHead className="text-stone-400">Fournisseur</TableHead>
                  <TableHead className="text-stone-400">Date de Réception</TableHead>
                  <TableHead className="text-stone-400">Date d&apos;Expiration</TableHead>
                  <TableHead className="text-stone-400">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.map((batch) => {
                  const isExpiringSoon = new Date(batch.expiry) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                  return (
                    <TableRow
                      key={batch.id}
                      className="border-stone-800 hover:bg-stone-800/50"
                    >
                      <TableCell className="font-medium text-amber-400">
                        {batch.id}
                      </TableCell>
                      <TableCell className="text-stone-100">
                        {batch.qty} {batch.unit}
                      </TableCell>
                      <TableCell className="text-stone-400">
                        {batch.supplier}
                      </TableCell>
                      <TableCell className="text-stone-400">
                        {batch.date}
                      </TableCell>
                      <TableCell className="text-stone-100">
                        {batch.expiry}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            isExpiringSoon
                              ? "bg-red-900/30 text-red-200"
                              : "bg-emerald-900/30 text-emerald-200"
                          }
                        >
                          {isExpiringSoon ? "EXPIRE BIENTÔT" : "BON"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Movement History */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Historique des Mouvements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {movements.map((movement, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-stone-800/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      className={
                        movement.type === "PURCHASE"
                          ? "bg-emerald-900/30 text-emerald-200"
                          : "bg-amber-900/30 text-amber-200"
                      }
                    >
                      {movement.type === "PURCHASE" ? "ACHAT" : "UTILISATION"}
                    </Badge>
                    <p className="text-sm font-medium text-stone-100">
                      {movement.qty} {movement.type === "PURCHASE" ? "kg ajoutés" : "kg utilisés"}
                    </p>
                  </div>
                  <p className="text-xs text-stone-400">{movement.note}</p>
                </div>
                <p className="text-sm text-stone-400">{movement.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button className="bg-amber-600 hover:bg-amber-700">
              Ajuster Stock
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              Nouvelle Commande d&apos;Achat
            </Button>
            <Button variant="outline" className="border-stone-700">
              Voir Plats Liés
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}