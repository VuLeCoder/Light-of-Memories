import { copy, photos } from '../../../content/friends/gac-troi/ending-copy';
import { useEffect, useRef, useState } from 'react';
import type { Language } from '../../../content/i18n';
import type { GacTroiProgress } from '../../../content/friends/gac-troi/progress';
import { advanceGacDialogue } from '../../../content/friends/gac-troi/flow';
import { gacLightDialogue } from '../../../content/friends/gac-troi/challenges/light';
import { EarthDialogue } from '../../shared/EarthDialogue';

export function GacTroiEnding({ language, progress, onChange, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const t = copy[language];
  const page = progress.turn - 2;
  const heading = useRef<HTMLHeadingElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); if (!paused) heading.current?.focus({ preventScroll: true }); }, [page, paused]);
  const go = (turn: number) => { if (!paused) onChange({ ...progress, turn }); };
  if (page < 0) return <section className="ending-scene gac-meeting" hidden={paused} lang={language}>
    <EarthDialogue managedFocus language={language} paused={paused} title={t.title} lines={gacLightDialogue('t03-story', language)} initialIndex={progress.turn}
      onTurn={turn => { if (turn !== progress.turn) go(turn); }} finalAction="moon" finalLabel={vi ? 'Nghe Gác Trời kể' : 'Listen to Sky Watcher'} onComplete={() => go(2)} />
  </section>;
  return <section className="journey-view ending-recollection gac-recollection" hidden={paused} lang={language} aria-label={t.title}>
    <header><h2>{t.title}</h2></header>
    <div className="surveyor-ending">
      <figure className="ending-photo">
        {failed ? <div className="ending-photo-error" role="status"><p>{vi ? 'Ảnh chưa tải được.' : 'The picture could not load.'}</p><button onClick={() => setFailed(false)}>{vi ? 'Tải lại ảnh' : 'Retry image'}</button></div> : <img key={page} src={photos[page]} alt={t.captions[page]} onError={() => setFailed(true)} />}
        <figcaption>{t.captions[page]} · NASA/GSFC/Arizona State University</figcaption>
      </figure>
      <div className="ending-story-copy">
        <div className="ending-steps" aria-label={`${page + 1}/3`}>{photos.map((_, i) => <span key={i} className={i === page ? 'is-active' : ''} />)}</div>
        <h3 ref={heading} tabIndex={-1}>{t.headings[page]}</h3>
        <p className="ending-speech"><b>{vi ? 'Gác Trời' : 'Sky Watcher'}:</b> {t.stories[page]}</p>
        <p className="ending-note">{t.note}</p>
        <nav className="ending-actions" aria-label={t.title}>
          <button disabled={page === 0} onClick={() => go(progress.turn - 1)}>← {vi ? 'Trang trước' : 'Previous page'}</button>
          <button className="journey-primary" onClick={() => { if (!paused) page === 2 ? onChange(advanceGacDialogue(progress)) : go(progress.turn + 1); }}>{page === 2 ? (vi ? 'Trở lại bên Gác Trời' : 'Return to Sky Watcher') : (vi ? 'Trang tiếp' : 'Next page')} →</button>
        </nav>
      </div>
    </div>
  </section>;
}
