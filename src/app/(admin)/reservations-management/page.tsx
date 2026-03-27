"use client";


import { Calendar, Users, Clock } from "lucide-react";
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


const reservations = [
  {
    id: "RES-001",
    guest: "Ahmed Bennani",
    email: "ahmed@example.com",
    phone: "+212 612345678",
    party: 4,
    time: "19:00",
    table: "T-05",
    occasion: "Anniversary",
    vip: true,
    status: "CONFIRMED",
    checkedIn: "18:55",
  },
  {
    id: "RES-002",
    guest: "Fatima Al-Ansari",
    email: "fatima@example.com",
    phone: "+212 612345679",
    party: 2,
    time: "19:30",
    table: "T-08",
    occasion: "",
    vip: false,
    status: "SEATED",
    checkedIn: "19:28",
  },
  {
    id: "RES-003",
    guest: "Mohammad Khaldi",
    email: "mohammad@example.com",
    phone: "+212 612345680",
    party: 6,
    time: "20:00",
    table: "T-12,T-13",
    occasion: "Business Dinner",
    vip: true,
    status: "CONFIRMED",
    checkedIn: null,
  },
  {
    id: "RES-004",
    guest: "Layla Ouhammou",
    email: "layla@example.com",
    phone: "+212 612345681",
    party: 3,
    time: "20:30",
    table: "T-15",
    occasion: "",
    vip: false,
    status: "CONFIRMED",
    checkedIn: null,
  },
  {
    id: "RES-005",
    guest: "Hassan Rami",
    email: "hassan@example.com",
    phone: "+212 612345682",
    party: 5,
    time: "21:00",
    table: "T-01,T-02",
    occasion: "Wedding Celebration",
    vip: true,
    status: "CONFIRMED",
    checkedIn: null,
  },
  {
    id: "RES-006",
    guest: "Nadia Saadi",
    email: "nadia@example.com",
    phone: "+212 612345683",
    party: 2,
    time: "21:30",
    table: "T-10",
    occasion: "",
    vip: false,
    status: "CONFIRMED",
    checkedIn: null,
  },
  {
    id: "RES-007",
    guest: "Omar Fassi",
    email: "omar@example.com",
    phone: "+212 612345684",
    party: 4,
    time: "19:15",
    table: "T-03",
    occasion: "",
    vip: false,
    status: "NO_SHOW",
    checkedIn: null,
  },
  {
    id: "RES-008",
    guest: "Samira Khouyi",
    email: "samira@example.com",
    phone: "+212 612345685",
    party: 3,
    time: "20:45",
    table: "T-14",
    occasion: "",
    vip: false,
    status: "COMPLETED",
    checkedIn: "20:43",
  },
];

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Réservations"
        description="Gérer les réservations des clients et la disposition des tables"
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Réservations Aujourd&apos;hui</p>
                <p className="text-3xl font-semibold text-stone-100">8</p>
              </div>
              <Calendar className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Total des Couverts</p>
                <p className="text-3xl font-semibold text-stone-100">29</p>
              </div>
              <Users className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Actuellement Assis</p>
                <p className="text-3xl font-semibold text-stone-100">2</p>
              </div>
              <Clock className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Réservations VIP</p>
                <p className="text-3xl font-semibold text-stone-100">3</p>
              </div>
              <Badge className="bg-amber-900/30 text-amber-200">VIP</Badge>
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
                Rechercher Réservations
              </label>
              <Input
                placeholder="Rechercher par nom, téléphone ou email..."
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm text-stone-400 block mb-2">
                Statut
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-stone-800 border-stone-700">
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="confirmed">Confirmé</SelectItem>
                  <SelectItem value="seated">Assis</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="no-show">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              + Nouvelle Réservation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reservations Table */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Toutes les Réservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Client</TableHead>
                  <TableHead className="text-stone-400">Contact</TableHead>
                  <TableHead className="text-stone-400">Groupe</TableHead>
                  <TableHead className="text-stone-400">Heure</TableHead>
                  <TableHead className="text-stone-400">Table</TableHead>
                  <TableHead className="text-stone-400">Occasion</TableHead>
                  <TableHead className="text-stone-400">Statut</TableHead>
                  <TableHead className="text-stone-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((res) => (
                  <TableRow
                    key={res.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-stone-100">
                      <div className="flex items-center gap-2">
                        {res.guest}
                        {res.vip && (
                          <Badge className="bg-amber-900/30 text-amber-200 text-xs">
                            VIP
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-stone-400">
                      <div className="text-sm">
                        <p>{res.phone}</p>
                        <p className="text-xs text-stone-500">{res.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-stone-400">{res.party}</TableCell>
                    <TableCell className="text-stone-100 font-medium">
                      {res.time}
                    </TableCell>
                    <TableCell className="text-stone-400">{res.table}</TableCell>
                    <TableCell className="text-stone-400">
                      {res.occasion || "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={res.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-400 hover:text-amber-300"
                        >
                          Modifier
                        </Button>
                        {res.status === "CONFIRMED" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald-400 hover:text-emerald-300"
                          >
                            Asseoir
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
