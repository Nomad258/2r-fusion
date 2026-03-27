"use client";

import { FileText, Calendar, DollarSign, CheckCircle, Clock } from "lucide-react";
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

const invoiceData = {
  id: "1",
  invoiceNumber: "INV-2026-0847",
  type: "SUPPLIER",
  status: "PAID",
  supplier: {
    id: "1",
    name: "Premium Seafood Co",
    contact: "Ahmed Slaoui",
    email: "ahmed@premiumseafood.ma",
  },
  purchaseOrder: "PO-2026-0485",
  subtotal: 3000.0,
  taxAmount: 600.0,
  totalAmount: 3600.0,
  paidAmount: 3600.0,
  currency: "MAD",
  createdDate: "2026-03-25",
  dueDate: "2026-04-24",
  paidDate: "2026-03-27",
  approvedBy: "Mohammad Khaldi",
  approvedDate: "2026-03-25",
};

const lineItems = [
  {
    id: "1",
    item: "Fresh Atlantic Salmon (5kg)",
    quantity: 5,
    unitPrice: 450.0,
    amount: 2250.0,
  },
  {
    id: "2",
    item: "Sea Bream Fillets (3kg)",
    quantity: 3,
    unitPrice: 250.0,
    amount: 750.0,
  },
];

const paymentHistory = [
  {
    id: "1",
    date: "2026-03-27",
    amount: 3600.0,
    method: "BANK_TRANSFER",
    reference: "TRF-2026-00947",
    recordedBy: "Nadia Saadi",
    notes: "Paiement complet effectué",
  },
];

const auditTrail = [
  {
    id: "1",
    timestamp: "2026-03-27 14:30",
    action: "PAYMENT_RECORDED",
    user: "Nadia Saadi",
    details: "Paiement complet de 3600.00 MAD reçu",
  },
  {
    id: "2",
    timestamp: "2026-03-25 10:15",
    action: "INVOICE_APPROVED",
    user: "Mohammad Khaldi",
    details: "Facture approuvée pour paiement",
  },
  {
    id: "3",
    timestamp: "2026-03-25 09:45",
    action: "INVOICE_CREATED",
    user: "System",
    details: "Facture générée à partir de PO-2026-0485",
  },
];

