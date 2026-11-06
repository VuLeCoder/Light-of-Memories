import { useState } from 'react';
import type { Language } from '../content/i18n';
import { gacMemories } from '../content/levels/gac-troi-matching';
import { connectGacRoute, findGacChange, gacTroiFriends, type GacTroiProgress } from '../content/levels/gac-troi-progress';
import { GacTroiImage } from './GacTroiImage';

type Props = { language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void; onBook: () => void; paused: boolean };
export function GacTroiRoute({ language, progress: p, onChange, onBook, paused }: Props) {
  const vi = language === 'vi';
  const [wrong, setWrong] = useState(false);
  const done = p.route.length === gacTroiFriends.length;
  return <div className="gac-task">
    <header><h2>{vi ? 'Nhớ đường đã qua' : 'Remember the journey'}</h2><span>{p.route.length}/{gacTroiFriends.length}</span></header>
    <p>{vi ? 'Chọn các bạn theo thứ tự Cuội đã gặp.' : 'Choose the friends in the order Cuội met them.'}</p>
    <div className="gac-route-cards">{[...gacMemories].reverse().map(m => {
      const index = p.route.indexOf(m.id);
      return <button key={m.id} disabled={index >= 0} aria-label={`${m.name[language]}${index >= 0 ? ` · ${index + 1}` : ''}`} onClick={() => {
        if (paused) return;
        const next = connectGacRoute(p, m.id);
        setWrong(next === p); onChange(next);
      }}><img src={m.portrait} alt=""/><strong>{m.name[language]}</strong><span>{m.site === 'apollo12' ? 'Apollo 12' : 'Apollo 17'}{index >= 0 ? ` · ${index + 1} ✓` : ''}</span></button>;
    })}</div>
    <p className="gac-route-light" aria-label={vi ? 'Thứ tự hành trình' : 'Journey order'}>{p.route.map(id => gacMemories.find(m => m.id === id)!.name[language]).join(' → ') || '✧'}</p>
    <p role="status">{done ? (vi ? 'Mình đã nhớ đường rồi! Trước khi đi tiếp, cùng Gác Trời xem một vùng đất đã thay đổi nhé.' : 'You remembered the way! Before going on, look with Sky Watcher at a place that has changed.') : wrong ? (vi ? 'Cuội gặp ai trước khi tới thung lũng của Bánh Lưới nhỉ?' : 'Who did Cuội meet before reaching Mesh Wheels’ valley?') : (vi ? 'Đây là thứ tự những cuộc gặp trong truyện, không phải đường đi trên bản đồ địa lý.' : 'This is the order of encounters in the story, rather than a geographical route.')}</p>
    <nav className="gac-match-actions"><button onClick={() => { if (!paused) onBook(); }}>{vi ? 'Gợi ý' : 'Hint'}</button><button disabled={!p.route.length} onClick={() => { if (!paused) { setWrong(false); onChange({ ...p, route: p.route.slice(0, -1) }); } }}>{vi ? 'Hoàn tác' : 'Undo'}</button>
      <button className="journey-primary" data-gac-continue disabled={!done} onClick={() => { if (!paused && done) onChange({ ...p, phase: 'changes', turn: 0 }); }}>{vi ? 'Xem điều đổi thay' : 'See what changed'} →</button></nav>
  </div>;
}

const regions = {
  vi: ['trên trái', 'trên giữa', 'trên phải', 'giữa trái', 'chính giữa', 'giữa phải', 'dưới trái', 'dưới giữa', 'dưới phải'],
  en: ['top left', 'top centre', 'top right', 'middle left', 'centre', 'middle right', 'bottom left', 'bottom centre', 'bottom right'],
};
export function GacTroiChanges({ language, progress: p, onChange, onBook, paused }: Props) {
  const vi = language === 'vi';
  const [after, setAfter] = useState(false);
  const [wrong, setWrong] = useState<number | null>(null);
  return <div className="gac-task gac-changes">
    <header><h2>{vi ? 'Một vùng đất đổi thay' : 'A place that changed'}</h2><span>3/3</span></header>
    <p>{vi ? 'Đổi qua lại hai ảnh, rồi chọn vùng có hố mới trên ảnh sau.' : 'Switch between the pictures, then select the new crater’s area in the later image.'}</p>
    <div className="gac-sites"><button aria-pressed={!after} onClick={() => { if (!paused) setAfter(false); }}>{vi ? 'Trước · 12/02/2012' : 'Before · 12 Feb 2012'}</button><button aria-pressed={after} onClick={() => { if (!paused) setAfter(true); }}>{vi ? 'Sau · 28/07/2013' : 'After · 28 Jul 2013'}</button></div>
    <figure className="gac-change-figure"><div className="gac-change-image">
      <GacTroiImage key={after ? 'after' : 'before'} id={after ? 'impact2013-after' : 'impact2013-before'} language={language}/>
      {after && !p.changeFound && <div className="gac-change-regions" aria-label={vi ? 'Chọn vùng thay đổi' : 'Select a changed area'}>{regions[language].map((label, i) => <button key={i} className={wrong === i ? 'gac-wrong-region' : ''} aria-label={`${vi ? 'Vùng' : 'Area'} ${label}`} onClick={() => {
        if (paused) return;
        const next = findGacChange(p, i);
        setWrong(next === p ? i : null); onChange(next);
      }}/>)}</div>}
      {after && p.changeFound && <span className="gac-crater-found" aria-label={vi ? 'Hố va chạm mới' : 'New impact crater'}/>}
    </div><figcaption><a href="https://svs.gsfc.nasa.gov/4242/" target="_blank" rel="noreferrer">NASA/GSFC/Arizona State University ↗</a></figcaption></figure>
    <p role="status">{p.changeFound ? (vi ? 'Đúng rồi! Hố mới rộng khoảng 18 m. Ảnh chụp trước và sau giúp các nhà khoa học nhận ra thay đổi.' : 'That’s it! The new crater is about 18 m wide. Before and after pictures help scientists find changes.') : wrong !== null ? (vi ? 'Thử đổi lại ảnh trước nhé. Vùng nào có một đốm sáng mới xuất hiện?' : 'Try looking at the earlier image again. Where did a new bright spot appear?') : (vi ? 'Hai ảnh cùng một vùng, cùng tỉ lệ. Cuội đang học cách quan sát sự thay đổi.' : 'Both pictures show the same area at the same scale. Cuội is learning to notice change.')}</p>
    <nav className="gac-match-actions"><button onClick={() => { if (!paused) onBook(); }}>{vi ? 'Gợi ý' : 'Hint'}</button><button className="journey-primary" data-gac-continue disabled={!p.changeFound} onClick={() => { if (!paused && p.changeFound) onChange({ ...p, phase: 'farewell', turn: 0 }); }}>{vi ? 'Trò chuyện cùng Gác Trời' : 'Talk with Sky Watcher'} →</button></nav>
  </div>;
}
