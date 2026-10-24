import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Pause, Play, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReviewCardItem {
  id: string;
  name: string;
  location: string;
  avatar: string;
  stars: number;
  comment: string;
  resultBadge: string;
  program: string;
}

const REVIEW_DATA: ReviewCardItem[] = [
  {
    id: 'rev-1',
    name: 'Rohan Mehta',
    location: 'Kothrud, Pune',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Samir completely fixed my anterior pelvic tilt while helping me drop 14kg in 5 months. His posture and biomechanics coaching is lightyears ahead of normal commercial trainers in Pune.',
    resultBadge: 'Lost 14 kg & Fixed Back Pain',
    program: '1-on-1 Personal Training',
  },
  {
    id: 'rev-2',
    name: 'Priya Kulkarni',
    location: 'Bavdhan, Pune',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Unlike other commercial gyms where trainers ignore you after day two, Samir reviews every single WhatsApp food log and corrects every inch of your barbell squat. Truly personalised!',
    resultBadge: 'Toned Core · 22% Body Fat',
    program: 'Lifestyle Recomposition',
  },
  {
    id: 'rev-3',
    name: 'Vikramaditya Deshmukh',
    location: 'Deccan, Pune',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Coaching with Coach Samir took my clean barbell squat from 100kg to 160kg without knee strain. His understanding of joint load and progressive overload is unmatched.',
    resultBadge: '+60kg Squat PR · Zero Knee Pain',
    program: 'Athletic Strength & Power',
  },
  {
    id: 'rev-4',
    name: 'Dr. Neha Joshi',
    location: 'Karve Road, Pune',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'As a doctor with grueling 14-hour hospital shifts, Samir structured a 35-minute split that gave me sustained energy without adrenal fatigue. My chronic neck spasms disappeared.',
    resultBadge: 'Neck Spasms Resolved · High Stamina',
    program: 'Executive Fitness Protocol',
  },
  {
    id: 'rev-5',
    name: 'Sameer Joshi',
    location: 'Aundh, Pune',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Dropped 18kg before my brother’s wedding in 4 months. Samir never forced impossible crash diets; he tailored the macros around my mother’s home-cooked Maharashtrian meals.',
    resultBadge: 'Lost 18 kg in 16 Weeks',
    program: 'Custom Nutrition & Training',
  },
  {
    id: 'rev-6',
    name: 'Tanvi Sharma',
    location: 'Model Colony, Pune',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Trained for commercial shoots and runway. Samir’s celebrity conditioning protocols sculpt razor-sharp muscle definition while keeping your limbs sleek and feminine. Highly recommended!',
    resultBadge: 'Runway & Camera Conditioning',
    program: 'Celebrity Coaching Protocol',
  },
  {
    id: 'rev-7',
    name: 'Aditya Rao',
    location: 'Kothrud, Pune',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'His glute activation and posterior chain routines completely eliminated my runner’s IT band syndrome. Clocked my half-marathon personal best at 1 hr 41 mins thanks to TS Fitness!',
    resultBadge: 'Half-Marathon PB (1h 41m)',
    program: 'Runner Injury Prevention',
  },
  {
    id: 'rev-8',
    name: 'Shweta Patil',
    location: 'Erandwane, Pune',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    comment:
      'Gained strength I never thought possible in my 40s. Samir is respectful, ultra-knowledgeable, and keeps you relentlessly accountable without shouting. The best coach in Pune.',
    resultBadge: 'Deadlift 85kg at Age 42',
    program: 'Women’s Strength & Mobility',
  },
];

interface ReviewsShuffleProps {
  className?: string;
}

