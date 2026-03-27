"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Users, Star, Phone, Mail, Check } from "lucide-react";

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

const occasions = [
  "None", "Birthday", "Anniversary", "Business Dinner",
  "Date Night", "Wedding Celebration", "Graduation", "Other",
];

const partySizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    occasion: "",
    requests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <section className="min-h-[70vh] flex items-center justify-center">
          <div className="container-premium text-center space-y-8 animate-fade-in">
            <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-10 w-10 text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Reservation <span className="text-amber-400">Confirmed</span>
            </h1>
            <p className="text-lg text-stone-300 max-w-xl mx-auto">
              Thank you, {form.name}. We&apos;ve received your reservation request for {form.partySize} guest{form.partySize !== "1" ? "s" : ""} on {form.date} at {form.time}.
            </p>
            <p className="text-stone-400">
              A confirmation will be sent to {form.email}. For changes, call us at +212 539 000 000.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-5"
            >
              Make Another Reservation
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative section-spacing border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="container-premium text-center space-y-8 relative z-10 animate-fade-in">
          <p className="text-amber-400 tracking-[0.3em] uppercase text-sm font-medium">Reserve Your Experience</p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold">
            Book a <span className="text-amber-400">Table</span>
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          <p className="text-lg text-stone-300 max-w-2xl mx-auto">
            Secure your place at Tangier&apos;s premier fusion dining destination. For parties over 10 or private events, please contact us directly.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-spacing border-b border-stone-800">
        <div className="container-premium">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-semibold text-amber-400">Guest Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-stone-400">Full Name *</label>
                      <Input
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="bg-stone-900 border-stone-700 text-stone-100 focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-stone-400">Email *</label>
                      <Input
                        required
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="bg-stone-900 border-stone-700 text-stone-100 focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-stone-400">Phone Number *</label>
                    <Input
                      required
                      type="tel"
                      placeholder="+212 6XX XXX XXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-stone-900 border-stone-700 text-stone-100 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-semibold text-amber-400">Reservation Details</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-stone-400">Date *</label>
                      <Input
                        required
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="bg-stone-900 border-stone-700 text-stone-100 focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-stone-400">Time *</label>
                      <Select onValueChange={(v) => setForm({ ...form, time: v })}>
                        <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-100">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="bg-stone-800 border-stone-700">
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-stone-400">Party Size *</label>
                      <Select onValueChange={(v) => setForm({ ...form, partySize: v })}>
                        <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-100">
                          <SelectValue placeholder="Guests" />
                        </SelectTrigger>
                        <SelectContent className="bg-stone-800 border-stone-700">
                          {partySizes.map((s) => (
                            <SelectItem key={s} value={s}>{s} {s === "1" ? "Guest" : "Guests"}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-stone-400">Occasion</label>
                    <Select onValueChange={(v) => setForm({ ...form, occasion: v })}>
                      <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-100">
                        <SelectValue placeholder="Select occasion (optional)" />
                      </SelectTrigger>
                      <SelectContent className="bg-stone-800 border-stone-700">
                        {occasions.map((o) => (
                          <SelectItem key={o} value={o}>{o}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-stone-400">Special Requests</label>
                    <textarea
                      placeholder="Dietary requirements, seating preferences, allergies, celebration details..."
                      value={form.requests}
                      onChange={(e) => setForm({ ...form, requests: e.target.value })}
                      rows={4}
                      className="w-full rounded-lg bg-stone-900 border border-stone-700 text-stone-100 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg font-semibold"
                >
                  Confirm Reservation
                </Button>
                <p className="text-xs text-stone-500 text-center">
                  By submitting, you agree to our cancellation policy. Free cancellation up to 4 hours before your reservation.
                </p>
              </form>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="bg-stone-900 border-stone-800 p-6 space-y-6">
                <h3 className="text-lg font-heading font-semibold text-amber-400">Reservation Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-stone-200">Service Hours</p>
                      <p className="text-xs text-stone-400">Lunch: 12:00 - 15:00</p>
                      <p className="text-xs text-stone-400">Dinner: 19:00 - 23:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-stone-200">Group Dining</p>
                      <p className="text-xs text-stone-400">Parties of 10+ require direct booking. Contact our events team.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-stone-200">VIP & Private Dining</p>
                      <p className="text-xs text-stone-400">Exclusive rooms available for special occasions and corporate events.</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-stone-900 border-stone-800 p-6 space-y-4">
                <h3 className="text-lg font-heading font-semibold text-amber-400">Contact Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-stone-300">+212 539 000 000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-stone-300">reservations@2rfusion.ma</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-amber-900/20 to-stone-900 border-amber-500/20 p-6 space-y-3">
                <h3 className="text-lg font-heading font-semibold text-amber-400">Cancellation Policy</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Free cancellation up to 4 hours before your reservation. Late cancellations or no-shows may incur a charge of 200 MAD per guest. We understand plans change — please let us know as early as possible.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
