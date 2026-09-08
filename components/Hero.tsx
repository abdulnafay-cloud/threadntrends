import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Elevate Your Style
          </h1>
          <p className="mt-4 text-lg md:text-xl text-indigo-50">
            Discover the latest trends in fashion – premium quality,
            timeless design.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/products">
              <Button size="lg" variant="secondary" className="font-semibold">
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}