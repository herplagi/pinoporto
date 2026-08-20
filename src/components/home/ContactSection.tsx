'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendContactMessage } from '@/lib/data';
import { Profile } from '@/types/database';
import AnimateIn from '@/components/ui/AnimateIn';

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
    <section id="contact" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Left: headline + email */}
        <AnimateIn>
          <div className="space-y-8">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
              Let&apos;s talk.
            </h2>

            <p className="text-text-secondary max-w-md leading-relaxed">
              Have a project in mind, an engineering role, or just want to connect? 
              Drop a message or email directly.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="link-underline text-lg md:text-xl text-text-primary hover:text-accent transition-colors"
            >
              {profile.email}
            </a>
          </div>
        </AnimateIn>

        {/* Right: form */}
        <AnimateIn delay={0.1}>
          <div>
            {submitted ? (
              <div className="py-12 space-y-4">
                <CheckCircle2 size={28} className="text-accent" />
                <h3 className="font-display text-xl font-semibold text-text-primary">
                  Message sent.
                </h3>
                <p className="text-sm text-text-secondary max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors mt-4"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3 rounded-lg border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs text-text-muted">
                      Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sender_name}
                      onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-0 py-2.5 bg-transparent border-b border-surface-border text-sm text-text-primary placeholder:text-text-muted/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs text-text-muted">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.sender_email}
                      onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full px-0 py-2.5 bg-transparent border-b border-surface-border text-sm text-text-primary placeholder:text-text-muted/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs text-text-muted">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                    className="w-full px-0 py-2.5 bg-transparent border-b border-surface-border text-sm text-text-primary placeholder:text-text-muted/50 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs text-text-muted">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-0 py-2.5 bg-transparent border-b border-surface-border text-sm text-text-primary placeholder:text-text-muted/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-text-primary hover:bg-white text-background text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
