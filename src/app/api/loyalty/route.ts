import { getCurrentUser } from "@/lib/auth";
import { database, ensureAuthSchema } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Sign in to view rewards." }, { status: 401 });
  await ensureAuthSchema();
  const result = await database.query<{ points: number; referralCode: string }>(
    `SELECT points, referral_code AS "referralCode" FROM tnt_loyalty WHERE user_id = $1`, [user.id]
  );
  return Response.json({ rewards: result.rows[0] ?? null });
}
