"use client";


import { Users } from "lucide-react";
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


const employees = [
  {
    id: 1,
    name: "Ahmed Bennani",
    role: "Chef de Cuisine",
    department: "Cuisine",
    status: "ACTIVE",
    hireDate: "2023-01-15",
    nextShift: "Aujourd&apos;hui 15:00",
    anomalies: 0,
  },
  {
    id: 2,
    name: "Fatima Al-Ansari",
    role: "Sous Chef",
    department: "Cuisine",
    status: "ACTIVE",
    hireDate: "2023-03-20",
    nextShift: "Aujourd&apos;hui 18:00",
    anomalies: 0,
  },
  {
    id: 3,
    name: "Mohammad Khaldi",
    role: "Directeur du Restaurant",
    department: "Gestion",
    status: "ACTIVE",
    hireDate: "2022-11-10",
    nextShift: "Aujourd&apos;hui 10:00",
    anomalies: 0,
  },
  {
    id: 4,
    name: "Layla Ouhammou",
    role: "Serveur",
    department: "Service",
    status: "ACTIVE",
    hireDate: "2024-02-14",
    nextShift: "Aujourd&apos;hui 18:30",
    anomalies: 1,
  },
  {
    id: 5,
    name: "Hassan Rami",
    role: "Barman",
    department: "Bar",
    status: "ACTIVE",
    hireDate: "2023-06-01",
    nextShift: "Aujourd&apos;hui 19:00",
    anomalies: 2,
  },
  {
    id: 6,
    name: "Nadia Saadi",
    role: "Caissier",
    department: "Accueil",
    status: "ON_LEAVE",
    hireDate: "2024-01-05",
    nextShift: "2026-04-01",
    anomalies: 0,
  },
];

export default function EmployeesPage() {
  const activeCount = employees.filter((e) => e.status === "ACTIVE").length;
  const anomalyCount = employees.reduce((sum, e) => sum + e.anomalies, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employés"
        description="Gérer le personnel et surveiller les performances"
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Personnel Total</p>
                <p className="text-3xl font-semibold text-stone-100">
                  {employees.length}
                </p>
              </div>
              <Users className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Personnel Actif</p>
              <p className="text-3xl font-semibold text-emerald-400">
                {activeCount}
              </p>
              <p className="text-xs text-stone-400 mt-2">en service</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Anomalies</p>
              <p className="text-3xl font-semibold text-red-400">
                {anomalyCount}
              </p>
              <p className="text-xs text-stone-400 mt-2">signalées</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Départements</p>
              <p className="text-3xl font-semibold text-stone-100">5</p>
              <p className="text-xs text-stone-400 mt-2">équipes</p>
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
                Rechercher Employés
              </label>
              <Input
                placeholder="Rechercher par nom..."
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm text-stone-400 block mb-2">
                Département
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-stone-800 border-stone-700">
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="kitchen">Cuisine</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="management">Gestion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              + Ajouter Employé
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Tous les Employés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Nom</TableHead>
                  <TableHead className="text-stone-400">Rôle</TableHead>
                  <TableHead className="text-stone-400">Département</TableHead>
                  <TableHead className="text-stone-400">Statut</TableHead>
                  <TableHead className="text-stone-400">Prochain Quart</TableHead>
                  <TableHead className="text-stone-400">Anomalies</TableHead>
                  <TableHead className="text-stone-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow
                    key={employee.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-stone-100">
                      {employee.name}
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {employee.role}
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {employee.department}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={employee.status} />
                    </TableCell>
                    <TableCell className="text-stone-100">
                      {employee.nextShift}
                    </TableCell>
                    <TableCell>
                      {employee.anomalies > 0 ? (
                        <Badge className="bg-red-900/30 text-red-200">
                          {employee.anomalies}
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-900/30 text-emerald-200">
                          0
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-400 hover:text-amber-300"
                      >
                        Voir
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