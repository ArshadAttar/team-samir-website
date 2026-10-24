import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, Sparkles, CheckCircle2, Award } from 'lucide-react';

interface CaseStudy {
  id: string;
  name: string;
  title: string;
  timeline: string;
  beforeStats: string;
  afterStats: string;
  achievement: string;
  beforeImage: string;
  afterImage: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'male-recomp',
    name: 'Rahul V. (Tech Consultant)',
    title: '16-Week Recomposition & Core Hypertrophy',
    timeline: '16 Weeks',
    beforeStats: '88 kg · 27% Body Fat · Forward Slouch',
    afterStats: '74 kg · 13% Body Fat · V-Taper Form',
    achievement: '-14kg Pure Fat Loss · Bench 100kg PR',
    beforeImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'female-tone',
    name: 'Pooja S. (Product Designer)',
    title: 'Postural Rehabilitation & Athletic Toning',
    timeline: '12 Weeks',
    beforeStats: 'Chronic neck spasms · Zero gym experience',
    afterStats: 'Deadlift 75kg · 21% Body Fat · High Stamina',
    achievement: '-8kg Fat · Resolved Lumbar Tension',
    beforeImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'posture-rehab',
    name: 'Amey K. (IT Architect, Kothrud)',
    title: 'Anterior Pelvic Tilt & Posture Transformation',
    timeline: '20 Weeks',
    beforeStats: 'Severe seated slouch · 92 kg',
    afterStats: 'Upright alignment · 78 kg lean',
    achievement: 'Fixed Spinal Curvature · 140kg Deadlift',
    beforeImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
  },
];

interface BeforeAfterSliderProps {
  className?: string;
  onBookDemo?: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  className = '',
  onBookDemo,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASE_STUDIES[selectedCaseIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Header & Case Study Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1769FF]/10 text-[#1769FF] text-xs font-bold border border-[#1769FF]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Before / After Window Slider</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-display font-bold text-[#171A21] tracking-tight mt-2">
            Slide to Reveal Client Transformations
          </h2>
          <p className="text-xs sm:text-sm text-[#646B78] mt-1">
            Drag the sliding divider left or right to inspect the exact anatomical changes under Coach Samir's guidance.
          </p>
        </div>

        {/* Case Study Switcher Pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          {CASE_STUDIES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseIndex(idx)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedCaseIndex === idx
                  ? 'bg-white text-[#1769FF] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Case 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Slider Window */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-16/10 sm:aspect-16/9 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-slate-900 select-none cursor-ew-resize group"
      >
        {/* Layer 1: Background - "AFTER" Image (Full Width) */}
        <img
          src={activeCase.afterImage}
          alt={`After: ${activeCase.name}`}
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />

        {/* Layer 1 Overlay / Gradient & Labels */}
        <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 z-10 pointer-events-none">
          <CheckCircle2 className="w-4 h-4" />
          <span>AFTER: {activeCase.timeline}</span>
        </div>

        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white text-xs p-3 rounded-xl max-w-xs text-right z-10 pointer-events-none hidden sm:block">
          <div className="font-bold text-emerald-400">{activeCase.achievement}</div>
          <div className="text-[11px] text-slate-300">{activeCase.afterStats}</div>
        </div>

        {/* Layer 2: Foreground - "BEFORE" Image (Clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={activeCase.beforeImage}
            alt={`Before: ${activeCase.name}`}
            className="absolute inset-0 w-full h-full object-cover object-center filter grayscale-[35%]"
            style={{
              width: containerRef.current?.offsetWidth || '100%',
              maxWidth: 'none',
            }}
            referrerPolicy="no-referrer"
          />

          {/* Dark scrim for before image */}
          <div className="absolute inset-0 bg-black/25" />

          {/* "BEFORE" Badge */}
          <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg z-10">
            <span>BEFORE: Baseline</span>
          </div>

          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs p-3 rounded-xl max-w-xs z-10 hidden sm:block">
            <div className="font-bold text-slate-200">{activeCase.name}</div>
            <div className="text-[11px] text-slate-400">{activeCase.beforeStats}</div>
          </div>
        </div>

        {/* Draggable Divider Line & Center Sliding Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Vertical Divider Line */}
          <div className="w-1 h-full bg-white shadow-[0_0_12px_rgba(0,163,255,0.8)]" />

          {/* Center Circular Sliding Handle with Arrows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-[#111318] shadow-2xl border-2 border-[#1769FF] flex items-center justify-center font-bold pointer-events-auto transition-transform group-hover:scale-110 active:scale-95">
            <ArrowLeftRight className="w-5 h-5 text-[#1769FF]" />
          </div>
        </div>

        {/* Mobile Swipe Guidance Banner */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none sm:hidden z-10">
          <span className="bg-black/75 backdrop-blur-xs text-[10px] text-white px-3 py-1 rounded-full font-medium">
            Slide finger left / right to compare
          </span>
        </div>
      </div>

      {/* Case Summary Card with preset buttons */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-[#E1E6EF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#1769FF]">
            {activeCase.title}
          </div>
          <div className="text-sm sm:text-base font-bold text-[#171A21] mt-0.5">
            {activeCase.name} · <span className="text-emerald-600">{activeCase.achievement}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span>Quick:</span>
            <button
              onClick={() => setSliderPosition(25)}
              className="px-2.5 py-1 min-h-[36px] rounded bg-white border border-slate-200 font-semibold hover:text-[#1769FF] cursor-pointer"
            >
              25%
            </button>
            <button
              onClick={() => setSliderPosition(50)}
              className="px-2.5 py-1 min-h-[36px] rounded bg-white border border-slate-200 font-semibold hover:text-[#1769FF] cursor-pointer"
            >
              50%
            </button>
            <button
              onClick={() => setSliderPosition(75)}
              className="px-2.5 py-1 min-h-[36px] rounded bg-white border border-slate-200 font-semibold hover:text-[#1769FF] cursor-pointer"
            >
              75%
            </button>
          </div>

          {onBookDemo && (
            <button
              onClick={onBookDemo}
              className="px-3.5 py-2 min-h-[44px] rounded-lg bg-[#1769FF] hover:bg-[#00A3FF] text-white text-xs font-semibold cursor-pointer shadow-xs active:scale-95"
            >
              Enquire For Case Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
