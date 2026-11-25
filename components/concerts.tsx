// Concerts page sections: the next show, the rest of the season, show week and the programme archive.
import type { ReactNode } from 'react';
import { archive, concerts, formatDate } from '../content/concerts';
import { formatTime } from '../content/timetable';
import { TicketIcon } from './art/icons';
import { AtelierBackdrop, StageArchDivider } from './art/ornaments';
import { RibbonDivider } from './art/stage';
import { NextShowTicket } from './next-show';
import { SeasonList } from './season-list';
import { SiteLink } from './site-link';

type Slot = { children: ReactNode };

function FeatureSection({ children, action }: Slot & { action: ReactNode }) {
  return (
    <section aria-labelledby="feature-heading" className="curtain-band relative isolate overflow-hidden py-[clamp(3.5rem,7vw,5.5rem)]">
      <AtelierBackdrop variant="ribbons" tone="dark" />
      <div className="wrap">
        <div className="mb-8 max-w-2xl">{children}</div>
        <div className="reveal"><NextShowTicket concerts={concerts} action={action} size="feature" /></div>
      </div>
    </section>
  );
}
export const NextShowFeature = Object.assign(FeatureSection, {
  Heading: ({ children }: Slot) => <h2 id="feature-heading" className="text-[clamp(2.1rem,4.4vw,3.3rem)] [&_em]:not-italic [&_em]:text-spotlight">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mt-3 text-[1.1rem] text-stage-muted">{children}</p>,
  Action: ({ children }: Slot) => <SiteLink href="/contact/" className="button"><TicketIcon className="h-5 w-5" />{children}</SiteLink>,
});

function SeasonSection({ children }: Slot) {
  return (
    <section aria-labelledby="season-heading" className="floor-maple section-hairline relative isolate overflow-hidden py-[clamp(3.5rem,7vw,5.5rem)]">
      <AtelierBackdrop variant="arches" tone="light" />
      <div className="wrap grid gap-10 lg:grid-cols-[4fr_8fr]">
        <div>{children}</div>
        <SeasonList concerts={concerts} />
      </div>
    </section>
  );
}
export const Season = Object.assign(SeasonSection, {
  Heading: ({ children }: Slot) => <h2 id="season-heading" className="text-[clamp(2.1rem,4.4vw,3.3rem)] [&_em]:not-italic [&_em]:text-primary-ink">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mt-3 text-[1.08rem] text-muted">{children}</p>,
});

/* ---------- Show week: numbered steps along a taped floor path ---------- */

function ShowWeekSection({ children, steps }: Slot & { steps: ReactNode }) {
  return (
    <section aria-labelledby="showweek-heading" className="floor-marley on-stage stage-hairline relative isolate overflow-hidden pb-[clamp(3.5rem,7vw,5.5rem)] pt-4">
      <StageArchDivider tone="dark" className="mb-[clamp(2rem,4vw,3.5rem)]" />
      <AtelierBackdrop variant="spotlight" tone="dark" />
      <div className="wrap grid gap-10 lg:grid-cols-[5fr_7fr]">
        <div className="lg:sticky lg:top-8 lg:self-start">{children}</div>
        <ol className="reveal relative grid gap-8 border-l-[6px] border-dashed border-tape/70 pl-8 [counter-reset:step]">{steps}</ol>
      </div>
    </section>
  );
}
function Step({ title, children }: Slot & { title: string }) {
  return (
    <li className="relative [counter-increment:step] before:absolute before:-left-[3.35rem] before:top-0 before:grid before:h-11 before:w-11 before:place-items-center before:rounded-full before:bg-spotlight before:font-[family-name:var(--font-display)] before:text-[1.35rem] before:text-[#1E1530] before:content-[counter(step)]">
      <h3 className="text-[1.7rem]">{title}</h3>
      <div className="mt-2 grid gap-2 text-stage-muted">{children}</div>
    </li>
  );
}
export const ShowWeek = Object.assign(ShowWeekSection, {
  Heading: ({ children }: Slot) => <h2 id="showweek-heading" className="text-[clamp(2.1rem,4.4vw,3.3rem)] [&_em]:not-italic [&_em]:text-spotlight">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mt-3 text-[1.08rem] text-stage-muted">{children}</p>,
  Step,
});

/** Dress rehearsals by show, read from content/concerts.ts. */
export function DressRehearsals() {
  return (
    <ul className="grid gap-1">
      {concerts.map(concert => (
        <li key={concert.id}><strong className="text-stage-ink">{concert.title}:</strong> {concert.dressRehearsal
          ? `${formatDate(concert.dressRehearsal.date)}, ${formatTime(concert.dressRehearsal.start)}–${formatTime(concert.dressRehearsal.end)} at ${concert.dressRehearsal.place}.`
          : concert.notes}</li>
      ))}
    </ul>
  );
}

/** Costume fees by show, read from content/concerts.ts. */
export function CostumeFees() {
  return (
    <ul className="grid gap-1">
      {concerts.map(concert => (
        <li key={concert.id}><strong className="text-stage-ink">{concert.title}:</strong> {concert.costumeFee === null ? 'No costume fee.' : `$${concert.costumeFee} per routine. ${concert.notes}`}</li>
      ))}
    </ul>
  );
}

/* ---------- Programme archive: a fanned stack of covers ---------- */

const COVER_STYLES = ['bg-curtain text-stage-ink', 'bg-[#19726D] text-white', 'bg-spotlight text-[#1E1530]'];

function ArchiveSection({ children }: Slot) {
  return (
    <section aria-labelledby="archive-heading" className="bg-surface pb-[clamp(3rem,7vw,5.5rem)]">
      <RibbonDivider />
      <div className="wrap mt-6 grid gap-10 lg:grid-cols-[4fr_8fr] lg:items-center">
        <div>{children}</div>
        <ul className="reveal flex flex-wrap justify-center gap-6 sm:flex-nowrap sm:gap-3">
          {archive.map((entry, index) => (
            <li key={entry.id} className={`w-[min(15rem,80vw)] sm:w-1/3 ${['sm:-rotate-3', 'sm:rotate-1 sm:-translate-y-3', 'sm:rotate-3'][index % 3]}`}>
              <article aria-labelledby={`${entry.id}-title`}
                className={`relative flex aspect-[3/4] flex-col justify-between rounded-[3px] p-5 shadow-[0_24px_40px_-20px_rgba(0,0,0,.55)] ${COVER_STYLES[index % 3]}`}>
                <div aria-hidden="true" className="absolute inset-2.5 rounded-[2px] border border-current opacity-40" />
                <p className="label-caps relative text-[.65rem] opacity-80">Pirouette &amp; Pulse presents</p>
                <div className="relative">
                  <h3 id={`${entry.id}-title`} className="text-[clamp(1.6rem,3vw,2.2rem)]">{entry.title}</h3>
                  <p className="display mt-1 text-[2.6rem] leading-none opacity-50 tabular">{entry.year}</p>
                </div>
                <p className="relative text-[.85rem] leading-snug">{entry.line}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export const ProgrammeArchive = Object.assign(ArchiveSection, {
  Heading: ({ children }: Slot) => <h2 id="archive-heading" className="text-[clamp(2.1rem,4.4vw,3.3rem)] [&_em]:not-italic [&_em]:text-primary-ink">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mt-3 text-[1.08rem] text-muted">{children}</p>,
});