export const ReviewsShuffle: React.FC<ReviewsShuffleProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  // Self shuffle every 3.5s
  useEffect(() => {
    if (isPaused || isDragging) return;

    const timer = setInterval(() => {
      advanceNextCard('right');
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, isDragging, currentIndex]);

  const advanceNextCard = (dir: 'left' | 'right' | 'up' | 'down' = 'right') => {
    setSwipeDirection(dir);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEW_DATA.length);
      setSwipeDirection(null);
      setDragOffset({ x: 0, y: 0 });
    }, 200);
  };

  const advancePrevCard = () => {
    setSwipeDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + REVIEW_DATA.length) % REVIEW_DATA.length);
      setSwipeDirection(null);
      setDragOffset({ x: 0, y: 0 });
    }, 200);
  };

  // Toggle pause when user clicks on card
  const handleCardClick = () => {
    setIsPaused((prev) => !prev);
  };

  // Touch and Swipe Gesture Detection (left, right, up, down)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = e.touches[0].clientX - touchStartX;
    const diffY = e.touches[0].clientY - touchStartY;
    setDragOffset({ x: diffX, y: diffY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 40;
    if (Math.abs(dragOffset.x) > Math.abs(dragOffset.y)) {
      if (dragOffset.x > threshold) {
        advancePrevCard();
      } else if (dragOffset.x < -threshold) {
        advanceNextCard('right');
      } else {
        setDragOffset({ x: 0, y: 0 });
      }
    } else {
      if (dragOffset.y > threshold) {
        advanceNextCard('down');
      } else if (dragOffset.y < -threshold) {
        advanceNextCard('up');
      } else {
        setDragOffset({ x: 0, y: 0 });
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Mouse drag support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStartX(e.clientX);
    setTouchStartY(e.clientY);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || touchStartX === null || touchStartY === null) return;
    const diffX = e.clientX - touchStartX;
    const diffY = e.clientY - touchStartY;
    setDragOffset({ x: diffX, y: diffY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;

    if (Math.abs(dragOffset.x) > Math.abs(dragOffset.y)) {
      if (dragOffset.x > threshold) {
        advancePrevCard();
      } else if (dragOffset.x < -threshold) {
        advanceNextCard('right');
      } else {
        setDragOffset({ x: 0, y: 0 });
      }
    } else {
      if (dragOffset.y > threshold) {
        advanceNextCard('down');
      } else if (dragOffset.y < -threshold) {
        advanceNextCard('up');
      } else {
        setDragOffset({ x: 0, y: 0 });
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  const activeCard = REVIEW_DATA[currentIndex];
  const nextCard = REVIEW_DATA[(currentIndex + 1) % REVIEW_DATA.length];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top Controls & State Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1769FF]/10 text-[#1769FF] text-xs font-bold border border-[#1769FF]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Reviews Shuffle</span>
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Card {currentIndex + 1} of {REVIEW_DATA.length}
          </span>
        </div>

        {/* Shuffle status button (pause/resume on click) */}
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            isPaused
              ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}
          title="Click to pause or resume auto-shuffle"
        >
          {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
          <span>{isPaused ? 'Shuffle Paused (Click to Play)' : 'Auto-Shuffling (3.5s)'}</span>
        </button>
      </div>

      {/* Interactive Deck Canvas */}
      <div className="relative min-h-[250px] sm:min-h-[270px] flex items-center justify-center select-none">
        
        {/* Background Ghost Card 2 (Visual depth) */}
        <div className="absolute w-[92%] h-[92%] rounded-2xl bg-slate-100 border border-slate-200 transform translate-y-3 sm:translate-y-4 scale-95 opacity-50 pointer-events-none" />

        {/* Background Ghost Card 1 (Upcoming next card) */}
        <div className="absolute w-[96%] h-[96%] rounded-2xl bg-white border border-[#E1E6EF] shadow-sm transform translate-y-1.5 sm:translate-y-2 scale-[0.98] opacity-80 pointer-events-none flex flex-col justify-between p-4 sm:p-5">
          <div className="flex items-center gap-1 opacity-40">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs text-slate-400 line-clamp-2">
            "{nextCard.comment}"
          </p>
          <div className="text-[11px] text-slate-400 font-medium">
            {nextCard.name}
          </div>
        </div>

        {/* Active Front Card */}
        <div
          ref={cardRef}
          onClick={handleCardClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.04}deg)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={`relative z-10 w-full rounded-2xl bg-white border border-[#E1E6EF] shadow-xl p-4 sm:p-7 flex flex-col justify-between cursor-grab active:cursor-grabbing hover:border-[#1769FF] transition-colors ${
            swipeDirection === 'right' ? 'translate-x-full opacity-0' : ''
          } ${swipeDirection === 'left' ? '-translate-x-full opacity-0' : ''} ${
            swipeDirection === 'up' ? '-translate-y-full opacity-0' : ''
          } ${swipeDirection === 'down' ? 'translate-y-full opacity-0' : ''}`}
        >
          {/* Card Item 1: Top Stars */}
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1">
              {[...Array(activeCard.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1.5 sm:ml-2 text-xs font-bold text-slate-800">5.0 / 5.0</span>
            </div>
            
            <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Trainee</span>
            </div>
          </div>

          {/* Card Item 2: Comment */}
          <div className="my-3 sm:my-4">
            <p className="text-xs sm:text-base text-slate-700 font-medium leading-relaxed italic">
              "{activeCard.comment}"
            </p>
          </div>

          {/* Card Item 3 & 4: Left bottom corner small circle face pic & Client Name */}
          <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Left corner small circle face pic */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#1769FF] shadow-md shrink-0">
                <img
                  src={activeCard.avatar}
                  alt={activeCard.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Name of that client */}
              <div>
                <div className="text-xs sm:text-base font-display font-bold text-[#171A21] flex items-center gap-1.5">
                  <span>{activeCard.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500">
                  {activeCard.location} · {activeCard.program}
                </div>
              </div>
            </div>

            {/* Result Badge */}
            <div className="text-right shrink-0">
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#EEF5FF] text-[#1769FF] border border-[#1769FF]/20">
                {activeCard.resultBadge}
              </span>
            </div>
          </div>

          {/* Swipe / Click Hint for user */}
          <div className="mt-2.5 pt-2 text-[10px] text-slate-400 flex flex-wrap items-center justify-between gap-1">
            <span>👆 Click card to pause/resume</span>
            <span>👈 Swipe left/right/up/down for next 👉</span>
          </div>
        </div>

      </div>

      {/* Manual Desktop Arrows & Quick Dots */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={advancePrevCard}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-1.5">
          {REVIEW_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'w-6 bg-[#1769FF]' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`View Review ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => advanceNextCard('right')}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
          aria-label="Next review"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
