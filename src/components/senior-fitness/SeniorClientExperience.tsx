import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
// Sample clips until real senior client videos are added
import clipSquats from '../../assets/videos/stock/squat-training.mp4';
import clipLunges from '../../assets/videos/stock/lunge-workout.mp4';
import clipRopes from '../../assets/videos/stock/battle-ropes.mp4';
import clipDeadlift from '../../assets/videos/stock/strength-deadlift.mp4';

/**
 * Client Experience section for the Senior Fitness page ("Cinema Filmstrip" design).
 * 1. Description with three highlights
 * 2. Photo gallery: draggable / swipeable filmstrip, opens a full-screen viewer
 * 3. Video gallery: featured player + playlist
 *
 * All media below is SAMPLE content. Replace `src` with real client photos (shared with consent).
 * Add `videoSrc` to a video to play the real clip in the viewer instead of the placeholder message.
 */

const img = (name: string) => `/images/senior-fitness/${name}.webp`;
const EASE = [0.22, 1, 0.36, 1] as const;

interface Photo {
  src: string;
  position: string;
  title: string;
  caption: string;
  tag: string;
}

interface Video {
  src: string;
  position: string;
  title: string;
  duration: string;
  desc: string;
  videoSrc?: string;
}

const PHOTOS: Photo[] = [
  { src: img('hero'), position: '28% 45%', title: 'Light dumbbell strength', caption: 'Overhead presses with 1 kg dumbbells, so lifting shopping bags stays easy.', tag: 'Strength' },
  { src: img('assessment'), position: '62% 50%', title: 'Guided core work', caption: 'Seated medicine-ball rotations with the coach right beside you.', tag: 'Core' },
  { src: img('why-me'), position: '50% 55%', title: 'Outdoor mobility', caption: 'Triangle-pose stretches on the mat for hips, hamstrings and posture.', tag: 'Mobility' },
  { src: img('cta'), position: '62% 30%', title: 'Balance and coordination', caption: 'Slow arm sweeps that train steady footing and confidence.', tag: 'Balance' },
  { src: img('hero'), position: '74% 35%', title: 'Training as a couple', caption: 'Shared sessions for partners who want to stay active together.', tag: 'Strength' },
  { src: img('assessment'), position: '30% 40%', title: 'Form checks on every rep', caption: 'Hands-on cues keep each movement safe for knees, hips and back.', tag: 'Core' },
];

const VIDEOS: Video[] = [
  { src: img('assessment'), position: '55% 45%', title: 'Your first session', duration: '1:20', desc: 'How the first assessment checks balance, mobility and comfort before any plan is set.', videoSrc: clipSquats },
  { src: img('cta'), position: '62% 30%', title: 'A 10-minute balance routine', duration: '2:45', desc: 'Standing drills you can repeat at home, with a chair nearby for support.', videoSrc: clipLunges },
  { src: img('why-me'), position: '50% 50%', title: 'Morning mobility flow', duration: '1:50', desc: 'Gentle stretches that ease stiffness in the hips, back and shoulders.', videoSrc: clipRopes },
  { src: img('hero'), position: '32% 40%', title: 'Dumbbell basics', duration: '2:10', desc: 'Light-weight strength moves for stronger arms and better posture.', videoSrc: clipDeadlift },
];

const HIGHLIGHTS = [
  { title: 'One-on-one attention', desc: 'The coach stays beside you for the full session and adjusts every exercise.' },
  { title: 'Safety in every movement', desc: 'Chair support, balance checks and light weights protect joints and back.' },
  { title: 'Progress you can feel', desc: 'Small weekly steps that make daily tasks easier.' },
];

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* Full-screen viewer (photos and videos)                              */
/* ------------------------------------------------------------------ */

type ViewerState = { kind: 'photo' | 'video'; index: number } | null;

