// Concerts and the programme archive. Owners edit `ticketStatus` most often.
// Dates are local to the studio's time zone (site.config.json timeZone). Validated by tests.
import type { LevelId } from './classes.ts';

/** coming-soon = not yet on sale; on-sale; few-left; sold-out. Requests are always enquiries. */
export type TicketStatus = 'coming-soon' | 'on-sale' | 'few-left' | 'sold-out';

export interface Performance {
  id: string;
  /** YYYY-MM-DD, local date. */
  date: string;
  /** HH:MM, local 24-hour time. */
  start: string;
  /** Levels dancing in this performance. */
  levels: LevelId[];
  /** Optional short label, e.g. "Matinee". */
  label: string;
}

export interface Concert {
  id: string;
  title: string;
  subtitle: string;
  venue: { name: string; address: string; note?: string };
  performances: Performance[];
  /** Whole USD per seat. */
  tickets: { adult: number; child: number; childAgeNote: string };
  ticketStatus: TicketStatus;
  /** Null when there is no separate dress rehearsal. */
  dressRehearsal: { date: string; start: string; end: string; place: string } | null;
  /** Whole USD per routine, or null when costumes come from the studio wardrobe. */
  costumeFee: number | null;
  notes: string;
}

export interface ArchiveEntry { id: string; title: string; year: number; line: string }

export const ticketStatusLabels: Record<TicketStatus, string> = {
  'coming-soon': 'Tickets coming soon',
  'on-sale': 'Tickets on sale',
  'few-left': 'Few tickets left',
  'sold-out': 'Sold out',
};

const millrace = { name: 'Millrace Theatre', address: '400 Millrace Lane, Minneapolis, MN 55401' };

export const concerts: Concert[] = [
  {
    id: 'winter-showcase-2026',
    title: 'Frost & Footlights',
    subtitle: 'Winter Showcase 2026',
    venue: millrace,
    performances: [
      { id: 'winter-2026-matinee', date: '2026-12-12', start: '13:00', levels: ['petite', 'junior', 'inter'], label: 'Matinee' },
      { id: 'winter-2026-evening', date: '2026-12-12', start: '17:00', levels: ['inter', 'senior', 'adult'], label: 'Evening' },
    ],
    tickets: { adult: 26, child: 14, childAgeNote: 'Child seats are for ages 2–12; under 2 free on a lap.' },
    ticketStatus: 'on-sale',
    dressRehearsal: { date: '2026-12-10', start: '16:30', end: '20:30', place: 'Millrace Theatre' },
    costumeFee: null,
    notes: 'Showcase costumes come from the studio wardrobe.',
  },
  {
    id: 'the-lab-2027',
    title: 'The Lab',
    subtitle: 'New work by our Senior and Adult dancers',
    venue: { name: 'Studio A · The Mirror Room', address: '214 Millrace Lane, Minneapolis, MN 55401', note: '60 seats' },
    performances: [
      { id: 'lab-2027', date: '2027-03-20', start: '19:00', levels: ['senior', 'adult'], label: 'One night only' },
    ],
    tickets: { adult: 12, child: 12, childAgeNote: 'One price for every seat.' },
    ticketStatus: 'coming-soon',
    dressRehearsal: null,
    costumeFee: null,
    notes: 'No dress rehearsal: the tech run happens in class.',
  },
  {
    id: 'spring-recital-2027',
    title: 'Pulse',
    subtitle: 'Spring Recital 2027',
    venue: millrace,
    performances: [
      { id: 'spring-2027-sat-matinee', date: '2027-06-05', start: '14:00', levels: ['petite', 'junior'], label: 'Saturday matinee' },
      { id: 'spring-2027-sat-evening', date: '2027-06-05', start: '18:30', levels: ['inter', 'senior', 'adult'], label: 'Saturday evening' },
      { id: 'spring-2027-sun-matinee', date: '2027-06-06', start: '14:00', levels: ['petite', 'junior', 'inter', 'senior', 'adult'], label: 'Sunday finale' },
    ],
    tickets: { adult: 30, child: 16, childAgeNote: 'Child seats are for ages 2–12; under 2 free on a lap.' },
    ticketStatus: 'coming-soon',
    dressRehearsal: { date: '2027-06-03', start: '16:00', end: '21:00', place: 'Millrace Theatre' },
    costumeFee: 65,
    notes: 'Costume fee is per routine and covers a costume your dancer keeps.',
  },
];

export const archive: ArchiveEntry[] = [
  { id: 'snow-globe-2025', title: 'Snow Globe', year: 2025, line: 'Our Petites stole it as a flurry of snowflakes.' },
  { id: 'kaleidoscope-2025', title: 'Kaleidoscope', year: 2025, line: 'Six styles, one colour wheel, three sold-out shows.' },
  { id: 'paper-moon-2024', title: 'Paper Moon', year: 2024, line: 'The first recital with live tap band accompaniment.' },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Calendar parts of a YYYY-MM-DD date, independent of any time zone. */
export function dateParts(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return { year, month, day, monthName: MONTHS[month - 1], monthShort: MONTHS[month - 1].slice(0, 3).toUpperCase(), weekday: WEEKDAYS[weekday] };
}

/** "Saturday 12 December 2026" */
export function formatDate(date: string): string {
  const p = dateParts(date);
  return `${p.weekday} ${p.day} ${p.monthName} ${p.year}`;
}
