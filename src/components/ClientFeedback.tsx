import React, { useEffect, useId, useRef, useState } from 'react';
import { Star, Quote, CheckCircle2, Play, Pause, Video, Volume2, VolumeX } from 'lucide-react';
import { REVIEWS, VIDEO_FEEDBACK } from '../data/mockData';
import { ReviewItem, VideoFeedbackItem } from '../types';
import { Marquee } from './Marquee';

/* Shared frosted-glass card surface */
const GLASS =
  'h-full rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-white/[0.12] hover:border-white/30';

const ReviewCard: React.FC<{ review: ReviewItem }> = ({ review }) => (
  <article className={`${GLASS} p-5 sm:p-6 flex flex-col gap-4`}>
    <div className="flex items-center justify-between">
      <div className="flex gap-0.5" aria-label={`${review.stars} out of 5 stars`}>
        {Array.from({ length: review.stars }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <Quote className="w-6 h-6 text-[#00A3FF]/50" />
    </div>

    <p className="text-sm text-slate-100 leading-relaxed flex-1">“{review.comment}”</p>

    <span className="self-start inline-flex items-center gap-1.5 text-[length:max(11px,calc(11rem/16))] font-semibold px-2.5 py-1 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
      <CheckCircle2 className="w-3.5 h-3.5" />
      {review.resultBadge}
    </span>

    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
      <img
        src={review.avatar}
        alt=""
        loading="lazy"
        className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
        referrerPolicy="no-referrer"
      />
      <div className="min-w-0">
        <div className="text-sm font-bold text-white truncate">{review.name}</div>
        <div className="text-[length:max(11px,calc(11rem/16))] text-slate-400 truncate">
          {review.location} · {review.program}
        </div>
      </div>
    </div>
  </article>
);

/** Fired when a card turns its sound on, so every other card mutes (only one plays audio) */
const UNMUTE_EVENT = 'feedback-video-unmute';

const CONTROL_BUTTON =
  'w-8 h-8 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md text-white border border-white/25 hover:bg-[#1769FF] hover:border-[#1769FF] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white';

const VideoCard: React.FC<{ video: VideoFeedbackItem; isCopy: boolean }> = ({ video, isCopy }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardId = useId();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  // True once the visitor presses pause, so scrolling back into view doesn't restart it
  const userPausedRef = useRef(false);

  // Only decode/play while the card is on screen (the strip repeats cards, so many exist)
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPausedRef.current) {
          el.play().catch(() => undefined);
        } else if (!entry.isIntersecting) {
          el.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mute this card when another card turns its sound on
  useEffect(() => {
    const onOtherUnmute = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== cardId && videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    };
    window.addEventListener(UNMUTE_EVENT, onOtherUnmute);
    return () => window.removeEventListener(UNMUTE_EVENT, onOtherUnmute);
  }, [cardId]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      userPausedRef.current = false;
      el.play().catch(() => undefined);
    } else {
      userPausedRef.current = true;
      el.pause();
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
    if (!el.muted) {
      window.dispatchEvent(new CustomEvent(UNMUTE_EVENT, { detail: cardId }));
      if (el.paused) el.play().catch(() => undefined);
    }
  };

  return (
    <article className={`${GLASS} group/video overflow-hidden flex flex-col`}>
      <div className="relative aspect-4/5 bg-black/40">
        {/* Autoplay requires muted + playsInline (iOS) */}
        <video
          ref={videoRef}
          src={video.src}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={video.title}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 text-[length:max(10px,calc(10rem/16))] font-semibold px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
          <Play className="w-3 h-3 fill-current" />
          {video.tag}
        </span>

        {/* Controls: shown on hover/focus (always shown on touch screens, which can't hover) */}
        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover/video:opacity-100 has-[:focus-visible]:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={toggleMute}
            tabIndex={isCopy ? -1 : undefined}
            className={CONTROL_BUTTON}
            aria-label={isMuted ? `Turn sound on for ${video.title}` : `Turn sound off for ${video.title}`}
            title={isMuted ? 'Sound on' : 'Sound off'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={togglePlay}
            tabIndex={isCopy ? -1 : undefined}
            className={CONTROL_BUTTON}
            aria-label={isPlaying ? `Pause ${video.title}` : `Play ${video.title}`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>
        </div>

        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="text-sm sm:text-base font-display font-bold text-white">{video.title}</div>
          <div className="text-[length:max(10px,calc(10rem/16))] text-slate-300">{video.subtitle}</div>
        </div>
      </div>
      <p className="p-3 text-xs text-slate-200 leading-relaxed">{video.description}</p>
    </article>
  );
};

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
            items={REVIEWS.map((r) => ({ key: r.id, node: <ReviewCard review={r} /> }))}
          />
        </div>
      </div>
    </section>

    {/* Video feedback */}
    <section className="relative pt-4 sm:pt-6 pb-8 sm:pb-12">
      <div className="relative">
        <SectionHeader
          kicker="Video Feedback"
          title="Listen to Our Clients Share Their Experiences."
          desc="Don't Just Take Our Word for It. Hear It from Our Clients."
          icon={<Video className="w-3.5 h-3.5" />}
        />
        {/* Full-width strip (edge to edge) */}
        <div className="w-full">
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
              node: (isCopy: boolean) => <VideoCard video={v} isCopy={isCopy} />,
            }))}
          />
        </div>
      </div>
    </section>
  </div>
);
