'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Inline head script: marks the page for reveal-on-scroll before first paint. If this component never
 * hydrates, the fallback removes the mark so no content stays hidden.
 */
export const REVEAL_SCRIPT = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: no-preference)').matches)return;var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!window.__ppReveal)d.classList.remove('js')},2500)}catch(e){}})();`;

/** Adds .is-in to .reveal elements as they enter the viewport; re-runs after client navigation. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    (window as unknown as { __ppReveal?: boolean }).__ppReveal = true;
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'));
    if (!('IntersectionObserver' in window)) { items.forEach(item => item.classList.add('is-in')); return; }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-in'); observer.unobserve(entry.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
