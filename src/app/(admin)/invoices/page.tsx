"use client";


import { AlertTriangle } from "lucide-react";
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
import { PageHeader, StatusBadge } from "@/components/shared";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const invoices = [
  {
    id: "INV-2401",
    supplier: "Premium Seafood Co",
    amount: 4500,
    dueDate: "2026-04-05",
    date: "2026-03-20",
    status: "PENDING",
  },
  {
    id: "INV-2402",
    supplier: "Fresh Produce Market",
    amount: 2800,
    dueDate: "2026-03-30",
    date: "2026-03-15",
    status: "OVERDUE",
  },
  {
    id: "INV-2403",
    supplier: "Organic Spice House",
    amount: 1200,
    dueDate: "2026-04-10",
    date: "2026-03-25",
    status: "PENDING",
  },
  {
    id: "INV-2404",
    supplier: "Atlantic Fish Imports",
    amount: 3600,
    dueDate: "2026-03-28",
    date: "2026-03-10",
    status: "PAID",
  },
  {
    id: "INV-2405",
    supplier: "Local Butcher Supply",
    amount: 1800,
    dueDate: "2026-04-01",
    date: "2026-03-22",
    status: "PENDING",
  },
  {
    id: "INV-2406",
    supplier: "Premium Seafood Co",
    amount: 3200,
    dueDate: "2026-03-25",
    date: "2026-03-05",
    status: "OVERDUE",
  },
];

export default function InvoicesPage() {
  const pending = invoices.filter((inv) => inv.status === "PENDING").reduce((sum, inv) => sum + inv.amount, 0);
  const overdue = invoices.filter((inv) => inv.status === "OVERDUE").reduce((sum, inv) => sum + inv.amount, 0);
  const paid = invoices.filter((inv) => inv.status === "PAID").reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Manage supplier invoices and payments"
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Total Outstanding</p>
                <p className="text-3xl font-semibold text-yellow-400">
                  {(pending + overdue).toLocaleString()}
                </p>
                <p className="text-xs text-stone-400 mt-2">MAD</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Overdue Amount</p>
              <p className="text-3xl font-semibold text-red-400">
                {overdue.toLocaleString()}
              </p>
              <p className="text-xs text-stone-400 mt-2">MAD</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Total Paid</p>
              <p className="text-3xl font-semibold text-emerald-400">
                {paid.toLocaleString()}
              </p>
              <p className="text-xs text-stone-400 mt-2">MAD</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Pending Invoices</p>
              <p className="text-3xl font-semibold text-stone-100">
                {invoices.filter((inv) => inv.status === "PENDING").length}
              </p>
              <p className="text-xs text-stone-400 mt-2">invoices</p>
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
                Search Invoices
              </label>
              <Input
                placeholder="Search by invoice ID or supplier..."
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm text-stone-400 block mb-2">
                Status
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-stone-800 border-stone-700">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Invoice</TableHead>
                  <TableHead className="text-stone-400">Supplier</TableHead>
                  <TableHead className="text-stone-400">Amount</TableHead>
                  <TableHead className="text-stone-400">Date</TableHead>
                  <TableHead className="text-stone-400">Due Date</TableHead>
                  <TableHead className="text-stone-400">Status</TableHead>
                  <TableHead className="text-stone-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-amber-400">
                      {invoice.id}
                    </TableCell>
                    <TableCell className="text-stone-100">
                      {invoice.supplier}
                    </TableCell>
                    <TableCell className="font-medium text-stone-100">
                      {invoice.amount.toLocaleString()} MAD
                    </TableCell>
                    <TableCell className="text-stone-400">{invoice.date}</TableCell>
                    <TableCell className="text-stone-400">
                      {invoice.dueDate}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-400 hover:text-amber-300"
                        >
                          View
                        </Button>
                        {invoice.status !== "PAID" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald-400 hover:text-emerald-300"
                          >
                            Pay
                          </Button>
                        )}
                      </div>
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
