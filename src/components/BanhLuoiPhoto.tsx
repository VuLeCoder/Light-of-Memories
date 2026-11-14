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
export function BanhLuoiPhotoView({ photo, language, framed = false }: { photo: Photo; language: Language; framed?: boolean }) {
  const [detail, setDetail] = useState(false);
  return <div className="ban-photo-view">
    <figure className={framed ? 'memory-photo-frame' : undefined}><BanhLuoiArchiveImage key={String(detail)} photo={photo} language={language} detail={detail}/>{framed && <figcaption>{photo.title[language]}</figcaption>}</figure>
    {photo.id === 'orbit' && detail && <p className="ban-photo-detail-caption">{copy['photoB.detailCaption'][language]}</p>}
    <button aria-pressed={detail} onClick={() => setDetail(v => !v)}>{detail ? copy['button.closeZoom'][language] : photo.id === 'vip' ? copy['button.wheelDetail'][language] : (language === 'vi' ? 'Xem vị trí xe' : 'Inspect the rover location')}</button>
  </div>;
}

export function BanhLuoiPhoto({ photo, language, onKeep }: { photo: Photo; language: Language; onKeep: () => void }) {
  return <section className="excavation-photo ban-memory-photo" role="dialog" aria-labelledby="ban-photo-title">
    <BanhLuoiPhotoView key={photo.id} photo={photo} language={language} framed/>
    <div className="memory-photo-copy"><span className="memory-eyebrow">{language === 'vi' ? 'Nhận bức ảnh' : 'Picture received'} · {photo.id === 'vip' ? 1 : 2}/2</span>
      <h2 id="ban-photo-title">{photo.title[language]}</h2>
      {photo.id === 'vip' && <p>{copy['wheels.correct'][language]}</p>}<p>{photo.caption[language]}</p>
      <small>{photo.credit} · {photo.code}</small>
      <a href={photo.source} target="_blank" rel="noreferrer">{copy['button.source'][language]} ↗</a>
      <button className="journey-primary" data-banh-primary onClick={onKeep}>{copy['button.keep'][language]} →</button>
    </div>
  </section>;
}
