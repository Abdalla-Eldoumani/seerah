import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineSpineProps {
  children: React.ReactNode;
}

export default function TimelineSpine({ children }: TimelineSpineProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 md:px-8 py-12">
      {/* The vertical spine line */}
      <div
        className={cn(
          'absolute top-0 bottom-0 w-[2px] bg-gold',
          // Centered on desktop, left-aligned on mobile
          'left-6 md:left-1/2 md:-translate-x-[1px]'
        )}
        aria-hidden="true"
      />
      {/* Timeline content placed along the spine */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
