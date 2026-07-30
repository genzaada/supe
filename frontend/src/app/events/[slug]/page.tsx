'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Calendar, MapPin, Trophy, Users, ShieldAlert, ArrowLeft, CheckCircle2, Phone, Mail } from 'lucide-react';

interface Coordinator {
  id: string;
  name: string;
  phone?: string;
  email?: string;
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
  customFields?: any;
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchEventDetails();
    }
  }, [slug]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/events/slug/${slug}`);
      if (res.success) {
        setEvent(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Event not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background">
        <ShieldAlert className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Event Not Found</h2>
        <p className="text-slate-400 max-w-md mb-6">{error}</p>
        <a href="/events" className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold">
          Return to Events Catalog
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <a
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Events
        </a>

        {/* Hero Card */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
              {event.category}
            </span>
            {event.prizePool > 0 && (
              <div className="flex items-center gap-2 text-gold-500 font-extrabold text-sm bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/30">
                <Trophy className="w-4 h-4" /> Grand Prize Pool: {formatCurrency(event.prizePool)}
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-100 mb-4 tracking-tight">
            {event.title}
          </h1>

          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
            {event.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Date & Time</span>
                <span className="font-semibold text-slate-200">{event.eventDate} • {event.reportingTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Event Venue</span>
                <span className="font-semibold text-slate-200">{event.venue}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Registration Fee</span>
                <span className="font-bold text-cyan-400 text-lg">
                  {event.registrationFee === 0 ? 'Free Entry' : formatCurrency(event.registrationFee)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`/register?event=${event.slug}`}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-base transition-all shadow-glow flex items-center gap-2"
            >
              Register Direct (No Login Required)
            </a>
          </div>
        </div>

        {/* Rules & Coordinators Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Rules List */}
          <div className="md:col-span-2 glass-panel p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" /> Event Rules & Guidelines
            </h3>
            {event.rules.length === 0 ? (
              <p className="text-slate-400 text-sm">Standard Supernova 2027 code of conduct applies.</p>
            ) : (
              <ul className="space-y-3">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Coordinators */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 h-fit">
            <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" /> Event Coordinators
            </h3>
            {event.coordinators.length === 0 ? (
              <p className="text-slate-400 text-sm">Coordinator details will be updated shortly.</p>
            ) : (
              <div className="space-y-4">
                {event.coordinators.map((coord) => (
                  <div key={coord.id} className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                    <h4 className="font-bold text-slate-200">{coord.name}</h4>
                    {coord.phone && (
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <Phone className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{coord.phone}</span>
                      </div>
                    )}
                    {coord.email && (
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{coord.email}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
