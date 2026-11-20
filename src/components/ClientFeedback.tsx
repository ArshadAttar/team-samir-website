import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { LazyVideo } from './LazyVideo';
import { Star, Quote, CheckCircle2, Video, X, MapPin } from 'lucide-react';
import { REVIEWS, VIDEO_FEEDBACK } from '../data/mockData';
import { ReviewItem, VideoFeedbackItem } from '../types';
import { Marquee } from './Marquee';

/* Shared frosted-glass card surface */
const GLASS =
  'h-full rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-white/[0.12] hover:border-white/30';

/** Turns **text** into bold; everything else is plain text */
const renderBold = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-bold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );

/** Review text with the client's own paragraphs ('\n\n') and line breaks ('\n') kept */
const ReviewText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {text.split('\n\n').map((para, i) => (
      <p key={i} className="whitespace-pre-line">
        {renderBold(para)}
      </p>
    ))}
  </div>
);

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
    ))}
  </div>
);

const ReviewAuthor: React.FC<{ review: ReviewItem }> = ({ review }) => (
  <div className="flex items-center gap-3 min-w-0">
    <img decoding="async"
      src={review.avatar}
      alt=""
      loading="lazy"
      className="w-11 h-11 rounded-full object-cover border-2 border-white/30 shrink-0"
    />
    <div className="min-w-0">
      <div className="text-sm font-bold text-white truncate">{review.name}</div>
      <div className="mt-0.5 inline-flex max-w-full items-center gap-1 px-2 py-0.5 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30 text-[length:max(11px,calc(11rem/16))] font-semibold text-[#5CC8FF]">
        <MapPin className="w-3 h-3 shrink-0" />
        <span className="truncate">{review.location}</span>
      </div>
    </div>
  </div>
);

const ResultBadge: React.FC<{ text: string }> = ({ text }) => (
  <span className="self-start inline-flex items-start gap-1.5 text-[length:max(11px,calc(11rem/16))] font-semibold px-2.5 py-1 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-px" />
    <span className="line-clamp-2">{text}</span>
  </span>
);

