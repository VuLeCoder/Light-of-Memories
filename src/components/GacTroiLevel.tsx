import { GacTroiRoute, GacTroiChanges } from './GacTroiActivities';
import { MemoryLantern } from './SurveyorEnding';
import { gacFarewellDialogue } from '../content/levels/gac-troi-finale';
import { receiveGacLight, replayGacTroi, type GacTroiProgress } from '../content/levels/gac-troi-progress';
import { GacTroiMatching } from './GacTroiMatching';
import { gacMatchingDialogue, gacMatchingIntroLength } from '../content/levels/gac-troi-matching';
import './gac-troi.css';
import { OrbitPostcard } from './OrbitPostcard';
import type { Language } from '../content/i18n';
import { gacTroiMeeting } from '../content/levels/gac-troi-content';
import { EarthDialogue } from './EarthDialogue';

export function GacTroiLevel({ language, progress, onChange, onBack, onBook, onEnding, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void;
  onEnding: () => void; onBack: () => void; onBook: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const intro = progress.phase === 'matching' && progress.turn < gacMatchingIntroLength;
  const summary = progress.phase === 'stories';
  const matching = progress.phase === 'matching' && !intro;
  const activity = matching || progress.phase === 'route' || progress.phase === 'changes';
  const finalDialogue = progress.phase === 'farewell' || progress.phase === 'gift';
  const showPhoto = progress.phase === 'meeting' && progress.turn === 0;
  return <section className={`ending-scene gac-meeting${activity ? ' gac-activity' : ''}${showPhoto ? ' has-orbit-photo' : ''}`} hidden={paused} lang={language} aria-label={vi ? 'Gặp Gác Trời' : 'Meet Sky Watcher'}>
    <div className="surveyor-scene-hud"><span>{vi ? 'Gác Trời · Tín hiệu từ quỹ đạo' : 'Sky Watcher · A signal from orbit'}</span>
      <button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></div>
    {showPhoto && <OrbitPostcard language={language} />}
    {progress.phase === 'route' ? <GacTroiRoute language={language} progress={progress} onChange={onChange} onBook={onBook} paused={paused}/>
      : progress.phase === 'changes' ? <GacTroiChanges language={language} progress={progress} onChange={onChange} onBook={onBook} paused={paused}/>
      : finalDialogue ? <><div key={progress.phase} className={`ending-scene-lantern is-kindled${progress.phase === 'gift' ? ' gac-lantern-gift' : ''}`}><MemoryLantern lit points={progress.phase === 'gift' ? 5 : 3}/></div>
        <EarthDialogue key={progress.phase} managedFocus language={language} paused={paused} title={vi ? 'Ánh sáng của Gác Trời' : 'Sky Watcher’s light'} lines={gacFarewellDialogue(language, progress.phase === 'gift')} initialIndex={progress.turn}
          onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }} finalAction="moon" finalLabel={progress.phase === 'gift' ? (vi ? 'Mang theo ánh sáng' : 'Carry the light') : (vi ? 'Đón ánh sáng' : 'Receive the light')}
          onComplete={() => { if (!paused) onChange(progress.phase === 'gift' ? { ...progress, phase: 'finished', turn: 0 } : receiveGacLight(progress)); }}/></>
      : matching ? <GacTroiMatching language={language} progress={progress} onChange={onChange} onBook={onBook} paused={paused}/> : (intro || summary) ? <EarthDialogue key={summary ? 'summary' : 'intro'} managedFocus language={language} paused={paused}
      title={vi ? 'Ghép ký ức' : 'Matching memories'} lines={gacMatchingDialogue(language, summary)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange({ ...progress, phase: summary ? 'route' : 'matching', turn: summary ? 0 : gacMatchingIntroLength }); }}
      finalAction="moon" finalLabel={summary ? (vi ? 'Giữ lại những nơi đã qua' : 'Keep the places we visited') : (vi ? 'Cùng xem ảnh' : 'Look at the pictures')}/> : progress.phase === 'meeting' ? <EarthDialogue key="meeting" managedFocus language={language} paused={paused}
      title={vi ? 'Một người bạn trên cao' : 'A friend above'} lines={gacTroiMeeting(language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange({ ...progress, phase: 'matching', turn: 0 }); }}
      finalAction="moon" finalLabel={vi ? 'Cùng nhìn lại hành trình' : 'Look back on our journey'}/>
      : <div className="ending-farewell"><p>{vi ? 'Chiếc đèn đã sáng trọn vẹn. Cuội đã sẵn sàng đi nốt quãng đường tìm chị Hằng.' : 'The lantern is shining fully. Cuội is ready to walk the last stretch to find Hằng.'}</p>
        <nav className="ending-actions"><button onClick={onBook}>{vi ? 'Xem lại những câu chuyện' : 'Revisit the stories'} ▤</button><button onClick={() => { if (!paused) onChange(replayGacTroi(progress)); }}>{vi ? 'Chơi lại từ đầu' : 'Play again from the start'}</button><button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button><button className="journey-primary" data-gac-continue onClick={() => { if (!paused) onEnding(); }}>{vi ? 'Đi tìm chị Hằng' : 'Find Hằng'} →</button></nav></div>}
  </section>;
}
