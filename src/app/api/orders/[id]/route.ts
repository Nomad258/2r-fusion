import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    const order = await db.orderTicket.findUnique({
      where: { id: params.id },
      include: { items: { include: { dish: true } }, table: true, guest: true, employee: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("Get order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { status, discountAmount, discountReason, isComplimentary, complimentaryReason, isVoid, voidReason } = body;

    const order = await db.orderTicket.findUnique({
      where: { id: params.id },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (discountAmount !== undefined) {
      updateData.discountAmount = discountAmount;
      updateData.discountReason = discountReason;
      updateData.totalAmount = order.subtotal - discountAmount + order.taxAmount;
    }
    if (isComplimentary !== undefined) {
      updateData.isComplimentary = isComplimentary;
      updateData.complimentaryReason = complimentaryReason;
      if (isComplimentary) updateData.totalAmount = 0;
    }
    if (isVoid !== undefined) {
      updateData.isVoid = isVoid;
      updateData.voidReason = voidReason;
      updateData.voidedBy = user.id;
      updateData.voidedAt = new Date();
      updateData.status = "VOID";
    }

    const updatedOrder = await db.orderTicket.update({
      where: { id: params.id },
      data: updateData,
      include: { items: { include: { dish: true } } },
    });

    return NextResponse.json({ order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
