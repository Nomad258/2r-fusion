import { db } from "@/lib/db";

export interface DetectedAnomaly {
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  riskScore: number;
  employeeId?: string;
  description: string;
  details: object;
  evidence: object;
}

export async function scanAnomalies(): Promise<DetectedAnomaly[]> {
  const anomalies: DetectedAnomaly[] = [];

  anomalies.push(...(await checkExcessiveComps()));
  anomalies.push(...(await checkAbnormalVoids()));
  anomalies.push(...(await checkUnusualDiscounts()));
  anomalies.push(...(await checkInventoryShrinkage()));
  anomalies.push(...(await checkSuspiciousWastage()));
  anomalies.push(...(await checkShiftVariance()));
  anomalies.push(...(await checkAfterHoursEdit()));
  anomalies.push(...(await checkSupplierMismatch()));

  return anomalies;
}

async function checkExcessiveComps(): Promise<DetectedAnomaly[]> {
  const anomalies: DetectedAnomaly[] = [];
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const employees = await db.employee.findMany({
    where: { isActive: true },
  });

  for (const employee of employees) {
    const todaysComps = await db.orderTicket.count({
      where: {
        employeeId: employee.id,
        isComplimentary: true,
        createdAt: {
          gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        },
      },
    });

    if (todaysComps > 3) {
      anomalies.push({
        type: "EXCESSIVE_COMPS",
        severity: "HIGH",
        riskScore: Math.min(1, todaysComps / 10),
        employeeId: employee.id,
        description: `Employee ${employee.firstName} ${employee.lastName} marked ${todaysComps} complimentary orders today (threshold: 3)`,
        details: { compsToday: todaysComps, employeeId: employee.id },
        evidence: { timestamp: new Date() },
      });
    }

    const weekComps = await db.orderTicket.count({
      where: {
        employeeId: employee.id,
        isComplimentary: true,
        createdAt: { gte: weekAgo },
      },
    });

    if (weekComps > 10) {
      anomalies.push({
        type: "EXCESSIVE_COMPS",
        severity: "MEDIUM",
        riskScore: Math.min(0.8, weekComps / 30),
        employeeId: employee.id,
        description: `Employee ${employee.firstName} ${employee.lastName} marked ${weekComps} complimentary orders this week (threshold: 10)`,
        details: { compsThisWeek: weekComps, employeeId: employee.id },
        evidence: { periodDays: 7 },
      });
    }
  }

  return anomalies;
}

async function checkAbnormalVoids(): Promise<DetectedAnomaly[]> {
  const anomalies: DetectedAnomaly[] = [];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const employees = await db.employee.findMany({
    where: { isActive: true },
  });

  for (const employee of employees) {
    const voidsToday = await db.orderItem.count({
      where: {
        order: { employeeId: employee.id, createdAt: { gte: today } },
        isVoid: true,
      },
    });

    const ordersToday = await db.orderItem.count({
      where: {
        order: { employeeId: employee.id, createdAt: { gte: today } },
      },
    });

    const voidRate = ordersToday > 0 ? voidsToday / ordersToday : 0;

    if (voidsToday > 5 || voidRate > 0.15) {
      anomalies.push({
        type: "ABNORMAL_VOIDS",
        severity: "HIGH",
        riskScore: Math.min(1, (voidsToday / 5) * 0.5 + voidRate * 0.5),
        employeeId: employee.id,
        description: `Employee ${employee.firstName} ${employee.lastName} voided ${voidsToday} items today (${(voidRate * 100).toFixed(1)}% void rate)`,
        details: { voidsToday, ordersToday, voidRate, employeeId: employee.id },
        evidence: { timestamp: new Date() },
      });
    }
  }

  return anomalies;
}

