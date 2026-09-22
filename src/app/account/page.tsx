"use client";

import { ArrowRight, Check, Copy, Gift, LockKeyhole, LogOut, Package, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import CustomerOrders from "@/components/CustomerOrders";

type User = {
  id: string;
  name: string;
  email: string;
  role?: "customer" | "admin"; // <-- added role
};
type Rewards = { points: number; referralCode: string };

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-[#292421]/12 bg-white px-4 text-sm outline-none transition placeholder:text-[#a49b94] focus:border-[#292421] focus:ring-2 focus:ring-[#a56a4b]/50";

export default function AccountPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [rewards, setRewards] = useState<Rewards | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { user?: User | null }) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!user) { setRewards(null); return; }
    fetch("/api/loyalty", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setRewards(data.rewards ?? null))
      .catch(() => setRewards(null));
  }, [user]);

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      referralCode: String(formData.get("referralCode") ?? ""),
    };

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { user?: User; error?: string };
      if (!response.ok || !data.user) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      // Send administrators straight to the management console before rendering
      // the customer account view. A full navigation also refreshes the admin
      // layout/server session cleanly.
      if (data.user.role === "admin") {
        window.location.replace("/admin");
        return;
      }
      setUser(data.user);
      // For regular customers, stay on the account page (the UI will show their account)
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function logout() {
    setSubmitting(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setSubmitting(false);
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="h-[520px] animate-pulse rounded-[32px] bg-[#d8d0c8]" />
      </section>
    );
  }

  if (user) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="overflow-hidden rounded-2xl border border-[#292421]/10 bg-[#f3efeb] shadow-[0_18px_50px_rgba(17,17,15,0.08)]">
          <div className="grid md:grid-cols-[0.75fr_1.25fr]">
            <div className="bg-[#292421] p-7 text-white sm:p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#a56a4b] text-[#292421]">
                <UserRound className="h-6 w-6" />
              </span>
              <p className="mt-8 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#756c65]">Member account</p>
              <h1 className="mt-2 font-manrope text-3xl font-bold leading-tight tracking-[-0.04em]">
                Welcome back, <em className="font-playfair font-semibold text-[#a56a4b]">{user.name.split(" ")[0]}.</em>
              </h1>
              <p className="mt-4 break-all text-sm text-[#999]">{user.email}</p>
              <button
                type="button"
                onClick={logout}
                disabled={submitting}
                className="mt-8 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#a49b94] hover:text-white disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>

            <div className="p-7 sm:p-8">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6f6964]">Your space</p>
              <h2 className="mt-2 font-manrope text-2xl font-bold tracking-[-0.035em]">Everything in one place.</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] bg-[#a56a4b] p-6 sm:col-span-2">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#292421] text-white">
                        <Gift className="h-5 w-5"/>
                      </span>
                      <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.12em]">TNT Rewards</p>
                      <p className="font-manrope text-4xl font-extrabold tracking-[-0.05em]">{rewards?.points ?? 0} points</p>
                    </div>
                    {rewards && (
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(rewards.referralCode)}
                        className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] font-extrabold uppercase"
                      >
                        <Copy className="h-4 w-4"/> Refer: {rewards.referralCode}
                      </button>
                    )}
                  </div>
                  <p className="mt-4 text-xs text-[#3e4c1f]">
                    Earn 1 point per PKR 100 spent. You started with 50 points; a successful referral gives you 100 more.
                  </p>
                </div>
                <Link href="/wishlist" className="group rounded-[24px] border border-[#292421]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a56a4b]">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-manrope text-xl font-bold">Saved pieces</h3>
                  <p className="mt-2 text-sm text-[#6f6964]">Return to everything you added to your wishlist.</p>
                  <span className="mt-5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em]">
                    View wishlist <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link href="/products" className="group rounded-[24px] border border-[#292421]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8d0c8]">
                    <Package className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-manrope text-xl font-bold">Latest collection</h3>
                  <p className="mt-2 text-sm text-[#6f6964]">Discover new pieces and continue building your selection.</p>
                  <span className="mt-5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em]">
                    Start shopping <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
              <CustomerOrders />
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#292421]/10 bg-white p-5"><div><p className="font-semibold">Need help with an order?</p><p className="mt-1 text-sm text-[#6f6964]">Our support team can help with delivery, exchanges, or returns.</p></div><Link href="/contact" className="rounded-full bg-[#292421] px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-white">Message support <ArrowRight className="ml-1 inline h-3 w-3" /></Link></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="overflow-hidden rounded-[32px] border border-[#292421]/10 bg-[#f3efeb] shadow-[0_24px_70px_rgba(17,17,15,0.09)]">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden min-h-[610px] overflow-hidden bg-[#292421] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[48px_48px]" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a56a4b] text-[#292421]">
                <LockKeyhole className="h-5 w-5" />
              </span>
            </div>
            <div className="relative">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#756c65]">Thread n Trends members</p>
              <h1 className="mt-3 font-manrope text-6xl font-bold leading-[0.86] tracking-[-0.06em]">
                Your style,<br /><em className="font-playfair font-semibold text-[#a56a4b]">remembered.</em>
              </h1>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#999]">
                Create an account to keep your identity connected to every future Thread n Trends experience.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-14">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6f6964]">
              {mode === "login" ? "Welcome back" : "Join the frequency"}
            </p>
            <h2 className="mt-2 font-manrope text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
              {mode === "login" ? "Sign in." : "Create account."}
            </h2>
            <p className="mt-3 text-sm text-[#6f6964]">
              {mode === "login" ? "Enter your details to access your account." : "A name, email and secure password are all you need."}
            </p>

            <div className="mt-7 grid grid-cols-2 rounded-full bg-[#d8d0c8] p-1">
              {(["login", "signup"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setMode(option);
                    setError("");
                  }}
                  className={`rounded-full px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.09em] transition ${
                    mode === option ? "bg-[#292421] text-white shadow-lg" : "text-[#6f6964]"
                  }`}
                >
                  {option === "login" ? "Log in" : "Sign up"}
                </button>
              ))}
            </div>

            <form onSubmit={submitAuth} className="mt-7 space-y-4">
              {mode === "signup" && (
                <>
                  <label className="block text-xs font-bold">
                    Full name
                    <input className={inputClass} name="name" autoComplete="name" minLength={2} maxLength={100} placeholder="Your full name" required />
                  </label>
                  <label className="block text-xs font-bold">
                    Referral code <span className="font-normal text-[#6f6964]">(optional)</span>
                    <input className={inputClass} name="referralCode" maxLength={24} placeholder="TNT…" />
                  </label>
                </>
              )}
              <label className="block text-xs font-bold">
                Email address
                <input className={inputClass} name="email" autoComplete="email" type="email" maxLength={320} placeholder="you@example.com" required />
              </label>
              <label className="block text-xs font-bold">
                Password
                <input className={inputClass} name="password" autoComplete={mode === "login" ? "current-password" : "new-password"} type="password" minLength={8} maxLength={128} placeholder={mode === "login" ? "Your password" : "At least 8 characters"} required />
              </label>

              {error && (
                <p role="alert" className="rounded-xl bg-[#7f5539]/10 px-4 py-3 text-sm font-medium text-[#b62f20]">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#a56a4b] px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.08em] transition hover:-translate-y-0.5 hover:bg-[#292421] hover:text-white disabled:cursor-wait disabled:opacity-60"
              >
                {submitting ? "Please wait..." : mode === "login" ? "Log in" : "Create account"} {!submitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] text-[#6f6964]">
              <ShieldCheck className="h-4 w-4" /> Passwords are salted and securely hashed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
