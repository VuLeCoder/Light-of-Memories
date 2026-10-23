import { useState } from 'react';
import type { Language } from '../content/i18n';

export function SparkleCleaning({ language, onComplete }: { language: Language; onComplete: () => void }) {
  const vi = language === 'vi';
  const [clean, setClean] = useState<number[]>([]);
  const wipe = (id: number) => setClean(previous => previous.includes(id) ? previous : [...previous, id]);
  const finished = clean.length === 24;
  return <div className="sparkle-card sparkle-cleaning">
    <div className="sparkle-cleaning-glass" onPointerDown={event => event.preventDefault()} onPointerMove={event => {
      if (!event.buttons && event.pointerType !== 'touch') return;
      const cell = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLButtonElement>('[data-dust-cell]');
      if (cell && event.currentTarget.contains(cell)) wipe(Number(cell.dataset.dustCell));
    }}>
      <img draggable={false} src={`${import.meta.env.BASE_URL}images/sprites/lap-lanh-idle.webp`} alt={vi ? 'Bạn Lấp Lánh' : 'Sparkle'} />
      <div className="sparkle-dust-grid">{Array.from({ length: 24 }, (_, id) => <button key={id} data-dust-cell={id} className={clean.includes(id) ? 'clean' : ''}
        aria-label={`${vi ? 'Lau ô kính' : 'Wipe glass panel'} ${id + 1}`} aria-pressed={clean.includes(id)}
        onClick={() => wipe(id)} onPointerDown={event => { event.preventDefault(); wipe(id); }}
        onPointerEnter={event => { if (event.buttons === 1) wipe(id); }} />)}</div>
    </div>
    <div className="sparkle-cleaning-copy">
    <h2>{vi ? 'T02 · Cuội lau kính' : 'T02 · Clean the reflector'}</h2>
    <p role="status">{finished ? (vi ? 'Sạch rồi! Bạn Lấp Lánh sáng trở lại.' : 'All clean! Sparkle shines again.') : `${vi ? 'Đã lau' : 'Cleaned'}: ${Math.round(clean.length / 24 * 100)}%`}</p>
    {finished && <p>{vi ? 'Lấp Lánh: “Cảm ơn Cuội! Mình còn giữ một bức ảnh lúc vừa đến đây. Tặng bạn thêm một kỷ niệm nhé!”' : 'Sparkle: “Thank you, Cuội! I have another picture from when I first arrived. Here is one more memory for you!”'}</p>}
    <button className="journey-primary" disabled={!finished} onClick={onComplete}>{vi ? 'Nhận bức ảnh thứ hai →' : 'Receive the second picture →'}</button>
    </div>
  </div>;
}
