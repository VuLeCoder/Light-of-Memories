import { GacTroiMatching } from './GacTroiMatching';
import { gacMatchingDialogue, gacMatchingIntroLength } from '../content/levels/gac-troi-matching';
import './gac-troi.css';
import { OrbitPostcard } from './OrbitPostcard';
import type { Language } from '../content/i18n';
import { freshGacTroi, type GacTroiProgress } from '../content/levels/gac-troi-progress';
import { gacTroiMeeting } from '../content/levels/gac-troi-content';
import { EarthDialogue } from './EarthDialogue';

export function GacTroiLevel({ language, progress, onChange, onBack, onBook, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void;
  onBack: () => void; onBook: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const intro = progress.phase === 'matching' && progress.turn < gacMatchingIntroLength;
  const summary = progress.phase === 'stories';
  const matching = progress.phase === 'matching' && !intro;
  const showPhoto = progress.phase === 'meeting' && progress.turn === 0;
  return <section className={`ending-scene gac-meeting${matching ? ' gac-activity' : ''}${showPhoto ? ' has-orbit-photo' : ''}`} hidden={paused} lang={language} aria-label={vi ? 'Gặp Gác Trời' : 'Meet Sky Watcher'}>
    <div className="surveyor-scene-hud"><span>{vi ? 'Gác Trời · Tín hiệu từ quỹ đạo' : 'Sky Watcher · A signal from orbit'}</span>
      <button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></div>
    {showPhoto && <OrbitPostcard language={language} />}
    {matching ? <GacTroiMatching language={language} progress={progress} onChange={onChange} onBook={onBook} paused={paused}/> : (intro || summary) ? <EarthDialogue key={summary ? 'summary' : 'intro'} managedFocus language={language} paused={paused}
      title={vi ? 'Ghép ký ức' : 'Matching memories'} lines={gacMatchingDialogue(language, summary)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange({ ...progress, phase: summary ? 'route' : 'matching', turn: summary ? 0 : gacMatchingIntroLength }); }}
      finalAction="moon" finalLabel={summary ? (vi ? 'Giữ lại những nơi đã qua' : 'Keep the places we visited') : (vi ? 'Cùng xem ảnh' : 'Look at the pictures')}/> : progress.phase === 'meeting' ? <EarthDialogue key="meeting" managedFocus language={language} paused={paused}
      title={vi ? 'Một người bạn trên cao' : 'A friend above'} lines={gacTroiMeeting(language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange({ ...progress, phase: 'matching', turn: 0 }); }}
      finalAction="moon" finalLabel={vi ? 'Cùng nhìn lại hành trình' : 'Look back on our journey'}/>
      : <div className="ending-farewell"><p>{vi ? 'Bốn người bạn đã có chỗ trên bản đồ ký ức. Bạn có thể đọc lại những câu chuyện trong sách hoặc trở về lộ trình.' : 'All four friends have a place on your memory map. You can revisit their stories in your book or return to the route.'}</p>
        <nav className="ending-actions"><button onClick={onBook}>{vi ? 'Xem lại những câu chuyện' : 'Revisit the stories'} ▤</button><button onClick={() => { if (!paused) onChange(freshGacTroi()); }}>{vi ? 'Chơi lại từ đầu' : 'Play again from the start'}</button><button className="journey-primary" onClick={onBack}>{vi ? 'Về lộ trình' : 'Return to the route'} →</button></nav></div>}
  </section>;
}
