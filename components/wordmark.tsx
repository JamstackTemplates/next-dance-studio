import { PulseMark } from './art/icons';

/** "Pirouette" in Abril Fatface, "& Pulse" tracked League Spartan with a small pulse line. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="display text-[1.7rem] tracking-[.01em]">Pirouette</span>
      <span className="mt-1 flex items-center gap-1.5 text-[.72rem] font-semibold uppercase tracking-[.34em]">
        &amp; Pulse <PulseMark className="h-2.5 w-8 text-spotlight" /> Dance
      </span>
    </span>
  );
}
