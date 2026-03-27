"use client";


import { Settings, Lock, Users, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const roles = [
  {
    id: 1,
    name: "Admin",
    users: 1,
    permissions: "Full system access",
    status: "Active",
  },
  {
    id: 2,
    name: "Manager",
    users: 2,
    permissions: "Operations, reports, staff",
    status: "Active",
  },
  {
    id: 3,
    name: "Chef",
    users: 3,
    permissions: "Menu, inventory, recipes",
    status: "Active",
  },
  {
    id: 4,
    name: "Server",
    users: 5,
    permissions: "Orders, reservations, tables",
    status: "Active",
  },
  {
    id: 5,
    name: "Cashier",
    users: 1,
    permissions: "Payments, invoices",
    status: "Active",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="System configuration and administration"
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-stone-800 border-stone-700">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="system">System Status</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="space-y-6">
            <Card className="bg-stone-900 border-stone-800">
              <CardHeader>
                <CardTitle className="text-stone-100">Restaurant Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm text-stone-400 block mb-2">
                      Restaurant Name
                    </label>
                    <p className="text-stone-100 font-medium">2R Fusion</p>
                  </div>
                  <div>
                    <label className="text-sm text-stone-400 block mb-2">
                      Location
                    </label>
                    <p className="text-stone-100 font-medium">Tangier, Morocco</p>
                  </div>
                  <div>
                    <label className="text-sm text-stone-400 block mb-2">
                      Capacity
                    </label>
                    <p className="text-stone-100 font-medium">80-150 covers</p>
                  </div>
                  <div>
                    <label className="text-sm text-stone-400 block mb-2">
                      Timezone
                    </label>
                    <p className="text-stone-100 font-medium">Morocco Standard Time</p>
                  </div>
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Edit Details
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-stone-900 border-stone-800">
              <CardHeader>
                <CardTitle className="text-stone-100">Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-stone-800/50">
                    <p className="text-sm text-stone-100">Monday - Thursday</p>
                    <p className="text-sm font-medium text-amber-400">
                      11:00 - 23:00
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-stone-800/50">
                    <p className="text-sm text-stone-100">Friday - Saturday</p>
                    <p className="text-sm font-medium text-amber-400">
                      11:00 - 01:00
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-stone-800/50">
                    <p className="text-sm text-stone-100">Sunday</p>
                    <p className="text-sm font-medium text-amber-400">
                      12:00 - 23:00
                    </p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                  Edit Hours
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles">
          <Card className="bg-stone-900 border-stone-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-stone-100 flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-400" />
                  User Roles
                </CardTitle>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  + New Role
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-stone-800 hover:bg-transparent">
                      <TableHead className="text-stone-400">Role Name</TableHead>
                      <TableHead className="text-stone-400">Users</TableHead>
                      <TableHead className="text-stone-400">Permissions</TableHead>
                      <TableHead className="text-stone-400">Status</TableHead>
                      <TableHead className="text-stone-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow
                        key={role.id}
                        className="border-stone-800 hover:bg-stone-800/50"
                      >
                        <TableCell className="font-medium text-stone-100">
                          {role.name}
                        </TableCell>
                        <TableCell className="text-stone-400">
                          {role.users}
                        </TableCell>
                        <TableCell className="text-stone-400 text-sm">
                          {role.permissions}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-900/30 text-emerald-200">
                            {role.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-amber-400 hover:text-amber-300"
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Status */}
        <TabsContent value="system">
          <div className="space-y-6">
            <Card className="bg-stone-900 border-stone-800">
              <CardHeader>
                <CardTitle className="text-stone-100">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-stone-800/50">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-sm font-medium text-stone-100">
                        Database
                      </p>
                      <p className="text-xs text-stone-400">PostgreSQL</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-900/30 text-emerald-200">
                    Operational
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-stone-800/50">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-amber-400" />
                    <div>
                      <p className="text-sm font-medium text-stone-100">API</p>
                      <p className="text-xs text-stone-400">v2.1.0</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-900/30 text-emerald-200">
                    Healthy
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-stone-800/50">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-amber-400" />
                    <div>
                      <p className="text-sm font-medium text-stone-100">
                        SSL/TLS
                      </p>
                      <p className="text-xs text-stone-400">Expires: 2026-12-31</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-900/30 text-emerald-200">
                    Valid
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-stone-900 border-stone-800">
              <CardHeader>
                <CardTitle className="text-stone-100">Maintenance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-stone-700">
                  Run Backup
                </Button>
                <Button variant="outline" className="w-full border-stone-700">
                  Clear Cache
                </Button>
                <Button variant="outline" className="w-full border-stone-700">
                  View Logs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
