import React, { useState } from 'react';
import {
  Dumbbell,
  Activity,
  Apple,
  Clock,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Zap,
  Flame,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface BentoBuildProps {
  onBookDemo?: (topic?: string) => void;
  className?: string;
}

export const BentoBuild: React.FC<BentoBuildProps> = ({ onBookDemo, className = '' }) => {
  const [activeTile, setActiveTile] = useState<number | null>(null);

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1769FF]/10 text-[#1769FF] text-xs font-bold border border-[#1769FF]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Bento Architecture</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-display font-bold text-[#171A21] tracking-tight mt-2">
            The TS Fitness Transformation System
          </h2>
          <p className="text-xs sm:text-base text-[#646B78] max-w-2xl mt-1">
            Engineered modular tiles that snap into place — no boring bullet lists, only battle-tested training protocols.
          </p>
        </div>

        {onBookDemo && (
          <button
            onClick={() => onBookDemo('Bento System')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1769FF] hover:bg-[#00A3FF] rounded-xl transition-all cursor-pointer self-start sm:self-auto shrink-0 shadow-sm"
          >
            <span>Experience The System</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
        
        {/* TILE 1: Large Featured Tile (Spans 2 cols, 2 rows on large) */}
        <div
          onMouseEnter={() => setActiveTile(1)}
          onMouseLeave={() => setActiveTile(null)}
          className={`lg:col-span-2 md:row-span-2 rounded-2xl bg-gradient-to-br from-[#111318] via-[#161B26] to-[#0B1E3D] text-white p-5 sm:p-7 border border-slate-700/80 shadow-lg flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
            activeTile === 1 ? 'ring-2 ring-[#00A3FF] shadow-2xl scale-[1.01]' : ''
          }`}
        >
          {/* Subtle 3D background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1769FF]/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A3FF] flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4" />
                <span>Pillar 01 · Biomechanics Lab</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Form Safety
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-4 group-hover:text-[#00A3FF] transition-colors">
              Joint-Preserving Movement & Progressive Overload
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
              Every rep is calibrated for your spinal anatomy, hip mobility, and shoulder joint trajectory. No reckless ego lifting or joint grinding.
            </p>

            {/* Interactive snap tags */}
            <div className="grid grid-cols-2 gap-2 mt-5">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60">
                <div className="text-[10px] text-slate-400">Kinematic Tracking</div>
                <div className="text-sm font-bold text-white mt-0.5">Barbell Path Alignment</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60">
                <div className="text-[10px] text-slate-400">Injury Prevention</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">Zero Chronic Strain</div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-slate-800/80 mt-6">
            <span className="text-xs text-slate-400">Led by Coach Samir · Kothrud, Pune</span>
            <span className="text-xs font-semibold text-[#00A3FF] flex items-center gap-1">
              <span>Calibrated Routine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* TILE 2: Nutrition Tile (Spans 1 col, 2 rows) */}
        <div
          onMouseEnter={() => setActiveTile(2)}
          onMouseLeave={() => setActiveTile(null)}
          className={`lg:col-span-2 rounded-2xl bg-white border border-[#E1E6EF] p-5 sm:p-6 shadow-sm hover:border-[#1769FF] transition-all flex flex-col justify-between group ${
            activeTile === 2 ? 'ring-2 ring-[#1769FF]/50 shadow-md' : ''
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#16834A] flex items-center gap-1.5">
                <Apple className="w-4 h-4" />
                <span>Pillar 02 · Nutrition Architecture</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                Indian Meal Friendly
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-display font-bold text-[#171A21] mt-3 group-hover:text-[#1769FF] transition-colors">
              Macro-Engineered Ghar Ka Khana
            </h3>

            <p className="text-xs sm:text-sm text-[#646B78] mt-2 leading-relaxed">
              No boiled chicken or bland starvation. We calibrate rotis, paneer, eggs, dals, and regional spices with precise protein targets.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">WhatsApp Daily Food Audit</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">Flexible Social Eating</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">Realistic Caloric Deficit</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#16834A]">
            <span>Sustainable Fat Loss</span>
            <span>Zero Crash Diets</span>
          </div>
        </div>

        {/* TILE 3: Digital Accountability Tile */}
        <div
          onMouseEnter={() => setActiveTile(3)}
          onMouseLeave={() => setActiveTile(null)}
          className={`rounded-2xl bg-white border border-[#E1E6EF] p-5 shadow-sm hover:border-[#1769FF] transition-all flex flex-col justify-between ${
            activeTile === 3 ? 'ring-2 ring-[#1769FF]/50 shadow-md' : ''
          }`}
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-[#EEF5FF] text-[#1769FF] flex items-center justify-center mb-3">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="text-base font-display font-bold text-[#171A21]">
              Weekly InBody Biometrics
            </h4>
            <p className="text-xs text-[#646B78] mt-1.5 leading-relaxed">
              Tracking skeletal muscle mass, visceral fat, and hydration weekly to ensure pure fat loss rather than water or muscle waste.
            </p>
          </div>
          <div className="mt-3 text-[11px] font-semibold text-[#1769FF]">
            Data-driven biofeedback
          </div>
        </div>

        {/* TILE 4: Recovery & Spinal Decompression Tile */}
        <div
          onMouseEnter={() => setActiveTile(4)}
          onMouseLeave={() => setActiveTile(null)}
          className={`rounded-2xl bg-white border border-[#E1E6EF] p-5 shadow-sm hover:border-[#1769FF] transition-all flex flex-col justify-between ${
            activeTile === 4 ? 'ring-2 ring-[#1769FF]/50 shadow-md' : ''
          }`}
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-base font-display font-bold text-[#171A21]">
              Desk Posture & Spinal Rehab
            </h4>
            <p className="text-xs text-[#646B78] mt-1.5 leading-relaxed">
              Targeted thoracic extension and glute reactivation drills that eliminate neck stiffness and lower back pain from sitting.
            </p>
          </div>
          <div className="mt-3 text-[11px] font-semibold text-purple-600">
            For Pune IT professionals
          </div>
        </div>

        {/* TILE 5: Celebrity & Executive Privacy Protocol (Wide tile) */}
        <div
          onMouseEnter={() => setActiveTile(5)}
          onMouseLeave={() => setActiveTile(null)}
          className={`lg:col-span-2 rounded-2xl bg-[#EEF5FF] border border-[#1769FF]/30 p-5 sm:p-6 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            activeTile === 5 ? 'ring-2 ring-[#1769FF] shadow-md' : ''
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1769FF]" />
              <span className="text-xs font-bold text-[#1769FF] uppercase tracking-wider">
                Celebrity & VIP Privacy
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-display font-bold text-[#171A21]">
              Exclusive Private Slots & Camera-Ready Recomp
            </h4>
            <p className="text-xs text-slate-600 max-w-lg">
              Discreet 1-on-1 time slots at TS Fitness studio on DP Road for actors, athletes, and executives requiring absolute focus.
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-block px-3 py-1.5 rounded-lg bg-white text-[#1769FF] font-bold text-xs shadow-xs border border-blue-200">
              25+ High-Profile Trainees
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
