import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ImagePlus, X } from 'lucide-react';
import { PageId, TransformationItem, ClientTransformation } from '../types';
import { CLIENT_TRANSFORMATIONS, TRANSFORMATION_VIDEOS } from '../data/mockData';
import { FeedbackVideoStrip } from '../components/ClientFeedback';

/**
 * Transformations page. Exactly three sections:
 * 1. A short health & fitness paragraph
 * 2. "Real Transformations": horizontal gallery of before & after photos (one photo per card,
 *    4 per screen on laptops) with a full-screen viewer
 * 3. "Transformation Stories": the auto-scrolling client video strip used on the Home page
 *
 * Content comes from CLIENT_TRANSFORMATIONS and TRANSFORMATION_VIDEOS in src/data/mockData.ts.
 */

interface TransformationsPageProps {
  onNavigate: (page: PageId) => void;
  onBookDemo: () => void;
  // Kept so App.tsx stays unchanged; this page uses its own lightbox and player.
  onOpenLightbox: (item: TransformationItem) => void;
  onOpenVideo: (item: TransformationItem) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const DESCRIPTION = [
  'Good health is built through consistent efforts, balanced nutrition and an active lifestyle.',
  'Every fitness journey is different, and every small improvement matters.',
  'With the right guidance, dedication and regular training, positive changes become part of everyday life.',
  'Our focus is not just physical transformation but also building strength, confidence and healthy habits.',
  'Every step forward reflects commitment and hard work.',
  'Explore the real journeys, progress and experiences of our clients.',
];

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

/** Mouse drag-to-scroll for a horizontal track. Touch keeps native swipe + snap. */
function useDragScroll(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) {
        moved = true;
        el.classList.add('is-dragging');
        el.setPointerCapture(e.pointerId);
      }
      if (moved) el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (moved) el.classList.remove('is-dragging'); // re-enables scroll-snap, which settles the cards
    };
    // Swallow the click that follows a drag so it doesn't open a card.
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('lostpointercapture', onUp);
    el.addEventListener('click', onClick, true);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('lostpointercapture', onUp);
      el.removeEventListener('click', onClick, true);
    };
  }, [ref]);
}

/** Tracks whether a track can scroll further left / right (for the arrow buttons). */
function useScrollEdges(ref: React.RefObject<HTMLDivElement | null>) {
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ref]);
  return edges;
}

/**
 * Once the track has been on screen for `delayMs`, it slowly scrolls itself to the right
 * (`speed` px per second); at the end it glides back to the first card and carries on.
 * It stops while the visitor hovers, drags, swipes or scrolls it, and continues a few seconds
 * after they leave it. Off for visitors who prefer reduced motion.
 */
function useAutoScroll(ref: React.RefObject<HTMLDivElement | null>, delayMs = 5000, speed = 32) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const RESUME_AFTER = 3000; // ms of no interaction before it moves again
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;
    let running = false;
    let hovering = false;
    let lastTouch = 0;
    let holdUntil = 0; // pause at the end / while gliding back to the start
    let pos = el.scrollLeft;
    let last = 0;
    let lastSet = el.scrollLeft; // where this hook last put the track
    let wasMoving = false;
    let glideTimer: ReturnType<typeof setTimeout> | undefined;

    const setAuto = (on: boolean) => el.classList.toggle('is-auto', on);

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 0;
      last = now;
      // Something else moved the track (e.g. the arrow buttons): treat it as the visitor's turn
      if (wasMoving && Math.abs(el.scrollLeft - lastSet) > 2) touched();
      const paused = hovering || now - lastTouch < RESUME_AFTER || now < holdUntil;
      wasMoving = !paused;
      if (paused) {
        setAuto(false);
        pos = el.scrollLeft;
      } else {
        setAuto(true);
        const max = el.scrollWidth - el.clientWidth;
        pos += (speed * dt) / 1000;
        if (pos >= max - 1) {
          // Reached the last card: wait 1.5 s, glide back to the first, then continue
          pos = max;
          holdUntil = now + 3500;
          glideTimer = setTimeout(() => {
            setAuto(false);
            el.scrollTo({ left: 0, behavior: 'smooth' });
          }, 1500);
        }
        el.scrollLeft = pos;
      }
      lastSet = el.scrollLeft;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      pos = lastSet = el.scrollLeft;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      clearTimeout(startTimer);
      clearTimeout(glideTimer);
      cancelAnimationFrame(raf);
      running = false;
      wasMoving = false;
      setAuto(false);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(startTimer);
          startTimer = setTimeout(start, delayMs);
        } else {
          stop();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);

    const touched = () => {
      lastTouch = performance.now();
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hovering = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        hovering = false;
        touched();
      }
    };
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointerdown', touched);
    el.addEventListener('touchstart', touched, { passive: true });
    el.addEventListener('wheel', touched, { passive: true });

    return () => {
      stop();
      observer.disconnect();
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointerdown', touched);
      el.removeEventListener('touchstart', touched);
      el.removeEventListener('wheel', touched);
    };
  }, [ref, delayMs, speed]);
}

