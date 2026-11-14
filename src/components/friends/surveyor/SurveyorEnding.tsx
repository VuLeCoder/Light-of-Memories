import { endingCopy } from '../../../content/friends/surveyor/ending-copy';
import { useEffect, useRef, useState } from 'react';
import type { Language } from '../../../content/i18n';
import type { SurveyorProgress } from '../../../content/friends/surveyor/progress';
import { digCopy } from '../../../content/friends/surveyor/challenges/excavation';
import { memoryPhotos } from '../../../content/friends/surveyor/images';
import { eventOrder } from '../../../content/friends/surveyor/progress';
import { EarthDialogue } from '../../shared/EarthDialogue';
import { LanternGiftPause, useLanternGiftPause } from '../../shared/LanternGiftPause';

function MemoryPhoto({ src, caption, language }: { src: string; caption: string; language: Language }) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return <figure className="ending-photo">
    {failed ? <div className="ending-photo-error" role="status"><p>{endingCopy[language].unavailable}</p><button onClick={() => { setFailed(false); setAttempt(n => n + 1); }}>{endingCopy[language].retry}</button></div>
      : <img key={attempt} src={src} alt={caption} onError={() => setFailed(true)} />}
    <figcaption>{caption}</figcaption>
  </figure>;
}

export function SurveyorEnding({ language, progress, onChange, onReplay, onBack, paused = false, stars = 0 }: {
  language: Language; progress: SurveyorProgress; onChange: (p: SurveyorProgress) => void; onReplay: () => void; onBack: () => void; paused?: boolean; stars?: number;
}) {
  const t = endingCopy[language];
  // 0–2: lunar conversation; 3–5: recollection; 6–9: lantern conversation; 10: farewell.
  const step = Math.min(progress.turn, 10);
  const recollection = step >= 3 && step <= 5;
  const page = step - 3;
  const lit = step >= 7;
  const gifting = useLanternGiftPause(step === 7, paused);
  const primary = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!paused && recollection) primary.current?.focus({ preventScroll: true }); }, [step, paused, recollection]);
  const go = (turn: number) => {
    onChange({ ...progress, turn });
  };
  if (recollection) return <section className="journey-view ending-recollection" hidden={paused} lang={language} aria-label={t.title}>
    <header><span aria-hidden="true">★ ★ ★</span><h2>{t.title}</h2></header>
    <div className="surveyor-ending">
      <MemoryPhoto key={page} src={memoryPhotos[eventOrder[page]]} caption={t.captions[page]} language={language} />
      <div className="ending-story-copy">
      <div className="ending-steps" aria-label={`${page + 1}/3`}>{eventOrder.map((id, index) => <span key={id} className={index === page ? 'is-active' : ''} />)}</div>
      <h3>{t.labels[page]}</h3>
      <p className="ending-speech"><b>{language === 'vi' ? 'Mắt Tròn' : 'Round Eye'}:</b> {t.stories[page]}</p>
      <p className="ending-note">{t.journal}</p>
      <nav className="ending-actions" aria-label={t.title}>
        <button disabled={page === 0} onClick={() => go(step - 1)}>← {t.before}</button>
        <button ref={primary} className="journey-primary" onClick={() => go(step + 1)}>{page === 2 ? t.return : t.next} →</button>
      </nav>
      <small className="ending-fiction">{digCopy[language].fiction}</small>
      </div>
    </div>
  </section>;
  return <section className={`ending-scene${step === 10 ? ' is-exploring' : ''}`} hidden={paused} lang={language} aria-label={t.title}>
    <div className="surveyor-scene-hud"><span>{t.title}</span>{lit && <strong role="status">★ {Math.max(stars, 1)}/5</strong>}</div>
    {step >= 8 && <span className="ending-distant-light" role="img" aria-label={t.distant} />}
    {gifting ? <LanternGiftPause language={language}/> : step < 3 ? <EarthDialogue key="ending-intro" language={language} paused={paused} lines={t.intro} initialIndex={step} title={t.title} finalAction="moon" finalLabel={t.listen} onTurn={index => { if (index !== step) go(index); }} onComplete={() => go(3)} />
      : step < 10 ? <EarthDialogue key="ending-outro" language={language} paused={paused} lines={t.outro} initialIndex={step - 6} title={t.title} finalAction="moon" finalLabel={t.carry} onTurn={index => { if (index + 6 !== step) go(index + 6); }} onComplete={() => go(10)} />
      : <div className="ending-farewell">
        <nav className="ending-actions" aria-label={t.title}>
          <button onClick={() => go(0)}>{t.replay}</button><button onClick={onReplay}>{progress.replayCheckpoint ? (language === 'vi' ? 'Tiếp tục chơi lại' : 'Continue replay') : t.playAgain}</button><button className="journey-primary" onClick={onBack}>{t.route} →</button>
        </nav>
      </div>}
  </section>;
}
