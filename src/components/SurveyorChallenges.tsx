import { digCopy, memoryPhotos } from '../content/levels/surveyor-dig';
import { useEffect, useState } from 'react';
import type { Language } from '../content/i18n';
import { challengeCopy, challengeLines } from '../content/levels/surveyor-challenges';
import { eventOrder, type SurveyorProgress } from '../content/levels/surveyor-progress';
import { EarthDialogue } from './EarthDialogue';

export const surveyorVisitPhoto = `${import.meta.env.BASE_URL}assets/surveyor-apollo12.jpg`;
export function SurveyorChallenges({ language, progress, onChange }: { language: Language; progress: SurveyorProgress; onChange: (p: SurveyorProgress) => void }) {
  const t = challengeCopy[language];
  const [wrong, setWrong] = useState(false);
  const phase = progress.phase;
  useEffect(() => { setWrong(false); }, [phase]);
  const advance = (next: SurveyorProgress['phase']) => onChange({ ...progress, phase: next, turn: 0 });
  if (phase === 'soil-intro' || phase === 'timeline-intro') return <>
    {phase === 'timeline-intro' && <figure className="surveyor-history"><img src={surveyorVisitPhoto} alt={t.photo} /><figcaption>{t.photo}</figcaption></figure>}
    <EarthDialogue key={phase} language={language} paused={false} lines={challengeLines(language, phase === 'timeline-intro')} initialIndex={progress.turn} title={phase === 'soil-intro' ? t.soilTitle : t.timelineTitle} finalAction="moon" finalLabel={t.begin} onTurn={turn => { if (turn !== progress.turn) onChange({ ...progress, turn }); }} onComplete={() => advance(phase === 'soil-intro' ? 'soil' : 'timeline')} />
  </>;
  if (phase === 'timeline') return <>
    <p className="surveyor-instruction">{t.timelinePrompt}</p>
    <ol className="surveyor-timeline">{t.slots.map((slot, i) => <li key={slot}><small>{slot}</small>{progress.order[i] ? <button onClick={() => { setWrong(false); onChange({ ...progress, order: progress.order.filter((_, j) => j !== i) }); }}><img src={memoryPhotos[progress.order[i]]} alt={t.events[progress.order[i]]} />{t.events[progress.order[i]]} ×</button> : <span>…</span>}</li>)}</ol>
    <div className="surveyor-choice-grid">{(['visit', 'arrive', 'work'] as const).filter(id => progress.found.includes(id)).map(id => <button className="surveyor-photo-card" key={id} disabled={progress.order.includes(id)} onClick={() => { setWrong(false); onChange({ ...progress, order: [...progress.order, id] }); }}><img src={memoryPhotos[id]} alt={t.events[id]} /><small>{digCopy[language].descriptions[id]}</small></button>)}</div>
    <button disabled={progress.order.length !== 3} onClick={() => eventOrder.every((id, i) => progress.order[i] === id) ? advance('complete') : setWrong(true)}>{t.check}</button>
    <p role="status" className="surveyor-feedback">{wrong ? t.hint : '\u00a0'}</p>
  </>;
  return <div className="surveyor-memory"><span className="memory-light" aria-hidden="true">✦</span>
    <p>{t.soilResult}</p><p>{t.newEntry}</p>{phase === 'soil-memory' && <button className="journey-primary" onClick={() => advance('timeline-intro')}>{t.nextTimeline} →</button>}
  </div>;
}
