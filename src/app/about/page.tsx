export default function About() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-bold font-playfair gradient-text">
          About Thread & Trends
        </h1>
        <div className="mt-6 space-y-4 text-gray-300 leading-relaxed">
          <p>
            Welcome to <strong className="text-white">Thread & Trends</strong> – your destination for
            contemporary fashion that blends comfort with style.
          </p>
          <p>
            Founded in 2024, we believe that great design should be accessible to
            everyone. Our collections are curated with a focus on quality
            materials, timeless silhouettes, and a touch of modern edge.
          </p>
          <p>
            We are committed to sustainability and ethical production. Every
            piece is made to last, reducing the need for fast fashion.
          </p>
          <p className="text-purple-300 font-medium">Join us on our journey to redefine everyday elegance.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 text-sm text-gray-300">
            🌱 Sustainable
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 text-sm text-gray-300">
            🧵 Quality Craftsmanship
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 text-sm text-gray-300">
            🌍 Global Shipping
          </div>
        </div>
      </div>
    </div>
  );
}