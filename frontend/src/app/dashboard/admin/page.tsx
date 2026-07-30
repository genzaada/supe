'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { ShieldCheck, UserPlus, Trash2, Calendar, DollarSign, Award, Ticket, RefreshCw, XCircle, CheckCircle2, Clock, Eye } from 'lucide-react';

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'ORGANIZER' | 'FINANCE';
  createdAt: string;
}

interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  venue: string;
  eventDate: string;
  registrationFee: number;
  prizePool: number;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED' | 'CANCELLED';
  _count?: { registrations: number };
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New staff user form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ORGANIZER' | 'FINANCE'>('ORGANIZER');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [uRes, eRes] = await Promise.all([
        apiFetch('/admin/users'),
        apiFetch('/events/staff/all'),
      ]);
      if (uRes.success) setUsers(uRes.data);
      if (eRes.success) setEvents(eRes.data);
    } catch (err: any) {
      setError(err.message || 'Access restricted. Administrator privileges required.');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveEvent = async (id: string) => {
    try {
      const res = await apiFetch(`/events/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'PUBLISHED' }),
      });
      if (res.success) fetchData();
    } catch (err: any) {
      alert(err.message || 'Approval failed');
    }
  };

  const handleRejectEvent = async (id: string) => {
    try {
      const res = await apiFetch(`/events/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'CANCELLED' }),
      });
      if (res.success) fetchData();
    } catch (err: any) {
      alert(err.message || 'Rejection failed');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const res = await apiFetch('/admin/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res.success) {
        setName('');
        setEmail('');
        setPassword('');
        fetchData();
      }
    } catch (err: any) {
      alert(err.message || 'User creation failed');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to revoke and delete this staff user?')) return;

    try {
      const res = await apiFetch(`/admin/users/${userId}`, { method: 'DELETE' });
      if (res.success) fetchData();
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
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Admin Control Panel Restricted</h2>
        <p className="text-slate-400 max-w-md mb-6">{error}</p>
        <a href="/login" className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm">
          Sign In as Administrator
        </a>
      </div>
    );
  }

  const pendingEvents = events.filter((e) => e.status === 'PENDING_APPROVAL');

  return (
    <div className="min-h-screen bg-background text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-tech bg-cyber-grid">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-cyan-500/20 pb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-cyber uppercase mb-1">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> SUPERNOVA 2026 • MASTER SYSTEM CONTROL PANEL
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading-cyber font-extrabold text-slate-100">
              ADMINISTRATOR CONTROL DESK
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2.5 rounded-xl glass-panel text-cyan-400 hover:text-white border border-cyan-500/20"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl glass-panel text-slate-400 hover:text-red-400 text-xs font-mono-cyber font-semibold border border-white/10"
            >
              SIGN OUT
            </button>
          </div>
        </div>

        {/* Pending Approvals Alert Banner */}
        {pendingEvents.length > 0 && (
          <div className="mb-8 p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-300 shadow-glow-cyan flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <h4 className="font-heading-cyber font-bold text-lg text-white">
                  {pendingEvents.length} EVENT PROPOSAL(S) AWAITING YOUR APPROVAL
                </h4>
                <p className="text-xs text-amber-200">Organizers have proposed new event templates requiring admin publishing.</p>
              </div>
            </div>
            <a href="#event-approvals" className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-mono-cyber font-bold text-xs">
              VIEW PENDING PROPOSALS 👇
            </a>
          </div>
        )}

        {/* Quick Portal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <a href="/dashboard/organizer" className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400 transition-all flex items-center justify-between group">
            <div>
              <span className="text-xs text-cyan-400 font-mono-cyber uppercase block">Module</span>
              <h3 className="text-lg font-heading-cyber font-bold text-slate-100 group-hover:text-cyan-400">ORGANIZER PORTAL</h3>
            </div>
            <Calendar className="w-8 h-8 text-cyan-400" />
          </a>

          <a href="/dashboard/finance" className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-emerald-400 transition-all flex items-center justify-between group">
            <div>
              <span className="text-xs text-emerald-400 font-mono-cyber uppercase block">Module</span>
              <h3 className="text-lg font-heading-cyber font-bold text-slate-100 group-hover:text-emerald-400">FINANCE REVENUE</h3>
            </div>
            <DollarSign className="w-8 h-8 text-emerald-400" />
          </a>

          <a href="/dashboard/attendance" className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-purple-400 transition-all flex items-center justify-between group">
            <div>
              <span className="text-xs text-purple-400 font-mono-cyber uppercase block">Module</span>
              <h3 className="text-lg font-heading-cyber font-bold text-slate-100 group-hover:text-purple-400">ATTENDANCE DESK</h3>
            </div>
            <Ticket className="w-8 h-8 text-purple-400" />
          </a>

          <a href="/certificates/download" className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-amber-400 transition-all flex items-center justify-between group">
            <div>
              <span className="text-xs text-amber-400 font-mono-cyber uppercase block">Module</span>
              <h3 className="text-lg font-heading-cyber font-bold text-slate-100 group-hover:text-amber-400">EMAIL CERTIFICATES</h3>
            </div>
            <Award className="w-8 h-8 text-amber-400" />
          </a>
        </div>

        {/* Event Approvals Section */}
        <div id="event-approvals" className="glass-panel p-6 rounded-3xl border border-cyan-500/20 shadow-glow-cyan mb-10">
          <h3 className="text-xl font-heading-cyber font-bold text-slate-100 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" /> EVENT APPROVAL & PUBLISHING DESK ({events.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-cyan-400 uppercase text-[10px] font-mono-cyber font-bold">
                <tr>
                  <th className="p-4 rounded-l-xl">EVENT TITLE</th>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4">FEE & PRIZE</th>
                  <th className="p-4">VENUE & DATE</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 rounded-r-xl text-right">ADMIN DECISION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-tech">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-cyan-500/5 transition-colors">
                    <td className="p-4 font-bold text-slate-100 text-sm">{evt.title}</td>
                    <td className="p-4 text-purple-400 font-semibold">{evt.category}</td>
                    <td className="p-4 font-mono-cyber">
                      <div className="text-cyan-400">{evt.registrationFee === 0 ? 'Free' : formatCurrency(evt.registrationFee)}</div>
                      <div className="text-[10px] text-amber-400">Prize: {formatCurrency(evt.prizePool)}</div>
                    </td>
                    <td className="p-4 text-slate-300">
                      <div>{evt.eventDate}</div>
                      <div className="text-[10px] text-cyan-400 font-mono-cyber">{evt.venue}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono-cyber font-bold uppercase inline-flex items-center gap-1 ${
                          evt.status === 'PUBLISHED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : evt.status === 'PENDING_APPROVAL'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {evt.status === 'PUBLISHED' ? 'LIVE ON SITE' : evt.status === 'PENDING_APPROVAL' ? 'PENDING APPROVAL' : evt.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {evt.status !== 'PUBLISHED' && (
                        <button
                          onClick={() => handleApproveEvent(evt.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-mono-cyber font-bold text-xs transition-all border border-emerald-500/30"
                        >
                          ✔ APPROVE & PUBLISH
                        </button>
                      )}
                      {evt.status === 'PENDING_APPROVAL' && (
                        <button
                          onClick={() => handleRejectEvent(evt.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white font-mono-cyber font-bold text-xs transition-all border border-red-500/20"
                        >
                          ✕ REJECT
                        </button>
                      )}
                      <a
                        href={`/events/${evt.slug}`}
                        target="_blank"
                        className="inline-block p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 border border-white/10"
                        title="Preview Public Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Staff Form */}
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20 shadow-glow-cyan h-fit">
            <h3 className="text-lg font-heading-cyber font-bold text-slate-100 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-cyan-400" /> CREATE STAFF ACCOUNT
            </h3>

            <form onSubmit={handleCreateUser} className="space-y-4 font-tech">
              <div>
                <label className="block text-xs font-mono-cyber text-cyan-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Diya Chuphal"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-cyber text-cyan-400 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@supernova2026.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-cyber text-cyan-400 uppercase mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-cyber text-cyan-400 uppercase mb-1">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="ORGANIZER" className="bg-slate-900">Organizer</option>
                  <option value="FINANCE" className="bg-slate-900">Finance Officer</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={creating}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-mono-cyber font-bold text-xs shadow-glow-cyan hover:scale-105 transition-all"
              >
                {creating ? 'CREATING ACCOUNT...' : 'CREATE STAFF MEMBER'}
              </button>
            </form>
          </div>

          {/* Staff Users Table */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-cyan-500/20 shadow-glow-cyan">
            <h3 className="text-lg font-heading-cyber font-bold text-slate-100 mb-4">STAFF DIRECTORY ({users.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-cyan-400 uppercase text-[10px] font-mono-cyber font-bold">
                  <tr>
                    <th className="p-3 rounded-l-lg">NAME</th>
                    <th className="p-3">EMAIL</th>
                    <th className="p-3">ROLE</th>
                    <th className="p-3">JOINED DATE</th>
                    <th className="p-3 rounded-r-lg text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-tech">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-cyan-500/5 transition-colors">
                      <td className="p-3 font-semibold text-slate-200">{u.name}</td>
                      <td className="p-3 text-slate-400 font-mono-cyber">{u.email}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-mono-cyber font-bold uppercase ${
                            u.role === 'ADMIN'
                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                              : u.role === 'FINANCE'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="p-3 text-right">
                        {u.role !== 'ADMIN' && (
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
