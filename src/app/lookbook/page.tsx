import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const looks = [
  {
    number: "01",
    title: "Quiet structure",
    note: "Linen layers / warm neutrals",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=90",
    href: "/products?category=men",
    products: [{ label: "Linen Shirt", slug: "stonefall-linen-shirt", position: "left-[58%] top-[32%]" }, { label: "Linen Trouser", slug: "everyday-linen-trouser", position: "left-[48%] top-[72%]" }],
  },
  {
    number: "02",
    title: "Soft movement",
    note: "Wide silhouettes / tonal dressing",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=90",
    href: "/products?category=women",
    products: [{ label: "Wide Trouser", slug: "drift-wide-trouser", position: "left-[55%] top-[66%]" }, { label: "Sage Shirt", slug: "sage-relaxed-shirt", position: "left-[40%] top-[27%]" }],
  },
  {
    number: "03",
    title: "After dark",
    note: "Deep tones / precise details",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=90",
    href: "/products",
    products: [{ label: "Utility Shirt", slug: "midnight-utility-shirt", position: "left-[52%] top-[35%]" }, { label: "Arc Bag", slug: "arc-mini-shoulder-bag", position: "left-[65%] top-[58%]" }],
  },
];

export default function LookbookPage() {
  return (
    <div>
      <section className="relative min-h-[72vh] overflow-hidden bg-[#292421] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[56px_56px]" />
        <div className="relative mx-auto flex min-h-[62vh] max-w-7xl flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8c837c]">
            <span>Lookbook / 2026</span><span>Volume 01</span>
          </div>
          <div>
            <p className="mb-5 max-w-md text-sm leading-relaxed text-[#a49b94]">A study in movement, contrast and clothes designed for the hours between plans.</p>
            <h1 className="font-manrope text-[clamp(64px,12vw,170px)] font-bold leading-[0.72] tracking-[-0.075em] uppercase">
              Wear your<br /><em className="font-playfair font-semibold text-[#a56a4b]">frequency.</em>
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {looks.map((look, index) => (
          <article key={look.number} className={`grid overflow-hidden rounded-[30px] border border-[#292421]/10 bg-[#f3efeb] shadow-[0_20px_60px_rgba(17,17,15,0.07)] md:grid-cols-2 ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="relative min-h-[480px] overflow-hidden bg-[#d8d0c8]">
              <Image src={look.image} alt={look.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 hover:scale-[1.03]" />
              {look.products.map((product) => <Link key={product.slug} href={`/products/${product.slug}`} aria-label={`Shop ${product.label}`} className={`group absolute ${product.position} flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#a56a4b] font-bold shadow-lg transition hover:scale-110`}><span>+</span><span className="pointer-events-none absolute left-9 whitespace-nowrap rounded-full bg-[#292421] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.08em] text-white opacity-0 transition group-hover:opacity-100">{product.label}</span></Link>)}
            </div>
            <div className="flex flex-col justify-between p-8 sm:p-12">
              <span className="font-manrope text-7xl font-extrabold tracking-[-0.07em] text-[#d8d0c8]">{look.number}</span>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#6f6964]">{look.note}</p>
                <h2 className="mt-2 font-manrope text-5xl font-bold leading-[0.92] tracking-[-0.055em]">{look.title}</h2>
                <Link href={look.href} className="mt-8 flex w-fit items-center gap-2 rounded-full bg-[#292421] px-6 py-4 text-[10px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-[#a56a4b] hover:text-[#292421]">
                  Shop the look <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="bg-[#292421] px-4 py-16 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#a56a4b]">Worn by you / @threadntrends</p><div className="mt-3 flex flex-wrap items-end justify-between gap-4"><h2 className="font-manrope text-5xl font-bold tracking-[-0.055em] sm:text-7xl">The community edit.</h2><a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/"} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-5 py-3 text-[10px] font-extrabold uppercase">Follow on Instagram ↗</a></div><div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">{[
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80"
      ].map((image, index) => <div key={image} className="relative aspect-square overflow-hidden rounded-[20px]"><Image src={image} alt={`Thread n Trends community outfit ${index + 1}`} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-500 hover:scale-105"/></div>)}</div><p className="mt-5 text-xs text-[#8c837c]">Tag @threadntrends for a chance to be featured. Replace these editorial placeholders with approved customer submissions before launch.</p></div></section>
    </div>
  );
}
