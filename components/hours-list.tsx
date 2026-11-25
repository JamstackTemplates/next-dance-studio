import { business } from '../content/business';
import { formatTime } from '../content/timetable';
import type { OpeningHours } from '../lib/hours';

/** Groups consecutive days with identical hours: "Monday–Friday 3:30 pm–9:00 pm". */
export function groupHours(hours: readonly OpeningHours[]) {
  const groups: { days: string; time: string }[] = [];
  let start = 0;
  for (let i = 1; i <= hours.length; i++) {
    const a = hours[start], b = hours[i];
    if (b && b.opens === a.opens && b.closes === a.closes) continue;
    const last = hours[i - 1];
    groups.push({
      days: start === i - 1 ? a.day : `${a.day}–${last.day}`,
      time: a.opens && a.closes ? `${formatTime(a.opens)}–${formatTime(a.closes)}` : 'Closed',
    });
    start = i;
  }
  return groups;
}

export function HoursList({ className = '' }: { className?: string }) {
  return (
    <dl className={`grid gap-1.5 tabular ${className}`}>
      {groupHours(business.hours).map(group => (
        <div key={group.days} className="flex items-baseline gap-3">
          <dt className="font-semibold">{group.days}</dt>
          <span aria-hidden="true" className="leader" />
          <dd className="m-0">{group.time}</dd>
        </div>
      ))}
    </dl>
  );
}
