"use client";

import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/lib/cartStore";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Thread<span className="text-indigo-600">&</span>Trends
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
            <Link href="/products" className="hover:text-indigo-600 transition">Shop</Link>
            <Link href="/about" className="hover:text-indigo-600 transition">About</Link>
            <Link href="/contact" className="hover:text-indigo-600 transition">Contact</Link>
          </div>

          {/* Cart & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="hover:text-indigo-600">Home</Link>
              <Link href="/products" className="hover:text-indigo-600">Shop</Link>
              <Link href="/about" className="hover:text-indigo-600">About</Link>
              <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}