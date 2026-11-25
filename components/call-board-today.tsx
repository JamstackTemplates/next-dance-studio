'use client';

import { useEffect, useState } from 'react';
import { roomById, styleById } from '../content/classes';
import { classDays, entriesForDay, formatTime, timetable } from '../content/timetable';
import { callBoard, type CallBoard } from '../lib/schedule';
import { site } from '../lib/site';
import { StyleIcon } from './art/icons';
import { AvailabilityMark, LevelChip } from './chips';
import { SiteLink } from './site-link';

/**
 * Home's call board. Static HTML shows neutral per-day class counts; in the browser it lists today's
 * remaining classes (or the next class day's) in the studio's zone, refreshed every minute.
 */
export function CallBoardToday() {
  const [board, setBoard] = useState<CallBoard | null>(null);
  useEffect(() => {
    const update = () => setBoard(callBoard(timetable, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!board) {
    return (
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {classDays.map((day) => (
          <li key={day.id} className="paper rounded-lg px-4 py-4 text-ink">
            <p className="label-caps text-muted">{day.name}</p>
            <p className="mt-1"><span className="display text-4xl">{entriesForDay(day.id).length}</span> classes</p>
          </li>
        ))}
      </ul>
    );
  }
  const dayName = classDays.find(day => day.id === board.day)!.name;
  return (
    <div>
      <p className="label-caps mb-4 inline-flex items-center gap-2 rounded-full border border-spotlight/35 bg-stage/80 px-3.5 py-1.5 text-spotlight" aria-live="polite">{board.when === 'today' ? `Still to come today · ${dayName}` : `Next class day · ${dayName}`}</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {board.entries.slice(0, 6).map((entry) => {
          const style = styleById(entry.style)!;
          return (
            <li key={entry.id} className="paper tape-edge relative grid grid-cols-[auto_1fr] items-center gap-3.5 rounded-lg py-3.5 pl-5 pr-4 text-ink"
              style={{ '--tape-edge': entry.room === 'mirror-room' ? 'var(--tape)' : 'var(--spotlight)' } as React.CSSProperties}>
              <StyleIcon style={entry.style} className="h-10 w-10" />
              <div>
                <p className="tabular text-sm font-semibold text-muted">{formatTime(entry.start)}–{formatTime(entry.end)}</p>
                <p className="display text-xl leading-tight">{style.name}</p>
                <p className="mt-1.5 flex flex-wrap items-center gap-2 text-sm"><LevelChip level={entry.level} /> <span className="text-muted">{roomById(entry.room)!.short}</span> <AvailabilityMark availability={entry.availability} /></p>
              </div>
            </li>
          );
        })}
      </ul>
      {board.entries.length > 6 ? <p className="mt-4 text-stage-muted">+ {board.entries.length - 6} more on the <SiteLink className="text-link" href="/timetable/">full timetable</SiteLink>.</p> : null}
    </div>
  );
}
