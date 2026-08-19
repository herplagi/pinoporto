'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Shield, Menu, X } from 'lucide-react';

interface NavbarProps {
  availableForHire?: boolean;
}

export default function Navbar({ availableForHire = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Stack', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-surface-border py-3.5 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-brand-emerald group-hover:border-brand-emerald/50 transition-colors">
            <Terminal size={18} className="transition-transform group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-wide text-text-primary group-hover:text-brand-emerald transition-colors">
              ALVINO.DEV
            </span>
            <span className="font-mono text-[10px] text-text-muted leading-tight">
              Full-Stack &amp; Mobile Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface/80 border border-surface-border rounded-full px-4 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-mono px-3 py-1.5 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-full transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action: Availability & Admin Login Button */}
        <div className="hidden sm:flex items-center gap-3">
          {availableForHire && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full badge-emerald text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
              <span>Available for Hire</span>
            </div>
          )}

          <Link
            href="/admin/login"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
            title="Admin Dashboard Portal"
          >
            <Shield size={13} className="text-brand-amber" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-surface border border-surface-border text-text-secondary hover:text-text-primary"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surface-border bg-background/95 backdrop-blur-xl px-4 pt-3 pb-6 mt-2 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-surface-border flex items-center justify-between">
            {availableForHire && (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full badge-emerald text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                <span>Available for Hire</span>
              </div>
            )}
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-secondary"
            >
              <Shield size={13} className="text-brand-amber" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
