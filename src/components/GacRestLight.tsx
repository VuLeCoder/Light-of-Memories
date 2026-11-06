import { useState } from 'react';
import type { Language } from '../content/i18n';
import type { GacTroiProgress } from '../content/levels/gac-troi-progress';
export function GacRestLight({language, progress, onChange, paused}: {language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void; onBook: () => void; paused: boolean}) {
  const vi = language === 'vi';
  const [message, setMessage] = useState('');
  const [found, setFound] = useState(false);
  return <div className="gac-match">
    <h2>{vi ? 'Tìm nơi sáng để Cuội nghỉ chân' : 'Find a bright place for Cuội to rest'}</h2>
    <p>{vi ? 'Chạm vào vùng đất được ánh sáng chiếu tới nhé!' : 'Tap the ground reached by the light!'}</p>
    <div style={{display:'flex', gap:12}}>
      {[false,true,false].map((lit,i) => <button key={i} disabled={paused || found} style={{flex:1, minHeight:150, background:lit ? '#d5c89a' : '#24353e', color:lit ? '#24353e' : '#fff'}} aria-label={vi ? `Vùng ${i+1}` : `Area ${i+1}`} onClick={() => {setFound(lit);setMessage(lit ? (vi ? 'Đúng rồi! Chỗ này sáng, Cuội nhìn rõ đất dưới chân.' : 'Yes! Cuội can see the ground here.') : (vi ? 'Chỗ này đang trong bóng tối. Thử vùng sáng màu hơn nhé!' : 'This place is in shadow. Try the brighter ground!'));}}>
        <svg viewBox="0 0 180 100" aria-hidden="true"><path fill={lit ? '#fff2bc' : '#14252e'} d="M0 80 40 35 75 65 125 15 180 70V100H0Z"/><ellipse cx="100" cy="85" rx="35" ry="8" fill={lit ? '#eadba8' : '#102029'}/></svg>
        {vi ? `Vùng ${i+1}` : `Area ${i+1}`}
      </button>)}
    </div>
    <p role="status">{message}</p>
    <button disabled={paused} onClick={() => setMessage(vi ? 'Tìm vùng đất màu vàng nhạt ở giữa nhé.' : 'Look for the pale golden ground in the middle.')}>{vi ? 'Gợi ý' : 'Hint'}</button>
    {found && <button disabled={paused} onClick={() => onChange({...progress, phase:'gac-farewell', turn:0, routeLandmarks:['low-slope','split-rock','banyan-shadow']})}>{vi ? 'Cảm ơn Gác Trời' : 'Thank Sky Watcher'}</button>}
  </div>;
}
