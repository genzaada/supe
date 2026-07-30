'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Sparkles, CheckCircle, AlertCircle, ArrowLeft, Ticket, Calendar, MapPin, User, Mail, Phone, Building, Map } from 'lucide-react';

interface CustomField {
  key: string;
  label: string;
  type: 'text' | 'select';
  options?: string[];
  required?: boolean;
}

interface Event {
  id: string;
  title: string;
  slug: string;
  category: string;
  venue: string;
  eventDate: string;
  registrationFee: number;
  customFields?: CustomField[];
}

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const preselectedSlug = searchParams.get('event');

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [college, setCollege] = useState('');
  const [city, setCity] = useState('');
  const [customAnswers, setCustomAnswers] = useState<Record<string, any>>({});

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  useEffect(() => {
    fetchPublishedEvents();
  }, []);

  const fetchPublishedEvents = async () => {
    try {
      setLoadingEvents(true);
      const res = await apiFetch('/events');
      if (res.success && res.data.length > 0) {
        setEvents(res.data);
        if (preselectedSlug) {
          const matched = res.data.find((e: Event) => e.slug === preselectedSlug);
          if (matched) setSelectedEventId(matched.id);
          else setSelectedEventId(res.data[0].id);
        } else {
          setSelectedEventId(res.data[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoadingEvents(false);
    }
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  const handleCustomAnswerChange = (key: string, value: any) => {
    setCustomAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedEventId) {
      setError('Please select an event');
      return;
    }

    setSubmitting(true);

    try {
      const res = await apiFetch('/registrations', {
        method: 'POST',
        body: JSON.stringify({
          eventId: selectedEventId,
          fullName,
          email,
          mobileNumber,
          college,
          city,
          customAnswers,
        }),
      });

      if (res.success) {
        setSuccessData(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check inputs and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="min-h-screen bg-background text-slate-100 py-16 px-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-xl w-full glass-panel p-8 md:p-10 rounded-3xl border border-cyan-500/30 text-center relative z-10 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-100 mb-2">Registration Initiated!</h2>
          <p className="text-slate-400 text-sm mb-6">
            You have successfully registered for{' '}
            <span className="text-cyan-400 font-bold">{successData.event?.title}</span>.
          </p>

          {/* Registration Ticket Badge */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 text-left space-y-3 mb-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Registration ID</span>
              <span className="text-xl font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/30">
                {successData.registrationId}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 pt-2">
              <div>
                <span className="text-slate-500 block">Participant</span>
                <span className="font-semibold">{successData.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Email</span>
                <span className="font-semibold">{successData.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Event Date</span>
                <span className="font-semibold">{successData.event?.eventDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Venue</span>
                <span className="font-semibold">{successData.event?.venue}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/events"
              className="flex-1 py-3.5 rounded-xl glass-panel text-slate-300 font-semibold hover:border-cyan-400 text-sm"
            >
              Browse More Events
            </a>
            <a
              href={`/attendance/scan?regId=${successData.registrationId}`}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-glow flex items-center justify-center gap-2"
            >
              View Attendance Desk <Ticket className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <a
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </a>

        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" /> No Account Login Needed
          </div>

          <h1 className="text-3xl font-extrabold text-slate-100 mb-2">Event Registration Form</h1>
          <p className="text-slate-400 text-sm mb-8">
            Complete your details below to instantly receive your official Supernova 2027 Registration ID.
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Select Event
              </label>
              {loadingEvents ? (
                <div className="h-12 rounded-xl bg-slate-900/60 animate-pulse" />
              ) : (
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 focus:outline-none focus:border-cyan-400 text-sm"
                >
                  {events.map((evt) => (
                    <option key={evt.id} value={evt.id} className="bg-slate-900">
                      {evt.title} ({evt.category}) — {evt.registrationFee === 0 ? 'Free' : formatCurrency(evt.registrationFee)}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Selected Event Brief Card */}
            {selectedEvent && (
              <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>{selectedEvent.eventDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>{selectedEvent.venue}</span>
                  </div>
                </div>
                <span className="font-bold text-cyan-400 text-sm">
                  Fee: {selectedEvent.registrationFee === 0 ? 'Free' : formatCurrency(selectedEvent.registrationFee)}
                </span>
              </div>
            )}

            {/* Standard Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Mobile Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">City *</label>
                <div className="relative">
                  <Map className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Pune, Delhi"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">College / Organization *</label>
              <div className="relative">
                <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Enter college or institution name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>
            </div>

            {/* Custom Dynamic Questions */}
            {selectedEvent?.customFields && (selectedEvent.customFields as CustomField[]).length > 0 && (
              <div className="border-t border-white/10 pt-6 space-y-4">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Event Specific Questions</h4>
                {(selectedEvent.customFields as CustomField[]).map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {field.label} {field.required && '*'}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        required={field.required}
                        value={customAnswers[field.key] || ''}
                        onChange={(e) => handleCustomAnswerChange(field.key, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 focus:outline-none focus:border-cyan-400 text-sm"
                      >
                        <option value="">Select option</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-900">
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        required={field.required}
                        value={customAnswers[field.key] || ''}
                        onChange={(e) => handleCustomAnswerChange(field.key, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-base transition-all shadow-glow flex items-center justify-center disabled:opacity-50"
            >
              {submitting ? 'Generating Registration ID...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
