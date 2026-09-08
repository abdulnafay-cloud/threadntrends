import Link from "next/link";

const categories = [
  { name: "T-Shirts", slug: "t-shirts" },
  { name: "Jeans", slug: "jeans" },
  { name: "Jackets", slug: "jackets" },
  { name: "Accessories", slug: "accessories" },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.slug}`}
              className="group relative rounded-lg overflow-hidden shadow-md bg-indigo-200 aspect-square flex items-center justify-center hover:bg-indigo-300 transition"
            >
              <span className="text-2xl font-bold text-indigo-800">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}