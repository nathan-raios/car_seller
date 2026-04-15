'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NeufsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/catalogue?type=neuf');
  }, [router]);

  return null;
}
