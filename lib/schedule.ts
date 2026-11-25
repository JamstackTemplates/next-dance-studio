// Time-dependent helpers for the studio's zone. Browser components call these with the real clock;
// static/build output never states what is happening "today".
import { entriesForDay, toMinutes, classDays, type ClassDay, type TimetableEntry } from '../content/timetable.ts';
import type { Concert, Performance } from '../content/concerts.ts';

const WEEKDAY_INDEX: Record<string, number> = { Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4, Saturday: 5, Sunday: 6 };

export interface ZonedNow {
  /** 0 = Monday … 6 = Sunday */
  dayIndex: number;
  /** Minutes since local midnight. */
  minutes: number;
  /** Local calendar date, YYYY-MM-DD. */
  date: string;
}

/** Local weekday, time and date in `timeZone`; null when the zone is missing or invalid. */
export function zonedNow(timeZone: string, now = new Date()): ZonedNow | null {
  if (!timeZone) return null;
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone, weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
    }).formatToParts(now);
  } catch { return null; }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const dayIndex = WEEKDAY_INDEX[part('weekday')];
  if (dayIndex === undefined) return null;
  return { dayIndex, minutes: Number(part('hour')) * 60 + Number(part('minute')), date: `${part('year')}-${part('month')}-${part('day')}` };
}

export function classDayAt(dayIndex: number): ClassDay | undefined {
  return classDays[dayIndex]?.id;
}

export interface CallBoard {
  /** 'today' lists the classes still to come today; 'next' lists the next class day's classes. */
  when: 'today' | 'next';
  day: ClassDay;
  entries: TimetableEntry[];
}

/** Today's remaining classes, or the next class day's classes after the last class or on Sunday. */
export function callBoard(entries: readonly TimetableEntry[], timeZone: string, now = new Date()): CallBoard | null {
  const local = zonedNow(timeZone, now);
  if (!local) return null;
  const today = classDayAt(local.dayIndex);
  if (today) {
    const remaining = entriesForDay(today, [...entries]).filter(entry => toMinutes(entry.end) > local.minutes);
    if (remaining.length) return { when: 'today', day: today, entries: remaining };
  }
  for (let offset = 1; offset <= 7; offset++) {
    const day = classDayAt((local.dayIndex + offset) % 7);
    if (!day) continue;
    const list = entriesForDay(day, [...entries]);
    if (list.length) return { when: 'next', day, entries: list };
  }
  return null;
}

/** Whole days between two YYYY-MM-DD dates (b − a). */
export function daysBetween(a: string, b: string): number {
  const toUtc = (value: string) => { const [y, m, d] = value.split('-').map(Number); return Date.UTC(y, m - 1, d); };
  return Math.round((toUtc(b) - toUtc(a)) / 86_400_000);
}

export type PerformanceState = { performed: true } | { performed: false; label: string };

/**
 * "Today", "Tomorrow", "This Saturday", "in 17 days" or performed, judged at the performance's local
 * start time in the studio's zone. Null when the zone is unknown (static copy keeps the date only).
 */
export function performanceState(performance: Pick<Performance, 'date' | 'start'>, timeZone: string, now = new Date()): PerformanceState | null {
  const local = zonedNow(timeZone, now);
  if (!local) return null;
  const days = daysBetween(local.date, performance.date);
  if (days < 0 || (days === 0 && local.minutes >= toMinutes(performance.start))) return { performed: true };
  if (days === 0) return { performed: false, label: 'Today' };
  if (days === 1) return { performed: false, label: 'Tomorrow' };
  if (days < 7) {
    const [y, m, d] = performance.date.split('-').map(Number);
    const weekday = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
    return { performed: false, label: `This ${weekday}` };
  }
  return { performed: false, label: `in ${days} days` };
}

/** True when every performance of the concert has started. */
export function concertFinished(concert: Concert, timeZone: string, now = new Date()): boolean {
  return concert.performances.every(performance => performanceState(performance, timeZone, now)?.performed === true);
}

/** Upcoming concerts first (in data order), finished ones after them. */
export function orderConcerts(list: readonly Concert[], timeZone: string, now = new Date()): Concert[] {
  const upcoming = list.filter(concert => !concertFinished(concert, timeZone, now));
  const finished = list.filter(concert => concertFinished(concert, timeZone, now));
  return [...upcoming, ...finished];
}

/** UTC offset like "-06:00" for a local date/time in `timeZone`. */
export function zoneOffset(date: string, time: string, timeZone: string): string {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const asUtc = Date.UTC(y, m - 1, d, hh, mm);
  const offsetAt = (instant: number) => {
    const name = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
      .formatToParts(new Date(instant)).find(part => part.type === 'timeZoneName')?.value ?? 'GMT';
    const match = /GMT([+-])(\d{2}):(\d{2})/.exec(name);
    return match ? (match[1] === '-' ? -1 : 1) * (Number(match[2]) * 60 + Number(match[3])) : 0;
  };
  // Two passes settle the offset around DST changes.
  let offset = offsetAt(asUtc);
  offset = offsetAt(asUtc - offset * 60_000);
  const sign = offset < 0 ? '-' : '+';
  const abs = Math.abs(offset);
  return `${sign}${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`;
}

/** ISO 8601 local date-time with offset, e.g. 2026-12-12T17:00:00-06:00. */
export function zonedIso(date: string, time: string, timeZone: string): string {
  return `${date}T${time}:00${zoneOffset(date, time, timeZone)}`;
}
