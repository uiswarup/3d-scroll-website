import React, { useEffect, useState } from 'react';
import { ArrowUp, Sparkles, Navigation } from 'lucide-react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('Track');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 600);

      // Section detection
      const sections = [
        { id: 'section-track', name: 'Tracking' },
        { id: 'section-who-we-are', name: 'Who We Are' },
        { id: 'section-express', name: 'Express' },
        { id: 'section-business', name: 'Solutions' },
        { id: 'section-airmax', name: 'Airmax Cargo' },
        { id: 'section-choose-us', name: 'Why Us' },
        { id: 'section-contact', name: 'Contact' },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sections[i].name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top 2px High-Tech Glowing Gradient Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-white/[0.06]">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 shadow-[0_0_15px_rgba(239,68,68,0.9)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Floating Ambient Parallax Glow Orbs */}
      <div
        className="fixed -top-40 -right-40 w-[650px] h-[650px] bg-red-600/[0.12] rounded-full blur-[140px] pointer-events-none z-[1] transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollProgress * 120}px)` }}
      />
      <div
        className="fixed top-1/3 -left-40 w-[550px] h-[550px] bg-blue-600/[0.1] rounded-full blur-[130px] pointer-events-none z-[1] transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${-scrollProgress * 150}px)` }}
      />
      <div
        className="fixed -bottom-40 right-1/4 w-[600px] h-[600px] bg-cyan-600/[0.08] rounded-full blur-[140px] pointer-events-none z-[1] transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollProgress * 80}px)` }}
      />

      {/* Bottom Floating Glass Navigation Pill */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/60 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] text-xs font-medium text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-zinc-400 font-mono tracking-wider">{Math.round(scrollProgress * 100)}%</span>
          <span className="text-zinc-600">•</span>
          <span className="text-white font-semibold">{activeSection}</span>
        </div>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-950/70 backdrop-blur-2xl border border-white/20 text-white shadow-xl hover:border-red-500/60 hover:bg-red-500/20 hover:scale-105 active:scale-95 transition-all duration-300 group"
          >
            <ArrowUp className="w-4 h-4 text-zinc-300 group-hover:text-red-400 transition-colors" />
          </button>
        )}
      </div>
    </>
  );
}

