import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton — PgBouncer-safe for Supabase.
 *
 * Production: Supabase connection pooler (transaction mode, port 6543).
 * DATABASE_URL must include ?pgbouncer=true to disable prepared statements.
 * DIRECT_URL is used only by prisma migrate / prisma db push — bypasses pooler.
 *
 * Supabase project: trdjdbtcvdkutxdfvuqi (eu-west-1)
 * Dashboard: https://supabase.com/dashboard/project/trdjdbtcvdkutxdfvuqi
 */

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
