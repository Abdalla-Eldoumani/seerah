'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [mounted, setMounted] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const ticking = useRef(false);

  const updateProgress = useCallback(() => {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      if (barRef.current) barRef.current.style.width = '0%';
      ticking.current = false;
      return;
    }
    const pct = Math.min((window.scrollY / docHeight) * 100, 100);
    if (barRef.current) barRef.current.style.width = `${pct}%`;
    ticking.current = false;
  }, []);

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      rafId.current = requestAnimationFrame(updateProgress);
    }
  }, [updateProgress]);

  useEffect(() => {
    setMounted(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [onScroll, updateProgress]);

  if (!mounted) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none"
      role="progressbar"
      aria-label="Reading progress"
    >
      <div
        ref={barRef}
        className="h-full will-change-[width]"
        style={{
          width: '0%',
          background:
            'linear-gradient(to right, var(--color-gold-dark), var(--color-gold), var(--color-gold-light))',
        }}
      />
    </div>
  );
}
