import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    const guest = await db.guest.findUnique({
      where: { id: params.id },
      include: { tags: true, reservations: true },
    });

    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    return NextResponse.json({ guest }, { status: 200 });
  } catch (error) {
    console.error("Get guest error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const body = await request.json();
    const { firstName, lastName, email, phone, dateOfBirth, company, notes, preferences, tier, loyaltyPoints, totalSpent, totalVisits, lastVisitAt, tags } = body;

    const guest = await db.guest.findUnique({
      where: { id: params.id },
    });

    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
    if (company !== undefined) updateData.company = company;
    if (notes !== undefined) updateData.notes = notes;
    if (preferences !== undefined) updateData.preferences = preferences;
    if (tier !== undefined) updateData.tier = tier;
    if (loyaltyPoints !== undefined) updateData.loyaltyPoints = loyaltyPoints;
    if (totalSpent !== undefined) updateData.totalSpent = totalSpent;
    if (totalVisits !== undefined) updateData.totalVisits = totalVisits;
    if (lastVisitAt !== undefined) updateData.lastVisitAt = lastVisitAt ? new Date(lastVisitAt) : null;

    const updatedGuest = await db.guest.update({
      where: { id: params.id },
      data: updateData,
      include: { tags: true },
    });

    if (tags && Array.isArray(tags)) {
      await db.guestTag.deleteMany({ where: { guestId: params.id } });
      for (const tag of tags) {
        await db.guestTag.create({
          data: { guestId: params.id, tag },
        });
      }
    }

    return NextResponse.json({ guest: updatedGuest }, { status: 200 });
  } catch (error) {
    console.error("Update guest error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
