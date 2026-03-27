"use client";


import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const alerts = [
  {
    id: 1,
    type: "INVENTORY",
    severity: "CRITICAL",
    title: "Stock de Safran Critique",
    message: "Le safran est en dessous de 10% du stock minimum. Réapprovisionnement immédiat requis.",
    time: "il y a 5 min",
    read: false,
  },
  {
    id: 2,
    type: "INVOICE",
    severity: "HIGH",
    title: "Facture En Retard",
    message: "INV-2406 de Premium Seafood Co est en retard de 5 jours.",
    time: "il y a 1 heure",
    read: false,
  },
  {
    id: 3,
    type: "RESERVATION",
    severity: "MEDIUM",
    title: "Volume de Réservations Élevé",
    message: "14 réservations pour ce soir. Disponibilité des tables à 75%.",
    time: "il y a 2 heures",
    read: true,
  },
  {
    id: 4,
    type: "SYSTEM",
    severity: "LOW",
    title: "Sauvegarde Effectuée",
    message: "La sauvegarde système quotidienne s&apos;est déroulée avec succès.",
    time: "il y a 3 heures",
    read: true,
  },
  {
    id: 5,
    type: "EMPLOYEE",
    severity: "MEDIUM",
    title: "Anomalie Employé Détectée",
    message: "Hassan Rami: Motifs de remises inhabituels (5 gratuités en 2 heures).",
    time: "il y a 4 heures",
    read: true,
  },
  {
    id: 6,
    type: "INVENTORY",
    severity: "MEDIUM",
    title: "Avertissement d&apos;Expiration",
    message: "Le lot de Wagyu Premium expire dans 3 jours.",
    time: "Hier",
    read: true,
  },
];

export default function AlertsPage() {
  const unreadCount = alerts.filter((a) => !a.read).length;
  const criticalCount = alerts.filter((a) => a.severity === "CRITICAL").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Centre d&apos;Alertes"
        description="Alertes système et notifications"
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Total Alertes</p>
                <p className="text-3xl font-semibold text-stone-100">
                  {alerts.length}
                </p>
              </div>
              <Bell className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Non Lues</p>
              <p className="text-3xl font-semibold text-red-400">
                {unreadCount}
              </p>
              <p className="text-xs text-stone-400 mt-2">nécessitent attention</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Critique</p>
              <p className="text-3xl font-semibold text-red-600">
                {criticalCount}
              </p>
              <p className="text-xs text-stone-400 mt-2">urgent</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                Marquer Tout comme Lues
              </Button>
              <Button size="sm" variant="outline" className="border-stone-700">
                Effacer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="pt-6">
          <div className="w-full md:w-48">
            <label className="text-sm text-stone-400 block mb-2">
              Filtrer par Type
            </label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-stone-800 border-stone-700">
                <SelectItem value="all">Tous les Types</SelectItem>
                <SelectItem value="inventory">Inventaire</SelectItem>
                <SelectItem value="invoice">Facture</SelectItem>
                <SelectItem value="reservation">Réservation</SelectItem>
                <SelectItem value="employee">Employé</SelectItem>
                <SelectItem value="system">Système</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`bg-stone-900 border-stone-800 ${!alert.read ? "border-l-4 border-l-amber-500" : ""}`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge
                      className={
                        alert.severity === "CRITICAL"
                          ? "bg-red-900/30 text-red-200"
                          : alert.severity === "HIGH"
                            ? "bg-orange-900/30 text-orange-200"
                            : alert.severity === "MEDIUM"
                              ? "bg-yellow-900/30 text-yellow-200"
                              : "bg-blue-900/30 text-blue-200"
                      }
                    >
                      {alert.severity}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-stone-800 text-stone-300"
                    >
                      {alert.type}
                    </Badge>
                    {!alert.read && (
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-stone-100 mb-1">
                    {alert.title}
                  </h3>
                  <p className="text-sm text-stone-400">{alert.message}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xs text-stone-400 mb-3">{alert.time}</p>
                  {!alert.read ? (
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      Marquer comme Lue
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-stone-500"
                    >
                      Fermer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}