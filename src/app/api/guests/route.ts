import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const tier = searchParams.get("tier");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }
    if (tier) where.tier = tier;

    const guests = await db.guest.findMany({
      where,
      include: { tags: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await db.guest.count({ where });

    return NextResponse.json(
      { guests, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get guests error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const { firstName, lastName, email, phone, dateOfBirth, company, notes, preferences, source } = body;

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First and last name required" },
        { status: 400 }
      );
    }

    const guest = await db.guest.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        company,
        notes,
        preferences,
        source,
        tier: "NEW",
      },
      include: { tags: true },
    });

    return NextResponse.json({ guest }, { status: 201 });
  } catch (error) {
    console.error("Create guest error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
