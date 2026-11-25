import type { ReactNode } from 'react';
import { levelById } from '../content/classes';
import { dateParts, formatDate, ticketStatusLabels, type Concert } from '../content/concerts';
import { formatTime } from '../content/timetable';
import { Countdown } from './countdown';

const NOTCH = 'radial-gradient(circle at 0 50%, transparent 14px, #000 15px) left / 51% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent 14px, #000 15px) right / 51% 100% no-repeat';

/**
 * A theatre ticket: admit-one stub with the oversized date numeral, then the show, its performances as
 * perforated tear-offs, prices and status. `size="feature"` spans the width on Concerts.
 */
export function TicketStub({ concert, size = 'compact', action }: { concert: Concert; size?: 'compact' | 'feature'; action?: ReactNode }) {
  const first = dateParts(concert.performances[0].date);
  const feature = size === 'feature';
  return (
    <article aria-labelledby={`${concert.id}-title`}
      className={`relative grid bg-surface text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)] ${feature ? 'md:grid-cols-[13rem_1fr]' : 'sm:grid-cols-[9rem_1fr]'}`}
      style={{ mask: NOTCH, WebkitMask: NOTCH }}>
      <div className="relative flex flex-col items-center justify-center gap-1 bg-primary px-6 py-6 text-on-primary">
        <span className="label-caps text-[.66rem] opacity-80">Admit one</span>
        <span className={`display leading-none tabular ${feature ? 'text-[6.5rem]' : 'text-[4.6rem]'}`}>{first.day}</span>
        <span className="label-caps">{first.monthShort} {first.year}</span>
        <span aria-hidden="true" className="absolute inset-y-3 right-0 hidden border-r-[3px] border-dotted border-bg/70 sm:block" />
      </div>
      <div className={`relative grid gap-4 ${feature ? 'p-6 md:p-10' : 'p-6'}`}>
        <div aria-hidden="true" className="ornament-border pointer-events-none absolute inset-2.5 rounded-sm border border-spotlight/30" />
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="label-caps text-muted">{concert.subtitle}</p>
            <h3 id={`${concert.id}-title`} className={`mt-1 ${feature ? 'text-[clamp(2.4rem,5vw,4rem)]' : 'text-[2.2rem]'}`}>{concert.title}</h3>
          </div>
          <span className={`label-caps rounded-sm px-2.5 py-1 text-[.7rem] ring-2 ${concert.ticketStatus === 'sold-out' ? 'text-muted ring-line' : 'text-primary-ink ring-primary-ink'} -rotate-3`}>
            {ticketStatusLabels[concert.ticketStatus]}
          </span>
        </div>
        <p className="text-muted">{concert.venue.name}{concert.venue.note ? ` · ${concert.venue.note}` : ''} · {concert.venue.address}</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {concert.performances.map(performance => (
            <li key={performance.id} className="border-t-2 border-dashed border-line pt-3">
              <p className="flex flex-wrap items-center gap-2 font-semibold">{performance.label} <Countdown performance={performance} /></p>
              <p className="tabular">{formatDate(performance.date)}, {formatTime(performance.start)}</p>
              {feature ? <p className="text-sm text-muted">Dancing: {performance.levels.map(id => levelById(id)!.name).join(', ')}</p> : null}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="tabular"><span className="display text-2xl">${concert.tickets.adult}</span> adult · <span className="display text-2xl">${concert.tickets.child}</span> child
            {feature ? <span className="block text-sm text-muted">{concert.tickets.childAgeNote}</span> : null}</p>
          {action}
        </div>
      </div>
    </article>
  );
}
