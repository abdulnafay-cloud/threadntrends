import { getCurrentUser } from "@/lib/auth";
import { database, ensureAuthSchema } from "@/lib/db";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ saved: false }, { status: 401 });
  const body = (await request.json()) as { items?: unknown };
  const items = Array.isArray(body.items) ? body.items.slice(0, 50) : [];
  await ensureAuthSchema();
  if (items.length === 0) {
    await database.query("DELETE FROM tnt_abandoned_carts WHERE user_id = $1", [user.id]);
    return Response.json({ saved: true });
  }
  await database.query(
    `INSERT INTO tnt_abandoned_carts (user_id, email, items) VALUES ($1,$2,$3)
     ON CONFLICT (user_id) DO UPDATE SET items = EXCLUDED.items, email = EXCLUDED.email, updated_at = NOW(), reminder_sent_at = NULL`,
    [user.id, user.email, JSON.stringify(items)]
  );
  return Response.json({ saved: true });
}
