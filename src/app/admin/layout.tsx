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
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-[#f5f5f2] p-8">
        <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-5"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Admin workspace</p><h2 className="mt-1 text-2xl font-semibold text-[#171714]">Store management</h2></div><div className="flex items-center gap-3"><span className="rounded-full bg-[#dff7a9] px-3 py-1 text-xs font-semibold text-[#334316]">Live</span><AdminLogoutButton /></div></div>
        {children}
      </main>
    </div>
  );
}