/** Popup with the full review text */
const ReviewModal: React.FC<{ review: ReviewItem; onClose: () => void }> = ({ review, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        // Stop the click reaching the card behind (React events bubble through portals), which would reopen it
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Review by ${review.name}`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-[#0F1A30] border border-white/15 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 p-5 sm:p-6 pb-4 border-b border-white/10">
          <div className="space-y-2 min-w-0">
            <ReviewAuthor review={review} />
            <Stars count={review.stars} />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF]"
            aria-label="Close review"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4">
          <ReviewText text={review.comment} className="text-sm sm:text-[15px] text-slate-100 leading-relaxed" />
          <ResultBadge text={review.resultBadge} />
        </div>
      </div>
    </div>,
    document.body
  );
};

/**
 * Fixed-height review card (same size on phones and laptops). Long messages are cut off with
 * a fade; "Read more" (or clicking the card) opens the full message.
 */
const ReviewCard: React.FC<{ review: ReviewItem; isCopy: boolean }> = ({ review, isCopy }) => {
  const [open, setOpen] = useState(false);
  const textBoxRef = useRef<HTMLDivElement>(null);
  // Assume long until measured (prerendered HTML shows the button)
  const [overflows, setOverflows] = useState(true);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const el = textBoxRef.current;
    if (!el) return;
    const measure = () => setOverflows(el.scrollHeight > el.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <article
        className={`${GLASS} h-[440px] sm:h-[462px] p-5 sm:p-6 flex flex-col gap-4 ${overflows ? 'cursor-pointer' : ''}`}
        onClick={overflows ? () => setOpen(true) : undefined}
      >
        <div className="flex items-center justify-between shrink-0">
          <Stars count={review.stars} />
          <Quote className="w-6 h-6 text-[#00A3FF]/50" />
        </div>

        {/* Message: fills the space left in the card; the rest is faded out */}
        <div className="relative flex-1 min-h-0">
          <div
            ref={textBoxRef}
            className={`h-full overflow-hidden ${
              overflows ? '[mask-image:linear-gradient(to_bottom,black_70%,transparent)]' : ''
            }`}
          >
            <ReviewText text={review.comment} className="text-sm text-slate-100 leading-relaxed" />
          </div>
        </div>

        {overflows && (
          <button
            type="button"
            tabIndex={isCopy ? -1 : undefined}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="self-start -mt-2 shrink-0 text-xs font-semibold text-[#00A3FF] hover:text-white underline-offset-4 hover:underline cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF] rounded"
            aria-label={`Read full review by ${review.name}`}
          >
            Read more
          </button>
        )}

        <div className="shrink-0">
          <ResultBadge text={review.resultBadge} />
        </div>

        <div className="shrink-0 pt-4 border-t border-white/10">
          <ReviewAuthor review={review} />
        </div>
      </article>

      {open && <ReviewModal review={review} onClose={close} />}
    </>
  );
};

/**
 * Video only: no text, tags or buttons. Always muted, loops, and plays automatically while on
 * screen (LazyVideo fetches the file only when it gets near the screen and pauses it off screen).
 */
const VideoCard: React.FC<{ video: VideoFeedbackItem }> = ({ video }) => (
  <article className={`${GLASS} overflow-hidden`}>
    <div className="relative aspect-9/16 bg-black/40">
      {/* Autoplay requires muted + playsInline (iOS) */}
      <LazyVideo
        src={video.src}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-label="Client feedback video"
      />
    </div>
  </article>
);

/** Section background: dark gradient with soft colour blobs so the glass cards read well */
const GlassBackdrop: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-[#1769FF]/30 blur-3xl" />
    <div className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#00A3FF]/20 blur-3xl" />
    <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
  </div>
);

const SectionHeader: React.FC<{ kicker: string; title: string; desc: string; icon?: React.ReactNode }> = ({
  kicker,
  title,
  desc,
  icon,
}) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10 space-y-2">
    <div className="inline-flex items-center gap-1.5 text-[length:max(11px,calc(11rem/16))] sm:text-xs font-bold text-[#00A3FF] uppercase tracking-wider">
      {icon}
      {kicker}
    </div>
    <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">{title}</h2>
    <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto">{desc}</p>
  </div>
);

/** Home page: written reviews marquee followed by the video feedback marquee */
export const ClientFeedback: React.FC = () => (
  // One shared background so the two sections flow together without a seam
  <div className="relative overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0B2A66] to-[#0B1220]">
    <GlassBackdrop />

    {/* Written reviews */}
    <section className="relative pt-8 sm:pt-12 pb-4 sm:pb-6">
      <div className="relative">
        <SectionHeader
          kicker="Client Feedback & Social Proof"
          title="Real Experiences from our clients"
          desc="What our clients say about training with TeamSamir."
        />
        {/* Full-width strip (edge to edge) */}
        <div className="w-full">
          <Marquee
            label="Client reviews"
            secondsPerItem={7}
            items={REVIEWS.map((r) => ({ key: r.id, node: (isCopy: boolean) => <ReviewCard review={r} isCopy={isCopy} /> }))}
          />
        </div>
      </div>
    </section>

    {/* Video feedback */}
    {/* Little bottom padding: the card slots below already add space for the hover zoom */}
    <section className="relative pt-4 sm:pt-6 pb-0 sm:pb-2">
      <div className="relative">
        <SectionHeader
          kicker="Video Feedback"
          title="Listen to Our Clients Share Their Experiences."
          desc="Don't Just Take Our Word for It. Hear It from Our Clients."
          icon={<Video className="w-3.5 h-3.5" />}
        />
        {/* Full-width strip (edge to edge). Pulled up a little to close the gap under the heading */}
        <div className="w-full -mt-4 sm:-mt-6">
          {/*
            5 cards per screen on desktop (3 on tablet, ~1.7 on phones). The hovered card zooms
            to 120%, so it grows 10% of its width on each side: the side padding (px) is set a
            little larger than that so the zoomed card never touches its neighbours, and the
            vertical padding (py) leaves room for it to grow 10% up and down.
          */}
          <Marquee
            label="Video feedback"
            secondsPerItem={5}
            zoomOnHover
            minItemsPerLoop={5}
            slotClassName="w-[60cqw] px-[6cqw] sm:w-[calc(100cqw/3)] sm:px-[3cqw] lg:w-[20cqw] lg:px-[1.8cqw] py-10 sm:py-12"
            items={VIDEO_FEEDBACK.map((v) => ({
              key: v.id,
              node: <VideoCard video={v} />,
            }))}
          />
        </div>
      </div>
    </section>
  </div>
);
