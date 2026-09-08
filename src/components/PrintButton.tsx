'use client';
export default function PrintButton(){return <button onClick={()=>window.print()} className="rounded-full border border-black/15 px-5 py-3 text-xs font-bold uppercase">Print invoice</button>;}
