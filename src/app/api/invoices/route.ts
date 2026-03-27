import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;

    const invoices = await db.invoice.findMany({
      where,
      include: { supplier: true, purchaseOrder: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await db.invoice.count({ where });

    return NextResponse.json(
      { invoices, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get invoices error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const { supplierId, purchaseOrderId, invoiceNumber, subtotal, taxAmount, dueDate, notes } = body;

    if (!invoiceNumber || subtotal === undefined) {
      return NextResponse.json(
        { error: "Invoice number and subtotal required" },
        { status: 400 }
      );
    }

    const totalAmount = subtotal + (taxAmount || 0);

    const invoice = await db.invoice.create({
      data: {
        supplierId,
        purchaseOrderId,
        invoiceNumber,
        subtotal,
        taxAmount: taxAmount || 0,
        totalAmount,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        notes,
        status: "PENDING",
      },
      include: { supplier: true },
    });

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    console.error("Create invoice error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
