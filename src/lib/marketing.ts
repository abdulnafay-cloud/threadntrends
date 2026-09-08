import "server-only";

export async function sendMarketingEmail(to: string[], subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MARKETING_FROM_EMAIL;
  if (!apiKey || !from || to.length === 0) return { sent: false, reason: "not-configured" };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
  return { sent: true };
}

export function isAuthorized(request: Request, secret: string | undefined) {
  return Boolean(secret && request.headers.get("authorization") === `Bearer ${secret}`);
}
