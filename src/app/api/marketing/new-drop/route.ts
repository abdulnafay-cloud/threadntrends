import { database, ensureAuthSchema } from "@/lib/db";
import { isAuthorized, sendMarketingEmail } from "@/lib/marketing";

export async function POST(request: Request) {
  if (!isAuthorized(request, process.env.MARKETING_SECRET)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json()) as { title?: unknown; message?: unknown; url?: unknown };
  const title = typeof body.title === "string" ? body.title.slice(0, 120) : "A new drop just landed";
  const message = typeof body.message === "string" ? body.message.slice(0, 1000) : "Meet the newest Thread n Trends pieces.";
  const url = typeof body.url === "string" ? body.url : `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3500"}/products`;
  await ensureAuthSchema();
  const subscribers = await database.query<{ email: string }>("SELECT email FROM tnt_newsletter_subscribers WHERE status = 'active' LIMIT 500");
  let sent = 0;
  for (const subscriber of subscribers.rows) {
    const delivery = await sendMarketingEmail([subscriber.email], title, `<h1>${title}</h1><p>${message}</p><p><a href="${url}">Shop the drop</a></p>`);
    if (delivery.sent) sent++;
  }
  return Response.json({ subscribers: subscribers.rowCount, sent, configured: Boolean(process.env.RESEND_API_KEY && process.env.MARKETING_FROM_EMAIL) });
}
