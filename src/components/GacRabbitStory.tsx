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
  const together = ['reunion', 'farewell'].includes(stage);
  const earth = stage === 'earth' || free;
  const dialogue = (chat ? 'chat' : stage) as RabbitDialogue;
  const titles = {
    real: vi ? 'Chuyện thật' : 'A real story',
    bridge: vi ? 'Theo Thỏ Ngọc' : 'Follow Moon Rabbit',
    reunion: vi ? 'Gặp lại dưới gốc đa' : 'Together beneath the banyan',
    farewell: vi ? 'Những người bạn ở lại' : 'The friends who remain',
    earth: vi ? 'An và Bà' : 'An and Grandma',
    chat: vi ? 'Trò chuyện cùng bạn' : 'A chat with your friend',
  };
  const finalLabels = {
    real: vi ? 'Theo Thỏ Ngọc' : 'Follow Moon Rabbit',
    bridge: vi ? 'Tìm Thỏ nào!' : 'Let’s find Rabbit!',
    reunion: vi ? 'Về nơi thức giấc' : 'Return to the beginning',
    farewell: vi ? 'Khép lại chuyến đi' : 'Close the adventure',
    earth: vi ? 'Lời nhắn cuối' : 'A final message',
    chat: vi ? 'Ở lại dưới cây' : 'Stay beneath the tree',
  };
  function advance(turn: number) {
    if (paused || free) return;
    const p = latest.current;
    const next = applyGacRabbitAction(p, { type: 'dialogue', stage: stage as keyof typeof rabbitDialogueLengths, turn });
    if (next !== p) { latest.current = next; onChange(next); }
  }
  const lit = progress.completedOnce || stage === 'free' || stage === 'farewell' && j.turn >= 3;
  return <section className="ending-scene gac-rabbit rabbit-story story-finale" data-ending={stage} hidden={paused} data-paused={paused} lang={language} aria-label={vi ? 'Câu chuyện Gác Trời' : 'Sky Watcher’s story'}>
    <div className="rabbit-hud"><span>{earth ? (vi ? 'Dưới ánh trăng quê nhà' : 'Under the moon at home') : together ? (vi ? 'Cuội và chị Hằng' : 'Cuội and Hằng') : (vi ? 'Gác Trời · Tín hiệu từ quỹ đạo' : 'Sky Watcher · A signal from orbit')}</span><nav><button onClick={onBack} disabled={paused}>{vi ? 'Về lộ trình' : 'Back to route'}</button></nav></div>
    <div className="rabbit-view">
      <GacRabbitBackdrop stop={together ? 'banyan' : 'slope'} hang={together} orbit={stage === 'real'} closing={earth ? 'earth' : stage === 'farewell' ? 'moon' : undefined}/>{!earth && <RabbitCuoi lit={lit}/>}
      {stage === 'bridge' && <GacCompanion/>}
      <svg className="rabbit-rest-art" viewBox="0 0 960 540" aria-hidden="true">
        {stage === 'bridge' && rabbitTrailLayouts.slope.rocks.map(rock => <TrailRock key={rock.id} rock={rock}/>)}
        {together && <foreignObject x="735" y="365" width="64" height="84"><Rabbit sleeping={free || stage === 'farewell'}/></foreignObject>}

      </svg>
    </div>
    {free && !chat ? <div className="rabbit-panel finale-message" role="status">
      <p>{vi ? 'Nhớ những đóng góp đã qua. Giữ gìn những nơi ta sẽ đến.' : 'Remember the contributions of the past. Care for the places we will visit.'}</p>
      <nav className="rabbit-rest-actions">
        <button onClick={() => { onChange({ ...progress, rabbitJourney: { ...j, stage: 'farewell', turn: 0, farewellDone: false } }); }}>{vi ? 'Xem lại đoạn kết' : 'Watch the ending again'}</button>
        <button onClick={onBook}>{vi ? 'Mở sách' : 'Open book'}</button>
        <button onClick={() => onChange(replayGacRabbitJourney(progress))}>{vi ? 'Chơi lại tìm chị Hằng' : 'Replay the search for Hằng'}</button>
      </nav>
    </div> : <EarthDialogue key={dialogue} language={language} paused={paused} autoAdvance={stage === 'earth'} title={titles[dialogue]} lines={gacRabbitDialogue(dialogue, language)} initialIndex={chat ? 0 : j.turn}
      onTurn={turn => { if (!chat && turn === latest.current.rabbitJourney!.turn + 1) advance(turn - 1); }}
      onComplete={() => { if (paused) return; if (chat) setChat(false); else advance(j.turn); }} finalAction="moon" finalLabel={finalLabels[dialogue]}/>}
  </section>;
}
