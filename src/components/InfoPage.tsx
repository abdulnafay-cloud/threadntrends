import Link from "next/link";

export type InfoSection = { title: string; body: string };

export default function InfoPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: InfoSection[] }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="rounded-[32px] bg-[#11110f] px-7 py-12 text-white sm:px-12">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#b6ff39]">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-manrope text-5xl font-bold leading-[0.92] tracking-[-0.055em] sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-[#aaa]">{intro}</p>
      </div>
      <div className="mt-8 grid gap-4">
        {sections.map((section) => (
          <article key={section.title} className="rounded-[24px] border border-[#11110f]/10 bg-[#f8f6f0] p-6 sm:p-8">
            <h2 className="font-manrope text-2xl font-bold tracking-[-0.035em]">{section.title}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#68665f]">{section.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-[#68665f]">Need help? <Link href="/contact" className="font-bold text-[#11110f] underline underline-offset-4">Contact our team</Link>.</p>
    </section>
  );
}
