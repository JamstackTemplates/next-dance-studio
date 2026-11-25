// Graceful editorial ornaments: silk ribbons, proscenium arch dividers, ambient studio backdrops
// and playbill filigree. All elements are purely decorative (aria-hidden) and driven by CSS tokens
// so they harmonize across light ("matinee") and dark ("blackout") modes and hide cleanly in print.

/**
 * Ambient background artwork for sections: flowing silk ribbons, delicate proscenium arches,
 * or sweeping spotlight arcs. Place inside a `relative isolate overflow-hidden` section.
 */
export function AtelierBackdrop({
  variant = 'ribbons',
  tone = 'light',
  className = '',
}: {
  variant?: 'ribbons' | 'arches' | 'spotlight';
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const strokeMain = tone === 'dark' ? 'var(--spotlight)' : 'var(--primary-ink)';
  const strokeAccent = tone === 'dark' ? 'var(--tulle)' : 'var(--spotlight)';
  const mainOpacity = tone === 'dark' ? 0.16 : 0.11;
  const accentOpacity = tone === 'dark' ? 0.18 : 0.24;

  if (variant === 'arches') {
    return (
      <div
        aria-hidden="true"
        className={`ornament-bg pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none ${className}`}
      >
        <svg
          viewBox="0 0 1440 640"
          preserveAspectRatio="xMidYMid slice"
          className="h-[min(100%,46rem)] w-full"
          focusable="false"
        >
          {/* Left concentric studio arches */}
          <g fill="none" strokeLinecap="round">
            <path
              d="M-120 640 V260 C-120 70 60 -40 260 -40 C460 -40 620 85 620 280 V640"
              stroke={strokeMain}
              strokeWidth="1.2"
              strokeOpacity={mainOpacity}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M-80 640 V270 C-80 110 80 10 260 10 C440 10 570 115 570 285 V640"
              stroke={strokeAccent}
              strokeWidth="1"
              strokeDasharray="3 9"
              strokeOpacity={accentOpacity}
              vectorEffect="non-scaling-stroke"
            />
            {/* Right graceful sweeping arc */}
            <path
              d="M980 640 C980 340 1140 110 1490 70"
              stroke={strokeAccent}
              strokeWidth="1.35"
              strokeOpacity={accentOpacity}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M1050 640 C1050 385 1190 180 1490 140"
              stroke={strokeMain}
              strokeWidth="1"
              strokeOpacity={mainOpacity}
              vectorEffect="non-scaling-stroke"
            />
            {/* Delicate diamond nodal stars */}
            <path
              d="M260 -2 L264 6 L272 10 L264 14 L260 22 L256 14 L248 10 L256 6 Z"
              fill={strokeAccent}
              fillOpacity={accentOpacity + 0.12}
            />
            <circle
              cx="1195"
              cy="228"
              r="3.2"
              fill={strokeAccent}
              fillOpacity={accentOpacity + 0.15}
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'spotlight') {
    return (
      <div
        aria-hidden="true"
        className={`ornament-bg pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none ${className}`}
      >
        <svg
          viewBox="0 0 1440 680"
          preserveAspectRatio="xMidYMid slice"
          className="h-[min(100%,46rem)] w-full"
          focusable="false"
        >
          <g fill="none" strokeLinecap="round">
            {/* Sweeping proscenium light curves */}
            <path
              d="M-80 120 C260 40 580 280 960 180 C1180 122 1340 30 1520 75"
              stroke={strokeMain}
              strokeWidth="1.5"
              strokeOpacity={mainOpacity + 0.08}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M-80 148 C270 72 570 308 965 206 C1190 148 1350 56 1520 100"
              stroke={strokeAccent}
              strokeWidth="1"
              strokeDasharray="2 8"
              strokeOpacity={accentOpacity}
              vectorEffect="non-scaling-stroke"
            />
            {/* Lower theatrical orbital arc */}
            <path
              d="M-60 560 C340 650 760 440 1160 535 C1310 570 1420 555 1510 515"
              stroke={strokeMain}
              strokeWidth="1.1"
              strokeOpacity={mainOpacity}
              vectorEffect="non-scaling-stroke"
            />
            {/* Fine starburst glints */}
            <path
              d="M1160 116 L1164 125 L1173 129 L1164 133 L1160 142 L1156 133 L1147 129 L1156 125 Z"
              fill={strokeMain}
              fillOpacity={0.34}
            />
            <path
              d="M280 512 L283 518 L289 521 L283 524 L280 530 L277 524 L271 521 L277 518 Z"
              fill={strokeMain}
              fillOpacity={0.26}
            />
          </g>
        </svg>
      </div>
    );
  }

  // Default: 'ribbons' — twin flowing silk ribbons echoing the hero photograph
  return (
    <div
      aria-hidden="true"
      className={`ornament-bg pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none ${className}`}
    >
      <svg
        viewBox="0 0 1440 680"
        preserveAspectRatio="xMidYMid slice"
        className="h-[min(100%,46rem)] w-full"
        focusable="false"
      >
        <g fill="none" strokeLinecap="round">
          <path
            d="M-100 520 C160 360 360 160 660 220 C910 270 1060 470 1280 390 C1380 354 1445 270 1520 220"
            stroke={strokeAccent}
            strokeWidth="1.8"
            strokeOpacity={accentOpacity}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M-100 548 C175 390 385 190 675 250 C925 300 1070 492 1295 412 C1390 378 1455 298 1520 250"
            stroke={strokeMain}
            strokeWidth="1.15"
            strokeOpacity={mainOpacity}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M-60 120 C240 20 500 165 820 110 C1060 68 1240 -10 1500 60"
            stroke={strokeMain}
            strokeWidth="1"
            strokeDasharray="3 10"
            strokeOpacity={mainOpacity}
            vectorEffect="non-scaling-stroke"
          />
          {/* Subtle floating gold diamonds along the ribbon */}
          <path
            d="M660 210 L664 217 L671 221 L664 225 L660 232 L656 225 L649 221 L656 217 Z"
            fill={strokeAccent}
            fillOpacity={accentOpacity + 0.12}
          />
          <circle
            cx="1280"
            cy="390"
            r="3"
            fill={strokeAccent}
            fillOpacity={accentOpacity + 0.14}
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * Graceful section border: tapered double hairline in gold & line colour with a centered
 * playbill diamond-and-arc medallion. Sits flush at the top or bottom edge of a section.
 */
export function StageArchDivider({
  tone = 'light',
  className = '',
}: {
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const lineColor = tone === 'dark' ? 'rgba(245, 180, 76, 0.34)' : 'color-mix(in oklab, var(--spotlight) 55%, var(--line))';
  const subtleColor = tone === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'var(--line)';
  return (
    <div
      aria-hidden="true"
      className={`ornament-border pointer-events-none relative flex w-full items-center justify-center overflow-hidden select-none ${className}`}
    >
      <svg
        viewBox="0 0 1440 36"
        preserveAspectRatio="xMidYMid meet"
        className="block h-9 w-full max-w-[90rem]"
        focusable="false"
      >
        {/* Outer subtle baseline */}
        <line x1="0" y1="18" x2="656" y2="18" stroke={subtleColor} strokeWidth="1" />
        <line x1="784" y1="18" x2="1440" y2="18" stroke={subtleColor} strokeWidth="1" />
        {/* Inner luminous gold tapered lines */}
        <path d="M180 18 H652" stroke={lineColor} strokeWidth="1.25" strokeLinecap="round" />
        <path d="M788 18 H1260" stroke={lineColor} strokeWidth="1.25" strokeLinecap="round" />
        {/* Delicate twin curved brackets around the center medallion */}
        <path
          d="M652 18 Q686 6 706 18 Q686 30 652 18 Z"
          fill="none"
          stroke={lineColor}
          strokeWidth="1.15"
        />
        <path
          d="M788 18 Q754 6 734 18 Q754 30 788 18 Z"
          fill="none"
          stroke={lineColor}
          strokeWidth="1.15"
        />
        {/* Center four-point spotlight star / diamond */}
        <path
          d="M720 6 L724 14 L732 18 L724 22 L720 30 L716 22 L708 18 L716 14 Z"
          className="fill-spotlight"
          fillOpacity={tone === 'dark' ? 0.85 : 0.78}
        />
        <circle cx="634" cy="18" r="2" className="fill-spotlight" fillOpacity="0.55" />
        <circle cx="806" cy="18" r="2" className="fill-spotlight" fillOpacity="0.55" />
      </svg>
    </div>
  );
}

/**
 * Flowing silk-ribbon section border: a subtle horizontal silk wave with a fine secondary
 * dotted trail, ideal between contrasting sections.
 */
export function SilkRibbonBorder({
  tone = 'light',
  className = '',
}: {
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const accentOpacity = tone === 'dark' ? 0.45 : 0.55;
  const secondaryColor = tone === 'dark' ? 'var(--tulle)' : 'var(--primary-ink)';
  return (
    <div
      aria-hidden="true"
      className={`ornament-border pointer-events-none w-full overflow-hidden select-none ${className}`}
    >
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="block h-10 w-full sm:h-12"
        focusable="false"
      >
        <path
          d="M-20 26 C260 6 500 44 760 22 C1020 2 1220 42 1460 18"
          fill="none"
          stroke="var(--spotlight)"
          strokeWidth="1.75"
          strokeOpacity={accentOpacity}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M-20 32 C260 14 510 48 765 28 C1025 10 1225 46 1460 24"
          fill="none"
          stroke={secondaryColor}
          strokeWidth="1"
          strokeDasharray="3 8"
          strokeOpacity={tone === 'dark' ? 0.3 : 0.22}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/**
 * Delicate gold L-shaped filigree corner brackets for featured editorial cards.
 * Place directly inside a `relative` card container.
 */
export function CornerFiligree({
  tone = 'light',
  className = '',
}: {
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const borderClass =
    tone === 'dark' ? 'border-spotlight/45' : 'border-spotlight/55';
  const corners = [
    'left-2.5 top-2.5 border-l-[1.5px] border-t-[1.5px] rounded-tl-[2px]',
    'right-2.5 top-2.5 border-r-[1.5px] border-t-[1.5px] rounded-tr-[2px]',
    'left-2.5 bottom-2.5 border-l-[1.5px] border-b-[1.5px] rounded-bl-[2px]',
    'right-2.5 bottom-2.5 border-r-[1.5px] border-b-[1.5px] rounded-br-[2px]',
  ];
  return (
    <>
      {corners.map(pos => (
        <span
          key={pos}
          aria-hidden="true"
          className={`ornament-border pointer-events-none absolute h-4 w-4 ${borderClass} ${pos} ${className}`}
        />
      ))}
    </>
  );
}

/**
 * Refined playbill rule with a tiny gold diamond in the centre, for section sub-breaks.
 */
export function PlaybillRule({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`ornament-border flex items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--line)_25%,color-mix(in_oklab,var(--spotlight)_55%,var(--line))_100%)]" />
      <span className="h-2 w-2 rotate-45 border border-spotlight/80 bg-spotlight/25" />
      <span className="h-px flex-1 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--spotlight)_55%,var(--line))_0%,var(--line)_75%,transparent)]" />
    </div>
  );
}
