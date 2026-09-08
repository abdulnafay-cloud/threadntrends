import "server-only";
import { database, ensureAuthSchema } from "../db";

export interface ProductVariantInput {
  size: string;
  color: string;
  stock: number;
  sku?: string;
}

export interface ProductInput {
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  category: string;
  sub?: string;
  description: string;
  image: string;
  image2?: string;
  badge?: string;
  variants: ProductVariantInput[];
}

export async function createProduct(data: ProductInput): Promise<number> {
  await ensureAuthSchema();
  const client = await database.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(
      `INSERT INTO tnt_products (name, slug, price, old_price, category, sub, description, image, image2, badge)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [data.name, data.slug, data.price, data.oldPrice ?? null, data.category, data.sub ?? null, data.description, data.image, data.image2 ?? null, data.badge ?? null]
    );
    const productId = result.rows[0].id;
    for (const variant of data.variants) {
      await client.query(
        `INSERT INTO tnt_product_variants (product_id, size, color, stock, sku)
         VALUES ($1, $2, $3, $4, $5)`,
        [productId, variant.size, variant.color, variant.stock, variant.sku ?? null]
      );
    }
    await client.query('COMMIT');
    return productId;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export async function updateProduct(id: number, data: Partial<ProductInput>) {
  await ensureAuthSchema();
  // For simplicity, we'll update product basic info and replace variants (delete old, insert new)
  const client = await database.connect();
  try {
    await client.query('BEGIN');
    // Update product
    await client.query(
      `UPDATE tnt_products SET
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        price = COALESCE($3, price),
        old_price = $4,
        category = COALESCE($5, category),
        sub = $6,
        description = COALESCE($7, description),
        image = COALESCE($8, image),
        image2 = $9,
        badge = $10,
        updated_at = NOW()
       WHERE id = $11`,
      [
        data.name ?? null,
        data.slug ?? null,
        data.price ?? null,
        data.oldPrice ?? null,
        data.category ?? null,
        data.sub ?? null,
        data.description ?? null,
        data.image ?? null,
        data.image2 ?? null,
        data.badge ?? null,
        id
      ]
    );
    // If variants provided, replace them
    if (data.variants) {
      await client.query('DELETE FROM tnt_product_variants WHERE product_id = $1', [id]);
      for (const variant of data.variants) {
        await client.query(
          `INSERT INTO tnt_product_variants (product_id, size, color, stock, sku)
           VALUES ($1, $2, $3, $4, $5)`,
          [id, variant.size, variant.color, variant.stock, variant.sku ?? null]
        );
      }
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export async function deleteProduct(id: number): Promise<void> {
  await ensureAuthSchema();
  await database.query(`DELETE FROM tnt_products WHERE id = $1`, [id]);
}

export async function getProductWithVariants(id: number) {
  await ensureAuthSchema();
  const productResult = await database.query(
    `SELECT * FROM tnt_products WHERE id = $1`,
    [id]
  );
  if (productResult.rows.length === 0) return null;
  const product = productResult.rows[0];
  const variantsResult = await database.query(
    `SELECT * FROM tnt_product_variants WHERE product_id = $1 ORDER BY size, color`,
    [id]
  );
  return {
    ...product,
    variants: variantsResult.rows,
  };
}