async function checkUnusualDiscounts(): Promise<DetectedAnomaly[]> {
  const anomalies: DetectedAnomaly[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const orders = await db.orderTicket.findMany({
    where: {
      discountAmount: { gt: 0 },
      createdAt: { gte: today },
    },
    include: { items: { include: { dish: true } } },
  });

  for (const order of orders) {
    const discountPercent = (order.discountAmount / order.subtotal) * 100;

    for (const item of order.items) {
      if (item.dish.price > 300 && discountPercent > 20) {
        anomalies.push({
          type: "UNUSUAL_DISCOUNTS",
          severity: "MEDIUM",
          riskScore: discountPercent / 100,
          description: `Large discount (${discountPercent.toFixed(1)}%) applied to premium item "${item.dish.name}" (${item.dish.price} MAD) on order ${order.ticketNumber}`,
          details: { dishId: item.dishId, discountPercent, orderId: order.id },
          evidence: { discountReason: order.discountReason },
        });
      }
    }
  }

  return anomalies;
}

async function checkInventoryShrinkage(): Promise<DetectedAnomaly[]> {
  const anomalies: DetectedAnomaly[] = [];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const items = await db.inventoryItem.findMany({
    where: { isActive: true },
  });

  for (const item of items) {
    const movements = await db.stockMovement.findMany({
      where: {
        inventoryItemId: item.id,
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    if (movements.length === 0) continue;

    const totalRemoved = movements
      .filter((m) => m.type === "REMOVAL")
      .reduce((sum, m) => sum + m.quantity, 0);
    const totalAdded = movements
      .filter((m) => m.type === "ADDITION")
      .reduce((sum, m) => sum + m.quantity, 0);

    const expectedStock = movements[0].previousStock + totalAdded - totalRemoved;
    const variance = ((item.currentStock - expectedStock) / expectedStock) * 100;

    if (Math.abs(variance) > 10) {
      anomalies.push({
        type: "INVENTORY_SHRINKAGE",
        severity: variance < -10 ? "HIGH" : "MEDIUM",
        riskScore: Math.min(1, Math.abs(variance) / 100),
        description: `Stock variance of ${variance.toFixed(1)}% for ${item.name} (expected: ${expectedStock.toFixed(0)}, actual: ${item.currentStock})`,
        details: {
          inventoryItemId: item.id,
          expectedStock: Math.round(expectedStock),
          actualStock: item.currentStock,
          variancePercent: parseFloat(variance.toFixed(1)),
        },
        evidence: { period: "30 days" },
      });
    }
  }

  return anomalies;
}

async function checkSuspiciousWastage(): Promise<DetectedAnomaly[]> {
  const anomalies: DetectedAnomaly[] = [];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const items = await db.inventoryItem.findMany({
    where: { isActive: true },
  });

  for (const item of items) {
    const spoilageEvents = await db.spoilageEvent.findMany({
      where: {
        inventoryItemId: item.id,
        createdAt: { gte: thirtyDaysAgo },
      },
      orderBy: { createdAt: "desc" },
    });

    if (spoilageEvents.length < 2) continue;

    const totalWastage = spoilageEvents.reduce((sum, e) => sum + e.quantity, 0);
    const avgMovement = await getAvgMovement(item.id);

    if (avgMovement > 0 && totalWastage > avgMovement * 2) {
      anomalies.push({
        type: "SUSPICIOUS_WASTAGE",
        severity: "MEDIUM",
        riskScore: Math.min(1, (totalWastage / avgMovement - 1) / 2),
        description: `Wastage spike for ${item.name}: ${totalWastage.toFixed(0)} units (2x normal usage)`,
        details: {
          inventoryItemId: item.id,
          totalWastage: Math.round(totalWastage),
          normalUsage: Math.round(avgMovement),
          events: spoilageEvents.length,
        },
        evidence: { period: "30 days" },
      });
    }
  }

  return anomalies;
}

async function checkShiftVariance(): Promise<DetectedAnomaly[]> {
  const anomalies: DetectedAnomaly[] = [];

  const shifts = await db.shift.findMany({
    where: { endTime: { not: null } },
    include: { employee: true },
    orderBy: { endTime: "desc" },
    take: 14,
  });

  const shiftRevenue: { [key: string]: { revenue: number; covers: number }[] } = {};

  for (const shift of shifts) {
    const key = shift.employee.id;
    if (!shiftRevenue[key]) shiftRevenue[key] = [];

    const orders = await db.orderTicket.findMany({
      where: {
        employeeId: shift.employeeId,
        createdAt: { gte: shift.startTime as Date, lte: shift.endTime as Date },
      },
    });

    const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const covers = orders.length;

    if (covers > 0) {
      shiftRevenue[key].push({ revenue, covers });
    }
  }

  for (const [employeeId, shifts] of Object.entries(shiftRevenue)) {
    if (shifts.length < 2) continue;

    const revenuePerCover = shifts.map((s) => (s.covers > 0 ? s.revenue / s.covers : 0));
    const avgRevenue = revenuePerCover.reduce((a, b) => a + b) / revenuePerCover.length;

    for (const shift of shifts) {
      if (shift.covers === 0) continue;
      const variance = ((shift.revenue / shift.covers - avgRevenue) / avgRevenue) * 100;

      if (Math.abs(variance) > 30) {
        const employee = await db.employee.findUnique({
          where: { id: employeeId },
        });

        anomalies.push({
          type: "SHIFT_VARIANCE",
          severity: "LOW",
          riskScore: Math.abs(variance) / 100,
          employeeId,
          description: `Revenue per cover variance of ${variance.toFixed(1)}% for ${employee?.firstName} ${employee?.lastName}`,
          details: {
            employeeId,
            expectedRpc: Math.round(avgRevenue),
            actualRpc: Math.round(shift.revenue / shift.covers),
            covers: shift.covers,
          },
          evidence: { recentShifts: shifts.length },
        });
      }
    }
  }

  return anomalies;
}

async function checkAfterHoursEdit(): Promise<DetectedAnomaly[]> {
  const anomalies: DetectedAnomaly[] = [];
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

  const recentEdits = await db.orderTicket.findMany({
    where: {
      updatedAt: { gte: threeDaysAgo },
      createdAt: { lt: threeDaysAgo },
    },
    include: { employee: true },
  });

  for (const order of recentEdits) {
    const hour = order.updatedAt.getHours();
    if (hour >= 23 || hour < 6) {
      anomalies.push({
        type: "AFTER_HOURS_EDIT",
        severity: "LOW",
        riskScore: 0.3,
        employeeId: order.employeeId || undefined,
        description: `Order ${order.ticketNumber} modified at ${order.updatedAt.toLocaleTimeString()} (after hours)`,
        details: { orderId: order.id, modifiedAt: order.updatedAt },
        evidence: { originalCreated: order.createdAt },
      });
    }
  }

  return anomalies;
}

async function checkSupplierMismatch(): Promise<DetectedAnomaly[]> {
  const anomalies: DetectedAnomaly[] = [];

  const deliveries = await db.delivery.findMany({
    where: { receivedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    include: { purchaseOrder: { include: { items: true } } },
  });

  for (const delivery of deliveries) {
    if (!delivery.purchaseOrder) continue;

    for (const poItem of delivery.purchaseOrder.items) {
      const variance = ((poItem.receivedQty - poItem.quantity) / poItem.quantity) * 100;

      if (Math.abs(variance) > 15) {
        anomalies.push({
          type: "SUPPLIER_MISMATCH",
          severity: variance > 15 ? "MEDIUM" : "LOW",
          riskScore: Math.abs(variance) / 100,
          description: `Delivery variance of ${variance.toFixed(1)}% for PO ${delivery.purchaseOrder.orderNumber}`,
          details: {
            poId: delivery.purchaseOrder.id,
            ordered: poItem.quantity,
            received: poItem.receivedQty,
            variancePercent: Math.round(variance),
          },
          evidence: { deliveryDate: delivery.receivedAt },
        });
      }
    }
  }

  return anomalies;
}

async function getAvgMovement(inventoryItemId: string): Promise<number> {
  const movements = await db.stockMovement.findMany({
    where: {
      inventoryItemId,
      type: "REMOVAL",
      createdAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  });

  if (movements.length === 0) return 0;
  return movements.reduce((sum, m) => sum + m.quantity, 0) / 30;
}
