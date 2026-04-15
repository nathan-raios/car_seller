'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/lib/hooks/useAdmin';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { LoadingSpinner } from '@/components/ui';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loading, isAdmin } = useAdmin();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="h-screen bg-dark flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
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
