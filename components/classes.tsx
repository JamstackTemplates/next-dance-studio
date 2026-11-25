// Classes page sections: the style programme, levels on the mirror wall, the cast list and the fee card.
import type { CSSProperties, ReactNode } from 'react';
import { ageRange, feeFor, fees, levels, styles, teachers } from '../content/classes';
import { StyleIcon } from './art/icons';
import { AtelierBackdrop, CornerFiligree, PlaybillRule, StageArchDivider } from './art/ornaments';
import { RibbonDivider } from './art/stage';
import { LevelChip } from './chips';
import { CountStrip } from './count-strip';
import { SiteLink } from './site-link';

type Slot = { children: ReactNode };

function Heading({ id, children, className = '' }: Slot & { id: string; className?: string }) {
  return <h2 id={id} className={`text-[clamp(2.2rem,4.6vw,3.6rem)] [&_em]:not-italic [&_em]:text-primary-ink ${className}`}>{children}</h2>;
}
function Lede({ children, className = '' }: Slot & { className?: string }) {
  return <p className={`mt-4 max-w-(--measure) text-[1.12rem] text-muted ${className}`}>{children}</p>;
}

/* ---------- Style programme: a printed running order ---------- */

function ProgrammeSection({ children }: Slot) {
  return (
    <section aria-labelledby="programme-heading" className="floor-maple relative isolate overflow-hidden py-[clamp(3rem,7vw,5.5rem)]">
      <AtelierBackdrop variant="ribbons" tone="light" />
      <div className="wrap">
        <div className="mx-auto max-w-3xl text-center">{children}</div>
        <PlaybillRule className="mt-10" />
        <ol>
          {styles.map((style, index) => (
            <li key={style.id} id={style.id} className="scroll-mt-6">
              <article aria-labelledby={`${style.id}-name`} className="reveal grid gap-8 py-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
                <div className={`relative flex items-center gap-6 ${index % 2 ? 'lg:order-2 lg:justify-end' : ''}`}>
                  <span aria-hidden="true" className="display text-[clamp(5.5rem,13vw,10rem)] leading-[.8] text-primary-ink/90 tabular">{String(index + 1).padStart(2, '0')}</span>
                  <span className="relative grid aspect-square w-[clamp(7rem,14vw,11rem)] place-items-center rounded-full bg-stage text-stage-ink shadow-[inset_0_-14px_30px_rgba(242,169,59,.35)]">
                    <span aria-hidden="true" className="absolute inset-3 rounded-full bg-[radial-gradient(circle_at_50%_35%,color-mix(in_srgb,var(--spotlight)_45%,transparent),transparent_65%)]" />
                    <StyleIcon style={style.id} className="relative h-[58%] w-[58%]" />
                  </span>
                </div>
                <div>
                  <p className="label-caps text-muted">{style.tagline}</p>
                  <h3 id={`${style.id}-name`} className="mt-2 text-[clamp(2.4rem,5vw,3.8rem)]">{style.name}</h3>
                  <p className="mt-3 max-w-[38rem] text-[1.08rem]">{style.description}</p>
                  <dl className="mt-4 grid gap-1 text-[.98rem]">
                    <div className="flex flex-wrap gap-x-2"><dt className="font-semibold">Suits:</dt><dd className="m-0 text-muted">{style.suits}</dd></div>
                    <div className="flex flex-wrap gap-x-2"><dt className="font-semibold">Signature step:</dt><dd className="m-0 italic">{style.signatureStep}</dd></div>
                  </dl>
                  <p className="mt-4 flex flex-wrap items-center gap-2"><span className="sr-only">Levels:</span>{style.levels.map(level => <LevelChip key={level} level={level} />)}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <CountStrip bpm={style.bpm} size="md" className="w-full max-w-[26rem]" label={`${style.name} count: 5, 6, 7, 8, 1, 2, 3, 4 at ${style.bpm} beats per minute`} />
                    <span className="label-caps text-muted tabular">{style.bpm} bpm</span>
                  </div>
                  <p className="mt-4"><SiteLink className="text-link" href={`/timetable/?style=${style.id}`}>{style.name} on the timetable</SiteLink></p>
                </div>
              </article>
              <hr className="programme-rule" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export const StyleProgramme = Object.assign(ProgrammeSection, {
  Heading: ({ children }: Slot) => <Heading id="programme-heading">{children}</Heading>,
  Introduction: ({ children }: Slot) => <Lede className="mx-auto">{children}</Lede>,
});

/* ---------- Levels on the mirror wall ---------- */

function MirrorSection({ children }: Slot) {
  return (
    <section aria-labelledby="levels-heading" className="mirror-wall py-[clamp(3rem,7vw,5.5rem)]">
      <div className="wrap grid gap-10">
        <div className="max-w-3xl">{children}</div>
        <ol className="reveal flex flex-col gap-3 md:min-h-[22rem] md:flex-row md:items-end md:gap-2">
          {levels.map((level, index) => (
            <li key={level.id} className="relative flex-1 md:pb-0" style={{ '--rise': `${index * 3.6}rem` } as CSSProperties}>
              <div className="flex items-center gap-3 md:mb-(--rise) md:flex-col md:items-start md:gap-2 md:border-l-2 md:border-dashed md:border-muted/50 md:pl-3">
                <span className="tape-x" style={{ '--tape-x': level.leotard.hex ?? 'var(--tape)' } as CSSProperties} />
                <div>
                  <h3 className="text-[1.5rem]">{level.name}</h3>
                  <p className="font-semibold tabular">Ages {ageRange(level)} · {level.durations.join(' or ')} min</p>
                  <p className="mt-1 text-[.92rem] text-muted">{level.blurb}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export const LevelsExplained = Object.assign(MirrorSection, {
  Heading: ({ children }: Slot) => <Heading id="levels-heading">{children}</Heading>,
  Introduction: Lede,
});

/* ---------- Cast list ---------- */

function CastSection({ children }: Slot) {
  return (
    <section aria-labelledby="cast-heading" className="relative isolate overflow-hidden bg-surface pb-[clamp(3.5rem,7vw,5.5rem)] pt-4">
      <StageArchDivider tone="light" className="mb-[clamp(2rem,4vw,3.5rem)]" />
      <AtelierBackdrop variant="arches" tone="light" />
      <div className="wrap max-w-3xl">
        <div className="text-center">{children}</div>
        <PlaybillRule className="mt-8" />
        <ul className="reveal mt-8 grid gap-7">
          {teachers.map(teacher => (
            <li key={teacher.id}>
              <div className="flex items-baseline gap-3">
                <h3 className="text-[clamp(1.5rem,3vw,2.1rem)]">{teacher.name}</h3>
                <span aria-hidden="true" className="leader" />
                <p className="label-caps text-right text-muted">{teacher.role}</p>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-3 text-muted">
                <span className="flex gap-1">{teacher.styles.map(style => <StyleIcon key={style} style={style} className="h-7 w-7 text-ink" title={styles.find(s => s.id === style)!.name} />)}</span>
                {teacher.bio}
              </p>
            </li>
          ))}
        </ul>
        <hr className="programme-rule mt-10" />
      </div>
    </section>
  );
}
export const CastList = Object.assign(CastSection, {
  Heading: ({ children }: Slot) => <Heading id="cast-heading">{children}</Heading>,
  Introduction: ({ children }: Slot) => <Lede className="mx-auto">{children}</Lede>,
});

/* ---------- Term fees: a printed price card ---------- */

function FeesSection({ children, rows, note }: Slot & { rows: ReactNode; note: ReactNode }) {
  return (
    <section aria-labelledby="fees-heading" className="floor-maple section-hairline relative isolate overflow-hidden py-[clamp(3rem,7vw,5.5rem)]">
      <AtelierBackdrop variant="ribbons" tone="light" />
      <RibbonDivider className="-mt-[clamp(3rem,7vw,5.5rem)] mb-6" />
      <div className="wrap grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-center">
        <div>{children}</div>
        <div className="reveal paper relative rounded-2xl p-8 md:p-10">
          <CornerFiligree tone="light" />
          <p className="label-caps text-center text-muted">Per {fees.termWeeks}-week term · {fees.currency}</p>
          <dl className="mt-6 grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {fees.byLength.map(entry => (
              <div key={entry.minutes}>
                <dt className="label-caps text-muted">{entry.minutes} min</dt>
                <dd className="display m-0 mt-1 text-[clamp(2.4rem,5vw,3.4rem)] leading-none tabular">${feeFor(entry.minutes)}</dd>
              </div>
            ))}
          </dl>
          <hr className="programme-rule my-7" />
          <dl className="grid gap-2.5">{rows}</dl>
          <p className="mt-6 text-sm text-muted">{note}</p>
        </div>
      </div>
    </section>
  );
}
function FeeRow({ label, children }: Slot & { label: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="font-semibold">{label}</dt>
      <span aria-hidden="true" className="leader" />
      <dd className="m-0 text-right">{children}</dd>
    </div>
  );
}
export const TermFees = Object.assign(FeesSection, {
  Heading: ({ children }: Slot) => <Heading id="fees-heading">{children}</Heading>,
  Introduction: Lede,
  Row: FeeRow,
  dropIn: `$${fees.adultDropIn}`,
  sibling: `${fees.siblingDiscountPercent}%`,
});

/* ---------- Trial call to action: dark stage with a spotlight pool ---------- */

function TrialSection({ children }: Slot) {
  return (
    <section aria-labelledby="trial-heading" className="floor-marley on-stage relative isolate overflow-hidden py-[clamp(3.5rem,8vw,6rem)] text-center">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[52rem] max-w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--spotlight)_30%,transparent),transparent)]" />
      <div className="wrap max-w-2xl">{children}</div>
    </section>
  );
}
export const TrialCall = Object.assign(TrialSection, {
  Heading: ({ children }: Slot) => <h2 id="trial-heading" className="text-[clamp(2.2rem,5vw,3.6rem)] [&_em]:not-italic [&_em]:text-spotlight">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mt-4 text-[1.12rem] text-stage-muted">{children}</p>,
  Action: ({ children }: Slot) => <p className="mt-7"><SiteLink href="/contact/" className="button">{children}</SiteLink></p>,
});
