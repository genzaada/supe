'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const FAQS = [
  {
    q: 'Do participants need to create an account to register?',
    a: 'No! Participants can register directly by choosing an event, filling in their contact details, completing the online payment, and receiving their unique Registration ID.',
  },
  {
    q: 'How do I obtain my attendance check-in during the event?',
    a: 'Simply scan the Event Attendance QR Code projected at the venue using your mobile camera, enter your Registration ID + Email Address, and your attendance will be recorded instantly.',
  },
  {
    q: 'When and how can I download my participation/merit certificate?',
    a: 'Certificates are issued to participants marked Present. After the event, visit the Certificate Portal, enter your Registration ID + Email Address, and download your official PDF certificate.',
  },
  {
    q: 'What payment methods are supported for event registration?',
    a: 'All online payments are securely processed via Razorpay supporting UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and Wallets.',
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto relative bg-cyber-grid">
      <div className="text-center mb-12">
        <span className="text-cyan-400 text-xs font-mono-cyber uppercase tracking-widest px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
          [KNOWLEDGE BASE & SUPPORT]
        </span>
        <h2 className="text-4xl sm:text-5xl font-heading-cyber font-extrabold text-white mt-3">
          FREQUENTLY ASKED QUESTIONS
        </h2>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`glass-panel rounded-2xl border transition-all ${
                isOpen ? 'border-cyan-400/80 shadow-glow-cyan' : 'border-cyan-500/20 hover:border-cyan-500/40'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left font-tech font-bold text-slate-100 flex items-center justify-between gap-4 text-lg"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono-cyber text-xs text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                    0{idx + 1}
                  </span>
                  <span>{faq.q}</span>
                </span>
                <ChevronDown className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-slate-300 font-tech text-base leading-relaxed border-t border-white/10 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
