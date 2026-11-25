import { DarkModeToggle } from 'jamstacks';
import { SiteLink } from './site-link';
import { MobileMenu } from './mobile-menu';
import { Wordmark } from './wordmark';

export const NAV = [
  { href: '/classes/', label: 'Classes' },
  { href: '/timetable/', label: 'Timetable' },
  { href: '/concerts/', label: 'Concerts' },
  { href: '/uniform/', label: 'Uniform' },
  { href: '/contact/', label: 'Contact' },
] as const;

const link = 'label-caps relative rounded px-1.5 py-2 text-ink/80 no-underline transition-colors hover:text-primary-ink hover:no-underline aria-[current=page]:text-primary-ink after:pointer-events-none after:absolute after:inset-x-1.5 after:bottom-0.5 after:h-[2px] after:rounded-full after:bg-spotlight after:opacity-0 after:transition-opacity aria-[current=page]:after:opacity-100';
const mobileLink = 'label-caps block border-b border-line py-3.5 text-sm text-ink/85 no-underline transition-colors hover:text-primary-ink hover:no-underline aria-[current=page]:border-l-2 aria-[current=page]:border-l-spotlight aria-[current=page]:pl-3 aria-[current=page]:text-primary-ink';

/** Sleek editorial navigation bar matching the hero's ivory/midnight-plum palette. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-bg/92 text-ink backdrop-blur-md">
      <div aria-hidden="true" className="h-[2px] w-full bg-[linear-gradient(90deg,var(--primary)_0%,var(--spotlight)_50%,var(--primary)_100%)] opacity-85" />
      <div className="wrap flex min-h-20 items-center justify-between gap-4">
        <SiteLink href="/" className="text-ink no-underline hover:no-underline" aria-label="Pirouette & Pulse Dance, home">
          <Wordmark />
        </SiteLink>
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {NAV.map(item => <SiteLink key={item.href} href={item.href} markCurrent="page" className={link}>{item.label}</SiteLink>)}
          <SiteLink href="/contact/" className="button min-h-10 px-5 py-2 text-[.78rem]">Ask about a trial</SiteLink>
          <DarkModeToggle />
        </nav>
        <div className="flex items-center gap-3 lg:hidden">
          <DarkModeToggle />
          <MobileMenu>
            <nav aria-label="Main" className="grid gap-1">
              {NAV.map(item => <SiteLink key={item.href} href={item.href} markCurrent="page" className={mobileLink}>{item.label}</SiteLink>)}
              <SiteLink href="/contact/" className="button mt-4 w-full">Ask about a trial</SiteLink>
            </nav>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
