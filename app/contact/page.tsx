import type { Metadata } from 'next';
import { business } from '../../content/business';
import { Contact, CueSheet, EmailFallback } from '../../components/contact';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = { title: 'Contact', description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') } };

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <>
    <Contact form={hosted
      ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
      : <EmailFallback heading="Write to the front desk">The enquiry form isn’t connected on this site yet. Email us directly and we’ll reply within two working days.</EmailFallback>}>
      <Contact.Eyebrow>Contact · trial classes, places and tickets</Contact.Eyebrow>
      <Contact.Heading>Stage <em>door</em></Contact.Heading>
      <Contact.Introduction>{business.enquiries.introduction}</Contact.Introduction>
    </Contact>

    <CueSheet heading="What to put in your message" detailsHeading="Other ways in" note={business.enquiries.confirmationNote} />
  </>;
}
