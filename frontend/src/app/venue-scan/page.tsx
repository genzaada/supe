'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { QrCode, CheckCircle2, AlertCircle, ArrowLeft, Ticket, Mail, User, Trophy, Award, Sparkles, Send } from 'lucide-react';

export default function VenueScanPage() {
  const searchParams = useSearchParams();
  const initialEventId = searchParams.get('eventId') || '';
  const initialTitle = searchParams.get('title') || 'Supernova Competition';

  const [registrationId, setRegistrationId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await apiFetch('/attendance/mark', {
        method: 'POST',
        body: JSON.stringify({
          registrationId,
          email,
          fullName,
          competition: initialTitle,
          eventId: initialEventId || undefined,
        }),
      });

      if (res.success) {
        setSuccess(res.data || { registrationId, email, fullName, competition: initialTitle });
      }
    } catch (err: any) {
  setError(err.message || 'Venue attendance verification failed');
} finally {
  setLoading(false);
}

  return (
    <div className="min-h-screen bg-background text-slate-100 py-10 px-4 flex items-center justify-center relative overflow-hidden font-tech bg-cyber-grid">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-emerald-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-lg w-full relative z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono-cyber text-slate-400 hover:text-cyan-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> [BACK TO HOME]
        </a>

        {success ? (
          <div className="glass-panel p-8 rounded-3xl border border-emerald-500/40 text-center shadow-glow-cyan">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono-cyber font-bold uppercase tracking-wider">
              OFFICIAL VENUE CHECK-IN VERIFIED
            </span>

            <h2 className="text-3xl font-heading-cyber font-bold text-slate-100 mt-3 mb-1">
              WELCOME, {fullName.toUpperCase() || 'PARTICIPANT'}!
            </h2>
            <p className="text-slate-300 text-sm mb-6">
              Confirmed Present for competition: <span className="text-cyan-400 font-bold">{initialTitle}</span>.
            </p>

            <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 text-xs text-left space-y-2.5 mb-6 font-mono-cyber">
              <div className="flex justify-between">
                <span className="text-slate-400">REGISTRATION ID:</span>
                <span className="font-bold text-cyan-400">{registrationId.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">REGISTERED EMAIL:</span>
                <span className="text-slate-200">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">VENUE STATUS:</span>
                <span className="text-emerald-400 font-bold">PRESENT ✔</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-3 text-left">
              <Award className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <strong className="block text-white font-mono-cyber text-xs uppercase">CERTIFICATE SENT TO EMAIL 📩</strong>
                Your official PDF Certificate has been generated and emailed directly to <span className="text-cyan-400 font-bold">{email}</span>.
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 shadow-glow-cyan">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <QrCode className="w-8 h-8" />
              </div>
            </div>

            <span className="text-cyan-400 text-[10px] font-mono-cyber uppercase tracking-widest block text-center mb-1">
              [SUPERNOVA 2026 • ON-SITE VENUE SCANNER]
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading-cyber font-bold text-center text-slate-100 mb-1">
              VENUE ATTENDANCE CHECK-IN
            </h2>
            <p className="text-center text-slate-400 text-xs mb-6">
              You scanned the live QR Code for <strong className="text-cyan-400">{initialTitle}</strong>. Enter your registration details to mark attendance.
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-cyber text-cyan-400 uppercase mb-1">
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 font-mono-cyber placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-cyber text-cyan-400 uppercase mb-1">
                  FULL PARTICIPANT NAME *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Richa Bagdiya"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-cyber text-cyan-400 uppercase mb-1">
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm font-mono-cyber"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-mono-cyber font-bold transition-all shadow-glow-cyan flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50 mt-2"
              >
                {loading ? 'VERIFYING & SENDING CERTIFICATE...' : 'CONFIRM CHECK-IN & SEND CERTIFICATE'} <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
