// The weekly class timetable. Owners edit `availability` most often (weekly), then teacher cover and times.
// Rules (checked by tests/content.test.ts): IDs are unique and URL-safe; style, level, room and teacher
// must exist; the style must be offered at that level and taught by that teacher; the length must be one
// of the level's durations; classes sit inside front desk hours; rooms and teachers never overlap.
import type { LevelId, RoomId, StyleId } from './classes.ts';

export type ClassDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
/** open = places available; few-spots = nearly full; waitlist = full, ask to join the waitlist. */
export type Availability = 'open' | 'few-spots' | 'waitlist';

export interface TimetableEntry {
  /** Stable class ID, also the anchor on /timetable/ that visitors quote in enquiries. */
  id: string;
  day: ClassDay;
  /** Local 24-hour HH:MM in the studio's time zone. */
  start: string;
  end: string;
  style: StyleId;
  level: LevelId;
  room: RoomId;
  /** Teacher ID from content/classes.ts. */
  teacher: string;
  availability: Availability;
}

export const classDays: { id: ClassDay; name: string; short: string; hoursDay: string }[] = [
  { id: 'mon', name: 'Monday', short: 'Mon', hoursDay: 'Monday' },
  { id: 'tue', name: 'Tuesday', short: 'Tue', hoursDay: 'Tuesday' },
  { id: 'wed', name: 'Wednesday', short: 'Wed', hoursDay: 'Wednesday' },
  { id: 'thu', name: 'Thursday', short: 'Thu', hoursDay: 'Thursday' },
  { id: 'fri', name: 'Friday', short: 'Fri', hoursDay: 'Friday' },
  { id: 'sat', name: 'Saturday', short: 'Sat', hoursDay: 'Saturday' },
];

export const availabilityLabels: Record<Availability, string> = {
  open: 'Open',
  'few-spots': 'Few spots',
  waitlist: 'Waitlist',
};

