import { useState } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy } from '../content/levels/ban-banh-luoi-content';
import { banBanhLuoiMemories } from '../content/levels/ban-banh-luoi-memories';
import './banh-luoi.css';

type Photo = typeof banBanhLuoiMemories[number];
export function BanhLuoiArchiveImage({ photo, language, detail = false }: { photo: Photo; language: Language; detail?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const src = detail ? photo.detailSrc : photo.src;
  return failed ? <div className="ban-photo-error" role="status"><p>{language === 'vi' ? 'Ảnh chưa tải được. Bạn vẫn có thể tiếp tục.' : 'The photo could not load. You can still continue.'}</p><button onClick={() => { setFailed(false); setAttempt(n => n + 1); }}>{copy['button.retry'][language]}</button></div>
    : <img key={`${src}-${attempt}`} src={`${src}${attempt ? `?retry=${attempt}` : ''}`} alt={(detail ? photo.detailAlt : photo.alt)[language]} onError={() => setFailed(true)}/>;
}

/** The detail view replaces the image, keeping all actions reachable by keyboard. */
export function BanhLuoiPhotoView({ photo, language }: { photo: Photo; language: Language }) {
  const [detail, setDetail] = useState(false);
  return <div className="ban-photo-view">
    <figure><BanhLuoiArchiveImage key={String(detail)} photo={photo} language={language} detail={detail}/></figure>
    <button aria-pressed={detail} onClick={() => setDetail(v => !v)}>{copy[detail ? 'button.closeZoom' : 'button.wheelDetail'][language]}</button>
  </div>;
}

export function BanhLuoiPhoto({ photo, language, onKeep }: { photo: Photo; language: Language; onKeep: () => void }) {
  return <section className="ban-panel ban-receipt" aria-labelledby="ban-photo-title">
    <BanhLuoiPhotoView photo={photo} language={language}/>
    <div><span className="memory-eyebrow">{language === 'vi' ? 'Nhận bức ảnh' : 'Picture received'}</span>
      <h2 id="ban-photo-title">{photo.title[language]}</h2>
      <p>{copy['wheels.correct'][language]}</p><p>{photo.caption[language]}</p>
      <small>{photo.credit} · {photo.code}</small>
      <a href={photo.source} target="_blank" rel="noreferrer">{copy['button.source'][language]} ↗</a>
      <button className="ban-primary" data-banh-primary onClick={onKeep}>{copy['button.keep'][language]} →</button>
    </div>
  </section>;
}
