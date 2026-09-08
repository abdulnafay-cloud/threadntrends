import "server-only";

import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const globalForDatabase = globalThis as unknown as {
  threadNTrendsPool?: Pool;
  threadNTrendsSchema?: Promise<void>;
  threadNTrendsSchemaVersion?: number;
};

// Increment SCHEMA_VERSION to 4
const SCHEMA_VERSION = 5;

export const database =
  globalForDatabase.threadNTrendsPool ??
  new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.threadNTrendsPool = database;
}

export function ensureAuthSchema() {
  if (globalForDatabase.threadNTrendsSchemaVersion !== SCHEMA_VERSION) {
    globalForDatabase.threadNTrendsSchema = undefined;
    globalForDatabase.threadNTrendsSchemaVersion = SCHEMA_VERSION;
  }
  if (!globalForDatabase.threadNTrendsSchema) {
    globalForDatabase.threadNTrendsSchema = (async () => {
      // ---------- Existing tables (keep as is) ----------
      await database.query(`
        CREATE TABLE IF NOT EXISTS tnt_users (
          id UUID PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(320) NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      // Add role column to users if not exists
      await database.query(`
        ALTER TABLE tnt_users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'customer'
      `);

      await database.query(`
        CREATE TABLE IF NOT EXISTS tnt_sessions (
          token_hash CHAR(64) PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES tnt_users(id) ON DELETE CASCADE,
          expires_at TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      await database.query(`
        CREATE TABLE IF NOT EXISTS tnt_newsletter_subscribers (
          email VARCHAR(320) PRIMARY KEY,
          status VARCHAR(20) NOT NULL DEFAULT 'active',
          source VARCHAR(50) NOT NULL DEFAULT 'website',
          subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      await database.query(`
        CREATE TABLE IF NOT EXISTS tnt_contact_messages (
          id UUID PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(320) NOT NULL,
          subject VARCHAR(140) NOT NULL,
          message TEXT NOT NULL,
          status VARCHAR(20) NOT NULL DEFAULT 'new',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      await database.query(`
        CREATE TABLE IF NOT EXISTS tnt_loyalty (
          user_id UUID PRIMARY KEY REFERENCES tnt_users(id) ON DELETE CASCADE,
          points INTEGER NOT NULL DEFAULT 50 CHECK (points >= 0),
          referral_code VARCHAR(24) NOT NULL UNIQUE,
          referred_by UUID REFERENCES tnt_users(id) ON DELETE SET NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      await database.query(`
        INSERT INTO tnt_loyalty (user_id, referral_code)
        SELECT id, 'TNT' || UPPER(SUBSTRING(MD5(id::text), 1, 8))
        FROM tnt_users
        ON CONFLICT (user_id) DO NOTHING
      `);

      await database.query(`
        CREATE TABLE IF NOT EXISTS tnt_orders (
          id UUID PRIMARY KEY,
          order_reference VARCHAR(24) NOT NULL UNIQUE,
          user_id UUID REFERENCES tnt_users(id) ON DELETE SET NULL,
          customer_name VARCHAR(100) NOT NULL,
          email VARCHAR(320) NOT NULL,
          phone VARCHAR(30) NOT NULL,
          address TEXT NOT NULL,
          city VARCHAR(100) NOT NULL,
          postal_code VARCHAR(30) NOT NULL,
          notes TEXT,
          status VARCHAR(30) NOT NULL DEFAULT 'confirmed',
          subtotal INTEGER NOT NULL,
          discount_code VARCHAR(40),
          discount_amount INTEGER NOT NULL DEFAULT 0,
          total INTEGER NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      await database.query(`
        CREATE TABLE IF NOT EXISTS tnt_order_items (
          id BIGSERIAL PRIMARY KEY,
          order_id UUID NOT NULL REFERENCES tnt_orders(id) ON DELETE CASCADE,
          product_id INTEGER NOT NULL,
          product_name VARCHAR(180) NOT NULL,
          unit_price INTEGER NOT NULL,
          quantity INTEGER NOT NULL CHECK (quantity > 0),
          selected_size VARCHAR(30) NOT NULL,
          selected_color VARCHAR(50) NOT NULL
        )
      `);

      await database.query(`
        CREATE TABLE IF NOT EXISTS tnt_abandoned_carts (
          user_id UUID PRIMARY KEY REFERENCES tnt_users(id) ON DELETE CASCADE,
          email VARCHAR(320) NOT NULL,
          items JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          reminder_sent_at TIMESTAMPTZ
        )
      `);

      // ---------- New tables for admin ----------
      // Products table
      await database.query(`
        CREATE TABLE IF NOT EXISTS tnt_products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(180) NOT NULL,
          slug VARCHAR(200) NOT NULL UNIQUE,
          price INTEGER NOT NULL,
          old_price INTEGER,
          category VARCHAR(100) NOT NULL,
          sub VARCHAR(100),
          description TEXT NOT NULL,
          image VARCHAR(500) NOT NULL,
          image2 VARCHAR(500),
          badge VARCHAR(50),
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      // Product variants (size + color + stock)
      await database.query(`
        CREATE TABLE IF NOT EXISTS tnt_product_variants (
          id SERIAL PRIMARY KEY,
          product_id INTEGER NOT NULL REFERENCES tnt_products(id) ON DELETE CASCADE,
          size VARCHAR(30) NOT NULL,
          color VARCHAR(50) NOT NULL,
          stock INTEGER NOT NULL DEFAULT 0,
          sku VARCHAR(100) UNIQUE,
          UNIQUE (product_id, size, color)
        )
      `);

      // Discount codes
      await database.query(`
        CREATE TABLE IF NOT EXISTS tnt_discounts (
          id SERIAL PRIMARY KEY,
          code VARCHAR(50) NOT NULL UNIQUE,
          percent INTEGER NOT NULL CHECK (percent BETWEEN 1 AND 100),
          valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          valid_until TIMESTAMPTZ,
          usage_limit INTEGER,
          used_count INTEGER NOT NULL DEFAULT 0,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await database.query(`CREATE TABLE IF NOT EXISTS tnt_reviews (id BIGSERIAL PRIMARY KEY, product_id INTEGER NOT NULL, user_id UUID REFERENCES tnt_users(id) ON DELETE CASCADE, rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5), title VARCHAR(120), body TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(product_id, user_id))`);
      await database.query(`CREATE TABLE IF NOT EXISTS tnt_saved_addresses (id BIGSERIAL PRIMARY KEY, user_id UUID NOT NULL REFERENCES tnt_users(id) ON DELETE CASCADE, label VARCHAR(40) NOT NULL, recipient VARCHAR(100) NOT NULL, phone VARCHAR(30) NOT NULL, address TEXT NOT NULL, city VARCHAR(100) NOT NULL, postal_code VARCHAR(30) NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
      await database.query(`CREATE TABLE IF NOT EXISTS tnt_restock_alerts (id BIGSERIAL PRIMARY KEY, email VARCHAR(320) NOT NULL, product_id INTEGER NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(email, product_id))`);

      // ---------- Indexes ----------
      await database.query(`
        CREATE INDEX IF NOT EXISTS tnt_sessions_user_id_idx
        ON tnt_sessions(user_id)
      `);

      await database.query(`
        CREATE INDEX IF NOT EXISTS tnt_sessions_expires_at_idx
        ON tnt_sessions(expires_at)
      `);

      await database.query(`CREATE INDEX IF NOT EXISTS tnt_orders_email_idx ON tnt_orders(email)`);
      await database.query(`CREATE INDEX IF NOT EXISTS tnt_orders_user_id_idx ON tnt_orders(user_id)`);
      await database.query(`CREATE INDEX IF NOT EXISTS tnt_abandoned_carts_updated_at_idx ON tnt_abandoned_carts(updated_at)`);

      // Product indexes
      await database.query(`CREATE INDEX IF NOT EXISTS tnt_products_slug_idx ON tnt_products(slug)`);
      await database.query(`CREATE INDEX IF NOT EXISTS tnt_product_variants_product_id_idx ON tnt_product_variants(product_id)`);

      // Clean expired sessions
      await database.query("DELETE FROM tnt_sessions WHERE expires_at <= NOW()");
    })().catch((error) => {
      globalForDatabase.threadNTrendsSchema = undefined;
      throw error;
    });
  }

  return globalForDatabase.threadNTrendsSchema;
}
