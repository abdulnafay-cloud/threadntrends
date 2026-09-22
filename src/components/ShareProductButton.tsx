"use client";
import { Share2 } from "lucide-react";
import { useState } from "react";
export default function ShareProductButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  async function share() { const data = { title: name, text: `See ${name} at Thread n Trends`, url: window.location.href }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } } catch { /* user cancelled */ } }
  return <button type="button" onClick={share} className="flex items-center gap-2 rounded-full border border-[#292421]/15 px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] hover:bg-[#292421] hover:text-white"><Share2 className="h-4 w-4"/>{copied ? "Link copied" : "Share"}</button>;
}
