import { useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import type { GacTroiProgress } from '../content/levels/gac-troi-progress';
import { advanceGacDialogue, findGacImpact } from '../content/levels/gac-troi-flow';
import { gacT02Story, impactCredit, impactDate, impactSource } from '../content/levels/gac-troi-impact';
import { GacImpactPhoto } from './GacImpactPhoto';
import { EarthDialogue } from './EarthDialogue';

export function GacTroiImpact({ language, progress, onChange, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void; paused: boolean;
}) {
  const vi = language === 'vi', story = progress.phase === 't02-story';
  const [loaded, setLoaded] = useState({ before: false, after: false });
  const [wrong, setWrong] = useState(false);
  const [region, setRegion] = useState<number | null>(null);
  const ready = loaded.before && loaded.after;
  const locked = useRef(false);
  const answer = (correct: boolean | null) => {
    if (paused || story || !ready || locked.current || correct === null) return;
    if (!correct) { setWrong(true); return; }
    locked.current = true;
    setRegion(null); setWrong(false); onChange(findGacImpact(progress));
  };

  return <div className={`gac-impact${story ? ' gac-impact-story' : ''}`}>
    <header><h2>{vi ? 'Đốm mới trong bức ảnh' : 'A new mark in the picture'}</h2>
      <span>{vi ? 'Va chạm: 17/03/2013' : 'Impact: 17 Mar 2013'}</span></header>
    {!story && <p className="gac-impact-instruction">{vi ? 'Nhìn hai ảnh. Vùng nào có thêm đốm sáng? Chọn 1, 2 hoặc 3.' : 'Look at both pictures. Which area has a new bright spot? Choose 1, 2 or 3.'}</p>}
    <div className={story ? 'gac-impact-result' : 'gac-impact-pair'}>
      {(story ? ['after'] as const : ['before', 'after'] as const).map(when => <figure key={when}>
        <strong>{vi ? (when === 'before' ? 'TRƯỚC' : 'SAU') : (when === 'before' ? 'BEFORE' : 'AFTER')}</strong>
        <div className="gac-impact-frame">
          <GacImpactPhoto when={when} language={language} annotation={story ? 'answer' : undefined} region={region}
            onReady={value => setLoaded(previous => previous[when] === value ? previous : { ...previous, [when]: value })}/>
          {!story && <div className="gac-impact-grid" aria-hidden="true">{[1, 2, 3].map(n => <span key={n}>{n}</span>)}</div>}
        </div>
        <figcaption>{impactDate(when, language)}</figcaption>
      </figure>)}
    </div>
    <a className="gac-impact-credit" href={impactSource} target="_blank" rel="noreferrer">{impactCredit} ↗</a>
    {story ? <EarthDialogue key="impact-story" managedFocus language={language} paused={paused} title={vi ? 'Chớp sáng và chiếc hố' : 'A flash and a crater'}
      lines={gacT02Story(language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(advanceGacDialogue(progress)); }} finalAction="moon" finalLabel={vi ? 'Giữ câu chuyện này' : 'Keep this story'}/>
      : <>
        <div className="gac-impact-regions" role="group" aria-label={vi ? 'Vùng nào có đốm mới?' : 'Which area has a new spot?'}>{[1, 2, 3].map((n, i) => <button key={n} disabled={paused || !ready} onFocus={() => setRegion(i)} onBlur={() => setRegion(null)} onMouseEnter={() => setRegion(i)} onMouseLeave={() => setRegion(null)} onClick={() => answer(i === 1)}>{vi ? `Vùng ${n}` : `Area ${n}`}</button>)}</div>
        <p className="gac-impact-response" role="status">{wrong ? (vi ? 'Vùng này vẫn giống nhau. Nhìn vùng 2 ở hai ảnh nhé: ảnh sau có gì mới?' : 'This area looks the same. Look at area 2 in both pictures: what is new in the later one?') : '\u00a0'}</p>
      </>}
  </div>;
}
