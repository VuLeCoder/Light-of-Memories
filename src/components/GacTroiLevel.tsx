import { GacTroiMatching } from './GacTroiMatching';
import { gacMatchingDialogue, gacMatchingIntroLength } from '../content/levels/gac-troi-matching';
import './gac-troi.css';
import type { Language } from '../content/i18n';
import { replayGacTroi, type GacTroiProgress } from '../content/levels/gac-troi-progress';
import { advanceGacDialogue, gacPhaseAvailable } from '../content/levels/gac-troi-flow';
import { gacT02Intro, gacTroiMeeting } from '../content/levels/gac-troi-content';
import { EarthDialogue } from './EarthDialogue';

export function GacTroiLevel({ language, progress, onChange, onBack, onBook, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void;
  onBack: () => void; onBook: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const intro = progress.phase === 'matching' && progress.turn < gacMatchingIntroLength;
  const summary = progress.phase === 'stories';
  const t02Intro = progress.phase === 't02-intro' && gacPhaseAvailable(progress.phase);
  const matching = progress.phase === 'matching' && !intro;
  return <section className={`ending-scene gac-meeting${matching ? ' gac-activity' : ''}`} hidden={paused} lang={language} aria-label={vi ? 'Gặp Gác Trời' : 'Meet Sky Watcher'}>
    <div className="surveyor-scene-hud"><span>{vi ? 'Gác Trời · Tín hiệu từ quỹ đạo' : 'Sky Watcher · A signal from orbit'}</span>
      <button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></div>
    {matching ? <GacTroiMatching language={language} progress={progress} onChange={onChange} onBook={onBook} paused={paused}/> : t02Intro ? <EarthDialogue key="t02-intro" managedFocus language={language} paused={paused}
      title={vi ? 'Đốm mới trong bức ảnh' : 'A new mark in the picture'} lines={gacT02Intro(language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(advanceGacDialogue(progress)); }}
      finalAction="moon" finalLabel={vi ? 'Giữ lại lời nhắn' : 'Keep this message'}/> : (intro || summary) ? <EarthDialogue key={summary ? 'summary' : 'intro'} managedFocus language={language} paused={paused}
      title={vi ? 'Ghép ký ức' : 'Matching memories'} lines={gacMatchingDialogue(language, summary)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(summary ? advanceGacDialogue(progress) : { ...progress, phase: 'matching', turn: gacMatchingIntroLength }); }}
      finalAction="moon" finalLabel={summary ? (vi ? 'Cùng xem hai bức ảnh' : 'Look at the two pictures') : (vi ? 'Cùng xem ảnh' : 'Look at the pictures')}/> : progress.phase === 'meeting' ? <EarthDialogue key="meeting" managedFocus language={language} paused={paused}
      title={vi ? 'Một người bạn trên cao' : 'A friend above'} lines={gacTroiMeeting(language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(advanceGacDialogue(progress)); }}
      finalAction="moon" finalLabel={vi ? 'Cùng nhìn lại hành trình' : 'Look back on our journey'}/>
      : <div className="ending-farewell"><p>{vi ? 'Cuội giữ lại lời nhắn của Gác Trời, nghỉ chân một lát rồi sẽ tìm đường tiếp. Những câu chuyện đã biết vẫn ở trong sách.' : 'Cuội keeps Sky Watcher’s message and rests a while before continuing the journey. The stories you know are still in your book.'}</p>
        <nav className="ending-actions"><button onClick={onBook}>{vi ? 'Xem lại những câu chuyện' : 'Revisit the stories'} ▤</button><button onClick={() => { if (!paused) onChange(replayGacTroi(progress)); }}>{vi ? 'Chơi lại Gác Trời' : 'Replay Sky Watcher'}</button><button className="journey-primary" onClick={onBack}>{vi ? 'Về lộ trình' : 'Return to the route'} →</button></nav></div>}
  </section>;
}
