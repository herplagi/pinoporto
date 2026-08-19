'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/supabase/client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    const verifyAuth = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const isSupabaseLive = supabaseUrl && !supabaseUrl.includes('placeholder');

      if (isSupabaseLive) {
        try {
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            router.replace('/admin/login');
          }
        } catch (err) {
          setIsAuthenticated(false);
          router.replace('/admin/login');
        }
      } else {
        // Local mode check
        const localAuth = localStorage.getItem('admin_authenticated');
        if (localAuth === 'true') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace('/admin/login');
        }
      }
      setCheckingAuth(false);
    };

    verifyAuth();
  }, [pathname, isLoginPage, router]);

  // If on login page, render only the login screen without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while verifying authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3 font-mono text-xs text-text-muted">
          <div className="w-4 h-4 rounded-full border-2 border-brand-emerald border-t-transparent animate-spin" />
          <span>Verifying admin session...</span>
        </div>
      </div>
    );
  }

  // If not authenticated and not on login page, return null (redirecting)
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated Admin Dashboard layout with Sidebar
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-6xl">
        {children}
      </main>
    </div>
  );
}
