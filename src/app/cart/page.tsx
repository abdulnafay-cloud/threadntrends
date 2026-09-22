"use client";

import { useCart } from "@/lib/cartStore";
import { ArrowLeft, ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useHydrated } from "@/lib/useHydrated";

const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, discountCode, discountPercent, applyDiscount, clearDiscount } = useCart();
  const [couponError, setCouponError] = useState("");
  const hydrated = useHydrated();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountPercent / 100);
  const total = subtotal - discount;

  function submitCoupon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = String(new FormData(event.currentTarget).get("code") ?? "");
    setCouponError(applyDiscount(code) ? "" : "Try WELCOME10 for 10% off your first order.");
  }

  if (!hydrated) return <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div className="h-[520px] animate-pulse rounded-[32px] bg-[#d8d0c8]/70" /></section>;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="overflow-hidden rounded-[32px] border border-[#292421]/10 bg-[#f3efeb] shadow-[0_24px_70px_rgba(17,17,15,0.08)]">
          <div className="grid min-h-[470px] md:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#a56a4b]">
                <ShoppingBag className="h-6 w-6" />
              </span>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6f6964]">
                Your selection
              </p>
              <h1 className="mt-2 font-manrope text-5xl font-bold leading-[0.92] tracking-[-0.055em] sm:text-6xl">
                Your bag is <em className="font-playfair font-semibold text-[#7f5539]">waiting.</em>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#6f6964]">
                Add a piece from the latest drop and it will stay here—even after you refresh the page.
              </p>
              <Link
                href="/products"
                className="mt-8 flex w-fit items-center gap-2 rounded-full bg-[#292421] px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.09em] text-white transition hover:-translate-y-0.5 hover:bg-[#342e2b]"
              >
                Explore the collection <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative hidden overflow-hidden bg-[#292421] md:block">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[42px_42px]" />
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a56a4b]/50" />
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a56a4b] shadow-[0_0_80px_rgba(165,106,75,0.35)]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6f6964]">
            Bag / {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
          <h1 className="mt-2 font-manrope text-5xl font-bold leading-none tracking-[-0.055em] sm:text-7xl">
            Your <em className="font-playfair font-semibold text-[#7f5539]">selection.</em>
          </h1>
        </div>
        <Link href="/products" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] hover:opacity-60">
          <ArrowLeft className="h-4 w-4" /> Continue shopping
        </Link>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_390px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="grid grid-cols-[92px_1fr] gap-4 rounded-[24px] border border-[#292421]/10 bg-[#f3efeb] p-3 shadow-[0_12px_40px_rgba(17,17,15,0.05)] sm:grid-cols-[140px_1fr_auto] sm:gap-6 sm:p-4"
            >
              <div className="relative aspect-[0.82] overflow-hidden rounded-[18px] bg-[#d8d0c8]">
                <Image src={item.image} alt={item.name} fill sizes="140px" className="object-cover" />
              </div>

              <div className="flex min-w-0 flex-col justify-center py-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#6f6964]">Thread n Trends</p>
                <h2 className="mt-1 font-manrope text-lg font-bold leading-tight tracking-[-0.025em] sm:text-2xl">
                  {item.name}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.08em]">
                  <span className="rounded-full border border-[#292421]/12 px-3 py-1.5">Size {item.selectedSize}</span>
                  <span className="rounded-full border border-[#292421]/12 px-3 py-1.5">{item.selectedColor}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                  className="mt-4 flex w-fit items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6f6964] transition hover:text-[#7f5539]"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>

              <div className="col-span-2 flex items-center justify-between border-t border-[#292421]/10 pt-3 sm:col-span-1 sm:flex-col sm:items-end sm:justify-between sm:border-0 sm:py-2 sm:pl-4">
                <p className="font-manrope text-lg font-extrabold sm:text-xl">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <div className="flex items-center overflow-hidden rounded-full border border-[#292421]/15 bg-white">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center transition hover:bg-[#292421] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-9 text-center text-sm font-bold">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="flex h-10 w-10 items-center justify-center transition hover:bg-[#292421] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}

          <button
            type="button"
            onClick={clearCart}
            className="px-2 pt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6f6964] underline underline-offset-4 hover:text-[#292421]"
          >
            Clear entire bag
          </button>
        </div>

        <aside className="sticky top-[96px] overflow-hidden rounded-[28px] bg-[#292421] text-white shadow-[0_24px_70px_rgba(17,17,15,0.2)]">
          <div className="p-6 sm:p-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#756c65]">Order summary</p>
            <form onSubmit={submitCoupon} className="mt-6 flex gap-2">
              <input name="code" defaultValue={discountCode} placeholder="Discount code" aria-label="Discount code" className="h-11 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 text-xs uppercase text-white outline-none placeholder:normal-case placeholder:text-[#756c65] focus:border-[#a56a4b]" />
              <button className="rounded-full border border-white/20 px-4 text-[10px] font-bold uppercase hover:border-[#a56a4b]">Apply</button>
            </form>
            {couponError && <p className="mt-2 text-xs text-[#ff8a79]">{couponError}</p>}
            {discountCode && <button type="button" onClick={clearDiscount} className="mt-2 text-[10px] text-[#a56a4b] underline">{discountCode} applied · remove</button>}
            <div className="mt-7 space-y-4 border-b border-white/15 pb-6 text-sm">
              <div className="flex justify-between text-[#b5aca5]"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-[#a56a4b]"><span>First-order discount</span><span>−{formatPrice(discount)}</span></div>}
              <div className="flex justify-between text-[#b5aca5]"><span>Delivery</span><span className="font-bold text-[#a56a4b]">Free</span></div>
            </div>
            <div className="flex items-end justify-between py-6">
              <span className="text-sm text-[#b5aca5]">Total</span>
              <span className="font-manrope text-3xl font-extrabold tracking-[-0.04em]">{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#a56a4b] px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#292421] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Proceed to checkout <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 border-t border-white/10 bg-white/[0.04] px-6 py-5 text-[10px] text-[#999] sm:px-8">
            <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-[#a56a4b]" /> Fast dispatch</span>
            <span className="flex items-center justify-end gap-2"><ShieldCheck className="h-4 w-4 text-[#a56a4b]" /> Secure details</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
