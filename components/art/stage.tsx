// Stage artwork: shared drawing style is flat token fills, 2.5px rounded ink lines, halftone dots in
// curtain folds and spotlight cones, amber ribbon motion lines and teal spike-tape crosses.
// Fills come from CSS tokens so every piece keeps its character in light and dark modes.

const SKIN = '#F6E3D2';
const SKIN_SHADE = '#E2C3A8';
const LEOTARD = '#C9B2E8';
const TIGHTS = '#F4C9D3';

/** Shared patterns and gradients, rendered once in the layout and referenced by url(#…). */
export function ArtDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <pattern id="pp-dots-amber" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.4" className="fill-spotlight" />
        </pattern>
        <pattern id="pp-dots-deep" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.3" className="fill-curtain-deep" />
        </pattern>
        <pattern id="pp-dots-light" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="1.1" fill="#ffffff" fillOpacity=".35" />
        </pattern>
        <pattern id="pp-bricks" width="40" height="20" patternUnits="userSpaceOnUse">
          <rect width="40" height="20" className="fill-proscenium" />
          <path d="M0 .5H40M0 10.5H40M20 0V10M0 10V20M40 10V20" className="stroke-curtain-deep" strokeWidth="1.5" />
        </pattern>
        <linearGradient id="pp-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--spotlight)', stopOpacity: .55 }} />
          <stop offset="1" style={{ stopColor: 'var(--spotlight)', stopOpacity: .06 }} />
        </linearGradient>
        <radialGradient id="pp-glow">
          <stop offset="0" style={{ stopColor: 'var(--spotlight)', stopOpacity: .9 }} />
          <stop offset="1" style={{ stopColor: 'var(--spotlight)', stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id="pp-backlight" cx=".5" cy=".55" r=".6">
          <stop offset="0" style={{ stopColor: 'var(--curtain)', stopOpacity: .55 }} />
          <stop offset="1" style={{ stopColor: 'var(--stage)', stopOpacity: 0 }} />
        </radialGradient>
      </defs>
    </svg>
  );
}

function scallops(x0: number, x1: number, y: number, count: number, depth: number) {
  const w = (x1 - x0) / count;
  let d = '';
  for (let i = 0; i < count; i++) d += ` Q${x0 + w * i + w / 2} ${y + depth} ${x0 + w * (i + 1)} ${y}`;
  return d;
}

