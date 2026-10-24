import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, UserCheck, Flame } from 'lucide-react';

interface PersonalityOption {
  id: string;
  word: string;
  personality: string;
  badge: string;
  promise: string;
  focus: string[];
  color: string;
}

const PERSONALITY_OPTIONS: PersonalityOption[] = [
  {
    id: 'discipline',
    word: 'Discipline & Consistency',
    personality: 'Goal-Driven Professionals',
    badge: 'Habit Mastery',
    promise: 'Eliminate guesswork with calibrated 45-min progressive sessions and daily accountability check-ins.',
    focus: ['Automated habit streaks', 'Structured weekly splits', 'Zero workout skipping'],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'corporate',
    word: 'Busy Corporate Schedule',
    personality: 'IT & Desk Bound Engineers',
    badge: 'Time-Efficient',
    promise: 'High-yield metabolic supersets and posture decompression engineered for 50+ hr seated work weeks in Pune.',
    focus: ['Anterior pelvic tilt correction', '35-min high density sessions', 'Quick desk nutrition'],
    color: 'from-sky-500 to-cyan-600',
  },
  {
    id: 'athletic',
    word: 'Athletic Power & Strength',
    personality: 'Sports Trainees & Heavy Lifters',
    badge: 'Peak Performance',
    promise: 'Barbell biomechanics, CNS neural adaptation, and periodized progressive overload to crush personal bests.',
    focus: ['Clean squat/deadlift form', 'Tendon & ligament resilience', 'Explosive power'],
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'recomposition',
    word: 'Body Recomposition & Fat Loss',
    personality: 'Weight Loss & Toning Seekers',
    badge: 'Transformational',
    promise: 'Precision caloric deficits paired with muscle-sparing resistance training to drop body fat without starvation.',
    focus: ['Ghar-ka-khana macro balance', 'Visceral fat reduction', 'Defined muscle tone'],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'longevity',
    word: 'Lifelong Vitality & Joint Health',
    personality: '35+ & Health-Conscious Adults',
    badge: 'Sustainable Health',
    promise: 'Mobility-first strength programming that protects cartilage, boosts cardiovascular output, and stops chronic back pain.',
    focus: ['Degenerative disc relief', 'Cardiometabolic efficiency', 'Vitality & deep sleep'],
    color: 'from-purple-500 to-violet-600',
  },
];

interface WordRotatorProps {
  onSelectPersonality?: (personalityId: string) => void;
  className?: string;
}

export const WordRotator: React.FC<WordRotatorProps> = ({
  onSelectPersonality,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate every 3.8s
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      triggerNextWord();
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const triggerNextWord = (targetIndex?: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (targetIndex !== undefined ? targetIndex : (prev + 1) % PERSONALITY_OPTIONS.length));
      setIsAnimating(false);
    }, 220);
  };

  const current = PERSONALITY_OPTIONS[currentIndex];

  const handleManualSelect = (idx: number) => {
    triggerNextWord(idx);
    if (onSelectPersonality) {
      onSelectPersonality(PERSONALITY_OPTIONS[idx].id);
    }
  };

  return (
    <div
      className={`rounded-2xl bg-[#111318] border border-slate-800 p-5 sm:p-8 text-white relative overflow-hidden shadow-xl ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#1769FF]/20 via-transparent to-transparent pointer-events-none blur-2xl" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2028] border border-slate-700 text-xs font-semibold text-[#00A3FF]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dynamic Promise Rotator · Tailored by Personality</span>
        </div>
        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-ping'}`} />
          <span>{isPaused ? 'Paused (hovered)' : 'Auto-cycling every 3.8s'}</span>
        </div>
      </div>

      {/* Core Sentence with Rotating Word */}
      <div className="my-4 sm:my-6">
        <span className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-200">
          Personalised coaching engineered around your{' '}
        </span>

        {/* Word Rotator Box */}
        <span className="inline-block relative min-h-[44px] align-baseline">
          <span
            className={`inline-block font-display font-extrabold text-xl sm:text-3xl lg:text-4xl tracking-tight transition-all duration-300 transform px-2 py-0.5 rounded-lg bg-gradient-to-r ${current.color} text-white shadow-lg ${
              isAnimating
                ? 'opacity-0 -translate-y-3 scale-95'
                : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            {current.word}
          </span>
        </span>
      </div>

      {/* Dynamic Promise Reveal Box */}
      <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#1C2028] border border-slate-700/80 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#00A3FF]" />
            <span className="text-xs font-semibold text-slate-300">Client Profile:</span>
            <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
              {current.personality}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            <span>Dedicated Guarantee</span>
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-100 font-medium mt-3 leading-relaxed">
          "{current.promise}"
        </p>

        {/* Focus Pillars */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {current.focus.map((item, fIdx) => (
            <span
              key={fIdx}
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-md bg-black/40 text-slate-300 border border-slate-700"
            >
              <CheckCircle2 className="w-3 h-3 text-[#00A3FF]" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Personality Selector Chips */}
      <div className="mt-6 pt-4 border-t border-slate-800">
        <div className="text-xs text-slate-400 mb-2 font-medium">
          Select your training personality to see your tailored promise:
        </div>
        <div className="flex flex-wrap gap-2">
          {PERSONALITY_OPTIONS.map((opt, idx) => (
            <button
              key={opt.id}
              onClick={() => handleManualSelect(idx)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                currentIndex === idx
                  ? 'bg-white text-[#111318] font-bold shadow-md scale-105'
                  : 'bg-[#1C2028] text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${currentIndex === idx ? 'bg-[#1769FF]' : 'bg-slate-600'}`} />
              <span>{opt.personality}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
