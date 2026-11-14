import { gameAudio } from '../../audio/game-audio';
import { finaleLines } from '../../content/story/ending/dialogue';
import { cards, hints } from '../../content/story/ending/challenges/cards';
import { retainEndingBookUnlocks } from '../../content/book/ending-progress';
import { useEffect, useState } from 'react';
import type { Language } from '../../content/i18n';
import type { GacTroiProgress } from '../../content/friends/gac-troi/progress';
import { FinaleBackdrop, FinaleCuoi } from '../../game/scenes/ending/backdrop';
import { EarthDialogue } from '../shared/EarthDialogue';
import './finale-scene.css';
import './hang-finale.css';
import { ProjectCredits } from './ProjectCredits';
function CardPicture({index,label}:{index:number;label:string}) {
 const portraits=['lap-lanh','gac-troi','mat-tron'];
 if(index<3) return <img className="finale-card-art" src={`${import.meta.env.BASE_URL}images/portraits/${portraits[index]}.webp`} alt={label}/>;
 return <svg className="finale-card-art" viewBox="0 0 240 120" role="img" aria-label={label}>
 <ellipse cx="120" cy="106" rx="94" ry="8" fill="#101e28"/>
 {index===3 ? <g fill="#9dabb1" stroke="#e2d5ad" strokeWidth="2" transform="rotate(-15 120 60)"><path d="M80 30q-16 0-16 22v25q0 13 14 13h10V55q0-25-8-25Z"/><path d="M84 96h-20v10h20Z"/><path d="M150 12q-16 0-16 22v25q0 13 14 13h10V37q0-25-8-25Z"/><path d="M154 78h-20v10h20Z"/></g>
 : index===4 ? <g stroke="#e6cd8b" strokeWidth="3"><path d="m56 27 24-10 12 6 12-7 76 18-9 12 12 11-10 10 7 25-16 9-12-6-12 5-79-19 9-11-9-10 7-12Z" fill="#b46d51"/><path d="m88 29 66 16-10 39-66-16Z" fill="#e5ce93"/><path d="m106 41 29 7-6 22-29-7Z" fill="#587a72"/></g>
 : <g fill="none" stroke="#e0bd79" strokeWidth="7" strokeLinecap="round"><path d="M42 86c28-56 56 14 80-26s68-27 63 0-42 16-45-3 34-41 57-20"/><path d="m115 68-19 28m25-32 30 32"/></g>}
 </svg>;
}
export function HangFinale({language,progress,onChange,paused,onBack,onReplayCreditsChange}:{language:Language;progress:GacTroiProgress;onChange:(p:GacTroiProgress)=>void;paused:boolean;onBack:()=>void;onBook:()=>void;onReplayCreditsChange:(active:boolean)=>void}) {
 const vi=language==='vi', f=progress.finale??{stage:0,turn:0,cards:0};
 const [replayCredits,setReplayCredits]=useState(false);
 useEffect(()=>{onReplayCreditsChange(replayCredits);return ()=>onReplayCreditsChange(false);},[replayCredits,onReplayCreditsChange]);
 const [answer,setAnswer]=useState<number|null>(null);
 const [hintOpen,setHintOpen]=useState(false);
 const [returningHome,setReturningHome]=useState(false);
 useEffect(()=>{
  if(!returningHome||paused||progress.finale?.stage!==2)return;
  const timer=window.setTimeout(()=>onChange({...progress,finale:{...progress.finale!,stage:3,turn:0}}),window.matchMedia('(prefers-reduced-motion: reduce)').matches?100:800);
  return ()=>window.clearTimeout(timer);
 },[returningHome,paused,progress,onChange]);
 useEffect(()=>{
  if(!returningHome||paused||progress.finale?.stage!==3)return;
  const timer=window.setTimeout(()=>setReturningHome(false),window.matchMedia('(prefers-reduced-motion: reduce)').matches?200:1200);
  return ()=>window.clearTimeout(timer);
 },[returningHome,paused,progress.finale?.stage]);
 const update=(changes:Partial<typeof f>)=>{if(!paused) {
  if (changes.stage === 4) gameAudio.cue('gift');
  onChange(retainEndingBookUnlocks({...progress,finale:{...f,...changes},storyCompletedOnce:progress.storyCompletedOnce||changes.stage===4}));}};
 const currentLine=finaleLines[f.stage]?.[Math.min(f.turn, (finaleLines[f.stage]?.length ?? 1)-1)]?.[0];
 const earth=f.stage>=3, card=cards[Math.min(5,f.cards)], correct=f.cards%2;
 return <section hidden={paused} className="ending-scene finale-scene hang-arrival hang-finale" aria-label={vi?'Cuội và chị Hằng':'Cuội and Hằng'}>
 <div className="finale-view" key={String(earth)}><FinaleBackdrop closing={earth?'earth':'moon'} showHang={f.stage!==0||currentLine!=='banyan-return'}/>{!earth&&<FinaleCuoi/>}</div>
 <div className="surveyor-scene-hud"><nav className={f.stage===4?'finale-home-panel':undefined}>{f.stage===4&&<h2>{vi?'Câu chuyện dưới ánh trăng':'A story beneath the Moon'}</h2>}<div className="finale-home-actions"><button onClick={onBack}>{vi?'Về lộ trình':'Back to route'}</button> {f.stage===4&&<><button onClick={()=>setReplayCredits(true)}>{vi?'Xem lại giới thiệu':'Replay credits'}</button><button onClick={()=>{setAnswer(null);update({stage:0,turn:0,cards:0});}}>{vi?'Chơi lại đoạn kết':'Replay ending'}</button></>}</div></nav><strong>★ 5/5</strong></div>
 {f.stage===1 ? <div className="finale-cards"><h2>{vi?'Bạn hay rác?':'Friend or litter?'} · {Math.min(6,f.cards+1)}/6</h2><CardPicture index={Math.min(5,f.cards)} label={card[vi?1:2]}/><h3>{card[vi?1:2]}</h3><p>{card[vi?3:4]}</p><div>{[0,1].map(i=><button key={i} disabled={paused||hintOpen||answer===correct} onClick={()=>{if(paused)return;gameAudio.cue(i===correct?'success':'retry');setAnswer(i);setHintOpen(true);}}>{card[(i===correct?5:7)+(vi?0:1)]}</button>)}</div></div>
 : f.stage===5||replayCredits ? <ProjectCredits language={language} paused={paused} onComplete={()=>{if(replayCredits)setReplayCredits(false);else {update({stage:4,turn:0});onBack();}}}/>
 : f.stage===4 ? null
 : <EarthDialogue key={f.stage} autoAdvance={f.stage===3} autoAdvanceDelay={1100} language={language} paused={paused||returningHome} title={earth?(vi?'An và bà':'An and Grandma'):(vi?'Cuội và chị Hằng':'Cuội and Hằng')} lines={finaleLines[f.stage].map(([id,speaker,v,e])=>({id:`finale-${id}`,speaker,text:vi?v:e}))} initialIndex={f.turn} onTurn={turn=>{if(turn!==f.turn)update({turn});}} onComplete={()=>{if(f.stage===2){gameAudio.cue('gift');setReturningHome(true);}else update({stage:f.stage===3?5:f.stage===0&&f.cards===6?2:f.stage+1,turn:0});}} finalAction="moon" finalLabel={vi?(f.stage===0?'Cùng chị xem thẻ':f.stage===2?'Dưới ánh trăng quê nhà':'Khép lại câu chuyện'):(f.stage===0?'Explore the cards':f.stage===2?'Under the moon at home':'Close the story')}/>}
 {f.stage===1&&hintOpen&&<div className="finale-hint-shade"><EarthDialogue key={`hint-${f.cards}`} language={language} paused={paused} title={answer===correct?(vi?'Chị Hằng kể thêm':'Hằng shares more'):(vi?'Chị Hằng gợi ý':'Hằng’s hint')} lines={[{id:`hint-${f.cards}`,speaker:'chiHang',text:answer===correct?card[vi?9:10]:hints[Math.min(5,f.cards)][vi?0:1]}]} onTurn={()=>{}} onComplete={()=>{setHintOpen(false);setAnswer(null);if(answer===correct)update(f.cards===5?{cards:6,stage:2,turn:0}:{cards:f.cards+1});}} finalAction="moon" finalLabel={answer===correct?(vi?'Mình hiểu rồi':'I understand'):(vi?'Để em thử lại':'Let me try again')}/></div>}
 {returningHome&&<div className="star-travel" style={{animationPlayState:paused?'paused':'running'}} onAnimationEnd={()=>setReturningHome(false)} aria-hidden="true"/>}
 </section>;
}
