import React from 'react';

interface TimelineSpineProps {
  children: React.ReactNode;
}

export default function TimelineSpine({ children }: TimelineSpineProps) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-8">
      {/* The rule lives in the same box as the nodes so its offset is measured
          from the node dots, not from the page padding. */}
      <div className="relative">
        <div
          className="absolute inset-y-0 start-2 -ms-px w-0.5 bg-gold md:start-1/2"
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  );
}
