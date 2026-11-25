// Content rules for every typed collection. Each problem names the item to fix.
// Run by tests/content.test.ts and at build time from app/layout.tsx.
import { business } from './business.ts';
import { fees, levels, rooms, styles, teachers, type LevelId } from './classes.ts';
import { archive, concerts, type TicketStatus } from './concerts.ts';
import { classDays, timetable, toMinutes, type Availability } from './timetable.ts';
import { kits, shop, type Stock } from './uniform.ts';
import { validateHours } from '../lib/hours.ts';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CLOCK = /^([01]\d|2[0-3]):[0-5]\d$/;
const AVAILABILITY: Availability[] = ['open', 'few-spots', 'waitlist'];
const TICKETS: TicketStatus[] = ['coming-soon', 'on-sale', 'few-left', 'sold-out'];
const STOCK: Stock[] = ['in-stock', 'low', 'sold-out'];

function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

function wholeDollars(value: unknown): boolean {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

export function contentProblems(data = { business, levels, styles, teachers, rooms, fees, timetable, concerts, archive, kits, shop }): string[] {
  const problems: string[] = [];
  const fail = (message: string) => problems.push(message);
  const ids = new Map<string, string>();
  const claim = (id: string, owner: string) => {
    if (!SLUG.test(id)) fail(`${owner}: id "${id}" must be lowercase and URL-safe`);
    if (ids.has(id)) fail(`${owner}: id "${id}" is already used by ${ids.get(id)}`);
    ids.set(id, owner);
  };

  try { validateHours(data.business.hours); } catch (error) { fail(`business.${(error as Error).message}`); }

  const levelIds = new Set<string>(data.levels.map(level => level.id));
  data.levels.forEach((level, index) => {
    claim(level.id, `levels[${level.id}]`);
    if (!level.durations.length) fail(`levels[${level.id}]: needs at least one class length`);
    if (level.leotard.hex !== null && !/^#[0-9A-F]{6}$/i.test(level.leotard.hex)) fail(`levels[${level.id}]: leotard hex must be #RRGGBB or null`);
    const next = data.levels[index + 1];
    if (next) {
      if (level.maxAge === null) fail(`levels[${level.id}]: only the last level can be open-ended`);
      // Levels are contiguous; Adult Open may share 18 with Senior.
      else if (!(next.minAge === level.maxAge + 1 || (next.id === 'adult' && next.minAge === level.maxAge))) {
        fail(`levels[${next.id}]: ages must continue from ${level.name} (${level.maxAge}) without a gap`);
      }
    }
  });

  const styleIds = new Set<string>(data.styles.map(style => style.id));
  for (const style of data.styles) {
    claim(style.id, `styles[${style.id}]`);
    if (!(style.bpm >= 40 && style.bpm <= 180)) fail(`styles[${style.id}]: bpm must be 40–180`);
    for (const level of style.levels) if (!levelIds.has(level)) fail(`styles[${style.id}]: unknown level "${level}"`);
    for (const key of ['name', 'tagline', 'description', 'suits', 'signatureStep'] as const) {
      if (!style[key].trim()) fail(`styles[${style.id}]: ${key} is required`);
    }
  }

  for (const teacher of data.teachers) {
    claim(teacher.id, `teachers[${teacher.id}]`);
    for (const style of teacher.styles) if (!styleIds.has(style)) fail(`teachers[${teacher.id}]: unknown style "${style}"`);
  }
  for (const room of data.rooms) claim(room.id, `rooms[${room.id}]`);

  for (const entry of data.fees.byLength) if (!wholeDollars(entry.price)) fail(`fees: ${entry.minutes}-minute fee must be positive whole dollars`);
  if (!wholeDollars(data.fees.adultDropIn)) fail('fees.adultDropIn: must be positive whole dollars');

  const dayIndex = new Map(classDays.map(day => [day.id, day]));
  for (const entry of data.timetable) {
    const owner = `timetable[${entry.id}]`;
    claim(entry.id, owner);
    const style = data.styles.find(item => item.id === entry.style);
    const level = data.levels.find(item => item.id === entry.level);
    const teacher = data.teachers.find(item => item.id === entry.teacher);
    const day = dayIndex.get(entry.day);
    if (!style) fail(`${owner}: unknown style "${entry.style}"`);
    if (!level) fail(`${owner}: unknown level "${entry.level}"`);
    if (!teacher) fail(`${owner}: unknown teacher "${entry.teacher}"`);
    if (!data.rooms.some(room => room.id === entry.room)) fail(`${owner}: unknown room "${entry.room}"`);
    if (!day) fail(`${owner}: day must be mon–sat`);
    if (!AVAILABILITY.includes(entry.availability)) fail(`${owner}: availability must be ${AVAILABILITY.join(', ')}`);
    if (style && level && !style.levels.includes(level.id)) fail(`${owner}: ${style.name} is not offered at ${level.name}`);
    if (style && teacher && !teacher.styles.includes(style.id)) fail(`${owner}: ${teacher.name} does not teach ${style.name}`);
    if (!CLOCK.test(entry.start) || !CLOCK.test(entry.end)) { fail(`${owner}: start and end must be HH:MM`); continue; }
    const length = toMinutes(entry.end) - toMinutes(entry.start);
    if (length <= 0) fail(`${owner}: must end after it starts`);
    else if (level && !level.durations.includes(length)) fail(`${owner}: ${length} minutes is not a ${level.name} class length (${level.durations.join('/')})`);
    const hours = day && data.business.hours.find(item => item.day === day.hoursDay);
    if (day && (!hours?.opens || !hours.closes || toMinutes(entry.start) < toMinutes(hours.opens) || toMinutes(entry.end) > toMinutes(hours.closes))) {
      fail(`${owner}: must run within front desk hours on ${day.name}`);
    }
  }
  for (let i = 0; i < data.timetable.length; i++) {
    for (let j = i + 1; j < data.timetable.length; j++) {
      const a = data.timetable[i], b = data.timetable[j];
      if (a.day !== b.day || toMinutes(a.start) >= toMinutes(b.end) || toMinutes(b.start) >= toMinutes(a.end)) continue;
      if (a.room === b.room) fail(`timetable[${b.id}]: overlaps ${a.id} in ${a.room}`);
      if (a.teacher === b.teacher) fail(`timetable[${b.id}]: ${b.teacher} is already teaching ${a.id}`);
    }
  }

  for (const concert of data.concerts) {
    const owner = `concerts[${concert.id}]`;
    claim(concert.id, owner);
    if (!TICKETS.includes(concert.ticketStatus)) fail(`${owner}: ticketStatus must be ${TICKETS.join(', ')}`);
    if (!wholeDollars(concert.tickets.adult) || !wholeDollars(concert.tickets.child)) fail(`${owner}: ticket prices must be positive whole dollars`);
    if (concert.costumeFee !== null && !wholeDollars(concert.costumeFee)) fail(`${owner}: costumeFee must be positive whole dollars or null`);
    if (!concert.performances.length) fail(`${owner}: needs at least one performance`);
    for (const performance of concert.performances) {
      claim(performance.id, `${owner}.performances[${performance.id}]`);
      if (!validDate(performance.date)) fail(`${owner}.performances[${performance.id}]: date must be a real YYYY-MM-DD`);
      if (!CLOCK.test(performance.start)) fail(`${owner}.performances[${performance.id}]: start must be HH:MM`);
      if (!performance.levels.length) fail(`${owner}.performances[${performance.id}]: list the levels performing`);
      for (const level of performance.levels) if (!levelIds.has(level as LevelId)) fail(`${owner}.performances[${performance.id}]: unknown level "${level}"`);
    }
    const first = [...concert.performances].map(p => p.date).sort()[0];
    if (concert.dressRehearsal) {
      if (!validDate(concert.dressRehearsal.date)) fail(`${owner}.dressRehearsal: date must be a real YYYY-MM-DD`);
      else if (first && concert.dressRehearsal.date >= first) fail(`${owner}.dressRehearsal: must be before the first performance (${first})`);
    }
  }
  for (const entry of data.archive) {
    claim(entry.id, `archive[${entry.id}]`);
    if (!Number.isInteger(entry.year)) fail(`archive[${entry.id}]: year must be a whole year`);
  }

  const kitStyles = new Set<string>();
  for (const kit of data.kits) {
    if (!styleIds.has(kit.style)) fail(`kits[${kit.style}]: unknown style`);
    if (kitStyles.has(kit.style)) fail(`kits[${kit.style}]: listed twice`);
    kitStyles.add(kit.style);
  }
  for (const style of styleIds) if (!kitStyles.has(style)) fail(`kits: missing a kit for ${style}`);
  for (const item of data.shop) {
    claim(item.id, `shop[${item.id}]`);
    if (!wholeDollars(item.price)) fail(`shop[${item.id}]: price must be positive whole dollars`);
    if (!STOCK.includes(item.stock)) fail(`shop[${item.id}]: stock must be ${STOCK.join(', ')}`);
  }
  return problems;
}

/** Throws with every problem listed; used at build time. */
export function assertValidContent(): void {
  const problems = contentProblems();
  if (problems.length) throw new Error(`Content problems:\n- ${problems.join('\n- ')}`);
}
