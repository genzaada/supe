'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Calendar, MapPin, Trophy, Users, Search, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface Coordinator {
  id: string;
  name: string;
  phone?: string;
}

interface Event {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  rules: string[];
  venue: string;
  eventDate: string;
  reportingTime: string;
  registrationFee: number;
  prizePool: number;
  coordinators: Coordinator[];
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/events');
      if (res.success) {
        setEvents(res.data);
      }
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(events.map((e) => e.category)))];

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Glow ambient background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-900/30 via-cyan-600/20 to-blue-900/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </a>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Supernova 2027 Lineup
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-cyan-300 to-white">
              Official Events Catalog
            </h1>
            <p className="text-slate-400 mt-2 text-lg">
              Explore national technical challenges, hackathons, workshops, and flagship competitions.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow'
                  : 'glass-panel text-slate-300 hover:border-cyan-500/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-panel h-80 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-2xl border border-white/10">
            <p className="text-slate-400 text-lg">No events found matching your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-cyan-400/50"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                      {event.category}
                    </span>
                    {event.prizePool > 0 && (
                      <span className="flex items-center gap-1 text-gold-500 font-bold text-xs bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
                        <Trophy className="w-3.5 h-3.5" /> Pool: {formatCurrency(event.prizePool)}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                    {event.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-6">
                    {event.description}
                  </p>
                </div>

                <div>
                  <div className="space-y-2 text-xs text-slate-300 border-t border-white/5 pt-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{event.eventDate} • {event.reportingTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{event.venue}</span>
                    </div>
                    {event.coordinators.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Coord: {event.coordinators.map((c) => c.name).join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Entry Fee</span>
                      <span className="text-lg font-bold text-cyan-400">
                        {event.registrationFee === 0 ? 'Free' : formatCurrency(event.registrationFee)}
                      </span>
                    </div>
                    <a
                      href={`/events/${event.slug}`}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 font-semibold text-xs transition-all flex items-center gap-1.5"
                    >
                      Event Details <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
