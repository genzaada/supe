import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SUPERNOVA 2026 | Official National Technical Fest Platform',
  description: 'Official Registration & Event Management Portal for Supernova 2026.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&family=Orbitron:wght@600;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-background text-slate-100 selection:bg-cyan-500 selection:text-black font-sans">
        {children}
      </body>
    </html>
  );
}