function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

const scrollTrack = (el: HTMLDivElement | null, dir: 1 | -1) => {
  if (!el) return;
  const card = el.firstElementChild as HTMLElement | null;
  const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
  el.scrollBy({ left: dir * step, behavior: 'smooth' });
};

const ArrowButton: React.FC<{ dir: 'prev' | 'next'; disabled: boolean; onClick: () => void }> = ({
  dir,
  disabled,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={dir === 'prev' ? 'Previous' : 'Next'}
    className="w-11 h-11 rounded-full flex items-center justify-center border border-white/15 bg-white/[0.06] backdrop-blur-md text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:bg-[#1769FF] hover:border-[#1769FF] hover:shadow-[0_8px_28px_-6px_rgba(23,105,255,0.7)] active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
  >
    {dir === 'prev' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
  </button>
);

/** Section title; with `trackRef` + `edges` it also shows previous / next arrows for that track */
const SectionHeader: React.FC<{
  title: string;
  subtitle: string;
  trackRef?: React.RefObject<HTMLDivElement | null>;
  edges?: { start: boolean; end: boolean };
}> = ({ title, subtitle, trackRef, edges }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
    <motion.div
      className="max-w-2xl space-y-3"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed">{subtitle}</p>
    </motion.div>
    {trackRef && edges && (
      <div className="hidden sm:flex items-center gap-2.5 shrink-0">
        <ArrowButton dir="prev" disabled={edges.start} onClick={() => scrollTrack(trackRef.current, -1)} />
        <ArrowButton dir="next" disabled={edges.end} onClick={() => scrollTrack(trackRef.current, 1)} />
      </div>
    )}
  </div>
);

/** Soft blue light behind the glass cards so the blur has something to work with. */
const Glow: React.FC<{ className: string }> = ({ className }) => (
  <div aria-hidden className={`pointer-events-none absolute rounded-full blur-[110px] ${className}`} />
);

/* ------------------------------------------------------------------ */
/* Section 2: before & after                                           */
/* ------------------------------------------------------------------ */

type LoadState = 'loading' | 'loaded' | 'error';

/**
 * One before & after photo, shown whole (never cropped). The photos come in different shapes,
 * so a blurred copy of the same photo fills the space around it. Fades in once loaded.
 */
const BeforeAfterPhoto: React.FC<{
  src: string;
  alt: string;
  zoomOnHover?: boolean;
  lazy?: boolean;
  className?: string;
}> = ({ src, alt, zoomOnHover = false, lazy = true, className = '' }) => {
  const [state, setState] = useState<LoadState>('loading');

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#1C2028] ${className}`}>
      {state !== 'error' && (
        <>
          <img
            src={src}
            alt=""
            aria-hidden="true"
            draggable={false}
            loading={lazy ? 'lazy' : undefined}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-50"
          />
          <img
            src={src}
            alt={alt}
            draggable={false}
            loading={lazy ? 'lazy' : undefined}
            decoding="async"
            onLoad={() => setState('loaded')}
            onError={() => setState('error')}
            className={`absolute inset-0 w-full h-full object-contain transition-[opacity,transform] duration-700 ease-out ${
              state === 'loaded' ? 'opacity-100' : 'opacity-0'
            } ${zoomOnHover ? 'group-hover:scale-[1.04]' : ''}`}
          />
        </>
      )}

      {state === 'loading' && <div className="absolute inset-0 animate-pulse bg-white/[0.04]" />}

      {state === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <ImagePlus className="w-7 h-7 text-slate-400" strokeWidth={1.5} />
          <span className="text-xs font-semibold text-slate-300">Photo coming soon</span>
        </div>
      )}
    </div>
  );
};

/** 2 cards per screen on phones, 3 on tablets, 4 on laptops (gap: 1rem, 1.25rem from sm) */
const CARD_WIDTH = 'w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-3.75rem)/4)]';