export default function InvoiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const remainingBalance = invoiceData.totalAmount - invoiceData.paidAmount;
  const paymentProgress = (invoiceData.paidAmount / invoiceData.totalAmount) * 100;

  return (
    <div className="space-y-6">
      <PageHeader
        title={invoiceData.invoiceNumber}
        description={`Facture de ${invoiceData.supplier.name}`}
      />

      {/* Invoice Header */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-stone-100">Détails de la Facture</CardTitle>
              <p className="text-xs text-stone-400 mt-1">
                Facture fournisseur et suivi des paiements
              </p>
            </div>
            <div className="flex gap-2">
              <StatusBadge status={invoiceData.status} />
              <Badge className="bg-blue-900/30 text-blue-200">
                {invoiceData.type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-stone-400 mb-1">Fournisseur</p>
                <p className="text-stone-100 font-medium">
                  {invoiceData.supplier.name}
                </p>
                <p className="text-sm text-stone-400">
                  {invoiceData.supplier.contact}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1">Commande d&apos;Achat Associée</p>
                <p className="text-amber-400 font-mono">
                  {invoiceData.purchaseOrder}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Date de Création
                </p>
                <p className="text-stone-100">{invoiceData.createdDate}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-stone-400 mb-1 flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Date d&apos;Échéance
                </p>
                <p className="text-stone-100 font-medium">
                  {invoiceData.dueDate}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Date de Paiement
                </p>
                <p className="text-emerald-400 font-medium">
                  {invoiceData.paidDate}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1">Approuvé Par</p>
                <p className="text-stone-100">
                  {invoiceData.approvedBy}
                </p>
                <p className="text-xs text-stone-500">{invoiceData.approvedDate}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amount Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">Sous-total</p>
              <p className="text-2xl font-semibold text-stone-100">
                {invoiceData.subtotal.toFixed(2)}
              </p>
              <p className="text-xs text-stone-400 mt-2">MAD</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">TVA (20%)</p>
              <p className="text-2xl font-semibold text-stone-100">
                {invoiceData.taxAmount.toFixed(2)}
              </p>
              <p className="text-xs text-stone-400 mt-2">MAD</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">Montant Total</p>
              <p className="text-2xl font-semibold text-amber-400">
                {invoiceData.totalAmount.toFixed(2)}
              </p>
              <p className="text-xs text-stone-400 mt-2">MAD</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">Restant</p>
              <p
                className={`text-2xl font-semibold ${
                  remainingBalance > 0 ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {remainingBalance.toFixed(2)}
              </p>
              <p className="text-xs text-stone-400 mt-2">MAD</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Statut du Paiement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-stone-400">Progression du Paiement</span>
              <span className="text-sm font-medium text-stone-100">
                {paymentProgress.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  remainingBalance === 0 ? "bg-emerald-500" : "bg-amber-500"
                }`}
                style={{ width: `${Math.min(paymentProgress, 100)}%` }}
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3 mt-4">
            <div className="bg-stone-800/50 rounded p-3">
              <p className="text-xs text-stone-400">Montant Payé</p>
              <p className="text-lg font-semibold text-emerald-400">
                {invoiceData.paidAmount.toFixed(2)} MAD
              </p>
            </div>
            <div className="bg-stone-800/50 rounded p-3">
              <p className="text-xs text-stone-400">En Attente</p>
              <p className={`text-lg font-semibold ${remainingBalance > 0 ? "text-red-400" : "text-emerald-400"}`}>
                {remainingBalance.toFixed(2)} MAD
              </p>
            </div>
            <div className="bg-stone-800/50 rounded p-3">
              <p className="text-xs text-stone-400">Jours de Paiement</p>
              <p className="text-lg font-semibold text-stone-100">
                {invoiceData.paidDate ? "2 jours" : "En Attente"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Éléments de Facture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Article</TableHead>
                  <TableHead className="text-stone-400">Quantité</TableHead>
                  <TableHead className="text-stone-400">Prix Unitaire</TableHead>
                  <TableHead className="text-stone-400">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lineItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-stone-100">
                      {item.item}
                    </TableCell>
                    <TableCell className="text-stone-400">{item.quantity}</TableCell>
                    <TableCell className="text-stone-100">
                      {item.unitPrice.toFixed(2)} MAD
                    </TableCell>
                    <TableCell className="text-stone-100 font-medium">
                      {item.amount.toFixed(2)} MAD
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-stone-700 bg-stone-800/50">
                  <TableCell colSpan={3} className="text-right text-stone-400">
                    Sous-total:
                  </TableCell>
                  <TableCell className="font-semibold text-stone-100">
                    {invoiceData.subtotal.toFixed(2)} MAD
                  </TableCell>
                </TableRow>
                <TableRow className="border-stone-700 bg-stone-800/50">
                  <TableCell colSpan={3} className="text-right text-stone-400">
                    TVA (20%):
                  </TableCell>
                  <TableCell className="font-semibold text-stone-100">
                    {invoiceData.taxAmount.toFixed(2)} MAD
                  </TableCell>
                </TableRow>
                <TableRow className="border-stone-700 bg-amber-900/20">
                  <TableCell colSpan={3} className="text-right font-semibold text-amber-400">
                    Total:
                  </TableCell>
                  <TableCell className="font-semibold text-amber-400">
                    {invoiceData.totalAmount.toFixed(2)} MAD
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Historique des Paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className="border border-stone-700 rounded p-4 bg-stone-800/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-stone-100">
                      {payment.amount.toFixed(2)} MAD
                    </p>
                    <p className="text-xs text-stone-400">{payment.date}</p>
                  </div>
                  <Badge className="bg-emerald-900/30 text-emerald-200">
                    {payment.method.replace(/_/g, " ")}
                  </Badge>
                </div>
                <p className="text-sm text-stone-400">
                  Réf: <span className="font-mono text-stone-300">{payment.reference}</span>
                </p>
                <p className="text-sm text-stone-400 mt-1">
                  Enregistré par {payment.recordedBy}
                </p>
                {payment.notes && (
                  <p className="text-sm text-stone-300 mt-2">{payment.notes}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Journal d&apos;Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditTrail.map((entry, index) => (
              <div key={entry.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  {index !== auditTrail.length - 1 && (
                    <div className="w-0.5 h-12 bg-stone-700 my-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-stone-100">
                    {entry.action.replace(/_/g, " ")}
                  </p>
                  <p className="text-xs text-stone-400">{entry.timestamp}</p>
                  <p className="text-sm text-stone-300 mt-1">{entry.details}</p>
                  <p className="text-xs text-stone-500 mt-1">par {entry.user}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button className="bg-amber-600 hover:bg-amber-700">Télécharger PDF</Button>
        {remainingBalance > 0 && (
          <Button variant="outline" className="border-stone-700 text-amber-400 hover:bg-stone-800">
            Enregistrer Paiement
          </Button>
        )}
        <Button variant="outline" className="border-stone-700 text-amber-400 hover:bg-stone-800">
          Voir Commande d&apos;Achat
        </Button>
        <Button variant="outline" className="border-stone-700 text-amber-400 hover:bg-stone-800">
          Envoyer Email
        </Button>
      </div>
    </div>
  );
}