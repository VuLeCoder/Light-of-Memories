import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import type { SurveyorEvent, SurveyorProgress } from '../content/levels/surveyor-progress';
import { digCopy, memoryPhotos } from '../content/levels/surveyor-dig';

export function SurveyorExcavation({ language, progress, near, onChange, onBack, onBook, paused = false }: {
  language: Language; progress: SurveyorProgress; near: SurveyorEvent | null;
  onChange: (p: SurveyorProgress) => void; onBack: () => void; onBook: () => void;
  paused?: boolean;
}) {
  const t = digCopy[language];
  const photo = progress.phase === 'soil-memory' ? progress.pendingPhoto ?? progress.found.at(-1) : null;
  const [empty, setEmpty] = useState(false);
  const target = useRef<SurveyorEvent | null>(null);
  const remaining = useRef(1800);
  const photoButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!paused && photo) photoButton.current?.focus({ preventScroll: true }); }, [paused, photo]);
  const latest = useRef({ progress, onChange });
  latest.current = { progress, onChange };
  useEffect(() => {
    if (progress.phase !== 'digging' || paused) return;
    const id = target.current;
    const started = performance.now();
    const timer = window.setTimeout(() => {
      const { progress: p, onChange: change } = latest.current;
      target.current = null;
      remaining.current = 1800;
      if (!id) { setEmpty(true); change({ ...p, phase: 'soil' }); return; }
      const found = [...new Set([...p.found, id])];
      change({ ...p, found, pendingPhoto: id, phase: 'soil-memory' });
    }, remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [progress.phase, paused]);
  const startDig = () => {
    if (paused || progress.phase !== 'soil' || photo) return;
    setEmpty(false);
    remaining.current = 1800;
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
  }, [near, progress, photo, paused]);
  const busy = progress.phase === 'digging';
  const all = progress.found.length === 3;
  return <div className="excavation-overlay" style={paused ? { display: 'none' } : undefined}>
    <div className="excavation-top"><span>{t.title} · {progress.found.length}/3</span><button onClick={onBack} disabled={busy}>{language === 'vi' ? 'Về lộ trình' : 'Back to route'}</button></div>
    {photo ? <section className="excavation-photo" role="dialog" aria-modal="true" aria-label={t.found}>
      <figure className="memory-photo-frame"><img src={memoryPhotos[photo]} alt={t.descriptions[photo]} /><figcaption>NASA · {photo === 'arrive' ? '1967' : '1969'}</figcaption></figure>
      <div className="memory-photo-copy"><span className="memory-eyebrow">{t.found} · {progress.found.length}/3</span><h2>{t.names[photo]}</h2><p>{t.descriptions[photo]}</p><small>{t.fiction}</small>
      <button ref={photoButton} autoFocus onClick={() => { onChange({ ...progress, pendingPhoto: undefined, phase: all ? 'timeline-intro' : 'soil', turn: 0, order: [] });
        if (!all) requestAnimationFrame(() => document.querySelector<HTMLElement>('.game-host')?.focus({ preventScroll: true })); }}>{all ? t.finish : t.continue}</button></div>
    </section> : <div className="excavation-bottom">
      <p role="status">{busy ? t.digging : <><span className="dig-keyboard-controls">{t.hint}</span><span className="dig-touch-controls">{t.touchHint}</span></>}</p>
      {empty && !busy && <p className="excavation-result" role="status">{t.empty}</p>}
      <div><button onClick={onBook} disabled={busy}>{t.open}</button>
      {!all && <button disabled={busy} onClick={startDig}>{busy ? t.digging : t.dig}</button>}
      {all && <button onClick={() => onChange({ ...progress, phase: 'timeline-intro', turn: 0, order: [] })}>{t.finish}</button>}</div>
      <small className="dig-keyboard-controls">{t.controls}</small>
      <small className="dig-touch-controls">{t.touchControls}</small>
    </div>}
  </div>;
}
