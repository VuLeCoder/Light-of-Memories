import { useEffect, useRef } from 'react';
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
  const primary = useRef<HTMLButtonElement>(null);
  const page = p.phase === 'recallA' ? 0 : p.phase === 'recallB' ? 1 : -1;
  useEffect(() => { if (!paused && page >= 0) primary.current?.focus({ preventScroll: true }); }, [page, paused]);
  const go = (phase: BanhLuoiProgress['phase']) => { if (!paused) onChange({ ...p, phase, turn: 0 }); };
  if (page >= 0) {
    const photo = banBanhLuoiMemories[page === 0 ? 0 : 1];
    const key = page === 0 ? 'recallA' : 'recallB';
    return <section className="ban-panel ban-recollection" aria-labelledby="ban-recall-title">
      <div><span>{page + 1}/2 · {page === 0 ? '12/1972' : '8/2011'}</span><h2 id="ban-recall-title">{copy[`${key}.title`][language]}</h2>
        <BanhLuoiPhotoView key={photo.id} photo={photo} language={language}/>
        <small>{photo.credit} · {photo.code}</small><a href={photo.source} target="_blank" rel="noreferrer">{copy['button.source'][language]} ↗</a></div>
      <div><p>{copy[`${key}.body`][language]}</p><nav className="ban-route-actions" aria-label={vi ? 'Trang hồi tưởng' : 'Memory pages'}>
        <button disabled={page === 0} onClick={() => go('recallA')}>← {copy['button.previousPage'][language]}</button>
        <button ref={primary} data-banh-primary className="ban-primary" onClick={() => go(page === 0 ? 'recallB' : 'farewell')}>{page === 0 ? copy['button.nextPage'][language] : vi ? 'Trở lại bên Bánh Lưới' : 'Return to Mesh Wheels'} →</button>
      </nav></div>
    </section>;
  }
  if (p.phase === 'finished') return <div className="ban-ending-actions">
    <p>{copy['objective.finished'][language]}</p><nav className="ban-route-actions">
      <button data-banh-primary onClick={() => onPreview(true)}>{copy['button.replayEnding'][language]}</button>
      <button onClick={() => onChange(replayBanhLuoi(p))}>{copy['button.replay'][language]}</button>
      <button className="ban-primary" onClick={onBack}>{copy['button.back'][language]} →</button>
    </nav>
  </div>;
  const gifting = p.phase === 'gift' && !p.completedOnce;
  if (gifting) return <p className="ban-gift-status" role="status">{vi ? 'Một chút ký ức đang tìm đến chiếc đèn của Cuội…' : 'A little memory is reaching Cuội’s lantern…'}</p>;
  const afterGift = p.phase === 'gift';
  return <EarthDialogue key={p.phase} language={language} paused={paused} title={copy['identity.name'][language]}
    lines={banBanhLuoiDialogue(language, afterGift ? 'giftAfter' : 'farewell')} initialIndex={afterGift ? Math.max(0, p.turn - 1) : p.turn}
    onTurn={turn => { const savedTurn = afterGift ? turn + 1 : turn; if (!paused && savedTurn !== p.turn) onChange({ ...p, turn: savedTurn }); }}
    finalAction="moon" finalLabel={afterGift ? (vi ? 'Mang theo ánh sáng' : 'Carry the light') : (vi ? 'Đón ánh sáng' : 'Receive the light')}
    onComplete={() => { if (preview && afterGift) onPreview(false); else go(afterGift ? 'finished' : 'gift'); }}/>
}
