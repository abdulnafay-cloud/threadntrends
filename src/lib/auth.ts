import "server-only";

import { createHash, randomBytes, randomUUID, scrypt, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { database, ensureAuthSchema } from "./db";

export const SESSION_COOKIE = "tnt_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';  // <-- added
};

type UserWithPassword = AuthUser & {
  password_hash: string;
};

function scryptAsync(password: string, salt: string) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function validateCredentials(name: string, email: string, password: string) {
  if (name.trim().length < 2 || name.trim().length > 100) {
    return "Name must be between 2 and 100 characters.";
  }
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 320) {
    return "Enter a valid email address.";
  }
  if (password.length < 8 || password.length > 128) {
    return "Password must be between 8 and 128 characters.";
  }
  return null;
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [salt, keyHex] = storedHash.split(":");
  if (!salt || !keyHex) return false;
  const storedKey = Buffer.from(keyHex, "hex");
  const derivedKey = await scryptAsync(password, salt);
  return storedKey.length === derivedKey.length && timingSafeEqual(storedKey, derivedKey);
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);

  await database.query(
    "INSERT INTO tnt_sessions (token_hash, user_id, expires_at) VALUES ($1, $2, $3)",
    [tokenHash, userId, expiresAt]
  );

  return token;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
    priority: "high",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  await ensureAuthSchema();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const result = await database.query<AuthUser>(
    `SELECT u.id, u.name, u.email, u.role
     FROM tnt_sessions s
     JOIN tnt_users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > NOW()
     LIMIT 1`,
    [hashSessionToken(token)]
  );

  return result.rows[0] ?? null;
}

// New helper to get admin user (throws if not admin)
export async function getAdminUser(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function findUserByEmail(email: string) {
  const result = await database.query<UserWithPassword>(
    "SELECT id, name, email, password_hash, role FROM tnt_users WHERE email = $1 LIMIT 1",
    [normalizeEmail(email)]
  );
  return result.rows[0] ?? null;
}

export function createUserId() {
  return randomUUID();
}