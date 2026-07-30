'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { QrCode, Users, CheckCircle2, RefreshCw, ArrowLeft, ShieldCheck, Copy, Maximize2, X, Sparkles } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  slug: string;
  eventDate: string;
  venue: string;
}

export default function OrganizerAttendanceDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [qrData, setQrData] = useState<any | null>(null);
  const [attendanceStats, setAttendanceStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [projectorOpen, setProjectorOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      fetchEventQRAndStats(selectedEventId);
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

  const fetchEventQRAndStats = async (eventId: string) => {
    try {
      const selectedEvt = events.find((e) => e.id === eventId);
      const eventTitle = selectedEvt?.title || 'Supernova Event';
      const venueScanUrl = `${window.location.origin}/venue-scan?eventId=${eventId}&title=${encodeURIComponent(eventTitle)}`;

      setQrData({
        qrDataUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(venueScanUrl)}&color=06b6d4&bgb=0f172a`,
        venueScanUrl,
        eventTitle,
      });

      const statsRes = await apiFetch(`/attendance/event/${eventId}`);
      if (statsRes.success) setAttendanceStats(statsRes.data);
    } catch (err) {
      console.error('Failed to load attendance details:', err);
    }
  };

  const copyUrl = () => {
    if (qrData?.venueScanUrl) {
      navigator.clipboard.writeText(qrData.venueScanUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const selectedEvt = events.find((e) => e.id === selectedEventId);

  return (
    <div className="min-h-screen bg-background text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-tech bg-cyber-grid">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-cyan-500/20 pb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-cyber uppercase mb-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> SUPERNOVA 2026 • ORGANIZER DESK
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading-cyber font-extrabold text-slate-100">
              AUDITORIUM VENUE QR PROJECTOR
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs font-mono-cyber font-bold"
            >
              {events.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.title} ({evt.eventDate})
                </option>
              ))}
            </select>
            <button
              onClick={() => selectedEventId && fetchEventQRAndStats(selectedEventId)}
              className="p-2.5 rounded-xl glass-panel text-cyan-400 hover:text-white border border-cyan-500/20"
              title="Refresh Stats"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* QR Code Projection & Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* QR Code Card */}
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 text-center flex flex-col items-center justify-center shadow-glow-cyan">
            <span className="text-[10px] text-cyan-400 font-mono-cyber uppercase tracking-widest block mb-1">
              [LIVE VENUE SCREEN]
            </span>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 font-mono-cyber">
              {selectedEvt?.title || 'EVENT'} ATTENDANCE QR
            </h3>

            {qrData?.qrDataUrl ? (
              <div className="bg-slate-950 p-4 rounded-2xl border border-cyan-500/40 mb-4 shadow-glow-cyan relative group">
                <img src={qrData.qrDataUrl} alt="Attendance QR Code" className="w-48 h-48 mx-auto rounded-xl" />
              </div>
            ) : (
              <div className="w-48 h-48 rounded-2xl bg-slate-900/60 animate-pulse mb-4" />
            )}

            <p className="text-xs text-slate-400 mb-4 font-tech">
              Participants scan with their mobile phone at the venue to mark check-in & receive their PDF certificate.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
              <button
                onClick={() => setProjectorOpen(true)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-mono-cyber font-bold text-xs transition-all shadow-glow-cyan flex items-center justify-center gap-2"
              >
                <Maximize2 className="w-4 h-4" /> PROJECT FULLSCREEN
              </button>
              <button
                onClick={copyUrl}
                className="w-full py-2.5 rounded-xl glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono-cyber hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" /> {copied ? 'COPIED!' : 'COPY SCAN URL'}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 shadow-glow-cyan">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-emerald-400 font-mono-cyber uppercase">Present Attendees</span>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-4xl font-mono-cyber font-extrabold text-emerald-400">
                  {attendanceStats?.presentCount || 0}
                </span>
                <span className="text-xs text-slate-400 block mt-1 font-tech">Checked-in at venue</span>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-cyan-400 font-mono-cyber uppercase">Total Registrations</span>
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-4xl font-mono-cyber font-extrabold text-cyan-400">
                  {attendanceStats?.totalRegistrations || 0}
                </span>
                <span className="text-xs text-slate-400 block mt-1 font-tech">Registered participants</span>
              </div>
            </div>

            {/* Present Attendees Table */}
            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20 shadow-glow-cyan">
              <h3 className="text-base font-bold text-slate-200 mb-4 font-mono-cyber uppercase text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> LIVE VENUE CHECK-IN LEDGER
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-cyan-400 uppercase text-[10px] font-mono-cyber font-bold">
                    <tr>
                      <th className="p-3 rounded-l-lg">REG ID</th>
                      <th className="p-3">PARTICIPANT NAME</th>
                      <th className="p-3">EMAIL</th>
                      <th className="p-3 rounded-r-lg">CHECK-IN TIME</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-tech">
                    {attendanceStats?.attendances?.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-6 text-slate-500 font-mono-cyber">
                          No check-ins recorded yet for this event session.
                        </td>
                      </tr>
                    ) : (
                      attendanceStats?.attendances?.map((att: any) => (
                        <tr key={att.id} className="hover:bg-cyan-500/5 transition-colors">
                          <td className="p-3 font-mono-cyber font-bold text-cyan-400">{att.registration?.registrationId || 'SN-PRESENT'}</td>
                          <td className="p-3 font-semibold text-slate-200">{att.registration?.fullName || 'Supernova Attendee'}</td>
                          <td className="p-3 text-slate-400 font-mono-cyber">{att.registration?.email}</td>
                          <td className="p-3 text-slate-400 font-mono-cyber">{new Date(att.scannedAt).toLocaleTimeString('en-IN')}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Auditorium QR Projector Modal */}
      {projectorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center">
          <button
            onClick={() => setProjectorOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 hover:text-white"
          >
            <X className="w-8 h-8" />
          </button>

          <span className="text-cyan-400 text-xs font-mono-cyber uppercase tracking-widest mb-2 block">
            [SUPERNOVA 2026 • VENUE STAGE DISPLAY]
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading-cyber font-black text-white mb-2">
            {selectedEvt?.title?.toUpperCase() || 'SUPERNOVA EVENT'}
          </h1>
          <p className="text-slate-300 text-sm font-tech mb-8">
            SCAN THIS QR CODE ON YOUR PHONE CAMERA TO MARK ATTENDANCE & RECEIVE CERTIFICATE
          </p>

          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-cyan-400 shadow-glow-cyan mb-8">
            <img src={qrData?.qrDataUrl} alt="Venue Projector QR" className="w-72 h-72 sm:w-96 sm:h-96 mx-auto rounded-2xl" />
          </div>

          <div className="px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-mono-cyber font-bold">
            VENUE: {selectedEvt?.venue || 'Campus Auditorium'} • DATE: {selectedEvt?.eventDate || '22 August 2026'}
          </div>
        </div>
      )}
    </div>
  );
}
