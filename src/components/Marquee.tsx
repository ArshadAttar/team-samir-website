import React, { useEffect, useRef, useState } from 'react';

interface MarqueeProps {
  /**
   * One card per entry; each needs a stable key. `node` may be a function that receives
   * `isCopy` (true for repeated/duplicate cards used for looping), e.g. to remove buttons
   * in the copies from the keyboard tab order.
   */
  items: { key: string; node: React.ReactNode | ((isCopy: boolean) => React.ReactNode) }[];
  /** Accessible name for the scrolling region */
  label: string;
  /** Scroll speed: seconds each card takes to pass */
  secondsPerItem?: number;
  /**
   * Width + spacing of each card slot, using container units (cqw = 1% of the strip width).
   * Default: 3 cards per screen on desktop, 2 on tablet, ~1 on phones.
   */
  slotClassName?: string;
  /**
   * Repeat the item list until one loop contains at least this many cards. Must be at least
   * the number of cards visible at once, or a gap appears in the loop.
   */
  minItemsPerLoop?: number;
  /**
   * Zoom the hovered card to 120% and fade the other cards to 80% opacity. With no card
   * hovered, every card is shown at normal size. Slots need enough padding for the zoom.
   */
  zoomOnHover?: boolean;
  className?: string;
}

const DEFAULT_SLOT = 'w-[85cqw] sm:w-[50cqw] lg:w-[calc(100cqw/3)] pr-4 sm:pr-6 py-2';

/** Wait this long after the visitor's last drag / swipe / wheel before moving again */
const RESUME_AFTER_MS = 2500;

/**
 * Endless right-to-left card strip. It scrolls itself slowly, and visitors can also drag it
 * with the mouse, swipe it on touch screens or use a trackpad, in either direction. It pauses
 * while hovered, focused with the keyboard or being dragged. The list is rendered twice and
 * the scroll position wraps by one copy's width, so it never runs out in either direction.
 * With reduced motion it doesn't move by itself (manual scrolling still works).
 */
export const Marquee: React.FC<MarqueeProps> = ({
  items,
  label,
  secondsPerItem = 6,
  slotClassName = DEFAULT_SLOT,
  minItemsPerLoop = 1,
  zoomOnHover = false,
  className = '',
}) => {
  const [hoveredSlot, setHoveredSlot] = useState(-1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // One loop = the item list repeated enough times to fill the screen
  const repeats = Math.max(1, Math.ceil(minItemsPerLoop / items.length));
  const loop = Array.from({ length: repeats }).flatMap((_, r) => items.map((item) => ({ item, repeat: r })));

  useEffect(() => {
    const el = viewportRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;
    let lastSet = el.scrollLeft;
    let hovering = false;
    let focused = false;
    let onScreen = false;
    let lastTouch = 0;

    // Mouse drag state
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;

    /** Width of one copy of the list (the track holds two) */
    const copyWidth = () => track.scrollWidth / 2;

    /** Keep the position inside the first copy so there is always room to scroll both ways */
    const wrap = () => {
      const w = copyWidth();
      if (w <= 0) return;
      if (el.scrollLeft >= w + 1) el.scrollLeft -= w;
      else if (el.scrollLeft < 1) el.scrollLeft += w;
    };
    /** Distance between two positions, ignoring a jump of exactly one copy (a wrap) */
    const moveBetween = (a: number, b: number) => {
      const w = copyWidth();
      const d = Math.abs(a - b);
      return w > 0 ? Math.min(d, Math.abs(d - w)) : d;
    };

    // Start 1px in, so swiping backwards right away can wrap instead of hitting the edge
    if (el.scrollLeft < 1) el.scrollLeft = 1;

    const touched = () => {
      lastTouch = performance.now();
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 0;
      last = now;
      // Moved by something else (swipe momentum, trackpad, keyboard): the visitor is in control
      if (moveBetween(el.scrollLeft, lastSet) > 2) {
        touched();
        pos = el.scrollLeft;
      }
      const paused = reduced || hovering || focused || down || now - lastTouch < RESUME_AFTER_MS;
      if (!paused) {
        const slot = track.firstElementChild as HTMLElement | null;
        const speed = (slot ? slot.offsetWidth : el.clientWidth / 3) / secondsPerItem; // px per second
        pos += (speed * dt) / 1000;
        const w = copyWidth();
        if (w > 0 && pos >= w) pos -= w;
        if (pos < 1) pos = 1;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      lastSet = el.scrollLeft;
      raf = requestAnimationFrame(tick);
    };

    const run = () => {
      if (raf || !onScreen) return;
      last = 0;
      pos = lastSet = el.scrollLeft;
      raf = requestAnimationFrame(tick);
    };
    const halt = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Only animate while the strip is on screen
    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
            if (onScreen) run();
            else halt();
          })
        : null;
    if (observer) observer.observe(el);
    else {
      onScreen = true;
      run();
    }

    const onScroll = () => wrap();
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hovering = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hovering = false;
    };
    const onFocusIn = (e: FocusEvent) => {
      focused = (e.target as HTMLElement).matches?.(':focus-visible') ?? false;
    };
    const onFocusOut = () => {
      focused = false;
    };

    const onDown = (e: PointerEvent) => {
      touched();
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
      if (moved) {
        const w = copyWidth();
        let next = startLeft - dx;
        // Wrap while dragging so the strip never hits an end
        if (w > 0 && next >= w) {
          next -= w;
          startLeft -= w;
        } else if (w > 0 && next <= 0) {
          next += w;
          startLeft += w;
        }
        el.scrollLeft = next;
      }
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      touched();
      if (moved) el.classList.remove('is-dragging');
    };
    // Swallow the click that ends a drag so it doesn't open a card or press a button
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('lostpointercapture', onUp);
    el.addEventListener('touchstart', touched, { passive: true });
    el.addEventListener('wheel', touched, { passive: true });
    el.addEventListener('click', onClick, true);

    return () => {
      halt();
      observer?.disconnect();
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('focusin', onFocusIn);
      el.removeEventListener('focusout', onFocusOut);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('lostpointercapture', onUp);
      el.removeEventListener('touchstart', touched);
      el.removeEventListener('wheel', touched);
      el.removeEventListener('click', onClick, true);
    };
  }, [secondsPerItem]);

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-label={label}
      className={`marquee-viewport @container relative ${className}`}
      onMouseLeave={zoomOnHover ? () => setHoveredSlot(-1) : undefined}
    >
      <div ref={trackRef} className="flex w-max">
        {[0, 1].map((copy) =>
          loop.map(({ item, repeat }, i) => {
            const slotIndex = copy * loop.length + i;
            const isCopy = copy === 1 || repeat > 0;
            const isHovered = slotIndex === hoveredSlot;
            const someoneHovered = hoveredSlot !== -1;

            return (
              <div
                key={`${copy}-${repeat}-${item.key}`}
                aria-hidden={isCopy}
                className={`shrink-0 relative ${slotClassName} ${isHovered ? 'z-10' : ''}`}
                onMouseEnter={zoomOnHover ? () => setHoveredSlot(slotIndex) : undefined}
              >
                <div
                  className={
                    zoomOnHover
                      ? `h-full transition-[scale,opacity] duration-300 ease-out ${
                          isHovered ? 'scale-[1.2]' : 'scale-100'
                        } ${someoneHovered && !isHovered ? 'opacity-80' : 'opacity-100'}`
                      : 'h-full'
                  }
                >
                  {typeof item.node === 'function' ? item.node(isCopy) : item.node}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
