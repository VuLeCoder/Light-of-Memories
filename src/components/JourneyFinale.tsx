import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import { getLevel, type LevelId } from '../content/levels';
import { friendStories, friendIds } from '../content/levels/friends';
import { type FriendsProgress } from '../content/levels/friends-progress';
import { portraits } from '../content/assets';
import { JourneyLantern } from './FriendLevel';

export function JourneyFinale({language,progress,onChange,onBack}:{language:Language;progress:FriendsProgress;onChange:(p:FriendsProgress)=>void;onBack:()=>void}) {
  const vi=language==='vi';
  const [step,setStep]=useState(progress.finale.seen?2:0);
  const title=useRef<HTMLHeadingElement>(null);
  useEffect(()=>{title.current?.focus({preventScroll:true});},[step]);
  const chosen=getLevel(progress.finale.choice);
  const memories=vi?['Mắt Tròn đã giúp mình tìm lại những bức ảnh của một cuộc gặp.','Mỗi nơi Bánh Bụi ghé qua đều mang về một điều mới.','Gương Nhỏ cho mình thấy một lời chào có thể tìm đường trở lại.','Cờ Nhỏ nhắc mình giữ lại một điều thật rõ.','Bước Nhỏ cho mình biết đã có người từng đứng ở đây và nhìn lên bầu trời.']:['Round Eyes helped me recover the photographs of a meeting.','Every place Dusty Wheels visited brought back something new.','Little Mirror showed me that a greeting can find its way back.','Little Flag reminded me to keep one clear detail.','Little Step showed me that someone stood here and looked up at the sky.'];
  const ids:LevelId[]=['surveyor',...friendIds];
  return <section className="journey-view journey-finale" aria-labelledby="finale-title" lang={language}>
    <span className="friend-eyebrow">✦ {vi?'NĂM ÁNH SAO · MỘT CUỘC GẶP':'FIVE LIGHTS · ONE REUNION'}</span>
    <h2 id="finale-title" ref={title} tabIndex={-1}>{vi?'Chị Hằng ở đây rồi!':'There you are, Hằng!'}</h2>
    {step===0?<><div className="reunion-scene"><img src={portraits.cuoi.url} alt="Cuội"/><JourneyLantern count={5}/><img src={portraits.chiHang.url} alt={vi?'Chị Hằng':'Hằng'}/></div><p>{vi?'Năm cánh đèn nối những nét đường đã đi qua. Cuội tìm thấy chị Hằng đang ngắm Trái Đất.':'Five lit points connect the paths you have travelled. Cuội finds Hằng gazing at Earth.'}</p><blockquote><b>{vi?'Chị Hằng':'Hằng'}:</b> “{vi?'Em tìm thấy chị rồi. Trên đường đi có gì vui không?':'You found me! What did you discover along the way?'}”</blockquote><button className="journey-primary" onClick={()=>setStep(1)}>{vi?'Em gặp được năm người bạn…':'I met five friends…'} →</button></>:<>
      <p>{vi?'Cuội mở sổ. Bạn muốn kể về ai trước?':'Cuội opens the journal. Whose story will you tell first?'}</p>
      <div className="finale-friends">{ids.map(id=>{const level=getLevel(id)!;return <button key={id} aria-pressed={progress.finale.choice===id} onClick={()=>onChange({...progress,finale:{...progress.finale,choice:id}})}><img src={level.portrait} alt=""/><span>{id==='surveyor'?(vi?'Mắt Tròn':'Round Eyes'):friendStories[language][id].name}</span></button>;})}</div>
      {chosen?<blockquote className="reunion-memory"><b>Cuội:</b> {memories[ids.indexOf(chosen.id)]}</blockquote>:<p className="reunion-memory">{vi?'Mỗi người bạn đều có một câu chuyện đáng nhớ.':'Every friend has a story worth remembering.'}</p>}
      {step===2?<><p className="friend-reward" role="status">{vi?'Cả năm câu chuyện đã có một người nhớ đến.':'All five stories now have someone to remember them.'}</p><button className="journey-primary" onClick={onBack}>{vi?'Mở lại lộ trình':'Return to the route'}</button></>:<button className="journey-primary" disabled={!chosen} onClick={()=>{onChange({...progress,finale:{...progress.finale,seen:true}});setStep(2);}}>{vi?'Giữ những người bạn trong ký ức':'Keep our friends in memory'} ✦</button>}
    </>}
    <button className="finale-back" onClick={onBack}>← {vi?'Về lộ trình':'Back to the route'}</button>
  </section>;
}
