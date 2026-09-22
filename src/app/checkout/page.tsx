"use client";

import { useCart } from "@/lib/cartStore";
import { ArrowLeft, Check, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useHydrated } from "@/lib/useHydrated";

const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-[#292421]/12 bg-white px-4 text-sm outline-none transition placeholder:text-[#a49b94] focus:border-[#292421] focus:ring-2 focus:ring-[#a56a4b]/50";

export default function CheckoutPage() {
  const { items, clearCart, discountCode, discountPercent } = useCart();
  const [orderReference, setOrderReference] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const hydrated = useHydrated();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountPercent / 100);
  const total = subtotal - discount;

  async function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true); setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form);
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, discountCode, items: items.map(item => ({ id: item.id, quantity: item.quantity, size: item.selectedSize, color: item.selectedColor })) }) });
      const data = await response.json();
      if (!response.ok) { setError(data.error ?? "Could not place your order."); return; }
      setOrderReference(data.reference); setOrderTotal(data.total); clearCart(); window.scrollTo({ top: 0, behavior: "smooth" });
    } catch { setError("Could not reach the server. Please try again."); } finally { setSubmitting(false); }
  }

  if (!hydrated) return <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div className="h-[600px] animate-pulse rounded-[32px] bg-[#d8d0c8]/70" /></section>;

  if (orderReference) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <div className="rounded-[32px] border border-[#292421]/10 bg-[#f3efeb] px-6 py-14 shadow-[0_24px_70px_rgba(17,17,15,0.08)] sm:px-14">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#a56a4b]">
            <PackageCheck className="h-9 w-9" />
          </span>
          <p className="mt-8 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6f6964]">Order confirmed</p>
          <h1 className="mt-2 font-manrope text-5xl font-bold leading-[0.92] tracking-[-0.055em] sm:text-6xl">
            Your order is <em className="font-playfair font-semibold text-[#7f5539]">in motion.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-[#6f6964]">
            Thank you for shopping Thread n Trends. Your Cash on Delivery order reference is{" "}
            <strong className="text-[#292421]">{orderReference}</strong>. We will contact you before dispatch.
          </p>
          <p className="mt-3 font-manrope text-2xl font-bold">{formatPrice(orderTotal)}</p>
          <Link href="/track" className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.08em] underline underline-offset-4">Track this order</Link>
          <Link
            href="/products"
            className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-[#292421] px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-[#342e2b]"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <div className="rounded-[30px] border border-[#292421]/10 bg-[#f3efeb] p-10">
          <h1 className="font-manrope text-4xl font-bold tracking-[-0.04em]">Your bag is empty.</h1>
          <p className="mt-3 text-sm text-[#6f6964]">Add something you love before heading to checkout.</p>
          <Link href="/products" className="mt-7 inline-flex rounded-full bg-[#292421] px-7 py-4 text-xs font-bold uppercase tracking-[0.08em] text-white">
            Shop the collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <Link href="/cart" className="mb-8 flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] hover:opacity-60">
        <ArrowLeft className="h-4 w-4" /> Back to bag
      </Link>

      <div className="mb-10">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6f6964]">Secure checkout</p>
        <h1 className="mt-2 font-manrope text-5xl font-bold leading-none tracking-[-0.055em] sm:text-7xl">
          Almost <em className="font-playfair font-semibold text-[#7f5539]">yours.</em>
        </h1>
      </div>

      <form onSubmit={placeOrder} className="grid items-start gap-8 lg:grid-cols-[1fr_390px]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-[#292421]/10 bg-[#f3efeb] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#6f6964]">Step 01</p>
                <h2 className="mt-1 font-manrope text-2xl font-bold tracking-[-0.035em]">Contact details</h2>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a56a4b] text-sm font-bold">1</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold">Full name<input className={fieldClass} name="name" autoComplete="name" placeholder="Your full name" required /></label>
              <label className="text-xs font-bold">Phone number<input className={fieldClass} name="phone" autoComplete="tel" type="tel" placeholder="03XX XXXXXXX" required /></label>
              <label className="text-xs font-bold sm:col-span-2">Email address<input className={fieldClass} name="email" autoComplete="email" type="email" placeholder="you@example.com" required /></label>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#292421]/10 bg-[#f3efeb] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#6f6964]">Step 02</p>
                <h2 className="mt-1 font-manrope text-2xl font-bold tracking-[-0.035em]">Delivery address</h2>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a56a4b] text-sm font-bold">2</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold sm:col-span-2">Street address<input className={fieldClass} name="address" autoComplete="street-address" placeholder="House, street and area" required /></label>
              <label className="text-xs font-bold">City<input className={fieldClass} name="city" autoComplete="address-level2" placeholder="City" required /></label>
              <label className="text-xs font-bold">Postal code<input className={fieldClass} name="postalCode" autoComplete="postal-code" placeholder="Postal code" required /></label>
              <label className="text-xs font-bold sm:col-span-2">Delivery notes <span className="font-normal text-[#6f6964]">(optional)</span><textarea className="mt-2 min-h-24 w-full resize-none rounded-xl border border-[#292421]/12 bg-white p-4 text-sm outline-none transition placeholder:text-[#a49b94] focus:border-[#292421] focus:ring-2 focus:ring-[#a56a4b]/50" name="notes" placeholder="Landmark or delivery instructions" /></label>
            </div>
          </div>

          <div className="rounded-[28px] border-2 border-[#292421] bg-[#a56a4b] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#292421] text-white"><Check className="h-4 w-4" /></span>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em]">Payment method</p>
                <h2 className="mt-1 font-manrope text-2xl font-bold tracking-[-0.035em]">Cash on Delivery</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#30302c]">Pay in cash when your order arrives. We will confirm your phone number before dispatch.</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="sticky top-[96px] overflow-hidden rounded-[28px] bg-[#292421] text-white shadow-[0_24px_70px_rgba(17,17,15,0.2)]">
          <div className="p-6 sm:p-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#756c65]">Your order</p>
            <div className="mt-6 max-h-72 space-y-4 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                  <div className="relative h-16 w-14 flex-none overflow-hidden rounded-lg bg-[#393330]">
                    <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{item.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[#8c837c]">{item.selectedSize} / {item.selectedColor} / Qty {item.quantity}</p>
                    <p className="mt-1 text-xs font-bold text-[#a56a4b]">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3 border-y border-white/15 py-5 text-sm text-[#b5aca5]">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-[#a56a4b]"><span>{discountCode}</span><span>−{formatPrice(discount)}</span></div>}
              <div className="flex justify-between"><span>Delivery</span><span className="font-bold text-[#a56a4b]">Free</span></div>
            </div>
            <div className="flex items-end justify-between py-6">
              <span className="text-sm text-[#b5aca5]">Total</span>
              <span className="font-manrope text-3xl font-extrabold tracking-[-0.04em]">{formatPrice(total)}</span>
            </div>
            {error && <p role="alert" className="mb-4 rounded-xl bg-[#7f5539]/15 p-3 text-xs text-[#ffb5aa]">{error}</p>}
            <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#a56a4b] px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#292421] transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-wait disabled:opacity-60">
              {submitting ? "Placing order…" : "Place COD order"} {!submitting && <PackageCheck className="h-4 w-4" />}
            </button>
            <div className="mt-5 grid grid-cols-2 gap-3 text-[9px] uppercase tracking-[0.06em] text-[#8c837c]">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#a56a4b]" /> Private details</span>
              <span className="flex items-center justify-end gap-1.5"><Truck className="h-4 w-4 text-[#a56a4b]" /> Free delivery</span>
            </div>
          </div>
        </aside>
      </form>
    </section>
  );
}
