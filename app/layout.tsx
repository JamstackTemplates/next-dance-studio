import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@fontsource/abril-fatface/400.css';
import '@fontsource-variable/league-spartan';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { ArtDefs } from '../components/art/stage';
import { RevealObserver, REVEAL_SCRIPT } from '../components/reveal';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { assertValidContent } from '../content/validate';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

// Fail the build with item-specific messages if an owner edit breaks a content rule.
assertValidContent();

const description = site.description || business.introduction;
const ogImage = { url: asset('/og.png'), width: 1200, height: 630, alt: `${business.name}: ${business.tagline}` };

export const metadata: Metadata = {
  title: { default: `${business.name} · Minneapolis dance studio`, template: `%s · ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: { type: 'website', siteName: business.name, title: business.name, description, images: [ogImage] },
  twitter: { card: 'summary_large_image', title: business.name, description, images: [ogImage.url] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3A1958' },
    { media: '(prefers-color-scheme: dark)', color: '#140E1F' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-US" suppressHydrationWarning>
    <head>
      <ThemeScript />
      <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
    </head>
    <body><ThemeProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <ArtDefs />
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
      <RevealObserver />
    </ThemeProvider></body>
  </html>;
}
