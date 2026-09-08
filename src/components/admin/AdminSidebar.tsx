'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/customers', label: 'Customers' },
  { href: '/admin/messages', label: 'Messages' },
  { href: '/admin/discounts', label: 'Discounts' },
  { href: '/admin/newsletter', label: 'Newsletter' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  async function logout() { await fetch('/api/auth/logout', { method: 'POST' }); window.location.href = '/'; }
  return (
    <aside className="flex w-64 flex-col bg-[#11110f] text-white p-4 h-screen sticky top-0">
      <div className="mb-8 border-b border-white/10 pb-5"><div className="text-xl font-bold tracking-tight">Thread & Trends</div><div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">Management console</div></div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block px-3 py-2 rounded-md text-sm font-medium',
              pathname === item.href
                ? 'bg-gray-100 text-gray-900'
              : 'text-white/60 hover:bg-white/10 hover:text-white'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button onClick={logout} className="mt-auto flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-red-500/15 hover:text-red-300"><LogOut size={16} /> Log out</button>
    </aside>
  );
}
