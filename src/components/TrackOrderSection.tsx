import Link from 'next/link';
import { ArrowUpRight, PackageSearch } from 'lucide-react';

export default function TrackOrderSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[28px] bg-[#11110f] p-7 text-white sm:flex-row sm:items-center sm:p-10">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#b6ff39] text-[#11110f]"><PackageSearch className="h-5 w-5" /></span>
          <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#b6ff39]">Order support</p><h2 className="mt-2 font-manrope text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Where is your order?</h2><p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">Enter your order reference and checkout email to see the latest delivery status.</p></div>
        </div>
        <Link href="/track" className="flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#11110f] transition hover:-translate-y-0.5 hover:bg-[#b6ff39]">Track order <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
