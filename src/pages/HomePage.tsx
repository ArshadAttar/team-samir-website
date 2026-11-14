import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO, SERVICES } from '../data/mockData';
import { HeroReveal } from '../components/HeroReveal';
import { CountUpStat } from '../components/CountUpStat';
import { ClientFeedback } from '../components/ClientFeedback';
import { ProcessesDraw } from '../components/ProcessesDraw';
import { UsVsThem } from '../components/UsVsThem';
import {
  ArrowRight,
  Dumbbell,
  Calendar,
  Award,
  MessageSquare,
} from 'lucide-react';

const HEADLINE_OPTIONS = [
  '🔢 Tired of Counting Calories, 🥗 Boring Salads & 🌶️ Missing Your Masala Food? 💪 You’re in the Right Place! 🎯',
  'Bored of counting 1, 2, 3, 4 during workouts? 🥱💪 It’s time to train smarter with the right techniques',
  'World-Class Fitness Coaching, Powered by K11-Certified Experts.',
];
const HEADLINE_ROTATE_MS = 5000;
const HEADLINE_STORAGE_KEY = 'ts-hero-headline-index';

// Shows the next headline on every page load/refresh (remembered in this browser only)
const getInitialHeadlineIndex = (): number => {
  try {
    const last = Number(localStorage.getItem(HEADLINE_STORAGE_KEY));
    const next = Number.isInteger(last) && last >= 0 ? (last + 1) % HEADLINE_OPTIONS.length : 0;
    localStorage.setItem(HEADLINE_STORAGE_KEY, String(next));
    return next;
  } catch {
    return Math.floor(Math.random() * HEADLINE_OPTIONS.length);
  }
};

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onBookDemo: (preselectedService?: string) => void;
  /** Opens the Services page with this service's Plan Details expanded */
  onOpenService: (serviceId: string) => void;
  highlightPlaceholders: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onBookDemo,
  onOpenService,
  highlightPlaceholders,
}) => {
  // Rotating hero headline: a different one on each page load, then the next one every 5 seconds
  const [headlineIndex, setHeadlineIndex] = useState(getInitialHeadlineIndex);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINE_OPTIONS.length);
    }, HEADLINE_ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-0">
      {/* ============================================================
          A. HERO SECTION (White, Black, Blue with subtle 3D depth)
          ============================================================ */}
      <section className="relative overflow-hidden bg-[#111318] text-white pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-20 border-b border-[#1C2028]">
        {/* Subtle 3D-inspired background depth elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#1769FF] blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[#00A3FF] blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-[#0B3D91] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left Column: Typography, Copy & CTAs */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">

              {/* Hero headline: rotates automatically with a word-by-word reveal */}
              <HeroReveal sentence={HEADLINE_OPTIONS[headlineIndex]} />

              {/* Supporting Copy */}
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Personalised fitness coaching, expert guidance, and a structured approach to help you work towards your fitness goals in Pune.
              </p>

              {/* Credibility Line (Client-supplied claims with verification notice) */}
              <div
                className={`p-2.5 sm:p-3.5 rounded-xl border transition-all ${
                  highlightPlaceholders
                    ? 'bg-amber-950/40 border-amber-500/80 ring-2 ring-amber-400'
                    : 'bg-[#1C2028]/80 border-slate-800'
                }`}
              >
                <div className="flex items-start sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-slate-200">
                    <span className="text-white font-semibold">5 Years Experience</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-white font-semibold">250+ Clients</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-white font-semibold">25+ Celebrities</span>
                  </div>
                  <Award className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5 sm:mt-0" />
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                  *Figures supplied by client; presented as editable claims pending formal verification before public launch.
                </p>
              </div>

              {/* 2 Primary CTAs + Mobile WhatsApp Direct Action (2-column side-by-side on mobile) */}
              <div className="pt-1 grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <button
                  onClick={() => onBookDemo()}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3.5 min-h-[40px] sm:min-h-[46px] text-xs sm:text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#00A3FF] active:scale-[0.98] rounded-lg sm:rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">Book Free Demo</span>
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
                    'Hi Samir, I want to book a free demo session at TS Fitness in Pune.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-3.5 min-h-[40px] sm:min-h-[46px] text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] rounded-lg sm:rounded-xl transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">WhatsApp Samir</span>
                </a>

                <button
                  onClick={() => onNavigate('services')}
                  className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] text-xs sm:text-sm font-semibold text-white bg-[#1C2028] hover:bg-slate-800 border border-slate-700 rounded-xl transition-all cursor-pointer"
                >
                  <span>Explore Training</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00A3FF]" />
                </button>
              </div>

              {/* Local Venue Marker */}
              <div className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-[#16834A]" />
                <span>TS Fitness Studio · Flat No. 3, DP Road, Kothrud, Pune</span>
              </div>
            </div>

            {/* Right Column: 3D-styled Photographic Presentation (Real Samir in TS Fitness) */}
            <div className="lg:col-span-5 relative flex justify-center">
              
              {/* 3D Visual Depth Canvas Frame */}
              <div className="relative w-full max-w-md">
                
                {/* 3D sculptural background geometry */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#1769FF]/30 via-transparent to-[#00A3FF]/20 rounded-3xl transform -rotate-2 blur-sm" />
                
                {/* Main Card with Trainer Portrait in TS Fitness Gym */}
                <div className="relative rounded-2xl overflow-hidden bg-[#1C2028] border border-slate-700/80 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-[1.01]">
                  <div className="aspect-16/10 sm:aspect-4/3 lg:aspect-4/3 relative overflow-hidden bg-slate-900">
                    <img
                      src="/images/hero_samir_ts_fitness_1792417382753.jpg"
                      alt="Coach Samir - Head Trainer at TS Fitness Pune"
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Measured Scrim gradient ensuring text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Integrated 'Lead Coach Samir · Personalised Coaching' Unified Top Banner */}
                    <div className="absolute top-4 right-4 bg-[#111318]/95 backdrop-blur-md border border-slate-700 text-white px-3.5 py-2 rounded-xl text-xs flex items-center gap-2.5 shadow-xl">
                      <div className="w-8 h-8 rounded-lg bg-[#1769FF]/20 border border-[#1769FF]/40 flex items-center justify-center text-[#00A3FF] shrink-0">
                        <Dumbbell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>Lead Coach Samir</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16834A]" />
                        </div>
                        <div className="text-[11px] text-[#00A3FF] font-semibold">
                          Personalised Coaching
                        </div>
                      </div>
                    </div>

                    {/* Bottom identity plaque with TS Fitness */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs font-semibold text-[#00A3FF] uppercase tracking-wider flex items-center gap-1.5">
                        <span>TS Fitness Pune</span>
                        <span className="text-slate-500">·</span>
                        <span>TeamSamir</span>
                      </div>
                      <div className="text-2xl font-display font-bold">
                        Coach Samir
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        5 Years Experience · 250+ Clients · Kothrud, Pune
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layered Location Badge */}
                <div className="hidden sm:flex absolute -top-4 -left-4 bg-[#111318]/95 backdrop-blur-md border border-slate-700 px-3.5 py-2 rounded-xl shadow-xl items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16834A]" />
                  <span className="text-xs font-medium text-slate-200">DP Road, Kothrud</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          B. TRUST AND EXPERIENCE STRIP (Count-Up Stats with Live Increments)
          ============================================================ */}
      <section className="bg-white border-b border-[#E1E6EF] py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            
            <CountUpStat
              end={5}
              suffix="+"
              label="Years Experience"
              sublabel="Coaching in Pune"
              className="bg-[#EEF5FF] border border-[#E1E6EF] text-center"
              valueClassName="text-[#1769FF]"
            />

            <CountUpStat
              end={250}
              suffix="+"
              label="Clients Trained"
              sublabel="*Client-supplied · Live Increment"
              allowLiveIncrement={true}
              incrementIntervalMs={14000}
              badge="Live"
              className={`border text-center ${
                highlightPlaceholders ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-[#E1E6EF]'
              }`}
              valueClassName="text-[#111318]"
            />

            <CountUpStat
              end={25}
              suffix="+"
              label="Celebrities Trained"
              sublabel="*Client-supplied · Actors & VIPs"
              allowLiveIncrement={true}
              incrementIntervalMs={24000}
              badge="Elite"
              className={`border text-center ${
                highlightPlaceholders ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-[#E1E6EF]'
              }`}
              valueClassName="text-[#111318]"
            />

            <CountUpStat
              end={100}
              suffix="%"
              label="Qualified Team"
              sublabel="Trainer · Coach · Nutrition"
              className="bg-[#EEF5FF] border border-[#E1E6EF] text-center"
              valueClassName="text-[#16834A]"
            />

          </div>
        </div>
      </section>


      {/* ============================================================
          C. TRAINING SERVICES PREVIEW (4 Clean Service Cards)
          ============================================================ */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div>
              <div className="text-[11px] sm:text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-1 sm:mb-2">
                Comprehensive Coaching Portfolio
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#171A21] tracking-tight">
                Specialized Training Services
              </h2>
              <p className="text-[#646B78] text-xs sm:text-base mt-1.5 sm:mt-2 max-w-xl">
                Structured protocols built for long-term consistency, correct biomechanics, and realistic physical progress.
              </p>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1769FF] hover:text-[#0B3D91] transition-colors cursor-pointer shrink-0"
            >
              <span>View All Services & Formats</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                role="button"
                tabIndex={0}
                onClick={() => onOpenService(service.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenService(service.id);
                  }
                }}
                aria-label={`View ${service.title} plan details`}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#E1E6EF] hover:border-[#1769FF] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="aspect-4/3 relative overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md font-medium">
                      {service.format}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-display font-bold text-[#171A21] group-hover:text-[#1769FF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed">
                      {service.shortDesc}
                    </p>
                    <div className="text-[11px] sm:text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span className="font-medium text-[#171A21]">Best for:</span> {service.suitableFor}
                    </div>
                  </div>
                </div>

                {/* Card Action (visual only; the whole card is clickable) */}
                <div className="p-4 sm:p-6 pt-0">
                  <span className="w-full py-2.5 px-4 text-xs font-semibold text-[#1769FF] bg-[#EEF5FF] group-hover:bg-[#1769FF] group-hover:text-white rounded-lg transition-all flex items-center justify-center gap-1.5">
                    <span>View Plan Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ============================================================
          F.2 PROCESSES DRAW - 5-STEP TRANSFORMATION DRAWER
          ============================================================ */}
      <section className="py-10 sm:py-16 bg-[#111318] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProcessesDraw onBookDemo={() => onBookDemo('Processes Assessment')} />
        </div>
      </section>


      {/* ============================================================
          G.2 CLIENT FEEDBACK - GLASS REVIEW MARQUEE + VIDEO FEEDBACK MARQUEE
          ============================================================ */}
      <ClientFeedback />


      {/* ============================================================
          G.4 US VS THEM - OBJECTIVE 3-COLUMN COMPARISON TABLE
          ============================================================ */}
      <section className="py-10 sm:py-16 lg:py-20 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UsVsThem onBookDemo={() => onBookDemo('Standard Comparison Evaluation')} />
        </div>
      </section>

      {/* ============================================================
          H. FREE DEMO CTA SECTION (Strong Blue Callout Panel)
          ============================================================ */}
      <section className="py-10 sm:py-16 lg:py-20 bg-[#1769FF] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] sm:text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Kothrud, Pune · Complimentary 1-on-1 Consultation</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white text-balance">
            Ready to Start Your Fitness Journey?
          </h2>

          <p className="text-xs sm:text-base lg:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Tell us about your goals and request a free demo session. Samir and our coaching team will guide you through a personalised assessment.
          </p>

          <div className="pt-2 sm:pt-4 grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
            <button
              onClick={() => onBookDemo()}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-8 py-2 sm:py-3.5 min-h-[40px] sm:min-h-[46px] text-xs sm:text-sm font-bold text-[#1769FF] bg-white hover:bg-slate-100 active:scale-95 rounded-lg sm:rounded-xl shadow-xl transition-all cursor-pointer"
            >
              <span>Book Free Demo</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-7 py-2 sm:py-3.5 min-h-[40px] sm:min-h-[46px] text-xs sm:text-sm font-semibold text-white bg-[#0B3D91] hover:bg-[#072a66] rounded-lg sm:rounded-xl transition-all cursor-pointer"
            >
              <span>Location & Hours</span>
            </button>
          </div>

          <p className="text-[10px] sm:text-xs text-blue-200 pt-1 sm:pt-2">
            *No automated charges or commitments. Flat No. 3, XYZ Apartment, DP Road, Kothrud, Pune.
          </p>
        </div>
      </section>

    </div>
  );
};
