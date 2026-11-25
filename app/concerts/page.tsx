import type { Metadata } from 'next';
import { CostumeFees, DressRehearsals, NextShowFeature, ProgrammeArchive, Season, ShowWeek } from '../../components/concerts';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';
import { concertStructuredData, jsonLd } from '../../lib/structured-data';

export const metadata: Metadata = {
  title: 'Concerts',
  description: 'Frost & Footlights, The Lab and Pulse: our winter showcase, spring new-work night and spring recital at the Millrace Theatre, with show-week details for families.',
  alternates: { canonical: absoluteUrl('/concerts/') },
};

export default function ConcertsPage() {
  const events = concertStructuredData(site.timeZone);
  return <>
    <PageHead eyebrow="Concerts" title={<>Curtain <em>up</em></>}>
      <p>The 2026–27 season: a winter showcase, a night of new work and the spring recital. Every
        dancer gets the lights, the curtain and the bow.</p>
    </PageHead>

    <NextShowFeature action={<NextShowFeature.Action>Ask about tickets</NextShowFeature.Action>}>
      <NextShowFeature.Heading>Next <em>on stage</em></NextShowFeature.Heading>
      <NextShowFeature.Introduction>
        Ticket requests are enquiries: tell us the performance and how many adult and child seats.
        The front desk replies to arrange seats, paid in person.
      </NextShowFeature.Introduction>
    </NextShowFeature>

    <Season>
      <Season.Heading>The rest of <em>the season</em></Season.Heading>
      <Season.Introduction>Mark the dates now. Rehearsal schedules go home in class three weeks before each show.</Season.Introduction>
    </Season>

    <ShowWeek steps={<>
      <ShowWeek.Step title="Dress rehearsal">
        <DressRehearsals />
      </ShowWeek.Step>
      <ShowWeek.Step title="Call time">
        <p>Dancers arrive at the stage door 60 minutes before curtain, hair done, in their first
          costume under a zipped jacket. Petites can arrive 45 minutes before.</p>
      </ShowWeek.Step>
      <ShowWeek.Step title="Costumes and fees">
        <CostumeFees />
      </ShowWeek.Step>
      <ShowWeek.Step title="In the house">
        <p>No flash photography or filming during performances; an official recording is shared
          with families after the show.</p>
      </ShowWeek.Step>
      <ShowWeek.Step title="After the bow">
        <p>Collect your dancer from the stage door after the curtain call, not from the dressing
          rooms. Volunteers keep the Petites together until a grown-up arrives.</p>
      </ShowWeek.Step>
    </>}>
      <ShowWeek.Heading>Show week, <em>step by step</em></ShowWeek.Heading>
      <ShowWeek.Introduction>
        Everything families ask about, in running order. Ticket questions go to the front desk
        through the enquiry form or at the studio.
      </ShowWeek.Introduction>
    </ShowWeek>

    <ProgrammeArchive>
      <ProgrammeArchive.Heading>From the <em>archive</em></ProgrammeArchive.Heading>
      <ProgrammeArchive.Introduction>Programmes from past shows, still pinned up in the corridor.</ProgrammeArchive.Introduction>
    </ProgrammeArchive>

    {events.length ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(events) }} /> : null}
  </>;
}