const MediaViewer: React.FC<{ state: ViewerState; onClose: () => void; onChange: (index: number) => void }> = ({
  state,
  onClose,
  onChange,
}) => {
  const swipeStart = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = state ? (state.kind === 'photo' ? PHOTOS.length : VIDEOS.length) : 0;

  const go = useCallback(
    (dir: number) => {
      if (!state) return;
      onChange((state.index + dir + count) % count);
    },
    [state, count, onChange]
  );

  // Latest handlers for the key listener, so it is attached once per open
  const handlers = useRef({ go, onClose });
  handlers.current = { go, onClose };
  const isOpen = state !== null;

  useEffect(() => {
    if (!isOpen) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handlers.current.onClose();
      else if (e.key === 'ArrowRight') handlers.current.go(1);
      else if (e.key === 'ArrowLeft') handlers.current.go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [isOpen]);

  const item = state ? (state.kind === 'photo' ? PHOTOS[state.index] : VIDEOS[state.index]) : null;
  const video = state?.kind === 'video' ? (item as Video) : null;

  return (
    <AnimatePresence>
      {state && item && (
        <motion.div
          key="viewer"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[100] bg-[#060910]/95 flex flex-col items-center justify-center gap-4 px-4 pt-16 pb-24 sm:pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative w-full max-w-5xl flex justify-center touch-pan-y"
            onPointerDown={(e) => (swipeStart.current = e.clientX)}
            onPointerUp={(e) => {
              if (swipeStart.current === null) return;
              const dx = e.clientX - swipeStart.current;
              swipeStart.current = null;
              if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
            }}
          >
            {video?.videoSrc ? (
              <video
                key={video.videoSrc}
                src={video.videoSrc}
                poster={video.src}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="max-h-[70vh] max-w-full rounded-2xl"
              />
            ) : (
              <motion.img loading="lazy" decoding="async"
                key={`${state.kind}-${state.index}`}
                src={item.src}
                alt={item.title}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="max-h-[70vh] max-w-full rounded-2xl object-contain select-none"
                draggable={false}
              />
            )}
            {video && !video.videoSrc && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6 pointer-events-none">
                <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1769FF] flex items-center justify-center shadow-[0_0_0_10px_rgba(23,105,255,0.25)]">
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </span>
                <p className="text-sm sm:text-base text-white max-w-xs bg-[#060910]/60 rounded-xl px-3 py-2">
                  Video coming soon.
                </p>
              </div>
            )}
          </div>

          <div className="w-full max-w-5xl flex justify-between items-start gap-4 text-white">
            <div>
              <h3 className="text-lg sm:text-xl font-display font-semibold">
                {item.title}
                {video ? ` · ${video.duration}` : ''}
              </h3>
              <p className="text-sm text-slate-400 mt-1">{'caption' in item ? item.caption : item.desc}</p>
            </div>
            <span className="text-sm text-slate-400 tabular-nums whitespace-nowrap">
              {state.index + 1} / {count}
            </span>
          </div>

          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-4 bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-4 bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export const SeniorClientExperience: React.FC = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: 0 });
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState({ width: 30, offset: 0 });
  const [activeVideo, setActiveVideo] = useState(0);
  const [viewer, setViewer] = useState<ViewerState>(null);

  const updateProgress = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    const width = Math.max(0.2, el.clientWidth / el.scrollWidth);
    setProgress({ width: width * 100, offset: ratio * (1 - width) * 100 });
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener('resize', updateProgress);

    // Mouse drag-to-scroll (touch devices use native swipe + snap)
    const onMove = (e: PointerEvent) => {
      const d = drag.current;
      const el = stripRef.current;
      if (!d.down || !el) return;
      const dx = e.clientX - d.startX;
      d.moved = Math.max(d.moved, Math.abs(dx));
      el.scrollLeft = d.startScroll - dx;
      if (d.moved > 5) setDragging(true);
    };
    const onUp = () => {
      const d = drag.current;
      if (!d.down) return;
      d.down = false;
      setDragging(false);
      if (d.moved > 5) {
        suppressClick.current = true;
        setTimeout(() => (suppressClick.current = false), 60);
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('resize', updateProgress);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [updateProgress]);

  const step = (dir: number) => {
    const el = stripRef.current;
    const card = el?.querySelector<HTMLElement>('[data-frame]');
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 18), behavior: 'smooth' });
  };

  const featured = VIDEOS[activeVideo];

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 text-[#F2F5FB] overflow-hidden bg-[#0A1020]">
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(900px_500px_at_85%_0%,rgba(23,105,255,0.22),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Description */}
        <FadeUp>
          <div className="text-[length:max(11px,calc(11rem/16))] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#6EA2FF]">Client Experience</div>
          <h2 className="mt-3 mb-4 text-3xl sm:text-5xl lg:text-[3.6rem] font-display font-bold leading-[1.04] tracking-tight max-w-[16ch] text-balance">
            What training feels like, <span className="text-[#6EA2FF]">session by session</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#9AA6BD] leading-relaxed max-w-2xl">
            Every session is planned around your body on that day. We start slow, check your balance and joints, and build strength you can use at home: climbing stairs, carrying groceries and getting up from the floor with ease.
          </p>
        </FadeUp>
        <FadeUp delay={0.1} className="mt-8 sm:mt-11 grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={h.title}
              className={`py-4 md:pt-5 md:pb-0 md:pr-6 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-white/10 md:pl-6' : ''}`}
            >
              <h3 className="font-display font-semibold text-base sm:text-lg">{h.title}</h3>
              <p className="text-xs sm:text-sm text-[#9AA6BD] mt-1 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </FadeUp>

        {/* 2. Photo gallery */}
        <FadeUp className="flex justify-between items-end gap-4 flex-wrap mt-14 sm:mt-20 mb-6">
          <div>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl">Photo gallery</h3>
            <p className="text-sm sm:text-base text-[#9AA6BD] mt-1">
              Drag or swipe through the sessions. Tap a photo to view it full screen.
            </p>
          </div>
          <div className="hidden sm:flex gap-2.5">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                onClick={() => step(dir)}
                aria-label={dir < 0 ? 'Previous photos' : 'Next photos'}
                className="w-11 h-11 rounded-full border border-white/10 bg-[#121B31] hover:bg-[#18233D] hover:border-[#6EA2FF] text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                {dir < 0 ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </FadeUp>

        <div
          ref={stripRef}
          onScroll={updateProgress}
          onPointerDown={(e) => {
            if (e.pointerType !== 'mouse') return;
            drag.current = { down: true, startX: e.clientX, startScroll: stripRef.current?.scrollLeft ?? 0, moved: 0 };
          }}
          className={`flex gap-[18px] overflow-x-auto pb-4 -mr-4 sm:-mr-6 lg:mr-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            dragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'
          }`}
        >
          {PHOTOS.map((p, i) => (
            <motion.button
              key={`${p.title}-${i}`}
              data-frame
              onClick={() => !suppressClick.current && setViewer({ kind: 'photo', index: i })}
              aria-label={`Open photo: ${p.title}`}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: EASE }}
              className="group shrink-0 basis-[72%] sm:basis-[260px] lg:basis-[290px] snap-start text-left focus-visible:outline-2 focus-visible:outline-[#6EA2FF] focus-visible:outline-offset-4 rounded-[18px]"
            >
              <span className="relative block aspect-3/4 rounded-[18px] overflow-hidden border border-white/10 bg-[#121B31]">
                <img decoding="async"
                  src={p.src}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  style={{ objectPosition: p.position }}
                  className="w-full h-full object-cover saturate-[.9] transition duration-700 ease-out group-hover:scale-[1.06] group-hover:saturate-100 pointer-events-none"
                />
                <span className="absolute left-3 top-3 text-[length:max(11px,calc(11rem/16))] font-semibold uppercase tracking-wider bg-[#0A1020]/70 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1">
                  {p.tag}
                </span>
              </span>
              <span className="block font-display font-semibold text-base sm:text-[length:max(17px,calc(17rem/16))] mt-3.5">{p.title}</span>
              <span className="block text-xs sm:text-[length:max(13.5px,calc(13.5rem/16))] text-[#9AA6BD] leading-relaxed mt-0.5">{p.caption}</span>
            </motion.button>
          ))}
        </div>
        <div className="h-[3px] bg-white/10 rounded-full overflow-hidden mt-1.5" aria-hidden="true">
          <div
            className="h-full bg-[#6EA2FF] rounded-full transition-transform duration-150"
            style={{ width: `${progress.width}%`, transform: `translateX(${(progress.offset / progress.width) * 100}%)` }}
          />
        </div>

        {/* 3. Video gallery */}
        <FadeUp className="flex justify-between items-end gap-4 flex-wrap mt-14 sm:mt-20 mb-6">
          <div>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl">Video gallery</h3>
            <p className="text-sm sm:text-base text-[#9AA6BD] mt-1">
              Pick a clip from the list. Each one shows how a type of session works.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.05} className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 lg:gap-6 items-start">
          <button
            onClick={() => setViewer({ kind: 'video', index: activeVideo })}
            aria-label={`Play video: ${featured.title}`}
            className="group relative w-full aspect-video rounded-[22px] overflow-hidden bg-[#121B31] text-left text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6EA2FF] focus-visible:outline-offset-4"
          >
            <AnimatePresence mode="wait">
              {/* Featured clip autoplays muted on loop (falls back to the poster image) */}
              <motion.video
                key={activeVideo}
                src={featured.videoSrc}
                poster={featured.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                style={{ objectPosition: featured.position }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <span className="absolute inset-0 bg-gradient-to-b from-[#0A1020]/10 to-[#0A1020]/85" />
            <span className="absolute right-4 top-4 bg-black/55 rounded-lg px-2.5 py-0.5 text-xs sm:text-sm font-semibold tabular-nums">
              {featured.duration}
            </span>
            <span className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1769FF] flex items-center justify-center shadow-[0_0_0_12px_rgba(23,105,255,0.25),0_0_60px_rgba(23,105,255,0.6)] transition-transform duration-300 group-hover:scale-110">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <span className="block font-display font-semibold text-lg sm:text-2xl">{featured.title}</span>
              <span className="hidden sm:block text-sm sm:text-[length:max(15px,calc(15rem/16))] text-[#C9D2E3] max-w-xl mt-1">{featured.desc}</span>
            </span>
          </button>

          <div className="grid gap-2.5">
            {VIDEOS.map((v, i) => (
              <button
                key={v.title}
                onClick={() => setActiveVideo(i)}
                aria-current={i === activeVideo}
                className={`grid grid-cols-[96px_1fr] sm:grid-cols-[112px_1fr] gap-3.5 items-center p-2.5 rounded-2xl border text-left cursor-pointer transition-colors ${
                  i === activeVideo ? 'bg-[#18233D] border-[#6EA2FF]/40' : 'border-transparent hover:bg-[#121B31]'
                }`}
              >
                <span className="relative block aspect-[16/10] rounded-[10px] overflow-hidden">
                  <img decoding="async" src={v.src} alt="" loading="lazy" style={{ objectPosition: v.position }} className="w-full h-full object-cover" />
                  <span className="absolute right-1.5 bottom-1.5 bg-black/70 rounded-md px-1.5 text-[length:max(11px,calc(11rem/16))] tabular-nums">{v.duration}</span>
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-semibold text-sm sm:text-[length:max(15.5px,calc(15.5rem/16))] leading-snug">{v.title}</span>
                  <span className="block text-xs sm:text-[length:max(13px,calc(13rem/16))] text-[#9AA6BD] leading-snug mt-0.5 line-clamp-2">{v.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </FadeUp>

        <p className="mt-8 sm:mt-9 text-xs sm:text-[length:max(13px,calc(13rem/16))] text-[#9AA6BD]">
          These are placeholders. Real client photos and videos will be added with their consent.
        </p>
      </div>

      <MediaViewer
        state={viewer}
        onClose={() => setViewer(null)}
        onChange={(index) => setViewer((s) => (s ? { ...s, index } : s))}
      />
    </section>
  );
};
