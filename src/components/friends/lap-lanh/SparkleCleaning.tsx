import { gameAudio } from '../../../audio/game-audio';
import { cleaningCopy } from '../../../content/friends/lap-lanh/challenges/cleaning';
import { useRef, useState } from 'react';
import type { Language } from '../../../content/i18n';

export function SparkleCleaning({ language, onComplete }: { language: Language; onComplete: () => void }) {
  const vi = language === 'vi';
  const [clean, setClean] = useState<number[]>([]);
  const cleaned = useRef<number[]>([]);
  const wipe = (id: number) => {
    if (cleaned.current.includes(id)) return;
    cleaned.current = [...cleaned.current, id];
    setClean(cleaned.current);
    if (cleaned.current.length === 24) gameAudio.cue('success');
  };
  const finished = clean.length === 24;
  return <div className="sparkle-card sparkle-cleaning">
    <div className="sparkle-cleaning-glass" data-audio-silent onPointerDown={event => event.preventDefault()} onPointerMove={event => {
      if (!event.buttons && event.pointerType !== 'touch') return;
      const cell = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLButtonElement>('[data-dust-cell]');
      if (cell && event.currentTarget.contains(cell)) wipe(Number(cell.dataset.dustCell));
    }}>
      <img draggable={false} src={`${import.meta.env.BASE_URL}images/sprites/lap-lanh-idle.webp`} alt={vi ? 'Bạn Lấp Lánh' : 'Twinkle'} />
      <div className="sparkle-dust-grid">{Array.from({ length: 24 }, (_, id) => <button key={id} data-dust-cell={id} className={clean.includes(id) ? 'clean' : ''}
        aria-label={`${vi ? 'Lau ô kính' : 'Wipe glass panel'} ${id + 1}`} aria-pressed={clean.includes(id)}
        onClick={() => wipe(id)} onPointerDown={event => { event.preventDefault(); wipe(id); }}
        onPointerEnter={event => { if (event.buttons === 1) wipe(id); }} />)}</div>
    </div>
    <div className="sparkle-cleaning-copy">
    <h2>{vi ? 'T02 · Cuội lau kính' : 'T02 · Clean the reflector'}</h2>
    <p role="status">{finished ? (cleaningCopy[language].complete) : `${vi ? 'Đã lau' : 'Cleaned'}: ${Math.round(clean.length / 24 * 100)}%`}</p>
    {finished && <p>{cleaningCopy[language].thanks}</p>}
    <button className="journey-primary" disabled={!finished} onClick={onComplete}>{vi ? 'Nhận bức ảnh thứ hai →' : 'Receive the second picture →'}</button>
    </div>
  </div>;
}
