import { useEffect, useRef } from 'react';
import type { Language } from '../content/i18n';
import { taiThinhDialogue, taiThinhMemories, taiThinhTaskCopy as copy } from '../content/levels/tai-thinh-content';
import { replayTaiThinh, type TaiThinhProgress } from '../content/levels/tai-thinh-progress';
import { EarthDialogue } from './EarthDialogue';
import { TaiThinhArchiveImage } from './TaiThinhPhoto';

export function TaiThinhEnding({ language, progress: p, onChange, onBack, paused, stars }: {
  language: Language; progress: TaiThinhProgress; onChange: (p: TaiThinhProgress) => void; onBack: () => void; paused: boolean; stars: number;
}) {
  const vi = language === 'vi';
  const title = vi ? 'Câu chuyện của Tai Thính' : 'Keen Ears’ story';
  const phases = ['recallA', 'recallB', 'recallC'] as const;
  const page = phases.findIndex(phase => phase === p.phase);
  const primary = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!paused && page >= 0) primary.current?.focus({ preventScroll: true }); }, [page, paused]);
  const go = (phase: TaiThinhProgress['phase'], recallIndex = p.recallIndex) => {
    if (!paused) onChange({ ...p, phase, recallIndex, turn: 0 });
  };
  if (page >= 0) {
    const photo = taiThinhMemories[page];
    return <section className="journey-view ending-recollection tai-recollection" aria-label={title}>
      <header><span>{page + 1}/3 · 19/11/1969</span><h2>{title}</h2></header>
      <div className="surveyor-ending">
        <figure className="ending-photo"><TaiThinhArchiveImage key={photo.id} photo={photo} language={language}/><figcaption>{photo.caption[language]}<br/>{photo.credit} · {photo.code}</figcaption></figure>
        <div className="ending-story-copy">
          <div className="ending-steps" aria-label={`${page + 1}/3`}>{phases.map((phase, i) => <span key={phase} className={i === page ? 'is-active' : ''}/>)}</div>
          <h3>{photo.title[language]}</h3>
          <p className="ending-speech"><b>{vi ? 'Tai Thính' : 'Keen Ears'}:</b> {photo.recall[language]}</p>
          <nav className="ending-actions" aria-label={title}>
            <button disabled={page === 0} onClick={() => go(phases[page - 1], page - 1)}>← {vi ? 'Trang trước' : 'Previous page'}</button>
            <button ref={primary} data-tai-primary className="journey-primary" onClick={() => go(page === 2 ? 'farewell' : phases[page + 1], Math.min(2, page + 1))}>{page === 2 ? (vi ? 'Trở lại bên Tai Thính' : 'Return to Keen Ears') : (vi ? 'Trang tiếp' : 'Next page')} →</button>
          </nav>
          <small className="ending-fiction">{copy.fiction[language]}</small>
        </div>
      </div>
    </section>;
  }
  const gifting = p.phase === 'gift' && p.turn === 0;
  return <section className={`ending-scene tai-ending-scene${p.phase === 'finished' ? ' is-exploring' : ''}`} aria-label={title}>
    <div className="surveyor-scene-hud"><span>{title}</span><strong role="status">★ {stars}/5</strong></div>
    {gifting ? <p className="tai-gift-status" role="status">{vi ? 'Một chút ánh sáng đang tìm đến chiếc đèn của Cuội…' : 'A little light is reaching Cuội’s lantern…'}</p>
      : p.phase === 'finished' ? <div className="ending-farewell"><nav className="ending-actions" aria-label={title}>
        <button data-tai-primary onClick={() => go('memoriesIntro', 0)}>{copy.replayEnding[language]}</button>
        <button onClick={() => { if (!paused) onChange(replayTaiThinh(p)); }}>{copy.playAgain[language]}</button>
        <button className="journey-primary" onClick={onBack}>{copy.route[language]} →</button>
      </nav></div>
      : <EarthDialogue key={p.phase} language={language} paused={paused} title={title} lines={taiThinhDialogue(language, 'farewell').slice(p.phase === 'gift' ? 5 : 0, p.phase === 'gift' ? 6 : 5)} initialIndex={p.phase === 'gift' ? 0 : p.turn} onTurn={turn => { if (!paused && p.phase === 'farewell' && turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon" finalLabel={p.phase === 'gift' ? (vi ? 'Mang theo ánh sáng' : 'Carry the light') : (vi ? 'Đón ánh sáng' : 'Receive the light')} onComplete={() => go(p.phase === 'gift' ? 'finished' : 'gift')}/>}
  </section>;
}
