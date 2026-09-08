import "server-only";
import { database, ensureAuthSchema } from "./db";
import type { Product } from "./product-types";

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: Number(row.id), name: String(row.name), slug: String(row.slug), price: Number(row.price),
    oldPrice: row.old_price == null ? undefined : Number(row.old_price), category: String(row.category),
    sub: row.sub == null ? undefined : String(row.sub), description: String(row.description), image: String(row.image),
    image2: row.image2 == null ? undefined : String(row.image2), sizes: Array.isArray(row.sizes) ? row.sizes.map(String) : [],
    colors: Array.isArray(row.colors) ? row.colors.map(String) : [], stock: Number(row.total_stock) || 0,
    badge: row.badge == null ? undefined : String(row.badge),
    isActive: row.is_active !== false,
  };
}

const productQuery =
  "SELECT p.*, json_agg(DISTINCT v.size) FILTER (WHERE v.size IS NOT NULL) AS sizes,\n" +
  "  json_agg(DISTINCT v.color) FILTER (WHERE v.color IS NOT NULL) AS colors,\n" +
  "  COALESCE(SUM(v.stock), 0) AS total_stock\n" +
  "FROM tnt_products p LEFT JOIN tnt_product_variants v ON p.id = v.product_id";

export async function getProducts(): Promise<Product[]> {
  await ensureAuthSchema();
  const result = await database.query(productQuery + " WHERE p.is_active = true GROUP BY p.id ORDER BY p.created_at DESC");
  return result.rows.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureAuthSchema();
  const result = await database.query(productQuery + " WHERE p.is_active = true AND p.slug = $1 GROUP BY p.id LIMIT 1", [slug]);
  return result.rows[0] ? mapProduct(result.rows[0]) : null;
}

export async function getProductById(id: number): Promise<Product | null> {
  await ensureAuthSchema();
  const result = await database.query(productQuery + " WHERE p.is_active = true AND p.id = $1 GROUP BY p.id LIMIT 1", [id]);
  return result.rows[0] ? mapProduct(result.rows[0]) : null;
}
