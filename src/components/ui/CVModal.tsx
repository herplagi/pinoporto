'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, AlertCircle } from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string | null;
  name?: string;
}

export default function CVModal({
  isOpen,
  onClose,
  resumeUrl,
  name = 'Alvino Albas',
}: CVModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const hasValidUrl = resumeUrl && resumeUrl !== '#' && resumeUrl.trim() !== '';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[88vh] flex flex-col bg-surface border border-surface-border rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border bg-surface-hover/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-accent">
                  <FileText size={16} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-text-primary">
                    Curriculum Vitae — {name}
                  </h3>
                  <p className="text-[11px] font-mono text-text-muted">
                    {hasValidUrl ? 'Interactive Document Preview' : 'No document uploaded yet'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {hasValidUrl && (
                  <>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors"
                      title="Open in new browser tab"
                    >
                      <ExternalLink size={13} />
                      <span>Open in Tab</span>
                    </a>
                    <a
                      href={resumeUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                      title="Download PDF"
                    >
                      <Download size={13} />
                      <span>Download</span>
                    </a>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-background relative overflow-hidden">
              {hasValidUrl ? (
                <div className="w-full h-full flex flex-col">
                  <iframe
                    src={`${resumeUrl}#toolbar=1&navpanes=0`}
                    className="w-full h-full border-0"
                    title={`CV of ${name}`}
                  />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-surface-hover border border-surface-border flex items-center justify-center text-text-muted">
                    <AlertCircle size={28} />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <h4 className="font-display font-medium text-text-primary text-base">
                      CV Belum Tersedia
                    </h4>
                    <p className="text-xs font-mono text-text-secondary leading-relaxed">
                      Dokumen CV belum diunggah atau sedang dalam proses pembaruan oleh pemilik portofolio.
                    </p>
                  </div>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-surface border border-surface-border text-xs font-mono text-accent hover:bg-surface-hover transition-colors"
                  >
                    Hubungi Pemilik Portofolio &rarr;
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
