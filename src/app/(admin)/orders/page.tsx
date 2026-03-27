"use client";



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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";


const orders = [
  {
    id: "ORD-2401",
    table: "T-05",
    guest: "Ahmed Bennani",
    items: 3,
    total: 450,
    status: "COMPLETED",
    time: "20:45",
    payment: "PAID",
  },
  {
    id: "ORD-2402",
    table: "T-12",
    guest: "Fatima Al-Ansari",
    items: 2,
    total: 320,
    status: "COMPLETED",
    time: "20:30",
    payment: "PAID",
  },
  {
    id: "ORD-2403",
    table: "T-08",
    guest: "Mohammad Khaldi",
    items: 4,
    total: 680,
    status: "ACTIVE",
    time: "20:15",
    payment: "PENDING",
  },
  {
    id: "ORD-2404",
    table: "T-15",
    guest: "Layla Ouhammou",
    items: 2,
    total: 290,
    status: "ACTIVE",
    time: "20:00",
    payment: "PENDING",
  },
  {
    id: "ORD-2405",
    table: "T-03",
    guest: "Hassan Rami",
    items: 5,
    total: 920,
    status: "ACTIVE",
    time: "19:45",
    payment: "PENDING",
  },
  {
    id: "ORD-2406",
    table: "T-01",
    guest: "Nadia Saadi",
    items: 2,
    total: 380,
    status: "COMPLETED",
    time: "19:30",
    payment: "PAID",
  },
  {
    id: "ORD-2407",
    table: "T-10",
    guest: "Omar Fassi",
    items: 3,
    total: 520,
    status: "VOID",
    time: "19:15",
    payment: "REFUNDED",
  },
  {
    id: "ORD-2408",
    table: "T-14",
    guest: "Samira Khouyi",
    items: 4,
    total: 620,
    status: "COMPLETED",
    time: "19:00",
    payment: "PAID",
  },
  {
    id: "ORD-2409",
    table: "T-02",
    guest: "Karim Ayoub",
    items: 3,
    total: 410,
    status: "COMPLETED",
    time: "18:45",
    payment: "PAID",
  },
  {
    id: "ORD-2410",
    table: "T-07",
    guest: "Leila Bennani",
    items: 2,
    total: 280,
    status: "COMPLETED",
    time: "18:30",
    payment: "PAID",
  },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Manage and track all orders"
      />

      {/* Filters */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="text-sm text-stone-400 block mb-2">
                Search Orders
              </label>
              <Input
                placeholder="Search by Order ID, Guest, or Table..."
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
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="void">Void</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              + New Order
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Order ID</TableHead>
                  <TableHead className="text-stone-400">Guest</TableHead>
                  <TableHead className="text-stone-400">Table</TableHead>
                  <TableHead className="text-stone-400">Items</TableHead>
                  <TableHead className="text-stone-400">Total</TableHead>
                  <TableHead className="text-stone-400">Status</TableHead>
                  <TableHead className="text-stone-400">Payment</TableHead>
                  <TableHead className="text-stone-400">Time</TableHead>
                  <TableHead className="text-stone-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-amber-400">
                      {order.id}
                    </TableCell>
                    <TableCell className="text-stone-100">
                      {order.guest}
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {order.table}
                    </TableCell>
                    <TableCell className="text-stone-400">{order.items}</TableCell>
                    <TableCell className="font-medium text-stone-100">
                      {order.total} MAD
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          order.payment === "PAID"
                            ? "bg-emerald-900/30 text-emerald-200"
                            : order.payment === "PENDING"
                              ? "bg-yellow-900/30 text-yellow-200"
                              : "bg-red-900/30 text-red-200"
                        }
                      >
                        {order.payment}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-stone-400">{order.time}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-400 hover:text-amber-300"
                        >
                          View
                        </Button>
                        {order.status === "ACTIVE" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                          >
                            Void
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
