import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const skip = (page - 1) * limit;

    const where: any = { isActive: true };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    const suppliers = await db.supplier.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: "asc" },
    });

    const total = await db.supplier.count({ where });

    return NextResponse.json(
      { suppliers, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get suppliers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const { name, contactName, email, phone, address, city, taxId, paymentTerms, deliveryDays, leadTimeDays, notes } = body;

    if (!name) {
      return NextResponse.json({ error: "Supplier name required" }, { status: 400 });
    }

    const supplier = await db.supplier.create({
      data: {
        name,
        contactName,
        email,
        phone,
        address,
        city,
        taxId,
        paymentTerms,
        deliveryDays,
        leadTimeDays: leadTimeDays || 1,
        notes,
        isActive: true,
      },
    });

    return NextResponse.json({ supplier }, { status: 201 });
  } catch (error) {
    console.error("Create supplier error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
