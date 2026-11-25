'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { Concert } from '../content/concerts';
import { orderConcerts } from '../lib/schedule';
import { site } from '../lib/site';
import { TicketStub } from './ticket-stub';

/** Statically shows the first concert in data order; in the browser, the next one not yet performed. */
export function NextShowTicket({ concerts, action, size = 'compact' }: { concerts: Concert[]; action?: ReactNode; size?: 'compact' | 'feature' }) {
  const [next, setNext] = useState(concerts[0]);
  useEffect(() => {
    const update = () => setNext(orderConcerts(concerts, site.timeZone)[0] ?? concerts[0]);
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [concerts]);
  return <TicketStub concert={next} action={action} size={size} />;
}
