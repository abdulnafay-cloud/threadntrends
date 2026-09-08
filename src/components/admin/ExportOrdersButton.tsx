'use client';

import { Order } from '@/lib/admin/orders';

export default function ExportOrdersButton({ orders }: { orders: Order[] }) {
  const exportCSV = () => {
    const headers = ['Reference', 'Customer', 'Email', 'Total', 'Status', 'Date'];
    const rows = orders.map(o => [
      o.order_reference,
      o.customer_name,
      o.email,
      o.total,
      o.status,
      new Date(o.created_at).toLocaleDateString(),
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportCSV}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
    >
      Export CSV
    </button>
  );
}