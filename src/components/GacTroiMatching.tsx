import { useLayoutEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import { gacMemories, gacSites, type GacFriend } from '../content/levels/gac-troi-matching';
import { finishGacMemory, matchGacFriend, type GacTroiProgress } from '../content/levels/gac-troi-progress';
import { gacImage } from '../content/levels/gac-troi-images';
import { GacTroiImage } from './GacTroiImage';

export function GacTroiMatching({ language, progress, onChange, onBook, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void; onBook: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const [selected, setSelected] = useState<GacFriend | null>(null);
  const [siteIndex, setSiteIndex] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [revisit, setRevisit] = useState<GacFriend | null>(null);
  const pending = progress.matched.find(id => !progress.seen.includes(id));
  const memory = gacMemories.find(m => m.id === (pending ?? revisit));
  const site = gacSites[siteIndex];
  const chosen = gacMemories.find(m => m.id === selected);
  const area = useRef<HTMLDivElement>(null);
  const returnFriend = useRef<GacFriend | null>(null);
  const previousMemory = useRef(memory?.id);
  useLayoutEffect(() => {
    if (paused || previousMemory.current === memory?.id) return;
    previousMemory.current = memory?.id;
    const target = memory ? area.current?.querySelector<HTMLElement>('[data-gac-continue]')
      : area.current?.querySelector<HTMLElement>(`[data-gac-friend="${returnFriend.current}"]`);
    target?.focus({ preventScroll: true });
  }, [memory?.id, paused]);
  if (memory) {
    const photo = gacImage(memory.image);
    return <div className="gac-memory" ref={area}>
      <header><span>{memory.name[language]}</span><h2>{memory.title[language]}</h2></header>
      <figure><GacTroiImage key={memory.image} id={memory.image} language={language}/><figcaption>{memory.caption[language]}</figcaption></figure>
      <div className="gac-memory-copy"><p>{memory.story[language]}</p>
        <a href={photo.sourcePage} target="_blank" rel="noreferrer">{photo.credit} ↗</a>
        <button className="journey-primary" data-gac-continue onClick={() => {
          if (paused) return;
          returnFriend.current = memory.id;
          setRevisit(null); setSelected(null); setWrong(false);
          if (pending) onChange(finishGacMemory(progress, pending));
        }}>{vi ? 'Giữ câu chuyện này' : 'Keep this story'} →</button>
      </div>
    </div>;
  }
  return <div className="gac-match" ref={area}>
    <header><h2>{vi ? 'Bốn người bạn, ba vùng đất' : 'Four friends, three places'}</h2><span>{progress.matched.length}/4</span></header>
    <p className="gac-match-instruction">{vi ? 'Chọn một người bạn, rồi chọn vùng đất bạn ấy ở.' : 'Choose a friend, then choose the place where they live.'}</p>
    <div className="gac-friends" aria-label={vi ? 'Các người bạn' : 'Friends'}>{gacMemories.map(m => {
      const done = progress.matched.includes(m.id);
      return <button key={m.id} className={done ? 'gac-friend-complete' : undefined} data-gac-friend={m.id} aria-pressed={!done && selected === m.id} aria-label={`${m.name[language]}${done ? (vi ? ' · Xem lại câu chuyện' : ' · Read the story again') : ''}`} onClick={() => {
        if (paused) return;
        returnFriend.current = m.id;
        if (done) setRevisit(m.id); else { setSelected(m.id); setWrong(false); }
      }}><img src={m.portrait} alt=""/><span>{m.name[language]}{done ? ' ✓' : ''}</span></button>;
    })}</div>
    <div className="gac-sites" aria-label={vi ? 'Các vùng đất' : 'Places'}>{gacSites.map((s, i) => <button key={s.id} aria-pressed={i === siteIndex} onClick={() => { setSiteIndex(i); setWrong(false); }}>{s.name}<span>{gacMemories.filter(m => m.site === s.id && progress.matched.includes(m.id)).map(m => m.name[language]).join(' · ') || s.place[language]}</span></button>)}</div>
    <figure className="gac-site-photo"><GacTroiImage key={site.image} id={site.image} language={language}/><figcaption><a href={gacImage(site.image).sourcePage} target="_blank" rel="noreferrer">{gacImage(site.image).credit} ↗</a></figcaption></figure>
    <div className="gac-match-response" role="status" aria-live="polite">{wrong ? (vi ? 'Mình thử nhớ lại nhé. Bạn ấy gắn với chuyến thám hiểm nào nhỉ?' : 'Let’s think back. Which mission was this friend part of?') : chosen ? (vi ? `Đã chọn ${chosen.name.vi}. Bạn ấy ở ${site.name} phải không?` : `${chosen.name.en} selected. Is ${site.name} their home?`) : (vi ? 'Có hai người bạn cùng ở vùng Apollo 12.' : 'Two friends share the Apollo 12 area.')}</div>
    <nav className="gac-match-actions">
      <button onClick={() => { if (!paused) onBook(); }}>{vi ? 'Gợi ý' : 'Hint'}</button>
      <button className="journey-primary" data-gac-confirm disabled={!selected} onClick={() => {
        if (!selected || paused) return;
        const next = matchGacFriend(progress, selected, site.id);
        if (next === progress) { setWrong(true); }
        else { returnFriend.current = selected; onChange(next); }
      }}>{vi ? 'Ghép vào vùng này' : 'Match to this place'} →</button>
    </nav>
  </div>;
}
