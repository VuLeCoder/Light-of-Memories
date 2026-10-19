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
    if (!id) { onChange({ ...progress, phase: 'soil' }); return; }
    const timer = window.setTimeout(() => {
      const { progress: p, onChange: change } = latest.current;
      const found = [...new Set([...p.found, id])];
      setPhoto(id);
      change({ ...p, found, phase: 'soil-memory' });
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [progress.phase]);
  const busy = progress.phase === 'digging';
  const all = progress.found.length === 3;
  return <div className="excavation-overlay">
    <div className="excavation-top"><span>{t.title} · {progress.found.length}/3</span><button onClick={onBack} disabled={busy}>{language === 'vi' ? 'Về lộ trình' : 'Back to route'}</button></div>
    {photo ? <section className="excavation-photo" role="dialog" aria-modal="true" aria-label={t.found}>
      <img src={memoryPhotos[photo]} alt={t.descriptions[photo]} /><p>{t.descriptions[photo]}</p><small>NASA · {t.fiction}</small>
      <button autoFocus onClick={() => { setPhoto(null); onChange({ ...progress, phase: all ? 'timeline' : 'soil', order: [] });
        if (!all) requestAnimationFrame(() => document.querySelector<HTMLElement>('.game-host')?.focus({ preventScroll: true })); }}>{all ? t.finish : t.continue}</button>
    </section> : <div className="excavation-bottom">
      <p role="status">{busy ? t.digging : near ? progress.clues.includes(near) ? t.names[near] : t.unread : t.hint}</p>
      <div><button onClick={onBook} disabled={busy}>{t.open}</button>
      {near && progress.clues.includes(near) && !all && <button disabled={busy} onClick={() => { target.current = near; onChange({ ...progress, phase: 'digging' }); }}>{busy ? t.digging : t.dig}</button>}
      {all && <button onClick={() => onChange({ ...progress, phase: 'timeline', order: [] })}>{t.finish}</button>}</div>
      <small>{t.controls}</small>
    </div>}
  </div>;
}
