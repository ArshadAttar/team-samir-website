import React from 'react';
import { BUSINESS_INFO } from '../data/mockData';
import { X, Check, ShieldCheck, ArrowRight } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  othersText: string;
  usText: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: '1-on-1 Biomechanics & Rep Supervision',
    othersText: 'Trainers glued to their phones or casually managing 8–10 people at once',
    usText: 'Undivided 1-on-1 attention from TeamSamir Coach on every set, tempo, and bar path',
  },
  {
    feature: 'Indian Household Nutrition Coaching',
    othersText: 'Impractical generic PDF diet sheets, boiled chicken, or severe starvation',
    usText: 'Macro-calibrated roti, dal, paneer & eggs with daily WhatsApp plate audits',
  },
  {
    feature: 'Workout planning & Tracking',
    othersText: 'One-size-fits-all workout PDFs, random sets and reps, and no proper progress tracking.',
    usText: `Science-backed workout programming, personalised intensity, weekly progress tracking, and expert coaching.`,
  },
  {
    feature: 'Relentless Daily Accountability',
    othersText: 'You miss workouts, ignore your diet, and nobody follows up—even after you will paid for the month.',
    usText: 'Every single meal and workout is tracked with daily accountability, proactive follow-ups, and a coach available whenever you need guidance or support.',
  },
  {
    feature: 'Trainer Track Record & Pedigree',
    othersText: 'Fresh weekend-certified interns who quit or rotate after 60 days',
    usText: `${BUSINESS_INFO.experienceYears}+ Years proven experience, ${BUSINESS_INFO.clientsTrained} clients transformed, ${BUSINESS_INFO.celebritiesTrained} celebrities coached`,
  },
  {
    feature: 'Spinal Posture & Joint Injury Safety',
    othersText: 'Reckless ego lifting that triggers lumbar slip, shoulder impingement, and knee strain',
    usText: 'Pre-workout joint lubrication, thoracic extension, and anterior pelvic tilt correction',
  }
];

interface UsVsThemProps {
  onBookDemo?: () => void;
  className?: string;
}

export const UsVsThem: React.FC<UsVsThemProps> = ({ onBookDemo, className = '' }) => {
  return (
    <div className={`space-y-6 sm:space-y-8 ${className}`}>
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#171A21] tracking-tight">
        Other Platforms vs TeamSamir
        </h2>

      </div>

      {/* 3-COLUMN COMPARISON TABLE */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-[#E1E6EF] shadow-lg overflow-hidden">
        
        {/* Table Header Row (Desktop & Tablet) */}
        <div className="grid grid-cols-12 bg-[#111318] text-white p-3.5 sm:p-5 items-center border-b border-slate-800">
          <div className="col-span-12 sm:col-span-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
            Training Criteria / Features
          </div>
          <div className="hidden sm:block sm:col-span-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-400 text-center">
          Other Platforms & commercial Gyms
          </div>
          <div className="hidden sm:block sm:col-span-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400 text-center">
            TeamSamir
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100">
          {COMPARISON_DATA.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 p-4 sm:p-5 items-center gap-3 sm:gap-4 transition-colors ${
                idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
              } hover:bg-blue-50/30`}
            >
              {/* Column 1: Feature / Criteria */}
              <div className="col-span-12 sm:col-span-4 space-y-0.5">
                <div className="text-xs sm:text-sm font-display font-bold text-[#171A21]">
                  {row.feature}
                </div>
              </div>

              {/* Comparison Cards (Side-by-side 2-col on viewports >= 400px, 3-col on desktop) */}
              <div className="col-span-12 sm:col-span-8 grid grid-cols-1 min-[380px]:grid-cols-2 gap-2 sm:gap-4 items-stretch">
                {/* Column 2: Others (Red Cross in Circle) */}
                <div className="flex items-start gap-2 p-2.5 sm:p-2 rounded-xl sm:rounded-none bg-rose-50/70 sm:bg-transparent border sm:border-0 border-rose-200">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 border border-rose-300 shadow-2xs">
                    <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                  <div className="text-xs text-rose-950 font-medium leading-relaxed">
                    <span className="sm:hidden font-bold text-rose-800 block text-[length:max(10px,calc(10rem/16))] uppercase">
                      Commercial Gyms:
                    </span>
                    {row.othersText}
                  </div>
                </div>

                {/* Column 3: TS Fitness (Green Check in Circle) */}
                <div className="flex items-start gap-2 p-2.5 sm:p-2 rounded-xl sm:rounded-none bg-emerald-50/80 sm:bg-emerald-50/40 border sm:border-0 border-emerald-200">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300 shadow-2xs">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                  <div className="text-xs text-emerald-950 font-semibold leading-relaxed">
                    <span className="sm:hidden font-bold text-emerald-800 block text-[length:max(10px,calc(10rem/16))] uppercase">
                      TS Fitness:
                    </span>
                    {row.usText}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer Action */}
        <div className="bg-slate-50 p-4 sm:p-6 border-t border-[#E1E6EF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#646B78]">
            <ShieldCheck className="w-4 h-4 text-[#1769FF] shrink-0" />
            <span>
              Experience the difference yourself before committing. No sales pressure.
            </span>
          </div>

          {onBookDemo && (
            <button
              onClick={onBookDemo}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#00A3FF] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
            >
              <span>Book Your Free Assessment Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
