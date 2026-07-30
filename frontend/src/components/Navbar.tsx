'use client';

import React, { useState } from 'react';
import { Sparkles, Menu, X, ShieldCheck, Ticket, Calendar, Award, Zap } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-cyan-500/20 backdrop-blur-2xl bg-slate-950/80">
      {/* Top Status Bar (Techfest style) */}
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Techfest-inspired Brand Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-cyan-400 to-blue-600 p-0.5 shadow-glow-cyan">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-heading-cyber font-black tracking-tight text-white block leading-none">
              SUPERNOVA <span className="text-cyan-400 font-mono-cyber">2026</span>
            </span>
            <span className="text-[10px] text-cyan-400/80 uppercase font-mono-cyber tracking-widest block mt-0.5">
              SOET TECHFEST
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold tracking-wide text-slate-300 font-tech">
          <a href="#about" className="hover:text-cyan-400 transition-colors py-1">
            ABOUT
          </a>
          <a href="/events" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1">
            <Calendar className="w-4 h-4 text-cyan-400" /> EVENTS
          </a>
          <a href="#schedule" className="hover:text-cyan-400 transition-colors py-1">
            TIMELINE
          </a>
          <a href="#committee" className="hover:text-cyan-400 transition-colors py-1">
            COMMITTEE
          </a>
          <a href="/certificates/download" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 py-1">
            <Award className="w-4 h-4 text-amber-400" /> CERTIFICATES
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="px-3.5 py-2 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-cyan-400/60 text-xs font-mono-cyber transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> STAFF LOGIN
          </a>
          <a
            href="/register"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-xs font-mono-cyber tracking-wider transition-all shadow-glow-cyan flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 fill-current" /> REGISTER NOW
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl glass-panel text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-cyan-500/30 px-6 py-6 space-y-4 font-tech bg-slate-950/95">
          <a href="/events" className="block text-slate-200 font-bold text-base hover:text-cyan-400">
            ⚡ Events Catalog
          </a>
          <a href="#schedule" className="block text-slate-200 font-bold text-base hover:text-cyan-400">
            📅 Timeline & Schedule
          </a>
          <a href="#committee" className="block text-slate-200 font-bold text-base hover:text-cyan-400">
            🛡️ Organizing Committee
          </a>
          <a href="/certificates/download" className="block text-amber-400 font-bold text-base">
            📜 Email PDF Certificate Notice
          </a>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="/register"
              className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-black font-mono-cyber text-sm tracking-wider"
            >
              REGISTER FOR EVENTS NOW
            </a>
            <a
              href="/login"
              className="w-full py-3 text-center rounded-xl glass-panel text-slate-300 text-sm font-mono-cyber font-semibold"
            >
              STAFF PORTAL SIGN IN
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
