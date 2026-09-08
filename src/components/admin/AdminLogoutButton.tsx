'use client';
import { LogOut } from 'lucide-react';
export default function AdminLogoutButton() { async function logout() { await fetch('/api/auth/logout', { method: 'POST' }); window.location.href = '/'; } return <button onClick={logout} className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#171714] shadow-sm hover:bg-red-50 hover:text-red-700"><LogOut size={16} /> Log out</button>; }
