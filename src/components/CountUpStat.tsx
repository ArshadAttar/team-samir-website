import React, { useEffect, useState, useRef } from 'react';

interface CountUpStatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  sublabel?: string;
  allowLiveIncrement?: boolean;
  incrementIntervalMs?: number;
  className?: string;
  valueClassName?: string;
  badge?: string;
}

export const CountUpStat: React.FC<CountUpStatProps> = ({
  end,
  suffix = '',
  prefix = '',
  duration = 1800,
  label,
  sublabel,
  allowLiveIncrement = false,
  incrementIntervalMs = 12000,
  className = '',
  valueClassName = '',
  badge,
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Trigger count-up when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const startVal = 0;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(startVal + (end - startVal) * easeOut);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  // Runtime live micro-increment if enabled
  useEffect(() => {
    if (!allowLiveIncrement || !hasAnimated) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + 1;
        setIsPinging(true);
        setTimeout(() => setIsPinging(false), 1200);
        return next;
      });
    }, incrementIntervalMs);

    return () => clearInterval(interval);
  }, [allowLiveIncrement, hasAnimated, incrementIntervalMs]);

  return (
    <div ref={elementRef} className={`relative p-3.5 sm:p-5 rounded-xl transition-all ${className}`}>
      {badge && (
        <span className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {badge}
        </span>
      )}
      
      <div className="flex items-baseline justify-center gap-1">
        <span className={`text-2xl sm:text-4xl font-display font-extrabold tabular-nums tracking-tight transition-transform ${isPinging ? 'scale-110 text-emerald-400' : ''} ${valueClassName}`}>
          {prefix}{count}{suffix}
        </span>
        {isPinging && (
          <span className="inline-block text-[11px] font-bold text-emerald-400 animate-pulse">
            +1
          </span>
        )}
      </div>

      <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
        {label}
      </div>

      {sublabel && (
        <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
          {sublabel}
        </div>
      )}
    </div>
  );
};
