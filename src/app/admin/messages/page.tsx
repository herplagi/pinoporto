'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle2, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Message } from '@/types/database';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isSupabaseLive = supabaseUrl && !supabaseUrl.includes('placeholder');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    if (!isSupabaseLive) {
      // Mock messages for preview
      setMessages([
        {
          id: 'msg-1',
          sender_name: 'David Vance',
          sender_email: 'david@enterprise.tech',
          subject: 'Lead Fullstack Architect Role',
          message: 'Hi Alvino, we are building a multi-platform marketplace and loved your Potongin project. Are you available for a fullstack role?',
          is_read: false,
          created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        },
        {
          id: 'msg-2',
          sender_name: 'Sarah Chen',
          sender_email: 'sarah@hypergrowth.co',
          subject: 'Laravel & React Native Consulting',
          message: 'Hey Alvino, our team needs an architecture audit on our current Laravel & React Native stack. Would love to schedule a 30-min call this week.',
          is_read: true,
          created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
        }
      ]);
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to fetch messages' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (msg: Message) => {
    const nextState = !msg.is_read;
    if (!isSupabaseLive) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: nextState } : m))
      );
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('messages')
        .update({ is_read: nextState })
        .eq('id', msg.id);

      if (error) throw error;
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: nextState } : m))
      );
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return;

    if (!isSupabaseLive) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setNotification({ type: 'success', message: 'Message removed (Local preview).' });
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (error) throw error;
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setNotification({ type: 'success', message: 'Message deleted from database!' });
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
            Visitor Inbox
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Incoming communication from the public contact form
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-text-secondary">
          {messages.filter((m) => !m.is_read).length} Unread
        </div>
      </div>

      {notification && (
        <div
          className={`p-3.5 rounded-xl text-xs font-mono flex items-center justify-between gap-3 ${
            notification.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          <span>{notification.message}</span>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-text-muted">
            Loading inbox messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center space-y-3">
            <MessageSquare size={32} className="mx-auto text-text-muted" />
            <p className="font-mono text-xs text-text-secondary">
              Inbox is clean. No messages received yet.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-card rounded-2xl p-6 border transition-all ${
                msg.is_read
                  ? 'border-surface-border opacity-85'
                  : 'border-brand-emerald/40 bg-surface/90 shadow-md shadow-brand-emerald/5'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      msg.is_read
                        ? 'bg-surface-hover text-text-muted'
                        : 'bg-brand-emerald/20 text-brand-emerald'
                    }`}
                  >
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="font-display text-sm font-bold text-text-primary">
                      {msg.sender_name}
                    </span>
                    <span className="font-mono text-xs text-text-muted ml-2">
                      &lt;{msg.sender_email}&gt;
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>

                  <button
                    onClick={() => handleToggleRead(msg)}
                    className="p-1.5 rounded-lg bg-surface-hover hover:bg-surface-border text-text-secondary hover:text-text-primary transition-colors"
                    title={msg.is_read ? 'Mark Unread' : 'Mark Read'}
                  >
                    <CheckCircle2
                      size={15}
                      className={msg.is_read ? 'text-text-muted' : 'text-brand-emerald'}
                    />
                  </button>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div className="font-mono text-xs font-semibold text-brand-amber mb-2">
                  Subject: {msg.subject}
                </div>
              )}

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans bg-background/50 p-4 rounded-xl border border-surface-border">
                {msg.message}
              </p>

              <div className="pt-3 flex justify-end">
                <a
                  href={`mailto:${msg.sender_email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                  className="text-xs font-mono text-brand-emerald hover:underline inline-flex items-center gap-1"
                >
                  Reply via Email &rarr;
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
