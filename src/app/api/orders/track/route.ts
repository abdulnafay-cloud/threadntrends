import { normalizeEmail } from "@/lib/auth";
import { database, ensureAuthSchema } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as { reference?: unknown; email?: unknown };
  const reference = typeof body.reference === "string" ? body.reference.trim().toUpperCase() : "";
  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  if (!reference || !/^\S+@\S+\.\S+$/.test(email)) return Response.json({ error: "Enter your order reference and checkout email." }, { status: 400 });
  await ensureAuthSchema();
  const result = await database.query(
    `SELECT order_reference AS reference, status, total, created_at AS "createdAt", city FROM tnt_orders WHERE order_reference = $1 AND email = $2 LIMIT 1`,
    [reference, email]
  );
  if (!result.rows[0]) return Response.json({ error: "No matching order was found." }, { status: 404 });
  return Response.json({ order: result.rows[0] });
}
