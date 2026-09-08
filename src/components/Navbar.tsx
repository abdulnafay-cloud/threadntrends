"use client";

import { useCart } from "@/lib/cartStore";
import { useHydrated } from "@/lib/useHydrated";
import { useWishlist } from "@/lib/wishlistStore";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { label: "New in", href: "/products" },
  { label: "Men", href: "/products?category=men" },
  { label: "Women", href: "/products?category=women" },
  { label: "Accessories", href: "/products?category=accessories" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Contact", href: "/contact" },
];

function CountBadge({ count }: { count: number }) {
  return count > 0 ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-[#f2f0ea] bg-[#b6ff39] px-0.5 text-[9px] font-black text-[#11110f]">{count}</motion.span> : null;
}

export default function Navbar() {
  const pathname = usePathname();
  const { items } = useCart();
  const { items: wishItems } = useWishlist();
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 18));
  const itemCount = hydrated ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const wishCount = hydrated ? wishItems.length : 0;

  return (
    <>
      <motion.nav initial={{ y: -84, opacity: 0 }} animate={{ y: 0, opacity: 1, height: scrolled ? 68 : 76 }} transition={{ y: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.5 }, height: { duration: 0.28 } }} className={`fixed inset-x-0 top-0 z-50 flex items-center border-b px-4 transition-colors duration-300 sm:px-6 md:px-8 ${scrolled ? "border-[#11110f]/10 bg-[#f2f0ea]/94 shadow-[0_8px_35px_rgba(17,17,15,0.08)] backdrop-blur-2xl" : "border-[#11110f]/10 bg-[#f2f0ea]/86 backdrop-blur-xl"}`}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} whileHover={{ y: -2, scale: 1.015 }} transition={{ delay: 0.2, type: "spring", stiffness: 350, damping: 22 }}>
            <Link href="/" onClick={() => setOpen(false)} className="block font-manrope text-[15px] font-extrabold uppercase leading-none tracking-[0.17em] text-center sm:text-[18px] sm:tracking-[0.19em]">Thread n Trends<span className="mt-1 block text-[6px] font-medium tracking-[0.38em] sm:text-[7px] sm:tracking-[0.47em]">Wear your frequency</span></Link>
          </motion.div>

          <div className="hidden items-center gap-6 md:flex">
            {menuItems.map((item, index) => {
              const active = pathname === item.href;
              return <motion.div key={item.label} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -2 }} transition={{ delay: 0.25 + index * 0.065, duration: 0.42 }}><Link href={item.href} className="group relative block overflow-hidden rounded-full px-2.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.09em]"><motion.span className="absolute inset-0 -z-10 rounded-full bg-[#b6ff39]" initial={false} animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }} transition={{ type: "spring", stiffness: 380, damping: 28 }} /><span className="relative transition-opacity group-hover:opacity-55">{item.label}</span><span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#11110f] transition-all duration-300 group-hover:w-3/4" /></Link></motion.div>;
            })}
          </div>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.48, duration: 0.5 }} className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <Link href="/search" aria-label="Search products" className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#11110f]/14 transition hover:-translate-y-0.5 hover:bg-[#11110f] hover:text-white sm:flex"><Search className="h-4 w-4" /></Link>
            <Link href="/account" aria-label="Your account" className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#11110f]/14 transition hover:-translate-y-0.5 hover:bg-[#11110f] hover:text-white sm:flex"><User className="h-4 w-4" /></Link>
            <Link href="/wishlist" aria-label="Your wishlist" className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#11110f]/14 transition hover:-translate-y-0.5 hover:bg-[#11110f] hover:text-white"><Heart className="h-4 w-4" /><CountBadge count={wishCount} /></Link>
            <Link href="/cart" aria-label="Your shopping cart" className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#11110f]/14 transition hover:-translate-y-0.5 hover:bg-[#11110f] hover:text-white"><ShoppingCart className="h-4 w-4" /><CountBadge count={itemCount} /></Link>
            <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#11110f] text-white md:hidden">{open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
          </motion.div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && <>
          <motion.button aria-label="Close menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-[#11110f]/35 backdrop-blur-sm md:hidden" />
          <motion.aside initial={{ opacity: 0, y: -28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }} transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }} className="fixed left-3 right-3 top-[76px] z-50 overflow-hidden rounded-[26px] bg-[#11110f] p-5 text-white shadow-[0_28px_80px_rgba(0,0,0,0.35)] md:hidden">
            <div className="space-y-1">
              {menuItems.map((item, index) => <motion.div key={item.label} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 + index * 0.045 }}><Link href={item.href} onClick={() => setOpen(false)} className="group flex items-center justify-between rounded-2xl px-4 py-3.5 font-manrope text-2xl font-bold tracking-[-0.04em] transition hover:bg-white/8"><span><span className="mr-3 text-[9px] font-bold tracking-[0.14em] text-[#777]">0{index + 1}</span>{item.label}</span><span className="text-[#b6ff39] transition-transform group-hover:rotate-45">↗</span></Link></motion.div>)}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/10 pt-5"><Link href="/search" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-[9px] font-extrabold uppercase tracking-[0.1em]"><Search className="h-4 w-4" /> Search</Link><Link href="/account" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-full bg-[#b6ff39] py-3 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#11110f]"><User className="h-4 w-4" /> Account</Link></div>
          </motion.aside>
        </>}
      </AnimatePresence>
    </>
  );
}
