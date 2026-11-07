import { gameAudio } from '../audio/game-audio';
import { portraits } from '../content/assets';
import { useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import { gacRabbitDialogue, rabbitMemoryNames, rabbitMemories, type RabbitDialogue } from '../content/levels/gac-rabbit-dialogue';
import { applyGacRabbitAction, replayGacRabbitJourney, type rabbitDialogueLengths } from '../content/levels/gac-troi-rabbit';
import type { GacTroiProgress } from '../content/levels/gac-troi-progress';
import { EarthDialogue } from './EarthDialogue';
import { GacRabbitBackdrop, RabbitCuoi } from './GacRabbitBackdrop';
import './gac-rabbit.css';
import { Rabbit, TrailRock, TrailGift } from './GacRabbitArt';
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
  const chooseMemory = j.stage === 'farewell' && j.turn === 0 && !j.memory;
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
    reunion: vi ? 'Kể chị nghe một câu chuyện' : 'Share a story with Hằng',
    farewell: vi ? 'Mang câu chuyện về nhà' : 'Bring the stories home',
    earth: vi ? 'Giữ lại đêm trăng này' : 'Remember this moonlit night',
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
      <GacRabbitBackdrop stop={together ? 'banyan' : 'slope'} hang={together} orbit={stage === 'real'} closing={earth ? 'earth' : undefined}/>{!earth && <RabbitCuoi lit={lit}/>}
      {stage === 'bridge' && <GacCompanion/>}
      <svg className="rabbit-rest-art" viewBox="0 0 960 540" aria-hidden="true">
        {stage === 'bridge' && rabbitTrailLayouts.slope.rocks.map(rock => <TrailRock key={rock.id} rock={rock}/>)}
        {together && <foreignObject x="735" y="365" width="64" height="84"><Rabbit sleeping={free || stage === 'farewell'}/></foreignObject>}

        {together && j.gifts?.map((kind,i)=><g key={kind} transform={`translate(${620+i*55} 485)`}><TrailGift kind={kind}/></g>)}
      </svg>
    </div>
    {chooseMemory ? <div className="rabbit-memory-choice rabbit-panel">
      <span className="rabbit-kicker">{vi?'MỘT CÂU CHUYỆN MANG THEO':'A STORY TO CARRY HOME'}</span>
      <h2>{vi?'Em muốn kể về ai trước?':'Whose story comes first?'}</h2>
      <div className="rabbit-memory-cards">{(['surveyor','sparkle','gac'] as const).map(friend=><button key={friend} onClick={()=>{if(paused)return;gameAudio.cue('success');onChange(applyGacRabbitAction(latest.current,{type:'memory',friend}));}}><img src={portraits[friend==='surveyor'?'matTron':friend==='sparkle'?'lapLanh':'gacTroi'].url} alt=""/><span>{rabbitMemoryNames[language][friend]}</span></button>)}</div>
      <p>{vi?'Chị Hằng ngồi lắng nghe. Mỗi người bạn đều đáng được nhớ tới.':'Hằng sits and listens. Every friend deserves to be remembered.'}</p>
    </div> : free && !chat ? <div className="rabbit-panel finale-message">
      <span className="rabbit-kicker">{vi?'HẾT MỘT CHUYẾN ĐI · CÒN NHỮNG CÂU CHUYỆN':'THE JOURNEY ENDS · THE STORIES STAY'}</span>
      <h2>{vi?'Mỗi lần nhìn lên trăng…':'Whenever you look at the Moon…'}</h2>
      <p>{vi?'An giữ chiếc đèn bên mình. Trên Mặt Trăng xa, những người bạn đã có thêm một người nhớ tới.':'An keeps the lantern close. Far away on the Moon, the friends have someone new to remember them.'}</p>
      {j.memory && <blockquote><b>{vi?'Cuội nhớ ':'Cuội remembers '}{rabbitMemoryNames[language][j.memory]}</b><span>{rabbitMemories[language][j.memory]}</span></blockquote>}
      <nav className="rabbit-rest-actions">
        <button className="rabbit-primary" onClick={onBook}>{vi?'Đọc lại những câu chuyện':'Read the stories again'}</button>
        <button onClick={() => onChange(replayGacRabbitJourney(progress))}>{vi?'Chơi lại tìm chị Hằng':'Replay the search'}</button>
        <button onClick={() => onChange({ ...progress, rabbitJourney: { ...j, stage: 'reunion', turn: 0, memory: undefined, farewellDone: false } })}>{vi?'Xem lại cuộc gặp':'Revisit the reunion'}</button>
      </nav>
    </div> : <EarthDialogue key={dialogue} language={language} paused={paused} autoAdvance={false} title={titles[dialogue]} lines={gacRabbitDialogue(dialogue, language, j)} initialIndex={chat ? 0 : j.turn}
      onTurn={turn => { if (!chat && turn === latest.current.rabbitJourney!.turn + 1) advance(turn - 1); }}
      onComplete={() => { if (paused) return; if (chat) setChat(false); else advance(j.turn); }} finalAction="moon" finalLabel={finalLabels[dialogue]}/>}
  </section>;
}
