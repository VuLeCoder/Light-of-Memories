import { useEffect, useRef } from 'react';
import type { Language } from '../content/i18n';
import { taiThinhDialogue } from '../content/levels/tai-thinh-content';
import type { TaiThinhProgress } from '../content/levels/tai-thinh-progress';
import { EarthDialogue } from './EarthDialogue';
import './tai-thinh.css';

export function TaiThinhLevel({ language, progress: p, onChange, onBack, paused }: {
  language: Language; progress: TaiThinhProgress; onChange: (p: TaiThinhProgress) => void; onBack: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const stopButton = useRef<HTMLButtonElement>(null);
  const dialogue = p.phase === 'route' || p.phase === 'arrival' ? p.phase : null;
  useEffect(() => { if (!paused && !dialogue && p.phase !== 'approach') stopButton.current?.focus({ preventScroll: true }); }, [p.phase, paused, dialogue]);
  return <section className={`tai-thinh-level tai-phase-${p.phase}`} hidden={paused} lang={language} aria-label={vi ? '03 · Bạn Tai Thính' : '03 · Keen Ears'}>
    <div className="surveyor-scene-hud"><span>{p.phase === 'identify' ? (vi ? 'T01 · Ai đang lắng nghe?' : 'T01 · Who is listening?') : (vi ? 'Đại Dương Bão · Apollo 12' : 'Ocean of Storms · Apollo 12')}</span><button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></div>
    {p.phase === 'route' && <figure className="tai-route-map">
      <svg viewBox="0 0 600 170" role="img" aria-label={vi ? 'Hành trình từ Biển Yên Tĩnh tới Đại Dương Bão' : 'Journey from the Sea of Tranquility to the Ocean of Storms'}>
        <ellipse cx="300" cy="85" rx="260" ry="77" fill="#607579" stroke="#b7bdab" />
        <path d="M430 75 Q300 5 155 90" fill="none" stroke="#edce8d" strokeWidth="3" strokeDasharray="7 6" />
        <g fill="#ffe4a6"><circle cx="430" cy="75" r="6"/><circle cx="155" cy="90" r="6"/></g>
        <g fill="#f5ead1" textAnchor="middle" fontSize="16"><text x="430" y="107">Apollo 11</text><text x="155" y="122">Apollo 12</text><text x="300" y="155">{vi ? 'Sơ đồ hành trình kỳ ảo · không theo tỉ lệ' : 'A story journey · not to scale'}</text></g>
      </svg><figcaption>{vi ? 'Biển Yên Tĩnh → Đại Dương Bão' : 'Sea of Tranquility → Ocean of Storms'}</figcaption>
    </figure>}
    {dialogue && <EarthDialogue key={dialogue} language={language} paused={paused} title={vi ? 'Theo những rung động' : 'Following the tremors'} lines={taiThinhDialogue(language, dialogue)} initialIndex={p.turn} onTurn={turn => { if (turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon" finalLabel={dialogue === 'route' ? (vi ? 'Đến Đại Dương Bão' : 'Arrive in the Ocean of Storms') : (vi ? 'Quan sát các thiết bị' : 'Observe the instruments')} onComplete={() => onChange({ ...p, phase: dialogue === 'route' ? 'approach' : 'identify', turn: 0 })} />}
    {!dialogue && p.phase !== 'approach' && <div className="tai-milestone-stop" role="status"><p>{vi ? 'Cuội đã tới cụm thiết bị ALSEP. Phần thử thách nhận diện thiết bị đang được chuẩn bị.' : 'Cuội has reached the ALSEP instruments. The identification challenge is being prepared.'}</p><button ref={stopButton} onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'} →</button></div>}
  </section>;
}
