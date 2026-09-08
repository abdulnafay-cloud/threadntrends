import { randomUUID } from "crypto";
import { normalizeEmail } from "@/lib/auth";
import { database, ensureAuthSchema } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "General enquiry";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (name.length < 2 || name.length > 100 || !/^\S+@\S+\.\S+$/.test(email) || subject.length > 140 || message.length < 10 || message.length > 5000) {
      return Response.json({ error: "Please check your details and message." }, { status: 400 });
    }
    await ensureAuthSchema();
    await database.query(
      "INSERT INTO tnt_contact_messages (id, name, email, subject, message) VALUES ($1, $2, $3, $4, $5)",
      [randomUUID(), name, email, subject || "General enquiry", message]
    );
    return Response.json({ message: "Message received. We will reply within 1–2 business days." }, { status: 201 });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return Response.json({ error: "Could not send your message right now." }, { status: 500 });
  }
}
