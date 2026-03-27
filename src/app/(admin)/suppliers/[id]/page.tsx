"use client";

import { Package, Phone, Mail, MapPin, Star, TrendingUp } from "lucide-react";
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

const supplierData = {
  id: "1",
  name: "Premium Seafood Co",
  contact: "Ahmed Slaoui",
  email: "ahmed@premiumseafood.ma",
  phone: "+212 612345678",
  address: "123 Port Street, Tangier",
  city: "Tangier",
  taxId: "MA123456789",
  paymentTerms: "Net 30",
  deliveryDays: "Mon, Wed, Fri",
  leadTimeDays: 2,
  rating: 4.8,
  reliabilityScore: 98,
  isActive: true,
  isPreferred: true,
  notes: "Premium supplier with excellent consistency",
};

const productsSupplied = [
  {
    id: "1",
    name: "Fresh Atlantic Salmon",
    sku: "FISH-001",
    unitPrice: 450.0,
    lastOrdered: "2026-03-25",
    minOrderQty: 5,
    leadTimeDays: 1,
  },
  {
    id: "2",
    name: "Sea Bream Fillets",
    sku: "FISH-002",
    unitPrice: 380.0,
    lastOrdered: "2026-03-24",
    minOrderQty: 3,
    leadTimeDays: 2,
  },
  {
    id: "3",
    name: "Shrimp (Large)",
    sku: "FISH-003",
    unitPrice: 520.0,
    lastOrdered: "2026-03-23",
    minOrderQty: 2,
    leadTimeDays: 1,
  },
];

const purchaseOrders = [
  {
    id: "1",
    orderNumber: "PO-2026-0485",
    date: "2026-03-25",
    items: 3,
    totalAmount: 3240.0,
    status: "CONFIRMED",
    expectedDate: "2026-03-27",
  },
  {
    id: "2",
    orderNumber: "PO-2026-0478",
    date: "2026-03-23",
    items: 2,
    totalAmount: 1860.0,
    status: "RECEIVED",
    expectedDate: "2026-03-25",
  },
  {
    id: "3",
    orderNumber: "PO-2026-0469",
    date: "2026-03-20",
    items: 4,
    totalAmount: 4125.0,
    status: "RECEIVED",
    expectedDate: "2026-03-22",
  },
];

const deliveryHistory = [
  {
    id: "1",
    deliveryNumber: "DEL-2026-0098",
    date: "2026-03-25",
    items: 3,
    status: "RECEIVED",
    qualityNotes: "Excellent condition",
    isLate: false,
  },
  {
    id: "2",
    deliveryNumber: "DEL-2026-0094",
    date: "2026-03-23",
    items: 2,
    status: "RECEIVED",
    qualityNotes: "Minor temperature variance",
    isLate: false,
  },
  {
    id: "3",
    deliveryNumber: "DEL-2026-0087",
    date: "2026-03-20",
    items: 4,
    status: "RECEIVED",
    qualityNotes: "All items within spec",
    isLate: false,
  },
];

