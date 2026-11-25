import type { Metadata } from 'next';
import { CastList, LevelsExplained, StyleProgramme, TermFees, TrialCall } from '../../components/classes';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Classes: styles, levels and fees',
  description: 'Ballet, contemporary, jazz, tap, hip-hop and musical theatre at five levels from age 3 to adult, with term fees and our teaching cast.',
  alternates: { canonical: absoluteUrl('/classes/') },
};

export default function ClassesPage() {
  return <>
    <PageHead eyebrow="Classes" title={<>Six ways <em>to move</em></>}>
      <p>Every style runs at its own tempo. Read the programme, find your level, then ask about a free
        trial class. Term 1 2027 starts Monday 11 January.</p>
    </PageHead>

    <StyleProgramme>
      <StyleProgramme.Heading>Tonight’s <em>programme</em></StyleProgramme.Heading>
      <StyleProgramme.Introduction>
        Six styles in running order. Watch each count strip: it steps at that style’s tempo, from a
        slow contemporary breath to a quick tap shuffle.
      </StyleProgramme.Introduction>
    </StyleProgramme>

    <LevelsExplained>
      <LevelsExplained.Heading>Levels, <em>up the mirror</em></LevelsExplained.Heading>
      <LevelsExplained.Introduction>
        Levels go by age, with a longer class at each step. Dancers 9+ with experience can ask for a
        placement chat during their trial class.
      </LevelsExplained.Introduction>
    </LevelsExplained>

    <CastList>
      <CastList.Heading>Cast <em>list</em></CastList.Heading>
      <CastList.Introduction>Five teachers, one studio, a lot of counting out loud.</CastList.Introduction>
    </CastList>

    <TermFees
      rows={<>
        <TermFees.Row label="Adult Open drop-in">{TermFees.dropIn} a class</TermFees.Row>
        <TermFees.Row label="Sibling discount">{TermFees.sibling} off the second and later dancers</TermFees.Row>
        <TermFees.Row label="Trial class">Your first class is free, by enquiry</TermFees.Row>
      </>}
      note="Fees are paid at the front desk once we’ve offered your dancer a place. Nothing is paid through this website.">
      <TermFees.Heading>Term <em>fees</em></TermFees.Heading>
      <TermFees.Introduction>
        One price per class length for every style. Taking two classes? Each is charged by its own
        length, and the sibling discount still applies.
      </TermFees.Introduction>
    </TermFees>

    <TrialCall>
      <TrialCall.Heading>Not sure where <em>to start?</em></TrialCall.Heading>
      <TrialCall.Introduction>Tell us who’s dancing and what they love. We’ll suggest a class and a trial date.</TrialCall.Introduction>
      <TrialCall.Action>Ask about a trial class</TrialCall.Action>
    </TrialCall>
  </>;
}
