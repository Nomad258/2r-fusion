import { db } from "./db";
import { AlertType, AnomalySeverity } from "./constants";

interface CreateAlertParams {
  type: AlertType;
  severity: AnomalySeverity;
  title: string;
  message: string;
  data?: Record<string, any>;
  userId?: string;
}

/**
 * Create an alert in the system
 */
export async function createAlert({
  type,
  severity,
  title,
  message,
  data,
  userId,
}: CreateAlertParams): Promise<string> {
  try {
    const alert = await db.alert.create({
      data: {
        type,
        severity,
        title,
        message,
        data: data ? JSON.stringify(data) : null,
        userId,
        isRead: false,
        createdAt: new Date(),
      },
    });

    return alert.id;
  } catch (error) {
    console.error("Failed to create alert:", error);
    throw error;
  }
}

/**
 * Mark an alert as read
 */
export async function markAlertAsRead(alertId: string): Promise<void> {
  try {
    await db.alert.update({
      where: { id: alertId },
      data: { isRead: true },
    });
  } catch (error) {
    console.error("Failed to mark alert as read:", error);
    throw error;
  }
}

/**
 * Get unread alerts for a user
 */
export async function getUnreadAlerts(userId?: string) {
  try {
    return await db.alert.findMany({
      where: {
        isRead: false,
        ...(userId && { userId }),
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch (error) {
    console.error("Failed to fetch unread alerts:", error);
    throw error;
  }
}

/**
 * Get alert count for a user
 */
export async function getAlertCount(userId?: string): Promise<number> {
  try {
    return await db.alert.count({
      where: {
        isRead: false,
        ...(userId && { userId }),
      },
    });
  } catch (error) {
    console.error("Failed to count alerts:", error);
    return 0;
  }
}
