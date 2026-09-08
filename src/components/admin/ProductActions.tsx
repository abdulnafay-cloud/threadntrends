'use client';
import { useRouter } from 'next/navigation';
export default function ProductActions({id}:{id:number}){const router=useRouter();async function remove(){if(!confirm('Delete this product?'))return;const r=await fetch(`/api/admin/products/${id}`,{method:'DELETE'});if(r.ok)router.refresh();else alert('Unable to delete product');}return <button onClick={remove} className="text-red-600">Delete</button>;}
