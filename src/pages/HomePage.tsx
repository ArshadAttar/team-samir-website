import React, { useState } from 'react';
import { PageId, TransformationItem } from '../types';
import { BUSINESS_INFO, SERVICES, TRANSFORMATIONS, TEAM_MEMBERS } from '../data/mockData';
import { HeroReveal } from '../components/HeroReveal';
import { CountUpStat } from '../components/CountUpStat';
import { SalePings } from '../components/SalePings';
import { ReviewsShuffle } from '../components/ReviewsShuffle';
import { BentoBuild } from '../components/BentoBuild';
import { ProcessesDraw } from '../components/ProcessesDraw';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { PriceRoll } from '../components/PriceRoll';
import { UsVsThem } from '../components/UsVsThem';
import { WordRotator } from '../components/WordRotator';
import {
  ArrowRight,
  ShieldCheck,
  Dumbbell,
  HeartPulse,
  Apple,
  Users,
  CheckCircle,
  Play,
  Maximize2,
  Calendar,
  Sparkles,
  Award,
  Activity,
  Flame,
  Zap,
  MessageSquare,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onBookDemo: (preselectedService?: string) => void;
  onOpenLightbox: (item: TransformationItem) => void;
  onOpenVideo: (item: TransformationItem) => void;
  highlightPlaceholders: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onBookDemo,
  onOpenLightbox,
  onOpenVideo,
  highlightPlaceholders,
}) => {
  // Copy option selector for design review
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlineOptions = [
    'Transform Your Fitness. Elevate Your Life.',
    'Build Strength. Transform Your Life.',
    'Expert Coaching. Personalised Fitness.',
    'Your Fitness Journey Starts Here.',
  ];

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
              
              {/* Region and Trust Kickoff (No pill badges, clean typography) */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-400">
                <span className="font-semibold text-[#00A3FF] uppercase tracking-wider">
                  Kothrud, Pune
                </span>
                <span aria-hidden="true">·</span>
                <span>Personal Training & Coaching</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">Coach Samir (5 Yrs Exp)</span>
              </div>

              {/* Hero Reveal: Animated sequential word queue reveal */}
              <div>
                <HeroReveal
                  sentence={headlineOptions[headlineIndex]}
                  className="mb-2"
                />

                {/* Prototype Switcher for Headline variations */}
                <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-[11px] text-slate-400">Copy Variations:</span>
                  <div className="flex gap-1.5">
                    {headlineOptions.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setHeadlineIndex(idx)}
                        className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-mono transition-colors cursor-pointer ${
                          headlineIndex === idx
                            ? 'bg-[#1769FF] text-white font-bold'
                            : 'bg-[#1C2028] text-slate-400 hover:text-white'
                        }`}
                        title={`Headline Option ${idx + 1}`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

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
                      src="/src/assets/images/hero_samir_ts_fitness_1792417382753.jpg"
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
          B.2 SALE PINGS & LIVE GROWTH TIMELINE GRAPH (From 2022 to 2026)
          ============================================================ */}
      <section className="py-6 sm:py-10 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SalePings onBookDemo={() => onBookDemo('General Consultation')} />
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
                className="group rounded-2xl overflow-hidden bg-white border border-[#E1E6EF] hover:border-[#1769FF] hover:shadow-lg transition-all flex flex-col justify-between"
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

                {/* Card Action */}
                <div className="p-4 sm:p-6 pt-0">
                  <button
                    onClick={() => onBookDemo(service.title)}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-[#1769FF] bg-[#EEF5FF] hover:bg-[#1769FF] hover:text-white rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Enquire for Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================
          C.2 BENTO BUILD - MODULAR SNAP-IN TILES
          ============================================================ */}
      <section className="py-10 sm:py-16 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BentoBuild onBookDemo={(topic) => onBookDemo(topic)} />
        </div>
      </section>

      {/* ============================================================
          D. MEET SAMIR PREVIEW (Personal Brand & Background)
          ============================================================ */}
      <section className="py-8 sm:py-14 lg:py-20 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Trainer Image Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-white border border-[#E1E6EF] shadow-md">
                <div className="aspect-4/3 relative">
                  <img
                    src="/src/assets/images/hero_trainer_samir_1792415112410.jpg"
                    alt="Samir Trainer Bio Portrait"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-3.5 sm:p-5 bg-white border-t border-[#E1E6EF]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base sm:text-lg font-display font-bold text-[#171A21]">Samir</div>
                      <div className="text-xs text-[#646B78]">Head Fitness Trainer & Coach</div>
                    </div>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#EEF5FF] text-[#1769FF] text-[11px] sm:text-xs font-bold">
                      5 Years Experience
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio & Credentials Content */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-6">
              <div>
                <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-1 sm:mb-2">
                  Meet Your Coach
                </div>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-[#171A21] tracking-tight">
                  Guided by 5 Years of Professional Fitness Experience
                </h2>
              </div>

              <div className="space-y-2.5 sm:space-y-4 text-xs sm:text-sm lg:text-base text-[#646B78] leading-relaxed">
                <p>
                  With half a decade of hands-on coaching, Samir has developed a discipline-first, injury-conscious philosophy designed to help ordinary Pune residents achieve sustainable strength, body recomposition, and energetic vitality.
                </p>
                <p>
                  Having previously trained at <strong className="text-[#171A21]">Fitness Talk</strong>, Samir combines structured progressive overload with tailored form corrections and realistic dietary habits.
                </p>
              </div>

              {/* Supplied Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#E1E6EF] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1769FF]">
                    <CheckCircle className="w-4 h-4 text-[#1769FF]" />
                    <span>250+ Clients Coached</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#646B78]">
                    Client-supplied figure for individuals coached across strength, fat loss, and mobility.
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#E1E6EF] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1769FF]">
                    <Sparkles className="w-4 h-4 text-[#1769FF]" />
                    <span>25+ Celebrity Trainees</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#646B78]">
                    Client-supplied figure; subject to verification prior to public commercial launch.
                  </p>
                </div>
              </div>

              {/* Action to About Page */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-[#111318] hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Read Samir's Full Story & Philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00A3FF]" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          E. TRANSFORMATION PREVIEW (Authentic gallery & case studies)
          ============================================================ */}
      <section className="py-8 sm:py-14 lg:py-20 bg-white border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12">
            <div>
              <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-1 sm:mb-2">
                Client Milestones & Progress
              </div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-[#171A21] tracking-tight">
                Authentic Training Transformations
              </h2>
              <p className="text-[#646B78] text-xs sm:text-base mt-1.5 sm:mt-2 max-w-xl">
                Progress built through consistent gym attendance, movement progression, and balanced nutrition over 12–24 week timelines.
              </p>
            </div>
            <button
              onClick={() => onNavigate('transformations')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1769FF] hover:text-[#0B3D91] transition-colors cursor-pointer shrink-0"
            >
              <span>Explore Full Transformation Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Transformation Cards Preview (3 items) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {TRANSFORMATIONS.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden bg-white border border-[#E1E6EF] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Media Visual with Video / Lightbox trigger */}
                  <div className="aspect-4/3 relative overflow-hidden bg-slate-900 group">
                    <img
                      src={item.afterImg}
                      alt={item.clientNamePlaceholder}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      referrerPolicy="no-referrer"
                    />

                    {/* Overlay action button */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.isVideo ? (
                        <button
                          onClick={() => onOpenVideo(item)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#1769FF] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play Video Breakdown</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenLightbox(item)}
                          className="px-3.5 py-1.5 rounded-lg bg-white text-[#171A21] text-xs font-semibold flex items-center gap-1.5 shadow-lg cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Compare Baseline vs Current</span>
                        </button>
                      )}
                    </div>

                    {/* Timeline Tag */}
                    <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                      {item.duration}
                    </div>

                    {item.isVideo && (
                      <div className="absolute bottom-2.5 right-2.5 bg-[#1769FF] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <Play className="w-3 h-3 fill-current" />
                        <span>VIDEO</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                    <div className="text-[11px] sm:text-xs font-semibold text-[#1769FF]">
                      Focus: {item.focusArea}
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
                      {item.clientNamePlaceholder}
                    </h3>
                    <p className="text-xs text-[#646B78] line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                    <div className="text-xs font-semibold text-[#16834A] pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{item.milestone}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pt-0">
                  <button
                    onClick={() => (item.isVideo ? onOpenVideo(item) : onOpenLightbox(item))}
                    className="w-full py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    {item.isVideo ? 'Watch Coaching Reel' : 'View Case Study Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Disclaimer Banner */}
          <div className="mt-6 p-3 sm:p-4 bg-slate-50 border border-[#E1E6EF] rounded-xl text-xs text-[#646B78] flex items-start gap-2.5 sm:gap-3">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#1769FF] shrink-0 mt-0.5" />
            <p className="text-[11px] sm:text-xs leading-relaxed">
              <strong>Consent & Verification Notice:</strong> Transformation cards use authentic placeholder structures. All client photos and video reels will only be published after obtaining written client consent. No guarantee of identical individual health outcomes.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================
          E.2 BEFORE / AFTER INTERACTIVE WINDOW SLIDER
          ============================================================ */}
      <section className="py-10 sm:py-16 bg-white border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BeforeAfterSlider onBookDemo={() => onBookDemo('Transformation Case Review')} />
        </div>
      </section>

      {/* ============================================================
          F. HOW FITNESS CAN IMPROVE DAILY LIFE (Educational Section)
          ============================================================ */}
      <section className="py-8 sm:py-14 lg:py-20 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-2 sm:space-y-3">
            <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">
              Educational Foundations
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-[#171A21] tracking-tight">
              How Structured Fitness Improves Daily Life
            </h2>
            <p className="text-[#646B78] text-xs sm:text-base">
              Consistent physical exercise produces measurable enhancements in everyday stamina, mental focus, posture, and longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E1E6EF] space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
                Strength & Physical Fitness
              </h3>
              <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed">
                Progressive resistance training strengthens tendons, increases bone mineral density, and makes everyday physical tasks effortless.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E1E6EF] space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
                Mobility & Joint Flexibility
              </h3>
              <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed">
                Counteracts desk-bound posture, relieves lumbar and neck tension, and preserves joint health through full ranges of motion.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E1E6EF] space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
                Energy & Daily Activity
              </h3>
              <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed">
                Cardiovascular conditioning increases mitochondrial efficiency and oxygen delivery, eliminating mid-afternoon energy slumps.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E1E6EF] space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <Apple className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
                Healthy Eating Habits
              </h3>
              <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed">
                Pairing training with balanced macronutrients, dietary protein, and hydration builds sustainable lifestyle habits without starvation diets.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E1E6EF] space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
                Consistency & Sleep Recovery
              </h3>
              <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed">
                Physical exertion synchronizes circadian rhythms, deepening restorative slow-wave sleep and accelerating mental recovery.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E1E6EF] space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
                Confidence & Sustainable Discipline
              </h3>
              <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed">
                Hitting personal milestones in the gym fosters self-efficacy and resilience that directly translates into professional and personal life.
              </p>
            </div>

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
          F.3 WORD ROTATOR - PROMISE BY CLIENT PERSONALITY
          ============================================================ */}
      <section className="py-8 sm:py-14 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WordRotator />
        </div>
      </section>

      {/* ============================================================
          G. MEET THE TEAM PREVIEW (Fitness Coach, Personal Trainer, Nutritionist)
          ============================================================ */}
      <section className="py-8 sm:py-14 lg:py-20 bg-white border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12">
            <div>
              <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-1 sm:mb-2">
                Certified Multidisciplinary Coaching
              </div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-[#171A21] tracking-tight">
                Qualified Fitness Team
              </h2>
              <p className="text-[#646B78] text-xs sm:text-base mt-1.5 sm:mt-2 max-w-xl">
                A dedicated team structure ensuring personalized attention across lifting biomechanics, athletic training, and nutrition.
              </p>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1769FF] hover:text-[#0B3D91] transition-colors cursor-pointer shrink-0"
            >
              <span>View Team Credentials & Roles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E1E6EF] hover:border-[#1769FF] transition-all space-y-3 sm:space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center font-bold text-sm">
                    {member.role === 'Nutritionist' ? <Apple className="w-4 h-4 sm:w-5 sm:h-5" /> : <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {member.role}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
                    {member.namePlaceholder}
                  </h3>
                  <div className="text-xs text-[#1769FF] font-medium mt-0.5">
                    {member.experience}
                  </div>
                </div>

                <p className="text-xs text-[#646B78] leading-relaxed">
                  {member.bioPlaceholder}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Specialties:
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px] sm:text-xs text-slate-700">
                    {member.specialties.join(' · ')}
                  </div>
                </div>

                <div className={`p-2.5 rounded text-[11px] leading-tight ${
                  highlightPlaceholders ? 'bg-amber-50 border border-amber-300 text-amber-900' : 'bg-slate-50 text-slate-500'
                }`}>
                  <strong>Qualification:</strong> {member.qualificationPlaceholder}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================
          G.2 REVIEWS SHUFFLE - LIVE TESTIMONIAL CARD DECK
          ============================================================ */}
      <section className="py-10 sm:py-16 lg:py-20 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2">
            <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">
              Client Feedback & Social Proof
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#171A21] tracking-tight">
              Real Experiences from Pune Trainees
            </h2>
            <p className="text-xs sm:text-base text-[#646B78]">
              Cards self-shuffle automatically every 3.5 seconds. Click to pause or swipe left/right/up/down to browse next stories.
            </p>
          </div>

          <ReviewsShuffle />
        </div>
      </section>

      {/* ============================================================
          G.3 PRICE ROLL - COMMITMENT DISCOUNT ODOMETER
          ============================================================ */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PriceRoll
            onBookDemo={(planTitle, discount) =>
              onBookDemo(`${planTitle} (${discount}% Discount Claimed)`)
            }
          />
        </div>
      </section>

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
