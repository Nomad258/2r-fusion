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
    department: "Kitchen",
    status: "ACTIVE",
    hireDate: "2023-01-15",
    nextShift: "Today 15:00",
    anomalies: 0,
  },
  {
    id: 2,
    name: "Fatima Al-Ansari",
    role: "Sous Chef",
    department: "Kitchen",
    status: "ACTIVE",
    hireDate: "2023-03-20",
    nextShift: "Today 18:00",
    anomalies: 0,
  },
  {
    id: 3,
    name: "Mohammad Khaldi",
    role: "Restaurant Manager",
    department: "Management",
    status: "ACTIVE",
    hireDate: "2022-11-10",
    nextShift: "Today 10:00",
    anomalies: 0,
  },
  {
    id: 4,
    name: "Layla Ouhammou",
    role: "Server",
    department: "Service",
    status: "ACTIVE",
    hireDate: "2024-02-14",
    nextShift: "Today 18:30",
    anomalies: 1,
  },
  {
    id: 5,
    name: "Hassan Rami",
    role: "Bartender",
    department: "Bar",
    status: "ACTIVE",
    hireDate: "2023-06-01",
    nextShift: "Today 19:00",
    anomalies: 2,
  },
  {
    id: 6,
    name: "Nadia Saadi",
    role: "Cashier",
    department: "Front Desk",
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
        title="Employees"
        description="Manage staff and monitor performance"
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Total Staff</p>
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
              <p className="text-sm text-stone-400 mb-1">Active Staff</p>
              <p className="text-3xl font-semibold text-emerald-400">
                {activeCount}
              </p>
              <p className="text-xs text-stone-400 mt-2">on duty</p>
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
              <p className="text-xs text-stone-400 mt-2">flagged</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Departments</p>
              <p className="text-3xl font-semibold text-stone-100">5</p>
              <p className="text-xs text-stone-400 mt-2">teams</p>
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
                Search Employees
              </label>
              <Input
                placeholder="Search by name..."
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm text-stone-400 block mb-2">
                Department
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-stone-800 border-stone-700">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              + Add Employee
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">All Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Name</TableHead>
                  <TableHead className="text-stone-400">Role</TableHead>
                  <TableHead className="text-stone-400">Department</TableHead>
                  <TableHead className="text-stone-400">Status</TableHead>
                  <TableHead className="text-stone-400">Next Shift</TableHead>
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
