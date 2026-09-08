'use client';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const isAdmin = usePathname().startsWith('/admin');
  if (isAdmin) return <main className="relative z-10 min-h-screen">{children}</main>;
  return <><Navbar /><main className="relative z-10 min-h-screen pt-[76px]">{children}</main><div className="relative z-10"><Footer /></div></>;
}
