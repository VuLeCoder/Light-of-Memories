import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import { friendArt, friendStories, type FriendId } from '../content/levels/friends';
import { orderedFriends, type FriendProgress } from '../content/levels/friends-progress';
import { FriendChallenges } from './FriendChallenges';

export function JourneyLantern({ count }: { count: number }) {
  const panels = ['M120 110L97 79L120 26L143 79Z','M120 110L143 79L208 85L159 126Z','M120 110L159 126L175 190L120 156Z','M120 110L120 156L65 190L81 126Z','M120 110L81 126L32 85L97 79Z'];
  return <svg className="journey-lantern" viewBox="0 0 240 240" role="img" aria-label={`★ ${count}/5`}>
    <circle cx="120" cy="110" r="95" fill="#edc979" opacity={count*.025}/><path d="M120 10V26M65 190v35m110-35v35" stroke="#caa76d" strokeWidth="3"/>
    {panels.map((d,i)=><path key={i} d={d} fill={i<count?'#f6d891':'#4f493d'} stroke="#bda171" strokeWidth="2" className={i<count?'lit-panel':''}/>)}
    <path d="M120 26v130M32 85l127 41M208 85L81 126M65 190l78-111M175 190L97 79" fill="none" stroke="#a98c5a" opacity=".6"/>
    <circle cx="120" cy="110" r="5" fill="#dfc38c"/><path d="M60 216h10l3 15H57zm110 0h10l3 15h-16z" fill="#9d6146"/>
  </svg>;
}

export function FriendLevel({ id, language, progress, onChange, onBack, onNext }: {
  id: FriendId; language: Language; progress: FriendProgress; onChange: (p: FriendProgress)=>void; onBack: ()=>void; onNext: ()=>void;
}) {
  const vi=language==='vi', s=friendStories[language][id];
  const [hint,setHint]=useState(false);
  const title=useRef<HTMLHeadingElement>(null);
  const chapter=orderedFriends.indexOf(id)+2;
  const task=progress.step>=1&&progress.step<=3;
  useEffect(()=>{setHint(false);title.current?.focus({preventScroll:true});},[progress.step,id]);
  const advance=()=>onChange({...progress,step:progress.step+1,answers:[]});
  return <section className={`journey-view friend-level friend-${id}`} lang={language} aria-labelledby="friend-title">
    <header className="friend-header"><div><span className="friend-eyebrow">{String(chapter).padStart(2,'0')} · {s.name}</span><h2 id="friend-title" ref={title} tabIndex={-1}>{task?`T0${progress.step} · ${s.tasks[progress.step-1]}`:s.title}</h2></div><span className="friend-memory-count" aria-label={`${vi?'Ký ức':'Memories'} ${Math.min(3,Math.max(0,progress.step-1))}/3`}>{Array.from({length:3},(_,i)=>i<progress.step-1?'★':'☆').join(' ')}</span></header>
    {progress.step===0?<div className="friend-intro"><figure className="friend-portrait-scene"><img src={friendArt(id)} alt={s.name}/><figcaption>{vi?'MỘT NGƯỜI BẠN ĐANG CHỜ':'A FRIEND IS WAITING'}</figcaption></figure><blockquote><b>{s.name}:</b> “{s.opening}”</blockquote><p><b>Cuội:</b> {s.reply}</p><button className="journey-primary" onClick={advance}>{vi?'Cùng tìm lại ký ức':'Find the memories together'} →</button></div>:task?<>
      <p className="friend-task-instruction">{s.instructions[progress.step-1]}</p>
      <FriendChallenges key={`${id}-${progress.step}`} id={id} language={language} progress={progress} onChange={onChange} onSuccess={advance}/>
    </>:<div className="friend-ending"><JourneyLantern count={progress.step===5?chapter:chapter-1}/><blockquote><b>{s.name}:</b> “{s.ending}”</blockquote>{progress.step===5?<><p><b>Cuội:</b> {s.promise}</p><p className="friend-reward" role="status">✦ {vi?`Cánh sao thứ ${chapter} đã sáng`:`Star point ${chapter} is shining`} · {chapter}/5</p><button className="journey-primary" onClick={onNext}>{id==='footprint'?(vi?'Tìm chị Hằng':'Find Hằng'):(vi?'Đến người bạn tiếp theo':'Meet the next friend')} →</button></>:<button className="journey-primary" onClick={advance}>{vi?'Thắp sáng một cánh sao':'Light a star point'} ✦</button>}</div>}
    <footer className="friend-footer"><button onClick={onBack}>← {vi?'Lộ trình':'Route'}</button>{task?<button aria-expanded={hint} onClick={()=>setHint(!hint)}>{vi?'Gợi ý':'Hint'} ?</button>:<small>{vi?'Một câu chuyện tưởng tượng dưới trăng.':'An imaginary tale beneath the Moon.'}</small>}</footer>
    {hint&&task&&<aside className="friend-hint" role="status"><span>{s.hints[progress.step-1]}</span><button onClick={()=>setHint(false)} aria-label={vi?'Đóng gợi ý':'Close hint'}>×</button></aside>}
  </section>;
}