export const timetable: TimetableEntry[] = [
  { id: 'mon-ballet-petite', day: 'mon', start: '16:00', end: '16:30', style: 'ballet', level: 'petite', room: 'mirror-room', teacher: 'priya-anand', availability: 'open' },
  { id: 'mon-hip-hop-inter', day: 'mon', start: '16:30', end: '17:30', style: 'hip-hop', level: 'inter', room: 'sprung-box', teacher: 'jaye-okafor', availability: 'open' },
  { id: 'mon-ballet-junior', day: 'mon', start: '16:45', end: '17:30', style: 'ballet', level: 'junior', room: 'mirror-room', teacher: 'priya-anand', availability: 'few-spots' },
  { id: 'mon-ballet-senior', day: 'mon', start: '17:45', end: '19:15', style: 'ballet', level: 'senior', room: 'mirror-room', teacher: 'odile-marchetti', availability: 'open' },
  { id: 'mon-jazz-senior', day: 'mon', start: '17:45', end: '18:45', style: 'jazz', level: 'senior', room: 'sprung-box', teacher: 'jaye-okafor', availability: 'few-spots' },
  { id: 'mon-contemporary-adult', day: 'mon', start: '19:30', end: '20:30', style: 'contemporary', level: 'adult', room: 'mirror-room', teacher: 'wren-castellanos', availability: 'open' },
  { id: 'tue-tap-junior', day: 'tue', start: '16:00', end: '16:45', style: 'tap', level: 'junior', room: 'sprung-box', teacher: 'benny-lund', availability: 'open' },
  { id: 'tue-contemporary-inter', day: 'tue', start: '16:30', end: '17:30', style: 'contemporary', level: 'inter', room: 'mirror-room', teacher: 'wren-castellanos', availability: 'waitlist' },
  { id: 'tue-tap-inter', day: 'tue', start: '17:00', end: '18:00', style: 'tap', level: 'inter', room: 'sprung-box', teacher: 'benny-lund', availability: 'open' },
  { id: 'tue-contemporary-senior', day: 'tue', start: '17:45', end: '19:15', style: 'contemporary', level: 'senior', room: 'mirror-room', teacher: 'wren-castellanos', availability: 'few-spots' },
  { id: 'tue-musical-theatre-senior', day: 'tue', start: '18:15', end: '19:15', style: 'musical-theatre', level: 'senior', room: 'sprung-box', teacher: 'benny-lund', availability: 'open' },
  { id: 'tue-hip-hop-adult', day: 'tue', start: '19:30', end: '20:30', style: 'hip-hop', level: 'adult', room: 'sprung-box', teacher: 'jaye-okafor', availability: 'open' },
  { id: 'wed-ballet-inter', day: 'wed', start: '16:00', end: '17:00', style: 'ballet', level: 'inter', room: 'mirror-room', teacher: 'odile-marchetti', availability: 'open' },
  { id: 'wed-jazz-junior', day: 'wed', start: '16:00', end: '16:45', style: 'jazz', level: 'junior', room: 'sprung-box', teacher: 'priya-anand', availability: 'open' },
  { id: 'wed-hip-hop-senior', day: 'wed', start: '17:00', end: '18:00', style: 'hip-hop', level: 'senior', room: 'sprung-box', teacher: 'jaye-okafor', availability: 'waitlist' },
  { id: 'wed-ballet-adult', day: 'wed', start: '19:00', end: '20:00', style: 'ballet', level: 'adult', room: 'mirror-room', teacher: 'odile-marchetti', availability: 'open' },
  { id: 'thu-musical-theatre-junior', day: 'thu', start: '16:00', end: '16:45', style: 'musical-theatre', level: 'junior', room: 'sprung-box', teacher: 'benny-lund', availability: 'few-spots' },
  { id: 'thu-jazz-inter', day: 'thu', start: '16:30', end: '17:30', style: 'jazz', level: 'inter', room: 'mirror-room', teacher: 'priya-anand', availability: 'open' },
  { id: 'thu-contemporary-junior', day: 'thu', start: '17:00', end: '17:45', style: 'contemporary', level: 'junior', room: 'sprung-box', teacher: 'wren-castellanos', availability: 'open' },
  { id: 'thu-tap-adult', day: 'thu', start: '19:00', end: '20:00', style: 'tap', level: 'adult', room: 'sprung-box', teacher: 'benny-lund', availability: 'open' },
  { id: 'fri-hip-hop-junior', day: 'fri', start: '16:00', end: '16:45', style: 'hip-hop', level: 'junior', room: 'sprung-box', teacher: 'jaye-okafor', availability: 'open' },
  { id: 'fri-musical-theatre-inter', day: 'fri', start: '17:00', end: '18:00', style: 'musical-theatre', level: 'inter', room: 'sprung-box', teacher: 'benny-lund', availability: 'open' },
  { id: 'sat-ballet-petite', day: 'sat', start: '09:00', end: '09:30', style: 'ballet', level: 'petite', room: 'mirror-room', teacher: 'priya-anand', availability: 'few-spots' },
  { id: 'sat-tap-petite', day: 'sat', start: '09:00', end: '09:30', style: 'tap', level: 'petite', room: 'sprung-box', teacher: 'benny-lund', availability: 'open' },
  { id: 'sat-hip-hop-petite', day: 'sat', start: '09:45', end: '10:15', style: 'hip-hop', level: 'petite', room: 'sprung-box', teacher: 'jaye-okafor', availability: 'waitlist' },
  { id: 'sat-ballet-junior', day: 'sat', start: '09:45', end: '10:30', style: 'ballet', level: 'junior', room: 'mirror-room', teacher: 'priya-anand', availability: 'open' },
  { id: 'sat-contemporary-adult', day: 'sat', start: '11:00', end: '12:00', style: 'contemporary', level: 'adult', room: 'mirror-room', teacher: 'wren-castellanos', availability: 'open' },
  { id: 'sat-jazz-adult', day: 'sat', start: '12:15', end: '13:15', style: 'jazz', level: 'adult', room: 'sprung-box', teacher: 'jaye-okafor', availability: 'open' },
];

/** Minutes since midnight for HH:MM. */
export function toMinutes(value: string): number {
  return Number(value.slice(0, 2)) * 60 + Number(value.slice(3, 5));
}

/** "16:00" → "4:00 pm" */
export function formatTime(value: string): string {
  const total = toMinutes(value);
  const hour = Math.floor(total / 60);
  const minute = String(total % 60).padStart(2, '0');
  return `${hour % 12 || 12}:${minute} ${hour < 12 ? 'am' : 'pm'}`;
}

export function entriesForDay(day: ClassDay, entries = timetable): TimetableEntry[] {
  return entries.filter(entry => entry.day === day).sort((a, b) => toMinutes(a.start) - toMinutes(b.start) || a.id.localeCompare(b.id));
}
