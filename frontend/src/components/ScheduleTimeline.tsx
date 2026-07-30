'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

const SCHEDULE = {
  day1: [
    { time: '09:30 AM', title: 'CodeBurst', venue: 'Computer Center Lab 1', category: 'Coding Challenge' },
    { time: '11:00 AM', title: 'Stella', venue: 'Design Studio 2', category: 'UI/UX Hackathon' },
    { time: '01:30 PM', title: 'Hands-on Technical Workshop', venue: 'Main Auditorium', category: 'Training Session' },
  ],
  day2: [
    { time: '10:00 AM', title: 'SparkX', venue: 'Seminar Hall B', category: 'Idea Pitching' },
    { time: '11:30 AM', title: 'Ninja Coders', venue: 'Computer Center Lab 2', category: 'Speed Debugging' },
    { time: '01:00 PM', title: 'Junior Shark', venue: 'Management Hall 1', category: 'Startup Pitch' },
    { time: '02:30 PM', title: 'Protonova (Project Competition)', venue: 'Exhibition Pavilion A', category: 'Project Showcase' },
  ],
};

export default function ScheduleTimeline() {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1');

  return (
    <section id="schedule" className="py-24 px-4 max-w-5xl mx-auto relative bg-cyber-grid">
      <div className="text-center mb-12">
        <span className="text-cyan-400 text-xs font-mono-cyber uppercase tracking-widest px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
          [FESTIVAL CHRONOLOGY & TIMELINE]
        </span>
        <h2 className="text-4xl sm:text-5xl font-heading-cyber font-extrabold text-white mt-3">
          SUPERNOVA 2026 SCHEDULE
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto text-sm font-tech mt-2">
          Explore the official 2-day session timeline across campus venues.
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveDay('day1')}
          className={`px-6 py-3 rounded-xl text-xs font-mono-cyber font-bold tracking-wider transition-all flex items-center gap-2 ${
            activeDay === 'day1'
              ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 shadow-glow-cyan'
              : 'glass-panel text-slate-400 hover:text-white hover:border-cyan-500/40'
          }`}
        >
          <Calendar className="w-4 h-4" /> DAY 1 • 22 AUGUST 2026
        </button>
        <button
          onClick={() => setActiveDay('day2')}
          className={`px-6 py-3 rounded-xl text-xs font-mono-cyber font-bold tracking-wider transition-all flex items-center gap-2 ${
            activeDay === 'day2'
              ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 shadow-glow-cyan'
              : 'glass-panel text-slate-400 hover:text-white hover:border-cyan-500/40'
          }`}
        >
          <Calendar className="w-4 h-4" /> DAY 2 • 23 AUGUST 2026
        </button>
      </div>

      {/* Illuminated Techfest Timeline */}
      <div className="relative space-y-6 before:absolute before:left-4 sm:before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-blue-600">
        {SCHEDULE[activeDay].map((item, idx) => (
          <div key={idx} className="relative pl-10 sm:pl-16 group">
            {/* Glowing Node Marker */}
            <div className="absolute left-2.5 sm:left-[27px] top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125 transition-all shadow-glow-cyan" />

            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-cyan-400/80 hover:shadow-glow-cyan transition-all">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 font-mono-cyber font-bold text-sm border border-cyan-500/30 flex items-center gap-2 shrink-0">
                  <Clock className="w-4 h-4 text-cyan-300" /> {item.time}
                </div>
                <div>
                  <span className="text-[10px] font-mono-cyber font-bold text-purple-400 uppercase tracking-widest block">
                    {item.category}
                  </span>
                  <h4 className="text-xl font-heading-cyber font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-cyber text-slate-300 bg-slate-900/80 px-4 py-2 rounded-xl border border-cyan-500/20 shrink-0">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{item.venue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
