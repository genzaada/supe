'use client';

import React from 'react';
import { ShieldCheck, UserCheck } from 'lucide-react';

const COMMITTEE_HEADS = [
  { name: 'Diya Chuphal', role: 'Committee Head' },
  { name: 'Richa Bagdiya', role: 'Committee Head' },
  { name: 'Hitesh Phule', role: 'Committee Head' },
];

export default function CommitteeSection() {
  return (
    <section id="committee" className="py-24 px-4 max-w-5xl mx-auto text-center relative bg-cyber-grid">
      <div className="mb-12">
        <span className="text-cyan-400 text-xs font-mono-cyber uppercase tracking-widest px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
          [EXECUTIVE LEADERSHIP & GOVERNANCE]
        </span>
        <h2 className="text-4xl sm:text-5xl font-heading-cyber font-extrabold text-white mt-3">
          ORGANIZING COMMITTEE
        </h2>
        <p className="text-slate-400 text-sm font-tech mt-2">
          Official Executive Steering Leadership for Supernova 2026
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {COMMITTEE_HEADS.map((member) => (
          <div
            key={member.name}
            className="glass-panel p-8 rounded-2xl border border-cyan-500/20 text-center hover:border-cyan-400/80 hover:shadow-glow-cyan transition-all group relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-cyan-400 to-blue-600 p-0.5 mx-auto mb-4 shadow-glow-cyan group-hover:scale-110 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-cyan-400 font-mono-cyber font-extrabold text-2xl">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>
            </div>
            <h3 className="text-2xl font-heading-cyber font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
              {member.name}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono-cyber font-bold text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/30 mt-3">
              <ShieldCheck className="w-3.5 h-3.5" /> {member.role}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
