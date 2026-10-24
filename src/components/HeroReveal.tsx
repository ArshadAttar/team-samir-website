import React, { useState, useEffect } from 'react';
import { RotateCw, Sparkles } from 'lucide-react';

interface HeroRevealProps {
  sentence?: string;
  onFinished?: () => void;
  className?: string;
}

export const HeroReveal: React.FC<HeroRevealProps> = ({
  sentence = 'Transform Your Fitness. Elevate Your Life.',
  className = '',
}) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [revealedIndex, setRevealedIndex] = useState(-1);
  const words = sentence.split(' ');

  // Staggered reveal effect
  useEffect(() => {
    setRevealedIndex(-1);
    const timeouts: NodeJS.Timeout[] = [];

    words.forEach((_, idx) => {
      const timeout = setTimeout(() => {
        setRevealedIndex(idx);
      }, idx * 160 + 60);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [sentence, animationKey, words.length]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Visual Accent Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1769FF]/15 border border-[#1769FF]/30 text-[#00A3FF] text-[11px] font-semibold mb-2">
        <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Hero Reveal Sequence</span>
      </div>

      {/* Main Staggered Words Line */}
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-[1.2] sm:leading-[1.15] flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1">
        {words.map((word, idx) => {
          const isRevealed = idx <= revealedIndex;
          const isHighlight =
            word.toLowerCase().includes('fitness') ||
            word.toLowerCase().includes('life') ||
            word.toLowerCase().includes('elevate');

          return (
            <span
              key={`${animationKey}-${idx}`}
              className={`inline-block transition-all duration-500 ease-out transform ${
                isRevealed
                  ? 'opacity-100 translate-y-0 scale-100 filter-none'
                  : 'opacity-0 translate-y-4 scale-95 blur-[2px]'
              } ${
                isHighlight
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-[#38BDF8] to-[#1769FF] font-black drop-shadow-[0_0_20px_rgba(0,163,255,0.4)]'
                  : 'text-white'
              }`}
              style={{
                transitionDelay: `${idx * 40}ms`,
              }}
            >
              {word}
            </span>
          );
        })}
      </h1>

      {/* Replay action badge for interactive testing */}
      <div className="mt-2.5 flex items-center gap-2">
        <button
          onClick={handleReplay}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-slate-400 hover:text-white bg-[#1C2028] hover:bg-slate-800 border border-slate-700/80 rounded-md transition-colors cursor-pointer"
          title="Replay sequential word reveal animation"
        >
          <RotateCw className="w-3 h-3 text-[#00A3FF]" />
          <span>Replay Reveal Animation</span>
        </button>
        <span className="text-[10px] text-slate-500 hidden sm:inline">
          · Staggered queue entrance
        </span>
      </div>
    </div>
  );
};
