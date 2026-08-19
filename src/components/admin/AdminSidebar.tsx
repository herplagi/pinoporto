'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderGit2, 
  UserCog, 
  MessageSquare, 
  LogOut, 
  ExternalLink, 
  Terminal,
  Shield
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manage Projects', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Profile & Settings', href: '/admin/settings', icon: UserCog },
    { label: 'Inbox Messages', href: '/admin/messages', icon: MessageSquare },
  ];

  const handleLogout = async () => {
    localStorage.removeItem('admin_authenticated');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('placeholder')) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch (err) {
        console.error(err);
      }
    }
    router.push('/admin/login');
  };

  return (
    <aside className="w-full md:w-64 bg-surface border-r border-surface-border flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Admin Brand */}
        <div className="p-6 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface-hover border border-surface-border flex items-center justify-center text-brand-emerald">
              <Terminal size={16} />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-text-primary">ADMIN CONSOLE</div>
              <div className="font-mono text-[10px] text-brand-amber flex items-center gap-1">
                <Shield size={10} />
                <span>Super Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all ${
                  isActive
                    ? 'bg-brand-emerald text-background font-semibold shadow-sm shadow-brand-emerald/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-background' : 'text-text-muted'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-surface-border space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-surface-hover hover:bg-surface-border text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={13} />
            <span>View Public Site</span>
          </span>
          <span className="text-[10px] text-brand-emerald">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono text-red-400 hover:bg-red-500/10 transition-colors text-left"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
