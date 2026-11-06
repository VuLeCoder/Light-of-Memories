import { useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import type { GacTroiProgress } from '../content/levels/gac-troi-progress';
import { advanceGacDialogue, findGacImpact } from '../content/levels/gac-troi-flow';
import { checkImpactPoint, gacT02Story, impactCredit, impactDate, impactSource } from '../content/levels/gac-troi-impact';
import { GacImpactPhoto } from './GacImpactPhoto';
import { EarthDialogue } from './EarthDialogue';

export function GacTroiImpact({ language, progress, onChange, onBook, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void; onBook: () => void; paused: boolean;
}) {
  const vi = language === 'vi', story = progress.phase === 't02-story';
  const [when, setWhen] = useState<'before' | 'after'>('before');
  const [wrong, setWrong] = useState(false);
  const [region, setRegion] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const locked = useRef(false);
  const answer = (correct: boolean | null) => {
    if (paused || story || !ready || locked.current || correct === null) return;
    if (!correct) { setWrong(true); return; }
    locked.current = true;
    setRegion(null); setWrong(false); onChange(findGacImpact(progress));
  };
  const shown = story ? 'after' : when;
  return <div className={`gac-impact${story ? ' gac-impact-story' : ''}`}>
    <header><h2>{vi ? 'Đốm mới trong bức ảnh' : 'A new mark in the picture'}</h2>
      <span>{vi ? 'Va chạm: 17/03/2013' : 'Impact: 17 Mar 2013'}</span></header>
    {!story && <p className="gac-impact-instruction">{vi ? 'Đổi Trước/Sau, rồi chọn vùng có dấu vết mới.' : 'Switch Before/After, then choose the area with a new mark.'}</p>}
    <figure>
      <div className="gac-impact-frame" onClick={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        answer(checkImpactPoint(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height));
      }}>
        <GacImpactPhoto key={shown} when={shown} language={language} annotation={story ? 'answer' : undefined} region={region} onReady={setReady}/>
      </div>
      <figcaption><span>{impactDate(shown, language)}</span><a href={impactSource} target="_blank" rel="noreferrer">{impactCredit} ↗</a></figcaption>
    </figure>
    {story ? <EarthDialogue key="impact-story" managedFocus language={language} paused={paused} title={vi ? 'Chớp sáng và chiếc hố' : 'A flash and a crater'}
      lines={gacT02Story(language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(advanceGacDialogue(progress)); }} finalAction="moon" finalLabel={vi ? 'Giữ câu chuyện này' : 'Keep this story'}/>
      : <>
        <div className="gac-impact-switch" role="group" aria-label={vi ? 'Thời điểm chụp' : 'Picture date'}>{(['before', 'after'] as const).map(value => <button key={value} aria-pressed={when === value} disabled={paused} onClick={() => { if (when !== value) { setReady(false); setWhen(value); } }}>{vi ? (value === 'before' ? 'Trước' : 'Sau') : (value === 'before' ? 'Before' : 'After')}</button>)}<button onClick={onBook} disabled={paused}>{vi ? 'Gợi ý' : 'Hint'} ▤</button></div>
        <div className="gac-impact-regions" role="group" aria-label={vi ? 'Chọn vùng' : 'Choose an area'}>{(vi ? ['Bên trái', 'Ở giữa', 'Bên phải'] : ['Left', 'Middle', 'Right']).map((name, i) => <button key={i} disabled={paused || !ready} onFocus={() => setRegion(i)} onBlur={() => setRegion(null)} onMouseEnter={() => setRegion(i)} onMouseLeave={() => setRegion(null)} onClick={() => answer(i === 1)}>{name}</button>)}</div>
        <p className="gac-impact-response" role="status">{wrong ? (vi ? 'Thử đổi ảnh lần nữa nhé. Tìm chỗ trước chưa có đốm sáng.' : 'Try switching pictures again. Look for a bright spot that wasn’t there before.') : '\u00a0'}</p>
      </>}
  </div>;
}
