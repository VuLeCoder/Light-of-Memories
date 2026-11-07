import { useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import { gacRabbitDialogue, type RabbitDialogue } from '../content/levels/gac-rabbit-dialogue';
import { applyGacRabbitAction, replayGacRabbitJourney, type rabbitDialogueLengths } from '../content/levels/gac-troi-rabbit';
import type { GacTroiProgress } from '../content/levels/gac-troi-progress';
import { EarthDialogue } from './EarthDialogue';
import { GacRabbitBackdrop, RabbitCuoi } from './GacRabbitBackdrop';
import './gac-rabbit.css';
import { Rabbit, TrailRock } from './GacRabbitArt';
import { GacCompanion } from './GacCompanion';
import { rabbitTrailLayouts } from '../content/levels/gac-rabbit-layout';

/** Dialogue and repeatable rest scene share the saved journey, never the legacy cursor. */
export function GacRabbitStory({ language, progress, onChange, onBack, onBook, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void;
  onBack: () => void; onBook: () => void; paused: boolean;
}) {
  const j = progress.rabbitJourney!;
  const vi = language === 'vi';
  const [chat, setChat] = useState(false);
  const latest = useRef(progress); latest.current = progress;
  const stage = j.stage;
  const free = stage === 'free';
  const together = ['reunion', 'farewell', 'free'].includes(stage);
  const dialogue = (chat ? 'chat' : stage) as RabbitDialogue;
  const titles = {
    real: vi ? 'Chuyện thật' : 'A real story',
    bridge: vi ? 'Theo Thỏ Ngọc' : 'Follow Moon Rabbit',
    reunion: vi ? 'Gặp lại dưới gốc đa' : 'Together beneath the banyan',
    farewell: vi ? 'Một chút sáng gửi Cuội' : 'A little light for Cuội',
    chat: vi ? 'Trò chuyện cùng bạn' : 'A chat with your friend',
  };
  const finalLabels = {
    real: vi ? 'Theo Thỏ Ngọc' : 'Follow Moon Rabbit',
    bridge: vi ? 'Tìm Thỏ nào!' : 'Let’s find Rabbit!',
    reunion: vi ? 'Ở lại dưới cây' : 'Stay beneath the tree',
    farewell: vi ? 'Ở lại dưới cây' : 'Stay beneath the tree',
    chat: vi ? 'Ở lại dưới cây' : 'Stay beneath the tree',
  };
  function advance(turn: number) {
    if (paused || free) return;
    const p = latest.current;
    const next = applyGacRabbitAction(p, { type: 'dialogue', stage: stage as keyof typeof rabbitDialogueLengths, turn });
    if (next !== p) { latest.current = next; onChange(next); }
  }
  const lit = progress.completedOnce || stage === 'free' || stage === 'farewell' && j.turn >= 3;
  return <section className="ending-scene gac-rabbit rabbit-story" hidden={paused} data-paused={paused} lang={language} aria-label={vi ? 'Câu chuyện Gác Trời' : 'Sky Watcher’s story'}>
    <div className="rabbit-hud"><span>{vi ? 'Gác Trời · Tín hiệu từ quỹ đạo' : 'Sky Watcher · A signal from orbit'}</span><nav><button onClick={onBack} disabled={paused}>{vi ? 'Về lộ trình' : 'Back to route'}</button></nav></div>
    <div className="rabbit-view">
      <GacRabbitBackdrop stop={together ? 'banyan' : 'slope'} hang={together} orbit={stage === 'real'}/><RabbitCuoi lit={lit}/>
      {stage === 'bridge' && <GacCompanion/>}
      <svg className="rabbit-rest-art" viewBox="0 0 960 540" aria-hidden="true">
        {stage === 'bridge' && rabbitTrailLayouts.slope.rocks.map(rock => <TrailRock key={rock.id} rock={rock}/>)}
        {together && <foreignObject x="735" y="365" width="64" height="84"><Rabbit sleeping={free || stage === 'farewell'}/></foreignObject>}
        {stage === 'farewell' && j.turn >= 2 && <path className={lit ? 'rabbit-gift is-lit' : 'rabbit-gift'} fill="#ffe3a2" d="m295 345 5 10 12 2-9 8 2 12-10-6-10 6 2-12-9-8 12-2Z"/>}
      </svg>
    </div>
    {free && !chat ? <div className="rabbit-panel">
      <p>{vi ? 'Cuội và chị Hằng nghỉ dưới cây đa, Thỏ Ngọc nằm nghỉ bên chị Hằng.' : 'Cuội and Hằng rest beneath the banyan, with Moon Rabbit resting beside Hằng.'}</p>
      <nav className="rabbit-rest-actions"><button onClick={() => setChat(true)}>{vi ? 'Trò chuyện' : 'Chat'}</button><button onClick={onBook}>{vi ? 'Mở sách' : 'Open book'}</button><button onClick={() => { if (!paused) onChange(replayGacRabbitJourney(progress)); }}>{vi ? 'Chơi lại tìm chị Hằng' : 'Replay the search for Hằng'}</button></nav>
    </div> : <EarthDialogue key={dialogue} language={language} paused={paused} managedFocus title={titles[dialogue]} lines={gacRabbitDialogue(dialogue, language)} initialIndex={chat ? 0 : j.turn}
      onTurn={turn => { if (!chat && turn === latest.current.rabbitJourney!.turn + 1) advance(turn - 1); }}
      onComplete={() => { if (paused) return; if (chat) setChat(false); else advance(j.turn); }} finalAction="moon" finalLabel={finalLabels[dialogue]}/>}
  </section>;
}
