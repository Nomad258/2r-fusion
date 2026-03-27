"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlertTriangle, Shield, Eye } from "lucide-react";
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
import { PageHeader } from "@/components/shared";

const trendData = [
  { date: "Mar 13", critical: 1, high: 3, medium: 5, low: 4 },
  { date: "Mar 14", critical: 2, high: 4, medium: 6, low: 5 },
  { date: "Mar 15", critical: 1, high: 3, medium: 7, low: 6 },
  { date: "Mar 16", critical: 3, high: 5, medium: 8, low: 4 },
  { date: "Mar 17", critical: 2, high: 4, medium: 6, low: 7 },
  { date: "Mar 18", critical: 4, high: 6, medium: 9, low: 5 },
  { date: "Mar 19", critical: 2, high: 5, medium: 7, low: 6 },
  { date: "Mar 20", critical: 3, high: 4, medium: 8, low: 8 },
  { date: "Mar 21", critical: 1, high: 6, medium: 10, low: 5 },
  { date: "Mar 22", critical: 2, high: 5, medium: 7, low: 6 },
  { date: "Mar 23", critical: 3, high: 7, medium: 9, low: 4 },
  { date: "Mar 24", critical: 2, high: 4, medium: 6, low: 7 },
  { date: "Mar 25", critical: 4, high: 6, medium: 8, low: 5 },
  { date: "Mar 26", critical: 3, high: 5, medium: 7, low: 6 },
];

const anomalies = [
  { id: "ANM-001", type: "EXCESSIVE_VOIDS", severity: "critical", employee: "Ahmed Bennani", detail: "3 commandes annulées totalisant 2,850 MAD en 10 minutes", time: "22:15", amount: 2850 },
  { id: "ANM-002", type: "CASH_MISMATCH", severity: "critical", employee: "Salim Tazi", detail: "Caisse courte de 1,200 MAD en fin de service — 3e fois cette semaine", time: "20:45", amount: 1200 },
  { id: "ANM-003", type: "UNUSUAL_DISCOUNT", severity: "high", employee: "Fatima El Houari", detail: "Remise de 35% appliquée à la Table 7 — dépasse le seuil d&apos;autorisation de 20%", time: "19:30", amount: 450 },
  { id: "ANM-004", type: "INVENTORY_SHRINKAGE", severity: "high", employee: "System", detail: "Truffe noire: 8 portions non comptabilisées entre livraison et inventaire", time: "18:00", amount: 4400 },
  { id: "ANM-005", type: "SUSPICIOUS_PATTERN", severity: "high", employee: "Mohamed Zahra", detail: "14 annulations en 3 heures — taux 3x supérieur à la moyenne de l&apos;équipe", time: "17:45", amount: 890 },
  { id: "ANM-006", type: "EXCESSIVE_VOIDS", severity: "medium", employee: "Karim Fassih", detail: "3 commandes annulées de plats premium à 280 MAD chacun", time: "15:20", amount: 840 },
  { id: "ANM-007", type: "UNUSUAL_DISCOUNT", severity: "medium", employee: "Yasmine Bennani", detail: "Remises progressives sur 4 services — total cumulé 670 MAD", time: "14:50", amount: 670 },
  { id: "ANM-008", type: "CASH_MISMATCH", severity: "medium", employee: "Abdelaziz Karim", detail: "Paiement partiel en espèces de 320 MAD non enregistré au POS", time: "13:15", amount: 320 },
  { id: "ANM-009", type: "INVENTORY_SHRINKAGE", severity: "low", employee: "System", detail: "Variation mineure: homard (-2), maquereau (-3), champignons (-1kg)", time: "12:00", amount: 0 },
  { id: "ANM-010", type: "SUSPICIOUS_PATTERN", severity: "low", employee: "Nadia Alaoui", detail: "2 annulations mineures sur transaction multi-articles — dans la tolérance", time: "11:30", amount: 85 },
];

const employeeRisks = [
  { name: "Ahmed Bennani", anomalies: 12, riskScore: 92, role: "Serveur" },
  { name: "Salim Tazi", anomalies: 8, riskScore: 78, role: "Caissier" },
  { name: "Fatima El Houari", anomalies: 5, riskScore: 61, role: "Serveur" },
  { name: "Mohamed Zahra", anomalies: 4, riskScore: 54, role: "Serveur" },
  { name: "Karim Fassih", anomalies: 3, riskScore: 42, role: "Barista" },
];

const severityColors: Record<string, string> = {
  critical: "bg-red-900/30 text-red-200",
  high: "bg-orange-900/30 text-orange-200",
  medium: "bg-yellow-900/30 text-yellow-200",
  low: "bg-green-900/30 text-green-200",
};

const typeLabels: Record<string, string> = {
  EXCESSIVE_VOIDS: "Annulations Excessives",
  UNUSUAL_DISCOUNT: "Remise Inhabituelle",
  CASH_MISMATCH: "Décalage Caisse",
  INVENTORY_SHRINKAGE: "Disparitions Inventaire",
  SUSPICIOUS_PATTERN: "Motif Suspect",
};

