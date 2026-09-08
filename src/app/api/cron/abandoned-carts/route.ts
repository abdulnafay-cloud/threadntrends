import { database, ensureAuthSchema } from "@/lib/db";
import { isAuthorized, sendMarketingEmail } from "@/lib/marketing";

export async function POST(request: Request) {
  if (!isAuthorized(request, process.env.CRON_SECRET)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  await ensureAuthSchema();
  const result = await database.query<{ user_id: string; email: string }>(
    `SELECT user_id, email FROM tnt_abandoned_carts
     WHERE updated_at < NOW() - INTERVAL '2 hours' AND reminder_sent_at IS NULL LIMIT 100`
  );
  let sent = 0;
  for (const cart of result.rows) {
    const delivery = await sendMarketingEmail([cart.email], "Still thinking it over?", `<h1>Your Thread n Trends edit is waiting.</h1><p>Come back to your bag before your favourite pieces move on.</p><p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3500"}/cart">Return to your bag</a></p>`);
    if (delivery.sent) {
      await database.query("UPDATE tnt_abandoned_carts SET reminder_sent_at = NOW() WHERE user_id = $1", [cart.user_id]);
      sent++;
    }
  }
  return Response.json({ eligible: result.rowCount, sent, configured: Boolean(process.env.RESEND_API_KEY && process.env.MARKETING_FROM_EMAIL) });
}
