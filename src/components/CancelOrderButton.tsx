'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function CancelOrderButton({id}:{id:string}){const [busy,setBusy]=useState(false);const router=useRouter();async function cancel(){if(!confirm('Request cancellation for this order?'))return;setBusy(true);const r=await fetch(`/api/account/orders/${id}`,{method:'PATCH'});if(r.ok)router.refresh();else{const d=await r.json().catch(()=>null);alert(d?.error||'Unable to cancel order');setBusy(false);}}return <button disabled={busy} onClick={cancel} className="rounded-full bg-red-50 px-5 py-3 text-xs font-bold uppercase text-red-700 disabled:opacity-50">{busy?'Cancelling...':'Cancel order'}</button>;}
