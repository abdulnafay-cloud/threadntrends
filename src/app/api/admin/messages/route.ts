import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { database, ensureAuthSchema } from '@/lib/db';
export async function GET() { try { await requireAdmin(); await ensureAuthSchema(); const r = await database.query(`SELECT * FROM tnt_contact_messages ORDER BY created_at DESC`); return NextResponse.json(r.rows); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); } }
export async function PATCH(request: Request) { try { await requireAdmin(); await ensureAuthSchema(); const { id, status } = await request.json(); await database.query(`UPDATE tnt_contact_messages SET status = $1 WHERE id = $2`, [status, id]); return NextResponse.json({ success: true }); } catch { return NextResponse.json({ error: 'Unable to update message' }, { status: 400 }); } }