export default function SupplierDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const onTimeRate = ((3 / 3) * 100).toFixed(0);
  const avgQuality = 4.7;

  return (
    <div className="space-y-6">
      <PageHeader
        title={supplierData.name}
        description="Supplier details and performance metrics"
      />

      {/* Supplier Info Card */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-stone-100">Supplier Information</CardTitle>
              <p className="text-xs text-stone-400 mt-1">Contact details and terms</p>
            </div>
            <Badge
              className={
                supplierData.isActive
                  ? "bg-emerald-900/30 text-emerald-200"
                  : "bg-red-900/30 text-red-200"
              }
            >
              {supplierData.isActive ? "ACTIVE" : "INACTIVE"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-stone-400 mb-1">Contact Name</p>
                <p className="text-stone-100 font-medium">{supplierData.contact}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone
                </p>
                <p className="text-stone-100">{supplierData.phone}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </p>
                <p className="text-stone-100">{supplierData.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-stone-400 mb-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Address
                </p>
                <p className="text-stone-100">{supplierData.address}</p>
                <p className="text-sm text-stone-400">{supplierData.city}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1">Tax ID</p>
                <p className="text-stone-100 font-mono text-sm">
                  {supplierData.taxId}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-700 pt-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs text-stone-400 mb-1">Payment Terms</p>
                <p className="text-stone-100 font-medium">
                  {supplierData.paymentTerms}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1">Delivery Days</p>
                <p className="text-stone-100 font-medium">
                  {supplierData.deliveryDays}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1">Lead Time</p>
                <p className="text-stone-100 font-medium">
                  {supplierData.leadTimeDays} days
                </p>
              </div>
            </div>
          </div>

          {supplierData.notes && (
            <div className="bg-stone-800/50 border border-stone-700 rounded p-3">
              <p className="text-xs text-stone-400 mb-1">Notes</p>
              <p className="text-stone-100 text-sm">{supplierData.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-stone-400 mb-1">Rating</p>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <p className="text-2xl font-semibold text-stone-100">
                    {supplierData.rating}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">Reliability</p>
              <p className="text-2xl font-semibold text-emerald-400">
                {supplierData.reliabilityScore}%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">On-Time Rate</p>
              <p className="text-2xl font-semibold text-emerald-400">
                {onTimeRate}%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">Quality Score</p>
              <p className="text-2xl font-semibold text-amber-400">
                {avgQuality.toFixed(1)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Supplied */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Products Supplied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Product Name</TableHead>
                  <TableHead className="text-stone-400">SKU</TableHead>
                  <TableHead className="text-stone-400">Unit Price</TableHead>
                  <TableHead className="text-stone-400">Min Order</TableHead>
                  <TableHead className="text-stone-400">Lead Time</TableHead>
                  <TableHead className="text-stone-400">Last Ordered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productsSupplied.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-stone-100">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-stone-400 font-mono text-sm">
                      {product.sku}
                    </TableCell>
                    <TableCell className="text-stone-100">
                      {product.unitPrice.toFixed(2)} MAD
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {product.minOrderQty} units
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {product.leadTimeDays} day(s)
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {product.lastOrdered}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Orders */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Recent Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Order Number</TableHead>
                  <TableHead className="text-stone-400">Date</TableHead>
                  <TableHead className="text-stone-400">Items</TableHead>
                  <TableHead className="text-stone-400">Total</TableHead>
                  <TableHead className="text-stone-400">Status</TableHead>
                  <TableHead className="text-stone-400">Expected Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((po) => (
                  <TableRow
                    key={po.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-amber-400">
                      {po.orderNumber}
                    </TableCell>
                    <TableCell className="text-stone-400">{po.date}</TableCell>
                    <TableCell className="text-stone-100">{po.items}</TableCell>
                    <TableCell className="text-stone-100 font-medium">
                      {po.totalAmount.toFixed(2)} MAD
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={po.status} />
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {po.expectedDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delivery History */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Delivery History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Delivery #</TableHead>
                  <TableHead className="text-stone-400">Date</TableHead>
                  <TableHead className="text-stone-400">Items</TableHead>
                  <TableHead className="text-stone-400">Status</TableHead>
                  <TableHead className="text-stone-400">Quality Notes</TableHead>
                  <TableHead className="text-stone-400">On Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveryHistory.map((delivery) => (
                  <TableRow
                    key={delivery.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-stone-100">
                      {delivery.deliveryNumber}
                    </TableCell>
                    <TableCell className="text-stone-400">{delivery.date}</TableCell>
                    <TableCell className="text-stone-100">{delivery.items}</TableCell>
                    <TableCell>
                      <StatusBadge status={delivery.status} />
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {delivery.qualityNotes}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          !delivery.isLate
                            ? "bg-emerald-900/30 text-emerald-200"
                            : "bg-red-900/30 text-red-200"
                        }
                      >
                        {!delivery.isLate ? "Yes" : "Late"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button className="bg-amber-600 hover:bg-amber-700">Edit Supplier</Button>
        <Button variant="outline" className="border-stone-700 text-amber-400 hover:bg-stone-800">
          View All Invoices
        </Button>
        <Button variant="outline" className="border-stone-700 text-amber-400 hover:bg-stone-800">
          Create Purchase Order
        </Button>
        <Button
          variant="outline"
          className="border-red-900 text-red-400 hover:bg-red-900/20"
        >
          Deactivate Supplier
        </Button>
      </div>
    </div>
  );
}
