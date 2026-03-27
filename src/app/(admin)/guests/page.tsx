"use client";


import Link from "next/link";
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
import { PageHeader } from "@/components/shared";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const guestTiers = {
  NEW: "bg-blue-900/30 text-blue-200",
  REGULAR: "bg-stone-700/50 text-stone-200",
  VIP: "bg-amber-900/30 text-amber-200",
  PREMIUM: "bg-purple-900/30 text-purple-200",
  WHALE: "bg-red-900/30 text-red-200",
};

const guests = [
  {
    id: "GUEST-001",
    name: "Ahmed Bennani",
    email: "ahmed@example.com",
    phone: "+212 612345678",
    tier: "WHALE",
    visits: 24,
    totalSpent: 18500,
    avgSpend: 771,
    tags: ["VIP", "Regular", "Birthday Special"],
    joinDate: "2023-01-15",
  },
  {
    id: "GUEST-002",
    name: "Fatima Al-Ansari",
    email: "fatima@example.com",
    phone: "+212 612345679",
    tier: "PREMIUM",
    visits: 12,
    totalSpent: 8200,
    avgSpend: 683,
    tags: ["Couples", "Anniversary"],
    joinDate: "2023-06-20",
  },
  {
    id: "GUEST-003",
    name: "Mohammad Khaldi",
    email: "mohammad@example.com",
    phone: "+212 612345680",
    tier: "PREMIUM",
    visits: 8,
    totalSpent: 5600,
    avgSpend: 700,
    tags: ["Business Dinners", "Corporate"],
    joinDate: "2023-08-10",
  },
  {
    id: "GUEST-004",
    name: "Layla Ouhammou",
    email: "layla@example.com",
    phone: "+212 612345681",
    tier: "VIP",
    visits: 6,
    totalSpent: 3850,
    avgSpend: 642,
    tags: ["Group Events"],
    joinDate: "2024-01-05",
  },
  {
    id: "GUEST-005",
    name: "Hassan Rami",
    email: "hassan@example.com",
    phone: "+212 612345682",
    tier: "REGULAR",
    visits: 4,
    totalSpent: 2100,
    avgSpend: 525,
    tags: ["Family Dining"],
    joinDate: "2024-02-14",
  },
  {
    id: "GUEST-006",
    name: "Nadia Saadi",
    email: "nadia@example.com",
    phone: "+212 612345683",
    tier: "REGULAR",
    visits: 3,
    totalSpent: 1950,
    avgSpend: 650,
    tags: ["Couples"],
    joinDate: "2024-03-01",
  },
  {
    id: "GUEST-007",
    name: "Omar Fassi",
    email: "omar@example.com",
    phone: "+212 612345684",
    tier: "NEW",
    visits: 1,
    totalSpent: 320,
    avgSpend: 320,
    tags: ["First Time"],
    joinDate: "2026-03-20",
  },
  {
    id: "GUEST-008",
    name: "Samira Khouyi",
    email: "samira@example.com",
    phone: "+212 612345685",
    tier: "VIP",
    visits: 7,
    totalSpent: 4200,
    avgSpend: 600,
    tags: ["Regular", "Special Occasions"],
    joinDate: "2023-11-08",
  },
];

export default function GuestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Guest Intelligence"
        description="CRM and customer relationship management"
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-stone-400 mb-1">Total Guests</p>
                <p className="text-3xl font-semibold text-stone-100">248</p>
              </div>
              <Users className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Premium Members</p>
              <p className="text-3xl font-semibold text-stone-100">18</p>
              <p className="text-xs text-stone-400 mt-2">7.3% of total</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">Avg Spend/Visit</p>
              <p className="text-3xl font-semibold text-stone-100">620</p>
              <p className="text-xs text-stone-400 mt-2">MAD</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-stone-400 mb-1">This Month Revenue</p>
              <p className="text-3xl font-semibold text-stone-100">94,500</p>
              <p className="text-xs text-stone-400 mt-2">MAD</p>
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
                Search Guests
              </label>
              <Input
                placeholder="Search by name, email, or phone..."
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm text-stone-400 block mb-2">Tier</label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-stone-800 border-stone-700">
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="whale">Whale</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              + Import Guests
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Guests Table */}
      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-100">All Guests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-stone-800 hover:bg-transparent">
                  <TableHead className="text-stone-400">Name</TableHead>
                  <TableHead className="text-stone-400">Contact</TableHead>
                  <TableHead className="text-stone-400">Tier</TableHead>
                  <TableHead className="text-stone-400">Visits</TableHead>
                  <TableHead className="text-stone-400">Total Spent</TableHead>
                  <TableHead className="text-stone-400">Avg Spend</TableHead>
                  <TableHead className="text-stone-400">Tags</TableHead>
                  <TableHead className="text-stone-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((guest) => (
                  <TableRow
                    key={guest.id}
                    className="border-stone-800 hover:bg-stone-800/50"
                  >
                    <TableCell className="font-medium text-stone-100">
                      {guest.name}
                    </TableCell>
                    <TableCell className="text-stone-400">
                      <div className="text-sm">
                        <p>{guest.phone}</p>
                        <p className="text-xs text-stone-500">{guest.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={guestTiers[guest.tier as keyof typeof guestTiers]}
                      >
                        {guest.tier}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-stone-100 font-medium">
                      {guest.visits}
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {guest.totalSpent.toLocaleString()} MAD
                    </TableCell>
                    <TableCell className="text-stone-400">
                      {guest.avgSpend} MAD
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {guest.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-stone-800 text-stone-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {guest.tags.length > 2 && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-stone-800 text-stone-300"
                          >
                            +{guest.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-400 hover:text-amber-300"
                        asChild
                      >
                        <Link href={`/admin/guests/${guest.id}`}>View</Link>
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
