"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";

const groups = [
  { title: "Shop", links: [["New arrivals", "/products"], ["Menswear", "/products?category=men"], ["Womenswear", "/products?category=women"], ["Objects", "/products?category=accessories"]] },
  { title: "Client care", links: [["Track order", "/track"], ["Contact studio", "/contact"], ["Size guide", "/size-guide"], ["Returns & exchanges", "/returns"], ["Shipping", "/shipping"]] },
  { title: "The brand", links: [["About", "/about"], ["Journal", "/lookbook"], ["Careers", "/careers"], ["FAQ", "/faq"]] },
];

export default function Footer() {
  const [message, setMessage] = useState("");
  const [joining, setJoining] = useState(false);
  async function join(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setJoining(true); const form = event.currentTarget; const email = String(new FormData(form).get("email") || ""); try { const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); const result = await response.json(); setMessage(response.ok ? result.message : result.error); if (response.ok) form.reset(); } catch { setMessage("We could not save your email right now."); } finally { setJoining(false); } }
  return <footer className="bg-[#292421] px-4 pb-6 pt-16 text-[#f3efeb] sm:px-7 sm:pt-24 lg:px-10">
    <div className="mx-auto max-w-[1440px]">
      <div className="grid gap-14 border-b border-white/15 pb-14 lg:grid-cols-[1.1fr_.9fr]">
        <div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c98a66]">Stay in the loop</p><h2 className="mt-5 max-w-2xl font-playfair text-[clamp(46px,6vw,88px)] leading-[0.8] tracking-[-0.07em]">Good clothes.<br /><i>Better days.</i></h2><p className="mt-6 max-w-md text-sm leading-7 text-[#d8d0c8]">Notes from the studio, new pieces, and the occasional good reason to dress up.</p>
          <form onSubmit={join} className="mt-8 flex max-w-lg border-b border-white/35"><input name="email" type="email" required aria-label="Your email address" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-[#d8d0c8]/65" /><button disabled={joining} className="flex items-center gap-2 px-1 text-[10px] font-bold uppercase tracking-[0.12em] transition hover:text-[#c98a66] disabled:opacity-50">{joining ? "Joining" : "Subscribe"}<ArrowUpRight size={15} /></button></form>{message && <p className="mt-3 text-xs text-[#c98a66]">{message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-x-7 gap-y-10 sm:grid-cols-3 lg:pt-8">{groups.map((group) => <div key={group.title}><p className="mb-4 text-[9px] font-bold uppercase tracking-[0.18em] text-[#c98a66]">{group.title}</p>{group.links.map(([label, href]) => <Link key={href} href={href} className="block py-1.5 text-sm text-[#d8d0c8] transition hover:translate-x-1 hover:text-white">{label}</Link>)}</div>)}</div>
      </div>
      <div className="flex flex-col justify-between gap-6 py-7 sm:flex-row sm:items-end"><Link href="/" className="font-playfair text-4xl italic tracking-[-0.06em] sm:text-5xl">Thread <b className="font-manrope text-[.72em] not-italic">n</b> Trends</Link><div className="flex gap-5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#d8d0c8]"><a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/"} target="_blank" rel="noreferrer" className="hover:text-[#c98a66]">Instagram</a><a href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/"} target="_blank" rel="noreferrer" className="hover:text-[#c98a66]">Facebook</a><Link href="/privacy" className="hover:text-[#c98a66]">Privacy</Link><Link href="/terms" className="hover:text-[#c98a66]">Terms</Link></div></div>
      <p className="border-t border-white/10 py-4 text-[8px] font-bold uppercase tracking-[0.16em] text-[#d8d0c8]/55">© 2026 Thread n Trends · Designed in Pakistan</p>
    </div>
  </footer>;
}
