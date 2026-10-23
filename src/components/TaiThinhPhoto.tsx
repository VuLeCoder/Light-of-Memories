import { useState } from 'react';
import type { Language } from '../content/i18n';
import { taiThinhTaskCopy as copy, type taiThinhMemories } from '../content/levels/tai-thinh-content';

export function TaiThinhArchiveImage({ photo, language }: { photo: typeof taiThinhMemories[number]; language: Language }) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return <>{failed ? <div className="tai-photo-error" role="status"><p>{copy.photoError[language]}</p><button onClick={() => { setFailed(false); setAttempt(n => n + 1); }}>{copy.retry[language]}</button></div> : <img key={attempt} src={`${photo.src}${attempt ? `?retry=${attempt}` : ''}`} alt={photo.alt[language]} onError={() => setFailed(true)}/>}</>;
}

export function TaiThinhPhoto({ photo, language, onKeep }: { photo: typeof taiThinhMemories[number]; language: Language; onKeep: () => void }) {
  return <section className="excavation-photo tai-memory-photo" role="dialog" aria-labelledby="tai-receipt-title">
    <figure className="memory-photo-frame"><TaiThinhArchiveImage photo={photo} language={language}/><figcaption>{photo.caption[language]}</figcaption></figure>
    <div className="memory-photo-copy"><span className="memory-eyebrow">{language === 'vi' ? 'Nhận bức ảnh' : 'Picture received'}</span><h2 id="tai-receipt-title">{photo.title[language]}</h2><p>{photo.receipt[language]}</p><small>{photo.credit} · {photo.code}</small><button className="journey-primary" data-tai-primary onClick={onKeep}>{copy.keepPhoto[language]} →</button></div>
  </section>;
}
