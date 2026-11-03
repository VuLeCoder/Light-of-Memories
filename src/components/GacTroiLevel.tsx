import type { Language } from '../content/i18n';
import type { GacTroiProgress } from '../content/levels/gac-troi-progress';
import { gacTroiMeeting } from '../content/levels/gac-troi-content';
import { EarthDialogue } from './EarthDialogue';

export function GacTroiLevel({ language, progress, onChange, onBack, onBook, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void;
  onBack: () => void; onBook: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  return <section className="ending-scene gac-meeting" hidden={paused} lang={language} aria-label={vi ? 'Gặp Gác Trời' : 'Meet Sky Watcher'}>
    <div className="surveyor-scene-hud"><span>{vi ? 'Gác Trời · Tín hiệu từ quỹ đạo' : 'Sky Watcher · A signal from orbit'}</span>
      <button onClick={onBook}>{vi ? 'Mở sách' : 'Open book'} ▤</button></div>
    {progress.phase === 'meeting' ? <EarthDialogue managedFocus language={language} paused={paused}
      title={vi ? 'Một người bạn trên cao' : 'A friend above'} lines={gacTroiMeeting(language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange({ ...progress, phase: 'matching', turn: 0 }); }}
      finalAction="moon" finalLabel={vi ? 'Cùng nhìn lại hành trình' : 'Look back on our journey'}/>
      : <div className="ending-farewell"><p>{vi ? 'Cuộc gặp đã được ghi nhớ. Những thử thách với Gác Trời đang được chuẩn bị.' : 'Your meeting is saved. Sky Watcher’s challenges are being prepared.'}</p>
        <nav className="ending-actions"><button onClick={onBook}>{vi ? 'Góc nhìn từ quỹ đạo' : 'A view from orbit'} ▤</button><button className="journey-primary" onClick={onBack}>{vi ? 'Về lộ trình' : 'Return to the route'} →</button></nav></div>}
  </section>;
}
