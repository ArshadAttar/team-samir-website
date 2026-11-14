import React, { useState } from 'react';

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

/**
 * Auto-scrolling right-to-left card strip. Pauses on hover/keyboard focus and loops
 * seamlessly by rendering the list twice (styles live in index.css under "marquee").
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

  // One loop = the item list repeated enough times to fill the screen
  const repeats = Math.max(1, Math.ceil(minItemsPerLoop / items.length));
  const loop = Array.from({ length: repeats }).flatMap((_, r) => items.map((item) => ({ item, repeat: r })));

  return (
    <div
      role="region"
      aria-label={label}
      className={`marquee-viewport @container relative overflow-hidden ${className}`}
      onMouseLeave={zoomOnHover ? () => setHoveredSlot(-1) : undefined}
    >
      <div
        className="marquee-track flex w-max"
        style={{ '--marquee-duration': `${loop.length * secondsPerItem}s` } as React.CSSProperties}
      >
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
