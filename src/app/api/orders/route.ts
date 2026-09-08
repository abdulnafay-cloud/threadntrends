import { randomBytes, randomUUID } from "crypto";
import { getCurrentUser, normalizeEmail } from "@/lib/auth";
import { database, ensureAuthSchema } from "@/lib/db";
import { products } from "@/lib/products";

export const runtime = "nodejs";

type OrderItem = { id?: unknown; quantity?: unknown; size?: unknown; color?: unknown };

export async function POST(request: Request) {
  const client = await database.connect();
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const address = typeof body.address === "string" ? body.address.trim() : "";
    const city = typeof body.city === "string" ? body.city.trim() : "";
    const postalCode = typeof body.postalCode === "string" ? body.postalCode.trim() : "";
    const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 1000) : "";
    const code = typeof body.discountCode === "string" ? body.discountCode.trim().toUpperCase() : "";
    const requestedItems = Array.isArray(body.items) ? (body.items as OrderItem[]) : [];
    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || phone.length < 7 || !address || !city || !postalCode || requestedItems.length === 0) {
      return Response.json({ error: "Complete all required checkout details." }, { status: 400 });
    }

    const items = requestedItems.map((requested) => {
      const product = products.find((entry) => entry.id === Number(requested.id));
      const quantity = Math.floor(Number(requested.quantity));
      const size = String(requested.size ?? "");
      const color = String(requested.color ?? "");
      if (!product || quantity < 1 || quantity > product.stock || !product.sizes.includes(size) || !product.colors.includes(color)) throw new Error("INVALID_ITEM");
      return { product, quantity, size, color };
    });
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    await ensureAuthSchema();
    const existingOrder = await database.query("SELECT 1 FROM tnt_orders WHERE email = $1 LIMIT 1", [email]);
    if (code && code !== "WELCOME10") return Response.json({ error: "That discount code is not valid." }, { status: 400 });
    if (code === "WELCOME10" && existingOrder.rowCount) return Response.json({ error: "WELCOME10 is only for a first order." }, { status: 400 });
    const discountAmount = code === "WELCOME10" ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal - discountAmount;
    const user = await getCurrentUser();
    const id = randomUUID();
    const reference = `TNT-${new Date().getFullYear()}-${randomBytes(3).toString("hex").toUpperCase()}`;

    await client.query("BEGIN");
    await client.query(
      `INSERT INTO tnt_orders (id, order_reference, user_id, customer_name, email, phone, address, city, postal_code, notes, subtotal, discount_code, discount_amount, total)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [id, reference, user?.id ?? null, name, email, phone, address, city, postalCode, notes || null, subtotal, code || null, discountAmount, total]
    );
    for (const item of items) {
      await client.query(
        `INSERT INTO tnt_order_items (order_id, product_id, product_name, unit_price, quantity, selected_size, selected_color) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [id, item.product.id, item.product.name, item.product.price, item.quantity, item.size, item.color]
      );
    }
    if (user) {
      await client.query("UPDATE tnt_loyalty SET points = points + $1, updated_at = NOW() WHERE user_id = $2", [Math.floor(total / 100), user.id]);
      await client.query("DELETE FROM tnt_abandoned_carts WHERE user_id = $1", [user.id]);
    }
    await client.query("COMMIT");
    return Response.json({ reference, subtotal, discountAmount, total, status: "confirmed" }, { status: 201 });
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    if ((error as Error).message === "INVALID_ITEM") return Response.json({ error: "One of your items is no longer available." }, { status: 400 });
    console.error("Order creation failed:", error);
    return Response.json({ error: "Could not place your order right now." }, { status: 500 });
  } finally {
    client.release();
  }
}
