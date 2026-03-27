import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const department = searchParams.get("department");
    const skip = (page - 1) * limit;

    const where: any = { isActive: true };
    if (department) where.department = department;

    const employees = await db.employee.findMany({
      where,
      include: { user: true },
      skip,
      take: limit,
      orderBy: { lastName: "asc" },
    });

    const total = await db.employee.count({ where });

    return NextResponse.json(
      { employees, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get employees error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const { userId, firstName, lastName, department, position, hireDate, hourlyRate, phone, emergencyContact, notes } = body;

    if (!userId || !firstName || !lastName || !department || !position || !hireDate) {
      return NextResponse.json(
        { error: "Required fields: userId, firstName, lastName, department, position, hireDate" },
        { status: 400 }
      );
    }

    const employee = await db.employee.create({
      data: {
        userId,
        firstName,
        lastName,
        department,
        position,
        hireDate: new Date(hireDate),
        hourlyRate,
        phone,
        emergencyContact,
        notes,
        isActive: true,
      },
      include: { user: true },
    });

    return NextResponse.json({ employee }, { status: 201 });
  } catch (error) {
    console.error("Create employee error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
