import { requireAdmin } from '@/lib/admin-auth';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
export const runtime = 'nodejs';
export async function POST(request: Request) { try { await requireAdmin(); const form = await request.formData(); const file = form.get('file'); if (!(file instanceof File) || !file.type.startsWith('image/')) return Response.json({ error: 'Choose an image file.' }, { status: 400 }); if (file.size > 5 * 1024 * 1024) return Response.json({ error: 'Images must be under 5MB.' }, { status: 400 }); const ext = (file.name.split('.').pop() || 'jpg').replace(/[^a-z0-9]/gi, '').toLowerCase() || 'jpg'; const dir = path.join(process.cwd(), 'public', 'uploads'); await mkdir(dir, { recursive: true }); const name = `${randomUUID()}.${ext}`; await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer())); return Response.json({ url: `/uploads/${name}` }); } catch { return Response.json({ error: 'Upload failed.' }, { status: 500 }); } }
