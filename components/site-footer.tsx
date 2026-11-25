import { business, formatAddress } from '../content/business';
import { AtelierBackdrop, StageArchDivider } from './art/ornaments';
import { CountStrip } from './count-strip';
import { HoursList } from './hours-list';
import { NAV } from './site-header';
import { SiteLink } from './site-link';
import { Wordmark } from './wordmark';

/** Velvety dark editorial footer with a delicate gold proscenium border: stage door, front desk hours and running order. */
export function SiteFooter() {
  return (
    <footer className="stage-hairline mt-0">
      <div className="floor-marley on-stage relative isolate overflow-hidden pb-12 pt-5">
        <AtelierBackdrop variant="ribbons" tone="dark" />
        <StageArchDivider tone="dark" className="mb-10" />
        <div className="wrap grid gap-12 md:grid-cols-[1.2fr_1fr_.8fr]">
          <div>
            <Wordmark className="text-stage-ink" />
            <p className="label-caps mt-7 text-spotlight">Stage door</p>
            <address className="mt-2.5 not-italic text-stage-ink">{formatAddress()}</address>
            <p className="mt-1.5 text-sm text-stage-muted">{business.locationLine}</p>
            <p className="mt-4"><a className="text-link" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a></p>
            <p className="mt-1"><a className="text-link break-all" href={`mailto:${business.email}`}>{business.email}</a></p>
          </div>
          <div>
            <p className="label-caps text-spotlight">Front desk</p>
            <HoursList className="mt-3.5 text-sm text-stage-ink" />
            <p className="mt-5 text-sm text-stage-muted">{business.termLine}.</p>
          </div>
          <nav aria-label="Footer">
            <p className="label-caps text-spotlight">Running order</p>
            <ol className="mt-3.5 grid gap-2">
              {NAV.map((item, index) => (
                <li key={item.href} className="flex items-baseline gap-3">
                  <span className="display w-6 text-stage-muted/70 tabular">{String(index + 1).padStart(2, '0')}</span>
                  <SiteLink href={item.href} markCurrent="page" className="text-stage-ink transition-colors hover:text-spotlight aria-[current=page]:font-semibold aria-[current=page]:text-spotlight">{item.label}</SiteLink>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="wrap mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-7 text-sm text-stage-muted">
          <p>{business.name} · a Jamstacks gallery sample. {business.tagline}</p>
          <CountStrip size="sm" surface="none" bpm={96} className="w-56 no-print" />
          <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="text-stage-ink no-underline hover:text-spotlight hover:underline" href="https://jamstacks.net">jamstacks.net</a></span>
        </div>
      </div>
    </footer>
  );
}
