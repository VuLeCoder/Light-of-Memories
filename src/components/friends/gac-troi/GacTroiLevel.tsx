import { gameAudio } from '../../../audio/game-audio';
import { GacTroiEnding } from './GacTroiEnding';
import { GacRestLight } from './GacRestLight';
import { gacLightDialogue, type GacLightDialoguePhase } from '../../../content/friends/gac-troi/challenges/light';
import { GacTroiMatching } from './GacTroiMatching';
import { gacMatchingDialogue, gacMatchingIntroLength } from '../../../content/friends/gac-troi/challenges/matching';
import './gac-troi.css';
import type { Language } from '../../../content/i18n';
import { replayGacTroi, type GacTroiProgress } from '../../../content/friends/gac-troi/progress';
import { advanceGacDialogue, gacPhaseAvailable } from '../../../content/friends/gac-troi/flow';
import { gacT02Intro, gacTroiMeeting } from '../../../content/friends/gac-troi/dialogue';
import { GacTroiImpact } from './GacTroiImpact';
import { EarthDialogue } from '../../shared/EarthDialogue';
import { LanternGiftPause, useLanternGiftPause } from '../../shared/LanternGiftPause';

export function GacTroiLevel({ language, progress, onChange: changeProgress, onBack, onBook, litStars = 5, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void;
  onBack: () => void; onBook: () => void; litStars?: number; paused: boolean;
}) {
  const onChange = (next: GacTroiProgress) => {
    if (!paused && next.farewellDone && !progress.farewellDone) gameAudio.cue('lamp', 2);
    changeProgress(next);
  };
  const vi = language === 'vi';
  const gifting = useLanternGiftPause(progress.phase === 'gac-farewell' && progress.turn === 2, paused);
  const light = ['t03-walk', 't03-dark-intro', 't03-map'].includes(progress.phase);
  const lightDialogue = ['t03-intro', 't03-story', 'gac-farewell'].includes(progress.phase);
  const free = progress.phase === 'gac-free';
  const intro = progress.phase === 'matching' && progress.turn < gacMatchingIntroLength;
  const summary = progress.phase === 'stories';
  const t02Intro = progress.phase === 't02-intro' && gacPhaseAvailable(progress.phase);
  const impact = ['t02-search', 't02-story'].includes(progress.phase) && gacPhaseAvailable(progress.phase);
  const matching = progress.phase === 'matching' && !intro;
  if (progress.phase === 't03-story') return <GacTroiEnding language={language} progress={progress} onChange={onChange} paused={paused}/>;
  if (light) return <GacRestLight key={progress.phase === 't03-walk' ? 'walk' : 'lamps'} language={language} progress={progress} onChange={onChange} onBack={onBack} onBook={onBook} paused={paused}/>;
  if (free) return <section className="ending-scene is-exploring gac-free-scene" hidden={paused} lang={language} aria-label={vi ? 'Sau cuộc gặp Gác Trời' : 'After meeting Sky Watcher'}>
    <div className="surveyor-scene-hud"><span>{vi ? 'Câu chuyện của Gác Trời' : 'Sky Watcher’s story'}</span><strong role="status" aria-label={vi ? `${litStars} trên 5 cánh sao đã sáng` : `${litStars} of 5 star points lit`}>★ {litStars}/5</strong></div>
    <div className="ending-farewell"><nav className="ending-actions" aria-label={vi ? 'Sau cuộc gặp Gác Trời' : 'After meeting Sky Watcher'}>
      <button onClick={() => { if (!paused) onChange({ ...progress, phase: 't03-story', turn: 0 }); }}>{vi ? 'Xem lại đoạn kết' : 'Replay the ending'}</button>
      <button onClick={() => { if (!paused) onChange(replayGacTroi(progress)); }}>{vi ? 'Chơi lại' : 'Play again'}</button>
      <button className="journey-primary" onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'} →</button>
    </nav></div>
  </section>;
  return <section className={`ending-scene gac-meeting${light || lightDialogue || free ? ' gac-later' : ''}${matching || impact || light ? ' gac-activity' : ''}`} hidden={paused} lang={language} aria-label={vi ? 'Gặp Gác Trời' : 'Meet Sky Watcher'}>
    <div className="surveyor-scene-hud"><span>{vi ? 'Gác Trời · Tín hiệu từ quỹ đạo' : 'Sky Watcher · A signal from orbit'}</span>
      {progress.phase === 't02-search' && <button className="gac-impact-help" onClick={onBook} disabled={paused}>{vi ? 'Gợi ý' : 'Hint'}</button>}
      <button onClick={onBack} disabled={gifting}>{vi ? 'Về lộ trình' : 'Back to route'}</button></div>
    {gifting ? <LanternGiftPause language={language}/> : lightDialogue ? <EarthDialogue key={progress.phase} managedFocus language={language} paused={paused}
      title={vi ? (progress.phase === 't03-intro' ? 'Trực gác vùng tối' : 'Một chút sáng gửi Cuội') : (progress.phase === 't03-intro' ? 'Watch the shadows' : 'A little light for Cuội')}
      lines={gacLightDialogue(progress.phase as GacLightDialoguePhase, language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(advanceGacDialogue(progress));  }} finalAction="moon"
      finalLabel={progress.phase === 't03-intro' ? (vi ? 'Bắt đầu ca trực' : 'Begin the watch') : (vi ? 'Ở lại với Gác Trời' : 'Stay with Sky Watcher')}/>
      : impact ? <GacTroiImpact language={language} progress={progress} onChange={onChange} paused={paused}/> : matching ? <GacTroiMatching language={language} progress={progress} onChange={onChange} onBook={onBook} paused={paused}/> : t02Intro ? <EarthDialogue key="t02-intro" managedFocus language={language} paused={paused}
      title={vi ? 'Đốm mới trong bức ảnh' : 'A new mark in the picture'} lines={gacT02Intro(language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(advanceGacDialogue(progress));  }}
      finalAction="moon" finalLabel={vi ? 'Cùng tìm dấu vết mới' : 'Find the new mark'}/> : (intro || summary) ? <EarthDialogue key={summary ? 'summary' : 'intro'} managedFocus language={language} paused={paused}
      title={vi ? 'Ghép ký ức' : 'Matching memories'} lines={gacMatchingDialogue(language, summary)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(summary ? advanceGacDialogue(progress) : { ...progress, phase: 'matching', turn: gacMatchingIntroLength }); }}
      finalAction="moon" finalLabel={summary ? (vi ? 'Cùng xem hai bức ảnh' : 'Look at the two pictures') : (vi ? 'Cùng xem ảnh' : 'Look at the pictures')}/> : progress.phase === 'meeting' ? <EarthDialogue key="meeting" managedFocus language={language} paused={paused}
      title={vi ? 'Một người bạn trên cao' : 'A friend above'} lines={gacTroiMeeting(language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(advanceGacDialogue(progress));  }}
      finalAction="moon" finalLabel={vi ? 'Cùng nhìn lại hành trình' : 'Look back on our journey'}/>
      : <div className="ending-farewell"><p>{progress.farewellDone ? (vi ? 'Cuội dừng chân bên triền đất thấp, giữ bản đồ trong đèn. Cậu nghỉ một lát trước khi tìm tiếp chị Hằng.' : 'Cuội pauses by the low slope, keeping the map in his lantern. He rests a while before looking for Hằng.') : progress.t02Done ? (vi ? 'Cuội ghi nhớ cách đối chiếu hai bức ảnh. Cậu nghỉ chân bên ánh đèn, rồi sẽ tìm đường tới chị Hằng. Những câu chuyện đã biết vẫn ở trong sách.' : 'Cuội remembers how to compare the two pictures. He rests beside the lantern before looking for a way to chị Hằng. The stories he knows are still in the book.') : vi ? 'Cuội giữ lại lời nhắn của Gác Trời, nghỉ chân một lát rồi sẽ tìm đường tiếp. Những câu chuyện đã biết vẫn ở trong sách.' : 'Cuội keeps Sky Watcher’s message and rests a while before continuing the journey. The stories you know are still in your book.'}</p>
        <nav className="ending-actions"><button onClick={onBook}>{vi ? 'Xem lại những câu chuyện' : 'Revisit the stories'} ▤</button><button onClick={() => { if (!paused) onChange(replayGacTroi(progress)); }}>{vi ? 'Chơi lại Gác Trời' : 'Replay Sky Watcher'}</button><button className="journey-primary" onClick={onBack}>{vi ? 'Về lộ trình' : 'Return to the route'} →</button></nav></div>}
  </section>;
}
