import Link from "next/link";

export type InfoSection = { title: string; body: string };

export default function InfoPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: InfoSection[] }) {
  return <main className="pt-[74px]">
    <section className="bg-[#292421] px-4 py-16 text-[#f3efeb] sm:px-7 sm:py-24 lg:px-10"><div className="mx-auto max-w-[1440px]"><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c98a66]">{eyebrow}</p><div className="mt-5 grid gap-8 md:grid-cols-[1.2fr_.8fr] md:items-end"><h1 className="max-w-4xl font-playfair text-[clamp(58px,9vw,128px)] leading-[0.73] tracking-[-0.08em]">{title}</h1><p className="max-w-md text-sm leading-7 text-[#d8d0c8]">{intro}</p></div></div></section>
    <section className="px-4 py-12 sm:px-7 sm:py-20 lg:px-10"><div className="mx-auto max-w-5xl">{sections.map((section, index) => <article key={section.title} className="grid gap-4 border-t border-[#292421]/16 py-8 sm:grid-cols-[130px_1fr] sm:gap-8 sm:py-11"><p className="font-playfair text-3xl italic text-[#a56a4b]">0{index + 1}</p><div><h2 className="font-manrope text-2xl font-bold tracking-[-0.04em] sm:text-3xl">{section.title}</h2><p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-7 text-[#6f6964]">{section.body}</p></div></article>)}</div></section>
    <section className="mx-4 mb-12 bg-[#a56a4b] px-7 py-9 text-[#292421] sm:mx-7 sm:px-10 lg:mx-10"><div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-6"><p className="font-playfair text-3xl italic sm:text-4xl">Need a hand? We&apos;re here.</p><Link href="/contact" className="editorial-button bg-[#292421] text-[#f3efeb]">Contact the studio</Link></div></section>
  </main>;
}
