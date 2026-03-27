import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { db } from "./db";
import { cookies } from "next/headers";

const SESSION_TOKEN_NAME = "2r-session-token";
const SESSION_EXPIRY_HOURS = 24;

/**
 * Hash a password using bcryptjs
 */
export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 12);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

/**
 * Create a session token and store in database
 */
export async function createSession(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000);

  await db.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return token;
}

/**
 * Get a session from the database and validate it
 */
export async function getSession(token: string) {
  const session = await db.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) {
    return null;
  }

  if (new Date() > session.expiresAt) {
    await db.session.delete({ where: { id: session.id } });
    return null;
  }

  return session;
}

/**
 * Get the current authenticated user from cookies
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_TOKEN_NAME)?.value;

    if (!token) {
      return null;
    }

    const session = await getSession(token);
    if (!session) {
      return null;
    }

    return session.user;
  } catch (error) {
    return null;
  }
}

/**
 * Require authentication - throws if user is not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
}

/**
 * Require a specific role - throws if user doesn't have required role
 */
export async function requireRole(requiredRoles: string[]) {
  const user = await requireAuth();

  if (!requiredRoles.includes(user.role)) {
    throw new Error(`Access denied. Required roles: ${requiredRoles.join(", ")}`);
  }

  return user;
}

/**
 * Check if a user role has access to required roles
 */
export function canAccess(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Set session token in cookies
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_EXPIRY_HOURS * 60 * 60,
  });
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_TOKEN_NAME);
}
