'use client';

import React from 'react';
import { ArrowLeft, Lock, QrCode, ShieldAlert, Sparkles } from 'lucide-react';

export default function AttendanceScanPage() {
  return (
    <div className="min-h-screen bg-background text-slate-100 py-12 px-4 flex items-center justify-center relative overflow-hidden font-tech bg-cyber-grid">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-lg w-full relative z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono-cyber text-slate-400 hover:text-cyan-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> [RETURN TO HOME]
        </a>

        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-cyan-500/30 text-center shadow-glow-cyan">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>

          <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono-cyber font-bold uppercase tracking-wider">
            [VENUE SCAN SECURITY LOCK]
          </span>

          <h2 className="text-2xl sm:text-3xl font-heading-cyber font-bold text-slate-100 mt-3 mb-2">
            ON-SITE VENUE QR ATTENDANCE ONLY
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
            Manual web check-in is disabled to prevent proxy attendance. Attendance check-in is opened live at the venue during competition sessions.
          </p>

          <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 text-left space-y-3 text-xs font-mono-cyber mb-6">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <QrCode className="w-4 h-4" /> HOW TO MARK YOUR ATTENDANCE:
            </div>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 font-tech text-xs">
              <li>Be physically present at the competition venue during the event.</li>
              <li>Scan the **Official Event QR Code** projected on the stage screen.</li>
              <li>Complete the instant mobile check-in form on your phone screen.</li>
            </ol>
          </div>

          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs flex items-center gap-3 text-left">
            <ShieldAlert className="w-6 h-6 shrink-0 text-purple-400" />
            <span>Official PDF Merit & Participation Certificates are dispatched directly to your registered email address immediately upon venue QR check-in.</span>
          </div>

          <a
            href="/"
            className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-mono-cyber font-bold text-xs transition-all shadow-glow-cyan flex items-center justify-center gap-2"
          >
            RETURN TO SUPERNOVA HOME
          </a>
        </div>
      </div>
    </div>
  );
}
