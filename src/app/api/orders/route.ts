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

    const orders = await db.orderTicket.findMany({
      where,
      include: { items: { include: { dish: true } }, table: true, guest: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await db.orderTicket.count({ where });

    return NextResponse.json(
      { orders, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { tableId, guestId, items, notes, kitchenNotes, type = "DINE_IN" } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Order must have at least one item" },
        { status: 400 }
      );
    }

    const ticketNumber = `TKT-${Date.now()}`;

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const dish = await db.dish.findUnique({
        where: { id: item.dishId },
      });

      if (!dish) {
        return NextResponse.json(
          { error: `Dish ${item.dishId} not found` },
          { status: 400 }
        );
      }

      const totalPrice = dish.price * (item.quantity || 1);
      subtotal += totalPrice;

      orderItems.push({
        dishId: dish.id,
        quantity: item.quantity || 1,
        unitPrice: dish.price,
        totalPrice,
        modifiers: item.modifiers,
        notes: item.notes,
      });
    }

    const taxAmount = subtotal * 0.1;
    const totalAmount = subtotal + taxAmount;

    const order = await db.orderTicket.create({
      data: {
        ticketNumber,
        tableId,
        guestId,
        employeeId: user.id,
        type,
        status: "OPEN",
        subtotal,
        taxAmount,
        totalAmount,
        notes,
        kitchenNotes,
        items: {
          create: orderItems,
        },
      },
      include: { items: { include: { dish: true } } },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
