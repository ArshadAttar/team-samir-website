import React from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO, STATS, CERTIFICATIONS } from '../data/mockData';
import { CountUpStat } from '../components/CountUpStat';
import { ProcessesDraw } from '../components/ProcessesDraw';
import {
  Target,
  Compass,
  Award,
  ArrowRight,
  Dumbbell,
  Apple,
  FileCheck2,
  Calendar,
  Sparkles,
  Info,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onBookDemo: () => void;
  highlightPlaceholders: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onBookDemo,
  highlightPlaceholders,
}) => {
  return (
    <div className="bg-white">
      {/* 1. Page Hero */}
      <section className="bg-[#111318] text-white py-8 sm:py-12 lg:py-14 border-b border-[#1C2028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2.5 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 gap-y-0.5 text-[length:max(11px,calc(11rem/16))] sm:text-xs font-semibold text-[#00A3FF] uppercase tracking-wider [&>span]:whitespace-nowrap">
              <span>Personal Brand & Background</span>
              <span className="text-slate-500">·</span>
              <span>Kothrud, Pune</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
              Meet Samir — Your Fitness Journey, Guided by Experience.
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed">
              {BUSINESS_INFO.experienceYears}+ years of dedicated coaching, a disciplined training methodology, and an unwavering commitment to safe, sustainable physical progress in Pune.
            </p>
          </div>
        </div>
      </section>

      {/* 2 & 3. Large Owner Portrait & Professional Introduction */}
      <section className="py-8 sm:py-12 lg:py-14 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            
            {/* Owner Portrait Column */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-[#E1E6EF] shadow-lg relative aspect-16/10 sm:aspect-4/3 lg:aspect-4/3">
                <img
                  src="/images/hero_samir_ts_fitness_1792417382753.jpg"
                  alt="TeamSamir - Founder & Head Coach at TS Fitness"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl bg-black/85 backdrop-blur-md text-white border border-slate-700">
                  <div className="text-[length:max(11px,calc(11rem/16))] sm:text-xs text-[#00A3FF] font-semibold uppercase">TS Fitness Founder & Head Coach</div>
                  <div className="text-lg sm:text-xl font-display font-bold">TeamSamir</div>
                  <div className="text-[length:max(11px,calc(11rem/16))] sm:text-xs text-slate-300">{BUSINESS_INFO.experienceYears}+ Years Professional Experience · Kothrud, Pune</div>
                </div>
              </div>

              {/* Verified Employment Strip */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#EEF5FF] border border-[#E1E6EF] text-xs text-[#171A21]">
                <div>
                  <span className="text-[#646B78]">Coaching Timeline:</span>
                  <div className="font-semibold text-xs sm:text-sm">{BUSINESS_INFO.experienceYears}+ Years In Industry</div>
                </div>
              </div>
            </div>

            {/* Professional Biography */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div>
                <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-1">
                  Introduction & Background
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
                  Discipline, Technique, and Sustainable Progress
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm lg:text-base text-[#646B78] leading-relaxed">
                <p>
                  Samir began his coaching career driven by a desire to bring structured, evidence-guided fitness training to Pune. Over five years in the fitness industry, including hands-on tenure at Fitness Talk, he has coached individuals across diverse backgrounds, from desk workers managing spinal fatigue to competitive performers.
                </p>
                <p>
                  Rather than prescribing extreme routines or crash cleanses, Samir emphasizes foundational lifting mechanics, progressive overload, and realistic Indian nutrition. Every training split is customized according to the client's current baseline, anatomical levers, and daily commitments.
                </p>
              </div>

              {/* 6 & 7. Clients and Celebrities Trained (numbers come from STATS in mockData) (Count-Up Stats side-by-side in 2 columns on mobile) */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <CountUpStat
                  end={STATS.clients}
                  suffix="+"
                  label="Clients Coached"
                  sublabel="*Client-supplied records"
                  className={highlightPlaceholders ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-[#E1E6EF]'}
                  valueClassName="text-[#1769FF]"
                />

                <CountUpStat
                  end={STATS.celebrities}
                  suffix="+"
                  label="Celebrity Trainees"
                  sublabel="*Camera-ready regimens"
                  badge="Elite"
                  className={highlightPlaceholders ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-[#E1E6EF]'}
                  valueClassName="text-[#111318]"
                />
              </div>

              {/* 8. Training Philosophy */}
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

            </div>

          </div>
        </div>
      </section>

      {/* 9. Vision, Mission, and Goals */}
      <section className="py-8 sm:py-12 lg:py-14 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
            <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">
              Brand Principles (Proposed Draft)
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
              Vision, Mission & Goals
            </h2>
            <p className="text-xs text-[#646B78]">
              Proposed strategic draft for TeamSamir fitness practice in Pune.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Vision */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl border border-[#E1E6EF] space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-[#171A21]">Our Vision</h3>
              <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed italic border-l-2 border-[#1769FF] pl-3 sm:pl-4">
                "To help people build a stronger, healthier, and more confident lifestyle through consistent training and practical fitness education."
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl border border-[#E1E6EF] space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center">
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-[#171A21]">Our Mission</h3>
              <p className="text-xs sm:text-sm text-[#646B78] leading-relaxed italic border-l-2 border-[#1769FF] pl-3 sm:pl-4">
                "To provide personalised coaching, structured training, and supportive guidance that help each client progress towards realistic fitness goals."
              </p>
            </div>
          </div>

          {/* 5 Core Goals */}
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

        </div>
      </section>

      {/* 11. Qualifications */}
      <section className="py-8 sm:py-12 lg:py-14 bg-slate-50 border-b border-[#E1E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">

          <div>
            <div className="text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-1">
              Qualifications
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#171A21] tracking-tight">
              Certifications & Qualifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E1E6EF] flex items-start gap-3 sm:gap-4 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF5FF] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#1769FF]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-display font-bold text-[#171A21]">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#646B78] mt-1 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. CTA to book a free demo */}
      <section className="py-8 sm:py-12 bg-[#111318] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
            Work Directly with TeamSamir in Pune
          </h2>
          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Book an initial 1-on-1 demo session to discuss your movement history, body composition targets, and tailored workout plan.
          </p>
          <div className="pt-2">
            <button
              onClick={onBookDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#00A3FF] rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book My Free Demo Session</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
