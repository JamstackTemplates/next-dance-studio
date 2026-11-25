// Contact page: editorial stage-lit header, hosted enquiry form (or email fallback) and cue sheet.
import type { ReactNode } from 'react';
import { business, formatAddress } from '../content/business';
import { mapDirectionsUrl } from '../lib/maps';
import { EnvelopeIcon, PhoneIcon, PinIcon } from './art/icons';
import { AtelierBackdrop, CornerFiligree } from './art/ornaments';
import { StageDoor } from './art/stage';
import { CopyEmail } from './copy-email';
import { DeskStatus } from './desk-status';
import { HoursList } from './hours-list';

type Slot = { children: ReactNode };

function ContactStage({ children, form }: Slot & { form: ReactNode }) {
  return (
    <section aria-labelledby="contact-heading" className="floor-marley on-stage relative isolate overflow-hidden border-b border-spotlight/35">
      <div aria-hidden="true" className="ornament-bg pointer-events-none absolute -right-24 -top-24 -z-10 h-[32rem] w-[42rem] rotate-[-24deg] bg-[linear-gradient(180deg,rgba(245,180,76,0.22)_0%,rgba(245,180,76,0.06)_48%,transparent_80%)] blur-2xl" />
      <AtelierBackdrop variant="spotlight" tone="dark" />
      <div className="wrap grid gap-10 py-[clamp(3.5rem,7vw,5.5rem)] lg:grid-cols-[4fr_8fr] lg:items-start">
        <div className="mx-auto w-full max-w-[16rem] sm:max-w-[19rem] lg:max-w-none">
          <StageDoor className="h-auto w-full max-h-[21rem] lg:max-h-none" />
        </div>
        <div>
          {children}
          <div className="paper relative mt-8 rounded-2xl p-7 text-ink sm:p-9">
            <CornerFiligree tone="light" />
            {form}
          </div>
        </div>
      </div>
    </section>
  );
}
export const Contact = Object.assign(ContactStage, {
  Eyebrow: ({ children }: Slot) => <p className="eyebrow">{children}</p>,
  Heading: ({ children }: Slot) => <h1 id="contact-heading" className="mt-4 text-[clamp(2.8rem,6.5vw,5.2rem)] leading-[.96] [&_em]:not-italic [&_em]:text-spotlight">{children}</h1>,
  Introduction: ({ children }: Slot) => <p className="mt-4 max-w-(--measure) text-[1.15rem] text-stage-muted">{children}</p>,
});

/** Shown in place of the hosted form when no Jamstacks site ID is configured. */
export function EmailFallback({ heading, children }: Slot & { heading: string }) {
  return (
    <div>
      <h2 className="text-[1.9rem]">{heading}</h2>
      <p className="mt-3 text-muted">{children}</p>
      <p className="mt-4 text-lg"><a className="text-link break-all" href={`mailto:${business.email}`}>{business.email}</a></p>
    </div>
  );
}

/** Cue sheet: what to put in the message, plus every other way to reach the front desk. */
export function CueSheet({ heading, detailsHeading, note }: { heading: string; detailsHeading: string; note: string }) {
  return (
    <section aria-label="Message guide and contact details" className="floor-maple relative isolate overflow-hidden py-16">
      <AtelierBackdrop variant="arches" tone="light" />
      <div className="wrap grid gap-12 md:grid-cols-2">
        <div className="paper relative rounded-2xl p-8 sm:p-9">
          <CornerFiligree tone="light" />
          <h2 className="text-[1.9rem]">{heading}</h2>
          <ol className="mt-6 grid gap-3.5">
            {business.enquiries.usefulToInclude.map((tip, index) => (
              <li key={tip} className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-line pb-3.5 last:border-b-0 last:pb-0">
                <span className="label-caps rounded-full bg-stage px-2.5 py-1 text-[.66rem] text-spotlight tabular">Cue {index + 1}</span>
                <span>{tip}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 font-semibold text-primary-ink">{note}</p>
        </div>
        <div>
          <h2 className="text-[1.9rem]">{detailsHeading}</h2>
          <ul className="mt-6 grid gap-4">
            <li className="flex flex-wrap items-center gap-3">
              <EnvelopeIcon className="h-5 w-5 text-primary-ink" />
              <a className="text-link break-all" href={`mailto:${business.email}`}>{business.email}</a>
              <CopyEmail email={business.email} />
            </li>
            <li className="flex items-center gap-3"><PhoneIcon className="h-5 w-5 text-primary-ink" /><a className="text-link" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a></li>
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 flex-none text-primary-ink" />
              <span>{formatAddress()}<span className="block text-muted">{business.locationLine} {business.parking}</span>
                <a className="text-link" href={mapDirectionsUrl(formatAddress())}>Get directions</a></span>
            </li>
          </ul>
          <div className="paper mt-7 rounded-xl p-6">
            <DeskStatus className="text-primary-ink" />
            <HoursList className="mt-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
}
