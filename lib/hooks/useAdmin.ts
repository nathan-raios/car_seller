'use client';

import { useState, useEffect } from 'react';
import { onAuthChange } from '@/lib/firebase/auth';
import type { User } from 'firebase/auth';

export function useAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, isAdmin: !!user };
}
