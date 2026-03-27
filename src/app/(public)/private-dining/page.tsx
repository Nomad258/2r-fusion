import Link from "next/link";
import { ArrowRight, Users, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Private Dining - 2R FUSION",
  description: "Exclusive private rooms for celebrations, corporate events, and intimate gatherings.",
};

export default function PrivateDiningPage() {
  const privateRooms = [
    {
      name: "The Strait Room",
      capacity: "12-20 guests",
      minSpend: "8,000 MAD",
      features: ["Floor-to-ceiling windows", "Wine wall display", "Private bar access", "Custom menu planning"],
      icon: "🌊",
    },
    {
      name: "The Omakase Suite",
      capacity: "8-15 guests",
      minSpend: "6,500 MAD",
      features: ["Chef's counter seating", "Behind-the-scenes experience", "Sake pairing expertise", "Interactive dining"],
      icon: "🍣",
    },
    {
      name: "The Garden Terrace",
      capacity: "20-40 guests",
      minSpend: "12,000 MAD",
      features: ["Outdoor seating", "String lights & ambiance", "Full catering flexibility", "Photography space"],
      icon: "🌺",
    },
  ];

  return (
    <>
      <section className="section-spacing border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="container-premium text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-heading font-bold">Private Dining</h1>
            <div className="h-1 w-16 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto" />
          </div>
        </div>
      </section>

      <section className="section-spacing border-b border-stone-800">
        <div className="container-premium space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl font-heading font-bold">Our Private Rooms</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto" />
          </div>

          <div className="space-y-8">
            {privateRooms.map((room, i) => (
              <Card
                key={i}
                className="bg-stone-900 border-stone-800 hover:border-gold-500/50 transition-all duration-300 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="md:col-span-1 h-64 md:h-80 bg-gradient-to-br from-gold-600/20 to-stone-900/40 border-r border-stone-800 flex items-center justify-center">
                    <span className="text-6xl">{room.icon}</span>
                  </div>

                  <div className="md:col-span-2 p-8 space-y-6">
                    <div>
                      <h3 className="text-3xl font-heading font-bold text-gold-400 mb-2">{room.name}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone-800">
                      <div>
                        <p className="text-sm text-stone-500 mb-1">Capacity</p>
                        <p className="font-semibold text-gold-400 flex items-center gap-2">
                          <Users size={18} /> {room.capacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 mb-1">Minimum Spend</p>
                        <p className="font-semibold text-gold-400 flex items-center gap-2">
                          <DollarSign size={18} /> {room.minSpend}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-stone-400 mb-3">Amenities</p>
                      <ul className="grid grid-cols-2 gap-2">
                        {room.features.map((feature, j) => (
                          <li key={j} className="text-stone-300 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-premium max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-4xl font-heading font-bold">Ready to Celebrate?</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-gold inline-flex items-center justify-center gap-2">
              Book Your Event <ArrowRight size={18} />
            </Link>
            <a
              href="mailto:events@2rfusion.ma"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Contact Us Directly
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
