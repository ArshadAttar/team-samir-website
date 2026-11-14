import React, { useState, useEffect } from 'react';

interface HeroRevealProps {
  sentence?: string;
  className?: string;
}

export const HeroReveal: React.FC<HeroRevealProps> = ({
  sentence = '🔢 Tired of Counting Calories, 🥗 Boring Salads & 🌶️ Missing Your Masala Food? 💪 You’re in the Right Place! 🎯',
  className = '',
}) => {
  const [revealedIndex, setRevealedIndex] = useState(-1);
  const words = sentence.split(' ');

  // Staggered word-by-word reveal, replayed whenever the sentence changes
  useEffect(() => {
    setRevealedIndex(-1);
    const timeouts = words.map((_, idx) =>
      setTimeout(() => setRevealedIndex(idx), idx * 70 + 60)
    );
    return () => timeouts.forEach(clearTimeout);
  }, [sentence, words.length]);

  return (
    <div className={className}>
      {/* Sized so the longest headline fits on two lines on desktop; min-height reserves both lines so the layout doesn't jump when headlines rotate */}
      <h1 className="text-lg sm:text-2xl lg:text-[1.6rem] xl:text-[1.75rem] font-display font-bold tracking-tight text-white leading-snug flex flex-wrap items-center gap-x-[0.3em] gap-y-0.5 lg:min-h-[2.75em]">
        {words.map((word, idx) => {
          const isRevealed = idx <= revealedIndex;
          const isHighlight =
            word.toLowerCase().includes('fitness') ||
            word.toLowerCase().includes('life') ||
            word.toLowerCase().includes('elevate');

          return (
            <span
              key={`${sentence}-${idx}`}
              className={`inline-block transition-all duration-500 ease-out transform ${
                isRevealed
                  ? 'opacity-100 translate-y-0 scale-100 filter-none'
                  : 'opacity-0 translate-y-4 scale-95 blur-[2px]'
              } ${
                isHighlight
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-[#38BDF8] to-[#1769FF] font-black drop-shadow-[0_0_20px_rgba(0,163,255,0.4)]'
                  : 'text-white'
              }`}
            >
              {word}
            </span>
          );
        })}
      </h1>
    </div>
  );
};