const TransformationCard: React.FC<{
  item: ClientTransformation;
  index: number;
  onOpen: () => void;
}> = ({ item, index, onOpen }) => (
  <motion.div
    initial={{ opacity: 0, x: 70, scale: 0.96 }}
    whileInView={{ opacity: 1, x: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.8, delay: Math.min(index, 3) * 0.09, ease: EASE }}
    className={CARD_WIDTH}
  >
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger: ${item.title}`}
      className="group block w-full text-left rounded-[24px] p-2 sm:p-2.5 bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:border-[#1769FF]/45 hover:shadow-[0_32px_70px_-24px_rgba(23,105,255,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] cursor-pointer"
    >
      <BeforeAfterPhoto src={item.thumbSrc} alt={`${item.title}: before and after`} zoomOnHover className="aspect-[3/4]" />

      <h3 className="px-1.5 pt-3 pb-1 sm:px-2 font-display font-bold text-sm sm:text-base text-white leading-snug line-clamp-2 min-h-[2.75em]">
        {item.title}
      </h3>
    </button>
  </motion.div>
);

/** Full-screen view of the one photo that was clicked (no previous / next). Esc or a click outside closes it. */
const TransformationLightbox: React.FC<{
  item: ClientTransformation | null;
  onClose: () => void;
}> = ({ item, onClose }) => {
  const open = item !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-[#07080B]/85 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title}: before and after`}
        >
          <motion.div
            className="relative w-full max-w-3xl max-h-full overflow-y-auto rounded-[28px] p-3 sm:p-5 bg-white/[0.06] border border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-1 pb-3 sm:pb-4">
              <h3 className="min-w-0 font-display font-bold text-lg sm:text-2xl text-white">{item.title}</h3>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <BeforeAfterPhoto
              src={item.src}
              alt={`${item.title}: before and after`}
              lazy={false}
              className="w-full h-[min(72vh,50rem)] bg-black/40"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export const TransformationsPage: React.FC<TransformationsPageProps> = () => {
  const photoTrack = useRef<HTMLDivElement>(null);
  useDragScroll(photoTrack);
  useAutoScroll(photoTrack);
  const photoEdges = useScrollEdges(photoTrack);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <MotionConfig reducedMotion="user">
      {/* 1. Health & fitness description */}
      {/* Same opening band as the other pages (Services, About, Contact) */}
      <section className="bg-[#111318] text-white py-8 sm:py-12 lg:py-14 border-b border-[#1C2028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full container width so the description takes fewer lines */}
          <div className="space-y-2.5 sm:space-y-4">
            <motion.div
              className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 gap-y-0.5 text-[length:max(11px,calc(11rem/16))] sm:text-xs font-semibold text-[#00A3FF] uppercase tracking-wider [&>span]:whitespace-nowrap"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span>Transformations</span>
              <span className="text-slate-500">·</span>
              <span>Kothrud, Pune</span>
            </motion.div>
            <motion.h1
              className="text-xl sm:text-3xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            >
              Health, Fitness &amp; Real Progress
            </motion.h1>
            <motion.p
              className="text-xs sm:text-base lg:text-lg text-slate-300 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
            >
              {DESCRIPTION.slice(0, -1).join(' ')}{' '}
              <span className="text-white font-semibold">{DESCRIPTION[DESCRIPTION.length - 1]}</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. Before & after gallery */}
      <section
        aria-labelledby="real-transformations"
        className="relative overflow-hidden bg-[#111318] py-8 sm:py-12 lg:py-14"
      >
        <Glow className="w-[32.5rem] h-[32.5rem] -top-40 -left-32 bg-[#1769FF]/25" />
        <Glow className="w-[26.25rem] h-[26.25rem] bottom-0 right-[-7.5rem] bg-[#00A3FF]/15" />

        <div className="relative space-y-6 sm:space-y-8">
          <div id="real-transformations">
            <SectionHeader
              title="Real Transformations"
              subtitle="Real journeys, real dedication and visible progress. Every transformation tells a story of consistency and hard work."
              trackRef={photoTrack}
              edges={photoEdges}
            />
          </div>

          {/* Full screen width; starts moving by itself after 5 s on screen */}
          <div ref={photoTrack} className="ce-track ce-track--full gap-4 sm:gap-5 py-4">
            {CLIENT_TRANSFORMATIONS.map((item, i) => (
              <TransformationCard key={item.id} item={item} index={i} onOpen={() => setLightboxIndex(i)} />
            ))}
          </div>

        </div>
      </section>

      {/* 3. Client videos: same auto-scrolling strip as the Home page "Video Feedback" */}
      <section
        aria-labelledby="training-in-motion"
        className="relative overflow-hidden bg-[#0D0F14] pt-8 sm:pt-12 lg:pt-14 pb-2 sm:pb-4 border-t border-white/5"
      >
        <Glow className="w-[30rem] h-[30rem] top-10 right-[-5rem] bg-[#1769FF]/20" />
        <Glow className="w-[23.75rem] h-[23.75rem] -bottom-24 left-[10%] bg-[#0B3D91]/40" />

        <div className="relative">
          <div id="training-in-motion">
            <SectionHeader
              title="Transformation Stories"
              subtitle="Hear our clients talk about their training, their progress and the results they achieved."
            />
          </div>
          {/* Pulled up a little: the card slots add space above for the hover zoom */}
          <div className="w-full -mt-4 sm:-mt-6">
            <FeedbackVideoStrip videos={TRANSFORMATION_VIDEOS} label="Client transformation videos" />
          </div>
        </div>
      </section>

      <TransformationLightbox
        item={lightboxIndex !== null ? CLIENT_TRANSFORMATIONS[lightboxIndex] : null}
        onClose={closeLightbox}
      />
    </MotionConfig>
  );
};
