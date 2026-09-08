import { normalizeEmail } from "@/lib/auth";
import { database, ensureAuthSchema } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown };
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 320) {
      return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    await ensureAuthSchema();
    await database.query(
      `INSERT INTO tnt_newsletter_subscribers (email) VALUES ($1)
       ON CONFLICT (email) DO UPDATE SET status = 'active', subscribed_at = NOW()`,
      [email]
    );
    return Response.json({ message: "You are on the list for new drops." }, { status: 201 });
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return Response.json({ error: "Could not save your subscription." }, { status: 500 });
  }
}
