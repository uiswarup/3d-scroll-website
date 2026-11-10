/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import ScrollCanvas from './components/ScrollCanvas';
import ScrollProgress from './components/ScrollProgress';
import { 
  Menu, 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Bot,
  Sparkles,
  ChevronDown,
  Code2,
  Wallet,
  Eye,
  Warehouse,
  Check,
  Plane,
  Target,
  Globe,
  Smartphone,
  Phone,
  Mail,
  Send
} from 'lucide-react';

export default function App() {
  // Progressive Section Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach((sec) => observer.observe(sec));

    if (sections[0]) {
      sections[0].classList.add('is-visible');
    }

    return () => observer.disconnect();
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Tracking state
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);

  // Contact form state
  const [queryForm, setQueryForm] = useState({
    name: '',
    email: '',
    mobile: '',
    customerType: 'Customer',
    queryType: 'Delivery Status',
    shipmentNo: '',
    description: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Modal state
  const [activeModalTitle, setActiveModalTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [divaChatOpen, setDivaChatOpen] = useState(false);

  const handleNavClick = (title: string) => {
    setActiveModalTitle(title);
    setModalOpen(true);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setTrackingResult({
      id: trackingNumber.trim(),
      status: 'In Transit',
      estimatedDelivery: 'Tomorrow, 4:00 PM',
      steps: [
        { title: 'Picked Up', location: 'New York Hub', completed: true },
        { title: 'In Transit', location: 'Chicago Center', completed: true },
        { title: 'Out for Delivery', location: 'Local Hub', completed: false },
        { title: 'Delivered', location: 'Destination', completed: false },
      ]
    });
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setQueryForm({
        name: '',
        email: '',
        mobile: '',
        customerType: 'Customer',
        queryType: 'Delivery Status',
        shipmentNo: '',
        description: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-transparent text-white font-['DM_Sans',sans-serif] selection:bg-red-500 selection:text-white flex flex-col justify-between relative z-10">
      <ScrollCanvas />
      <ScrollProgress />
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[900px] h-[2800px] bg-gradient-to-tr from-red-600/[0.05] via-white/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="sticky top-0 w-full bg-slate-950/40 backdrop-blur-2xl border-b border-white/15 z-50 shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-white text-black font-black px-2.5 py-1 rounded text-lg tracking-tighter uppercase">
              DTDC
            </div>
            <div className="w-2 h-2 rounded-full bg-red-600" />
          </a>

          <nav className="hidden xl:flex items-center gap-5 text-xs font-medium text-white/80">
            <a href="#section-track" className="hover:text-white transition-colors">Track</a>
            <a href="#section-who-we-are" className="hover:text-white transition-colors">Who We Are</a>
            <a href="#section-express" className="hover:text-white transition-colors">Express Parcel</a>
            <a href="#section-business" className="hover:text-white transition-colors">Business Solutions</a>
            <a href="#section-airmax" className="hover:text-white transition-colors">Airmax Cargo</a>
            <a href="#section-choose-us" className="hover:text-white transition-colors">Choose Us</a>
            <a href="#section-contact" className="hover:text-white transition-colors">Contact Support</a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('Join Us')}
              className="hidden sm:inline-flex px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer shadow-md"
            >
              Join Us
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border-b border-white/10 px-6 py-4 space-y-3 z-45 fixed top-16 left-0 w-full shadow-2xl">
          <a href="#section-track" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-white py-1">1. Track Shipments</a>
          <a href="#section-who-we-are" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-white py-1">2. Who We Are</a>
          <a href="#section-express" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-white py-1">3. Express Parcel</a>
          <a href="#section-business" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-white py-1">4. Business Solutions</a>
          <a href="#section-airmax" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-white py-1">5. Airmax Cargo</a>
          <a href="#section-choose-us" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-white py-1">6. Why Choose Us</a>
          <a href="#section-contact" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-white py-1">7. Contact Support</a>
        </div>
      )}

      {/* Scrollable Content Container */}
      <div className="flex-1 w-full flex flex-col">

        {/* SECTION 1: Track Shipments */}
        <section id="section-track" className="reveal-section min-h-[90vh] flex items-center justify-center max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="flex-1 max-w-xl text-left space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Section 1 · Global Express Logistics</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Track <span className="text-red-500 italic">Shipments,</span> With Ease
                </h1>

                <p className="text-base text-white/70 leading-relaxed font-normal">
                  Check your parcel’s latest updates and delivery status right here with real-time GPS precision.
                </p>
              </div>

              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row items-center gap-2 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/20 p-2 rounded-2xl shadow-xl max-w-lg">
                <div className="flex items-center gap-3 px-3 py-2 w-full">
                  <Package className="w-5 h-5 text-white/50 shrink-0" />
                  <input 
                    type="text" 
                    required
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter AWB / Tracking No. (e.g. DTDC123)"
                    className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none text-sm font-medium"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg"
                >
                  <span>Track Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg text-white/60 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Secure Transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white" />
                  <span>24/7 Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-white" />
                  <span>Express Fleet</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <div className="bg-slate-900/40 backdrop-blur-2xl border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/15 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/10 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      <MapPin className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Live Parcel Radar</div>
                      <div className="text-xs text-white/60">Real-time telemetry</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                    Active
                  </div>
                </div>

                {trackingResult ? (
                  <div className="space-y-5">
                    <div className="bg-slate-950/30 backdrop-blur-xl border-white/10 p-4 rounded-xl border border-white/10 space-y-1.5">
                      <div className="flex justify-between text-xs text-white/60">
                        <span>ID: <strong className="text-white">{trackingResult.id}</strong></span>
                        <span className="text-emerald-400 font-semibold">{trackingResult.status}</span>
                      </div>
                      <div className="text-xs text-white/80">
                        Est: <strong className="text-white">{trackingResult.estimatedDelivery}</strong>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {trackingResult.steps.map((step: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${step.completed ? 'bg-white text-black' : 'bg-white/10 text-white/40'}`}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="text-left flex-1 flex justify-between items-center">
                            <span className={`text-xs font-semibold ${step.completed ? 'text-white' : 'text-white/40'}`}>{step.title}</span>
                            <span className="text-xs text-white/50">{step.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center space-y-4">
                    <Package className="w-14 h-14 text-white/20 mx-auto animate-pulse" />
                    <div className="text-sm font-semibold text-white">Enter a tracking number</div>
                    <p className="text-xs text-white/60 max-w-xs mx-auto">
                      Type any AWB code in the input bar on the left to view simulated tracking status.
                    </p>
                    <button 
                      onClick={() => { setTrackingNumber('DTDC987654'); handleTrack({ preventDefault: () => {} } as any); }}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer border border-white/15"
                    >
                      Try Sample (DTDC987654)
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: Who We Are */}
        <section id="section-who-we-are" className="reveal-section min-h-[90vh] flex items-center justify-center max-w-7xl mx-auto px-6 py-16 w-full border-t border-white/10">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 flex items-center justify-center gap-4 w-full max-w-xl">
              <div className="relative group w-1/3 h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/20 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] backdrop-blur-md shadow-2xl">
                <img src="/src/assets/images/who_we_are_reception_1794128230658.jpg" alt="Reception" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[11px] text-red-400 font-bold uppercase tracking-wider">Welcome</span>
                  <span className="text-sm font-semibold text-white">HQ Reception</span>
                </div>
              </div>
              <div className="relative group w-1/3 h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/20 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] backdrop-blur-md shadow-2xl -translate-y-6">
                <img src="/src/assets/images/who_we_are_employee_1794128231580.jpg" alt="Employee" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[11px] text-red-400 font-bold uppercase tracking-wider">People</span>
                  <span className="text-sm font-semibold text-white">Our Team</span>
                </div>
              </div>
              <div className="relative group w-1/3 h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/20 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] backdrop-blur-md shadow-2xl">
                <img src="/src/assets/images/who_we_are_collaborators_1794128230080.jpg" alt="Collaborators" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[11px] text-red-400 font-bold uppercase tracking-wider">Innovation</span>
                  <span className="text-sm font-semibold text-white">Collaboration</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg space-y-6">
              <div className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6 relative">
                <div className="absolute -top-3 -right-3 px-3.5 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-semibold tracking-wider uppercase">
                  Section 2 · Who We Are
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Who We <span className="text-red-500 italic">Are</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    DTDC is India’s leading integrated express logistics provider and a pioneer of the franchise-based model in the industry. With the largest number of access points in India and a growing international network, we are committed to reaching every doorstep. We believe that every parcel is someone’s promise and we deliver on it.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-red-500">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Our Vision</h3>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      To be the most admired logistics partner through closer connections - smarter solutions.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-red-500">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Our Mission</h3>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      To lead through innovation, fostering a culture of excellence, collaboration and adaptability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Express Parcel Overview */}
        <section id="section-express" className="reveal-section min-h-[90vh] flex items-center justify-center max-w-7xl mx-auto px-6 py-16 w-full border-t border-white/10">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 flex items-center justify-center gap-4 w-full max-w-xl">
              <div className="relative group w-1/3 h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/20 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] backdrop-blur-md shadow-2xl">
                <img src="/src/assets/images/logistics_delivery_scooter_1794127558098.jpg" alt="Scooter" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[11px] text-red-400 font-bold uppercase tracking-wider">Speed</span>
                  <span className="text-sm font-semibold text-white">City Express</span>
                </div>
              </div>
              <div className="relative group w-1/3 h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/20 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] backdrop-blur-md shadow-2xl -translate-y-6">
                <img src="/src/assets/images/logistics_warehouse_workers_1794127556109.jpg" alt="Warehouse" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[11px] text-red-400 font-bold uppercase tracking-wider">Expertise</span>
                  <span className="text-sm font-semibold text-white">Nationwide Network</span>
                </div>
              </div>
              <div className="relative group w-1/3 h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/20 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] backdrop-blur-md shadow-2xl">
                <img src="/src/assets/images/logistics_sorting_facility_1794127555904.jpg" alt="Sorting" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[11px] text-red-400 font-bold uppercase tracking-wider">Automation</span>
                  <span className="text-sm font-semibold text-white">Smart Hubs</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg space-y-6">
              <div className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-4 relative">
                <div className="absolute -top-3 -right-3 px-3.5 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-semibold tracking-wider uppercase">
                  Section 3 · Express Parcel
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  What is Express <span className="text-red-500 italic">Parcel?</span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  <strong className="text-white font-semibold">Express Parcel</strong> is our reliable, day-definite delivery service designed for your everyday shipments. Backed by decades of logistics expertise and a nationwide network, we ensure your parcels reach every corner securely and on time.
                </p>
                <div className="pt-2 flex items-center gap-4">
                  <button onClick={() => handleNavClick('Book Express Parcel')} className="px-7 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer shadow-lg">
                    <span>Book Shipment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-end justify-end gap-3">
                <div onClick={() => setDivaChatOpen(true)} className="bg-slate-900/40 backdrop-blur-2xl border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/20 rounded-2xl px-5 py-3 shadow-2xl backdrop-blur-md cursor-pointer hover:border-white/40 transition-all animate-bounce duration-1000">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-500" />
                    <span>Hi I'm DIVA</span>
                  </div>
                  <div className="text-[11px] text-white/60">Your virtual parcel assistant</div>
                </div>
                <div onClick={() => setDivaChatOpen(true)} className="w-12 h-12 rounded-full bg-red-600/80 border border-white/20 flex items-center justify-center text-white shadow-xl cursor-pointer hover:bg-red-600 transition-colors shrink-0">
                  <Bot className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Business Solutions */}
        <section id="section-business" className="reveal-section min-h-[90vh] flex items-center justify-center max-w-7xl mx-auto px-6 py-16 w-full border-t border-white/10">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-xl text-left space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Section 4 · Business Solutions</span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Want Express Parcel Services for Your <span className="text-red-500 italic">Business?</span>
                </h2>
                <p className="text-base text-white/75 leading-relaxed font-normal">
                  Our intelligent logistics platform helps brands grow faster and serve better.
                </p>
              </div>
              <div>
                <button onClick={() => handleNavClick('Get a Quote')} className="px-8 py-4 rounded-full bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors cursor-pointer shadow-xl inline-flex items-center gap-2">
                  <span>GET A QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div onClick={() => handleNavClick('API Integration')} className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:border-white/30 transition-all cursor-pointer group space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-red-600 transition-colors">
                  <Code2 className="w-6 h-6 text-red-400 group-hover:text-white" />
                </div>
                <h3 className="text-base font-bold text-white">API Integration</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Seamlessly connect your platform with our logistics network for faster, automated shipping.
                </p>
              </div>
              <div onClick={() => handleNavClick('COD & Instant Remittance')} className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:border-white/30 transition-all cursor-pointer group space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-red-600 transition-colors">
                  <Wallet className="w-6 h-6 text-red-400 group-hover:text-white" />
                </div>
                <h3 className="text-base font-bold text-white">COD & Instant Remittance</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Offer cash-on-delivery with rapid, hassle-free remittance to fuel your business growth.
                </p>
              </div>
              <div onClick={() => handleNavClick('Real-Time Control & Visibility')} className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:border-white/30 transition-all cursor-pointer group space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-red-600 transition-colors">
                  <Eye className="w-6 h-6 text-red-400 group-hover:text-white" />
                </div>
                <h3 className="text-base font-bold text-white">Real-Time Control & Visibility</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Track every shipment with centralized dashboards, live updates, and instant alerts.
                </p>
              </div>
              <div onClick={() => handleNavClick('Warehousing Solutions')} className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:border-white/30 transition-all cursor-pointer group space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-red-600 transition-colors">
                  <Warehouse className="w-6 h-6 text-red-400 group-hover:text-white" />
                </div>
                <h3 className="text-base font-bold text-white">Warehousing Solutions</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  End-to-end e-commerce storage, order processing, shipping and returns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Airmax Cargo */}
        <section id="section-airmax" className="reveal-section min-h-[90vh] flex items-center justify-center max-w-7xl mx-auto px-6 py-16 w-full border-t border-white/10">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-xl text-left space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Section 5 · Premium Air Cargo</span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Airmax - DTDC’s Premium <span className="text-red-500 italic">Air Cargo Service</span>
                </h2>
                <p className="text-base text-white/75 leading-relaxed font-normal">
                  Airmax is now powered by Series 5, offering a stronger air network, faster transit timelines, and a seamless booking experience for heavy and urgent cargo shipments across India.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                <div className="flex items-center gap-3 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 p-4 rounded-2xl backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-white">27 origin cities across India</span>
                </div>
                <div className="flex items-center gap-3 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 p-4 rounded-2xl backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-white">1533 serviced PIN codes</span>
                </div>
                <div className="flex items-center gap-3 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 p-4 rounded-2xl backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-white">208 Origin Destination Pairs</span>
                </div>
                <div className="flex items-center gap-3 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 p-4 rounded-2xl backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-white">Same-Day Delivery</span>
                </div>
              </div>

              <div>
                <button onClick={() => handleNavClick('Book Airmax Shipment')} className="px-8 py-4 rounded-full bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors cursor-pointer shadow-xl inline-flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  <span>BOOK AIRMAX SHIPMENT</span>
                </button>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg">
              <div className="bg-slate-900/40 backdrop-blur-2xl border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/15 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/15 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center text-red-500">
                      <Plane className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Airmax Series 5 Network</div>
                      <div className="text-xs text-white/60">High-speed cargo priority</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                    AIR CARGO
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-950/30 backdrop-blur-xl border-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                    <div className="text-xs text-white/60">Express Air Transit Hubs</div>
                    <div className="text-lg font-bold text-white">27 Major Metro Airports Connected</div>
                  </div>
                  <div className="bg-slate-950/30 backdrop-blur-xl border-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                    <div className="text-xs text-white/60">Guaranteed Timelines</div>
                    <div className="text-sm font-semibold text-white">Next-flight-out priority with live flight tracking telemetry.</div>
                  </div>
                </div>
                <button onClick={() => handleNavClick('Air Cargo Calculator')} className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/15 cursor-pointer">
                  Calculate Air Cargo Rates
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Why Should You Choose Us */}
        <section id="section-choose-us" className="reveal-section min-h-[90vh] flex items-center justify-center max-w-7xl mx-auto px-6 py-16 w-full border-t border-white/10">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-xl">
              <div className="relative group w-full sm:w-1/2 h-[380px] rounded-3xl overflow-hidden border border-white/20 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] backdrop-blur-md shadow-2xl">
                <img src="/src/assets/images/choose_us_delivery_box_1794128436899.jpg" alt="Delivery Handover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <div className="bg-slate-900/40 backdrop-blur-2xl border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/20 p-3 rounded-2xl backdrop-blur-md space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>10,000</span>
                    </div>
                    <div className="text-[11px] text-white/80 font-medium">Locations Over the Globe</div>
                  </div>
                </div>
              </div>

              <div className="relative group w-full sm:w-1/2 h-[380px] rounded-3xl overflow-hidden border border-white/20 bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] backdrop-blur-md shadow-2xl sm:translate-y-8">
                <img src="/src/assets/images/choose_us_warehouse_1794128437400.jpg" alt="Warehouse Parcels" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <div className="bg-slate-900/40 backdrop-blur-2xl border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/20 p-3 rounded-2xl backdrop-blur-md space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Deliver 12M+</span>
                    </div>
                    <div className="text-[11px] text-white/80 font-medium">Parcels Every Year</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-xl space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Section 6 · Why Choose Us</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Why Should You <span className="text-red-500 italic">Choose Us</span>
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-2 hover:border-white/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-red-500">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">16500+ Channel Partners</div>
                      <div className="text-xs text-white/60">Nationwide Network</div>
                    </div>
                  </div>
                  <p className="text-xs text-white/75 leading-relaxed pl-13">
                    A wide network of customer access points across India that covers 96% of the Indian population.
                  </p>
                </div>

                <div className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-2 hover:border-white/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-red-500">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">Global Destinations</div>
                      <div className="text-xs text-white/60">Worldwide Reach</div>
                    </div>
                  </div>
                  <p className="text-xs text-white/75 leading-relaxed pl-13">
                    A growing international network with a physical presence in 7 countries, delivering seamlessly across the world.
                  </p>
                </div>

                <div className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-2 hover:border-white/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-red-500">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">5.6 Mn+ MyDTDC App Users</div>
                      <div className="text-xs text-white/60">Digital Platform</div>
                    </div>
                  </div>
                  <p className="text-xs text-white/75 leading-relaxed pl-13">
                    Empowering users with seamless services and real-time solutions, right at their fingertips.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Contact & Support Query Form (Placed at the Very Last) */}
        <section id="section-contact" className="reveal-section min-h-[90vh] flex items-center justify-center max-w-7xl mx-auto px-6 py-16 w-full border-t border-white/10">
          <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12">
            
            {/* Left Column: Contact Info Cards */}
            <div className="w-full lg:w-1/3 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Section 7 · Support & Contact</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Get in <span className="text-red-500 italic">Touch</span>
                </h2>
                <p className="text-xs text-white/70">
                  Help us improve by sharing your experience with our services.
                </p>
              </div>

              <div className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)]/70 border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-white/50">Phone Support</div>
                    <div className="text-sm font-bold text-white">+91 - 9606 911 811</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-white/50">Email Support</div>
                    <div className="text-sm font-bold text-white">customersupport@dtdc.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-white/50">Corporate HQ</div>
                    <div className="text-sm font-bold text-white">Bangalore, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Support Query Form */}
            <div className="w-full lg:flex-1">
              <div className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative">
                
                {formSubmitted ? (
                  <div className="py-16 text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                    <h3 className="text-2xl font-bold text-white">Query Submitted Successfully!</h3>
                    <p className="text-sm text-white/60">Thank you for sharing your experience. Our support team will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleQuerySubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-white/80">Name *</label>
                        <input 
                          type="text" 
                          required
                          value={queryForm.name}
                          onChange={(e) => setQueryForm({ ...queryForm, name: e.target.value })}
                          placeholder="Enter Your Name"
                          className="w-full bg-black border border-white/25 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-white/80">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          value={queryForm.email}
                          onChange={(e) => setQueryForm({ ...queryForm, email: e.target.value })}
                          placeholder="Enter Your Email ID"
                          className="w-full bg-black border border-white/25 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-white/80">Mobile Number *</label>
                        <input 
                          type="tel" 
                          required
                          value={queryForm.mobile}
                          onChange={(e) => setQueryForm({ ...queryForm, mobile: e.target.value })}
                          placeholder="Enter Your Mobile Number"
                          className="w-full bg-black border border-white/25 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-white/80">I'm an Existing *</label>
                        <select 
                          value={queryForm.customerType}
                          onChange={(e) => setQueryForm({ ...queryForm, customerType: e.target.value })}
                          className="w-full bg-black border border-white/25 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white transition-colors"
                        >
                          <option value="Customer">Customer</option>
                          <option value="Business Partner">Business Partner</option>
                          <option value="Franchisee">Franchisee</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-white/80">Raise a Query for *</label>
                        <select 
                          value={queryForm.queryType}
                          onChange={(e) => setQueryForm({ ...queryForm, queryType: e.target.value })}
                          className="w-full bg-black border border-white/25 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white transition-colors"
                        >
                          <option value="Delivery Status">Delivery Status</option>
                          <option value="Delayed Shipment">Delayed Shipment</option>
                          <option value="Billing & Rates">Billing & Rates</option>
                          <option value="Pickup Request">Pickup Request</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-white/80">Shipment Number *</label>
                        <input 
                          type="text" 
                          required
                          value={queryForm.shipmentNo}
                          onChange={(e) => setQueryForm({ ...queryForm, shipmentNo: e.target.value })}
                          placeholder="Enter Shipment Number"
                          className="w-full bg-black border border-white/25 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                        />
                      </div>

                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-white/80">Description *</label>
                      <textarea 
                        rows={4}
                        required
                        value={queryForm.description}
                        onChange={(e) => setQueryForm({ ...queryForm, description: e.target.value })}
                        placeholder="Write Your Query in Detail..."
                        className="w-full bg-black border border-white/25 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT QUERY</span>
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50 z-20 shrink-0">
        <div>© {new Date().getFullYear()} DTDC Express Limited. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <button onClick={() => handleNavClick('Privacy Policy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
          <button onClick={() => handleNavClick('Terms of Service')} className="hover:text-white transition-colors cursor-pointer">Terms</button>
          <button onClick={() => handleNavClick('Support')} className="hover:text-white transition-colors cursor-pointer">Support</button>
        </div>
      </footer>

      {/* Generic Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-2xl border-white/15 shadow-2xl backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/[0.04] backdrop-blur-xl border-white/15 shadow-[0_8px_30px_0_rgba(0,0,0,0.35)] border border-white/15 rounded-3xl p-6 max-w-sm w-full relative shadow-2xl text-center space-y-4">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{activeModalTitle}</h3>
              <p className="text-xs text-white/60">
                You are accessing the {activeModalTitle} portal for DTDC Express.
              </p>
            </div>
            <button 
              onClick={() => setModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
