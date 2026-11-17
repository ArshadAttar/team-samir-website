import React, { useState, useEffect, useRef } from 'react';
import {
  MessagesSquare,
  ClipboardList,
  Salad,
  Dumbbell,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface ProcessStep {
  id: number;
  phase: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    phase: '01',
    title: 'Free Consultation & Goal Discussion',
    icon: <MessagesSquare className="w-5 h-5 text-[#00A3FF]" />,
    description:
      'Connect with our fitness expert to discuss your goals, fitness history, lifestyle, and challenges. We will help you choose the right coaching plan for your needs.',
  },
  {
    id: 2,
    phase: '02',
    title: 'Enrollment & Health Screening',
    icon: <ClipboardList className="w-5 h-5 text-[#1769FF]" />,
    description: 'Get enrolled and complete your fitness profile, including an enrollment form and PAR-Q health questionnaire, to help us understand your needs and any health considerations.',
  },
  {
    id: 3,
    phase: '03',
    title: 'Meet Your Coach & Nutrition Planning',
    icon: <Salad className="w-5 h-5 text-[#16834A]" />,
    description: 'Get matched with your personal coach for a detailed nutrition consultation. Receive a customized meal plan based on your food preferences, lifestyle, and fitness goals.',
  },
  {
    id: 4,
    phase: '04',
    title: 'Live Fitness Assessment & Training',
    icon: <Dumbbell className="w-5 h-5 text-purple-500" />,
    description: 'Start with a live fitness assessment where your coach evaluates your fitness level, mobility, and strength to design a personalized workout plan and begin your training.',
  },
  {
    id: 5,
    phase: '05',
    title: 'Ongoing Support & Progress Tracking',
    icon: <TrendingUp className="w-5 h-5 text-amber-500" />,
    description: 'Stay consistent with regular coaching, nutrition guidance, workout tracking, and progress reviews. See how far you will come after your first 30 days and keep working towards your goals.',
  },
];

interface ProcessesDrawProps {
  className?: string;
  onBookDemo?: () => void;
}

/**
 * Vertical, scroll-driven timeline: the line fills as the user scrolls,
 * and the card whose circle has passed the middle of the viewport becomes active.
 */
export const ProcessesDraw: React.FC<ProcessesDrawProps> = ({ className = '', onBookDemo }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;

      const viewportMid = window.innerHeight * 0.5;
      const rect = track.getBoundingClientRect();
      const ratio = (viewportMid - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, ratio)));

      let current = 0;
      stepRefs.current.forEach((el, idx) => {
        if (el && el.getBoundingClientRect().top <= viewportMid) current = idx;
      });
      setActiveStep(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`rounded-2xl bg-[#111318] text-white border border-slate-800 p-5 sm:p-8 shadow-xl ${className}`}>
      {/* Header */}
      <div className="pb-5 border-b border-slate-800 lg:text-center">
        <h2 className="text-xl sm:text-3xl font-display font-extrabold text-white">
         Your Transformation Journey in 5 Simple Steps
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl lg:mx-auto">
          Explore each step and see how small efforts create lasting transformation.
        </p>
      </div>

      {/*
        Zig-zag timeline. Mobile: line on the left, cards stacked.
        Desktop (lg): line in the centre, cards alternate left / right and overlap
        vertically (negative top margin) so three cards fit on one screen.
        The overlap must stay below half a card's height, or same-side cards collide;
        the lg:min-h on each card guarantees that.
      */}
      <div ref={trackRef} className="relative mt-6">
        {/* Background line */}
        <div
          className="absolute left-[18px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-1 rounded-full bg-slate-800"
          aria-hidden="true"
        />
        {/* Scroll-driven fill line */}
        <div
          className="absolute left-[18px] lg:left-1/2 lg:-translate-x-1/2 top-0 w-1 rounded-full bg-gradient-to-b from-[#1769FF] via-[#00A3FF] to-emerald-400 transition-[height] duration-150 ease-out"
          style={{ height: `${progress * 100}%` }}
          aria-hidden="true"
        />

        <div className="space-y-4 lg:space-y-0">
          {PROCESS_STEPS.map((step, idx) => {
            const isCurrent = activeStep === idx;
            const isCompleted = idx < activeStep;
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                className={`relative pl-14 lg:w-1/2 ${
                  isLeft ? 'lg:pl-0 lg:pr-10' : 'lg:ml-auto lg:pl-10'
                } ${idx > 0 ? 'lg:-mt-20' : ''}`}
              >
                {/* Step circle sitting on the line */}
                <div
                  className={`absolute z-10 top-4 left-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    isLeft ? 'lg:left-auto lg:-right-5' : 'lg:-left-5'
                  } ${
                    isCurrent
                      ? 'bg-[#1769FF] text-white shadow-md shadow-[#1769FF]/50 scale-110'
                      : isCompleted
                      ? 'bg-emerald-900 text-emerald-400 border border-emerald-500/60'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.phase}
                </div>

                {/* Compact step card */}
                <div
                  className={`p-4 lg:min-h-[190px] rounded-2xl border transition-all duration-500 ${
                    isCurrent
                      ? 'bg-[#1C2028] border-[#00A3FF] ring-2 ring-[#00A3FF]/30 shadow-lg opacity-100'
                      : 'bg-[#161B26] border-slate-800 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-[length:max(10px,calc(10rem/16))] sm:text-[length:max(11px,calc(11rem/16))] font-bold uppercase tracking-wider text-[#00A3FF]">
                        Phase {step.phase}
                      </span>
                      <h3 className="text-sm sm:text-base lg:text-lg font-display font-bold text-white leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-3 flex items-start gap-2 text-xs sm:text-[length:max(13px,calc(13rem/16))] leading-relaxed text-slate-300">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
                    <span>{step.description}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action */}
      {onBookDemo && (
        <div className="mt-6 pt-5 border-t border-slate-800 flex justify-end">
          <button
            onClick={onBookDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1769FF] hover:bg-[#00A3FF] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <span>Start Phase 01 Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
