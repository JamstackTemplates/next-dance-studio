// Uniform page sections: leotards by level on a rail, kit by style as packing tags, hair, the shop.
import type { ReactNode } from 'react';
import { ageRange, levels, styleById } from '../content/classes';
import { hair, kits, shop, stockLabels } from '../content/uniform';
import { StyleIcon } from './art/icons';
import { HairGuide, Leotard } from './art/objects';
import { AtelierBackdrop, CornerFiligree, StageArchDivider } from './art/ornaments';
import { Barre } from './art/stage';
import { PrintButton } from './print-button';

type Slot = { children: ReactNode };

function Heading({ id, children, className = '' }: Slot & { id: string; className?: string }) {
  return <h2 id={id} className={`text-[clamp(2.1rem,4.4vw,3.3rem)] [&_em]:not-italic [&_em]:text-primary-ink ${className}`}>{children}</h2>;
}
function Lede({ children }: Slot) {
  return <p className="mt-3 max-w-(--measure) text-[1.08rem] text-muted">{children}</p>;
}

/* ---------- Leotard colours by level: a full-width rail ---------- */

function RailSection({ children }: Slot) {
  return (
    <section aria-labelledby="rail-heading" className="floor-maple relative isolate overflow-hidden py-[clamp(3rem,7vw,5rem)]">
      <AtelierBackdrop variant="ribbons" tone="light" />
      <div className="wrap">
        <div className="max-w-3xl">{children}</div>
        <div className="relative mt-10">
          <div aria-hidden="true" className="absolute inset-x-0 top-3 h-3 rounded-full bg-ink" />
          <ul className="print-checklist relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {levels.map((level, index) => (
              <li key={level.id} className="flex flex-col items-center text-center">
                <Leotard hex={level.leotard.hex} className={`h-44 w-auto ${['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2'][index]}`} />
                <div className="paper -mt-3 w-full max-w-[12rem] rounded-sm px-3 py-3">
                  <h3 className="text-[1.45rem]">{level.name}</h3>
                  <p className="text-sm text-muted">Ages {ageRange(level)}</p>
                  <p className="mt-1 flex items-center justify-center gap-2 font-semibold">
                    <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full ring-1 ring-black/25" style={{ background: level.leotard.hex ?? 'repeating-linear-gradient(45deg,#F4C9D3 0 3px,#C9B2E8 3px 6px)' }} />
                    {level.leotard.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
export const LevelRail = Object.assign(RailSection, {
  Heading: ({ children }: Slot) => <Heading id="rail-heading">{children}</Heading>,
  Introduction: Lede,
});

/* ---------- Kit by style: staggered packing tags ---------- */

function KitSection({ children }: Slot) {
  return (
    <section aria-labelledby="kit-heading" className="relative isolate overflow-hidden bg-surface pb-[clamp(3.5rem,7vw,5.5rem)] pt-4">
      <StageArchDivider tone="light" className="mb-[clamp(2rem,4vw,3.5rem)]" />
      <AtelierBackdrop variant="arches" tone="light" />
      <div className="wrap">
        <div className="max-w-3xl">{children}</div>
        <ul className="mt-10 gap-6 [column-fill:balance] sm:columns-2 lg:columns-3">
          {kits.map((kit, index) => {
            const style = styleById(kit.style)!;
            return (
              <li key={kit.style} className={`reveal mb-8 break-inside-avoid ${index % 3 === 1 ? 'lg:mt-10' : ''}`}>
                <article aria-labelledby={`kit-${kit.style}`}
                  className={`relative bg-bg px-6 pb-6 pt-12 shadow-[0_18px_30px_-18px_rgba(0,0,0,.5)] ring-1 ring-line ${index % 2 ? 'rotate-[1.2deg]' : '-rotate-[1.2deg]'}`}
                  style={{ clipPath: 'polygon(16% 0, 84% 0, 100% 10%, 100% 100%, 0 100%, 0 10%)' }}>
                  <span aria-hidden="true" className="absolute left-1/2 top-4 h-4 w-4 -translate-x-1/2 rounded-full bg-surface ring-[3px] ring-spotlight" />
                  <div className="flex items-center gap-3">
                    <StyleIcon style={kit.style} className="h-12 w-12 flex-none" />
                    <h3 id={`kit-${kit.style}`} className="text-[1.9rem]">{style.name}</h3>
                  </div>
                  <ul className="print-checklist mt-4 grid gap-2">
                    {kit.items.map(item => (
                      <li key={item.item} className="border-b border-dashed border-line pb-2"><strong>{item.item}:</strong> {item.detail}</li>
                    ))}
                    <li className="border-b border-dashed border-line pb-2"><strong>Shoes:</strong> {kit.shoes}</li>
                    <li><strong>Hair:</strong> {kit.style === 'ballet' ? hair.ballet : hair.default}</li>
                  </ul>
                  {kit.notes ? <p className="mt-3 text-sm italic text-muted">{kit.notes}</p> : null}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
export const KitByStyle = Object.assign(KitSection, {
  Heading: ({ children }: Slot) => <Heading id="kit-heading">{children}</Heading>,
  Introduction: Lede,
});

/* ---------- Hair guide on a mirror band ---------- */

function HairSection({ children }: Slot) {
  const looks = [
    { which: 'bun' as const, title: 'Classical bun', text: hair.ballet },
    { which: 'ponytail' as const, title: 'Low ponytail', text: 'Petite ballet only, if a bun won’t stay put yet' },
    { which: 'tied' as const, title: 'Tied back', text: hair.default },
  ];
  return (
    <section aria-labelledby="hair-heading" className="mirror-wall py-[clamp(3rem,7vw,5rem)]">
      <Barre className="-mt-[clamp(3rem,7vw,5rem)] mb-8" />
      <div className="wrap grid gap-10 lg:grid-cols-[4fr_8fr] lg:items-center">
        <div>{children}</div>
        <ul className="reveal grid grid-cols-1 gap-6 sm:grid-cols-3">
          {looks.map(look => (
            <li key={look.which} className="text-center">
              <div className="mx-auto grid aspect-square w-40 place-items-center rounded-full bg-surface/70 ring-4 ring-white/60">
                <HairGuide which={look.which} className="h-32 w-auto" />
              </div>
              <h3 className="mt-4 text-[1.5rem]">{look.title}</h3>
              <p className="mt-1 text-muted">{look.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export const HairLooks = Object.assign(HairSection, {
  Heading: ({ children }: Slot) => <Heading id="hair-heading">{children}</Heading>,
  Introduction: Lede,
});

/* ---------- Studio shop: price tags on a rail, plus the swap rail ---------- */

function ShopSection({ children, swap }: Slot & { swap: ReactNode }) {
  return (
    <section aria-labelledby="shop-heading" className="floor-maple section-hairline relative isolate overflow-hidden py-[clamp(3rem,7vw,5rem)]">
      <AtelierBackdrop variant="ribbons" tone="light" />
      <div className="wrap grid gap-10 lg:grid-cols-[8fr_4fr]">
        <div>
          {children}
          <div className="relative mt-10">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2.5 rounded-full bg-wood-deep" />
            <ul className="relative grid grid-cols-2 gap-x-4 gap-y-6 pt-1 sm:grid-cols-3">
              {shop.map((item, index) => (
                <li key={item.id} className="flex flex-col items-center">
                  <span aria-hidden="true" className="h-7 w-px bg-muted" />
                  <article aria-labelledby={`shop-${item.id}`}
                    className={`relative w-full max-w-[13rem] bg-surface px-4 pb-4 pt-8 text-center shadow-[0_14px_24px_-16px_rgba(0,0,0,.55)] ${['-rotate-2', 'rotate-1', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3'][index % 6]}`}
                    style={{ clipPath: 'polygon(50% 0, 100% 16%, 100% 100%, 0 100%, 0 16%)' }}>
                    <span aria-hidden="true" className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-bg ring-2 ring-muted/40" />
                    <h3 id={`shop-${item.id}`} className="font-sans text-[1rem] font-semibold leading-snug">{item.name}</h3>
                    <p className={`display mt-1 text-[2.4rem] leading-none tabular ${item.stock === 'sold-out' ? 'text-muted line-through decoration-2' : ''}`}>${item.price}</p>
                    <p className={`label-caps mx-auto mt-3 inline-block -rotate-6 rounded-sm px-2 py-0.5 text-[.68rem] ring-2 ${item.stock === 'in-stock' ? 'text-tape-ink ring-tape-ink' : item.stock === 'low' ? 'text-spotlight-ink ring-spotlight-ink' : 'text-primary-ink ring-primary-ink'}`}>
                      {stockLabels[item.stock]}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="relative self-start rounded-2xl border border-spotlight/35 bg-tulle p-7 text-ink shadow-[0_18px_36px_-22px_rgba(20,14,31,.28)] lg:mt-24">
          <CornerFiligree tone="light" />
          {swap}
        </aside>
      </div>
    </section>
  );
}
export const StudioShop = Object.assign(ShopSection, {
  Heading: ({ children }: Slot) => <Heading id="shop-heading">{children}</Heading>,
  Introduction: Lede,
  SwapHeading: ({ children }: Slot) => <h3 className="text-[1.9rem]">{children}</h3>,
  SwapText: ({ children }: Slot) => <p className="mt-3">{children}</p>,
});

/* ---------- Print note ---------- */

export function PrintNote({ children }: Slot) {
  return (
    <section aria-label="Print the kit list" className="no-print bg-bg py-10">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 rounded-md border-2 border-dashed border-line p-6">
        <p className="text-lg font-semibold">{children}</p>
        <PrintButton />
      </div>
    </section>
  );
}
