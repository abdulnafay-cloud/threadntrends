"use client";
import { useCart } from "@/lib/cartStore";
import { useEffect } from "react";
import { useHydrated } from "@/lib/useHydrated";
export default function CartRecovery() {
  const items = useCart((state) => state.items);
  const hydrated = useHydrated();
  useEffect(() => {
    if (!hydrated) return;
    const timer = window.setTimeout(() => {
      fetch("/api/cart/abandon", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items }) }).catch(() => undefined);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [hydrated, items]);
  return null;
}
