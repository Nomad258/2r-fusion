import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    await requireAuth();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysOrders = await db.orderTicket.findMany({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: { items: true },
    });

    const revenue = todaysOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const ordersCount = todaysOrders.length;

    const reservationsCount = await db.reservation.count({
      where: {
        date: { gte: today, lt: tomorrow },
        status: "CONFIRMED",
      },
    });

    const activeAlerts = await db.alert.count({
      where: { isRead: false, isDismissed: false },
    });

    const topDishes = await db.orderItem.groupBy({
      by: ["dishId"],
      where: {
        order: {
          createdAt: { gte: today, lt: tomorrow },
        },
      },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    });

    const topDishesWithDetails = await Promise.all(
      topDishes.map(async (item) => {
        const dish = await db.dish.findUnique({
          where: { id: item.dishId },
        });
        return {
          dishId: item.dishId,
          dishName: dish?.name || "Unknown",
          quantity: item._sum.quantity || 0,
        };
      })
    );

    return NextResponse.json(
      { revenue, ordersCount, reservationsCount, activeAlerts, topDishes: topDishesWithDetails },
      { status: 200 }
    );
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
