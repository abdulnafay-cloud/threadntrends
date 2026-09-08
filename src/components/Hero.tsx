"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -85]);
  const fade = useTransform(scrollYProgress, [0, 0.88], [1, 0.2]);

  return (
    <section ref={heroRef} className="relative isolate min-h-[calc(100svh-76px)] overflow-hidden bg-[#11110f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(182,255,57,0.18),transparent_27%),radial-gradient(circle_at_8%_86%,rgba(255,94,72,0.13),transparent_24%)]" />
      <div className="absolute inset-0 opacity-35 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[56px_56px]" />
      <motion.div aria-hidden="true" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} className="absolute -left-24 top-16 h-72 w-72 rounded-full border border-white/10 border-dashed" />

      <div className="relative mx-auto grid min-h-[calc(100svh-76px)] max-w-[1500px] items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-12">
        <motion.div style={reduceMotion ? undefined : { y: copyY, opacity: fade }} className="relative z-20 max-w-4xl pt-3 lg:pt-0">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08, ease }} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] backdrop-blur-md"><span className="h-1.5 w-1.5 rounded-full bg-[#b6ff39] shadow-[0_0_14px_#b6ff39]" /> Drop 01 / 2026</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">Made for movement</span>
          </motion.div>

          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 55, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, delay: 0.18, ease }} className="mt-7 font-manrope text-[clamp(58px,7.9vw,126px)] font-semibold uppercase leading-[0.78] tracking-[-0.075em]">
            Dress beyond<br /><span className="inline-flex items-baseline gap-[0.08em]"><em className="font-playfair font-semibold normal-case text-[#b6ff39]">the expected.</em><Sparkles className="hidden h-[0.32em] w-[0.32em] text-[#ff5e48] sm:block" /></span>
          </motion.h1>

          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.52, ease }} className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Link href="/products" className="group flex w-fit items-center gap-3 rounded-full bg-[#b6ff39] px-6 py-4 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#11110f] transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_45px_rgba(182,255,57,0.2)]">Shop the new drop <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" /></Link>
            <p className="max-w-md text-sm leading-6 text-white/58">Elevated essentials, relaxed tailoring and sharp accessories for people whose style refuses to stand still.</p>
          </motion.div>

          <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.78 }} className="mt-10 flex items-center gap-7 border-t border-white/12 pt-5 text-[9px] font-bold uppercase tracking-[0.13em] text-white/45 sm:gap-12"><span><strong className="mr-2 font-manrope text-lg text-white">08</strong>New pieces</span><span><strong className="mr-2 font-manrope text-lg text-white">Free</strong>Delivery</span><Link href="/lookbook" className="hidden items-center gap-2 text-[#b6ff39] hover:text-white sm:flex">View lookbook <ArrowUpRight className="h-3.5 w-3.5" /></Link></motion.div>
        </motion.div>

        <motion.div style={reduceMotion ? undefined : { y: visualY }} initial={reduceMotion ? false : { opacity: 0, x: 45, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1.05, delay: 0.28, ease }} className="relative z-10 mx-auto hidden w-full max-w-[620px] lg:block">
          <div className="relative ml-auto aspect-[0.78] w-[82%] overflow-hidden rounded-[34px] bg-[#292925] shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
            <Image src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=90" alt="Thread n Trends fashion editorial" fill priority sizes="(max-width: 1024px) 0px, 45vw" className="object-cover saturate-[0.72] contrast-[1.05] transition-transform duration-[1600ms] hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/5" />
            <div className="absolute bottom-6 left-6 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/75">Midnight study<br /><span className="text-[#b6ff39]">Look 03</span></div>
          </div>

          <motion.div animate={reduceMotion ? undefined : { y: [0, -10, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-2 top-[17%] w-48 rounded-[22px] border border-white/15 bg-[#f2f0ea] p-3 text-[#11110f] shadow-2xl">
            <div className="relative aspect-[1.35] overflow-hidden rounded-[14px]"><Image src="https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=500&q=85" alt="Midnight Utility Shirt" fill sizes="192px" className="object-cover" /></div>
            <div className="mt-3 flex items-end justify-between gap-2"><div><p className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-[#79776f]">Featured piece</p><p className="mt-1 text-xs font-bold">Utility Shirt</p></div><Link href="/products/midnight-utility-shirt" aria-label="View Midnight Utility Shirt" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#11110f] text-white"><ArrowUpRight className="h-4 w-4" /></Link></div>
          </motion.div>

          <motion.div animate={reduceMotion ? undefined : { rotate: [0, 5, 0], y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-1 bottom-[13%] rounded-2xl border border-white/15 bg-[#b6ff39] px-5 py-4 text-[#11110f] shadow-xl"><p className="text-[8px] font-extrabold uppercase tracking-[0.13em]">Limited drop</p><p className="mt-1 font-manrope text-2xl font-extrabold tracking-[-0.05em]">Wear the shift.</p></motion.div>
        </motion.div>
      </div>

      <motion.a href="#trending" aria-label="Scroll to trending products" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-6 right-6 z-20 hidden items-center gap-2 text-[8px] font-extrabold uppercase tracking-[0.15em] text-white/45 hover:text-[#b6ff39] lg:flex">Scroll to explore <ArrowDownRight className="h-4 w-4" /></motion.a>
    </section>
  );
}
