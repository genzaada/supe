'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Calendar, Plus, Eye, Trash2, ToggleLeft, ToggleRight, Ticket, Award, RefreshCw, XCircle, ShieldCheck, CheckCircle2, Clock, FilePlus } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  slug: string;
  category: string;
  venue: string;
  eventDate: string;
  registrationFee: number;
  prizePool: number;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED' | 'CANCELLED';
  _count?: {
    registrations: number;
  };
}

export default function OrganizerDashboardPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Propose Event Modal State
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'Coding & Algorithm',
    description: '',
    rules: '',
    venue: 'Main Auditorium',
    eventDate: '22 August 2026',
    reportingTime: '09:30 AM',
    registrationFee: 150,
    prizePool: 10000,
    coordinatorName: '',
    coordinatorPhone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/events/staff/all');
      if (res.success) setEvents(res.data);
    } catch (err: any) {
      setError(err.message || 'Access restricted. Organizer privileges required.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      alert('Event title and description are required.');
      return;
    }

    try {
      setSubmitting(true);
      const rulesArray = form.rules ? form.rules.split('\n').filter((r) => r.trim().length > 0) : [];
      const coordinators = form.coordinatorName
        ? [{ name: form.coordinatorName, phone: form.coordinatorPhone || '+91 9876543210' }]
        : [];

      const res = await apiFetch('/events', {
        method: 'POST',
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          description: form.description,
          rules: rulesArray,
          venue: form.venue,
          eventDate: form.eventDate,
          reportingTime: form.reportingTime,
          registrationFee: Number(form.registrationFee) || 0,
          prizePool: Number(form.prizePool) || 0,
          status: 'PENDING_APPROVAL',
          coordinators,
        }),
      });

      if (res.success) {
        setSuccessMsg(`Event "${form.title}" proposed successfully! Status set to PENDING APPROVAL by Admin.`);
        setShowModal(false);
        setForm({
          title: '',
          category: 'Coding & Algorithm',
          description: '',
          rules: '',
          venue: 'Main Auditorium',
          eventDate: '22 August 2026',
          reportingTime: '09:30 AM',
          registrationFee: 150,
          prizePool: 10000,
          coordinatorName: '',
          coordinatorPhone: '',
        });
        fetchEvents();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to submit event proposal');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event proposal?')) return;

    try {
      const res = await apiFetch(`/events/${id}`, { method: 'DELETE' });
      if (res.success) fetchEvents();
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sn_token');
    localStorage.removeItem('sn_user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background">
        <XCircle className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Organizer Dashboard Access Restricted</h2>
        <p className="text-slate-400 max-w-md mb-6">{error}</p>
        <a href="/login" className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm">
          Sign In as Organizer
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-tech bg-cyber-grid">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-cyan-500/20 pb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-cyber uppercase mb-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> SUPERNOVA 2026 • ORGANIZER CONTROL PANEL
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading-cyber font-extrabold text-slate-100">
              EVENT MANAGEMENT & PROPOSALS
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono-cyber font-bold text-sm flex items-center gap-2 shadow-glow-cyan hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" /> PROPOSE NEW EVENT
            </button>
            <a
              href="/dashboard/attendance"
              className="px-4 py-2.5 rounded-xl glass-panel text-slate-300 hover:text-cyan-400 text-xs font-mono-cyber font-semibold flex items-center gap-1.5 border border-cyan-500/20"
            >
              <Ticket className="w-4 h-4 text-cyan-400" /> ATTENDANCE DESK
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl glass-panel text-slate-400 hover:text-red-400 text-xs font-mono-cyber font-semibold border border-white/10"
            >
              SIGN OUT
            </button>
          </div>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-tech flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Events Directory */}
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20 shadow-glow-cyan">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading-cyber font-bold text-slate-100">
              ALL MANAGED EVENTS ({events.length})
            </h3>
            <button onClick={fetchEvents} className="p-2 rounded-xl glass-panel text-cyan-400 hover:text-white border border-cyan-500/20">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-cyan-400 uppercase text-[10px] font-mono-cyber font-bold tracking-wider">
                <tr>
                  <th className="p-4 rounded-l-xl">EVENT TITLE</th>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4">DATE & VENUE</th>
                  <th className="p-4">FEE & PRIZE</th>
                  <th className="p-4">REGISTRATIONS</th>
                  <th className="p-4">APPROVAL STATUS</th>
                  <th className="p-4 rounded-r-xl text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-tech">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-cyan-500/5 transition-colors">
                    <td className="p-4 font-bold text-slate-100 text-sm">{evt.title}</td>
                    <td className="p-4 text-purple-400 font-semibold">{evt.category}</td>
                    <td className="p-4 text-slate-300">
                      <div>{evt.eventDate}</div>
                      <div className="text-[10px] text-cyan-400 font-mono-cyber">{evt.venue}</div>
                    </td>
                    <td className="p-4 font-mono-cyber font-semibold">
                      <div className="text-cyan-400">{evt.registrationFee === 0 ? 'Free' : formatCurrency(evt.registrationFee)}</div>
                      <div className="text-[10px] text-amber-400">Prize: {formatCurrency(evt.prizePool)}</div>
                    </td>
                    <td className="p-4 font-mono-cyber font-bold text-cyan-400 text-sm">{evt._count?.registrations || 0}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono-cyber font-bold uppercase inline-flex items-center gap-1 ${
                          evt.status === 'PUBLISHED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : evt.status === 'PENDING_APPROVAL'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {evt.status === 'PUBLISHED' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {evt.status === 'PENDING_APPROVAL' ? 'PENDING ADMIN APPROVAL' : evt.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <a
                        href={`/events/${evt.slug}`}
                        target="_blank"
                        className="inline-block p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 border border-white/10"
                        title="View Public Event Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDeleteEvent(evt.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"
                        title="Delete Proposal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Propose Event Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="glass-panel max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-400/50 shadow-glow-cyan max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
                <h3 className="text-2xl font-heading-cyber font-bold text-white flex items-center gap-2">
                  <FilePlus className="w-6 h-6 text-cyan-400" /> PROPOSE NEW EVENT TEMPLATE
                </h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white font-bold text-lg">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">Event Title *</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. RoboWars 2026"
                      className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 outline-none"
                    >
                      <option value="Coding & Algorithm">Coding & Algorithm</option>
                      <option value="UI/UX & Creative Design">UI/UX & Creative Design</option>
                      <option value="Hands-on Training">Hands-on Training</option>
                      <option value="Ideation & Pitching">Ideation & Pitching</option>
                      <option value="Speed Coding & Debugging">Speed Coding & Debugging</option>
                      <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
                      <option value="Project Showcase">Project Showcase</option>
                      <option value="Robotics & AI">Robotics & AI</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">Event Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Comprehensive description of the competition..."
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">Rules & Eligibility (1 per line)</label>
                  <textarea
                    rows={3}
                    value={form.rules}
                    onChange={(e) => setForm({ ...form, rules: e.target.value })}
                    placeholder="Rule 1: Individual or team participation&#10;Rule 2: Duration 2 hours"
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">Venue Location *</label>
                    <input
                      type="text"
                      required
                      value={form.venue}
                      onChange={(e) => setForm({ ...form, venue: e.target.value })}
                      className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">Event Date & Time *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={form.eventDate}
                        onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                        className="bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-xs text-slate-100 focus:border-cyan-400 outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={form.reportingTime}
                        onChange={(e) => setForm({ ...form, reportingTime: e.target.value })}
                        className="bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-xs text-slate-100 focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">Registration Fee (₹)</label>
                    <input
                      type="number"
                      required
                      value={form.registrationFee}
                      onChange={(e) => setForm({ ...form, registrationFee: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">Prize Pool Pool (₹)</label>
                    <input
                      type="number"
                      required
                      value={form.prizePool}
                      onChange={(e) => setForm({ ...form, prizePool: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">Lead Student Coordinator</label>
                    <input
                      type="text"
                      value={form.coordinatorName}
                      onChange={(e) => setForm({ ...form, coordinatorName: e.target.value })}
                      placeholder="e.g. Diya Chuphal"
                      className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cyber uppercase text-cyan-400 mb-1">Coordinator Mobile Phone</label>
                    <input
                      type="text"
                      value={form.coordinatorPhone}
                      onChange={(e) => setForm({ ...form, coordinatorPhone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white text-xs font-mono-cyber font-bold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-mono-cyber font-bold text-sm shadow-glow-cyan hover:scale-105 transition-all disabled:opacity-50"
                  >
                    {submitting ? 'SUBMITTING PROPOSAL...' : 'SUBMIT FOR ADMIN APPROVAL'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
