import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LazyVideo } from '../components/LazyVideo';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ChevronLeft, ChevronRight, ImagePlus, MoveRight, Play, VideoOff, X } from 'lucide-react';
import { PageId, TransformationItem, ClientTransformation, ClientVideo } from '../types';
import { CLIENT_TRANSFORMATIONS, CLIENT_VIDEOS } from '../data/mockData';

/**
 * Transformations page. Exactly three sections:
 * 1. A short health & fitness paragraph
 * 2. "Real Transformations": horizontal before/after gallery with a lightbox
 * 3. "Training in Motion": horizontal video gallery with a player modal
 *
 * Content comes from CLIENT_TRANSFORMATIONS and CLIENT_VIDEOS in src/data/mockData.ts.
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

/** Thin bar showing how far a track has been scrolled. */
const TrackProgress: React.FC<{ trackRef: React.RefObject<HTMLDivElement | null> }> = ({ trackRef }) => {
  const { scrollXProgress } = useScroll({ container: trackRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-[3px] w-full max-w-xs rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#1769FF] to-[#00A3FF]"
          style={{ scaleX }}
        />
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{
  title: string;
  subtitle: string;
  trackRef: React.RefObject<HTMLDivElement | null>;
  edges: { start: boolean; end: boolean };
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
    <div className="hidden sm:flex items-center gap-2.5 shrink-0">
      <ArrowButton dir="prev" disabled={edges.start} onClick={() => scrollTrack(trackRef.current, -1)} />
      <ArrowButton dir="next" disabled={edges.end} onClick={() => scrollTrack(trackRef.current, 1)} />
    </div>
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
 * One photo with its BEFORE / AFTER label. Fades in once loaded and falls back
 * to an "add photo" placeholder when the file doesn't exist yet.
 */
const PhotoFrame: React.FC<{
  src: string;
  kind: 'before' | 'after';
  alt: string;
  fit?: 'cover' | 'contain';
  zoomOnHover?: boolean;
  className?: string;
}> = ({ src, kind, alt, fit = 'cover', zoomOnHover = false, className = '' }) => {
  const [state, setState] = useState<LoadState>('loading');
  const isAfter = kind === 'after';

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#1C2028] ${className}`}>
      {state !== 'error' && (
        <img decoding="async"
          src={src}
          alt={alt}
          draggable={false}
          loading="lazy"
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={`absolute inset-0 w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} transition-[opacity,transform] duration-700 ease-out ${
            state === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${zoomOnHover ? 'group-hover:scale-[1.07]' : ''}`}
        />
      )}

      {state === 'loading' && <div className="absolute inset-0 animate-pulse bg-white/[0.04]" />}

      {state === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center bg-[radial-gradient(circle_at_50%_35%,rgba(23,105,255,0.18),transparent_65%)]">
          <div className="absolute inset-3 rounded-xl border border-dashed border-white/15" />
          <ImagePlus className={`w-7 h-7 ${isAfter ? 'text-[#00A3FF]' : 'text-slate-400'}`} strokeWidth={1.5} />
          <span className="text-[length:max(11px,calc(11rem/16))] sm:text-xs font-semibold text-slate-300">
            {isAfter ? 'After photo' : 'Before photo'}
          </span>
          <span className="text-[length:max(10px,calc(10rem/16))] text-slate-500">Coming soon</span>
        </div>
      )}

      {/* Subtle bottom shade so labels and captions stay readable on any photo */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

      <span
        className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 px-2.5 py-1 rounded-full text-[length:max(10px,calc(10rem/16))] sm:text-[length:max(11px,calc(11rem/16))] font-bold uppercase tracking-[0.14em] backdrop-blur-md border ${
          isAfter
            ? 'bg-[#1769FF]/85 border-[#5C9BFF]/50 text-white shadow-[0_4px_14px_-4px_rgba(23,105,255,0.8)]'
            : 'bg-black/55 border-white/20 text-white/90'
        }`}
      >
        {isAfter ? 'After' : 'Before'}
      </span>
    </div>
  );
};

const transformationTitle = (t: ClientTransformation, index: number) =>
  t.clientName || `Transformation ${String(index + 1).padStart(2, '0')}`;

const transformationMeta = (t: ClientTransformation) =>
  [t.focus, t.duration].filter(Boolean).join(' · ') || 'Client story coming soon';

const TransformationCard: React.FC<{
  item: ClientTransformation;
  index: number;
  onOpen: () => void;
}> = ({ item, index, onOpen }) => {
  const title = transformationTitle(item, index);
  return (
    <motion.div
      initial={{ opacity: 0, x: 70, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.8, delay: Math.min(index, 3) * 0.09, ease: EASE }}
      className="w-[80vw] max-w-[35rem] sm:w-[32.5rem] lg:w-[36.25rem]"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${title} before and after`}
        className="group block w-full text-left rounded-[28px] p-2.5 sm:p-3 bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:border-[#1769FF]/45 hover:shadow-[0_32px_70px_-24px_rgba(23,105,255,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] cursor-pointer"
      >
        <div className="relative grid grid-cols-2 gap-1.5 sm:gap-2">
          <PhotoFrame src={item.beforeSrc} kind="before" alt={`${title}: before`} zoomOnHover className="aspect-[4/5]" />
          <PhotoFrame src={item.afterSrc} kind="after" alt={`${title}: after`} zoomOnHover className="aspect-[4/5]" />

          {/* Centre marker between the two photos */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#111318]/70 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_6px_20px_-4px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-110">
            <MoveRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3FF]" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-2 pt-3.5 pb-1.5 sm:px-3">
          <div className="min-w-0">
            <h3 className="font-display font-bold text-base sm:text-lg text-white truncate">{title}</h3>
            <p className="text-xs sm:text-[length:max(13px,calc(13rem/16))] text-slate-400 truncate">{transformationMeta(item)}</p>
          </div>
          <span className="shrink-0 text-[length:max(11px,calc(11rem/16))] sm:text-xs font-semibold text-[#00A3FF] opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">
            View
          </span>
        </div>
      </button>
    </motion.div>
  );
};

const TransformationLightbox: React.FC<{
  items: ClientTransformation[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}> = ({ items, index, onClose, onIndexChange }) => {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(1);
  useBodyScrollLock(open);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      setDirection(dir);
      onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go, onClose]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && index !== null && (
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
          aria-label={`${transformationTitle(item, index)} before and after`}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-full overflow-y-auto rounded-[28px] p-3 sm:p-5 bg-white/[0.06] border border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-1 pb-3 sm:pb-4">
              <div className="min-w-0">
                <p className="text-[length:max(11px,calc(11rem/16))] font-semibold uppercase tracking-[0.18em] text-[#00A3FF]">
                  {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </p>
                <h3 className="font-display font-bold text-lg sm:text-2xl text-white truncate">
                  {transformationTitle(item, index)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">{transformationMeta(item)}</p>              </div>
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

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={item.id}
                custom={direction}
                className="grid grid-cols-2 gap-2 sm:gap-3"
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <PhotoFrame
                  src={item.beforeSrc}
                  kind="before"
                  alt={`${transformationTitle(item, index)}: before`}
                  fit="contain"
                  className="aspect-[4/5] max-h-[68vh] bg-black/40"
                />
                <PhotoFrame
                  src={item.afterSrc}
                  kind="after"
                  alt={`${transformationTitle(item, index)}: after`}
                  fit="contain"
                  className="aspect-[4/5] max-h-[68vh] bg-black/40"
                />
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <div className="flex items-center justify-center gap-3 pt-4">
                <ArrowButton dir="prev" disabled={false} onClick={() => go(-1)} />
                <div className="flex items-center gap-1.5">
                  {items.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      aria-label={`Show transformation ${i + 1}`}
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        onIndexChange(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === index ? 'w-6 bg-[#1769FF]' : 'w-1.5 bg-white/25 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                <ArrowButton dir="next" disabled={false} onClick={() => go(1)} />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ------------------------------------------------------------------ */
/* Section 3: videos                                                   */
/* ------------------------------------------------------------------ */

const VideoCard: React.FC<{ video: ClientVideo; index: number; onOpen: () => void }> = ({
  video,
  index,
  onOpen,
}) => {
  const previewRef = useRef<HTMLVideoElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 18 });
  const available = Boolean(video.src);

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onEnter = () => {
    const v = previewRef.current;
    if (v) v.play().catch(() => {});
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.8, delay: Math.min(index, 3) * 0.1, ease: EASE }}
      className="w-[62vw] max-w-[18.75rem] sm:w-[17.5rem] lg:w-[18.75rem]"
      style={{ perspective: 1000 }}
    >
      <motion.button
        type="button"
        onClick={available ? onOpen : undefined}
        disabled={!available}
        aria-label={available ? `Play ${video.title}` : `${video.title} (coming soon)`}
        onPointerMove={onPointerMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative block w-full text-left rounded-[26px] p-2 bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] transition-[border-color,box-shadow] duration-500 hover:border-[#1769FF]/45 hover:shadow-[0_30px_70px_-22px_rgba(23,105,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] enabled:cursor-pointer disabled:cursor-default"
      >
        <div className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-[#1C2028]">
          {available ? (
            <LazyVideo
              ref={previewRef}
              src={`${video.src}#t=0.5`}
              autoPlay
              muted
              loop
              playsInline
              aria-label={video.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-6 bg-[radial-gradient(circle_at_50%_40%,rgba(23,105,255,0.22),transparent_65%)]">
              <div className="absolute inset-3 rounded-2xl border border-dashed border-white/15" />
              <VideoOff className="w-7 h-7 text-slate-400" strokeWidth={1.5} />
              <span className="text-xs font-semibold text-slate-300">Video coming soon</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/95 via-[#07080B]/20 to-transparent pointer-events-none" />

          {available && (
            <div
              className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ transform: 'translateZ(40px)' }}
            >
              <span className="absolute inset-0 rounded-full bg-[#1769FF]/40 animate-ping [animation-duration:2.4s]" />
              <span className="relative flex w-16 h-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_10px_30px_-6px_rgba(23,105,255,0.8)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#1769FF]">
                <Play className="w-6 h-6 ml-1 text-white fill-current" />
              </span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5" style={{ transform: 'translateZ(24px)' }}>
            <h3 className="font-display font-bold text-base sm:text-lg text-white leading-snug">{video.title}</h3>
            <p className="mt-1 text-xs sm:text-[length:max(13px,calc(13rem/16))] text-slate-300/90 leading-relaxed">{video.description}</p>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

const VideoPlayerModal: React.FC<{ video: ClientVideo | null; onClose: () => void }> = ({ video, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyScrollLock(Boolean(video));

  useEffect(() => {
    if (!video) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video?.src && (
        <motion.div
          key="video-modal"
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-[#07080B]/85 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
        >
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-[28px] p-2 bg-white/[0.06] border border-white/10 backdrop-blur-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
              <video
                src={video.src}
                controls
                autoPlay
                muted
                playsInline
                className={`block object-contain rounded-[22px] bg-black ${
                  video.portrait
                    ? 'h-[min(76vh,45rem)] w-auto max-w-[calc(100vw-2.5rem)] aspect-[9/16]'
                    : 'w-[min(calc(100vw-2.5rem),60rem)] h-auto max-h-[72vh] aspect-video'
                }`}
              />
            </div>
            <div className="w-full max-w-sm text-center pt-4 px-2">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">{video.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{video.description}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-3 -right-3 sm:-right-14 sm:top-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/15 border border-white/20 backdrop-blur-md text-white hover:bg-white/25 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
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
  const videoTrack = useRef<HTMLDivElement>(null);
  useDragScroll(photoTrack);
  useDragScroll(videoTrack);
  const photoEdges = useScrollEdges(photoTrack);
  const videoEdges = useScrollEdges(videoTrack);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<ClientVideo | null>(null);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  return (
    <MotionConfig reducedMotion="user">
      {/* 1. Health & fitness description */}
      {/* Same opening band as the other pages (Services, About, Contact) */}
      <section className="bg-[#111318] text-white py-8 sm:py-12 lg:py-14 border-b border-[#1C2028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2.5 sm:space-y-4">
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
        className="relative overflow-hidden bg-[#111318] py-10 sm:py-14"
      >
        <Glow className="w-[32.5rem] h-[32.5rem] -top-40 -left-32 bg-[#1769FF]/25" />
        <Glow className="w-[26.25rem] h-[26.25rem] bottom-0 right-[-7.5rem] bg-[#00A3FF]/15" />

        <div className="relative space-y-8 sm:space-y-12">
          <div id="real-transformations">
            <SectionHeader
              title="Real Transformations"
              subtitle="Real journeys, real dedication and visible progress. Every transformation tells a story of consistency and hard work."
              trackRef={photoTrack}
              edges={photoEdges}
            />
          </div>

          <div ref={photoTrack} className="ce-track gap-4 sm:gap-5 py-4">
            {CLIENT_TRANSFORMATIONS.map((item, i) => (
              <TransformationCard key={item.id} item={item} index={i} onOpen={() => setLightboxIndex(i)} />
            ))}
          </div>

          <div className="space-y-3">
            <TrackProgress trackRef={photoTrack} />
            {/* Fine print while stock photos are in use. Remove once every pair is a real client. */}
            {CLIENT_TRANSFORMATIONS.some((t) => t.sample) && (
              <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[length:max(11px,calc(11rem/16))] text-slate-500">
                Images shown are illustrative.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3. Video gallery */}
      <section
        aria-labelledby="training-in-motion"
        className="relative overflow-hidden bg-[#0D0F14] py-10 sm:py-14 border-t border-white/5"
      >
        <Glow className="w-[30rem] h-[30rem] top-10 right-[-5rem] bg-[#1769FF]/20" />
        <Glow className="w-[23.75rem] h-[23.75rem] -bottom-24 left-[10%] bg-[#0B3D91]/40" />

        <div className="relative space-y-8 sm:space-y-12">
          <div id="training-in-motion">
            <SectionHeader
              title="Training in Motion"
              subtitle="Explore real workout sessions, training highlights and memorable moments from our fitness community."
              trackRef={videoTrack}
              edges={videoEdges}
            />
          </div>

          <div ref={videoTrack} className="ce-track gap-4 sm:gap-6 py-6">
            {CLIENT_VIDEOS.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} onOpen={() => setActiveVideo(video)} />
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
            <div className="flex-1">
              <TrackProgress trackRef={videoTrack} />
            </div>
            <div className="flex sm:hidden items-center gap-2 pr-4">
              <ArrowButton dir="prev" disabled={videoEdges.start} onClick={() => scrollTrack(videoTrack.current, -1)} />
              <ArrowButton dir="next" disabled={videoEdges.end} onClick={() => scrollTrack(videoTrack.current, 1)} />
            </div>
          </div>
        </div>
      </section>

      <TransformationLightbox
        items={CLIENT_TRANSFORMATIONS}
        index={lightboxIndex}
        onClose={closeLightbox}
        onIndexChange={setLightboxIndex}
      />
      <VideoPlayerModal video={activeVideo} onClose={closeVideo} />
    </MotionConfig>
  );
};
