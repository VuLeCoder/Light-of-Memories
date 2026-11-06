import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import type { GacTroiProgress } from '../content/levels/gac-troi-progress';
import { advanceGacDialogue, keepGacLandmark } from '../content/levels/gac-troi-flow';
import { gacLightDialogue, gacLightSections } from '../content/levels/gac-troi-light';
import { GacLightMap } from './GacLightMap';
import { EarthDialogue } from './EarthDialogue';

export function GacTroiLight({ language, progress, onChange, onBook, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void; onBook: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const [section, setSection] = useState(progress.routeLandmarks.length);
  const [moment, setMoment] = useState(0);
  const [viewed, setViewed] = useState([true, false]);
  const [wrong, setWrong] = useState(false);
  const [focus, setFocus] = useState<number | null>(null);
  const locked = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const earlierButton = useRef<HTMLButtonElement>(null);
  const kept = section < progress.routeLandmarks.length;
  const story = progress.phase === 't03-story' && !kept;
  useEffect(() => {
    if (kept && !paused) nextButton.current?.focus({ preventScroll: true });
  }, [kept, paused]);
  useEffect(() => {
    if (story && !paused) root.current?.querySelector<HTMLButtonElement>('.dialogue-next')?.focus({ preventScroll: true });
  }, [story, paused]);
  const item = gacLightSections[section];
  const canChoose = viewed.every(Boolean) && !kept && !paused;
  const choose = (branch: number) => {
    if (!canChoose || locked.current || !item) return;
    if (!item.branches[branch].lit.every(Boolean)) { setWrong(true); return; }
    locked.current = true; setWrong(false); setFocus(null);
    onChange(keepGacLandmark(progress, item.landmark));
  };
  return <div ref={root} className={`gac-light${story ? ' gac-light-story' : ''}`}>
    <header><h2>{vi ? 'Lối nào còn ánh sáng?' : 'Which way stays lit?'}</h2><span>{story ? '3 / 3' : `${section + 1} / 3`}</span></header>
    {!story && <p>{vi ? 'Xem cả hai lúc, rồi chọn một lối ở đoạn đang mở.' : 'Look at both moments, then choose a path in the open section.'}</p>}
    <div className="gac-light-picture"><GacLightMap language={language} section={story ? 3 : section} moment={moment} completed={progress.routeLandmarks.length} focus={focus}/></div>
    {story ? <EarthDialogue key="t03-story" managedFocus language={language} paused={paused} title={vi ? 'Bản đồ trong đèn' : 'The map in the lantern'} lines={gacLightDialogue('t03-story', language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(advanceGacDialogue(progress)); }} finalAction="moon" finalLabel={vi ? 'Cảm ơn Gác Trời' : 'Thank Sky Watcher'}/>
      : <>
        <div className="gac-light-times" role="group" aria-label={vi ? 'Hai thời điểm minh họa' : 'Two imagined moments'}>{(vi ? ['Lúc đầu', 'Lúc sau'] : ['Earlier', 'Later']).map((name, i) => <button key={i} ref={i === 0 ? earlierButton : undefined} aria-pressed={moment === i} disabled={paused || kept} onClick={() => { setMoment(i); setViewed(old => old.map((v, n) => v || n === i)); }}>{name}{viewed[i] ? ' ✓' : ''}</button>)}<button onClick={onBook} disabled={paused}>{vi ? 'Gợi ý' : 'Hint'} ▤</button></div>
        <div className="gac-light-branches" role="group" aria-label={item.name[language]}>{item.branches.map((branch, i) => <button key={branch.id} data-branch={branch.id} disabled={!canChoose} onFocus={() => setFocus(i)} onBlur={() => setFocus(null)} onMouseEnter={() => setFocus(i)} onMouseLeave={() => setFocus(null)} onClick={() => choose(i)}>{i + 1} · {branch.name[language]}<span>{vi ? (branch.lit[moment] ? 'Viền liền · nhìn rõ' : 'Gạch chéo · bóng tối') : branch.lit[moment] ? 'Solid border · visible' : 'Hatching · shadow'}</span></button>)}</div>
        <div className="gac-light-feedback"><p role="status">{kept ? item.right[language] : wrong ? item.wrong[language] : !viewed.every(Boolean) ? (vi ? 'Xem cả hai lúc trước nhé.' : 'Look at both moments first.') : (vi ? 'Chọn lối nhìn rõ ở cả hai lúc.' : 'Choose a path visible at both moments.')}</p>
          {kept && <button ref={nextButton} data-gac-continue disabled={paused} onClick={() => { if (paused) return; setSection(progress.routeLandmarks.length); setMoment(0); setViewed([true, false]); setWrong(false); locked.current = false; requestAnimationFrame(() => earlierButton.current?.focus({ preventScroll: true })); }}>{section === 2 ? (vi ? 'Giữ bản đồ' : 'Keep the map') : (vi ? 'Đoạn tiếp theo' : 'Next section')} →</button>}
        </div>
      </>}
  </div>;
}
