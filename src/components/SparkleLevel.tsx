import { useEffect, useRef } from 'react';
import type { Language } from '../content/i18n';
import { freshSparkle, sparkleKeepsakes, sparkleMeetingLines, sparkleChallengeLines, sparkleRouteLines, type SparkleProgress } from '../content/levels/lap-lanh';
import { SparkleCleaning } from './SparkleCleaning';
import { EarthDialogue } from './EarthDialogue';

export function SparkleLevel({ language, progress: p, onChange, onBack, paused }: { language: Language; progress: SparkleProgress; onChange: (p: SparkleProgress) => void; onBack: () => void; paused: boolean }) {
  const vi = language === 'vi';
  const phase = p.phase;
  const go = (next: SparkleProgress['phase']) => { onChange({ ...p, phase: next, turn: 0 }); };
  const title = vi ? '02 · Bạn Lấp Lánh' : '02 · A sparkling friend';
  const photoId = phase === 'dust-photo' ? 0 : phase === 'clean-photo' ? 1 : null;
  const photoButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!paused && photoId !== null) photoButton.current?.focus({ preventScroll: true }); }, [photoId, paused]);
  const receivePhoto = (id: number) => onChange({ ...p, phase: id === 0 ? 'dust-photo' : 'clean-photo', turn: 0, keepsakes: [...new Set([...p.keepsakes, id])], ...(id === 1 ? { observations: [0, 1, 2] } : {}) });
  return <section className="sparkle-level" hidden={paused} lang={language} aria-label={title}>
    <div className="surveyor-scene-hud"><span>{phase === 'search' ? (vi ? 'T01 · Theo điểm sáng' : 'T01 · Follow the glint') : (vi ? 'Biển Yên Tĩnh · Apollo 11' : 'Sea of Tranquility · Apollo 11')}</span><button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></div>
    {phase === 'route' && <EarthDialogue key="route" language={language} paused={paused} title={vi ? 'Theo ánh sáng xa xăm' : 'Following the distant light'} lines={sparkleRouteLines(language)} initialIndex={p.turn} onTurn={turn => { if (turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon" finalLabel={vi ? 'Đến Biển Yên Tĩnh' : 'Arrive at the Sea of Tranquility'} onComplete={() => go('search-intro')} />}
    {phase === 'search-intro' && <EarthDialogue key={phase} language={language} paused={paused} title={title} lines={sparkleChallengeLines(language)} initialIndex={p.turn} onTurn={turn => { if (turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon" finalLabel={vi ? 'Bắt đầu thử thách' : 'Start challenge'} onComplete={() => go('search')} />}
    {(phase === 'meeting' || phase === 'cleaning-intro') && <EarthDialogue key={phase} language={language} paused={paused} title={title} lines={sparkleMeetingLines(language, phase === 'cleaning-intro')} initialIndex={p.turn} onTurn={turn => { if (turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon" finalLabel={vi ? (phase === 'meeting' ? 'Nhận bức ảnh' : 'Giúp Lấp Lánh lau kính') : (phase === 'meeting' ? 'Receive the picture' : 'Help clean the glass')} onComplete={() => phase === 'meeting' ? receivePhoto(0) : go('cleaning')} />}
    {photoId !== null && <section className="excavation-photo sparkle-memory-photo" role="dialog" aria-modal="true" aria-label={vi ? 'Nhận bức ảnh' : 'Picture received'}>
      <figure className="memory-photo-frame"><img src={sparkleKeepsakes[photoId].src} alt={sparkleKeepsakes[photoId][language].title} /><figcaption>{vi ? 'Bảng gương trên Mặt Trăng' : 'Reflector on the Moon'}</figcaption></figure>
      <div className="memory-photo-copy"><span className="memory-eyebrow">{vi ? 'Nhận bức ảnh' : 'Picture received'} · {photoId + 1}/2</span><h2>{sparkleKeepsakes[photoId][language].title}</h2><p>{sparkleKeepsakes[photoId][language].description}</p><small>{vi ? 'Ảnh tư liệu minh họa thiết bị. Gặp gỡ và lau bụi là câu chuyện tưởng tượng trong game; hai ảnh không phải ảnh trước và sau khi lau.' : 'Archive pictures illustrate the equipment. The meeting and cleaning are fictional; these are not before-and-after cleaning photos.'}</small>
      <div className="ending-actions"><button className="journey-primary" ref={photoButton} onClick={() => photoId === 0 ? go('cleaning-intro') : onBack()}>{photoId === 0 ? (vi ? 'Cất ảnh và tiếp tục' : 'Keep the picture and continue') : (vi ? 'Cất ảnh và về lộ trình' : 'Keep the picture and return to route')} →</button>
      {photoId === 1 && <button className="journey-primary" onClick={() => onChange({ ...freshSparkle(), completedOnce: p.completedOnce, keepsakes: p.keepsakes })}>{vi ? 'Chơi lại đoạn Lấp Lánh' : 'Replay Sparkle’s chapter'}</button>}</div></div>
    </section>}
    {phase === 'cleaning' && <SparkleCleaning language={language} onComplete={() => receivePhoto(1)} />}
  </section>;
}
