import { useEffect, useRef } from 'react';
import type { Language } from '../content/i18n';
import { freshSparkle, sparkleKeepsakes, sparkleMeetingLines, sparkleChallengeLines, sparkleRouteLines, sparkleScienceLines, type SparkleProgress } from '../content/levels/lap-lanh';
import { SparkleRepair, SparkleRanging } from './SparkleScience';
import { SparkleEnding } from './SparkleEnding';
import { SparkleCleaning } from './SparkleCleaning';
import { EarthDialogue } from './EarthDialogue';

export function SparkleLevel({ language, progress: p, onChange, onBack, onBook, paused }: { language: Language; progress: SparkleProgress; onChange: (p: SparkleProgress) => void; onBack: () => void; onBook: () => void; paused: boolean }) {
  const vi = language === 'vi';
  const phase = p.phase;
  const go = (next: SparkleProgress['phase']) => { onChange({ ...p, phase: next, turn: 0 }); };
  const title = vi ? '02 · Bạn Lấp Lánh' : '02 · A sparkling friend';
  const photoId = phase === 'dust-photo' ? 0 : phase === 'clean-photo' ? 1 : null;
  const photoButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!paused && photoId !== null) photoButton.current?.focus({ preventScroll: true }); }, [photoId, paused]);
  const receivePhoto = (id: number) => onChange({ ...p, phase: id === 0 ? 'dust-photo' : 'clean-photo', turn: 0, keepsakes: [...new Set([...p.keepsakes, id])], ...(id === 1 ? { observations: [0, 1, 2] } : {}) });
  return <section className="sparkle-level" hidden={paused} lang={language} aria-label={title}>
    {!['farewell', 'finished'].includes(phase) && <div className="surveyor-scene-hud"><span>{phase === 'search' ? (vi ? 'T01 · Theo điểm sáng' : 'T01 · Follow the glint') : (vi ? 'Biển Yên Tĩnh · Apollo 11' : 'Sea of Tranquility · Apollo 11')}</span>{['repair', 'ranging'].includes(phase) && <button onClick={onBook}>{vi ? 'Gợi ý' : 'Hint'}</button>}<button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></div>}
    {phase === 'route' && <EarthDialogue key="route" language={language} paused={paused} title={vi ? 'Theo ánh sáng xa xăm' : 'Following the distant light'} lines={sparkleRouteLines(language)} initialIndex={p.turn} onTurn={turn => { if (turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon" finalLabel={vi ? 'Đến Biển Yên Tĩnh' : 'Arrive at the Sea of Tranquility'} onComplete={() => go('search-intro')} />}
    {phase === 'search-intro' && <EarthDialogue key={phase} language={language} paused={paused} title={title} lines={sparkleChallengeLines(language)} initialIndex={p.turn} onTurn={turn => { if (turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon" finalLabel={vi ? 'Bắt đầu thử thách' : 'Start challenge'} onComplete={() => go('search')} />}
    {(phase === 'meeting' || phase === 'cleaning-intro') && <EarthDialogue key={phase} language={language} paused={paused} title={title} lines={sparkleMeetingLines(language, phase === 'cleaning-intro')} initialIndex={p.turn} onTurn={turn => { if (turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon" finalLabel={vi ? (phase === 'meeting' ? 'Nhận bức ảnh' : 'Giúp Lấp Lánh lau kính') : (phase === 'meeting' ? 'Receive the picture' : 'Help clean the glass')} onComplete={() => phase === 'meeting' ? receivePhoto(0) : go('cleaning')} />}
    {photoId !== null && <section className="excavation-photo sparkle-memory-photo" role="dialog" aria-modal="true" aria-label={vi ? 'Nhận bức ảnh' : 'Picture received'}>
      <figure className="memory-photo-frame"><img src={sparkleKeepsakes[photoId].src} alt={sparkleKeepsakes[photoId][language].title} /><figcaption>{sparkleKeepsakes[photoId][language].title}</figcaption></figure>
      <div className="memory-photo-copy"><span className="memory-eyebrow">{vi ? 'Nhận bức ảnh' : 'Picture received'} · {photoId + 1}/2</span><h2>{sparkleKeepsakes[photoId][language].title}</h2><p>{sparkleKeepsakes[photoId][language].description}</p>
      <div className="ending-actions"><button className="journey-primary" ref={photoButton} onClick={() => photoId === 0 ? go('cleaning-intro') : go('repair-intro')}>{vi ? 'Cất ảnh và tiếp tục' : 'Keep the picture and continue'} →</button>
      </div></div>
    </section>}
    {(phase === 'repair-intro' || phase === 'ranging-intro') && <EarthDialogue key={phase} language={language} paused={paused} title={title} lines={sparkleScienceLines(language, phase)} initialIndex={p.turn} onTurn={turn => { if (turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon" finalLabel={vi ? (phase === 'repair-intro' ? 'Mở mô hình góc gương' : phase === 'ranging-intro' ? 'Bắt đầu đo' : 'Cất manh mối') : (phase === 'repair-intro' ? 'Open the reflector model' : phase === 'ranging-intro' ? 'Start measuring' : 'Keep the clues')} onComplete={() => go(phase === 'repair-intro' ? 'repair' : 'ranging')} />}
    {phase === 'repair' && <SparkleRepair paused={paused} language={language} progress={p} onChange={onChange} onComplete={() => go('ranging-intro')} />}
    {phase === 'ranging' && <SparkleRanging language={language} progress={p} onChange={onChange} paused={paused} />}
    {phase === 'farewell' && <SparkleEnding language={language} progress={p} onChange={onChange} paused={paused} />}
    {phase === 'finished' && <section className="ending-scene sparkle-ending-scene is-exploring" aria-label={vi ? 'Cánh sao thứ hai đã sáng' : 'The second star point is shining'}>
      <div className="surveyor-scene-hud"><span>{vi ? 'Câu chuyện của Lấp Lánh' : 'Sparkle’s story'}</span><strong>★ 2/5</strong></div>
      <div className="ending-farewell"><nav className="ending-actions" aria-label={vi ? 'Sau cuộc gặp Lấp Lánh' : 'After meeting Sparkle'}>
        <button onClick={() => onChange({ ...p, phase: 'farewell', turn: 0 })}>{vi ? 'Xem lại đoạn kết' : 'Replay the ending'}</button>
        <button onClick={() => onChange({ ...freshSparkle(), completedOnce: p.completedOnce, keepsakes: p.keepsakes })}>{vi ? 'Chơi lại' : 'Play again'}</button>
        <button className="journey-primary" onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'} →</button>
      </nav></div>
    </section>}
    {phase === 'cleaning' && <SparkleCleaning language={language} onComplete={() => receivePhoto(1)} />}
  </section>;
}
