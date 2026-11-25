import type { Metadata } from 'next';
import { CallBoardPreview, CountBand, Hero, LevelTags, NextShow, StyleCubbies, TicketAction, UniformTeaser, Visit } from '../components/home';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

export default function HomePage() {
  return <>
    <Hero>
      <Hero.Eyebrow>Minneapolis dance studio · ages 3 to adult</Hero.Eyebrow>
      <Hero.Heading>Find your rhythm. <em>Then make it yours.</em></Hero.Heading>
      <Hero.Introduction>
        Ballet to hip-hop, ages 3 to adult, taught in two sunlit studios by the Stone Arch Bridge.
        Term 1 2027 starts Monday 11 January.
      </Hero.Introduction>
      <Hero.Actions>
        <Hero.Primary>Ask about a free trial class</Hero.Primary>
        <Hero.Secondary>See the timetable</Hero.Secondary>
      </Hero.Actions>
    </Hero>

    <CountBand>Every class starts on the count.</CountBand>

    <StyleCubbies>
      <StyleCubbies.Heading>Pick your <em>style</em></StyleCubbies.Heading>
      <StyleCubbies.Introduction>
        Six styles, one studio. Grab a pair of shoes from the cubby: each one opens that style’s page,
        with who it suits, the levels it runs at and how fast its count goes.
      </StyleCubbies.Introduction>
      <StyleCubbies.Link>Meet all six styles</StyleCubbies.Link>
    </StyleCubbies>

    <LevelTags>
      <LevelTags.Heading>Grow through <em>the levels</em></LevelTags.Heading>
      <LevelTags.Introduction>
        Five levels by age, each with its own leotard colour and class length. Dancers move up when
        their teacher says they’re ready, not just on a birthday.
      </LevelTags.Introduction>
    </LevelTags>

    <CallBoardPreview>
      <CallBoardPreview.Heading>On the call board <em>this week</em></CallBoardPreview.Heading>
      <CallBoardPreview.Introduction>
        28 weekly classes across the Mirror Room and the Sprung Box, Monday to Saturday. Pinned here:
        what’s coming up next at the studio.
      </CallBoardPreview.Introduction>
      <CallBoardPreview.Link>See the full timetable</CallBoardPreview.Link>
    </CallBoardPreview>

    <NextShow action={<TicketAction>Ask about tickets</TicketAction>}>
      <NextShow.Heading>Next <em>on stage</em></NextShow.Heading>
      <NextShow.Introduction>
        Every dancer gets the lights, the curtain and the bow. Two big shows a year at the Millrace
        Theatre, plus The Lab for new work in spring.
      </NextShow.Introduction>
      <NextShow.Link>All concerts and show week</NextShow.Link>
    </NextShow>

    <UniformTeaser>
      <UniformTeaser.Heading>What to <em>wear</em></UniformTeaser.Heading>
      <UniformTeaser.Introduction>
        One leotard colour per level, the right shoes for each style and a bun that survives a
        pirouette. The full kit list prints on one page.
      </UniformTeaser.Introduction>
      <UniformTeaser.Link>See the uniform guide</UniformTeaser.Link>
    </UniformTeaser>

    <Visit>
      <Visit.Heading>Find the <em>stage door</em></Visit.Heading>
      <Visit.Introduction>
        Come early for your first class: the front desk will show you where to change, where to
        leave shoes and which studio you’re in.
      </Visit.Introduction>
    </Visit>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
  </>;
}
