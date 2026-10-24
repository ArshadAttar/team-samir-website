import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Flame, ShieldCheck, ArrowRight, Zap, TrendingUp, Percent } from 'lucide-react';

type DurationId = 'monthly' | '3months' | '6months' | 'yearly';

interface DurationOption {
  id: DurationId;
  label: string;
  sublabel: string;
  topBannerDiscount: number;
}

const DURATIONS: DurationOption[] = [
  { id: 'monthly', label: 'Monthly', sublabel: 'Flexible Trial', topBannerDiscount: 15 },
  { id: '3months', label: '3 Months', sublabel: 'Quarterly Recomp', topBannerDiscount: 30 },
  { id: '6months', label: '6 Months', sublabel: 'Transformational', topBannerDiscount: 45 },
  { id: 'yearly', label: 'Yearly (VIP)', sublabel: 'Complete Lifestyle', topBannerDiscount: 60 },
];

interface PlanTier {
  id: string;
  name: string;
  tagline: string;
  isPopular?: boolean;
  baseDiscounts: Record<DurationId, number>;
  features: string[];
  commitmentGift: string;
}

const PLANS: PlanTier[] = [
  {
    id: 'starter',
    name: 'Foundation Rebuild',
    tagline: 'Ideal for beginners seeking safe form, posture reset, and consistent habits.',
    baseDiscounts: {
      monthly: 10,
      '3months': 25,
      '6months': 40,
      yearly: 50,
    },
    features: [
      '3 Dedicated 1-on-1 Sessions Weekly',
      'Spinal & Biomechanics Alignment Screening',
      'Ghar Ka Khana Macro Guideline Sheet',
      'Bi-weekly InBody Composition Scan',
      'Direct Coach Samir Access on Studio Floor',
    ],
    commitmentGift: 'Free Biomechanics Assessment (+₹2,500 value)',
  },
  {
    id: 'elite',
    name: 'Elite Recomposition',
    tagline: 'Most Popular: Aggressive fat loss and muscle hypertrophy with total accountability.',
    isPopular: true,
    baseDiscounts: {
      monthly: 18,
      '3months': 35,
      '6months': 48,
      yearly: 58,
    },
    features: [
      '5 High-Intensity Sessions Weekly',
      'Coach Samir Direct 1-on-1 Mentorship',
      'Daily WhatsApp Meal-by-Meal Photo Audit',
      'Weekly Digital Progress & Strength Graphing',
      'Custom Deload & CNS Recovery Protocols',
      'Priority Session Slot Booking at TS Studio',
    ],
    commitmentGift: 'Complimentary Nutrition Architecture Plan (+₹5,000 value)',
  },
  {
    id: 'vip',
    name: 'VIP Celebrity Protocol',
    tagline: 'Bespoke camera-ready conditioning for models, actors, and senior executives.',
    baseDiscounts: {
      monthly: 22,
      '3months': 38,
      '6months': 52,
      yearly: 65,
    },
    features: [
      'Unlimited 1-on-1 Personal Training Access',
      'Exclusive Studio Privacy / Confidential Hours',
      'Hyper-Calibrated Rapid Leanness Protocols',
      '24/7 Direct WhatsApp Hotline to Samir',
      'Travel & Hotel Routine Synchronization',
      'Full Body Mobility & Posture Decompression',
    ],
    commitmentGift: 'Full Celebrity Conditioning Kit (+₹9,000 value)',
  },
];

