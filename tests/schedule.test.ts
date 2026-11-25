import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { concerts } from '../content/concerts.ts';
import { timetable } from '../content/timetable.ts';
import { openingLabel } from '../lib/hours.ts';
import { callBoard, orderConcerts, performanceState, zonedIso } from '../lib/schedule.ts';

const ZONE = 'America/Chicago';
const at = (iso: string) => new Date(iso);
const label = (iso: string) => openingLabel(business.hours, ZONE, at(iso));

test('front desk: Friday closes at 21:00 exclusive, Saturday opens 08:30 inclusive (CST)', () => {
  // 2026-11-27 is a Friday; Chicago is UTC−6 in winter.
  assert.equal(label('2026-11-28T02:59:00Z'), 'Open now · until 21:00');
  assert.equal(label('2026-11-28T03:00:00Z'), 'Closed · opens Saturday at 08:30');
  assert.equal(label('2026-11-28T14:29:00Z'), 'Closed · opens today at 08:30');
  assert.equal(label('2026-11-28T14:30:00Z'), 'Open now · until 15:00');
});

test('front desk: Sunday is closed and next opens Monday 15:30', () => {
  assert.equal(label('2026-11-29T18:00:00Z'), 'Closed · opens Monday at 15:30');
});

test('front desk hours hold local time across both DST changes', () => {
  // 2027-03-15 (Monday after DST starts 03-14): CDT, UTC−5 → 15:30 local is 20:30Z.
  assert.equal(label('2027-03-15T20:29:00Z'), 'Closed · opens today at 15:30');
  assert.equal(label('2027-03-15T20:30:00Z'), 'Open now · until 21:00');
  // 2026-11-02 (Monday after DST ended 11-01): CST, UTC−6 → 15:30 local is 21:30Z.
  assert.equal(label('2026-11-02T21:29:00Z'), 'Closed · opens today at 15:30');
  assert.equal(label('2026-11-02T21:30:00Z'), 'Open now · until 21:00');
  // 2027-11-08 (Monday after DST ends 11-07): CST again.
  assert.equal(label('2027-11-08T21:30:00Z'), 'Open now · until 21:00');
  // Sunday 2027-03-14 itself is closed whatever the offset.
  assert.equal(label('2027-03-14T18:00:00Z'), 'Closed · opens Monday at 15:30');
});

test('call board lists remaining classes today, then the next class day', () => {
  // Tuesday 2026-12-01 17:00 CST = 23:00Z: classes ending after 17:00 remain.
  const tue = callBoard(timetable, ZONE, at('2026-12-01T23:00:00Z'))!;
  assert.equal(tue.when, 'today');
  assert.equal(tue.day, 'tue');
  assert.deepEqual(tue.entries.map(e => e.id), ['tue-contemporary-inter', 'tue-tap-inter', 'tue-contemporary-senior', 'tue-musical-theatre-senior', 'tue-hip-hop-adult']);
  // After the last Tuesday class (20:30) → Wednesday.
  const late = callBoard(timetable, ZONE, at('2026-12-02T02:31:00Z'))!;
  assert.equal(late.when, 'next');
  assert.equal(late.day, 'wed');
  // Sunday → Monday's full list.
  const sun = callBoard(timetable, ZONE, at('2026-12-06T18:00:00Z'))!;
  assert.equal(sun.when, 'next');
  assert.equal(sun.day, 'mon');
  assert.equal(sun.entries.length, 6);
  // Saturday after the last class → Monday.
  assert.equal(callBoard(timetable, ZONE, at('2026-12-05T20:00:00Z'))!.day, 'mon');
  assert.equal(callBoard(timetable, '', at('2026-12-05T20:00:00Z')), null);
});

test('the owner availability edit shows on the call board', () => {
  const edited = timetable.map(e => e.id === 'tue-contemporary-inter' ? { ...e, availability: 'few-spots' as const } : e);
  const board = callBoard(edited, ZONE, at('2026-12-01T22:00:00Z'))!;
  assert.equal(board.entries.find(e => e.id === 'tue-contemporary-inter')!.availability, 'few-spots');
});

test('a performance is upcoming until its local start, then performed', () => {
  const evening = { date: '2026-12-12', start: '17:00' };
  // 16:59 CST = 22:59Z
  assert.deepEqual(performanceState(evening, ZONE, at('2026-12-12T22:59:00Z')), { performed: false, label: 'Today' });
  assert.deepEqual(performanceState(evening, ZONE, at('2026-12-12T23:00:00Z')), { performed: true });
  assert.deepEqual(performanceState(evening, ZONE, at('2026-11-25T18:00:00Z')), { performed: false, label: 'in 17 days' });
  assert.deepEqual(performanceState(evening, ZONE, at('2026-12-08T18:00:00Z')), { performed: false, label: 'This Saturday' });
  assert.deepEqual(performanceState(evening, ZONE, at('2026-12-11T18:00:00Z')), { performed: false, label: 'Tomorrow' });
  assert.equal(performanceState(evening, '', at('2026-12-11T18:00:00Z')), null);
});

test('countdown is whole local days across the March DST change', () => {
  const lab = { date: '2027-03-20', start: '19:00' };
  // 2027-03-13 12:00 CST (before DST) → 7 days.
  assert.deepEqual(performanceState(lab, ZONE, at('2027-03-13T18:00:00Z')), { performed: false, label: 'in 7 days' });
  // 2027-03-14 23:30 CDT = 2027-03-15T04:30Z → still the 14th locally, 6 days → "This Saturday".
  assert.deepEqual(performanceState(lab, ZONE, at('2027-03-15T04:30:00Z')), { performed: false, label: 'This Saturday' });
  assert.equal(zonedIso('2027-03-14', '03:30', ZONE), '2027-03-14T03:30:00-05:00');
  assert.equal(zonedIso('2027-03-13', '19:00', ZONE), '2027-03-13T19:00:00-06:00');
});

test('finished concerts drop behind upcoming ones', () => {
  const ordered = orderConcerts(concerts, ZONE, at('2026-12-13T12:00:00Z'));
  assert.deepEqual(ordered.map(c => c.id), ['the-lab-2027', 'spring-recital-2027', 'winter-showcase-2026']);
  assert.deepEqual(orderConcerts(concerts, ZONE, at('2026-11-25T12:00:00Z')).map(c => c.id), concerts.map(c => c.id));
});
