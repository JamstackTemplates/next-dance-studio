import { business, formatAddress } from '../content/business.ts';
import { concerts as allConcerts, type Concert } from '../content/concerts.ts';
import { levelById } from '../content/classes.ts';
import { absoluteUrl } from './paths.ts';
import { zonedIso } from './schedule.ts';

const DAY_URL = (day: string) => `https://schema.org/${day}`;

function postalAddress(address = business.address) {
  return { '@type': 'PostalAddress', streetAddress: address.street, addressLocality: address.city,
    addressRegion: address.region, postalCode: address.postalCode, addressCountry: address.country };
}

/** The studio as a local business and school, derived from content/business.ts. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  return {
    '@context': 'https://schema.org', '@type': ['LocalBusiness', 'EducationalOrganization'],
    name: business.name, description: business.introduction, email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}), ...(url ? { url } : {}),
    address: postalAddress(),
    areaServed: business.areaServed,
    openingHoursSpecification: business.hours.filter(entry => entry.opens && entry.closes).map(entry => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: DAY_URL(entry.day), opens: entry.opens, closes: entry.closes,
    })),
  };
}

function venueAddress(address: string) {
  // Venue addresses are single lines in content; keep them as text.
  return address === formatAddress() ? postalAddress() : address;
}

/**
 * One DanceEvent per performance. Static output lists all of them; dates carry the studio's offset.
 * Offers state prices only: tickets are requested by enquiry, never sold through the site.
 */
export function concertStructuredData(timeZone: string, list: readonly Concert[] = allConcerts) {
  if (!timeZone) return [];
  const organizer = { '@type': 'Organization', name: business.name, ...(absoluteUrl('/') ? { url: absoluteUrl('/') } : {}) };
  return list.flatMap(concert => concert.performances.map(performance => ({
    '@context': 'https://schema.org', '@type': 'DanceEvent',
    name: `${concert.title}: ${concert.subtitle}`,
    description: `${performance.label}, featuring ${performance.levels.map(id => levelById(id)?.name ?? id).join(', ')} dancers.`,
    startDate: zonedIso(performance.date, performance.start, timeZone),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: concert.venue.name, address: venueAddress(concert.venue.address) },
    organizer,
    offers: [
      { '@type': 'Offer', name: 'Adult seat', price: concert.tickets.adult, priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Child seat', price: concert.tickets.child, priceCurrency: 'USD' },
    ],
  })));
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
