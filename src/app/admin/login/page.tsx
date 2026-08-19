'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowLeft, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes('placeholder');

    if (isMock) {
      // Local demo mode simulation
      setTimeout(() => {
        setLoading(false);
        // Set local session cookie or storage for preview
        localStorage.setItem('admin_authenticated', 'true');
        router.push('/admin/dashboard');
      }, 600);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
      } else if (data.session) {
        localStorage.setItem('admin_authenticated', 'true');
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    localStorage.setItem('admin_authenticated', 'true');
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 sm:px-6 relative py-12">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </Link>

        {/* Login Card */}
        <div className="glass-card rounded-2xl p-8 border border-surface-border">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-surface-border">
            <div className="w-10 h-10 rounded-xl bg-surface-hover border border-surface-border flex items-center justify-center text-brand-amber">
              <Shield size={20} />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-text-primary">
                Admin Authentication
              </h1>
              <p className="text-xs font-mono text-text-muted">
                Restricted Portfolio Management Portal
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 size={14} className="shrink-0" />
              <span>{infoMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted">
                Admin Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-3 text-text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-3 text-text-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary focus:outline-none focus:border-brand-emerald transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-brand-emerald hover:bg-emerald-400 disabled:opacity-50 text-background font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-emerald/10"
            >
              {loading ? (
                <span>Authenticating with Supabase...</span>
              ) : (
                <>
                  <span>Sign In as Admin</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Preview shortcut for instant local test */}
          <div className="mt-6 pt-4 border-t border-surface-border/60 text-center">
            <button
              onClick={handleDemoAccess}
              className="text-xs font-mono text-brand-amber hover:underline inline-flex items-center gap-1"
            >
              <span>⚡ Enter Admin Dashboard directly (Preview Mode)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
