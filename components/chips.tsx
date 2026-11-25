import { levelById, type LevelId } from '../content/classes';
import { availabilityLabels, type Availability } from '../content/timetable';
import { HourglassIcon, StarIcon, TapeIcon } from './art/icons';

/** Level chip in its leotard colour (Adult Open is striped). */
export function LevelChip({ level, className = '' }: { level: LevelId; className?: string }) {
  const data = levelById(level)!;
  const dark = level === 'inter' || level === 'senior';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[.78rem] font-semibold tracking-wide ${dark ? 'text-white' : 'text-[#1E1530]'} ${className}`}
      style={{ background: data.leotard.hex ?? 'repeating-linear-gradient(45deg,#F4C9D3 0 6px,#C9B2E8 6px 12px)' }}>
      {data.name}
    </span>
  );
}

export function AvailabilityMark({ availability, className = '' }: { availability: Availability; className?: string }) {
  const Icon = availability === 'open' ? TapeIcon : availability === 'few-spots' ? StarIcon : HourglassIcon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[.82rem] font-semibold ${className}`}>
      <Icon className="h-4 w-4 flex-none" />
      {availabilityLabels[availability]}
    </span>
  );
}
