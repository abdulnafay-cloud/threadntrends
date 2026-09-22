import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function TrackOrderSection() {
  return <section className="bg-[#f3efeb] px-4 py-14 sm:px-7 sm:py-20 lg:px-10"><div className="mx-auto grid max-w-[1440px] overflow-hidden border border-[#292421]/18 md:grid-cols-[.78fr_1.22fr]"><div className="bg-[#393330] p-8 text-[#f3efeb] sm:p-11"><p className="text-[9px] font-bold uppercase tracking-[.19em] text-[#c98a66]">Client care</p><h2 className="mt-5 font-playfair text-5xl italic leading-[.8] tracking-[-.06em]">Already<br />on its way?</h2></div><div className="flex flex-col justify-between p-8 sm:p-11"><p className="max-w-xl text-base leading-7 text-[#6f6964]">Use your order number and checkout email to see the newest delivery update, any time you need it.</p><Link href="/track" className="mt-10 flex items-center justify-between border-b border-[#292421] pb-3 text-[10px] font-bold uppercase tracking-[.15em] transition hover:text-[#a56a4b]">Track your order <ArrowUpRight size={17} /></Link></div></div></section>;
}
