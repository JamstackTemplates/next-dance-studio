'use client';

import { useEffect, useState } from 'react';
import { levelById } from '../content/classes';
import { formatDate, ticketStatusLabels, type Concert } from '../content/concerts';
import { formatTime } from '../content/timetable';
import { orderConcerts } from '../lib/schedule';
import { site } from '../lib/site';
import { Countdown } from './countdown';

/** Every show after the featured one, as a programme running order. Finished shows drop to the end. */
export function SeasonList({ concerts }: { concerts: Concert[] }) {
  const [ordered, setOrdered] = useState(concerts);
  useEffect(() => {
    const update = () => setOrdered(orderConcerts(concerts, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [concerts]);
  return (
    <ol className="grid gap-8 md:grid-cols-2">
      {ordered.slice(1).map((concert, index) => (
        <li key={concert.id} className="reveal is-in">
          <article aria-labelledby={`season-${concert.id}`} className="border-t-[3px] border-double border-ink pt-4">
            <div className="flex items-baseline gap-4">
              <span aria-hidden="true" className="display text-[4.5rem] leading-[.8] text-primary-ink tabular">{String(index + 2).padStart(2, '0')}</span>
              <div>
                <p className="label-caps text-muted">{concert.subtitle}</p>
                <h3 id={`season-${concert.id}`} className="text-[2rem]">{concert.title}</h3>
              </div>
            </div>
            <p className="mt-3 text-muted">{concert.venue.name}{concert.venue.note ? ` · ${concert.venue.note}` : ''}</p>
            <ul className="mt-3 grid gap-2">
              {concert.performances.map(performance => (
                <li key={performance.id} className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-semibold">{performance.label}:</span>
                  <span className="tabular">{formatDate(performance.date)}, {formatTime(performance.start)}</span>
                  <Countdown performance={performance} />
                  <span className="block w-full text-sm text-muted">{performance.levels.map(id => levelById(id)!.name).join(', ')}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 tabular">${concert.tickets.adult} adult · ${concert.tickets.child} child · <span className="font-semibold text-primary-ink">{ticketStatusLabels[concert.ticketStatus]}</span></p>
          </article>
        </li>
      ))}
    </ol>
  );
}
