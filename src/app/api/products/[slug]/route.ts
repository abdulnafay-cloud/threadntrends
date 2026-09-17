import { getProductBySlug } from '@/lib/db-products';
export async function GET(_: Request,{params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=await getProductBySlug(slug);if(!product)return Response.json({error:'Not found'},{status:404});return Response.json(product);}
