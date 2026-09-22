"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(localStorage.getItem("tnt-analytics-consent") === null), []);
  function choose(value: "yes" | "no") { localStorage.setItem("tnt-analytics-consent", value); window.dispatchEvent(new Event("tnt-consent")); setVisible(false); }
  if (!visible) return null;
  return <aside className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl rounded-[22px] border border-white/10 bg-[#292421] p-5 text-white shadow-2xl"><p className="font-manrope text-lg font-bold">Your privacy, your choice.</p><p className="mt-2 text-xs leading-5 text-[#a49b94]">Essential storage keeps your bag working. Optional analytics and advertising tags only load if you accept. Read our <Link href="/privacy" className="text-white underline">privacy policy</Link>.</p><div className="mt-4 flex gap-2"><button onClick={() => choose("yes")} className="rounded-full bg-[#a56a4b] px-5 py-3 text-[10px] font-extrabold uppercase text-[#292421]">Accept optional</button><button onClick={() => choose("no")} className="rounded-full border border-white/20 px-5 py-3 text-[10px] font-extrabold uppercase">Essential only</button></div></aside>;
}
