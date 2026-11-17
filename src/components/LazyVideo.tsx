import React, { useEffect, useRef, useState } from 'react';

type LazyVideoProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'autoPlay' | 'preload'> & {
  src: string;
  /** Play (muted) while visible. Ignored when the visitor prefers reduced motion. */
  autoPlay?: boolean;
  ref?: React.Ref<HTMLVideoElement>;
};

/**
 * <video> that downloads nothing until it is near the viewport, plays only while
 * visible, and pauses when scrolled away. Keeps page load light on mobile data.
 */
export const LazyVideo: React.FC<LazyVideoProps> = ({ src, autoPlay = false, ref, ...rest }) => {
  const innerRef = useRef<HTMLVideoElement | null>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  const setRefs = (el: HTMLVideoElement | null) => {
    innerRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLVideoElement | null>).current = el;
  };

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      setVisible(true);
      return;
    }
    const nearObs = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '300px 0px' });
    const visObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    nearObs.observe(el);
    visObs.observe(el);
    return () => {
      nearObs.disconnect();
      visObs.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = innerRef.current;
    if (!el || !near || !autoPlay) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (visible && !reduced) el.play().catch(() => undefined);
    else if (!visible) el.pause();
  }, [near, visible, autoPlay]);

  return <video ref={setRefs} src={near ? src : undefined} preload={near ? 'metadata' : 'none'} {...rest} />;
};
