// Home page sections. Copy is passed in from app/page.tsx; these components own layout, art and data.
import type { CSSProperties, ReactNode } from 'react';
import { business, formatAddress } from '../content/business';
import { ageRange, levels, styles } from '../content/classes';
import { concerts } from '../content/concerts';
import { mapDirectionsUrl } from '../lib/maps';
import { asset } from '../lib/paths';
import { ArrowIcon, PinIcon, PhoneIcon, StyleIcon } from './art/icons';
import { HangerRail } from './art/objects';
import { AtelierBackdrop, CornerFiligree, SilkRibbonBorder, StageArchDivider } from './art/ornaments';
import { CallBoardToday } from './call-board-today';
import { CountStrip } from './count-strip';
import { DeskStatus } from './desk-status';
import { HoursList } from './hours-list';
import { NextShowTicket } from './next-show';
import { SiteLink } from './site-link';

type Slot = { children: ReactNode };

/* ---------- Hero: full-bleed editorial dance photography ---------- */

function HeroSection({ children }: Slot) {
  const lightSrc = asset('/images/hero-light.webp');
  const darkSrc = asset('/images/hero-dark.webp');
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-hero-bg">
      {/* Desktop full-bleed backdrop photography (theme-switched via CSS with zero flash) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <img src={lightSrc} alt="" width={1920} height={1071} fetchPriority="high"
          className="hero-media-light h-full w-full object-cover object-[74%_center]" />
        <img src={darkSrc} alt="" width={1920} height={1071} fetchPriority="high"
          className="hero-media-dark h-full w-full object-cover object-[74%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hero-bg)_0%,color-mix(in_srgb,var(--hero-bg)_88%,transparent)_30%,transparent_54%)]" />
      </div>

      <div className="wrap relative z-10 grid gap-y-5 pb-10 pt-7 lg:min-h-[min(82svh,46rem)] lg:grid-cols-[minmax(0,33rem)_1fr] lg:grid-rows-[1fr_auto_auto_auto_auto_1fr] lg:py-16">
        {children}

        {/* Mobile / tablet framed hero photograph between heading and introduction */}
        <div className="relative order-3 -mx-5 overflow-hidden sm:mx-0 sm:rounded-xl lg:hidden">
          <img src={lightSrc} alt="A ballet dancer mid-leap with a flowing golden silk ribbon above a contemporary dancer in a floor balance." width={1920} height={1071} fetchPriority="high"
            className="hero-media-light aspect-[16/10] w-full object-cover object-[74%_45%]" />
          <img src={darkSrc} alt="A ballet dancer mid-leap under a golden spotlight with a flowing silk ribbon above a contemporary dancer in a floor balance." width={1920} height={1071} fetchPriority="high"
            className="hero-media-dark aspect-[16/10] w-full object-cover object-[74%_45%]" />
        </div>
      </div>
    </section>
  );
}
function Eyebrow({ children }: Slot) {
  return <p className="eyebrow relative z-20 order-1 lg:order-none lg:col-start-1 lg:row-start-2">{children}</p>;
}
function Heading({ children }: Slot) {
  return <h1 id="hero-heading" className="relative z-20 order-2 text-[clamp(2.85rem,5.6vw,5.15rem)] leading-[.95] lg:order-none lg:col-start-1 lg:row-start-3 [&_em]:not-italic [&_em]:text-primary-ink">{children}</h1>;
}
function Introduction({ children }: Slot) {
  return <p className="relative z-20 order-4 max-w-[29rem] text-[clamp(1.06rem,1.45vw,1.22rem)] leading-relaxed text-ink/80 lg:order-none lg:col-start-1 lg:row-start-4">{children}</p>;
}
function Actions({ children }: Slot) {
  return <div className="relative z-20 order-5 flex flex-wrap items-center gap-x-7 gap-y-3 pt-1 lg:order-none lg:col-start-1 lg:row-start-5">{children}</div>;
}
function Primary({ children }: Slot) {
  return <SiteLink href="/contact/" className="button w-full sm:w-auto">{children}</SiteLink>;
}
function Secondary({ children }: Slot) {
  return <SiteLink href="/timetable/" className="text-link inline-flex items-center gap-2 text-[.98rem]">{children} <ArrowIcon className="h-4 w-4" /></SiteLink>;
}
export const Hero = Object.assign(HeroSection, { Eyebrow, Heading, Introduction, Actions, Primary, Secondary });