function TapeCross({ x, y, size = 16, className = 'fill-tape', rotate = 0 }: { x: number; y: number; size?: number; className?: string; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(1 .45)`} className={className}>
      <rect x={-size} y={-3.5} width={size * 2} height={7} rx="1" transform="rotate(45)" />
      <rect x={-size} y={-3.5} width={size * 2} height={7} rx="1" transform="rotate(-45)" />
    </g>
  );
}

/** Leaping contemporary dancer in a split jeté, trailing an amber ribbon off to the left. */
function Leaper() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path className="ribbon-draw stroke-spotlight" strokeWidth="7"
        d="M330 250 C280 238 252 196 190 213 C120 232 122 300 58 290 C-22 276 -60 208 -140 228 C-205 244 -232 292 -300 276" />
      <path className="ribbon-draw" stroke={TIGHTS} strokeWidth="2.5" strokeOpacity=".8"
        d="M330 256 C284 250 256 214 196 228 C134 244 128 316 60 306 C-12 296 -54 232 -128 248" />
      {/* back leg */}
      <path d="M392 332 L325 330" stroke={TIGHTS} strokeWidth="21" />
      <path d="M325 330 L258 316" stroke={TIGHTS} strokeWidth="14" />
      <path d="M258 316 L236 308" stroke={TIGHTS} strokeWidth="8" />
      {/* front leg */}
      <path d="M400 330 L470 318" stroke={TIGHTS} strokeWidth="21" />
      <path d="M470 318 L540 306" stroke={TIGHTS} strokeWidth="14" />
      <path d="M540 306 L563 300" stroke={TIGHTS} strokeWidth="8" />
      {/* skirt */}
      <path d="M372 322 C352 330 330 346 312 366 C344 358 372 354 398 346 C412 352 428 350 438 340 C424 330 404 322 372 322 Z" fill={LEOTARD} fillOpacity=".85" stroke="none" />
      {/* torso */}
      <path d="M396 330 L408 268" stroke={LEOTARD} strokeWidth="31" />
      {/* arms */}
      <path d="M410 272 L448 243 L484 220" stroke={SKIN} strokeWidth="9" />
      <path d="M404 274 L366 258 L330 250" stroke={SKIN} strokeWidth="9" />
      {/* head */}
      <circle cx="419" cy="240" r="15" fill={SKIN} stroke="none" />
      <circle cx="408" cy="229" r="7.5" fill={SKIN_SHADE} stroke="none" />
    </g>
  );
}

/** Hip-hop dancer in a one-hand freeze on the stage floor. */
function Freeze() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M660 478 L700 440 L690 404" className="stroke-spotlight" strokeWidth="18" />
      <path d="M660 478 L706 490 L744 470" className="stroke-spotlight" strokeWidth="18" />
      <rect x="678" y="392" width="24" height="14" rx="5" fill="#ffffff" transform="rotate(-80 690 399)" />
      <rect x="738" y="462" width="24" height="14" rx="5" fill="#ffffff" transform="rotate(-25 750 469)" />
      <path d="M606 500 L660 478" className="stroke-tape" strokeWidth="30" />
      <path d="M598 562 L600 530 L606 500" stroke={SKIN} strokeWidth="11" />
      <path d="M614 506 L640 526 L630 548" stroke={SKIN} strokeWidth="9" />
      <circle cx="589" cy="487" r="14" fill={SKIN} />
      <path d="M575 482 C578 468 600 466 604 480 L610 482" className="stroke-tape fill-tape" strokeWidth="4" />
      <path d="M720 372 q14 -10 26 0 M736 392 q14 -8 24 2 M764 440 q12 -4 18 6" className="stroke-spotlight" strokeWidth="3" />
    </g>
  );
}

/** Hero scene: a proscenium with curtains drawn back, crossing spotlights and two dancers. */
export function OpeningNight({ className = '' }: { className?: string }) {
  const planks = Array.from({ length: 15 }, (_, i) => 10 + i * 56);
  return (
    <svg viewBox="0 0 800 660" className={className} overflow="visible" role="img" aria-labelledby="opening-night-title">
      <title id="opening-night-title">A stage with plum curtains drawn back: a dancer leaps trailing a ribbon while another holds a hip-hop freeze under two spotlights.</title>
      <rect x="0" y="40" width="800" height="620" rx="6" className="fill-proscenium" />
      <path d="M60 660 V150 Q60 70 140 70 H660 Q740 70 740 150 V660 Z" className="fill-stage" />
      <path d="M60 660 V150 Q60 70 140 70 H660 Q740 70 740 150 V660" fill="none" className="stroke-spotlight" strokeWidth="4" />
      <path d="M44 660 V146 Q44 54 136 54 H664 Q756 54 756 146 V660" fill="none" className="stroke-spotlight" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" />
      <ellipse cx="400" cy="320" rx="330" ry="250" fill="url(#pp-backlight)" />

      {/* floor */}
      <path d="M90 500 H710 L790 640 H10 Z" className="fill-maple" />
      {planks.map(bx => (
        <line key={bx} x1={400 + (bx - 400) * 0.682} y1="500" x2={bx} y2="640" className="stroke-maple-deep" strokeWidth="2" />
      ))}
      <path d="M70 545 H730 M40 595 H760" className="stroke-maple-deep" strokeWidth="1.5" strokeDasharray="60 90" />

      {/* spotlights */}
      <path d="M140 70 H170 L420 576 H232 Z" fill="url(#pp-cone)" />
      <path d="M140 70 H170 L420 576 H232 Z" fill="url(#pp-dots-amber)" opacity=".35" />
      <path d="M600 70 H630 L660 560 H478 Z" fill="url(#pp-cone)" />
      <ellipse cx="326" cy="580" rx="104" ry="18" className="fill-spotlight" opacity=".35" />
      <ellipse cx="570" cy="566" rx="96" ry="16" className="fill-spotlight" opacity=".3" />

      <TapeCross x={196} y={612} />
      <TapeCross x={478} y={618} className="fill-spotlight" size={14} rotate={8} />
      <TapeCross x={640} y={530} className="fill-tulle" size={12} />
      <TapeCross x={130} y={540} size={11} rotate={-6} />

      {/* shadows */}
      <ellipse cx="400" cy="590" rx="70" ry="9" fill="#000" opacity=".3" />
      <ellipse cx="584" cy="574" rx="80" ry="9" fill="#000" opacity=".3" />

      <g className="float-leap"><Leaper /></g>
      <g transform="translate(-80 0)"><Freeze /></g>

      {/* curtains */}
      <g className="curtain-open-l">
        <path d="M60 75 H252 C214 190 150 300 116 395 C126 470 140 580 146 660 H60 Z" className="fill-curtain" />
        <path d="M60 75 H252 C214 190 150 300 116 395 C126 470 140 580 146 660 H60 Z" fill="url(#pp-dots-deep)" opacity=".55" />
        <path d="M100 80 C104 200 108 300 112 392 M146 80 C140 200 124 300 114 394 M196 80 C170 200 136 300 116 396 M92 410 C96 500 100 580 98 660 M120 410 C126 500 130 580 128 660"
          fill="none" className="stroke-curtain-deep" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="116" cy="396" rx="20" ry="9" className="fill-spotlight" />
        <path d="M116 404 V440 M110 438 h12 l-3 18 h-6 Z" className="stroke-spotlight fill-spotlight" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <g transform="translate(800 0) scale(-1 1)"><g className="curtain-open-l">
        <path d="M60 75 H252 C214 190 150 300 116 395 C126 470 140 580 146 660 H60 Z" className="fill-curtain" />
        <path d="M60 75 H252 C214 190 150 300 116 395 C126 470 140 580 146 660 H60 Z" fill="url(#pp-dots-deep)" opacity=".55" />
        <path d="M100 80 C104 200 108 300 112 392 M146 80 C140 200 124 300 114 394 M196 80 C170 200 136 300 116 396 M92 410 C96 500 100 580 98 660 M120 410 C126 500 130 580 128 660"
          fill="none" className="stroke-curtain-deep" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="116" cy="396" rx="20" ry="9" className="fill-spotlight" />
        <path d="M116 404 V440 M110 438 h12 l-3 18 h-6 Z" className="stroke-spotlight fill-spotlight" strokeWidth="3" strokeLinejoin="round" />
      </g></g>

      {/* valance */}
      <path d={`M56 62 H744 V118${scallops(744, 56, 118, 7, 44)} Z`} className="fill-curtain" />
      <path d={`M56 62 H744 V118${scallops(744, 56, 118, 7, 44)} Z`} fill="url(#pp-dots-deep)" opacity=".45" />
      <path d={`M744 118${scallops(744, 56, 118, 7, 44)}`} fill="none" className="stroke-spotlight" strokeWidth="5" strokeDasharray="1 9" strokeLinecap="round" />
      <rect x="40" y="40" width="720" height="24" rx="4" className="fill-proscenium" />
      <circle cx="400" cy="52" r="7" className="fill-spotlight" />

      {/* stage lip + footlights */}
      <rect x="0" y="638" width="800" height="22" className="fill-proscenium" />
      {Array.from({ length: 16 }, (_, i) => 50 + i * 46.6).map(x => (
        <g key={x}>
          <ellipse cx={x} cy="632" rx="22" ry="16" fill="url(#pp-glow)" opacity=".7" />
          <path d={`M${x - 9} 640 a9 9 0 0 1 18 0 Z`} className="fill-spotlight" />
        </g>
      ))}
    </svg>
  );
}

/** Top valance for page heads and bands: scalloped curtain with fringe. */
export function Valance({ className = '' }: { className?: string }) {
  const d = `M0 0 H1440 V54${scallops(1440, 0, 54, 12, 40)} Z`;
  return (
    <svg viewBox="0 0 1440 100" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMin meet">
      <path d={d} className="fill-curtain" />
      <path d={d} fill="url(#pp-dots-deep)" opacity=".5" />
      <path d={`M1440 54${scallops(1440, 0, 54, 12, 40)}`} fill="none" className="stroke-spotlight" strokeWidth="5" strokeDasharray="1 10" strokeLinecap="round" />
    </svg>
  );
}

/** One tall side curtain, gathered at a tie-back. Mirror with `side="right"`. */
export function SideCurtain({ side = 'left', className = '' }: { side?: 'left' | 'right'; className?: string }) {
  return (
    <svg viewBox="0 0 120 600" preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false">
      <g transform={side === 'right' ? 'translate(120 0) scale(-1 1)' : undefined}>
        <path d="M0 0 H120 C100 140 70 260 46 360 C60 440 80 520 86 600 H0 Z" className="fill-curtain" />
        <path d="M0 0 H120 C100 140 70 260 46 360 C60 440 80 520 86 600 H0 Z" fill="url(#pp-dots-deep)" opacity=".55" />
        <path d="M30 0 C34 120 40 260 44 356 M70 0 C66 140 54 260 46 358 M24 372 C28 460 30 540 28 600 M54 372 C60 460 64 540 64 600"
          fill="none" className="stroke-curtain-deep" strokeWidth="4" vectorEffect="non-scaling-stroke" />
        <ellipse cx="46" cy="362" rx="14" ry="7" className="fill-spotlight" />
      </g>
    </svg>
  );
}

/** Divider: a row of footlights along a stage lip. */
export function Footlights({ className = '', count = 18 }: { className?: string; count?: number }) {
  const step = 1440 / count;
  return (
    <svg viewBox="0 0 1440 64" preserveAspectRatio="xMidYMax slice" className={`block h-12 w-full ${className}`} aria-hidden="true" focusable="false">
      {Array.from({ length: count }, (_, i) => step / 2 + i * step).map(x => (
        <g key={x}>
          <ellipse cx={x} cy="40" rx="34" ry="26" fill="url(#pp-glow)" opacity=".55" />
          <path d={`M${x - 14} 52 a14 14 0 0 1 28 0 Z`} className="fill-spotlight" />
          <path d={`M${x - 8} 46 a8 8 0 0 1 8 -6`} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      <rect y="52" width="1440" height="12" className="fill-proscenium" />
    </svg>
  );
}

/** Divider: one long amber ribbon that loops once across the boundary. */
export function RibbonDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={`block h-20 w-full ${className}`} aria-hidden="true" focusable="false">
      <path className="ribbon-draw stroke-spotlight" fill="none" strokeWidth="6" strokeLinecap="round" vectorEffect="non-scaling-stroke"
        d="M-20 90 C200 100 340 30 520 52 C680 72 700 118 640 112 C574 106 610 22 760 30 C960 40 1100 104 1460 50" />
      <path className="ribbon-draw stroke-tulle" fill="none" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
        d="M-20 100 C210 108 350 44 524 64 C660 80 690 110 650 104" />
    </svg>
  );
}

/** Divider: a wooden barre on wall brackets. */
export function Barre({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 70" preserveAspectRatio="none" className={`block h-12 w-full ${className}`} aria-hidden="true" focusable="false">
      {[90, 420, 780, 1110].map(x => (
        <g key={x} className="fill-muted">
          <rect x={x - 6} y="34" width="12" height="36" rx="3" />
          <path d={`M${x - 6} 38 h12 l-2 -14 h-8 Z`} />
        </g>
      ))}
      <rect x="0" y="14" width="1200" height="18" rx="9" fill="#B9804A" />
      <rect x="0" y="16" width="1200" height="5" rx="2.5" fill="#ffffff" fillOpacity=".35" />
      <rect x="0" y="27" width="1200" height="3" fill="#7A4E26" fillOpacity=".5" />
    </svg>
  );
}

/** Contact: a lit stage door with a bulb sign. */
export function StageDoor({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 460" className={className} role="img" aria-labelledby="stage-door-title">
      <title id="stage-door-title">A purple stage door under a lit bulb sign reading Stage Door.</title>
      <rect width="360" height="460" rx="10" fill="url(#pp-bricks)" />
      <ellipse cx="180" cy="120" rx="170" ry="120" fill="url(#pp-glow)" opacity=".45" />
      <rect x="56" y="30" width="248" height="70" rx="10" className="fill-stage stroke-spotlight" strokeWidth="4" />
      {Array.from({ length: 12 }, (_, i) => 70 + i * 20).map(x => (
        <g key={x}><circle cx={x} cy="40" r="4" className="fill-spotlight" /><circle cx={x} cy="90" r="4" className="fill-spotlight" /></g>
      ))}
      <text x="180" y="75" textAnchor="middle" className="fill-stage-ink" style={{ fontFamily: 'var(--font-display)', fontSize: 30, letterSpacing: '.08em' }}>STAGE DOOR</text>
      <rect x="92" y="128" width="176" height="282" rx="6" className="fill-proscenium" />
      <rect x="102" y="138" width="156" height="272" rx="4" className="fill-primary" />
      <rect x="118" y="156" width="124" height="96" rx="4" fill="none" className="stroke-curtain-deep" strokeWidth="4" />
      <rect x="118" y="270" width="124" height="120" rx="4" fill="none" className="stroke-curtain-deep" strokeWidth="4" />
      <circle cx="160" cy="204" r="22" className="fill-stage stroke-spotlight" strokeWidth="3" />
      <text x="160" y="212" textAnchor="middle" className="fill-spotlight" style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>5</text>
      <circle cx="236" cy="282" r="7" className="fill-spotlight" />
      <rect x="70" y="408" width="220" height="22" rx="3" className="fill-muted" />
      <rect x="54" y="428" width="252" height="22" rx="3" className="fill-line" />
      <g transform="translate(180 438) scale(1 .5)" className="fill-tape">
        <rect x="-16" y="-4" width="32" height="8" rx="1" transform="rotate(45)" />
        <rect x="-16" y="-4" width="32" height="8" rx="1" transform="rotate(-45)" />
      </g>
      <path d="M318 150 v40 M306 190 h24 l-4 16 h-16 Z" className="stroke-muted fill-spotlight" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="318" cy="210" rx="34" ry="26" fill="url(#pp-glow)" opacity=".6" />
    </svg>
  );
}

/** 404: an empty stage where the spotlight lands on bare floor beside a lonely tape mark. */
export function MissedMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 460" className={className} role="img" aria-labelledby="missed-mark-title">
      <title id="missed-mark-title">An empty stage: one spotlight lands on bare floor beside a lone tape mark, and a ribbon lies dropped at centre stage.</title>
      <rect width="800" height="460" rx="8" className="fill-stage" />
      <ellipse cx="400" cy="200" rx="360" ry="220" fill="url(#pp-backlight)" />
      <path d="M120 300 H680 L780 440 H20 Z" className="fill-maple" />
      {Array.from({ length: 13 }, (_, i) => 20 + i * 63).map(bx => (
        <line key={bx} x1={400 + (bx - 400) * 0.7} y1="300" x2={bx} y2="440" className="stroke-maple-deep" strokeWidth="2" />
      ))}
      <path d="M470 0 H510 L600 380 H400 Z" fill="url(#pp-cone)" />
      <path d="M470 0 H510 L600 380 H400 Z" fill="url(#pp-dots-amber)" opacity=".3" />
      <ellipse cx="500" cy="384" rx="110" ry="20" className="fill-spotlight" opacity=".4" />
      <g transform="translate(250 360) scale(1 .45)" className="fill-tape">
        <rect x="-22" y="-5" width="44" height="10" rx="1" transform="rotate(45)" />
        <rect x="-22" y="-5" width="44" height="10" rx="1" transform="rotate(-45)" />
      </g>
      <path d="M330 404 C360 380 400 420 430 396 C450 380 470 404 450 412 C420 424 380 398 352 420" fill="none" className="stroke-spotlight" strokeWidth="6" strokeLinecap="round" />
      <path d="M0 0 H130 C110 120 80 220 60 300 C70 360 84 420 90 460 H0 Z" className="fill-curtain" />
      <path d="M800 0 H670 C690 120 720 220 740 300 C730 360 716 420 710 460 H800 Z" className="fill-curtain" />
      <path d={`M0 0 H800 V40${scallops(800, 0, 40, 6, 34)} Z`} className="fill-curtain" />
      <path d={`M0 0 H800 V40${scallops(800, 0, 40, 6, 34)} Z`} fill="url(#pp-dots-deep)" opacity=".5" />
      <rect y="440" width="800" height="20" className="fill-proscenium" />
    </svg>
  );
}
