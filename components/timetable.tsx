// Timetable page sections around the interactive call board.
import type { CSSProperties, ReactNode } from 'react';
import { rooms } from '../content/classes';
import { HourglassIcon, StarIcon, TapeIcon } from './art/icons';
import { AtelierBackdrop, StageArchDivider } from './art/ornaments';
import { SiteLink } from './site-link';
import { TimetableBoard } from './timetable-board';

type Slot = { children: ReactNode };

/** Room key for the page head: teal accent for the Mirror Room, amber gold for the Sprung Box. */
export function RoomKey() {
  return (
    <ul className="grid gap-3 rounded-xl border border-white/15 bg-white/[0.04] p-5 text-stage-ink backdrop-blur-sm">
      {rooms.map(room => (
        <li key={room.id} className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-1 h-5 w-1.5 flex-none rounded-full" style={{ background: room.id === 'mirror-room' ? 'var(--tape)' : 'var(--spotlight)' } as CSSProperties} />
          <span><span className="font-semibold">{room.name}</span><span className="block text-sm text-stage-muted">{room.description}</span></span>
        </li>
      ))}
    </ul>
  );
}

function BoardSection({ children, emptyMessage }: Slot & { emptyMessage: string }) {
  return (
    <section aria-labelledby="board-heading" className="floor-maple relative isolate overflow-hidden py-[clamp(3rem,6vw,5rem)]">
      <AtelierBackdrop variant="ribbons" tone="light" />
      <div className="wrap">
        <div className="mb-8 max-w-3xl">{children}</div>
        <TimetableBoard emptyMessage={emptyMessage} />
      </div>
    </section>
  );
}
export const CallBoard = Object.assign(BoardSection, {
  Heading: ({ children }: Slot) => <h2 id="board-heading" className="text-[clamp(2.1rem,4.4vw,3.3rem)] [&_em]:not-italic [&_em]:text-primary-ink">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mt-3 text-[1.08rem] text-muted">{children}</p>,
});

function KeySection({ children }: Slot) {
  return (
    <section aria-labelledby="key-heading" className="relative isolate overflow-hidden bg-surface pb-12 pt-4">
      <StageArchDivider tone="light" className="mb-8" />
      <div className="wrap grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
        <div>{children}</div>
        <ul className="grid gap-4 sm:grid-cols-3">
          <li className="flex items-center gap-3"><TapeIcon className="h-7 w-7" /><span><strong>Open</strong><span className="block text-sm text-muted">Places available</span></span></li>
          <li className="flex items-center gap-3"><StarIcon className="h-7 w-7" /><span><strong>Few spots</strong><span className="block text-sm text-muted">Nearly full</span></span></li>
          <li className="flex items-center gap-3"><HourglassIcon className="h-7 w-7" /><span><strong>Waitlist</strong><span className="block text-sm text-muted">Ask to join the list</span></span></li>
        </ul>
      </div>
    </section>
  );
}
export const AvailabilityKey = Object.assign(KeySection, {
  Heading: ({ children }: Slot) => <h2 id="key-heading" className="text-[clamp(1.8rem,3.4vw,2.5rem)]">{children}</h2>,
  Note: ({ children }: Slot) => <p className="mt-3 text-muted">{children}</p>,
});

function ContactBand({ children }: Slot) {
  return (
    <section aria-labelledby="timetable-contact-heading" className="floor-marley on-stage stage-hairline relative isolate overflow-hidden">
      <AtelierBackdrop variant="spotlight" tone="dark" />
      <div className="wrap flex flex-wrap items-center justify-between gap-6 py-14">{children}</div>
    </section>
  );
}
export const TimetableContact = Object.assign(ContactBand, {
  Heading: ({ children }: Slot) => <h2 id="timetable-contact-heading" className="max-w-2xl text-[clamp(1.9rem,4vw,3rem)] [&_em]:not-italic [&_em]:text-spotlight">{children}</h2>,
  Action: ({ children }: Slot) => <SiteLink href="/contact/" className="button">{children}</SiteLink>,
});
