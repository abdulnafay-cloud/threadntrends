"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [{ href: "/admin", label: "Overview", no: "01" }, { href: "/admin/orders", label: "Orders", no: "02" }, { href: "/admin/products", label: "Products", no: "03" }, { href: "/admin/customers", label: "Customers", no: "04" }, { href: "/admin/messages", label: "Messages", no: "05" }, { href: "/admin/discounts", label: "Discounts", no: "06" }, { href: "/admin/newsletter", label: "Newsletter", no: "07" }];

export default function AdminSidebar() {
  const pathname = usePathname();
  async function logout() { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/"; }
  return <aside className="hidden min-h-screen w-[252px] shrink-0 flex-col bg-[#292421] p-5 text-[#f3efeb] lg:flex">
    <Link href="/admin" className="border-b border-white/15 pb-7"><p className="font-playfair text-3xl italic tracking-[-0.06em]">Thread <b className="font-manrope text-[.7em] not-italic">n</b> Trends</p><p className="mt-2 text-[8px] font-bold uppercase tracking-[0.22em] text-[#d8d0c8]">Store management</p></Link>
    <nav className="mt-9 space-y-1">{navItems.map((item) => <Link key={item.href} href={item.href} className={cn("group flex items-center justify-between border-l py-3 pl-3 text-sm transition", pathname === item.href ? "border-[#a56a4b] bg-white/[.06] font-bold text-white" : "border-transparent text-[#d8d0c8] hover:border-[#a56a4b] hover:bg-white/[.04] hover:text-white")}><span><small className="mr-3 text-[8px] font-bold tracking-widest text-[#a56a4b]">{item.no}</small>{item.label}</span><span className="pr-3 text-[#a56a4b] opacity-0 transition group-hover:opacity-100">↗</span></Link>)}</nav>
    <div className="mt-auto border-t border-white/15 pt-5"><Link href="/" className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#d8d0c8] hover:text-white">View storefront ↗</Link><button onClick={logout} className="mt-5 flex items-center gap-2 text-sm text-[#d8d0c8] transition hover:text-[#c98a66]"><LogOut size={16} /> Sign out</button></div>
  </aside>;
}
