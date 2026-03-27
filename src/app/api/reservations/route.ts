import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateConfirmationCode } from "@/lib/utils";
import { z } from "zod";

// Validation schema
const ReservationSchema = z.object({
  guestName: z.string().min(2, "Name must be at least 2 characters"),
  guestEmail: z.string().email("Invalid email address"),
  guestPhone: z.string().min(10, "Phone must be at least 10 characters"),
  date: z.string().refine(
    (date) => new Date(date) > new Date(),
    "Date must be in the future"
  ),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  partySize: z.string().refine(
    (size) => parseInt(size) >= 1 && parseInt(size) <= 12,
    "Party size must be between 1 and 12"
  ),
  occasion: z.string().optional(),
  specialRequests: z.string().optional(),
  isPrivateRoom: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = ReservationSchema.parse(body);

    // Check for duplicate reservation (same guest, date, time)
    const existingReservation = await db.reservation.findFirst({
      where: {
        guestEmail: validatedData.guestEmail,
        date: new Date(validatedData.date),
        timeSlot: validatedData.timeSlot,
        status: { not: "CANCELLED" },
      },
    });

    if (existingReservation) {
      return NextResponse.json(
        { error: "A reservation already exists for this date and time" },
        { status: 409 }
      );
    }

    // Find or create guest
    let guest = await db.guest.findFirst({
      where: { email: validatedData.guestEmail },
    });

    if (!guest && validatedData.guestEmail) {
      guest = await db.guest.create({
        data: {
          firstName: validatedData.guestName.split(" ")[0],
          lastName: validatedData.guestName.split(" ").slice(1).join(" ") || "",
          email: validatedData.guestEmail,
          phone: validatedData.guestPhone,
          source: "WEBSITE",
        },
      });
    }

    // Generate confirmation code
    const confirmationCode = generateConfirmationCode();

    // Create reservation
    const reservation = await db.reservation.create({
      data: {
        guestId: guest?.id,
        guestName: validatedData.guestName,
        guestEmail: validatedData.guestEmail,
        guestPhone: validatedData.guestPhone,
        date: new Date(validatedData.date),
        timeSlot: validatedData.timeSlot,
        partySize: parseInt(validatedData.partySize),
        occasion: validatedData.occasion,
        specialRequests: validatedData.specialRequests,
        isPrivateRoom: validatedData.isPrivateRoom,
        confirmationCode,
        status: "CONFIRMED",
        source: "WEBSITE",
      },
    });

    // Update guest visit count if guest exists
    if (guest) {
      await db.guest.update({
        where: { id: guest.id },
        data: {
          totalVisits: { increment: 1 },
          lastVisitAt: new Date(validatedData.date),
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        confirmationCode: reservation.confirmationCode,
        reservationId: reservation.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Reservation creation error:", error);
    return NextResponse.json(
      { error: "Failed to create reservation. Please try again." },
      { status: 500 }
    );
  }
}
