'use client';

import { useEffect, useState } from 'react';
import type { Performance } from '../content/concerts';
import { performanceState, type PerformanceState } from '../lib/schedule';
import { site } from '../lib/site';

/** Browser-only "in 17 days" / "This Saturday" / "Performed" label; renders nothing statically. */
export function Countdown({ performance, className = '' }: { performance: Pick<Performance, 'date' | 'start'>; className?: string }) {
  const [state, setState] = useState<PerformanceState | null>(null);
  useEffect(() => {
    const update = () => setState(performanceState(performance, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [performance]);
  if (!state) return null;
  return (
    <span className={`label-caps inline-flex rounded-full px-2.5 py-1 text-[.68rem] ${state.performed ? 'bg-line text-muted' : 'bg-spotlight text-[#1E1530]'} ${className}`}>
      {state.performed ? 'Performed' : state.label}
    </span>
  );
}
