import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Dumbbell,
  Apple,
  Brain,
  Trophy,
  ArrowRight,
  Sparkles,
  Play,
  Pause,
  CheckCircle2,
} from 'lucide-react';

interface ProcessStep {
  id: number;
  phase: string;
  title: string;
  gymPoint: string;
  lifeImpact: string;
  icon: React.ReactNode;
  duration: string;
  outcome: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    phase: '01',
    title: 'Biomechanics Calibration & Posture Reset',
    gymPoint: 'Assessment of spine curvature, hip mobility, and shoulder impingement before touching weights.',
    lifeImpact: 'Instantly reduces desk-bound lower back ache and neck stiffness within the first 14 days.',
    icon: <ShieldAlert className="w-5 h-5 text-[#00A3FF]" />,
    duration: 'Weeks 1 - 2',
    outcome: 'Pain-Free Movement Baseline',
  },
  {
    id: 2,
    phase: '02',
    title: 'Progressive Overload & Neural Activation',
    gymPoint: 'Calibrated resistance loading that triggers muscle hypertrophy without fatiguing joints.',
    lifeImpact: 'Fires up dormant metabolic rate, burning calories even while sleeping or working at your desk.',
    icon: <Dumbbell className="w-5 h-5 text-[#1769FF]" />,
    duration: 'Weeks 3 - 6',
    outcome: 'Metabolic Acceleration',
  },
  {
    id: 3,
    phase: '03',
    title: 'Macro-Engineered Nutrition Synchronization',
    gymPoint: 'Pairing lifting sessions with optimal Indian meal protein, electrolytes, and hydration.',
    lifeImpact: 'Completely eliminates the 3 PM sugar crash and sluggishness, maintaining clean mental stamina.',
    icon: <Apple className="w-5 h-5 text-[#16834A]" />,
    duration: 'Weeks 7 - 10',
    outcome: 'Sustained Daily Energy',
  },
  {
    id: 4,
    phase: '04',
    title: 'Neurological Resilience & Stress Mastery',
    gymPoint: 'High-intensity threshold drills that condition the cardiovascular and central nervous systems.',
    lifeImpact: 'Lowers systemic cortisol, deepens slow-wave sleep, and builds mental composure under professional pressure.',
    icon: <Brain className="w-5 h-5 text-purple-500" />,
    duration: 'Weeks 11 - 16',
    outcome: 'High Mental Focus & Sleep',
  },
  {
    id: 5,
    phase: '05',
    title: 'Peak Aesthetic Form & Sustainable Autonomy',
    gymPoint: 'Consolidated body recomposition with high functional strength and lean definition.',
    lifeImpact: 'Radical confidence shift in clothing, high physical capability, and effortless lifelong fitness habits.',
    icon: <Trophy className="w-5 h-5 text-amber-500" />,
    duration: 'Weeks 16+',
    outcome: 'Permanent Transformation',
  },
];

interface ProcessesDrawProps {
  className?: string;
  onBookDemo?: () => void;
}

export const ProcessesDraw: React.FC<ProcessesDrawProps> = ({ className = '', onBookDemo }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Processes Drawer auto-travels every 3.8s
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const current = PROCESS_STEPS[activeStep];
  const progressPercent = ((activeStep) / (PROCESS_STEPS.length - 1)) * 100;

  return (
    <div className={`rounded-2xl bg-[#111318] text-white border border-slate-800 p-5 sm:p-8 shadow-xl ${className}`}>
      
      {/* Top Header & Drawer Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1769FF]/20 border border-[#1769FF]/40 text-[#00A3FF] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Processes Drawer</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-display font-extrabold text-white mt-2">
            How The Gym Creates Real Life Transformation
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Watch the animated Processes Drawer travel from phase to phase, illustrating the concrete cascade from gym discipline to daily life.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1C2028] hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoPlaying ? 'Pause Drawer' : 'Play Travel'}</span>
          </button>
        </div>
      </div>

      {/* The Processes Drawer Track (Connecting Travel Line + Circles) */}
      <div className="py-8 relative">
        
        {/* Background Track Line */}
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-800 -translate-y-1/2 hidden md:block" />

        {/* Traveling Drawer Active Fill Line */}
        <div
          className="absolute top-1/2 left-4 h-1 bg-gradient-to-r from-[#1769FF] via-[#00A3FF] to-emerald-400 -translate-y-1/2 transition-all duration-700 ease-out hidden md:block"
          style={{ width: `calc(${progressPercent}% - 32px)` }}
        />

        {/* Stepper Circles */}
        {/* Stepper Circles (Compact 2-col on mobile, 5-col on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-4 relative z-10">
          {PROCESS_STEPS.map((step, idx) => {
            const isCurrent = activeStep === idx;
            const isCompleted = idx < activeStep;
            const isLast = idx === PROCESS_STEPS.length - 1;

            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(idx);
                  setIsAutoPlaying(false);
                }}
                className={`text-left p-3 sm:p-4 rounded-xl transition-all cursor-pointer border ${
                  isLast ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isCurrent
                    ? 'bg-[#1C2028] border-[#00A3FF] ring-2 ring-[#00A3FF]/40 shadow-lg scale-102'
                    : isCompleted
                    ? 'bg-[#161B26] border-slate-700 text-slate-300'
                    : 'bg-[#111318] border-slate-800/80 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCurrent
                        ? 'bg-[#1769FF] text-white shadow-md shadow-[#1769FF]/50 scale-110'
                        : isCompleted
                        ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.phase}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {step.duration}
                  </span>
                </div>

                <div className="mt-3">
                  <h4
                    className={`text-xs sm:text-sm font-display font-bold leading-tight ${
                      isCurrent ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <div className="text-[11px] font-medium text-emerald-400 mt-1">
                    {step.outcome}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Step Drawer Detail Card */}
      <div className="p-5 sm:p-7 rounded-2xl bg-[#1C2028] border border-slate-700/80 mt-2 transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                {current.icon}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A3FF]">
                  Phase {current.phase} · {current.duration}
                </span>
                <h3 className="text-lg sm:text-2xl font-display font-bold text-white">
                  {current.title}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-black/40 border border-slate-700">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  🏋️ Inside The Gym Mechanism:
                </div>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                  {current.gymPoint}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  🌱 Tangible Everyday Life Impact:
                </div>
                <p className="text-xs sm:text-sm text-emerald-200 mt-1 leading-relaxed">
                  {current.lifeImpact}
                </p>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="shrink-0 flex flex-col gap-2 pt-2 lg:pt-0">
            {onBookDemo && (
              <button
                onClick={onBookDemo}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1769FF] hover:bg-[#00A3FF] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <span>Start Phase 01 Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <div className="text-[11px] text-slate-400 text-center">
              Personalised coaching by Coach Samir
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
