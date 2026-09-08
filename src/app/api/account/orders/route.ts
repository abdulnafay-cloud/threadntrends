import { getCurrentUser } from '@/lib/auth';
import { database, ensureAuthSchema } from '@/lib/db';
export async function GET() { const user = await getCurrentUser(); if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 }); await ensureAuthSchema(); const result = await database.query(`SELECT id, order_reference AS reference, status, total, created_at AS "createdAt", city FROM tnt_orders WHERE user_id = $1 OR (user_id IS NULL AND email = $2) ORDER BY created_at DESC LIMIT 20`, [user.id, user.email]); return Response.json({ orders: result.rows }); }
