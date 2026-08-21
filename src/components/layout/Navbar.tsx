'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import CVModal from '@/components/ui/CVModal';

interface NavbarProps {
  availableForHire?: boolean;
  resumeUrl?: string | null;
  fullName?: string;
}

export default function Navbar({ 
  availableForHire = true,
  resumeUrl,
  fullName = 'Alvino Albas'
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-surface-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Name + availability dot */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="font-display text-sm font-semibold tracking-tight text-text-primary">
              {fullName}
            </span>
            {availableForHire && (
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" title="Available for hire" />
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* CV Button */}
            <button
              onClick={() => setCvModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-hover hover:bg-surface-border border border-surface-border text-[12px] font-mono text-text-primary hover:text-accent transition-all ml-1"
            >
              <FileText size={13} className="text-accent" />
              <span>Resume / CV</span>
            </button>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCvModalOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-hover border border-surface-border text-[11px] font-mono text-accent"
            >
              <FileText size={12} />
              <span>CV</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-muted hover:text-text-primary transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-border bg-background/95 backdrop-blur-xl px-6 py-6 space-y-4">
            <div className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 border-t border-surface-border">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCvModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent text-background font-mono text-xs font-semibold"
                >
                  <FileText size={14} />
                  <span>View Curriculum Vitae (CV)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* CV Modal Viewer */}
      <CVModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        resumeUrl={resumeUrl}
        name={fullName}
      />
    </>
  );
}
