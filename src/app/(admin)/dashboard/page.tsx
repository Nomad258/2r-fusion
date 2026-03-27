"use client";

// Note: Metadata export removed - requires server component. Use layout.tsx for metadata.

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  ShoppingCart,
  Calendar,
  AlertCircle,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  StatCard,
  PageHeader,
  StatusBadge,
} from "@/components/shared";

// Mock data for charts
const revenueData = [
  { time: "6:00", revenue: 240 },
  { time: "9:00", revenue: 340 },
  { time: "12:00", revenue: 480 },
  { time: "15:00", revenue: 620 },
  { time: "18:00", revenue: 1840 },
  { time: "21:00", revenue: 2200 },
];

const recentOrders = [
  {
    id: "ORD-001",
    table: "T-05",
    items: 3,
    total: 450,
    status: "COMPLETED",
    time: "20:45",
  },
  {
    id: "ORD-002",
    table: "T-12",
    items: 2,
    total: 320,
    status: "COMPLETED",
    time: "20:30",
  },
  {
    id: "ORD-003",
    table: "T-08",
    items: 4,
    total: 680,
    status: "ACTIVE",
    time: "20:15",
  },
  {
    id: "ORD-004",
    table: "T-15",
    items: 2,
    total: 290,
    status: "ACTIVE",
    time: "20:00",
  },
  {
    id: "ORD-005",
    table: "T-03",
    items: 5,
    total: 920,
    status: "ACTIVE",
    time: "19:45",
  },
];

const todaysReservations = [
  {
    id: "RES-001",
    guest: "Ahmed Bennani",
    party: 4,
    time: "19:00",
    table: "T-05",
    vip: true,
    status: "CONFIRMED",
  },
  {
    id: "RES-002",
    guest: "Fatima Al-Ansari",
    party: 2,
    time: "19:30",
    table: "T-08",
    vip: false,
    status: "SEATED",
  },
  {
    id: "RES-003",
    guest: "Mohammad Khaldi",
    party: 6,
    time: "20:00",
    table: "T-12,T-13",
    vip: true,
    status: "CONFIRMED",
  },
  {
    id: "RES-004",
    guest: "Layla Ouhammou",
    party: 3,
    time: "20:30",
    table: "T-15",
    vip: false,
    status: "CONFIRMED",
  },
];

const inventoryAlerts = [
  { item: "Saffron Threads", status: "CRITICAL", qty: 5 },
  { item: "Fresh Herbs Mix", status: "LOW", qty: 12 },
  { item: "Argan Oil", status: "EXPIRING", days: 3 },
  { item: "Premium Beef", status: "LOW", qty: 8 },
];

const recentAnomalies = [
  {
    id: "ANM-001",
    type: "UNUSUAL_VOID",
    severity: "HIGH",
    detail: "3 orders voided in 10 minutes",
    time: "19:45",
  },
  {
    id: "ANM-002",
    type: "PRICE_OVERRIDE",
    severity: "MEDIUM",
    detail: "Manual discount 25% applied",
    time: "19:30",
  },
];
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Tableau de Bord"
        description="Vue d&apos;ensemble en temps réel des opérations"
      />

      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={<TrendingUp className="h-6 w-6 text-amber-400" />}
          title="Chiffre d&apos;Affaires Aujourd&apos;hui"
          value="6,780"
          unit="MAD"
          change={12}
          trend="up"
        />
        <StatCard
          icon={<ShoppingCart className="h-6 w-6 text-amber-400" />}
          title="Commandes Aujourd&apos;hui"
          value={28}
          change={5}
          trend="up"
        />
        <StatCard
          icon={<Calendar className="h-6 w-6 text-amber-400" />}
          title="Réservations"
          value={12}
          change={-2}
          trend="down"
        />
        <StatCard
          icon={<AlertCircle className="h-6 w-6 text-amber-400" />}
          title="Alertes Actives"
          value={4}
          change={1}
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Tendance du Chiffre d&apos;Affaires</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b45309" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#b45309" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#44403c" />
                <XAxis dataKey="time" stroke="#a8a29e" />
                <YAxis stroke="#a8a29e" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1c1917",
                    border: "1px solid #78716b",
                  }}
                  labelStyle={{ color: "#fef3c7" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#b45309"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts Summary */}
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Alertes d&apos;Inventaire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {inventoryAlerts.map((alert) => (
              <div
                key={alert.item}
                className="flex items-center justify-between p-3 rounded-lg bg-stone-800/50"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-100">
                    {alert.item}
                  </p>
                  <p className="text-xs text-stone-400">
                    {alert.status === "EXPIRING"
                      ? `Expire dans ${alert.days} jours`
                      : `${alert.qty} unités`}
                  </p>
                </div>
                <Badge
                  variant={
                    alert.status === "CRITICAL"
                      ? "danger"
                      : alert.status === "LOW"
                        ? "default"
                        : "secondary"
                  }
                  className={
                    alert.status === "CRITICAL"
                      ? "bg-red-900/30 text-red-200"
                      : alert.status === "LOW"
                        ? "bg-yellow-900/30 text-yellow-200"
                        : "bg-amber-900/30 text-amber-200"
                  }
                >
                  {alert.status === "EXPIRING"
                    ? "EXPIRE"
                    : alert.status === "CRITICAL"
                      ? "CRITIQUE"
                      : "BAS"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Orders & Reservations Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-stone-100">Commandes Récentes</CardTitle>
              <Button variant="ghost" size="sm" className="text-amber-400">
                Voir Tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-stone-800/50"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-100">
                      {order.id}
                    </p>
                    <p className="text-xs text-stone-400">
                      Table {order.table} • {order.items} articles
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-stone-100">
                      {order.total} MAD
                    </p>
                    <StatusBadge status={order.status} className="text-xs mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today&apos;s Reservations */}
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-stone-100">Réservations d&apos;Aujourd&apos;hui</CardTitle>
              <Button variant="ghost" size="sm" className="text-amber-400">
                Voir Tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysReservations.map((res) => (
                <div
                  key={res.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-stone-800/50"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-100">
                      {res.guest}
                      {res.vip && (
                        <Badge
                          variant="secondary"
                          className="ml-2 bg-amber-900/30 text-amber-200 text-xs"
                        >
                          VIP
                        </Badge>
                      )}
                    </p>
                    <p className="text-xs text-stone-400">
                      {res.time} • Groupe de {res.party}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={res.status} className="text-xs" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Anomalies Section */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-stone-100 flex items-center gap-2">
              <Activity className="h-5 w-5 text-amber-400" />
              Anomalies Récentes
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-amber-400">
              Examiner Tout
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAnomalies.map((anomaly) => (
              <div
                key={anomaly.id}
                className="flex items-center justify-between p-4 rounded-lg bg-stone-800/50 border-l-4 border-amber-500"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-stone-100">
                      {anomaly.type}
                    </p>
                    <Badge
                      variant="secondary"
                      className={
                        anomaly.severity === "HIGH"
                          ? "bg-red-900/30 text-red-200"
                          : "bg-yellow-900/30 text-yellow-200"
                      }
                    >
                      {anomaly.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">
                    {anomaly.detail}
                  </p>
                </div>
                <p className="text-xs text-stone-400">{anomaly.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Bar */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button className="bg-amber-600 hover:bg-amber-700">
              Nouvelle Commande
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              Nouvelle Réservation
            </Button>
            <Button variant="outline" className="border-stone-700">
              Générer Rapports
            </Button>
            <Button variant="outline" className="border-stone-700">
              Voir Analyses
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
