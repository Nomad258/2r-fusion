"use client";


import { Star, Package } from "lucide-react";
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


const suppliers = [
  {
    id: 1,
    name: "Premium Seafood Co",
    contact: "Ahmed Slaoui",
    phone: "+212 612345678",
    email: "ahmed@premiumseafood.ma",
    rating: 4.8,
    reliability: 98,
    products: 12,
    activePO: 2,
  },
  {
    id: 2,
    name: "Atlantic Fish Imports",
    contact: "Karim Bennani",
    phone: "+212 612345679",
    email: "karim@atlanticfish.ma",
    rating: 4.5,
    reliability: 95,
    products: 8,
    activePO: 1,
  },
  {
    id: 3,
    name: "Fresh Produce Market",
    contact: "Layla Ouhammou",
    phone: "+212 612345680",
    email: "layla@freshmarket.ma",
    rating: 4.3,
    reliability: 92,
    products: 15,
    activePO: 3,
  },
  {
    id: 4,
    name: "Organic Spice House",
    contact: "Mohammad Khaldi",
    phone: "+212 612345681",
    email: "mohammad@spicehouse.ma",
    rating: 4.9,
    reliability: 99,
    products: 6,
    activePO: 0,
  },
  {
    id: 5,
    name: "Local Butcher Supply",
    contact: "Hassan Rami",
    phone: "+212 612345682",
    email: "hassan@localbutcher.ma",
    rating: 4.2,
    reliability: 90,
    products: 5,
    activePO: 1,
  },
];

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Suppliers"
        description="Manage supplier relationships and performance"
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Active Suppliers</p>
                <p className="text-3xl font-semibold text-stone-100">5</p>
              </div>
              <Package className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Avg Rating</p>
              <p className="text-3xl font-semibold text-amber-400">4.54</p>
              <p className="text-xs text-stone-400 mt-2">out of 5</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Total Products</p>
              <p className="text-3xl font-semibold text-stone-100">46</p>
              <p className="text-xs text-stone-400 mt-2">SKUs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Active POs</p>
              <p className="text-3xl font-semibold text-stone-100">7</p>
              <p className="text-xs text-stone-400 mt-2">Purchase orders</p>
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
                Search Suppliers
              </label>
              <Input
                placeholder="Search by name or contact..."
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              + Add Supplier
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">All Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Supplier</TableHead>
                  <TableHead className="text-stone-400">Contact</TableHead>
                  <TableHead className="text-stone-400">Rating</TableHead>
                  <TableHead className="text-stone-400">Reliability</TableHead>
                  <TableHead className="text-stone-400">Products</TableHead>
                  <TableHead className="text-stone-400">Active POs</TableHead>
                  <TableHead className="text-stone-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow
                    key={supplier.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-stone-100">
                      {supplier.name}
                    </TableCell>
                    <TableCell className="text-stone-400">
                      <div className="text-sm">
                        <p>{supplier.contact}</p>
                        <p className="text-xs text-stone-500">{supplier.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="text-stone-100 font-medium">
                          {supplier.rating}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          supplier.reliability >= 95
                            ? "bg-emerald-900/30 text-emerald-200"
                            : "bg-yellow-900/30 text-yellow-200"
                        }
                      >
                        {supplier.reliability}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {supplier.products}
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {supplier.activePO}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-400 hover:text-amber-300"
                      >
                        View
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
