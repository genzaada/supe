'use client';

import React, { useState } from 'react';
import { Award, Download, ArrowLeft, Ticket, Mail, AlertCircle, Sparkles, CheckCircle2, Send } from 'lucide-react';

export default function CertificateDownloadPage() {
  const [registrationId, setRegistrationId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${API_BASE_URL}/certificates/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId, email }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Certificate dispatch failed');
      }

      setSentSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Certificate not available or attendance not marked present.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-100 py-12 px-4 flex items-center justify-center relative overflow-hidden font-tech bg-cyber-grid">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/20 via-purple-600/20 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-lg w-full relative z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono-cyber text-slate-400 hover:text-cyan-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> [BACK TO HOME]
        </a>

        {sentSuccess ? (
          <div className="glass-panel p-8 rounded-3xl border border-amber-500/40 text-center shadow-glow-cyan">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10" />
            </div>

            <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono-cyber font-bold uppercase tracking-wider">
              CERTIFICATE EMAILED DIRECTLY
            </span>

            <h2 className="text-3xl font-heading-cyber font-bold text-slate-100 mt-3 mb-2">
              CHECK YOUR INBOX! 📩
            </h2>
            <p className="text-slate-300 text-sm mb-6 font-tech">
              Your official PDF Merit & Participation Certificate has been generated and dispatched directly to <span className="text-cyan-400 font-bold">{email}</span>.
            </p>

            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs text-left font-mono-cyber space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">REGISTRATION ID:</span>
                <span className="font-bold text-cyan-400">{registrationId.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">DISPATCH STATUS:</span>
                <span className="text-emerald-400 font-bold">DELIVERED TO INBOX ✔</span>
              </div>
            </div>

            <a
              href="/"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono-cyber font-bold text-sm transition-all shadow-glow-cyan flex items-center justify-center gap-2"
            >
              RETURN TO SUPERNOVA HOME
            </a>
          </div>
        ) : (
          <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 shadow-glow-cyan backdrop-blur-xl">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Award className="w-10 h-10" />
              </div>
            </div>

            <div className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono-cyber font-bold uppercase tracking-wider">
                [DIRECT EMAIL DISPATCH SYSTEM]
              </span>
              <h2 className="text-3xl font-heading-cyber font-bold text-slate-100 mt-2">
                AUTOMATIC EMAIL CERTIFICATE
              </h2>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Supernova 2026 certificates are issued directly to your registered email address upon attendance check-in. If you haven't received yours, enter your details below to resend immediately to your email.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">
                  REGISTRATION ID *
                </label>
                <div className="relative">
                  <Ticket className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={registrationId}
                    onChange={(e) => setRegistrationId(e.target.value)}
                    placeholder="e.g. SN-CB-4892"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 font-mono-cyber placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">
                  REGISTERED EMAIL ADDRESS *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="participant@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm font-mono-cyber"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-mono-cyber font-bold text-sm transition-all shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'GENERATING & SENDING EMAIL...' : 'RESEND PDF CERTIFICATE TO MY EMAIL'} <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
