'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdmin } from '@/lib/hooks/useAdmin';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { LoadingSpinner } from '@/components/ui';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, isAdmin } = useAdmin();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !isAdmin && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [loading, isAdmin, isLoginPage, router]);

  if (loading) {
    return (
      <div className="h-screen bg-dark flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAdmin && !isLoginPage) {
    return null;
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-dark">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
