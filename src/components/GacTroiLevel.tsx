import { GacLightMap } from './GacLightMap';
import { useState } from 'react';
import { GacTroiLight } from './GacTroiLight';
import { gacLightDialogue, type GacLightDialoguePhase } from '../content/levels/gac-troi-light';
import { GacTroiMatching } from './GacTroiMatching';
import { gacMatchingDialogue, gacMatchingIntroLength } from '../content/levels/gac-troi-matching';
import './gac-troi.css';
import type { Language } from '../content/i18n';
import { replayGacTroi, type GacTroiProgress } from '../content/levels/gac-troi-progress';
import { advanceGacDialogue, gacPhaseAvailable } from '../content/levels/gac-troi-flow';
import { gacT02Intro, gacTroiMeeting } from '../content/levels/gac-troi-content';
import { GacTroiImpact } from './GacTroiImpact';
import { EarthDialogue } from './EarthDialogue';

export function GacTroiLevel({ language, progress, onChange, onBack, onBook, onChat, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void;
  onBack: () => void; onBook: () => void; onChat: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const [mapVisible, setMapVisible] = useState(false);
  const light = ['t03-map', 't03-story'].includes(progress.phase);
  const lightDialogue = ['t03-intro', 'gac-farewell'].includes(progress.phase);
  const free = progress.phase === 'gac-free';
  const intro = progress.phase === 'matching' && progress.turn < gacMatchingIntroLength;
  const summary = progress.phase === 'stories';
  const t02Intro = progress.phase === 't02-intro' && gacPhaseAvailable(progress.phase);
  const impact = ['t02-search', 't02-story'].includes(progress.phase) && gacPhaseAvailable(progress.phase);
  const matching = progress.phase === 'matching' && !intro;
  return <section className={`ending-scene gac-meeting${light || lightDialogue || free ? ' gac-later' : ''}${matching || impact || light ? ' gac-activity' : ''}`} hidden={paused} lang={language} aria-label={vi ? 'Gặp Gác Trời' : 'Meet Sky Watcher'}>
    <div className="surveyor-scene-hud"><span>{vi ? 'Gác Trời · Tín hiệu từ quỹ đạo' : 'Sky Watcher · A signal from orbit'}</span>
      {progress.phase === 't02-search' && <button className="gac-impact-help" onClick={onBook} disabled={paused}>{vi ? 'Gợi ý' : 'Hint'}</button>}
      <button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></div>
    {light ? <GacTroiLight language={language} progress={progress} onChange={onChange} onBook={onBook} paused={paused}/> : lightDialogue ? <EarthDialogue key={progress.phase} managedFocus language={language} paused={paused}
      title={vi ? (progress.phase === 't03-intro' ? 'Lối nào còn ánh sáng?' : 'Một chút sáng gửi Cuội') : (progress.phase === 't03-intro' ? 'Which way stays lit?' : 'A little light for Cuội')}
      lines={gacLightDialogue(progress.phase as GacLightDialoguePhase, language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(advanceGacDialogue(progress)); }} finalAction="moon"
      finalLabel={progress.phase === 't03-intro' ? (vi ? 'Cùng xem bản đồ' : 'Look at the map') : (vi ? 'Mình đi tiếp nhé!' : 'Let’s go on!')}/>
      : free ? <div className="gac-free-panel">
        <p>{vi ? 'Bên phải là triền đất thấp. Cuội đi tiếp nhé!' : 'The low slope is to the right. On we go, Cuội!'}</p>
        <nav><button onClick={onChat}>{vi ? 'Trò chuyện' : 'Chat'}</button><button aria-expanded={mapVisible} onClick={() => setMapVisible(v => !v)}>{vi ? 'Bản đồ trong đèn' : 'Map in the lantern'} ▤</button><button onClick={() => { if (!paused) onChange(replayGacTroi(progress)); }}>{vi ? 'Chơi lại Gác Trời' : 'Replay Sky Watcher'}</button></nav>
        {mapVisible && <div className="gac-free-map"><GacLightMap language={language}/><p>{vi ? 'Triền đất thấp → đá có khe → bóng cây đa.' : 'Low slope → split rock → banyan shadow.'}</p><button onClick={onBook}>{vi ? 'Mở bản đồ trong sách' : 'Open the map in the book'} ▤</button></div>}
      </div> : impact ? <GacTroiImpact language={language} progress={progress} onChange={onChange} paused={paused}/> : matching ? <GacTroiMatching language={language} progress={progress} onChange={onChange} onBook={onBook} paused={paused}/> : t02Intro ? <EarthDialogue key="t02-intro" managedFocus language={language} paused={paused}
      title={vi ? 'Đốm mới trong bức ảnh' : 'A new mark in the picture'} lines={gacT02Intro(language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(advanceGacDialogue(progress)); }}
      finalAction="moon" finalLabel={vi ? 'Cùng tìm dấu vết mới' : 'Find the new mark'}/> : (intro || summary) ? <EarthDialogue key={summary ? 'summary' : 'intro'} managedFocus language={language} paused={paused}
      title={vi ? 'Ghép ký ức' : 'Matching memories'} lines={gacMatchingDialogue(language, summary)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(summary ? advanceGacDialogue(progress) : { ...progress, phase: 'matching', turn: gacMatchingIntroLength }); }}
      finalAction="moon" finalLabel={summary ? (vi ? 'Cùng xem hai bức ảnh' : 'Look at the two pictures') : (vi ? 'Cùng xem ảnh' : 'Look at the pictures')}/> : progress.phase === 'meeting' ? <EarthDialogue key="meeting" managedFocus language={language} paused={paused}
      title={vi ? 'Một người bạn trên cao' : 'A friend above'} lines={gacTroiMeeting(language)} initialIndex={progress.turn}
      onTurn={turn => { if (!paused && turn !== progress.turn) onChange({ ...progress, turn }); }}
      onComplete={() => { if (!paused) onChange(advanceGacDialogue(progress)); }}
      finalAction="moon" finalLabel={vi ? 'Cùng nhìn lại hành trình' : 'Look back on our journey'}/>
      : <div className="ending-farewell"><p>{progress.farewellDone ? (vi ? 'Cuội dừng chân bên triền đất thấp, giữ bản đồ trong đèn. Cậu nghỉ một lát trước khi tìm tiếp chị Hằng.' : 'Cuội pauses by the low slope, keeping the map in his lantern. He rests a while before looking for Hằng.') : progress.t02Done ? (vi ? 'Cuội ghi nhớ cách đối chiếu hai bức ảnh. Cậu nghỉ chân bên ánh đèn, rồi sẽ tìm đường tới chị Hằng. Những câu chuyện đã biết vẫn ở trong sách.' : 'Cuội remembers how to compare the two pictures. He rests beside the lantern before looking for a way to chị Hằng. The stories he knows are still in the book.') : vi ? 'Cuội giữ lại lời nhắn của Gác Trời, nghỉ chân một lát rồi sẽ tìm đường tiếp. Những câu chuyện đã biết vẫn ở trong sách.' : 'Cuội keeps Sky Watcher’s message and rests a while before continuing the journey. The stories you know are still in your book.'}</p>
        <nav className="ending-actions"><button onClick={onBook}>{vi ? 'Xem lại những câu chuyện' : 'Revisit the stories'} ▤</button><button onClick={() => { if (!paused) onChange(replayGacTroi(progress)); }}>{vi ? 'Chơi lại Gác Trời' : 'Replay Sky Watcher'}</button><button className="journey-primary" onClick={onBack}>{vi ? 'Về lộ trình' : 'Return to the route'} →</button></nav></div>}
  </section>;
}
