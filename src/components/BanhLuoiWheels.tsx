import { useState } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy } from '../content/levels/ban-banh-luoi-content';
import { wheelChoices, type WheelChoice } from '../content/levels/ban-banh-luoi-progress';

function Wheel({ kind }: { kind: WheelChoice }) {
  return <svg viewBox="0 0 140 100" aria-hidden="true">
    <ellipse cx="70" cy="50" rx="43" ry="42" fill={kind === 'stone' ? '#828985' : '#263740'} stroke="#b8bcb0" strokeWidth="5"/>
    {kind === 'mesh' ? <g stroke="#b8bcb0" fill="none" strokeWidth="1.4">
      {[-24, -12, 0, 12, 24].map(n => <ellipse key={n} cx="70" cy="50" rx={Math.sqrt(43 * 43 - n * n)} ry={Math.max(3, Math.abs(n))}/>)}
      {[-24, -12, 0, 12, 24].map(n => <path key={n} d={`M${70 + n} 15 Q${65 + n} 50 ${70 + n} 85`}/>)}
      {[-24, -12, 0, 12, 24].map(n => <path key={n} stroke="#dfc18a" strokeWidth="3" d={`M43 ${50 + n} L70 ${57 + n} L97 ${50 + n}`}/>)}
    </g> : kind === 'rubber' ? <><ellipse cx="70" cy="50" rx="25" ry="26" fill="#a8b4af"/><path d="M99 69 l9 7 M36 30 l9 5 M33 50 l9 0 M36 70 l9 -5" stroke="#718780" strokeWidth="4"/></> : <path d="M53 18 L64 37 L50 52 L68 76 M64 37 L90 30" fill="none" stroke="#596d70" strokeWidth="3"/>}
    <circle cx="70" cy="50" r="9" fill="#c9c7b5" stroke="#4c6268" strokeWidth="3"/>
  </svg>;
}
export function BanhLuoiWheels({ language, selected, onSelect, onSuccess }: {
  language: Language; selected: WheelChoice | null; onSelect: (choice: WheelChoice) => void; onSuccess: () => void;
}) {
  const [feedback, setFeedback] = useState<'empty' | 'wrongRubber' | 'wrongStone' | null>(null);
  return <section className="ban-panel ban-wheels" aria-labelledby="ban-wheels-title">
    <h2 id="ban-wheels-title">{language === 'vi' ? 'Đôi giày nào của Bánh Lưới?' : 'Which shoes belong to Mesh Wheels?'}</h2>
    <p>{language === 'vi' ? 'Chọn một bánh để quan sát, rồi xác nhận nhé.' : 'Choose a wheel to inspect, then confirm.'}</p>
    <div className="ban-wheel-options">{wheelChoices.map(kind => <button key={kind} aria-pressed={selected === kind} onClick={() => { onSelect(kind); setFeedback(null); }}><Wheel kind={kind}/><span>{copy[`wheels.${kind}`][language]}</span></button>)}</div>
    <p className="ban-wheel-detail">{selected ? copy[`wheels.${selected}Detail`][language] : copy['wheels.empty'][language]}</p>
    <p className="ban-feedback" role="status">{feedback ? copy[`wheels.${feedback}`][language] : '\u00a0'}</p>
    <button className="journey-primary" data-banh-primary onClick={() => selected === 'mesh' ? onSuccess() : setFeedback(!selected ? 'empty' : selected === 'rubber' ? 'wrongRubber' : 'wrongStone')}>{copy['button.confirm'][language]}</button>
  </section>;
}
