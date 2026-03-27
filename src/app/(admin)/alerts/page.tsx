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
    title: "Saffron Stock Critical",
    message: "Saffron threads below 10% of minimum stock. Immediate reorder required.",
    time: "5 min ago",
    read: false,
  },
  {
    id: 2,
    type: "INVOICE",
    severity: "HIGH",
    title: "Overdue Invoice",
    message: "INV-2406 from Premium Seafood Co is 5 days overdue.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "RESERVATION",
    severity: "MEDIUM",
    title: "High Reservation Volume",
    message: "14 reservations for tonight. Table availability at 75%.",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "SYSTEM",
    severity: "LOW",
    title: "Backup Completed",
    message: "Daily system backup completed successfully.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "EMPLOYEE",
    severity: "MEDIUM",
    title: "Staff Anomaly Detected",
    message: "Hassan Rami: Unusual discount patterns (5 comps in 2 hours).",
    time: "4 hours ago",
    read: true,
  },
  {
    id: 6,
    type: "INVENTORY",
    severity: "MEDIUM",
    title: "Expiration Warning",
    message: "Premium Wagyu batch expires in 3 days.",
    time: "Yesterday",
    read: true,
  },
];

export default function AlertsPage() {
  const unreadCount = alerts.filter((a) => !a.read).length;
  const criticalCount = alerts.filter((a) => a.severity === "CRITICAL").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alert Center"
        description="System alerts and notifications"
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Total Alerts</p>
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
              <p className="text-sm text-stone-400 mb-1">Unread</p>
              <p className="text-3xl font-semibold text-red-400">
                {unreadCount}
              </p>
              <p className="text-xs text-stone-400 mt-2">require attention</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Critical</p>
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
                Mark All Read
              </Button>
              <Button size="sm" variant="outline" className="border-stone-700">
                Clear
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
              Filter by Type
            </label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-stone-800 border-stone-700">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
                <SelectItem value="reservation">Reservation</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="system">System</SelectItem>
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
                      Mark Read
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-stone-500"
                    >
                      Dismiss
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
