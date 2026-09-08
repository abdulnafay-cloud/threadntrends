import {
  createSession,
  findUserByEmail,
  hashPassword,
  normalizeEmail,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";
import { ensureAuthSchema } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password || password.length > 128) {
      return Response.json({ error: "Enter your email and password." }, { status: 400 });
    }

    await ensureAuthSchema();
    const user = await findUserByEmail(email);

    if (!user) {
      // Hash to avoid timing attacks
      await hashPassword(password);
      return Response.json({ error: "Email or password is incorrect." }, { status: 401 });
    }

    const passwordMatches = await verifyPassword(password, user.password_hash);
    if (!passwordMatches) {
      return Response.json({ error: "Email or password is incorrect." }, { status: 401 });
    }

    const token = await createSession(user.id);
    await setSessionCookie(token);

    // Include the role in the response
    return Response.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // <-- added
      },
    });
  } catch (error) {
    console.error("Login failed:", error);
    return Response.json({ error: "Unable to sign in right now." }, { status: 500 });
  }
}