"use client";

import { useCart } from "@/lib/cartStore";
import { useHydrated } from "@/lib/useHydrated";
import { useWishlist } from "@/lib/wishlistStore";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { label: "New arrivals", href: "/products" },
  { label: "Menswear", href: "/products?category=men" },
  { label: "Womenswear", href: "/products?category=women" },
  { label: "Objects", href: "/products?category=accessories" },
  { label: "Journal", href: "/lookbook" },
];

function Counter({ count }: { count: number }) {
  return count ? <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#a56a4b] px-1 text-[8px] font-black text-[#f3efeb]">{count}</span> : null;
}

export default function Navbar() {
  const pathname = usePathname();
  const { items } = useCart();
  const { items: saved } = useWishlist();
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 28));
  const cartCount = hydrated ? items.reduce((total, item) => total + item.quantity, 0) : 0;
  const savedCount = hydrated ? saved.length : 0;

  return <>
    <motion.header initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} style={{ backgroundColor: scrolled ? "rgba(243, 239, 235, 0.95)" : "rgba(41, 36, 33, 0.92)", color: scrolled ? "#292421" : "#f3efeb" }} className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 backdrop-blur-xl ${scrolled ? "border-[#292421]/12 shadow-[0_12px_36px_rgba(41,36,33,0.09)]" : "border-white/10"}`}>
      <div className="mx-auto grid h-[74px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-7 lg:px-10">
        <div className="hidden items-center gap-5 md:flex">
          {menuItems.slice(0, 3).map((item) => <Link key={item.href} href={item.href} className={`relative text-[10px] font-bold uppercase tracking-[0.14em] transition hover:opacity-60 ${pathname === item.href ? "after:absolute after:-bottom-3 after:left-0 after:h-px after:w-full after:bg-current" : ""}`}>{item.label}</Link>)}
        </div>
        <Link href="/" onClick={() => setOpen(false)} className="group text-center leading-none">
          <span className="block font-playfair text-[26px] italic tracking-[-0.06em] sm:text-[30px]">Thread <b className="font-manrope not-italic">n</b> Trends</span>
          <span className="mt-1 block text-[7px] font-bold uppercase tracking-[0.42em] opacity-55">Independent wardrobe</span>
        </Link>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link href="/search" aria-label="Search" className="nav-icon hidden sm:grid"><Search size={17} /></Link>
          <Link href="/account" aria-label="Account" className="nav-icon hidden sm:grid"><UserRound size={17} /></Link>
          <Link href="/wishlist" aria-label="Wishlist" className="nav-icon relative grid"><Heart size={17} /><Counter count={savedCount} /></Link>
          <Link href="/cart" aria-label="Cart" className="nav-icon relative grid"><ShoppingBag size={17} /><Counter count={cartCount} /></Link>
          <button onClick={() => setOpen(!open)} className="nav-icon grid md:hidden" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
    </motion.header>
    <AnimatePresence>{open && <>
      <motion.button aria-label="Close menu" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#292421]/55 backdrop-blur-sm" />
      <motion.nav initial={{ opacity: 0, y: -22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-x-3 top-[86px] z-50 overflow-hidden rounded-[2px] bg-[#f3efeb] p-7 text-[#292421] shadow-[0_28px_90px_rgba(0,0,0,0.3)]">
        <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#a56a4b]">Navigate</p>
        <div className="divide-y divide-[#292421]/10 border-y border-[#292421]/10">{menuItems.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 font-playfair text-3xl italic"><span><small className="mr-3 font-manrope text-[9px] not-italic tracking-widest text-[#6f6964]">0{index + 1}</small>{item.label}</span><ArrowUpRight size={19} /></Link>)}</div>
        <Link href="/contact" onClick={() => setOpen(false)} className="mt-5 flex items-center justify-between text-sm font-bold">Contact the studio <ArrowUpRight size={17} /></Link>
      </motion.nav>
    </>}</AnimatePresence>
  </>;
}
