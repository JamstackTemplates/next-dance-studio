'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';

/** A <details> disclosure (works without JS) that closes itself after client-side navigation. */
export function MobileMenu({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => { if (ref.current) ref.current.open = false; }, [pathname]);
  return (
    <details ref={ref} className="group relative">
      <summary className="label-caps flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-line bg-surface/80 px-4 text-ink [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="grid gap-1">
          <span className="block h-0.5 w-4 bg-current transition group-open:translate-y-1.5 group-open:rotate-45" />
          <span className="block h-0.5 w-4 bg-current transition group-open:opacity-0" />
          <span className="block h-0.5 w-4 bg-current transition group-open:-translate-y-1.5 group-open:-rotate-45" />
        </span>
        Menu
      </summary>
      <div className="absolute right-0 top-[calc(100%+.75rem)] w-[min(20rem,calc(100vw-2.5rem))] rounded-xl border border-line bg-surface p-5 text-ink shadow-2xl">
        {children}
      </div>
    </details>
  );
}
