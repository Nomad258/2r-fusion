import { db } from "./db";

interface LogAuditParams {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
  notes?: string;
}

/**
 * Log an audit entry for tracking user actions
 */
export async function logAudit({
  userId,
  action,
  entityType,
  entityId,
  oldValue,
  newValue,
  notes,
}: LogAuditParams): Promise<void> {
  try {
    await db.auditLog.create({
      data: {
        userId,
        action,
        entityType,
        entityId,
        oldValue: oldValue ? JSON.stringify(oldValue) : null,
        newValue: newValue ? JSON.stringify(newValue) : null,
        notes,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Failed to log audit entry:", error);
    // Don't throw - audit logging failures shouldn't break the main operation
  }
}
