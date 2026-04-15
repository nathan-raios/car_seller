'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { LayoutDashboard, Car, Mail, LogOut } from 'lucide-react';
import { logoutAdmin } from '@/lib/firebase/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      router.push('/admin/login');
      toast.success('Déconnecté avec succès');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  const isActive = (href: string) => pathname === href;

  const menuItems = [
    { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/admin/vehicules', label: 'Véhicules', icon: Car },
    { href: '/admin/messages', label: 'Messages', icon: Mail },
  ];

  return (
    <aside className="w-64 bg-dark-2 border-r border-dark-3 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-dark-3">
        <h1 className="text-xl font-display font-semibold text-gold italic">Admin</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                active
                  ? 'bg-gold text-dark font-semibold'
                  : 'text-light hover:bg-dark-3'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-dark-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-light hover:bg-dark-3 transition"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};
