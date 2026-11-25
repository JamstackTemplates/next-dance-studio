import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { fees, levels, rooms, styles, teachers } from '../content/classes.ts';
import { archive, concerts } from '../content/concerts.ts';
import { timetable } from '../content/timetable.ts';
import { kits, shop } from '../content/uniform.ts';
import { contentProblems } from '../content/validate.ts';
import { concertStructuredData, jsonLd } from '../lib/structured-data.ts';

const data = () => structuredClone({ business, levels, styles, teachers, rooms, fees, timetable, concerts, archive, kits, shop });

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email'] as const) assert.ok(business[key].trim(), `business.${key}: required`);
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
});

test('all shipped content passes every rule', () => {
  assert.deepEqual(contentProblems(), []);
  assert.equal(timetable.length, 28);
  assert.equal(styles.length, 6);
  assert.equal(levels.length, 5);
});

test('broken references and duplicates name the item to fix', () => {
  const d = data();
  d.timetable[0].teacher = 'nobody';
  d.timetable[1].style = 'tango' as never;
  d.timetable[2].id = d.timetable[3].id;
  d.shop[0].price = 41.5;
  const problems = contentProblems(d).join('\n');
  assert.match(problems, /timetable\[mon-ballet-petite\]: unknown teacher "nobody"/);
  assert.match(problems, /timetable\[mon-hip-hop-inter\]: unknown style "tango"/);
  assert.match(problems, /id "mon-ballet-senior" is already used/);
  assert.match(problems, /shop\[level-leotard\]: price must be positive whole dollars/);
});

test('style/level offers, teacher styles and class lengths are enforced', () => {
  const d = data();
  const petite = d.timetable.find(e => e.id === 'mon-ballet-petite')!;
  petite.style = 'jazz';
  const junior = d.timetable.find(e => e.id === 'tue-tap-junior')!;
  junior.teacher = 'odile-marchetti';
  const inter = d.timetable.find(e => e.id === 'wed-ballet-inter')!;
  inter.end = '17:30';
  const problems = contentProblems(d).join('\n');
  assert.match(problems, /mon-ballet-petite\]: Jazz is not offered at Petite/);
  assert.match(problems, /tue-tap-junior\]: Odile Marchetti does not teach Tap/);
  assert.match(problems, /wed-ballet-inter\]: 90 minutes is not a Intermediate class length/);
});

test('room and teacher overlaps and out-of-hours classes are caught', () => {
  const d = data();
  const clash = d.timetable.find(e => e.id === 'mon-jazz-senior')!;
  clash.room = 'mirror-room';
  const late = d.timetable.find(e => e.id === 'sat-jazz-adult')!;
  late.start = '14:30'; late.end = '15:30';
  const problems = contentProblems(d).join('\n');
  assert.match(problems, /mon-jazz-senior\]: overlaps mon-ballet-senior in mirror-room|mon-ballet-senior\]: overlaps mon-jazz-senior/);
  assert.match(problems, /sat-jazz-adult\]: must run within front desk hours on Saturday/);
  const d2 = data();
  d2.timetable.find(e => e.id === 'mon-ballet-junior')!.start = '16:15';
  d2.timetable.find(e => e.id === 'mon-ballet-junior')!.end = '17:00';
  assert.match(contentProblems(d2).join('\n'), /priya-anand is already teaching mon-ballet-petite|overlaps mon-ballet-petite/);
});

test('level ages are contiguous', () => {
  const d = data();
  d.levels[2].minAge = 10;
  assert.match(contentProblems(d).join('\n'), /levels\[inter\]: ages must continue from Junior \(8\)/);
});

test('concert performances, rehearsals and statuses are validated', () => {
  const d = data();
  d.concerts[0].dressRehearsal!.date = '2026-12-13';
  d.concerts[0].performances[0].levels.push('grownups' as never);
  d.concerts[1].ticketStatus = 'free' as never;
  d.concerts[2].performances[0].date = '2027-02-30';
  const problems = contentProblems(d).join('\n');
  assert.match(problems, /winter-showcase-2026\]\.dressRehearsal: must be before the first performance/);
  assert.match(problems, /winter-2026-matinee\]: unknown level "grownups"/);
  assert.match(problems, /the-lab-2027\]: ticketStatus must be/);
  assert.match(problems, /spring-2027-sat-matinee\]: date must be a real YYYY-MM-DD/);
});

test('a common owner edit (waitlist → few spots) stays valid', () => {
  const d = data();
  d.timetable.find(e => e.id === 'tue-contemporary-inter')!.availability = 'few-spots';
  d.concerts[0].ticketStatus = 'few-left';
  d.shop.find(s => s.id === 'petite-tap-shoes')!.stock = 'in-stock';
  assert.deepEqual(contentProblems(d), []);
  d.timetable[0].availability = 'full' as never;
  assert.match(contentProblems(d).join('\n'), /mon-ballet-petite\]: availability must be/);
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('each performance is a DanceEvent with the Chicago offset for its date', () => {
  const events = concertStructuredData('America/Chicago');
  assert.equal(events.length, concerts.reduce((n, c) => n + c.performances.length, 0));
  const starts = Object.fromEntries(events.map(e => [e.name + e.description.slice(0, 12), e.startDate]));
  assert.ok(events.every(e => e['@type'] === 'DanceEvent'));
  assert.ok(Object.values(starts).includes('2026-12-12T17:00:00-06:00'));
  assert.ok(Object.values(starts).includes('2027-03-20T19:00:00-05:00'));
  assert.ok(Object.values(starts).includes('2027-06-05T18:30:00-05:00'));
  assert.deepEqual(concertStructuredData(''), []);
  for (const event of events) assert.ok(!('url' in event.offers[0]), 'offers never link to a purchase');
});

// Enquiries never read as confirmed bookings, sales or payments.
const FORBIDDEN = [/book now/i, /\breserve\b/i, /buy tickets/i, /\bconfirmed\b/i];
const ALLOWED_LINE = 'Places and tickets are confirmed only when the front desk replies';

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : /\.(tsx?|mjs)$/.test(name) ? [path] : [];
  });
}

test('page and content wording keeps trials and tickets as enquiries', () => {
  const root = new URL('../', import.meta.url).pathname;
  for (const file of [...sourceFiles(join(root, 'app')), ...sourceFiles(join(root, 'components')), ...sourceFiles(join(root, 'content'))]) {
    if (file.endsWith('validate.ts')) continue;
    const text = readFileSync(file, 'utf8').replaceAll(ALLOWED_LINE, '');
    for (const pattern of FORBIDDEN) assert.doesNotMatch(text, pattern, `${file.slice(root.length)} contains ${pattern}`);
  }
  assert.ok(business.enquiries.confirmationNote.startsWith(ALLOWED_LINE));
});
