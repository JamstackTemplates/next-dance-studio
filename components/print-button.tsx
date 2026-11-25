'use client';

import { useEffect, useState } from 'react';

/** Appears only with JavaScript; browsers' own Print command works everywhere. */
export function PrintButton() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(typeof window.print === 'function'), []);
  if (!ready) return null;
  return <button type="button" className="button button-quiet" onClick={() => window.print()}>Print the kit list</button>;
}
