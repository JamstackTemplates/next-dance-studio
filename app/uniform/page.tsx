import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { HairLooks, KitByStyle, LevelRail, PrintNote, StudioShop } from '../../components/uniform';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Uniform',
  description: 'Leotard colours by level, kit and shoes for every style, the hair guide and the studio shop at the front desk.',
  alternates: { canonical: absoluteUrl('/uniform/') },
};

export default function UniformPage() {
  return <>
    <PageHead eyebrow="Uniform" title={<>Dressed <em>for class</em></>}>
      <p>One leotard colour per level, the right shoes for each style and hair that stays put. Teachers
        can see every line of a dancer’s body, and everyone knows who’s in which class.</p>
    </PageHead>

    <LevelRail>
      <LevelRail.Heading>Leotard colours <em>by level</em></LevelRail.Heading>
      <LevelRail.Introduction>
        Worn for ballet and contemporary. Moving up a level? Keep the old leotard until the end of
        term, then pass it on at the swap rail.
      </LevelRail.Introduction>
    </LevelRail>

    <KitByStyle>
      <KitByStyle.Heading>Kit <em>by style</em></KitByStyle.Heading>
      <KitByStyle.Introduction>
        Pack the tag for each class your dancer takes. Put a name in everything, especially shoes.
      </KitByStyle.Introduction>
    </KitByStyle>

    <HairLooks>
      <HairLooks.Heading>Hair <em>that holds</em></HairLooks.Heading>
      <HairLooks.Introduction>
        Off the face and secure enough for a pirouette. Bun kits are at the front desk if you’re
        running late.
      </HairLooks.Introduction>
    </HairLooks>

    <StudioShop swap={<>
      <StudioShop.SwapHeading>The swap rail</StudioShop.SwapHeading>
      <StudioShop.SwapText>Outgrown it? Hang it on the swap rail by the stage door. Take what fits, free.</StudioShop.SwapText>
    </>}>
      <StudioShop.Heading>The studio <em>shop</em></StudioShop.Heading>
      <StudioShop.Introduction>
        Available at the front desk during opening hours. Prices in USD; there are no online sales.
      </StudioShop.Introduction>
    </StudioShop>

    <PrintNote>Print this page for a kit checklist.</PrintNote>
  </>;
}
