// Style icons (64×64) and small UI icons (24×24), drawn in the shared 2.5px rounded line style.
import type { StyleId } from '../../content/classes';

type IconProps = { className?: string; title?: string };

function Svg({ className = '', title, viewBox, children }: IconProps & { viewBox: string; children: React.ReactNode }) {
  return (
    <svg viewBox={viewBox} className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: false })}>
      {children}
    </svg>
  );
}

const STYLE_ART: Record<StyleId, React.ReactNode> = {
  // Pointe shoe with crossed ribbons.
  ballet: <>
    <path d="M14 40 C14 30 24 26 34 27 C44 28 52 33 54 40 C55 45 52 48 47 48 H22 C17 48 14 45 14 40 Z" className="fill-tulle" />
    <path d="M44 30 C47 34 50 38 54 40" />
    <path d="M54 40 L57 41 C58 44 56 47 53 47" className="fill-tulle" />
    <path d="M26 28 C24 18 30 12 36 10 M30 27 C34 18 42 14 48 16" className="stroke-spotlight" />
    <path d="M36 10 C40 14 38 20 34 22 M48 16 C46 22 40 22 38 20" className="stroke-spotlight" />
    <path d="M18 48 H50" />
  </>,
  // Bare foot arched over a floor spiral.
  contemporary: <>
    <path d="M10 54 C22 46 42 46 54 54" className="stroke-tape" />
    <path d="M32 52 C26 52 24 48 28 46 C34 44 36 50 32 50" className="stroke-tape" />
    <path d="M18 38 C22 30 30 16 40 12 C44 10 46 14 44 18 C40 26 40 32 46 38 C50 42 48 46 42 44 C34 42 26 42 20 44 C16 45 15 41 18 38 Z" className="fill-tulle" />
    <path d="M44 38 h4 M46 41 h3" />
  </>,
  // Jazz shoe mid-kick with spark lines.
  jazz: <>
    <path d="M12 44 L34 22 C38 18 44 18 48 22 L54 28 C57 31 56 35 52 36 L28 48 C22 51 14 50 12 44 Z" className="fill-spotlight" />
    <path d="M34 22 L42 32 M22 34 L30 42" />
    <path d="M50 10 L52 4 M56 16 L62 13 M44 8 L42 2" className="stroke-primary-ink" />
  </>,
  // Tap shoe with sound-burst plates.
  tap: <>
    <path d="M10 42 C10 34 18 30 26 30 L36 30 C42 22 50 24 54 30 L56 40 C56 44 54 46 50 46 H14 C11 46 10 44 10 42 Z" className="fill-ink" stroke="currentColor" />
    <path d="M12 50 H28 M42 50 H54" strokeWidth="4" className="stroke-spotlight" />
    <path d="M6 58 L10 54 M34 60 V55 M58 58 L54 54" className="stroke-spotlight" />
    <path d="M30 34 L40 34" stroke="#fff" />
  </>,
  // High-top sneaker with motion lines.
  'hip-hop': <>
    <path d="M18 18 H32 L34 32 L50 38 C56 40 58 44 56 48 H14 C12 40 14 28 18 18 Z" className="fill-tape" />
    <path d="M14 48 H56 V52 H14 Z" fill="#fff" />
    <path d="M22 24 L30 22 M22 30 L32 28 M24 36 L36 34" />
    <path d="M2 30 H9 M4 38 H10 M2 46 H8" className="stroke-spotlight" />
  </>,
  // Top hat and cane.
  'musical-theatre': <>
    <path d="M20 14 H42 V38 H20 Z" className="fill-ink" />
    <path d="M12 40 C20 36 42 36 50 40" strokeWidth="3.5" />
    <path d="M20 32 H42" className="stroke-spotlight" strokeWidth="4" />
    <path d="M50 60 L50 22 C50 16 58 16 58 22" className="stroke-spotlight" strokeWidth="3.5" />
  </>,
};

export function StyleIcon({ style, className = 'h-12 w-12', title }: IconProps & { style: StyleId }) {
  return <Svg viewBox="0 0 64 64" className={className} title={title}>{STYLE_ART[style]}</Svg>;
}

export function ClockIcon(p: IconProps) {
  return <Svg viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>;
}
export function PinIcon(p: IconProps) {
  return <Svg viewBox="0 0 24 24" {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></Svg>;
}
export function PhoneIcon(p: IconProps) {
  return <Svg viewBox="0 0 24 24" {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></Svg>;
}
export function EnvelopeIcon(p: IconProps) {
  return <Svg viewBox="0 0 24 24" {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></Svg>;
}
export function TicketIcon(p: IconProps) {
  return <Svg viewBox="0 0 24 24" {...p}><path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4Z" /><path d="M15 7v10" strokeDasharray="1.5 2.5" /></Svg>;
}
export function HangerIcon(p: IconProps) {
  return <Svg viewBox="0 0 24 24" {...p}><path d="M10 6a2 2 0 1 1 3 1.7c-.6.4-1 .9-1 1.6V10l9 6.5a1 1 0 0 1-.6 1.8H3.6a1 1 0 0 1-.6-1.8L12 10" /></Svg>;
}
/** Availability: few spots. */
export function StarIcon(p: IconProps) {
  return <Svg viewBox="0 0 24 24" {...p}><path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7Z" className="fill-spotlight" /></Svg>;
}
/** Availability: waitlist. */
export function HourglassIcon(p: IconProps) {
  return <Svg viewBox="0 0 24 24" {...p}><path d="M6 3h12M6 21h12M7 3c0 5 10 6 10 9s-10 4-10 9M17 3c0 5-10 6-10 9s10 4 10 9" /><path d="M9 19h6l-3-3Z" className="fill-tulle" /></Svg>;
}
/** Availability: open (a spike-tape mark). */
export function TapeIcon(p: IconProps) {
  return <Svg viewBox="0 0 24 24" {...p}><path d="M5 5l14 14M19 5 5 19" strokeWidth="4.5" className="stroke-tape" strokeLinecap="butt" /></Svg>;
}
export function ArrowIcon(p: IconProps) {
  return <Svg viewBox="0 0 24 24" {...p}><path d="M4 12h15M13 6l6 6-6 6" /></Svg>;
}
export function PulseMark(p: IconProps) {
  return <Svg viewBox="0 0 48 16" {...p}><path d="M1 8h12l3-6 4 12 4-10 3 4h20" /></Svg>;
}
