import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Sparkles, Bell, ArrowUpRight, Award, PlusCircle } from 'lucide-react';

interface GrowthDataPoint {
  year: number;
  clients: number;
  celebrities: number;
  milestone: string;
}

const GROWTH_HISTORY: GrowthDataPoint[] = [
  { year: 2022, clients: 38, celebrities: 4, milestone: 'TS Fitness launched on DP Road, Kothrud' },
  { year: 2023, clients: 95, celebrities: 9, milestone: 'Expanded 1-on-1 biomechanics coaching lab' },
  { year: 2024, clients: 168, celebrities: 16, milestone: 'First Marathi cinema & regional fitness contracts' },
  { year: 2025, clients: 224, celebrities: 22, milestone: 'Celebrity conditioning protocols established' },
  { year: 2026, clients: 254, celebrities: 26, milestone: '250+ clients milestone reached & expanding' },
];

const PING_EVENTS = [
  { name: 'Aditya K.', location: 'Kothrud, Pune', action: 'booked Free 1-on-1 Demo session', time: 'Just now' },
  { name: 'Rohan P.', location: 'Baner, Pune', action: 'enrolled in 6-Month Recomp Protocol', time: '2m ago' },
  { name: 'Dr. Neha M.', location: 'Deccan Gymkhana', action: 'started Posture Restoration plan', time: '6m ago' },
  { name: 'Tanvi S.', location: 'Model Colony', action: 'completed VIP Celebrity Training Check-in', time: '11m ago' },
  { name: 'Vikram D.', location: 'DP Road Studio', action: 'achieved 140kg Clean Deadlift milestone', time: '18m ago' },
];

interface SalePingsProps {
  className?: string;
  onBookDemo?: () => void;
}

