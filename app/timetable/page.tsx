import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { AvailabilityKey, CallBoard, RoomKey, TimetableContact } from '../../components/timetable';
import { TimeZoneNote } from '../../components/time-zone-note';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Timetable',
  description: 'The weekly class timetable: 28 classes Monday to Saturday, filterable by style, level and day, with rooms, teachers and availability.',
  alternates: { canonical: absoluteUrl('/timetable/') },
};

export default function TimetablePage() {
  return <>
    <PageHead eyebrow="Timetable" title={<>The call <em>board</em></>} aside={<RoomKey />}>
      <p>Term 1 2027 starts Monday 11 January. Every class, every room, Monday to Saturday.</p>
      <TimeZoneNote className="text-stage-muted" />
    </PageHead>

    <CallBoard emptyMessage="No classes match. Try another level or ask us about a new class.">
      <CallBoard.Heading>This term’s <em>classes</em></CallBoard.Heading>
      <CallBoard.Introduction>
        Filter by style, level or day. Each slip shows its class ID: quote it in your message and
        we’ll know exactly which class you mean.
      </CallBoard.Introduction>
    </CallBoard>

    <AvailabilityKey>
      <AvailabilityKey.Heading>Reading the slips</AvailabilityKey.Heading>
      <AvailabilityKey.Note>
        ‘Few spots’ and ‘Waitlist’ are updated weekly. Ask before your first class and we’ll let
        you know whether there’s a place.
      </AvailabilityKey.Note>
    </AvailabilityKey>

    <TimetableContact>
      <TimetableContact.Heading>Found the one? <em>Ask about a trial class.</em></TimetableContact.Heading>
      <TimetableContact.Action>Send an enquiry</TimetableContact.Action>
    </TimetableContact>
  </>;
}
