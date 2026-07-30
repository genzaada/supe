'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { DollarSign, CheckCircle2, Clock, XCircle, RefreshCw, ArrowLeft, Download, Search, ShieldCheck } from 'lucide-react';

interface Transaction {
  id: string;
  registrationId: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'REFUNDED';
  failureReason?: string;
  createdAt: string;
  registration: {
    fullName: string;
    email: string;
    college: string;
    event: {
      title: string;
      category: string;
    };
  };
}

export default function FinanceDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<{ metrics: any; transactions: Transaction[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/payments/dashboard');
      if (res.success) {
        setData(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Access denied. Finance Officer authorization required.');
    } finally {
      setLoading(false);
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

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background">
        <XCircle className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Finance Dashboard Access Restricted</h2>
        <p className="text-slate-400 max-w-md mb-6">{error}</p>
        <a href="/login" className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm">
          Login as Finance Officer
        </a>
      </div>
    );
  }

  const { metrics, transactions } = data;

  const filteredTransactions = transactions.filter((tx) => {
    const matchesStatus = filterStatus === 'ALL' || tx.status === filterStatus;
    const matchesSearch =
      tx.registrationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.registration?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.registration?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.registration?.event?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-tech bg-cyber-grid">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-cyan-500/20 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-cyber uppercase mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> SUPERNOVA 2026 • FINANCE PORTAL
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading-cyber font-extrabold text-slate-100">
              FINANCIAL OVERVIEW & REVENUE LEDGER
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchFinanceData}
              className="p-2.5 rounded-xl glass-panel text-cyan-400 hover:text-white border border-cyan-500/20"
              title="Refresh Data"
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 shadow-glow-cyan">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-cyan-400 font-mono-cyber uppercase">Total Revenue</span>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <span className="text-3xl font-mono-cyber font-extrabold text-cyan-400">{formatCurrency(metrics.totalRevenue)}</span>
            <span className="text-xs text-slate-400 block mt-1 font-tech">Verified online festival registrations</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 shadow-glow-cyan">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-emerald-400 font-mono-cyber uppercase">Successful</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <span className="text-3xl font-mono-cyber font-extrabold text-emerald-400">{metrics.successfulCount}</span>
            <span className="text-xs text-slate-400 block mt-1 font-tech">Completed checkout transactions</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-amber-400 font-mono-cyber uppercase">Pending</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <span className="text-3xl font-mono-cyber font-extrabold text-amber-400">{metrics.pendingCount}</span>
            <span className="text-xs text-slate-400 block mt-1 font-tech">Awaiting Razorpay verification</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-red-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-red-400 font-mono-cyber uppercase">Failed / Cancelled</span>
              <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
                <XCircle className="w-5 h-5" />
              </div>
            </div>
            <span className="text-3xl font-mono-cyber font-extrabold text-red-400">{metrics.failedCount}</span>
            <span className="text-xs text-slate-400 block mt-1 font-tech">Unsuccessful transaction attempts</span>
          </div>
        </div>

        {/* Transactions Table Section */}
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20 shadow-glow-cyan">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 font-mono-cyber">
              {['ALL', 'SUCCESSFUL', 'PENDING', 'FAILED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filterStatus === st
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold shadow-glow-cyan'
                      : 'bg-slate-900 border border-cyan-500/20 text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-64 relative font-mono-cyber">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-cyan-400 uppercase text-[10px] font-mono-cyber font-bold tracking-wider">
                <tr>
                  <th className="p-4 rounded-l-xl">REGISTRATION ID</th>
                  <th className="p-4">PARTICIPANT & COMPETITION</th>
                  <th className="p-4">TRANSACTION / PAYMENT ID</th>
                  <th className="p-4">AMOUNT</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 rounded-r-xl">DATE & TIME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-tech">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-500 font-mono-cyber">
                      No matching transaction records found in ledger.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-cyan-500/5 transition-colors">
                      <td className="p-4 font-mono-cyber font-bold text-cyan-400">{tx.registrationId}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-200">{tx.registration?.fullName || 'Supernova Participant'}</div>
                        <div className="text-xs text-slate-400 font-mono-cyber">
                          {tx.registration?.event?.title || 'Supernova Competition'} • {tx.registration?.email}
                        </div>
                      </td>
                      <td className="p-4 font-mono-cyber text-xs text-purple-400">
                        {tx.razorpayPaymentId || tx.razorpayOrderId}
                      </td>
                      <td className="p-4 font-mono-cyber font-bold text-slate-100">{formatCurrency(tx.amount)}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-mono-cyber font-bold uppercase ${
                            tx.status === 'SUCCESSFUL'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : tx.status === 'PENDING'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-red-500/10 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-4 text-xs font-mono-cyber text-slate-400">
                        {new Date(tx.createdAt).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
