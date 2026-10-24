import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy, banBanhLuoiDialogue } from '../content/levels/ban-banh-luoi-content';
import { banBanhLuoiMemories } from '../content/levels/ban-banh-luoi-memories';
import { replayBanhLuoi, type BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { BanhLuoiPhotoView } from './BanhLuoiPhoto';
import { EarthDialogue } from './EarthDialogue';

export function BanhLuoiEnding({ language, progress: p, onChange, onBack, paused, stars, preview, onPreview }: {
  language: Language; progress: BanhLuoiProgress; onChange: (p: BanhLuoiProgress) => void;
  onBack: () => void; paused: boolean; stars: number; preview: boolean; onPreview: (value: boolean) => void;
}) {
  const vi = language === 'vi';
  const title = vi ? 'Câu chuyện của Bánh Lưới' : 'Mesh Wheels’ story';
  const page = p.phase === 'recallA' ? 0 : p.phase === 'recallB' ? 1 : -1;
  const go = (phase: BanhLuoiProgress['phase']) => { if (!paused) onChange({ ...p, phase, turn: 0 }); };
  if (page >= 0) {
    const photo = banBanhLuoiMemories[page === 0 ? 0 : 1];
    const key = page === 0 ? 'recallA' : 'recallB';
    return <section className="journey-view ending-recollection ban-recollection" aria-labelledby="ban-recall-title" lang={language}>
      <header><span>{page + 1}/2 · {page === 0 ? '12/1972' : '8/2011'}</span><h2 id="ban-recall-title">{title}</h2></header>
      <div className="surveyor-ending">
        <div className="ending-photo"><BanhLuoiPhotoView key={photo.id} photo={photo} language={language}/>
          <p className="ban-recall-caption">{photo.caption[language]}<br/>{photo.credit} · {photo.code}<br/><a href={photo.source} target="_blank" rel="noreferrer">{copy['button.source'][language]} ↗</a></p></div>
        <div className="ending-story-copy">
          <div className="ending-steps" aria-label={`${page + 1}/2`}>{[0, 1].map(i => <span key={i} className={i === page ? 'is-active' : ''}/>)}</div>
          <h3>{copy[`${key}.title`][language]}</h3>
          <p className="ending-speech"><b>{copy['identity.name'][language]}:</b> {copy[`${key}.body`][language]}</p>
          <p className="ending-note">{vi ? 'Hai bức ảnh đã được lưu trong sổ tay của Cuội.' : 'Both photographs are now in Cuội’s notebook.'}</p>
          <nav className="ending-actions" aria-label={vi ? 'Trang hồi tưởng' : 'Memory pages'}>
            <button disabled={page === 0} onClick={() => go('recallA')}>← {copy['button.previousPage'][language]}</button>
            <button data-banh-primary className="journey-primary" onClick={() => go(page === 0 ? 'recallB' : 'farewell')}>{page === 0 ? copy['button.nextPage'][language] : vi ? 'Trở lại bên Bánh Lưới' : 'Return to Mesh Wheels'} →</button>
          </nav>
        </div>
      </div>
    </section>;
  }
  const gifting = p.phase === 'gift' && (preview ? p.turn === 0 : !p.completedOnce);
  const afterGift = p.phase === 'gift';
  return <section className={`ending-scene ban-ending-scene${p.phase === 'finished' ? ' is-exploring' : ''}`} aria-label={title} lang={language}>
    <div className="surveyor-scene-hud"><span>{title}</span><strong role="status">★ {stars}/5</strong></div>
    {p.phase === 'finished' ? <div className="ending-farewell ban-ending-actions">
      <p>{copy['objective.finished'][language]}</p><nav className="ending-actions" aria-label={title}>
        <button data-banh-primary onClick={() => { if (!paused) onPreview(true); }}>{copy['button.replayEnding'][language]}</button>
        <button onClick={() => { if (!paused) onChange(replayBanhLuoi(p)); }}>{copy['button.replay'][language]}</button>
        <button className="journey-primary" onClick={onBack}>{copy['button.back'][language]} →</button>
      </nav>
    </div> : gifting ? <p className="ban-gift-status" role="status">{vi ? 'Một chút ký ức đang tìm đến chiếc đèn của Cuội…' : 'A little memory is reaching Cuội’s lantern…'}</p>
    : <EarthDialogue managedFocus key={p.phase} language={language} paused={paused} title={title}
    lines={banBanhLuoiDialogue(language, afterGift ? 'giftAfter' : 'farewell')} initialIndex={afterGift ? Math.max(0, p.turn - 1) : p.turn}
    onTurn={turn => { const savedTurn = afterGift ? turn + 1 : turn; if (!paused && savedTurn !== p.turn) onChange({ ...p, turn: savedTurn }); }}
    finalAction="moon" finalLabel={afterGift ? (vi ? 'Mang theo ánh sáng' : 'Carry the light') : (vi ? 'Đón ánh sáng' : 'Receive the light')}
    onComplete={() => { if (preview && afterGift) onPreview(false); else go(afterGift ? 'finished' : 'gift'); }}/>}
  </section>;
}
