import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return Response.json({ user });
  } catch (error) {
    console.error("Session lookup failed:", error);
    return Response.json({ error: "Unable to check your session." }, { status: 500 });
  }
}
