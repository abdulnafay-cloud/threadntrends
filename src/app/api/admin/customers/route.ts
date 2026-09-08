import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { database, ensureAuthSchema } from '@/lib/db';
export async function GET() { try { await requireAdmin(); await ensureAuthSchema(); const r = await database.query(`SELECT id,name,email,role,created_at FROM tnt_users ORDER BY created_at DESC`); return NextResponse.json(r.rows); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); } }
