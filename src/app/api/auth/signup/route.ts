import {
  createSession,
  createUserId,
  hashPassword,
  normalizeEmail,
  setSessionCookie,
  validateCredentials,
} from "@/lib/auth";
import { database, ensureAuthSchema } from "@/lib/db";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const password = typeof body.password === "string" ? body.password : "";
    const referralCode = typeof body.referralCode === "string" ? body.referralCode.trim().toUpperCase() : "";
    const validationError = validateCredentials(name, email, password);

    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    await ensureAuthSchema();
    const id = createUserId();
    const passwordHash = await hashPassword(password);

    const referrer = referralCode
      ? await database.query<{ user_id: string }>("SELECT user_id FROM tnt_loyalty WHERE referral_code = $1 LIMIT 1", [referralCode])
      : null;
    const ownCode = `TNT${randomBytes(4).toString("hex").toUpperCase()}`;
    const client = await database.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        "INSERT INTO tnt_users (id, name, email, password_hash, role) VALUES ($1, $2, $3, $4, 'customer')",
        [id, name, email, passwordHash]
      );
      await client.query(
        "INSERT INTO tnt_loyalty (user_id, referral_code, referred_by) VALUES ($1, $2, $3)",
        [id, ownCode, referrer?.rows[0]?.user_id ?? null]
      );
      if (referrer?.rows[0]) {
        await client.query(
          "UPDATE tnt_loyalty SET points = points + 100, updated_at = NOW() WHERE user_id = $1",
          [referrer.rows[0].user_id]
        );
      }
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }

    const token = await createSession(id);
    await setSessionCookie(token);

    // Return user with role
    return Response.json(
      {
        user: {
          id,
          name,
          email,
          role: 'customer', // <-- added
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return Response.json({ error: "An account with this email already exists." }, { status: 409 });
    }
    console.error("Signup failed:", error);
    return Response.json({ error: "Unable to create your account right now." }, { status: 500 });
  }
}