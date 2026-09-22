import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-[#ebe5df] text-[#292421]">
      <AdminSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-7 lg:p-10">
        <div className="mb-8 flex items-center justify-between border-b border-[#292421]/14 pb-5"><div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#6f6964]">Thread n Trends / Admin</p><h2 className="mt-2 font-playfair text-3xl italic tracking-[-0.04em]">Store room</h2></div><div className="flex items-center gap-3"><span className="hidden items-center gap-2 border border-[#292421]/15 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.13em] sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#a56a4b]" /> Live store</span><AdminLogoutButton /></div></div>
        {children}
      </main>
    </div>
  );
}
