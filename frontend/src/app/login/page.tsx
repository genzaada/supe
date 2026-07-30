'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.success && res.data.token) {
        localStorage.setItem('sn_token', res.data.token);
        localStorage.setItem('sn_user', JSON.stringify(res.data.user));

        const role = res.data.user.role;
        if (role === 'ADMIN') {
          router.push('/dashboard/admin');
        } else if (role === 'ORGANIZER') {
          router.push('/dashboard/organizer');
        } else if (role === 'FINANCE') {
          router.push('/dashboard/finance');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-900/40 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Supernova 2026
        </a>

        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-slate-100 mb-1">
            Supernova Staff Portal
          </h2>
          <p className="text-center text-slate-400 text-sm mb-6">
            Authorized Organizer, Finance & Admin Login
          </p>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Official Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@supernova2026.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all shadow-glow flex items-center justify-center disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-xs mt-6">
            Note: Event Participants do not require account login to register.
          </p>
        </div>
      </div>
    </div>
  );
}
