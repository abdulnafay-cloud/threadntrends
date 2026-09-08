export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Thread & Trends. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}