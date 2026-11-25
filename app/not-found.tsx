import type { Metadata } from 'next';
import { MissedMark } from '../components/art/stage';
import { LostCount } from '../components/count-strip';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = { title: 'Missed your mark', robots: { index: false } };

export default function NotFound() {
  return (
    <section aria-labelledby="missed-heading" className="floor-marley on-stage">
      <div className="wrap grid items-center gap-10 py-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[5fr_7fr]">
        <div>
          <p className="eyebrow">Error 404</p>
          <h1 id="missed-heading" className="mt-4 text-[clamp(2.8rem,6.4vw,5rem)]">You’ve missed <span className="text-spotlight">your mark.</span></h1>
          <p className="mt-4 max-w-md text-[1.15rem] text-stage-muted">This page isn’t on the running order. Let’s get you back on the count.</p>
          <LostCount className="mt-7 max-w-[18rem] text-ink" />
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <SiteLink href="/" className="button">Back to the home page</SiteLink>
            <SiteLink href="/timetable/" className="text-link">Timetable</SiteLink>
            <SiteLink href="/contact/" className="text-link">Contact</SiteLink>
          </p>
        </div>
        <MissedMark className="h-auto w-full" />
      </div>
    </section>
  );
}
