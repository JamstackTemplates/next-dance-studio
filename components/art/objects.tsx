// Studio objects: leotards, the hanger rail, hair guide and the shoe-cubby wood.
import { levels } from '../../content/classes';

/** A small leotard on a hanger; `hex` null draws a striped "own choice" leotard. */
export function Leotard({ hex, className = '' }: { hex: string | null; className?: string }) {
  const id = `stripe-${(hex ?? 'own').replace('#', '')}`;
  return (
    <svg viewBox="0 0 120 170" className={className} aria-hidden="true" focusable="false">
      {hex === null ? (
        <defs>
          <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <rect width="14" height="14" fill="#F4C9D3" /><rect width="7" height="14" fill="#C9B2E8" />
          </pattern>
        </defs>
      ) : null}
      <path d="M52 16 a8 8 0 1 1 12 7 c-3 2-4 4-4 7v4" fill="none" className="stroke-muted" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 34 L14 56 h92 Z" fill="none" className="stroke-muted" strokeWidth="3" strokeLinejoin="round" />
      <path d="M36 56 C40 66 46 70 60 70 C74 70 80 66 84 56 L92 60 C88 90 84 104 82 118 L98 156 C86 162 74 152 60 140 C46 152 34 162 22 156 L38 118 C36 104 32 90 28 60 Z"
        fill={hex === null ? `url(#${id})` : hex} className="stroke-ink" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M38 118 C48 124 72 124 82 118" fill="none" className="stroke-ink" strokeOpacity=".4" strokeWidth="2" />
    </svg>
  );
}

/** Garment rail with the five level leotards, shoes on the shelf below (Uniform and Home). */
export function HangerRail({ className = '' }: { className?: string }) {
  const colours = levels.map(level => level.leotard.hex);
  return (
    <svg viewBox="0 0 640 400" className={className} role="img" aria-labelledby="hanger-rail-title">
      <title id="hanger-rail-title">A garment rail with leotards in pink, lilac, violet, plum and a striped own-choice leotard, with tap shoes and sneakers on the shelf.</title>
      <rect x="40" y="30" width="10" height="330" rx="4" className="fill-muted" />
      <rect x="590" y="30" width="10" height="330" rx="4" className="fill-muted" />
      <rect x="30" y="34" width="580" height="10" rx="5" className="fill-ink" />
      {colours.map((hex, i) => {
        const x = 70 + i * 106;
        return (
          <g key={i} transform={`translate(${x} 22) rotate(${[-4, 3, -2, 4, -3][i]} 50 20)`}>
            <path d="M48 12 a7 7 0 1 1 10 6 c-2 1.5-3 3-3 6v4" fill="none" className="stroke-muted" strokeWidth="3" strokeLinecap="round" />
            <path d="M55 28 L14 50 h82 Z" fill="none" className="stroke-muted" strokeWidth="3" strokeLinejoin="round" />
            <path d="M34 50 C38 60 44 63 55 63 C66 63 72 60 76 50 L84 54 C80 82 76 96 74 108 L88 144 C77 150 66 140 55 130 C44 140 33 150 22 144 L36 108 C34 96 30 82 26 54 Z"
              fill={hex ?? 'url(#rail-stripe)'} className="stroke-ink" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="40" y="168" width="32" height="20" rx="3" className="fill-surface stroke-ink" strokeWidth="2" transform="rotate(4 56 178)" />
          </g>
        );
      })}
      <defs>
        <pattern id="rail-stripe" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="12" height="12" fill="#F4C9D3" /><rect width="6" height="12" fill="#C9B2E8" />
        </pattern>
      </defs>
      <rect x="44" y="300" width="552" height="12" rx="3" fill="#B9804A" />
      {/* tap shoes */}
      <path d="M90 296 C90 284 100 280 110 280 H124 C130 270 142 272 146 280 L148 290 C148 294 146 296 142 296 Z" className="fill-ink" />
      <path d="M150 296 C150 284 160 280 170 280 H184 C190 270 202 272 206 280 L208 290 C208 294 206 296 202 296 Z" className="fill-ink" />
      <path d="M92 300 h20 M128 300 h16 M152 300 h20 M188 300 h16" className="stroke-spotlight" strokeWidth="3" />
      {/* ballet slippers */}
      <path d="M268 296 C268 286 280 282 294 284 C306 286 312 292 310 296 Z" className="fill-tulle stroke-ink" strokeWidth="2" />
      <path d="M318 296 C318 286 330 282 344 284 C356 286 362 292 360 296 Z" className="fill-tulle stroke-ink" strokeWidth="2" />
      {/* sneakers */}
      <path d="M430 260 H446 L448 276 L468 282 C474 284 476 290 474 296 H426 C424 284 426 272 430 260 Z" className="fill-tape stroke-ink" strokeWidth="2" />
      <path d="M490 260 H506 L508 276 L528 282 C534 284 536 290 534 296 H486 C484 284 486 272 490 260 Z" className="fill-tape stroke-ink" strokeWidth="2" />
      <ellipse cx="320" cy="372" rx="290" ry="10" className="fill-line" />
    </svg>
  );
}

/** Hair guide: classical bun, low ponytail and tied back, seen from behind. */
export function HairGuide({ which, className = '' }: { which: 'bun' | 'ponytail' | 'tied'; className?: string }) {
  return (
    <svg viewBox="0 0 160 170" className={className} aria-hidden="true" focusable="false">
      <path d="M20 170 C24 132 50 118 80 118 C110 118 136 132 140 170 Z" className="fill-primary" />
      <rect x="68" y="100" width="24" height="26" rx="10" fill="#E2C3A8" />
      <ellipse cx="80" cy="66" rx="40" ry="46" className="fill-ink" />
      <path d="M48 44 C60 34 100 34 112 44 M44 66 C60 56 100 56 116 66" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="3" />
      {which === 'bun' ? <>
        <circle cx="80" cy="62" r="20" className="fill-ink stroke-spotlight" strokeWidth="2" strokeDasharray="2 4" />
        <path d="M66 52 l-8 -8 M94 52 l8 -8" className="stroke-spotlight" strokeWidth="3" strokeLinecap="round" />
      </> : null}
      {which === 'ponytail' ? <>
        <rect x="72" y="96" width="16" height="8" rx="3" className="fill-tulle" />
        <path d="M80 102 C74 122 72 138 80 150 C88 138 86 122 80 102 Z" className="fill-ink" />
      </> : null}
      {which === 'tied' ? <>
        <path d="M60 28 C70 20 90 20 100 28" fill="none" className="stroke-tape" strokeWidth="6" strokeLinecap="round" />
        <rect x="72" y="84" width="16" height="8" rx="3" className="fill-tape" />
      </> : null}
    </svg>
  );
}
