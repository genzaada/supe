'use client';

import React, { useState } from 'react';
import { Trophy, Calendar, MapPin, ArrowRight, Code, Layout, Cpu, Lightbulb, Bug, Briefcase, Rocket, Filter } from 'lucide-react';

const REAL_EVENTS = [
  {
    title: 'CodeBurst',
    category: 'Coding & Algorithm',
    icon: Code,
    desc: 'Competitive coding challenge testing speed, accuracy, and algorithmic problem solving.',
    date: '22 August 2026',
    venue: 'Computer Center Lab 1',
    fee: '₹150',
    prize: '₹10,000',
    slug: 'codeburst',
    tab: 'Coding',
  },
  {
    title: 'Stella',
    category: 'UI/UX & Creative Design',
    icon: Layout,
    desc: 'Design hackathon focusing on futuristic web interfaces, user experience, and visual aesthetics.',
    date: '22 August 2026',
    venue: 'Design Studio 2',
    fee: '₹200',
    prize: '₹12,000',
    slug: 'stella',
    tab: 'UI/UX',
  },
  {
    title: 'Workshop',
    category: 'Hands-on Training',
    icon: Cpu,
    desc: 'Hands-on technical workshop on emerging cloud architecture, AI workflows, and modern web apps.',
    date: '22 August 2026',
    venue: 'Main Auditorium',
    fee: '₹100',
    prize: 'Certificate',
    slug: 'workshop',
    tab: 'Workshop',
  },
  {
    title: 'SparkX',
    category: 'Ideation & Pitching',
    icon: Lightbulb,
    desc: 'Fast-paced innovation pitch where tech visionaries present novel solutions to real-world problems.',
    date: '23 August 2026',
    venue: 'Seminar Hall B',
    fee: '₹250',
    prize: '₹15,000',
    slug: 'sparkx',
    tab: 'Ideation',
  },
  {
    title: 'Ninja Coders',
    category: 'Speed Coding & Debugging',
    icon: Bug,
    desc: 'High-speed debugging and live code optimization under severe time pressure.',
    date: '23 August 2026',
    venue: 'Computer Center Lab 2',
    fee: '₹150',
    prize: '₹8,000',
    slug: 'ninja-coders',
    tab: 'Coding',
  },
  {
    title: 'Junior Shark',
    category: 'Business & Entrepreneurship',
    icon: Briefcase,
    desc: 'Shark-tank style startup pitch contest evaluating market feasibility, valuation, and strategy.',
    date: '23 August 2026',
    venue: 'Management Hall 1',
    fee: '₹300',
    prize: '₹20,000',
    slug: 'junior-shark',
    tab: 'Ideation',
  },
  {
    title: 'Protonova (Project Competition)',
    category: 'Project Showcase',
    icon: Rocket,
    desc: 'National-level flagship hardware and software project exhibition judged by expert panels.',
    date: '23 August 2026',
    venue: 'Exhibition Pavilion A',
    fee: '₹350',
    prize: '₹25,000',
    slug: 'protonova',
    tab: 'Showcase',
  },
];

const CATEGORY_TABS = ['ALL', 'Coding', 'UI/UX', 'Workshop', 'Ideation', 'Showcase'];

export default function FeaturedEvents() {
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredEvents = activeTab === 'ALL'
    ? REAL_EVENTS
    : REAL_EVENTS.filter(e => e.tab === activeTab);

  return (
    <section id="events" className="py-24 px-4 max-w-7xl mx-auto relative bg-cyber-grid">
      <div className="text-center mb-12">
        <span className="text-cyan-400 text-xs font-mono-cyber uppercase tracking-widest px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
          [FEATURED COMPETITIONS & WORKSHOPS]
        </span>
        <h2 className="text-4xl sm:text-5xl font-heading-cyber font-extrabold text-white mt-3">
          SUPERNOVA 2026 LINEUP
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm font-tech mt-2">
          Select any competition or workshop below to inspect rules, prize distribution, and register directly without an account.
        </p>
      </div>

      {/* Techfest Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-xs font-mono-cyber tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-black shadow-glow-cyan'
                : 'glass-panel text-slate-400 hover:text-white hover:border-cyan-500/40'
            }`}
          >
            <Filter className="w-3 h-3" /> {tab}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const IconComp = evt.icon;
          return (
            <div
              key={evt.title}
              className="glass-card p-6 rounded-2xl border border-cyan-500/20 flex flex-col justify-between group hover:border-cyan-400/80 hover:shadow-glow-cyan transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-amber-400 font-mono-cyber font-bold text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" /> {evt.prize}
                  </span>
                </div>

                <span className="text-[11px] font-mono-cyber font-bold text-purple-400 uppercase tracking-wider block mb-1">
                  {evt.category}
                </span>
                <h3 className="text-2xl font-heading-cyber font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                  {evt.title}
                </h3>
                <p className="text-slate-400 font-tech text-sm line-clamp-3 mb-6 leading-relaxed">
                  {evt.desc}
                </p>
              </div>

              <div>
                <div className="space-y-2 text-xs font-mono-cyber text-slate-300 border-t border-white/10 pt-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono-cyber block">ENTRY FEE</span>
                    <span className="text-base font-bold font-mono-cyber text-cyan-400">{evt.fee}</span>
                  </div>
                  <a
                    href={`/events/${evt.slug}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 font-mono-cyber font-bold text-xs border border-cyan-500/30 transition-all flex items-center gap-1"
                  >
                    DETAILS <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
