import { useState } from 'react';
import type { Language } from '../content/i18n';
import { gacImage, type GacImageId } from '../content/levels/gac-troi-images';

export function GacTroiImage({ id, language }: { id: GacImageId; language: Language }) {
  const image = gacImage(id);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  return <div className="gac-archive-image" aria-busy={status === 'loading'}>
    {status !== 'error' && <img key={attempt} src={`${image.src}${attempt ? `?retry=${attempt}` : ''}`} alt={image.alt[language]} onLoad={() => setStatus('ready')} onError={() => setStatus('error')}/>}
    {status === 'loading' && <span role="status">{language === 'vi' ? 'Đang tải ảnh…' : 'Loading picture…'}</span>}
    {status === 'error' && <div role="status"><p>{language === 'vi' ? 'Ảnh chưa tải được. Bạn vẫn có thể tiếp tục.' : 'The picture could not load. You can still continue.'}</p><button onClick={() => { setStatus('loading'); setAttempt(n => n + 1); }}>{language === 'vi' ? 'Thử lại' : 'Try again'}</button></div>}
  </div>;
}
