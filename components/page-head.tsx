import type { ReactNode } from 'react';
import { AtelierBackdrop } from './art/ornaments';

/**
 * Inner-page editorial stage-lit header echoing the hero's diagonal golden spotlight and velvety plum depth.
 * Use <em> in the title for the warm gold accent words.
 */
export function PageHead({ eyebrow, title, children, id, aside }: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Optional element on the right at desktop (a key, a term line, an illustration). */
  aside?: ReactNode;
}) {
  return (
    <header className="floor-marley on-stage relative isolate overflow-hidden border-b border-spotlight/35">
      {/* Diagonal golden spotlight ray echoing the hero photography */}
      <div aria-hidden="true" className="ornament-bg pointer-events-none absolute -right-24 -top-24 -z-10 h-[32rem] w-[42rem] rotate-[-24deg] bg-[linear-gradient(180deg,rgba(245,180,76,0.22)_0%,rgba(245,180,76,0.06)_48%,transparent_80%)] blur-2xl" />
      <div aria-hidden="true" className="ornament-bg pointer-events-none absolute -left-24 bottom-0 -z-10 h-64 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(123,69,176,0.26),transparent)]" />
      <AtelierBackdrop variant="spotlight" tone="dark" />
      <div className="wrap grid items-end gap-8 py-[clamp(3.5rem,7vw,5.5rem)] md:grid-cols-[1.45fr_1fr]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={id} className="mt-4 text-[clamp(2.8rem,7vw,5.4rem)] leading-[.96] [&_em]:not-italic [&_em]:text-spotlight">{title}</h1>
          {children ? <div className="mt-5 max-w-(--measure) text-[clamp(1.08rem,1.6vw,1.24rem)] text-stage-muted">{children}</div> : null}
        </div>
        {aside ? <div className="md:pb-1">{aside}</div> : null}
      </div>
      <div aria-hidden="true" className="ornament-border h-[2px] w-full bg-[linear-gradient(90deg,transparent,rgba(245,180,76,.5)_25%,var(--spotlight)_50%,rgba(245,180,76,.5)_75%,transparent)] opacity-75" />
    </header>
  );
}
