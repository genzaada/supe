'use client';

import React from 'react';
import CountdownTimer from './CountdownTimer';
import { Sparkles, Calendar, MapPin, ArrowRight, Zap, Trophy, Users, Award, Code } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-36 overflow-hidden flex flex-col items-center justify-center text-center px-4 bg-cyber-grid bg-radial-glow">
      {/* Background Ambient Cyber Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-r from-purple-900/30 via-cyan-500/20 to-blue-900/30 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Techfest-inspired Badge */}
      <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel border border-cyan-500/40 text-cyan-400 text-xs font-mono-cyber uppercase tracking-widest mb-6 shadow-glow-cyan">
        <Sparkles className="w-4 h-4 text-cyan-300 animate-spin-slow" />
        <span>22 & 23 AUGUST 2026 • NATIONAL TECH PARADIGM</span>
      </div>

      {/* Hero Headline (Techfest Typography) */}
      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 max-w-5xl leading-[1.08] font-heading-cyber">
        SPARK THE FUTURE AT <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-300 to-cyan-100 drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
          SUPERNOVA 2026
        </span>
      </h1>

      <p className="max-w-3xl text-slate-300 text-base sm:text-xl mb-8 font-tech leading-relaxed">
        Compete in competitive algorithm coding, UI/UX hackathons, paper pitches, speed debugging, and national hardware exhibitions.
      </p>

      {/* Techfest Festival Statistics Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl w-full mb-10 text-slate-200">
        {[
          { icon: Trophy, label: 'TOTAL PRIZE POOL', val: '₹90,000+', color: 'text-amber-400', border: 'border-amber-500/30' },
          { icon: Code, label: 'TECH EVENTS', val: '7 FLAGSHIP', color: 'text-cyan-400', border: 'border-cyan-500/30' },
          { icon: Users, label: 'EXPECTED FOOTFALL', val: '15,000+', color: 'text-purple-400', border: 'border-purple-500/30' },
          { icon: Award, label: 'PDF CERTIFICATES', val: 'INSTANT VERIFIED', color: 'text-emerald-400', border: 'border-emerald-500/30' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`glass-panel p-4 rounded-2xl border ${stat.border} flex flex-col items-center justify-center hover:border-cyan-400/60 transition-all group`}
            >
              <Icon className={`w-5 h-5 ${stat.color} mb-1.5 group-hover:scale-110 transition-transform`} />
              <span className={`text-base sm:text-xl font-bold font-mono-cyber ${stat.color} block`}>
                {stat.val}
              </span>
              <span className="text-[10px] font-mono-cyber text-slate-400 uppercase tracking-wider block mt-0.5">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Live Monospaced Countdown */}
      <CountdownTimer />

      {/* Primary Action CTAs */}
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        <a
          href="/events"
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black font-mono-cyber text-base tracking-wider transition-all shadow-glow-cyan flex items-center gap-2"
        >
          BROWSE ALL EVENTS <ArrowRight className="w-5 h-5" />
        </a>
        <a
          href="/register"
          className="px-8 py-4 rounded-xl glass-panel text-slate-100 hover:border-cyan-400 font-mono-cyber font-bold text-base transition-all flex items-center gap-2"
        >
          <Zap className="w-4 h-4 text-cyan-400" /> DIRECT REGISTRATION
        </a>
      </div>
    </section>
  );
}
