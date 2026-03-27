import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    const employee = await db.employee.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        shifts: { orderBy: { startTime: "desc" }, take: 20 },
        performanceNotes: { orderBy: { createdAt: "desc" }, take: 10 },
        anomalies: { orderBy: { createdAt: "desc" }, take: 10 },
      },
    });

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json({ employee }, { status: 200 });
  } catch (error) {
    console.error("Get employee error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const body = await request.json();
    const {
      firstName,
      lastName,
      department,
      position,
      hourlyRate,
      phone,
      emergencyContact,
      notes,
      isActive,
    } = body;

    const employee = await db.employee.findUnique({
      where: { id: params.id },
    });

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (department !== undefined) updateData.department = department;
    if (position !== undefined) updateData.position = position;
    if (hourlyRate !== undefined) updateData.hourlyRate = hourlyRate;
    if (phone !== undefined) updateData.phone = phone;
    if (emergencyContact !== undefined) updateData.emergencyContact = emergencyContact;
    if (notes !== undefined) updateData.notes = notes;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedEmployee = await db.employee.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: true,
        shifts: { orderBy: { startTime: "desc" }, take: 20 },
        performanceNotes: { orderBy: { createdAt: "desc" }, take: 10 },
        anomalies: { orderBy: { createdAt: "desc" }, take: 10 },
      },
    });

    return NextResponse.json({ employee: updatedEmployee }, { status: 200 });
  } catch (error) {
    console.error("Update employee error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    const employee = await db.employee.findUnique({
      where: { id: params.id },
    });

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    // Soft delete: mark as inactive
    const deletedEmployee = await db.employee.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({ employee: deletedEmployee }, { status: 200 });
  } catch (error) {
    console.error("Delete employee error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
