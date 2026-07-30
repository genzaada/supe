'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('sn_user');
    if (!userStr) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role === 'ADMIN') {
        router.push('/dashboard/admin');
      } else if (user.role === 'ORGANIZER') {
        router.push('/dashboard/organizer');
      } else if (user.role === 'FINANCE') {
        router.push('/dashboard/finance');
      } else {
        router.push('/login');
      }
    } catch {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-slate-400">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"></div>
    </div>
  );
}
