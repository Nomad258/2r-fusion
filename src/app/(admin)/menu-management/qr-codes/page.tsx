"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QRCode from "react-qr-code";
import { Download, Printer, Copy } from "lucide-react";
import { Table } from "@prisma/client";

interface TableWithInfo extends Table {
  venue?: { id: string; name: string; slug: string };
}

export default function QRCodesPage() {
  const [tables, setTables] = useState<TableWithInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch("/api/admin/tables");
        const data = await response.json();
        setTables(data.tables || []);
        if (data.tables?.length > 0) {
          setSelectedVenue(data.tables[0].venueId);
        }
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const venues = Array.from(
    new Map((tables || []).map((t) => [t.venueId, t.venue])).values()
  );

  const filteredTables = selectedVenue
    ? tables.filter((t) => t.venueId === selectedVenue)
    : tables;

  const generateQRUrl = (tableId: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return `${baseUrl}/m/${tableId}`;
  };

  const downloadQR = async (tableId: string, tableNumber: number) => {
    try {
      const svg = document.getElementById(`qr-${tableId}`)?.querySelector("svg");
      if (svg) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = `table-${tableNumber}-qr.png`;
          link.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
      }
    } catch (error) {
      console.error("Failed to download QR:", error);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-stone-400">Loading tables...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-stone-100">QR Menu Codes</h1>
          <p className="text-stone-400 text-sm mt-1">
            Manage and print table menu QR codes
          </p>
        </div>
        <Button
          onClick={handlePrint}
          variant="outline"
          className="gap-2 print:hidden"
        >
          <Printer className="h-4 w-4" />
          Print All
        </Button>
      </div>

      {/* Venue filter */}
      {venues.length > 1 && (
        <div className="flex gap-2 print:hidden">
          {venues.map((venue) => (
            <Button
              key={venue?.id}
              variant={selectedVenue === venue?.id ? "default" : "outline"}
              onClick={() => setSelectedVenue(venue?.id || null)}
              className="text-sm"
            >
              {venue?.name}
            </Button>
          ))}
        </div>
      )}

      {/* QR Codes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2">
        {filteredTables.map((table) => (
          <Card
            key={table.id}
            className="p-6 bg-stone-900 border-amber-900/30 flex flex-col items-center text-center print:break-inside-avoid"
          >
            {/* Table info */}
            <div className="mb-4 w-full">
              <h3 className="text-2xl font-semibold text-stone-100">
                Table {table.number}
              </h3>
              <div className="flex gap-2 justify-center mt-2">
                <Badge variant="outline" className="text-xs">
                  Capacity: {table.capacity}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    table.zone === "VIP"
                      ? "border-amber-700 text-amber-200"
                      : "border-stone-700"
                  }`}
                >
                  {table.zone}
                </Badge>
              </div>
            </div>

            {/* QR Code */}
            <div
              id={`qr-${table.id}`}
              className="bg-white p-4 rounded-lg mb-4 print:mb-2"
            >
              <QRCode
                value={generateQRUrl(table.id)}
                size={200}
                level="H"
              />
            </div>

            {/* URL (small text) */}
            <p className="text-xs text-stone-500 mb-4 break-all max-w-xs print:text-[9px] print:mb-2">
              {generateQRUrl(table.id)}
            </p>

            {/* Actions */}
            <div className="w-full space-y-2 print:hidden">
              <Button
                onClick={() => downloadQR(table.id, table.number)}
                variant="ghost"
                size="sm"
                className="w-full gap-2 text-xs"
              >
                <Download className="h-3 w-3" />
                Download PNG
              </Button>
              <Button
                onClick={() => copyToClipboard(generateQRUrl(table.id))}
                variant="ghost"
                size="sm"
                className="w-full gap-2 text-xs"
              >
                <Copy className="h-3 w-3" />
                Copy Link
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredTables.length === 0 && (
        <div className="text-center py-12">
          <p className="text-stone-400">No tables found for selected venue</p>
        </div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
            color: black;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          .print\\:grid-cols-2 {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .print\\:text-\\[9px\\] {
            font-size: 9px;
          }
          .print\\:mb-2 {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
