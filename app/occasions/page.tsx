'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OccasionsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/catalogue?type=occasion');
  }, [router]);

  return null;
}
