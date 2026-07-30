import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedEvents from '@/components/FeaturedEvents';
import ScheduleTimeline from '@/components/ScheduleTimeline';
import CommitteeSection from '@/components/CommitteeSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <main>
        <Hero />
        <FeaturedEvents />
        <ScheduleTimeline />
        <CommitteeSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
