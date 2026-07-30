'use client';

import React, { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-08-22T09:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-8">
      <div className="text-[11px] font-mono-cyber uppercase tracking-widest text-cyan-400 mb-3 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        FESTIVAL LAUNCH COUNTDOWN
      </div>
      <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto">
        {[
          { label: 'DAYS', value: timeLeft.days },
          { label: 'HOURS', value: timeLeft.hours },
          { label: 'MINUTES', value: timeLeft.minutes },
          { label: 'SECONDS', value: timeLeft.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="glass-panel p-4 sm:p-5 rounded-2xl border border-cyan-500/30 text-center shadow-lg hover:border-cyan-400 hover:shadow-glow-cyan transition-all relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-400 font-mono-cyber block tracking-tight">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-mono-cyber font-bold text-slate-400 tracking-widest block mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
