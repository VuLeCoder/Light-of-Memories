import { useEffect, useRef } from 'react';
import type { Language } from '../content/i18n';
import { taiThinhDialogue, taiThinhMemories, taiThinhTaskCopy as copy } from '../content/levels/tai-thinh-content';
import type { TaiThinhProgress } from '../content/levels/tai-thinh-progress';
import { EarthDialogue } from './EarthDialogue';
import { TaiThinhIdentify, TaiThinhRecords } from './TaiThinhChallenges';
import { TaiThinhPhoto } from './TaiThinhPhoto';
import './tai-thinh.css';

export function TaiThinhLevel({ language, progress: p, onChange, onBack, onBook, paused }: {
  language: Language; progress: TaiThinhProgress; onChange: (p: TaiThinhProgress) => void; onBack: () => void; onBook: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const stopButton = useRef<HTMLButtonElement>(null);
  const transitions = { route: 'approach', arrival: 'identify', meeting: 'photoA', recordsIntro: 'records', afterRecords: 'photoB', ringingIntro: 'graph' } as const;
  const dialogue = p.phase in transitions ? p.phase as keyof typeof transitions : null;
  const photo = p.phase === 'photoA' ? taiThinhMemories[0] : p.phase === 'photoB' ? taiThinhMemories[1] : null;
  const task = p.phase === 'identify' ? 't01' : p.phase === 'records' ? 't02' : null;
  const knownPhase = dialogue || photo || task || p.phase === 'approach';
  useEffect(() => { if (!paused && !knownPhase) stopButton.current?.focus({ preventScroll: true }); }, [p.phase, paused, knownPhase]);
  return <section className={`tai-thinh-level tai-phase-${p.phase}`} hidden={paused} lang={language} aria-label={vi ? '03 · Bạn Tai Thính' : '03 · Keen Ears'}>
    <div className="surveyor-scene-hud"><span>{task ? `${task === 't01' ? 'T01' : 'T02'} · ${copy[task].title[language]}` : (vi ? 'Đại Dương Bão · Apollo 12' : 'Ocean of Storms · Apollo 12')}</span>{task && <button onClick={onBook}>{copy.hint[language]}</button>}<button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></div>
    {p.phase === 'route' && <figure className="tai-route-map">
      <svg viewBox="0 0 600 170" role="img" aria-label={vi ? 'Hành trình từ Biển Yên Tĩnh tới Đại Dương Bão' : 'Journey from the Sea of Tranquility to the Ocean of Storms'}>
        <ellipse cx="300" cy="85" rx="260" ry="77" fill="#607579" stroke="#b7bdab" />
        <path d="M430 75 Q300 5 155 90" fill="none" stroke="#edce8d" strokeWidth="3" strokeDasharray="7 6" />
        <g fill="#ffe4a6"><circle cx="430" cy="75" r="6"/><circle cx="155" cy="90" r="6"/></g>
        <g fill="#f5ead1" textAnchor="middle" fontSize="16"><text x="430" y="107">Apollo 11</text><text x="155" y="122">Apollo 12</text><text x="300" y="155">{vi ? 'Sơ đồ hành trình kỳ ảo · không theo tỉ lệ' : 'A story journey · not to scale'}</text></g>
      </svg><figcaption>{vi ? 'Biển Yên Tĩnh → Đại Dương Bão' : 'Sea of Tranquility → Ocean of Storms'}</figcaption>
    </figure>}
    {dialogue && <EarthDialogue key={dialogue} language={language} paused={paused} title={vi ? 'Bạn Tai Thính' : 'Keen Ears'} lines={taiThinhDialogue(language, dialogue)} initialIndex={p.turn} onTurn={turn => { if (turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon" finalLabel={dialogue === 'route' ? (vi ? 'Đến Đại Dương Bão' : 'Arrive in the Ocean of Storms') : dialogue === 'meeting' || dialogue === 'afterRecords' ? (vi ? 'Nhận bức ảnh' : 'Receive the picture') : copy.next[language]} onComplete={() => onChange({ ...p, phase: transitions[dialogue], turn: 0 })} />}
    {p.phase === 'identify' && <TaiThinhIdentify language={language} progress={p} paused={paused} onChange={onChange}/>}
    {p.phase === 'records' && <TaiThinhRecords language={language} progress={p} paused={paused} onChange={onChange}/>}
    {photo && <TaiThinhPhoto key={photo.id} photo={photo} language={language} onKeep={() => { if (!paused) onChange({ ...p, keepsakes: [...new Set([...p.keepsakes, photo.id])], phase: photo.id === 'pse' ? 'recordsIntro' : 'ringingIntro', turn: 0 }); }}/>}
    {!knownPhase && <div className="tai-milestone-stop" role="status"><p>{vi ? 'Những bản ghi đã về đúng chỗ, và hai bức ảnh đã được cất trong sách. Phần khám phá rung động kéo dài đang được chuẩn bị.' : 'The records are sorted, and two photographs are safe in the book. The exploration of long-lasting tremors is being prepared.'}</p><button ref={stopButton} onClick={onBack}>{copy.route[language]} →</button></div>}

  </section>;
}
