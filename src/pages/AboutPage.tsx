import React from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO, STATS, CERTIFICATIONS } from '../data/mockData';
import { CountUpStat } from '../components/CountUpStat';
import { LazyVideo } from '../components/LazyVideo';
import {
  Target,
  Compass,
  Award,
  Calendar,
  GraduationCap,
  Apple,
  BadgeCheck,
  ShieldCheck,
  PersonStanding,
  HeartPulse,
  Quote,
  type LucideIcon,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onBookDemo: () => void;
  highlightPlaceholders: boolean;
}

// About video plays only this segment (seconds), looping: 2s → 7s = 5s clip
const ABOUT_VIDEO_START = 2;
const ABOUT_VIDEO_END = 7;

// Icon for each certification card (keyed by CERTIFICATIONS id in mockData)
const CERT_ICONS: Record<string, LucideIcon> = {
  'cert-1': GraduationCap,
  'cert-2': Apple,
  'cert-3': BadgeCheck,
  'cert-4': Award,
  'cert-5': ShieldCheck,
  'cert-6': PersonStanding,
  'cert-7': HeartPulse,
};

export const AboutPage: React.FC<AboutPageProps> = ({
  onBookDemo,
  highlightPlaceholders,
}) => {
  const statCardClass = `h-full flex flex-col justify-center text-center border ${
    highlightPlaceholders ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-[#E1E6EF]'
  }`;

  return (
    <div className="bg-white">
      {/* 1. Page Hero */}
      <section className="bg-[#111318] text-white py-[1.6rem] sm:py-[2.4rem] lg:py-[2.8rem] border-b border-[#1C2028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2.5 sm:space-y-4">
            <h1 className="text-xl sm:text-[length:clamp(1.25rem,3.4vw,2.75rem)] sm:whitespace-nowrap font-display font-extrabold tracking-tight text-white leading-tight">
              Meet Samir — Founder & Head Coach of{' '}
              <span className="text-[#1769FF] font-black">TeamSamir</span>
            </h1>
            <p className="max-w-3xl text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed">
              {BUSINESS_INFO.experienceYears}+ years of dedicated coaching, a disciplined training methodology, and an unwavering commitment to safe, sustainable physical progress.
            </p>
          </div>
        </div>
      </section>

      {/* 2 & 3. Owner Portrait, Introduction, Story and Stats */}
      <section className="pt-6 sm:pt-10 lg:pt-12 pb-4 sm:pb-5 lg:pb-6 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6 lg:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">

            {/* Left: Owner Portrait */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-[#E1E6EF] shadow-lg relative aspect-[400/363] sm:aspect-[1000/1089]">
                <LazyVideo
                  src="/videos/about-samir/about-page.mp4"
                  poster="/images/hero_samir_ts_fitness_1792417382753.webp"
                  autoPlay
                  muted
                  loop
                  playsInline
                  // Play only the ABOUT_VIDEO_START–ABOUT_VIDEO_END segment, on loop
                  onLoadedMetadata={(e) => {
                    e.currentTarget.currentTime = ABOUT_VIDEO_START;
                  }}
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (v.currentTime >= ABOUT_VIDEO_END || v.currentTime < ABOUT_VIDEO_START) {
                      v.currentTime = ABOUT_VIDEO_START;
                      if (v.paused) v.play().catch(() => undefined);
                    }
                  }}
                  aria-label="TeamSamir - Founder & Head Coach at TS Fitness"
                  className="w-full h-full object-cover object-[center_10%]"
                />

              </div>
            </div>

            {/* Right: Introduction (4 paragraphs) */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <div>
                <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-1">
                  Introduction & Background
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
                  Discipline, Technique, and Sustainable Progress
                </h2>
              </div>

              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm lg:text-base text-[#646B78] leading-relaxed">
                <p>
                  With <strong className="font-bold text-[#171A21]">{BUSINESS_INFO.experienceYears}+ years of experience in the fitness industry, {STATS.celebrities}+ celebrities trained, and {STATS.clients}+ successful client transformations</strong>, Samir has built his career around helping individuals achieve meaningful, sustainable fitness results.
                </p>
                <p>
                  Before founding <strong className="font-bold text-[#171A21]">Team Samir, he spent over 2.5 years as a Premium Fitness Coach at FitnessTalks</strong>, where he gained valuable experience working with clients from diverse backgrounds, fitness levels, and lifestyles.
                </p>
                <p>
                  Throughout his journey, Samir has worked with celebrities, content creators, working professionals, and everyday individuals, helping them overcome fitness challenges through personalized workout programs, practical nutrition guidance, and consistent accountability.
                </p>
                

                                <p>
                  Driven by his passion for making professional fitness coaching more accessible, Samir founded <strong className="font-bold text-[#171A21]">Team Samir</strong> with a clear vision — to deliver personalized, results-driven coaching that goes beyond generic workout plans and restrictive diets.
                </p>

              </div>
            </div>
          </div>

          {/* Bottom: full-width story band */}
          <div className="rounded-2xl bg-[#EEF5FF] border border-[#E1E6EF] p-3 sm:p-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-center">
              <div className="lg:col-span-7 space-y-2 text-xs sm:text-sm lg:text-base text-[#646B78] leading-relaxed">
                <p>
                  His coaching philosophy is simple: <strong className="font-bold text-[#171A21]">Fitness should fit into your lifestyle, not force you to change your entire life.</strong>
                </p>
                <p>
                  Today, as Founder & Head Coach, he continues to lead Team Samir with a commitment to expert guidance, genuine client relationships, and long-term transformations.
                </p>
              </div>
              <figure className="lg:col-span-5 bg-white rounded-xl border border-[#E1E6EF] px-3 py-2.5 sm:px-4 sm:py-3 shadow-xs">
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#1769FF] shrink-0 mt-0.5" />
                  <blockquote className="text-xs sm:text-sm lg:text-base font-display font-semibold text-[#171A21] leading-snug italic">
                    "My goal isn't just to help you transform your body — it's to help you build a healthier, stronger, and more confident version of yourself."
                  </blockquote>
                </div>
                <figcaption className="mt-1.5 pl-7 sm:pl-8.5 text-[length:max(11px,calc(11rem/16))] sm:text-xs text-[#646B78]">
                  — <span className="font-semibold text-[#1769FF]">Samir</span>, Founder & Head Coach, Team Samir
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Stats: Coaching Timeline, Clients Coached, Celebrity Trainees (equal size, one line) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 items-stretch">
            <CountUpStat
              end={STATS.years}
              suffix="+"
              label="Coaching Timeline"
              sublabel="Years In Industry"
              className={statCardClass}
              valueClassName="text-[#1769FF]"
            />
            <CountUpStat
              end={STATS.clients}
              suffix="+"
              label="Clients Coached"
              sublabel="*Client-supplied records"
              className={statCardClass}
              valueClassName="text-[#1769FF]"
            />
            <CountUpStat
              end={STATS.celebrities}
              suffix="+"
              label="Celebrity Trainees"
              sublabel="*Camera-ready regimens"
              badge="Elite"
              className={statCardClass}
              valueClassName="text-[#111318]"
            />
          </div>

          {/* 8. Training Philosophy (hidden for now)
          <div className="pt-3 border-t border-[#E1E6EF] space-y-2.5">
            <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
              Training Philosophy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#EEF5FF] border border-[#E1E6EF]">
                <span className="font-bold text-[#1769FF] block mb-1">1. Mechanics First</span>
                <span className="text-[#646B78] text-[length:max(11px,calc(11rem/16))] sm:text-xs">Strict posture and joint alignment before increasing load weights.</span>
              </div>
              <div className="p-3 rounded-lg bg-[#EEF5FF] border border-[#E1E6EF]">
                <span className="font-bold text-[#1769FF] block mb-1">2. Consistency First</span>
                <span className="text-[#646B78] text-[length:max(11px,calc(11rem/16))] sm:text-xs">Sustainable 4-day workouts consistently beat sporadic burnout sessions.</span>
              </div>
              <div className="p-3 rounded-lg bg-[#EEF5FF] border border-[#E1E6EF]">
                <span className="font-bold text-[#1769FF] block mb-1">3. Realistic Diet</span>
                <span className="text-[#646B78] text-[length:max(11px,calc(11rem/16))] sm:text-xs">Practical Indian meal balance with adequate protein, hydration, and sleep.</span>
              </div>
            </div>
          </div>
          */}
        </div>
      </section>

      {/* 9. Vision & Mission */}
      <section className="pt-4 sm:pt-5 lg:pt-6 pb-6 sm:pb-10 lg:pb-12 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">

          <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
              Vision, Mission & Goals
            </h2>
            <p className="text-xs text-[#646B78]">
              Proposed strategic draft for TeamSamir fitness practice in Pune.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Vision */}
            <div className="bg-white p-3 sm:p-4 lg:p-5 rounded-2xl border border-[#E1E6EF] space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">Our Vision</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed italic border-l-2 border-[#1769FF] pl-3">
                "To help people build a stronger, healthier, and more confident lifestyle through consistent training and practical fitness education."
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-3 sm:p-4 lg:p-5 rounded-2xl border border-[#E1E6EF] space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">Our Mission</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed italic border-l-2 border-[#1769FF] pl-3">
                "To provide personalised coaching, structured training, and supportive guidance that help each client progress towards realistic fitness goals."
              </p>
            </div>
          </div>

          {/* 5 Core Strategic Goals (hidden for now)
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl border border-[#E1E6EF] space-y-4">
            <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
              Core Strategic Goals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {[
                { title: 'Consistency & Discipline', desc: 'Instill steady weekly training habits that fit seamlessly into busy professional lives.' },
                { title: 'Sustainable Habits', desc: 'Move clients away from crash transformations towards lifetime movement adherence.' },
                { title: 'Strength & Mobility', desc: 'Develop balanced muscular strength and full joint range of motion.' },
                { title: 'Practical Nutrition', desc: 'Demystify macronutrients and protein in everyday Indian cooking.' },
                { title: 'Supportive Experience', desc: 'Provide an encouraging, judgement-free 1-on-1 coaching environment.' },
              ].map((g, idx) => (
                <div key={idx} className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="w-6 h-6 rounded-md bg-[#1769FF] text-white text-[length:max(11px,calc(11rem/16))] font-bold flex items-center justify-center font-mono">
                    0{idx + 1}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#171A21]">{g.title}</h4>
                  <p className="text-[length:max(11px,calc(11rem/16))] sm:text-xs text-[#646B78] leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
          */}

        </div>
      </section>

      {/* 11. Qualifications — certifications held by Samir, Head Coach */}
      <section className="py-6 sm:py-10 lg:py-12 bg-linear-to-b from-[#EEF5FF] to-white border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-8">

          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-1.5">
              <Award className="w-4 h-4" />
              Qualifications
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
              Certifications & Qualifications
            </h2>
            <p className="text-xs sm:text-sm text-[#646B78] mt-1">
              Professional certifications earned by Samir, Founder & Head Coach.
            </p>
          </div>

          {/* 7 achievement badges: 4 + 3 centred on desktop, 2 per row on tablet */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {CERTIFICATIONS.map((cert, idx) => {
              const Icon = CERT_ICONS[cert.id] ?? Award;
              return (
                <div
                  key={cert.id}
                  className="group relative w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-white rounded-2xl border border-[#E1E6EF] overflow-hidden shadow-xs hover:-translate-y-1 hover:shadow-lg hover:border-[#1769FF]/40 transition-all"
                >
                  {/* Top accent ribbon */}
                  <div className="h-1.5 bg-linear-to-r from-[#1769FF] to-[#00A3FF]" />

                  {/* Corner number */}
                  <span className="absolute top-3 right-3 text-[length:max(11px,calc(11rem/16))] font-mono font-bold text-slate-300 group-hover:text-[#1769FF] transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="p-4 sm:p-5 flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2.5">
                    {/* Medal-style icon */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#1769FF] to-[#00A3FF] text-white flex items-center justify-center ring-4 ring-[#EEF5FF] shadow-md">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white">
                        <BadgeCheck className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-display font-bold text-[#171A21] leading-snug pr-6 sm:pr-0">
                        {cert.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#646B78] mt-1 leading-relaxed">
                        {cert.description}
                      </p>
                      <span className="hidden sm:inline-flex mt-3 items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[length:max(11px,calc(11rem/16))] font-semibold uppercase tracking-wide">
                        <ShieldCheck className="w-3 h-3" />
                        Certified
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
};
