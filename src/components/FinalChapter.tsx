import { useState } from 'react';
import { GameCanvas } from '../game/GameCanvas';
import { endingDialogue, type EndingProgress } from '../content/ending';
import type { Language } from '../content/i18n';
import { EarthDialogue } from './EarthDialogue';
import './final-chapter.css';

export function FinalChapter({ language, progress: p, onChange, onBack, onRestart, paused }: {
  language: Language; progress: EndingProgress; onChange: (p: EndingProgress) => void;
  onBack: () => void; onRestart: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const [confirm, setConfirm] = useState(false);
  const [ready, setReady] = useState(false);
  const walk = p.phase === 'walk';
  const earth = p.phase === 'earth' || p.phase === 'finished';
  const title = earth ? (vi ? 'Dưới hiên nhà, trăng vẫn sáng' : 'Moonlight on the porch') : (vi ? 'Ánh đèn tìm chị Hằng' : 'The lantern leads to Hằng');
  const go = (phase: EndingProgress['phase']) => { if (!paused) { setReady(false); onChange({ ...p, phase, turn: 0, completedOnce: p.completedOnce || phase === 'finished' }); } };
  return <section className={`ending-scene final-chapter${walk ? ' is-walking' : ''}`} hidden={paused} lang={language} aria-label={title}>
    <div className="final-canvas" inert={paused || !walk || !ready}>
      <GameCanvas key={p.phase} finale={walk ? 'walk' : p.phase === 'reunion' ? 'reunion' : p.phase === 'home' ? 'home' : undefined}
        scene={earth ? 'earth' : 'moon'} language={language} initiallyAwake encounterStarted quest="complete" treeSpeaking={false}
        taiStars={5} freeRoam={walk} moonMode={paused ? 'paused' : walk ? 'free' : 'story'}
        onReady={() => setReady(true)} onAwake={() => {}} onInteract={() => {}} onExit={() => go('reunion')}/>
    </div>
    <div className="surveyor-scene-hud" hidden={paused}><span>{title}</span><button onClick={() => { if (!paused) onBack(); }}>{vi ? 'Về lộ trình' : 'Back to route'}</button></div>
    {walk ? <div className="final-walk-note"><p>{vi ? 'Ánh đèn soi về phía sườn đồi quen thuộc. Cuội đi tiếp sang phải nhé.' : 'The lantern lights the familiar hillside. Walk to the right, Cuội.'}</p></div>
      : p.phase === 'finished' ? <div className="ending-farewell final-actions">
        <h2>{vi ? 'Một hành trình, những người bạn mới' : 'A journey, and new friends'}</h2>
        {confirm ? <div className="final-confirm" role="group" aria-label={vi ? 'Bắt đầu hành trình mới?' : 'Start a new journey?'}><p>{vi ? 'Chơi lại từ hiên nhà sẽ thay thế tiến độ hiện tại. Mình bắt đầu lại nhé?' : 'Starting again at the porch replaces this journey’s progress. Start again?'}</p><nav className="ending-actions"><button autoFocus onClick={() => setConfirm(false)}>{vi ? 'Giữ hành trình' : 'Keep this journey'}</button><button onClick={onRestart}>{vi ? 'Bắt đầu lại' : 'Start again'}</button></nav></div>
          : <nav className="ending-actions"><button data-final-primary onClick={() => go('walk')}>{vi ? 'Xem lại đoạn kết' : 'Replay the ending'}</button><button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button><button className="journey-primary" onClick={() => setConfirm(true)}>{vi ? 'Chơi lại hành trình' : 'Play the journey again'}</button></nav>}
      </div>
      : <EarthDialogue key={p.phase} language={language} paused={paused || !ready} managedFocus title={title} lines={endingDialogue(language, p.phase)} initialIndex={p.turn}
        onTurn={turn => { if (!paused && turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon"
        finalLabel={p.phase === 'reunion' ? (vi ? 'Cùng về bên cây đa' : 'Return to the banyan tree') : p.phase === 'home' ? (vi ? 'Trở về lời kể của bà' : 'Return to Grandma’s story') : (vi ? 'Giữ lại câu chuyện' : 'Keep the story')}
        onComplete={() => go(p.phase === 'reunion' ? 'home' : p.phase === 'home' ? 'earth' : 'finished')}/>}
  </section>;
}