// Rolling Odometer Number Component
const OdometerNumber: React.FC<{ target: number }> = ({ target }) => {
  const [displayNumber, setDisplayNumber] = useState(target);

  useEffect(() => {
    let start = displayNumber;
    const end = target;
    if (start === end) return;

    const diff = end - start;
    const steps = 15;
    const stepDuration = 25;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const next = Math.round(start + (diff * currentStep) / steps);
      setDisplayNumber(next);
      if (currentStep >= steps) {
        setDisplayNumber(end);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target]);

  return <span className="tabular-nums font-black transition-all">{displayNumber}%</span>;
};

interface PriceRollProps {
  onBookDemo?: (planTitle?: string, discountPercent?: number) => void;
  className?: string;
}

export const PriceRoll: React.FC<PriceRollProps> = ({ onBookDemo, className = '' }) => {
  const [selectedDuration, setSelectedDuration] = useState<DurationId>('6months');

  const activeDurationObj = DURATIONS.find((d) => d.id === selectedDuration)!;

  return (
    <div className={`space-y-6 sm:space-y-8 ${className}`}>
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold border border-emerald-500/30">
          <Percent className="w-3.5 h-3.5" />
          <span>Discount Percentage Roll · Zero Hidden Fees</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#171A21] tracking-tight">
          Commitment-Based Value Tiers
        </h2>
        <p className="text-xs sm:text-base text-[#646B78] leading-relaxed">
          We don't publish rigid price sheets because each body requires individual coaching hours. Instead, see our transparent <strong>Discount Roll %</strong> that rewards longer physical commitments!
        </p>
      </div>

      {/* DURATION TOGGLE + GREEN DISCOUNT ODOMETER ON RIGHT */}
      <div className="max-w-4xl mx-auto bg-slate-900 text-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Duration Pill Toggles (Clean 2-col on mobile, 4-across on tablet/desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-black/60 p-1.5 rounded-xl border border-slate-800">
          {DURATIONS.map((dur) => (
            <button
              key={dur.id}
              onClick={() => setSelectedDuration(dur.id)}
              className={`px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center min-h-[44px] ${
                selectedDuration === dur.id
                  ? 'bg-[#1769FF] text-white shadow-md scale-102'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="truncate">{dur.label}</span>
              <span className={`text-[10px] font-normal truncate ${selectedDuration === dur.id ? 'text-blue-200' : 'text-slate-500'}`}>
                {dur.sublabel}
              </span>
            </button>
          ))}
        </div>

        {/* RIGHT SIDE: GREEN DISCOUNT ODOMETER CALLOUT */}
        <div className="flex items-center justify-between sm:justify-end gap-3 px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-600/40 text-emerald-300">
          <div className="text-left">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              ⚡ Incentive Odometer Roll
            </div>
            <div className="text-xs text-emerald-200">
              For {activeDurationObj.label} plan:
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/40 text-emerald-400">
            <span className="text-xs font-semibold">SAVE UP TO</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-300 tracking-tight">
              <OdometerNumber target={activeDurationObj.topBannerDiscount} />
            </div>
            <span className="text-xs font-black">OFF</span>
          </div>
        </div>

      </div>

      {/* 3 PLAN CARDS WITH DIFFERENT DISCOUNT PERCENTAGES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        {PLANS.map((plan) => {
          const currentDiscount = plan.baseDiscounts[selectedDuration];

          return (
            <div
              key={plan.id}
              className={`rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between relative ${
                plan.isPopular
                  ? 'border-[#1769FF] shadow-2xl ring-2 ring-[#1769FF]/50 md:-translate-y-2'
                  : 'border-[#E1E6EF] shadow-md hover:shadow-xl hover:border-slate-400'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1769FF] text-white text-xs font-bold shadow-md uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>Most Popular Choice</span>
                  </span>
                </div>
              )}

              {/* Top Card Body */}
              <div className="p-5 sm:p-7 space-y-4">
                
                <div>
                  <h3 className="text-xl font-display font-extrabold text-[#171A21]">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#646B78] mt-1 leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* THE DISCOUNT ROLL DISPLAY (Prominent Green Banner with Odometer) */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-teal-500/15 border border-emerald-500/30 text-emerald-900">
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center justify-between">
                    <span>Applied Commitment Discount</span>
                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                      {activeDurationObj.label}
                    </span>
                  </div>

                  <div className="mt-2 flex items-baseline gap-2">
                    <div className="text-4xl sm:text-5xl font-display font-black text-emerald-600 tracking-tight">
                      <OdometerNumber target={currentDiscount} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-emerald-800">
                        OFF Standard Fee
                      </span>
                      <div className="text-[10px] text-emerald-700">
                        Odometer verified savings
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bonus Gift Box */}
                <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1769FF] shrink-0" />
                  <span><strong>Bonus:</strong> {plan.commitmentGift}</span>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    What's Included:
                  </div>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Card Action */}
              <div className="p-5 sm:p-7 pt-0 border-t border-slate-100 mt-4">
                <button
                  onClick={() => onBookDemo && onBookDemo(plan.name, currentDiscount)}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-95 ${
                    plan.isPopular
                      ? 'bg-[#1769FF] hover:bg-[#00A3FF] text-white shadow-[#1769FF]/30'
                      : 'bg-[#111318] hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Claim {currentDiscount}% Discount & Book Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Assessment at TS Fitness Studio, DP Road, Kothrud
                </p>
              </div>

            </div>
          );
        })}
      </div>

      {/* Trust reassurance banner */}
      <div className="max-w-3xl mx-auto p-4 rounded-xl bg-slate-50 border border-[#E1E6EF] text-center text-xs text-[#646B78] flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#1769FF] shrink-0" />
        <span>
          <strong>Zero Forced Subscriptions:</strong> All discount rates are honored in-person. Free demo includes fitness & biomechanics evaluation before any payment.
        </span>
      </div>

    </div>
  );
};
