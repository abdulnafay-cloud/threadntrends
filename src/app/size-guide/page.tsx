import { ArrowLeft, Info, Ruler } from "lucide-react";
import Link from "next/link";

const sizeRows = [
  { size: "S", chest: "86–91", waist: "71–76", hips: "89–94" },
  { size: "M", chest: "92–97", waist: "77–82", hips: "95–100" },
  { size: "L", chest: "98–103", waist: "83–88", hips: "101–106" },
  { size: "XL", chest: "104–110", waist: "89–95", hips: "107–113" },
];

export default function SizeGuidePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <Link href="/products" className="flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] hover:opacity-60">
        <ArrowLeft className="h-4 w-4" /> Back to shopping
      </Link>

      <div className="mt-9 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#79776f]">Fit reference / centimetres</p>
          <h1 className="mt-2 font-manrope text-6xl font-bold leading-[0.88] tracking-[-0.06em] sm:text-8xl">
            Find your <em className="font-playfair font-semibold text-[#ff5e48]">fit.</em>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#79776f]">
            Measure close to the body over light clothing. If you sit between two sizes, choose the smaller size for a closer fit or the larger size for a relaxed fit.
          </p>

          <div className="mt-8 rounded-[26px] bg-[#11110f] p-6 text-white">
            <Ruler className="h-7 w-7 text-[#b6ff39]" />
            <h2 className="mt-5 font-manrope text-2xl font-bold">How to measure</h2>
            <ol className="mt-4 space-y-4 text-sm leading-relaxed text-[#aaa]">
              <li><strong className="text-white">01 / Chest</strong><br />Measure around the fullest part, keeping the tape level.</li>
              <li><strong className="text-white">02 / Waist</strong><br />Measure around your natural waist without pulling tight.</li>
              <li><strong className="text-white">03 / Hips</strong><br />Stand with feet together and measure the fullest point.</li>
            </ol>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-[28px] border border-[#11110f]/10 bg-[#f8f6f0] shadow-[0_20px_60px_rgba(17,17,15,0.07)]">
            <div className="flex items-center justify-between border-b border-[#11110f]/10 px-5 py-5 sm:px-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#79776f]">Clothing</p>
                <h2 className="font-manrope text-2xl font-bold">Body measurements</h2>
              </div>
              <span className="rounded-full bg-[#b6ff39] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.08em]">Unisex guide</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left">
                <thead>
                  <tr className="bg-[#e4e0d8]/60 text-[10px] uppercase tracking-[0.1em] text-[#79776f]">
                    <th className="px-5 py-4 sm:px-7">Size</th>
                    <th className="px-5 py-4">Chest</th>
                    <th className="px-5 py-4">Waist</th>
                    <th className="px-5 py-4 sm:px-7">Hips</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeRows.map((row) => (
                    <tr key={row.size} className="border-t border-[#11110f]/8">
                      <td className="px-5 py-5 font-manrope text-xl font-extrabold sm:px-7">{row.size}</td>
                      <td className="px-5 py-5 text-sm">{row.chest} cm</td>
                      <td className="px-5 py-5 text-sm">{row.waist} cm</td>
                      <td className="px-5 py-5 text-sm sm:px-7">{row.hips} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-[#11110f]/10 bg-[#f8f6f0] p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#79776f]">Trousers</p>
              <h3 className="mt-2 font-manrope text-xl font-bold">Choose by waist</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#79776f]">Use your waist measurement first. Relaxed and wide-leg styles already include ease through the hip.</p>
            </div>
            <div className="rounded-[24px] border border-[#11110f]/10 bg-[#f8f6f0] p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#79776f]">Accessories</p>
              <h3 className="mt-2 font-manrope text-xl font-bold">One size</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#79776f]">Bags and watches marked “One” are supplied in one adjustable or universal size.</p>
            </div>
          </div>

          <div className="flex gap-3 rounded-[22px] bg-[#b6ff39] p-5 text-sm leading-relaxed">
            <Info className="mt-0.5 h-5 w-5 flex-none" />
            <p><strong>Still unsure?</strong> Choose the more relaxed size or contact us before ordering. Measurements may vary by 1–2 cm.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