/* ---------- Count band (signature) ---------- */

export function CountBand({ children }: Slot) {
  return (
    <section aria-label="The count" className="section-hairline relative isolate overflow-hidden border-b border-line bg-surface/85 py-5 shadow-[0_12px_36px_-26px_rgba(20,14,31,.25)]">
      <div aria-hidden="true" className="ornament-bg pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_110%_at_50%_50%,color-mix(in_oklab,var(--spotlight)_12%,transparent),transparent_72%)]" />
      <div className="wrap grid items-center gap-4 md:grid-cols-[1fr_auto]">
        <CountStrip bpm={96} surface="none" />
        <p className="label-caps text-center text-muted md:max-w-[13rem] md:text-left">{children}</p>
      </div>
    </section>
  );
}

/* ---------- Pick your style: editorial gallery grid ---------- */

function CubbySection({ children }: Slot) {
  return (
    <section aria-labelledby="styles-heading" className="floor-maple relative isolate overflow-hidden py-[clamp(4.5rem,8.5vw,7.5rem)]">
      <AtelierBackdrop variant="ribbons" tone="light" />
      <div className="wrap grid items-center gap-12 lg:grid-cols-[7fr_5fr]">
        <div className="reveal relative rounded-2xl border border-spotlight/30 bg-surface/60 p-1.5 shadow-[0_4px_14px_-6px_rgba(20,14,31,.12),0_32px_68px_-34px_rgba(20,14,31,.38)] backdrop-blur-[2px]">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {styles.map((style, index) => (
              <li key={style.id} className="bg-surface">
                <SiteLink href={`/classes/#${style.id}`} className="group relative flex h-full flex-col justify-between p-5 text-ink no-underline transition-colors duration-200 hover:bg-maple/55 hover:no-underline sm:p-6">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-0 h-[2px] origin-center scale-x-0 bg-[linear-gradient(90deg,transparent,var(--spotlight),transparent)] transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between gap-2">
                    <span className="display text-lg text-muted/45 tabular transition-colors group-hover:text-spotlight-ink">{String(index + 1).padStart(2, '0')}</span>
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-line bg-bg/85 text-primary-ink shadow-[0_2px_8px_-4px_rgba(20,14,31,.2)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-spotlight/70 group-hover:shadow-[0_6px_16px_-6px_color-mix(in_oklab,var(--spotlight)_55%,transparent)]">
                      <StyleIcon style={style.id} className="h-7 w-7" />
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="display block text-[1.35rem] leading-tight text-ink transition-colors group-hover:text-primary-ink">{style.name}</span>
                    <span className="mt-1.5 hidden text-[.86rem] leading-snug text-muted sm:block">{style.tagline}</span>
                  </div>
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:pl-6">{children}</div>
      </div>
    </section>
  );
}
function SectionHeading({ id, children, className = '' }: Slot & { id: string; className?: string }) {
  return <h2 id={id} className={`text-[clamp(2.3rem,4.6vw,3.7rem)] leading-[.98] [&_em]:not-italic [&_em]:text-primary-ink ${className}`}>{children}</h2>;
}
function Lede({ children, className = '' }: Slot & { className?: string }) {
  return <p className={`mt-4 max-w-(--measure) text-[1.1rem] text-muted ${className}`}>{children}</p>;
}
export const StyleCubbies = Object.assign(CubbySection, {
  Heading: ({ children }: Slot) => <SectionHeading id="styles-heading">{children}</SectionHeading>,
  Introduction: Lede,
  Link: ({ children }: Slot) => <p className="mt-7"><SiteLink href="/classes/" className="text-link inline-flex items-center gap-2">{children} <ArrowIcon className="h-4 w-4" /></SiteLink></p>,
});

/* ---------- Grow through the levels: atelier cards beneath a brass barre ---------- */

function LevelsSection({ children }: Slot) {
  return (
    <section aria-labelledby="levels-heading" className="relative isolate overflow-hidden bg-surface pb-[clamp(4.5rem,8vw,7rem)] pt-4">
      <StageArchDivider tone="light" className="mb-[clamp(2.5rem,5vw,4.5rem)]" />
      <AtelierBackdrop variant="arches" tone="light" />
      <div className="wrap">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr] md:items-end">{children}</div>
        <div aria-hidden="true" className="relative mt-12 hidden items-center lg:flex">
          <span className="h-2.5 w-2.5 rotate-45 border border-spotlight/80 bg-spotlight/40" />
          <span className="h-[2px] flex-1 bg-[linear-gradient(90deg,var(--spotlight),color-mix(in_oklab,var(--spotlight)_85%,white)_50%,var(--spotlight))] opacity-65" />
          <span className="h-2.5 w-2.5 rotate-45 border border-spotlight/80 bg-spotlight/40" />
        </div>
        <ol className="reveal mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-0 lg:grid-cols-5 lg:gap-5">
          {levels.map((level, index) => <LevelTag key={level.id} index={index} level={level} />)}
        </ol>
      </div>
    </section>
  );
}
function LevelTag({ level, index }: { level: (typeof levels)[number]; index: number }) {
  const fill = level.leotard.hex ?? 'repeating-linear-gradient(45deg,#F4C9D3 0 6px,#C9B2E8 6px 12px)';
  return (
    <li className="relative flex flex-col items-stretch">
      <span aria-hidden="true" className="mx-auto hidden h-7 w-px bg-[linear-gradient(180deg,var(--spotlight),transparent)] opacity-70 lg:block" />
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-line bg-bg/85 p-5 text-left shadow-[0_2px_10px_-6px_rgba(20,14,31,.12),0_18px_36px_-26px_rgba(20,14,31,.25)] transition-all duration-200 hover:-translate-y-1 hover:border-spotlight/55 hover:shadow-[0_22px_40px_-24px_rgba(20,14,31,.35)]">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2" style={{ background: fill }} />
        <div className="mt-1 flex items-baseline justify-between gap-2">
          <span aria-hidden="true" className="display text-3xl leading-none text-line tabular">0{index + 1}</span>
          <span className="h-3.5 w-3.5 rounded-full ring-2 ring-surface shadow-sm" style={{ background: fill }} aria-hidden="true" />
        </div>
        <div className="mt-5">
          <h3 className="text-[1.4rem] text-ink">{level.name}</h3>
          <p className="mt-1 text-sm font-semibold text-primary-ink">Ages {ageRange(level)}</p>
          <p className="label-caps mt-2.5 text-[.68rem] text-muted">{level.durations.join(' / ')} min</p>
        </div>
      </div>
    </li>
  );
}
export const LevelTags = Object.assign(LevelsSection, {
  Heading: ({ children }: Slot) => <SectionHeading id="levels-heading">{children}</SectionHeading>,
  Introduction: ({ children }: Slot) => <Lede className="md:mt-0">{children}</Lede>,
});

/* ---------- On the call board: velvet stage board ---------- */

function CallBoardSection({ children }: Slot) {
  return (
    <section aria-labelledby="callboard-heading" className="floor-marley on-stage stage-hairline relative isolate overflow-hidden py-[clamp(4.5rem,8.5vw,7.5rem)]">
      <AtelierBackdrop variant="spotlight" tone="dark" />
      <div className="wrap grid gap-12 lg:grid-cols-[4fr_8fr] lg:items-center">
        <div>{children}</div>
        <div className="reveal relative rounded-2xl border border-spotlight/25 bg-white/[0.045] p-6 shadow-[0_0_0_1px_inset_rgba(255,255,255,.06),0_32px_68px_-24px_rgba(0,0,0,.8)] backdrop-blur-sm sm:p-8">
          <CornerFiligree tone="dark" />
          <CallBoardToday />
        </div>
      </div>
    </section>
  );
}
export const CallBoardPreview = Object.assign(CallBoardSection, {
  Heading: ({ children }: Slot) => <h2 id="callboard-heading" className="text-[clamp(2.3rem,4.6vw,3.7rem)] [&_em]:not-italic [&_em]:text-spotlight">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mt-4 text-[1.1rem] text-stage-muted">{children}</p>,
  Link: ({ children }: Slot) => <p className="mt-7"><SiteLink href="/timetable/" className="button">{children}</SiteLink></p>,
});

/* ---------- Next on stage: velvet spotlight band with a ticket stub ---------- */

function NextShowSection({ children, action }: Slot & { action: ReactNode }) {
  return (
    <section aria-labelledby="next-show-heading" className="curtain-band relative isolate overflow-hidden pb-[clamp(4.5rem,8.5vw,7.5rem)] pt-4">
      <SilkRibbonBorder tone="dark" className="mb-[clamp(2.5rem,5vw,4.5rem)]" />
      <AtelierBackdrop variant="ribbons" tone="dark" />
      <div className="wrap grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-center">
        <div>{children}</div>
        <div className="reveal relative lg:rotate-[-1deg]">
          <div aria-hidden="true" className="ornament-bg pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(245,180,76,.18),transparent_72%)]" />
          <NextShowTicket concerts={concerts} action={action} />
        </div>
      </div>
    </section>
  );
}
export const NextShow = Object.assign(NextShowSection, {
  Heading: ({ children }: Slot) => <h2 id="next-show-heading" className="text-[clamp(2.3rem,4.6vw,3.7rem)] [&_em]:not-italic [&_em]:text-spotlight">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mt-4 text-[1.1rem] text-stage-muted">{children}</p>,
  Link: ({ children }: Slot) => <p className="mt-7"><SiteLink href="/concerts/" className="text-link on-stage inline-flex items-center gap-2 !text-spotlight">{children} <ArrowIcon className="h-4 w-4" /></SiteLink></p>,
});
export function TicketAction({ children }: Slot) {
  return <SiteLink href="/contact/" className="button">{children}</SiteLink>;
}

/* ---------- What to wear: hanger rail ---------- */

function UniformSection({ children }: Slot) {
  return (
    <section aria-labelledby="uniform-heading" className="floor-maple section-hairline relative isolate overflow-hidden py-[clamp(4.5rem,7.5vw,6.5rem)]">
      <AtelierBackdrop variant="arches" tone="light" />
      <div className="wrap max-w-5xl">
        <div className="paper relative grid items-center gap-10 rounded-2xl p-7 md:grid-cols-[1.1fr_1fr] md:p-12">
          <CornerFiligree tone="light" />
          <HangerRail className="reveal h-auto w-full" />
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
export const UniformTeaser = Object.assign(UniformSection, {
  Heading: ({ children }: Slot) => <SectionHeading id="uniform-heading" className="!text-[clamp(2rem,4vw,3rem)]">{children}</SectionHeading>,
  Introduction: Lede,
  Link: ({ children }: Slot) => <p className="mt-6"><SiteLink href="/uniform/" className="text-link inline-flex items-center gap-2">{children} <ArrowIcon className="h-4 w-4" /></SiteLink></p>,
});

/* ---------- Find the stage door ---------- */

function VisitSection({ children }: Slot) {
  return (
    <section aria-labelledby="visit-heading" className="relative isolate overflow-hidden bg-bg pb-[clamp(4.5rem,7.5vw,6.5rem)] pt-4">
      <StageArchDivider tone="light" className="mb-[clamp(2.5rem,5vw,4rem)]" />
      <AtelierBackdrop variant="ribbons" tone="light" />
      <div className="wrap grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          {children}
          <address className="mt-7 grid gap-2.5 not-italic">
            <span className="flex items-start gap-2.5 text-lg font-semibold"><PinIcon className="mt-0.5 h-5 w-5 flex-none text-primary-ink" />{formatAddress()}</span>
            <span className="text-muted">{business.locationLine} {business.parking}</span>
            <span className="mt-1 flex flex-wrap gap-x-6 gap-y-2">
              <a className="text-link" href={mapDirectionsUrl(formatAddress())}>Get directions</a>
              <a className="text-link inline-flex items-center gap-1.5" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}><PhoneIcon className="h-4 w-4" />{business.phone}</a>
              <a className="text-link break-all" href={`mailto:${business.email}`}>{business.email}</a>
            </span>
          </address>
        </div>
        <div className="paper relative rounded-2xl p-8 md:p-10">
          <CornerFiligree tone="light" />
          <DeskStatus className="text-primary-ink" />
          <HoursList className="mt-5" />
          <p className="mt-5 text-sm text-muted">Classes run Monday to Saturday. {business.termLine}.</p>
          <p className="mt-7"><SiteLink href="/contact/" className="button">Ask about a free trial class</SiteLink></p>
        </div>
      </div>
    </section>
  );
}
export const Visit = Object.assign(VisitSection, {
  Heading: ({ children }: Slot) => <SectionHeading id="visit-heading">{children}</SectionHeading>,
  Introduction: Lede,
});
