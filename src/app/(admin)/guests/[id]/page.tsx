"use client";


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Mail, Phone, User, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, StatusBadge } from "@/components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const spendingData = [
  { month: "Jan", spent: 2100 },
  { month: "Fév", spent: 1850 },
  { month: "Mar", spent: 2400 },
  { month: "Avr", spent: 2800 },
  { month: "Mai", spent: 3100 },
  { month: "Juin", spent: 2950 },
];

const visitHistory = [
  { id: 1, date: "2026-03-25", time: "20:15", party: 4, amount: 850, notes: "Expérience Premium" },
  { id: 2, date: "2026-03-18", time: "19:45", party: 4, amount: 920, notes: "Demande spéciale : table près de la fenêtre" },
  { id: 3, date: "2026-03-10", time: "20:30", party: 4, amount: 780, notes: "Réservation régulière" },
  { id: 4, date: "2026-02-28", time: "19:00", party: 2, amount: 620, notes: "Soirée en couple" },
  { id: 5, date: "2026-02-14", time: "20:00", party: 4, amount: 950, notes: "Célébration anniversaire" },
];

const reservationHistory = [
  { id: "RES-001", date: "2026-03-26", time: "19:00", party: 4, status: "CONFIRMED" },
  { id: "RES-002", date: "2026-03-19", time: "20:30", party: 4, status: "COMPLETED" },
  { id: "RES-003", date: "2026-03-12", time: "19:45", party: 4, status: "COMPLETED" },
];

export default function GuestDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profil Client"
        description="Informations détaillées et historique du client"
      />

      {/* Profile Card */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-stone-900 border-stone-800 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-stone-100">Informations Profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="text-sm text-stone-400">Nom</p>
                    <p className="text-lg font-semibold text-stone-100">
                      Ahmed Bennani
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="text-sm text-stone-400">Téléphone</p>
                    <p className="text-lg font-semibold text-stone-100">
                      +212 612345678
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="text-sm text-stone-400">Email</p>
                    <p className="text-lg font-semibold text-stone-100">
                      ahmed@example.com
                    </p>
                  </div>
                </div>
              </div>
              <Badge className="bg-red-900/30 text-red-200 text-lg px-4 py-2">
                WHALE
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Métriques Clés</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-stone-400">Total Visites</p>
              <p className="text-3xl font-semibold text-stone-100">24</p>
            </div>
            <div>
              <p className="text-sm text-stone-400">Total Dépensé</p>
              <p className="text-3xl font-semibold text-amber-400">18,500</p>
              <p className="text-xs text-stone-400">MAD</p>
            </div>
            <div>
              <p className="text-sm text-stone-400">Moy par Visite</p>
              <p className="text-2xl font-semibold text-stone-100">771 MAD</p>
            </div>
            <div>
              <p className="text-sm text-stone-400">Membre Depuis</p>
              <p className="text-sm text-stone-100">15 Jan 2023</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spending Trend */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-amber-400" />
            Tendance de Dépense
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#44403c" />
              <XAxis dataKey="month" stroke="#a8a29e" />
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
                dataKey="spent"
                stroke="#b45309"
                strokeWidth={2}
                dot={{ fill: "#b45309" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="visits" className="space-y-6">
        <TabsList className="bg-stone-800 border-stone-700">
          <TabsTrigger value="visits">Historique Visite</TabsTrigger>
          <TabsTrigger value="reservations">Réservations</TabsTrigger>
          <TabsTrigger value="tags">Étiquettes & Notes</TabsTrigger>
        </TabsList>

        {/* Visit History */}
        <TabsContent value="visits">
          <Card className="bg-stone-900 border-stone-800">
            <CardHeader>
              <CardTitle className="text-stone-100">Historique Visite</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-stone-800 hover:bg-transparent">
                      <TableHead className="text-stone-400">Date</TableHead>
                      <TableHead className="text-stone-400">Heure</TableHead>
                      <TableHead className="text-stone-400">Groupe</TableHead>
                      <TableHead className="text-stone-400">Montant</TableHead>
                      <TableHead className="text-stone-400">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visitHistory.map((visit) => (
                      <TableRow
                        key={visit.id}
                        className="border-stone-800 hover:bg-stone-800/50"
                      >
                        <TableCell className="text-stone-100">
                          {visit.date}
                        </TableCell>
                        <TableCell className="text-stone-400">
                          {visit.time}
                        </TableCell>
                        <TableCell className="text-stone-400">
                          {visit.party}
                        </TableCell>
                        <TableCell className="font-medium text-stone-100">
                          {visit.amount} MAD
                        </TableCell>
                        <TableCell className="text-stone-400">
                          {visit.notes}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reservations */}
        <TabsContent value="reservations">
          <Card className="bg-stone-900 border-stone-800">
            <CardHeader>
              <CardTitle className="text-stone-100">Historique Réservation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-stone-800 hover:bg-transparent">
                      <TableHead className="text-stone-400">Réservation</TableHead>
                      <TableHead className="text-stone-400">Date</TableHead>
                      <TableHead className="text-stone-400">Heure</TableHead>
                      <TableHead className="text-stone-400">Groupe</TableHead>
                      <TableHead className="text-stone-400">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservationHistory.map((res) => (
                      <TableRow
                        key={res.id}
                        className="border-stone-800 hover:bg-stone-800/50"
                      >
                        <TableCell className="font-medium text-amber-400">
                          {res.id}
                        </TableCell>
                        <TableCell className="text-stone-100">
                          {res.date}
                        </TableCell>
                        <TableCell className="text-stone-400">{res.time}</TableCell>
                        <TableCell className="text-stone-400">{res.party}</TableCell>
                        <TableCell>
                          <StatusBadge status={res.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tags & Notes */}
        <TabsContent value="tags">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-stone-900 border-stone-800">
              <CardHeader>
                <CardTitle className="text-stone-100">Étiquettes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {["VIP", "Regular", "Birthday Special", "Dining Partner"].map(
                    (tag) => (
                      <Badge
                        key={tag}
                        className="bg-amber-900/30 text-amber-200"
                      >
                        {tag}
                      </Badge>
                    )
                  )}
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  + Ajouter Étiquette
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-stone-900 border-stone-800">
              <CardHeader>
                <CardTitle className="text-stone-100">Score Risque</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-3xl font-semibold text-stone-100">2/10</p>
                    <p className="text-sm text-stone-400">Risque Bas</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-emerald-400" />
                </div>
                <p className="text-sm text-stone-400">
                  Excellent client. Pas de plaintes, dépenses régulières, grande valeur
                  client.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-stone-900 border-stone-800 mt-6">
            <CardHeader>
              <CardTitle className="text-stone-100">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-stone-800/50 rounded-lg p-4 min-h-32 text-stone-400">
                <p>
                  Préfère les places près de la fenêtre. Célèbre les anniversaires
                  régulièrement. Amène souvent des collègues pour dîners d&apos;affaires.
                  Apprécie les accords mets-vins. A recommandé des amis (3+ recommandations).
                </p>
              </div>
              <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                Modifier Notes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button className="bg-amber-600 hover:bg-amber-700">
              Créer Réservation
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              Envoyer Message
            </Button>
            <Button variant="outline" className="border-stone-700">
              Exporter Profil
            </Button>
            <Button variant="outline" className="border-stone-700 text-red-400">
              Blacklister Client
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
