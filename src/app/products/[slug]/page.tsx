"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cartStore";
import { useWishlist } from "@/lib/wishlistStore";
import Toast from "@/components/Toast";
import ProductCard from "@/components/ProductCard";
import ShareProductButton from "@/components/ShareProductButton";
import { useHydrated } from "@/lib/useHydrated";
import { ArrowRight, ChevronRight, Heart, RefreshCcw, Ruler, ShoppingBag, Star, Truck } from "lucide-react";

function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = React.use(params);
  const [remoteProduct, setRemoteProduct] = useState<import('@/lib/product-types').Product | null>(null);
  const product = remoteProduct || getProduct(unwrappedParams.slug);
  useEffect(() => { fetch(`/api/products/${unwrappedParams.slug}`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(data => data && setRemoteProduct(data)).catch(() => undefined); }, [unwrappedParams.slug]);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const hydrated = useHydrated();

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [mainImage, setMainImage] = useState(product?.image || "");
  useEffect(() => { if (remoteProduct) { setSelectedSize(remoteProduct.sizes[0] || ''); setSelectedColor(remoteProduct.colors[0] || ''); setMainImage(remoteProduct.image); } }, [remoteProduct]);

  if (!product) return <div className="mx-auto max-w-3xl px-4 py-24 text-center">Loading product…</div>;

  const isOutOfStock = product.stock <= 0;
  const maxQuantity = Math.min(10, product.stock);
  const inWishlist = hydrated && isInWishlist(product.id);
  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity, selectedSize, selectedColor);
    setToastMessage(`${product.name} (${selectedSize}, ${selectedColor}) added!`);
    setToastVisible(true);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const thumbnails = [
    product.image,
    product.image2 || product.image,
    product.image,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <Toast message={toastMessage} visible={toastVisible} onClose={() => setToastVisible(false)} />

      {/* Breadcrumb */}
      <nav className="mb-7 flex items-center gap-1 overflow-hidden text-[10px] font-bold uppercase tracking-[0.08em] text-[#6f6964] sm:text-xs">
        <Link href="/" className="hover:text-[#292421] transition">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-[#292421] transition">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="truncate text-[#292421] font-medium">{product.name}</span>
      </nav>

      <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[0.88] overflow-hidden rounded-[28px] bg-[#d8d0c8] shadow-[0_24px_70px_rgba(17,17,15,0.13)]">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <button
              onClick={() => toggleItem(product.id)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#f3efeb]/90 shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white"
              aria-label={inWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-[#7f5539] text-[#7f5539]" : "text-[#292421]"}`} />
            </button>
          </div>
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {thumbnails.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 ${
                  mainImage === img ? "border-[#292421]" : "border-transparent"
                } hover:border-[#292421] transition`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="rounded-[28px] border border-[#292421]/10 bg-[#f3efeb] p-6 shadow-[0_18px_60px_rgba(17,17,15,0.07)] sm:p-8 lg:sticky lg:top-[96px]">
          <div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#6f6964]">
              {product.category} / {product.sub || "Essentials"}
              </div>
              {product.badge && (
                <span className={`rounded-full px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] ${product.badge === "Sale" ? "bg-[#7f5539] text-white" : "bg-[#a56a4b]"}`}>
                  {product.badge}
                </span>
              )}
            </div>
            <h1 className="mt-3 font-manrope text-4xl font-bold leading-[0.92] tracking-[-0.055em] sm:text-5xl">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="font-manrope text-2xl font-extrabold">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-sm text-[#6f6964] line-through">{formatPrice(product.oldPrice)}</span>
              )}
              {isOutOfStock ? (
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-500">Out of Stock</span>
              ) : (
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-700">
                  In Stock ({product.stock})
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-yellow-400">
                <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span className="text-sm text-[#6f6964]">4.8 (42 reviews)</span>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[#6f6964]">{product.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-y border-[#292421]/10 py-5 text-[10px] font-bold uppercase tracking-[0.07em]">
            <div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#a56a4b]"><Truck className="h-4 w-4" /></span> Free delivery</div>
            <div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8d0c8]"><RefreshCcw className="h-4 w-4" /></span> 7-day exchange</div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-[0.08em]">Select Size</h3>
              <Link href="/size-guide" className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] underline underline-offset-4 hover:opacity-60">
                <Ruler className="h-3.5 w-3.5" /> Size guide
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2.5 rounded-lg text-sm border transition ${
                    selectedSize === size
                      ? "bg-[#292421] text-white border-[#292421]"
                      : "bg-transparent text-[#292421] border-[#292421]/14 hover:bg-[#292421] hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.08em] mb-2">Select Color</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-5 py-2.5 rounded-lg text-sm border transition ${
                    selectedColor === color
                      ? "bg-[#292421] text-white border-[#292421]"
                      : "bg-transparent text-[#292421] border-[#292421]/14 hover:bg-[#292421] hover:text-white"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.08em] mb-2">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#292421]/14 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-l-full text-[#292421] hover:bg-[#292421] hover:text-white flex items-center justify-center text-xl transition"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                  className="w-10 h-10 rounded-r-full text-[#292421] hover:bg-[#292421] hover:text-white flex items-center justify-center text-xl transition"
                  disabled={quantity >= maxQuantity}
                >
                  +
                </button>
              </div>
              <span className="text-xs text-[#6f6964]">(max {maxQuantity})</span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.07em] transition-all ${
                isOutOfStock
                  ? "cursor-not-allowed bg-[#d8d0c8] text-[#6f6964]"
                  : "bg-[#292421] text-white hover:-translate-y-0.5 hover:bg-[#342e2b] hover:shadow-[0_12px_30px_rgba(17,17,15,0.2)]"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              {isOutOfStock ? "Out of Stock" : `Add to Bag — ${formatPrice(product.price * quantity)}`}
            </button>
            <Link href="/cart" className="flex items-center justify-center gap-2 rounded-full border border-[#292421]/15 px-5 py-4 text-[10px] font-extrabold uppercase tracking-[0.07em] transition hover:bg-[#d8d0c8]">
              View bag <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6f6964]">SKU / TNT-{String(product.id).padStart(4, "0")}</div>
          <div className="mt-5"><ShareProductButton name={product.name} /></div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-manrope font-bold text-3xl tracking-[-0.055em]">You may also like</h2>
            <Link href="/products" className="text-sm font-bold uppercase tracking-[0.08em] hover:opacity-70 transition">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-7">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
