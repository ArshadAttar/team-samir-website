import React, { useState, useEffect } from 'react';
import { BookingIntent, PageId } from '../types';
import { BUSINESS_INFO, STATS, SERVICES } from '../data/mockData';
import { HeroReveal } from '../components/HeroReveal';
import { CountUpStat } from '../components/CountUpStat';
import { ClientFeedback } from '../components/ClientFeedback';
import { ProcessesDraw } from '../components/ProcessesDraw';
import { UsVsThem } from '../components/UsVsThem';
import {
  ArrowRight,
  Calendar,
  Award,
} from 'lucide-react';

const HEADLINE_OPTIONS = [
  'Tired of Counting Calories, 🥗 Boring Salads & Missing Your Masala Food ? 💪 You’re in the Right Place ! 🎯',
  'Bored of counting 1, 2, 3, 4 during workouts ? 🥱💪  It’s time to train smarter with the right techniques.',
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
  onBookDemo: (intent?: string | BookingIntent) => void;
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
  // Rotation pauses while the user hovers the headline so they can read it in full
  const [isHeadlinePaused, setIsHeadlinePaused] = useState(false);

  useEffect(() => {
    if (isHeadlinePaused) return;
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINE_OPTIONS.length);
    }, HEADLINE_ROTATE_MS);
    return () => clearInterval(timer);
  }, [isHeadlinePaused]);

  return (
    <div className="space-y-0">
      {/* ============================================================
          A. HERO SECTION (White, Black, Blue with subtle 3D depth)
          ============================================================ */}
      <section className="relative overflow-hidden bg-[#111318] text-white pt-6 pb-8 sm:pt-10 sm:pb-12 lg:py-14 border-b border-[#1C2028]">
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

              {/* Hero headline: rotates automatically with a word-by-word reveal; pauses on hover */}
              <div
                onMouseEnter={() => setIsHeadlinePaused(true)}
                onMouseLeave={() => setIsHeadlinePaused(false)}
              >
                <HeroReveal sentence={HEADLINE_OPTIONS[headlineIndex]} />
              </div>

              {/* Supporting Copy */}
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl">
Live 1-on-1 personal training worldwide and at your home or gym in Pune. Certified coaches, personalized workouts, Indian meal plans, and daily support.
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
                    <span className="text-white font-semibold">{BUSINESS_INFO.experienceYears}+ Years Experience</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-white font-semibold">{BUSINESS_INFO.clientsTrained} Clients</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-white font-semibold">{BUSINESS_INFO.celebritiesTrained} Celebrities</span>
                  </div>
                  <Award className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5 sm:mt-0" />
                </div>
                <p className="text-[length:max(10px,calc(10rem/16))] sm:text-[length:max(11px,calc(11rem/16))] text-slate-400 mt-1">
                  {BUSINESS_INFO.experienceYears}+ years of hands-on coaching in Pune, guiding {BUSINESS_INFO.clientsTrained} clients and {BUSINESS_INFO.celebritiesTrained} celebrities with K11-certified methods.
                </p>
              </div>

              {/* 2 Primary CTAs (2-column side-by-side on mobile); WhatsApp is the floating icon */}
              <div className="pt-1 grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
                <button
                  onClick={() => onBookDemo({ kind: 'trial' })}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3.5 min-h-[40px] sm:min-h-[46px] text-xs sm:text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#00A3FF] active:scale-[0.98] rounded-lg sm:rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">Book Trial – INR 1,999</span>
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 py-2 sm:px-5 sm:py-3 min-h-[40px] sm:min-h-[46px] text-xs sm:text-sm font-semibold text-white bg-[#1C2028] hover:bg-slate-800 border border-slate-700 rounded-lg sm:rounded-xl transition-all cursor-pointer"
                >
                  <span>Explore Training</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00A3FF]" />
                </button>
              </div>
            </div>

            {/* Right Column: 3D-styled Photographic Presentation (Real Samir in TS Fitness) */}
            <div className="lg:col-span-5 relative flex justify-center">
              
              {/* 3D Visual Depth Canvas Frame */}
              <div className="relative w-full max-w-md">
                
                {/* 3D sculptural background geometry */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#1769FF]/30 via-transparent to-[#00A3FF]/20 rounded-3xl transform -rotate-2 blur-sm" />
                
                {/* Main Card with Trainer Portrait in TS Fitnes Gym */}
                <div className="group relative rounded-2xl overflow-hidden bg-[#1C2028] border border-slate-700/80 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-[1.01]">
                  <div className="aspect-16/10 sm:aspect-4/3 lg:aspect-4/3 @container relative overflow-hidden bg-black flex flex-col items-center justify-center gap-2 sm:gap-4 px-3">
                    {/* Logo mark: fixed-height box crops the empty black padding above and below the icon */}
                    <img decoding="async"
                      src="/images/logo/logo-black.webp"
                      alt="TeamSamir logo - TS Fitness Pune"
                      className="w-48 h-28 sm:w-72 sm:h-44 object-cover object-center shrink-0 transition-transform duration-500 ease-out group-hover:scale-120"
                      referrerPolicy="no-referrer"
                    />

                    {/* Identity text, centred under the logo with a soft glow */}
                    <div className="relative z-10 text-white text-center">
                      {/* <div className="text-xs font-semibold text-[#00A3FF] uppercase tracking-wider flex items-center gap-1.5">
                        <span>TS Fitness Pune</span>
                        <span className="text-slate-500">·</span>
                        <span>TeamSamir</span>
                      </div> */}
                      {/* Single line: font size scales with the card width (cqw) so it never wraps */}
                      <div className="whitespace-nowrap text-[clamp(0.9rem,4.8cqw,1.75rem)] font-display font-extrabold [text-shadow:0_2px_10px_rgba(0,163,255,0.2)] transition-[text-shadow] duration-500 group-hover:[text-shadow:0_0_12px_rgba(0,163,255,0.45)]">
                        Experience Fitness Like Never Before
                      </div>
                      {/* <div className="text-xs text-slate-300 mt-0.5">
                        {BUSINESS_INFO.experienceYears}+ Years Experience · {BUSINESS_INFO.clientsTrained} Clients · Kothrud, Pune
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Layered Location Badge */}
                {/* <div className="hidden sm:flex absolute -top-4 -left-4 bg-[#111318]/95 backdrop-blur-md border border-slate-700 px-3.5 py-2 rounded-xl shadow-xl items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16834A]" />
                  <span className="text-xs font-medium text-slate-200">Kothrud</span>
                </div> */}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          B. TRUST AND EXPERIENCE STRIP (Count-Up Stats with Live Increments)
          ============================================================ */}
      <section className="bg-white border-b border-[#E1E6EF] py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            
            <CountUpStat
              end={STATS.years}
              suffix="+"
              label="Years Experience"
              sublabel="Coaching in Pune"
              className="bg-[#EEF5FF] border border-[#E1E6EF] text-center"
              valueClassName="text-[#1769FF]"
            />

            <CountUpStat
              end={STATS.clients}
              suffix="+"
              label="Clients Trained"
              sublabel="*Client-supplied"
              className={`border text-center ${
                highlightPlaceholders ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-[#E1E6EF]'
              }`}
              valueClassName="text-[#111318]"
            />

            <CountUpStat
              end={STATS.celebrities}
              suffix="+"
              label="Celebrities Trained"
              sublabel="*Client-supplied · Actors & VIPs"
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
      <section className="pt-5 pb-8 sm:pt-6 sm:pb-12 lg:pt-8 lg:pb-14 bg-white border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div>
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
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#E1E6EF] hover:border-[#1769FF] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] transition-all flex flex-col"
              >
                <div>
                  {/* Card Image */}
                  <div className="aspect-4/3 relative overflow-hidden bg-slate-100">
                    <img loading="lazy" decoding="async"
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[length:max(11px,calc(11rem/16))] px-2.5 py-1 rounded-md font-medium">
                      {service.format}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6 pb-3 sm:pb-4 space-y-2.5 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-display font-bold text-[#171A21] group-hover:text-[#1769FF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed">
                      {service.shortDesc}
                    </p>
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
      <section className="py-8 sm:py-12 bg-[#111318] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProcessesDraw onBookDemo={() => onBookDemo({ kind: 'all', heading: 'Start Phase 01 Assessment' })} />
        </div>
      </section>


      {/* ============================================================
          G.2 CLIENT FEEDBACK - GLASS REVIEW MARQUEE + VIDEO FEEDBACK MARQUEE
          ============================================================ */}
      <ClientFeedback />


      {/* ============================================================
          G.4 US VS THEM - OBJECTIVE 3-COLUMN COMPARISON TABLE
          ============================================================ */}
      <section className="py-8 sm:py-12 lg:py-14 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UsVsThem onBookDemo={() => onBookDemo({ kind: 'all', heading: 'Book Your Free Assessment Demo' })} />
        </div>
      </section>

      {/* ============================================================
          H. FREE DEMO CTA SECTION (Strong Blue Callout Panel)
          ============================================================ */}
      <section className="py-8 sm:py-12 lg:py-14 bg-[#1769FF] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[length:max(11px,calc(11rem/16))] sm:text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Kothrud, Pune · Complimentary 1-on-1 Consultation</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white text-balance">
            Ready to Start Your Fitness Journey?
          </h2>

          <p className="text-xs sm:text-base lg:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Tell us about your goals and request a free Consultation. Our Experts will guide you through a personalised assessment.
          </p>

          <div className="pt-2 sm:pt-4 grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
            <button
              onClick={() => onBookDemo({ kind: 'all', heading: 'Book Your Free Demo' })}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-8 py-2 sm:py-3.5 min-h-[40px] sm:min-h-[46px] text-xs sm:text-sm font-bold text-[#1769FF] bg-white hover:bg-slate-100 active:scale-95 rounded-lg sm:rounded-xl shadow-xl transition-all cursor-pointer"
            >
              <span>Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
