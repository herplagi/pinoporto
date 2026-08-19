'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { sendContactMessage } from '@/lib/data';
import { Profile } from '@/types/database';

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sender_name || !formData.sender_email || !formData.message) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const res = await sendContactMessage(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      setFormData({ sender_name: '', sender_email: '', subject: '', message: '' });
    } else {
      setErrorMsg(res.error || 'Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-surface-border/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Direct Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-brand-emerald font-mono text-xs mb-2">
              <MessageSquare size={14} />
              <span>DIRECT COMMUNICATION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
              Let&apos;s Build Something Resilient.
            </h2>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed max-w-md">
            Have a system architecture challenge, a fullstack product in need of engineering, or an open engineering role? Send a note directly below or reach out via email.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-surface border border-surface-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-hover border border-surface-border flex items-center justify-center text-brand-emerald">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-[11px] font-mono text-text-muted">Direct Email</div>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-xs sm:text-sm text-text-primary hover:text-brand-emerald transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald flex items-center justify-center mx-auto">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-display text-lg font-bold text-text-primary">
                Message Dispatched
              </h3>
              <p className="text-xs text-text-secondary max-w-xs mx-auto">
                Your note has been received and saved directly to the database. I will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary hover:bg-surface"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-text-muted">
                    Your Name <span className="text-brand-emerald">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sender_name}
                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-brand-emerald transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-text-muted">
                    Email Address <span className="text-brand-emerald">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.sender_email}
                    onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-brand-emerald transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-text-muted">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="System architecture inquiry, project collaboration..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-brand-emerald transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-text-muted">
                  Message <span className="text-brand-emerald">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, timeline, or engineering opportunity..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-xs font-mono text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-brand-emerald transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-brand-emerald hover:bg-emerald-400 disabled:opacity-50 text-background font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-emerald/10"
              >
                {loading ? (
                  <span>Dispatching to Supabase...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={13} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
