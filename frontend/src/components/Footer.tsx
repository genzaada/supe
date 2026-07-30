'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Ticket, Award, Calendar, Zap, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-cyan-500/20 pt-16 pb-12 px-4 text-slate-400 text-sm mt-20 bg-slate-950/90 font-tech">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-glow-cyan">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-2xl font-heading-cyber font-black text-white tracking-tight">
              SUPERNOVA <span className="text-cyan-400 font-mono-cyber">2026</span>
            </span>
          </div>
          <p className="max-w-md text-slate-400 text-sm font-tech leading-relaxed">
            Asia's premier student technical festival platform architecture. Accountless participant registration with Razorpay payments, instant venue QR check-in, and PDF certificate issuing.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-cyber">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ALL SYSTEMS OPERATIONAL ⚡
          </div>
        </div>

        <div>
          <h4 className="text-white font-mono-cyber font-bold text-xs uppercase tracking-widest mb-4 text-cyan-400">
            QUICK PORTALS
          </h4>
          <ul className="space-y-2.5 text-xs font-mono-cyber">
            <li>
              <a href="/events" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> EVENTS LINEUP
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> DIRECT REGISTRATION
              </a>
            </li>
            <li>
              <a href="/certificates/download" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> EMAIL CERTIFICATE NOTICE
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-mono-cyber font-bold text-xs uppercase tracking-widest mb-4 text-purple-400">
            ADMINISTRATION
          </h4>
          <ul className="space-y-2.5 text-xs font-mono-cyber">
            <li>
              <a href="/login" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> STAFF SIGN IN
              </a>
            </li>
            <li>
              <a href="/dashboard/organizer" className="hover:text-cyan-400 transition-colors">
                ORGANIZER DASHBOARD
              </a>
            </li>
            <li>
              <a href="/dashboard/finance" className="hover:text-cyan-400 transition-colors">
                FINANCE DASHBOARD
              </a>
            </li>
            <li>
              <a href="/dashboard/admin" className="hover:text-cyan-400 transition-colors">
                ADMIN CONTROL PANEL
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-cyan-500/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-cyber text-slate-500">
        <p>© 2026 SUPERNOVA IIT FESTIVAL PARADIGM. ALL RIGHTS RESERVED.</p>
        <p className="flex items-center gap-1">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" /> TECHFEST DESIGN ARCHITECTURE
        </p>
      </div>
    </footer>
  );
}
