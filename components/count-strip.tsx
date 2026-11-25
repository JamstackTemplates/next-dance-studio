import type { CSSProperties } from 'react';

const COUNTS = ['5', '6', '7', '8', '1', '2', '3', '4'];

/**
 * Signature element: an editorial tempo strip reading 5·6·7·8·1·2·3·4.
 * A warm golden spotlight steps along it at `bpm` (CSS only). Under reduced motion it rests on "1".
 */
export function CountStrip({ bpm = 96, size = 'lg', surface = 'maple', label, className = '' }: {
  bpm?: number;
  size?: 'lg' | 'md' | 'sm';
  surface?: 'maple' | 'marley' | 'none';
  /** Accessible description; defaults to the counts and tempo. */
  label?: string;
  className?: string;
}) {
  const text = size === 'lg' ? 'text-[clamp(1.6rem,4vw,3rem)]' : size === 'md' ? 'text-[clamp(1.2rem,2.4vw,1.75rem)]' : 'text-sm';
  const pad = size === 'lg' ? 'py-[clamp(.9rem,2vw,1.35rem)]' : size === 'md' ? 'py-2.5' : 'py-1';
  const floor = surface === 'maple' ? 'bg-maple/60 border border-line/70' : surface === 'marley' ? 'bg-stage text-stage-ink' : '';
  return (
    <div className={`count-strip relative isolate overflow-hidden rounded-lg ${floor} ${className}`}
      style={{ '--bpm': bpm } as CSSProperties} role="img" aria-label={label ?? `Count in: 5, 6, 7, 8, then 1, 2, 3, 4, at ${bpm} beats per minute`}>
      <div aria-hidden="true" className="count-strip__spot pointer-events-none absolute inset-y-0 left-0 -z-10 flex items-center justify-center">
        <span className="block aspect-square w-[88%] rounded-full bg-[radial-gradient(circle,var(--spotlight)_0%,color-mix(in_srgb,var(--spotlight)_35%,transparent)_42%,transparent_68%)] opacity-65" />
      </div>
      <ol aria-hidden="true" className={`grid grid-cols-8 ${pad}`}>
        {COUNTS.map((count, index) => (
          <li key={index} className="flex flex-col items-center gap-[.3em]">
            <span className={`display leading-none tabular ${text} ${index < 4 ? 'opacity-45' : ''}`}>{count}</span>
            <span className={`tape-x ${size === 'sm' ? 'scale-75' : ''}`}
              style={{ '--tape-x': index === 4 ? 'var(--spotlight)' : index < 4 ? 'var(--tulle)' : 'var(--tape)' } as CSSProperties} />
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The 404's lost count: 5 · 6 · 7 · ? */
export function LostCount({ className = '' }: { className?: string }) {
  return (
    <div className={`count-strip relative rounded-lg border border-white/15 bg-white/5 ${className}`} role="img" aria-label="Count in: 5, 6, 7… and the count is lost">
      <ol aria-hidden="true" className="grid grid-cols-4 py-3.5">
        {['5', '6', '7', '?'].map((count, index) => (
          <li key={index} className={`flex flex-col items-center gap-1.5 ${index === 3 ? 'rotate-12 text-spotlight' : 'text-stage-ink'}`}>
            <span className="display text-4xl leading-none">{count}</span>
            <span className="tape-x" style={{ '--tape-x': index === 3 ? 'var(--spotlight)' : 'var(--tape)' } as CSSProperties} />
          </li>
        ))}
      </ol>
    </div>
  );
}
