"use client";

import { Phone, Mail, MapPin, Calendar, Clock, AlertTriangle } from "lucide-react";
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

const employeeData = {
  id: "1",
  firstName: "Ahmed",
  lastName: "Bennani",
  position: "Chef de Cuisine",
  department: "Kitchen",
  status: "ACTIVE",
  hireDate: "2023-01-15",
  phone: "+212 612345678",
  email: "ahmed.bennani@2rfusion.ma",
  hourlyRate: 150.0,
  emergencyContact: "Fatima Bennani",
  emergencyPhone: "+212 612345679",
  notes: "Senior kitchen staff, excellent food quality oversight",
};

const shiftHistory = [
  {
    id: "1",
    date: "2026-03-27",
    startTime: "15:00",
    endTime: "23:30",
    status: "COMPLETED",
    hours: 8.5,
  },
  {
    id: "2",
    date: "2026-03-26",
    startTime: "15:00",
    endTime: "23:45",
    status: "COMPLETED",
    hours: 8.75,
  },
  {
    id: "3",
    date: "2026-03-25",
    startTime: "15:00",
    endTime: "23:30",
    status: "COMPLETED",
    hours: 8.5,
  },
  {
    id: "4",
    date: "2026-03-24",
    startTime: "Off",
    endTime: "Off",
    status: "OFF",
    hours: 0,
  },
];

const performanceNotes = [
  {
    id: "1",
    date: "2026-03-25",
    type: "COMMENDATION",
    author: "Mohammad Khaldi",
    note: "Excellent execution of the chef special menu. Plates were perfect.",
  },
  {
    id: "2",
    date: "2026-03-22",
    type: "GENERAL",
    author: "Layla Ouhammou",
    note: "Worked well during high-volume service. Quick adaptation to menu changes.",
  },
  {
    id: "3",
    date: "2026-03-18",
    type: "TRAINING",
    author: "Mohammad Khaldi",
    note: "Completed advanced plating techniques workshop.",
  },
];

const anomalies = [
  {
    id: "1",
    type: "QUALITY_CONCERN",
    severity: "LOW",
    date: "2026-03-20",
    description: "One plate returned for temperature on high-volume night",
    status: "RESOLVED",
  },
];

export default function EmployeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const totalHours = shiftHistory
    .reduce((sum, shift) => sum + shift.hours, 0)
    .toFixed(1);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${employeeData.firstName} ${employeeData.lastName}`}
        description={`${employeeData.position} • ${employeeData.department}`}
      />

      {/* Employee Profile Card */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-stone-100">Employee Information</CardTitle>
              <p className="text-xs text-stone-400 mt-1">
                Personal and employment details
              </p>
            </div>
            <Badge
              className={
                employeeData.status === "ACTIVE"
                  ? "bg-emerald-900/30 text-emerald-200"
                  : "bg-red-900/30 text-red-200"
              }
            >
              {employeeData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-stone-400 mb-1">Position</p>
                <p className="text-stone-100 font-medium">
                  {employeeData.position}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1">Department</p>
                <p className="text-stone-100 font-medium">
                  {employeeData.department}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone
                </p>
                <p className="text-stone-100">{employeeData.phone}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </p>
                <p className="text-stone-100">{employeeData.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-stone-400 mb-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Hire Date
                </p>
                <p className="text-stone-100 font-medium">
                  {employeeData.hireDate}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  ({Math.floor((Date.now() - new Date(employeeData.hireDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years)
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1">Hourly Rate</p>
                <p className="text-stone-100 font-medium">
                  {employeeData.hourlyRate.toFixed(2)} MAD/hour
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1">Emergency Contact</p>
                <p className="text-stone-100">{employeeData.emergencyContact}</p>
                <p className="text-xs text-stone-500">{employeeData.emergencyPhone}</p>
              </div>
            </div>
          </div>

          {employeeData.notes && (
            <div className="bg-stone-800/50 border border-stone-700 rounded p-3 mt-4">
              <p className="text-xs text-stone-400 mb-1">Notes</p>
              <p className="text-stone-100 text-sm">{employeeData.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">Hours This Week</p>
              <p className="text-2xl font-semibold text-stone-100">
                {totalHours}
              </p>
              <p className="text-xs text-stone-400 mt-2">4 shifts</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">Performance Notes</p>
              <p className="text-2xl font-semibold text-stone-100">
                {performanceNotes.length}
              </p>
              <p className="text-xs text-stone-400 mt-2">documented</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">Anomalies</p>
              <p className="text-2xl font-semibold text-amber-400">
                {anomalies.length}
              </p>
              <p className="text-xs text-stone-400 mt-2">flagged</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">Reliability</p>
              <p className="text-2xl font-semibold text-emerald-400">98%</p>
              <p className="text-xs text-stone-400 mt-2">attendance</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shift History */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Shift History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Date</TableHead>
                  <TableHead className="text-stone-400">Start Time</TableHead>
                  <TableHead className="text-stone-400">End Time</TableHead>
                  <TableHead className="text-stone-400">Hours</TableHead>
                  <TableHead className="text-stone-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shiftHistory.map((shift) => (
                  <TableRow
                    key={shift.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-stone-100">
                      {shift.date}
                    </TableCell>
                    <TableCell className="text-stone-400">{shift.startTime}</TableCell>
                    <TableCell className="text-stone-400">{shift.endTime}</TableCell>
                    <TableCell className="text-stone-100 font-medium">
                      {shift.hours > 0 ? shift.hours : "-"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={shift.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Notes */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">Performance Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {performanceNotes.map((note) => (
            <div
              key={note.id}
              className="border-l-4 border-amber-400 bg-stone-800/50 p-4 rounded"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-stone-100">
                    {note.type === "COMMENDATION" && "Commendation"}
                    {note.type === "GENERAL" && "Performance Note"}
                    {note.type === "TRAINING" && "Training"}
                  </p>
                  <p className="text-xs text-stone-400">
                    {note.date} by {note.author}
                  </p>
                </div>
                <Badge
                  className={
                    note.type === "COMMENDATION"
                      ? "bg-emerald-900/30 text-emerald-200"
                      : "bg-stone-700/50 text-stone-200"
                  }
                >
                  {note.type}
                </Badge>
              </div>
              <p className="text-stone-300">{note.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Anomalies */}
      {anomalies.length > 0 && (
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              Flagged Anomalies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {anomalies.map((anomaly) => (
                <div
                  key={anomaly.id}
                  className="border border-stone-700 rounded p-3 bg-stone-800/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-stone-100">
                        {anomaly.type.replace(/_/g, " ")}
                      </p>
                      <p className="text-xs text-stone-400">{anomaly.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          anomaly.severity === "LOW"
                            ? "bg-yellow-900/30 text-yellow-200"
                            : anomaly.severity === "MEDIUM"
                            ? "bg-orange-900/30 text-orange-200"
                            : "bg-red-900/30 text-red-200"
                        }
                      >
                        {anomaly.severity}
                      </Badge>
                      <StatusBadge status={anomaly.status} />
                    </div>
                  </div>
                  <p className="text-sm text-stone-300">{anomaly.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button className="bg-amber-600 hover:bg-amber-700">Edit Employee</Button>
        <Button variant="outline" className="border-stone-700 text-amber-400 hover:bg-stone-800">
          View Schedule
        </Button>
        <Button variant="outline" className="border-stone-700 text-amber-400 hover:bg-stone-800">
          Add Performance Note
        </Button>
        <Button
          variant="outline"
          className="border-red-900 text-red-400 hover:bg-red-900/20"
        >
          Deactivate
        </Button>
      </div>
    </div>
  );
}
