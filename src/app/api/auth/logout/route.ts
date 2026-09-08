import { clearSessionCookie, hashSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { database, ensureAuthSchema } from "@/lib/db";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST() {
  try {
    await ensureAuthSchema();
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (token) {
      await database.query("DELETE FROM tnt_sessions WHERE token_hash = $1", [
        hashSessionToken(token),
      ]);
    }
  } catch (error) {
    console.error("Logout session cleanup failed:", error);
  }

  await clearSessionCookie();
  return Response.json({ success: true });
}