export const SalePings: React.FC<SalePingsProps> = ({ className = '', onBookDemo }) => {
  const [clientCount, setClientCount] = useState(254);
  const [celebrityCount, setCelebrityCount] = useState(26);
  const [activeYearIndex, setActiveYearIndex] = useState(4); // 2026
  const [activePing, setActivePing] = useState(PING_EVENTS[0]);
  const [isPinging, setIsPinging] = useState(false);
  const [autoIncrementEnabled, setAutoIncrementEnabled] = useState(true);

  // Runtime live increment every 14 seconds
  useEffect(() => {
    if (!autoIncrementEnabled) return;

    const interval = setInterval(() => {
      triggerLiveSalePing();
    }, 14000);

    return () => clearInterval(interval);
  }, [autoIncrementEnabled]);

  const triggerLiveSalePing = () => {
    setIsPinging(true);
    setClientCount((prev) => prev + 1);

    // Randomly bump celebrity every few pings
    if (Math.random() > 0.65) {
      setCelebrityCount((prev) => prev + 1);
    }

    // Pick next ping event
    const randomPing = PING_EVENTS[Math.floor(Math.random() * PING_EVENTS.length)];
    setActivePing(randomPing);

    setTimeout(() => {
      setIsPinging(false);
    }, 2500);
  };

  const selectedYear = GROWTH_HISTORY[activeYearIndex];

  // SVG dimensions for growth graph
  const width = 500;
  const height = 180;
  const paddingX = 40;
  const paddingY = 30;

  // Max client count for graph scaling
  const maxVal = 280;
  const minVal = 0;

  const points = GROWTH_HISTORY.map((d, i) => {
    const x = paddingX + (i / (GROWTH_HISTORY.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - (d.clients / maxVal) * (height - 2 * paddingY);
    return { x, y, d };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className={`rounded-2xl bg-white border border-[#E1E6EF] shadow-md overflow-hidden ${className}`}>
      {/* Top Live Sale Ping Banner */}
      <div className="bg-gradient-to-r from-[#111318] to-[#1C2028] text-white p-3.5 sm:p-4 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#1769FF]/20 border border-[#1769FF]/50 flex items-center justify-center text-[#00A3FF]">
              <Bell className="w-4 h-4" />
            </div>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Live Sale Ping
              </span>
              <span className="text-slate-500 text-xs">·</span>
              <span className="text-xs text-slate-300">{activePing.time}</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white">
              <strong className="text-[#00A3FF]">{activePing.name}</strong> ({activePing.location}) {activePing.action}
            </div>
          </div>
        </div>

        {/* Runtime simulation button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={triggerLiveSalePing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1769FF] hover:bg-[#00A3FF] text-white transition-all cursor-pointer shadow-sm active:scale-95"
            title="Click to trigger a live registration and increase counts in real-time"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Simulate Live Ping</span>
          </button>
        </div>
      </div>

      {/* Main Body: Real-time Live Counters + Timeline Growth Graph */}
      <div className="p-5 sm:p-7 space-y-6">
        
        {/* Real-time runtime counters (2-column side-by-side on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          
          <div className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 col-span-1 ${isPinging ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300' : 'bg-slate-50 border-[#E1E6EF]'}`}>
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Clients
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-600 bg-emerald-100 px-1.5 sm:px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-4xl font-display font-extrabold text-[#111318] tabular-nums">
                {clientCount}+
              </span>
              {isPinging && (
                <span className="text-[10px] sm:text-xs font-bold text-emerald-600 animate-bounce">
                  +1
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 line-clamp-1 sm:line-clamp-none">
              Verified Pune bookings.
            </p>
          </div>

          <div className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 col-span-1 ${isPinging ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-300' : 'bg-slate-50 border-[#E1E6EF]'}`}>
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Celebrity VIP
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#1769FF] bg-blue-100 px-1.5 sm:px-2 py-0.5 rounded-full">
                <Award className="w-3 h-3" />
                Elite
              </span>
            </div>
            <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-4xl font-display font-extrabold text-[#1769FF] tabular-nums">
                {celebrityCount}+
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 line-clamp-1 sm:line-clamp-none">
              Confidential protocols.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl border bg-slate-50 border-[#E1E6EF] col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Growth Velocity
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                +568%
              </span>
            </div>
            <div className="mt-1 sm:mt-2 text-base sm:text-2xl font-display font-bold text-slate-800">
              2022 → 2026 Expansion
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 sm:mt-1">
              From 38 foundational trainees to Pune's premier personal coaching hub.
            </p>
          </div>

        </div>

        {/* Growth Timeline Graph (From 2022 to Current) */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#111318] text-white border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#00A3FF] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Verified Historical Trainee Growth (2022 - 2026)</span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mt-1">
                From Grassroots Studio to 250+ Transformations
              </h3>
            </div>

            {/* Year Selector Pills */}
            <div className="flex flex-wrap gap-1.5 bg-[#1C2028] p-1 rounded-xl border border-slate-700/80">
              {GROWTH_HISTORY.map((item, idx) => (
                <button
                  key={item.year}
                  onClick={() => setActiveYearIndex(idx)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeYearIndex === idx
                      ? 'bg-[#1769FF] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-44 sm:h-52 overflow-visible"
            >
              <defs>
                <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1769FF" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#1769FF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[50, 100, 150, 200, 250].map((tick) => {
                const y = height - paddingY - (tick / maxVal) * (height - 2 * paddingY);
                return (
                  <g key={tick}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={width - paddingX}
                      y2={y}
                      stroke="#1E293B"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 3}
                      fill="#64748B"
                      fontSize="9"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              <path d={areaD} fill="url(#growthGradient)" />

              {/* Line path */}
              <path
                d={pathD}
                fill="none"
                stroke="#00A3FF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points & Interactive nodes */}
              {points.map((pt, i) => {
                const isSelected = activeYearIndex === i;
                return (
                  <g
                    key={pt.d.year}
                    className="cursor-pointer group"
                    onClick={() => setActiveYearIndex(i)}
                  >
                    {/* Year Label */}
                    <text
                      x={pt.x}
                      y={height - 8}
                      fill={isSelected ? '#00A3FF' : '#94A3B8'}
                      fontSize="10"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      textAnchor="middle"
                    >
                      {pt.d.year}
                    </text>

                    {/* Node circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#00A3FF' : '#111318'}
                      stroke={isSelected ? '#FFFFFF' : '#00A3FF'}
                      strokeWidth={isSelected ? 3 : 2}
                    />

                    {/* Value Badge on top of dot */}
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      fill={isSelected ? '#38BDF8' : '#CBD5E1'}
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {pt.d.clients}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active Year Detail Callout */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#1C2028] border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  Year {selectedYear.year} Milestone:
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#1769FF]/20 text-[#00A3FF] font-semibold">
                  {selectedYear.clients} Clients · {selectedYear.celebrities} Celebrities
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {selectedYear.milestone}
              </p>
            </div>

            {onBookDemo && (
              <button
                onClick={onBookDemo}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1769FF] hover:bg-[#00A3FF] rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <span>Join The 2026 Roster</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
