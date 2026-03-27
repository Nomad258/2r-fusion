import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    const supplier = await db.supplier.findUnique({
      where: { id: params.id },
      include: {
        products: {
          include: { inventoryItem: true },
          orderBy: { createdAt: "desc" },
        },
        purchaseOrders: {
          include: { items: true },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        deliveries: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        invoices: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    if (!supplier) {
      return NextResponse.json({ error: "Supplier not found" }, { status: 404 });
    }

    return NextResponse.json({ supplier }, { status: 200 });
  } catch (error) {
    console.error("Get supplier error:", error);
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
      name,
      contactName,
      email,
      phone,
      address,
      city,
      taxId,
      paymentTerms,
      deliveryDays,
      leadTimeDays,
      rating,
      reliabilityScore,
      isActive,
      isPreferred,
      notes,
    } = body;

    const supplier = await db.supplier.findUnique({
      where: { id: params.id },
    });

    if (!supplier) {
      return NextResponse.json({ error: "Supplier not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (contactName !== undefined) updateData.contactName = contactName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (taxId !== undefined) updateData.taxId = taxId;
    if (paymentTerms !== undefined) updateData.paymentTerms = paymentTerms;
    if (deliveryDays !== undefined) updateData.deliveryDays = deliveryDays;
    if (leadTimeDays !== undefined) updateData.leadTimeDays = leadTimeDays;
    if (rating !== undefined) updateData.rating = rating;
    if (reliabilityScore !== undefined) updateData.reliabilityScore = reliabilityScore;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isPreferred !== undefined) updateData.isPreferred = isPreferred;
    if (notes !== undefined) updateData.notes = notes;

    const updatedSupplier = await db.supplier.update({
      where: { id: params.id },
      data: updateData,
      include: {
        products: {
          include: { inventoryItem: true },
          orderBy: { createdAt: "desc" },
        },
        purchaseOrders: {
          include: { items: true },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        deliveries: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        invoices: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    return NextResponse.json({ supplier: updatedSupplier }, { status: 200 });
  } catch (error) {
    console.error("Update supplier error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    const supplier = await db.supplier.findUnique({
      where: { id: params.id },
    });

    if (!supplier) {
      return NextResponse.json({ error: "Supplier not found" }, { status: 404 });
    }

    // Delete supplier and cascade related data
    const deletedSupplier = await db.supplier.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ supplier: deletedSupplier }, { status: 200 });
  } catch (error) {
    console.error("Delete supplier error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
