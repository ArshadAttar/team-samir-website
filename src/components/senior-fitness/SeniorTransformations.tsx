import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { img } from '../../data/seniorFitnessMedia';

// Real senior client sessions (recorded live online coaching). Clips: senior-NN.mp4 (720x480, ~18 s);
// thumbnails: senior-video-NN.webp (frame at 5 s). Originals are in ../media-originals/Website/senior-fitness-video/.
const clip = (n: number) => `/media/senior-fitness/transformations/videos/senior-0${n}.mp4`;
const thumb = (n: number) => `/media/senior-fitness/transformations/photos/senior-video-0${n}.webp`;
const seniorVideo = (n: number, title: string, desc: string): Video => ({
  src: thumb(n),
  position: '50% 50%',
  title,
  duration: '0:18',
  desc,
  videoSrc: clip(n),
});

/**
 * Transformations section for the Senior Fitness page ("Cinema Filmstrip" design).
 * 1. Description with three highlights
 * 2. Photo gallery: draggable / swipeable filmstrip, opens a full-screen viewer
 * 3. Video gallery: featured player + playlist
 *
 * The photos are SAMPLE content: replace `src` with real client photos (shared with consent).
 * The videos are real client sessions (see `seniorVideo` above).
 */

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
  seniorVideo(1, 'Resistance band rows at home', 'Seated band pulls on a mat that strengthen the upper back and improve posture, coached live on a video call.'),
  seniorVideo(2, 'Leg press for stronger legs', 'Slow, controlled leg presses that build thigh strength for climbing stairs and standing up from a chair.'),
  seniorVideo(3, 'Standing dumbbell press', 'Light dumbbells pressed overhead for stronger shoulders and arms, with posture checked on every rep.'),
  seniorVideo(4, 'Floor chest press', 'Lying on a mat with a pillow for support, pressing a light bar to build chest and arm strength safely.'),
  seniorVideo(5, 'Chair-supported leg raises', 'Leg lifts while holding a chair, strengthening the hips and thighs without any strain on the back.'),
  seniorVideo(6, 'Seated leg work', 'Gentle seated leg movements that keep the knees and ankles mobile and strong.'),
  seniorVideo(7, 'Band press from a chair', 'Resistance band presses while seated, so the arms and shoulders work while the back stays supported.'),
  seniorVideo(8, 'Bodyweight squats', 'Sit-back squats that train the legs for getting up from a chair, sofa or the floor with ease.'),
  seniorVideo(9, 'Floor core exercises', 'Simple movements lying on the mat that strengthen the core and support the lower back.'),
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

export const SeniorTransformations: React.FC = () => {
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
    <section className="relative py-8 sm:py-12 lg:py-14 text-[#F2F5FB] overflow-hidden bg-[#0A1020]">
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(900px_500px_at_85%_0%,rgba(23,105,255,0.22),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Description */}
        <FadeUp className="text-center">
          <div className="text-[length:max(11px,calc(11rem/16))] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#6EA2FF]">Transformations</div>
          {/* One line on desktop; wraps on smaller screens */}
          <h2 className="mt-3 mb-4 text-[2rem] sm:text-[2.6rem] lg:text-[3.1rem] font-display font-bold leading-[1.1] tracking-tight text-balance lg:whitespace-nowrap">
            What training feels like, <span className="text-[#6EA2FF]">session by session</span>
          </h2>
          {/* Two lines on desktop */}
          <p className="text-[length:max(13px,calc(13rem/16))] sm:text-[length:max(14.5px,calc(14.5rem/16))] lg:text-base text-[#9AA6BD] leading-relaxed max-w-6xl mx-auto text-balance">
            Every session is planned around your body on that day. We start slow, check your balance and joints, and build strength you can use at home: climbing stairs, carrying groceries and getting up from the floor with ease.
          </p>
        </FadeUp>

        {/* 3. Video gallery */}
        <FadeUp className="flex justify-between items-end gap-4 flex-wrap mt-8 sm:mt-10 mb-5 sm:mb-6">
          <div>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl">Real sessions with our senior clients</h3>
            <p className="text-sm sm:text-base text-[#9AA6BD] mt-1">
              Recorded during live one-on-one coaching. Pick a clip from the list to see how each session works.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.05} className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 lg:gap-6 items-start">
          <div>
          <button
            onClick={() => setViewer({ kind: 'video', index: activeVideo })}
            aria-label={`Play video: ${featured.title}`}
            className="group relative block w-full aspect-video rounded-[22px] overflow-hidden bg-black text-left text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6EA2FF] focus-visible:outline-offset-4"
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
                className="absolute inset-0 w-full h-full object-contain"
              />
            </AnimatePresence>
            <span className="absolute right-4 top-4 bg-black/55 rounded-lg px-2.5 py-0.5 text-xs sm:text-sm font-semibold tabular-nums">
              {featured.duration}
            </span>
          </button>
          {/* Title and description sit below the video, not on top of it */}
          <div className="mt-4 px-1">
            <h4 className="font-display font-semibold text-lg sm:text-2xl">{featured.title}</h4>
            <p className="text-sm sm:text-[length:max(15px,calc(15rem/16))] text-[#9AA6BD] max-w-xl mt-1">{featured.desc}</p>
          </div>
          </div>

          {/* Playlist: 5 clips visible, the rest scroll inside this box only */}
          <div className="grid gap-2.5 max-h-[440px] sm:max-h-[490px] overflow-y-auto overscroll-contain pr-1.5 [scrollbar-width:thin] [scrollbar-color:#2A3A5E_transparent]">
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
      </div>

      <MediaViewer
        state={viewer}
        onClose={() => setViewer(null)}
        onChange={(index) => setViewer((s) => (s ? { ...s, index } : s))}
      />
    </section>
  );
};
