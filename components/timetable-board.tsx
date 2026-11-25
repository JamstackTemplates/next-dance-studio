'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { levels, roomById, styleById, styles, teacherById, type LevelId, type StyleId } from '../content/classes';
import { classDays, entriesForDay, formatTime, timetable, type ClassDay, type TimetableEntry } from '../content/timetable';
import { classDayAt, zonedNow } from '../lib/schedule';
import { site } from '../lib/site';
import { StyleIcon } from './art/icons';
import { AvailabilityMark, LevelChip } from './chips';

type Filters = { style: StyleId | ''; level: LevelId | ''; day: ClassDay | '' };
const EMPTY: Filters = { style: '', level: '', day: '' };

function readFilters(search: string): Filters {
  const params = new URLSearchParams(search);
  const style = params.get('style') ?? '';
  const level = params.get('level') ?? '';
  const day = params.get('day') ?? '';
  return {
    style: styles.some(s => s.id === style) ? style as StyleId : '',
    level: levels.some(l => l.id === level) ? level as LevelId : '',
    day: classDays.some(d => d.id === day) ? day as ClassDay : '',
  };
}

export function matches(entry: TimetableEntry, filters: Filters): boolean {
  return (!filters.style || entry.style === filters.style) && (!filters.level || entry.level === filters.level) && (!filters.day || entry.day === filters.day);
}

/**
 * The call board. Without JavaScript every class shows, grouped by day, and the filter bar is absent.
 * In the browser: style/level/day filters (kept in the URL query) and a "Today" highlight in the studio zone.
 */
export function TimetableBoard({ emptyMessage }: { emptyMessage: string }) {
  const [ready, setReady] = useState(false);
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [today, setToday] = useState<ClassDay | undefined>();

  useEffect(() => {
    setFilters(readFilters(window.location.search));
    setReady(true);
    const update = () => { const local = zonedNow(site.timeZone); setToday(local ? classDayAt(local.dayIndex) : undefined); };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  function choose(next: Partial<Filters>) {
    const value = { ...filters, ...next };
    setFilters(value);
    const params = new URLSearchParams();
    for (const key of ['style', 'level', 'day'] as const) if (value[key]) params.set(key, value[key]);
    const query = params.toString();
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
  }

  const visible = useMemo(() => timetable.filter(entry => matches(entry, filters)).length, [filters]);

  return (
    <div>
      {ready ? (
        <div className="mb-8 grid gap-4" role="group" aria-label="Filter the timetable">
          <ChipRow label="Style" value={filters.style} onChoose={style => choose({ style: style as StyleId | '' })}
            options={styles.map(style => ({ id: style.id, label: style.name, icon: style.id }))} />
          <ChipRow label="Level" value={filters.level} onChoose={level => choose({ level: level as LevelId | '' })}
            options={levels.map(level => ({ id: level.id, label: level.name, swatch: level.leotard.hex }))} />
          <ChipRow label="Day" value={filters.day} onChoose={day => choose({ day: day as ClassDay | '' })}
            options={classDays.map(day => ({ id: day.id, label: day.short }))} />
          <p className="text-sm text-muted" aria-live="polite">{visible === timetable.length ? `All ${visible} classes shown.` : `${visible} of ${timetable.length} classes shown.`}</p>
        </div>
      ) : null}

      {ready && visible === 0 ? <p className="paper mb-6 rounded-md p-5 text-lg font-semibold" role="status">{emptyMessage}</p> : null}

      <div className="cork rounded-xl border border-line p-3 shadow-[0_24px_50px_-30px_rgba(20,14,31,.35)] sm:p-5">
        <div className="grid gap-5 lg:grid-cols-6 lg:gap-3">
          {classDays.map(day => {
            const entries = entriesForDay(day.id);
            const shown = entries.filter(entry => matches(entry, filters));
            const isToday = today === day.id;
            return (
              <section key={day.id} aria-labelledby={`day-${day.id}`} hidden={ready && shown.length === 0 && Boolean(filters.day)}
                className={`rounded-lg ${isToday ? 'bg-spotlight/15 ring-2 ring-spotlight' : ''}`}>
                <h3 id={`day-${day.id}`} className="sticky top-20 z-10 flex items-center justify-between gap-2 rounded-t-lg bg-proscenium px-3 py-2.5 text-stage-ink lg:static">
                  <span className="text-[1.25rem]">{day.name}</span>
                  {isToday ? <span className="label-caps rounded-full bg-spotlight px-2 py-0.5 text-[.62rem] text-[#1A1720]">Today</span> : null}
                </h3>
                <ol className="grid gap-2.5 p-2 sm:grid-cols-2 lg:grid-cols-1">
                  {entries.map((entry, index) => <Slip key={entry.id} entry={entry} index={index} hidden={!matches(entry, filters)} />)}
                </ol>
                {shown.length === 0 ? <p className="px-3 pb-3 text-sm text-muted">No matching classes.</p> : null}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Slip({ entry, hidden }: { entry: TimetableEntry; index: number; hidden: boolean }) {
  const style = styleById(entry.style)!;
  const room = roomById(entry.room)!;
  return (
    <li id={entry.id} hidden={hidden}
      className="slip paper tape-edge relative scroll-mt-24 rounded-lg py-3 pl-4 pr-3 text-ink transition-transform duration-150 hover:-translate-y-0.5 target:ring-2 target:ring-primary"
      style={{ '--tape-edge': entry.room === 'mirror-room' ? 'var(--tape)' : 'var(--spotlight)' } as CSSProperties}>
      <p className="tabular text-[.88rem] font-semibold text-muted">{formatTime(entry.start)}–{formatTime(entry.end)}</p>
      <p className="mt-0.5 flex items-center gap-1.5"><StyleIcon style={entry.style} className="h-6 w-6 flex-none lg:h-5 lg:w-5 xl:h-6 xl:w-6" /><span className="display min-w-0 text-[1.15rem] leading-tight lg:text-[.92rem] xl:text-[1rem]">{style.name}</span></p>
      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1"><LevelChip level={entry.level} /></p>
      <p className="mt-1.5 text-[.84rem] text-muted">{room.short} · {teacherById(entry.teacher)!.name}</p>
      <AvailabilityMark availability={entry.availability} className="mt-1" />
      <p className="mt-1 font-mono text-[.66rem] text-muted/75">{entry.id}</p>
    </li>
  );
}

function ChipRow({ label, value, options, onChoose }: {
  label: string; value: string; onChoose: (id: string) => void;
  options: { id: string; label: string; icon?: StyleId; swatch?: string | null }[];
}) {
  const chip = (active: boolean) => `inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-1.5 text-[.88rem] font-semibold transition-colors ${active ? 'border-primary bg-primary text-on-primary' : 'border-line bg-surface text-ink hover:border-primary-ink/50 hover:bg-maple/50'}`;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="label-caps w-14 text-muted">{label}</span>
      <button type="button" aria-pressed={!value} onClick={() => onChoose('')} className={chip(!value)}>All</button>
      {options.map((option) => (
        <button key={option.id} type="button" aria-pressed={value === option.id} onClick={() => onChoose(value === option.id ? '' : option.id)}
          className={chip(value === option.id)}>
          {option.icon ? <StyleIcon style={option.icon} className="h-5 w-5" /> : null}
          {option.swatch !== undefined ? <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full ring-1 ring-black/20" style={{ background: option.swatch ?? 'repeating-linear-gradient(45deg,#F4C9D3 0 3px,#C9B2E8 3px 6px)' }} /> : null}
          {option.label}
        </button>
      ))}
    </div>
  );
}
