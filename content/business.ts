// Shared business details for Pirouette & Pulse Dance (a fictitious Jamstacks gallery sample).
// Page-specific copy lives in each route's app/**/page.tsx; this file holds values the site reuses.
import type { OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short line used in metadata and the footer. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public number; blank hides it. */
  phone: string;
  /** Postal address, shown on Home, Contact and in the footer, and used for map links. */
  address: { street: string; city: string; region: string; postalCode: string; country: string };
  /** One-line landmark directions shown beside the address. */
  locationLine: string;
  /** Parking and arrival note. */
  parking: string;
  /** City served, used in structured data. */
  areaServed: string;
  /** Front desk (and building) hours, Monday to Sunday, same-day intervals only. */
  hours: OpeningHours[];
  /** Current/next term line shown on Home, Classes and Timetable. */
  termLine: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: string[];
    /** Required reminder that enquiries are not confirmations. */
    confirmationNote: string;
  };
}

export const business: Business = {
  name: 'Pirouette & Pulse Dance',
  tagline: 'Find your rhythm. Then make it yours.',
  introduction: 'Ballet, contemporary, jazz, tap, hip-hop and musical theatre for ages 3 to adult in Minneapolis, with a weekly timetable, two concerts a year and a clear uniform guide.',
  email: 'hello@pirouetteandpulse.com',
  phone: '(612) 555-0187',
  address: { street: '214 Millrace Lane', city: 'Minneapolis', region: 'MN', postalCode: '55401', country: 'US' },
  locationLine: 'Two blocks from the Stone Arch Bridge, on the downtown side of the river.',
  parking: 'Street parking on Millrace Lane, plus a bike rack by the stage door.',
  areaServed: 'Minneapolis',
  hours: [
    { day: 'Monday', opens: '15:30', closes: '21:00' },
    { day: 'Tuesday', opens: '15:30', closes: '21:00' },
    { day: 'Wednesday', opens: '15:30', closes: '21:00' },
    { day: 'Thursday', opens: '15:30', closes: '21:00' },
    { day: 'Friday', opens: '15:30', closes: '21:00' },
    { day: 'Saturday', opens: '08:30', closes: '15:00' },
    { day: 'Sunday' },
  ],
  termLine: 'Term 1 2027 starts Monday 11 January',
  enquiries: {
    title: 'Stage door',
    introduction: 'Tell us who’s dancing and what they’d love to try. We’ll reply within two working days to suggest a class and a trial date.',
    usefulToInclude: [
      'The dancer’s first name and age',
      'Styles they’re interested in',
      'Any previous dance experience',
      'Preferred days, or the class ID from the timetable (for example tue-tap-junior)',
      'For tickets: the show, the performance and how many adult and child seats',
    ],
    confirmationNote: 'Places and tickets are confirmed only when the front desk replies, and nothing is paid through this website.',
  },
};

/** Single-line postal address. */
export function formatAddress(address = business.address): string {
  return `${address.street}, ${address.city}, ${address.region} ${address.postalCode}`;
}
