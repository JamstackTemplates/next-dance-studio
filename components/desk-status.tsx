'use client';

import { useEffect, useState } from 'react';
import { business } from '../content/business';
import { formatTime } from '../content/timetable';
import { openingLabel } from '../lib/hours';
import { site } from '../lib/site';

/** Turns the shared opening label into front-desk wording with 12-hour times. */
export function deskLabel(label: string): string {
  const open = /^Open now · until (\d\d:\d\d)$/.exec(label);
  if (open) return `Front desk open until ${formatTime(open[1])}`;
  const closed = /^Closed · opens (\w+) at (\d\d:\d\d)$/.exec(label);
  if (closed) return closed[1] === 'today' ? `Front desk opens today at ${formatTime(closed[2])}` : `Front desk opens ${formatTime(closed[2])} ${closed[1]}`;
  return 'Front desk hours';
}

/** Static/no-JS text is neutral ("Front desk hours"); the browser refreshes the live status every minute. */
export function DeskStatus({ className = '' }: { className?: string }) {
  const [label, setLabel] = useState('Front desk hours');
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const update = () => {
      const raw = openingLabel(business.hours, site.timeZone);
      setLabel(deskLabel(raw));
      setOpen(raw.startsWith('Open now') ? true : raw.startsWith('Closed') ? false : null);
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);
  return (
    <p className={`inline-flex items-center gap-2 font-semibold ${className}`} aria-live="polite">
      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${open === true ? 'bg-tape shadow-[0_0_0_4px_color-mix(in_srgb,var(--tape)_25%,transparent)]' : open === false ? 'bg-spotlight' : 'bg-current opacity-50'}`} />
      {label}
    </p>
  );
}