export default function AnomaliesPage() {
  const critical = anomalies.filter((a) => a.severity === "critical").length;
  const high = anomalies.filter((a) => a.severity === "high").length;
  const medium = anomalies.filter((a) => a.severity === "medium").length;
  const low = anomalies.filter((a) => a.severity === "low").length;
  const riskScore = Math.round(((critical * 100 + high * 70 + medium * 40 + low * 10) / (anomalies.length * 100)) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Détection des Anomalies"
        description="Surveillance en temps réel de la fraude, vol et risques opérationnels"
      />

      {/* Risk Score */}
      <Card className="bg-gradient-to-r from-amber-900/20 via-stone-900 to-stone-900 border-amber-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-400 mb-1">Score de Risque Global</p>
              <div className="flex items-baseline gap-3">
                <p className={`text-5xl font-bold ${riskScore >= 70 ? "text-red-400" : riskScore >= 40 ? "text-amber-400" : "text-emerald-400"}`}>
                  {riskScore}
                </p>
                <span className="text-stone-500">/100</span>
              </div>
              <p className="text-xs text-stone-500 mt-2">{anomalies.length} anomalies détectées aujourd&apos;hui</p>
            </div>
            <Shield className="h-16 w-16 text-amber-400/20" />
          </div>
        </CardContent>
      </Card>

      {/* Severity Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Critique", count: critical, color: "text-red-400", border: "border-red-500/30" },
          { label: "Élevée", count: high, color: "text-orange-400", border: "border-orange-500/30" },
          { label: "Moyenne", count: medium, color: "text-yellow-400", border: "border-yellow-500/30" },
          { label: "Faible", count: low, color: "text-emerald-400", border: "border-emerald-500/30" },
        ].map((s) => (
          <Card key={s.label} className={`bg-stone-900 ${s.border}`}>
            <CardContent className="pt-6">
              <p className="text-sm text-stone-400 mb-1">{s.label}</p>
              <p className={`text-3xl font-semibold ${s.color}`}>{s.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trend Chart */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Tendance des Anomalies (14 derniers jours)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#44403c" />
              <XAxis dataKey="date" stroke="#a8a29e" fontSize={12} />
              <YAxis stroke="#a8a29e" />
              <Tooltip contentStyle={{ backgroundColor: "#1c1917", border: "1px solid #78716b" }} labelStyle={{ color: "#fef3c7" }} />
              <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name="Critique" dot={false} />
              <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} name="Élevée" dot={false} />
              <Line type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={1.5} name="Moyenne" dot={false} />
              <Line type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={1} name="Faible" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Anomaly Feed */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-stone-100 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              Anomalies Actives
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-amber-400">Voir Tout</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {anomalies.map((a) => (
              <div
                key={a.id}
                className={`p-4 rounded-lg bg-stone-800/50 border-l-4 ${
                  a.severity === "critical" ? "border-red-500" :
                  a.severity === "high" ? "border-orange-500" :
                  a.severity === "medium" ? "border-yellow-500" : "border-emerald-500"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-medium text-stone-100">{typeLabels[a.type]}</span>
                      <Badge className={severityColors[a.severity]}>{a.severity.toUpperCase()}</Badge>
                      {a.amount > 0 && (
                        <span className="text-xs font-mono text-amber-400">{a.amount.toLocaleString()} MAD</span>
                      )}
                    </div>
                    <p className="text-sm text-stone-400">{a.detail}</p>
                    <p className="text-xs text-stone-500 mt-1">{a.employee} • Aujourd&apos;hui à {a.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300 ml-4">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employee Risk Ranking */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Classement des Risques Employés</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-stone-800 hover:bg-transparent">
                <TableHead className="text-stone-400">Employé</TableHead>
                <TableHead className="text-stone-400">Rôle</TableHead>
                <TableHead className="text-stone-400 text-center">Anomalies</TableHead>
                <TableHead className="text-stone-400 text-center">Score de Risque</TableHead>
                <TableHead className="text-stone-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeRisks.map((emp) => (
                <TableRow key={emp.name} className="border-stone-800 hover:bg-stone-800/50">
                  <TableCell className="font-medium text-stone-100">{emp.name}</TableCell>
                  <TableCell className="text-stone-400">{emp.role}</TableCell>
                  <TableCell className="text-center text-stone-300">{emp.anomalies}</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-bold ${
                      emp.riskScore >= 80 ? "text-red-400" :
                      emp.riskScore >= 60 ? "text-orange-400" :
                      emp.riskScore >= 40 ? "text-yellow-400" : "text-emerald-400"
                    }`}>
                      {emp.riskScore}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300">Examiner</Button>
                      <Button variant="ghost" size="sm" className="text-stone-400 hover:text-stone-300">Historique</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}