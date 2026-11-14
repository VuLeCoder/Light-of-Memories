import { useEffect, useState } from 'react';
import { copy, type Language } from '../content/i18n';

// Share the request across mounts, including React StrictMode's effect replay.
let countRequest: Promise<number> | undefined;
function loadCount() {
  return countRequest ??= (async () => {
    let visitorId: string | null = null;
    try { visitorId = localStorage.getItem('cuoi.visitor'); } catch { /* Storage may be blocked. */ }
    if (!visitorId || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitorId)) {
      visitorId = crypto.randomUUID();
      try { localStorage.setItem('cuoi.visitor', visitorId); } catch { /* Use this page's identity. */ }
    }
    const response = await fetch('/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Counter unavailable');
    const data = await response.json();
    if (!Number.isSafeInteger(data.total) || data.total < 0) throw new Error('Invalid count');
    return data.total as number;
  })();
}

export function VisitorCounter({ language }: { language: Language }) {
  const [total, setTotal] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    let active = true;
    loadCount().then((value) => { if (active) setTotal(value); })
      .catch(() => { if (active) setUnavailable(true); });
    return () => { active = false; };
  }, []);
  const t = copy[language];
  return <div className="visitor-counter" title={t.visitorExplanation} role="status">
    <span aria-hidden="true">✦</span>
    <span>{t.visitors}: <strong>{total !== null ? new Intl.NumberFormat(language).format(total) : unavailable ? t.visitorsUnavailable : '…'}</strong></span>
  </div>;
}
