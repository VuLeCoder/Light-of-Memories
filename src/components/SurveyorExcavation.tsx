import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import type { SurveyorEvent, SurveyorProgress } from '../content/levels/surveyor-progress';
import { digCopy, memoryPhotos } from '../content/levels/surveyor-dig';

export function SurveyorExcavation({ language, progress, near, onChange, onBack, onBook }: {
  language: Language; progress: SurveyorProgress; near: SurveyorEvent | null;
  onChange: (p: SurveyorProgress) => void; onBack: () => void; onBook: () => void;
}) {
  const t = digCopy[language];
  const [photo, setPhoto] = useState<SurveyorEvent | null>(null);
  const target = useRef<SurveyorEvent | null>(null);
  const latest = useRef({ progress, onChange });
  latest.current = { progress, onChange };
  useEffect(() => {
    if (progress.phase !== 'digging') return;
    const id = target.current;
    const timer = window.setTimeout(() => {
      const { progress: p, onChange: change } = latest.current;
      target.current = null;
      if (!id) { change({ ...p, phase: 'soil' }); return; }
      const found = [...new Set([...p.found, id])];
      setPhoto(id);
      change({ ...p, found, phase: 'soil-memory' });
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [progress.phase]);
  const startDig = () => {
    if (progress.phase !== 'soil' || photo) return;
    target.current = near && !progress.found.includes(near) ? near : null;
    onChange({ ...progress, phase: 'digging' });
  };
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'KeyE' || event.repeat || !(event.target instanceof Element) || !event.target.closest('.game-host')) return;
      event.preventDefault();
      startDig();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [near, progress, photo]);
  const busy = progress.phase === 'digging';
  const all = progress.found.length === 3;
  return <div className="excavation-overlay">
    <div className="excavation-top"><span>{t.title} · {progress.found.length}/3</span><button onClick={onBack} disabled={busy}>{language === 'vi' ? 'Về lộ trình' : 'Back to route'}</button></div>
    {photo ? <section className="excavation-photo" role="dialog" aria-modal="true" aria-label={t.found}>
      <figure className="memory-photo-frame"><img src={memoryPhotos[photo]} alt={t.descriptions[photo]} /><figcaption>NASA · {photo === 'arrive' ? '1967' : '1969'}</figcaption></figure>
      <div className="memory-photo-copy"><span className="memory-eyebrow">{t.found} · {progress.found.length}/3</span><h2>{t.names[photo]}</h2><p>{t.descriptions[photo]}</p><small>{t.fiction}</small>
      <button autoFocus onClick={() => { setPhoto(null); onChange({ ...progress, phase: all ? 'timeline' : 'soil', order: [] });
        if (!all) requestAnimationFrame(() => document.querySelector<HTMLElement>('.game-host')?.focus({ preventScroll: true })); }}>{all ? t.finish : t.continue}</button></div>
    </section> : <div className="excavation-bottom">
      <p role="status">{busy ? t.digging : t.hint}</p>
      <div><button onClick={onBook} disabled={busy}>{t.open}</button>
      {!all && <button disabled={busy} onClick={startDig}>{busy ? t.digging : t.dig}</button>}
      {all && <button onClick={() => onChange({ ...progress, phase: 'timeline', order: [] })}>{t.finish}</button>}</div>
      <small>{t.controls}</small>
    </div>}
  </div>;
}
