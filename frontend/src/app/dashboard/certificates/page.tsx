'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { Award, CheckCircle2, RefreshCw, ShieldCheck, Zap } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  eventDate: string;
}

export default function OrganizerCertificateDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      fetchStats(selectedEventId);
    }
  }, [selectedEventId]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/events/staff/all');
      if (res.success && res.data.length > 0) {
        setEvents(res.data);
        setSelectedEventId(res.data[0].id);
      }
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (eventId: string) => {
    try {
      const res = await apiFetch(`/certificates/stats/${eventId}`);
      if (res.success) setStats(res.data);
    } catch (err) {
      console.error('Failed to load certificate stats:', err);
    }
  };

  const handleGenerate = async () => {
    if (!selectedEventId) return;
    setGenerating(true);
    setMessage(null);
    setError(null);

    try {
      const res = await apiFetch(`/certificates/generate/${selectedEventId}`, {
        method: 'POST',
      });

      if (res.success) {
        setMessage(res.message);
        fetchStats(selectedEventId);
      }
    } catch (err: any) {
      setError(err.message || 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-gold-500 text-xs font-semibold uppercase mb-1">
              <ShieldCheck className="w-4 h-4" /> Supernova 2027 • Certificate Dispatch
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100">Certificate Generation & Issuance</h1>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-100 focus:outline-none focus:border-amber-400 text-sm font-semibold"
            >
              {events.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.title} ({evt.eventDate})
                </option>
              ))}
            </select>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            <span>{error}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30">
            <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Eligible Present Attendees</span>
            <span className="text-4xl font-extrabold text-emerald-400">{stats?.presentCount || 0}</span>
            <span className="text-xs text-slate-500 block mt-1">Checked-in participants</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gold-500/30">
            <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Certificates Issued</span>
            <span className="text-4xl font-extrabold text-amber-400">{stats?.certificatesCount || 0}</span>
            <span className="text-xs text-slate-500 block mt-1">Generated & emailed records</span>
          </div>
        </div>

        {/* Action Panel */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center">
          <Award className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-100 mb-2">Batch Certificate Generator</h3>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
            Clicking the button below will automatically generate official landscape PDF certificates and dispatch email notifications to all present participants for this event.
          </p>

          <button
            onClick={handleGenerate}
            disabled={generating || !stats?.presentCount}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm transition-all shadow-glow flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
          >
            <Zap className="w-4 h-4" /> {generating ? 'Generating PDF Certificates...' : 'Generate & Dispatch Certificates'}
          </button>
        </div>
      </div>
    </div>
  );
}
