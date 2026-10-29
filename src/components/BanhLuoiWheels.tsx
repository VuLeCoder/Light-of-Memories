import { useEffect, useRef, useState } from 'react';
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
    </g> : kind === 'rubber' ? <><ellipse cx="70" cy="50" rx="25" ry="26" fill="#a8b4af"/><path d="M99 69 l9 7 M36 30 l9 5 M33 50 l9 0 M36 70 l9 -5" stroke="#718780" strokeWidth="4"/></> : <g fill="none" stroke="#c7d3d2" strokeWidth="3"><circle cx="70" cy="50" r="32"/><path d="M70 18 V82 M38 50 H102"/></g>}
    <circle cx="70" cy="50" r="9" fill="#c9c7b5" stroke="#4c6268" strokeWidth="3"/>
  </svg>;
}

// Qualitative illustration; legacy "stone" save value now represents a rigid metal wheel.
function WheelSurface({ kind }: { kind: WheelChoice }) {
  return <svg viewBox="0 0 180 80" aria-hidden="true" data-wheel-surface={kind}>
    <rect x="3" y="3" width="135" height="74" rx="12" fill="#10212a" stroke="#dfc18a" strokeWidth="2"/>
    {kind === 'mesh' ? <>
      <g stroke="#bdcecb" strokeWidth="2" fill="none">
        {[0, 1, 2, 3, 4, 5].map(n => <path key={n} d={`M${14 + n * 20} 12 l-6 56 M12 ${14 + n * 10} H128`}/>)}
      </g>
      <g stroke="#dfc18a" strokeWidth="6" fill="none" strokeLinejoin="round">
        <path d="M21 20 L70 38 L119 20 M21 44 L70 62 L119 44"/>
      </g>
    </> : kind === 'rubber' ? <>
      {/* Conditional puncture example: intact rim, collapsed tyre touching the ground. */}
      <path d="M12 68 H129" stroke="#9aa49a" strokeWidth="3"/>
      <path d="M25 62 C25 44 35 24 63 24 C88 24 101 40 104 54
        Q108 59 120 61 Q127 64 119 67 H26 Q14 65 25 62 Z"
        fill="#263740" stroke="#b8bcb0" strokeWidth="3"/>
      <circle cx="64" cy="47" r="17" fill="#a8b4af" stroke="#4c6268" strokeWidth="3"/>
      <circle cx="64" cy="47" r="5" fill="#dfc18a"/>
      <path d="M30 59 l10 5 l8 -4 M82 61 l10 4 l10 -4 M92 39 l6 6"
        fill="none" stroke="#718780" strokeWidth="3"/>
      <path d="M98 40 l9 -7 M102 47 h13 M95 34 l3 -10"
        fill="none" stroke="#dfc18a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M95 40 l5 5 m-5 0 l5 -5" stroke="#e8b79b" strokeWidth="2"/>
    </> : <>
      <rect x="12" y="12" width="117" height="56" rx="8" fill="#828f95" stroke="#c7d3d2" strokeWidth="3"/>
      <path d="M20 24 H121 M20 56 H121" stroke="#c7d3d2" strokeWidth="3"/>
      <g fill="#43575d">{[28, 70, 112].map(x => <circle key={x} cx={x} cy="40" r="4"/>)}</g>
    </>}
    <path d="M140 40 H158 l13 14" fill="none" stroke="#dfc18a" strokeWidth="2"/>
    <circle cx="172" cy="56" r="5" fill="none" stroke="#dfc18a" strokeWidth="2"/>
  </svg>;
}
export function BanhLuoiWheels({ language, selected, onSelect, onSuccess, paused }: {
  language: Language; selected: WheelChoice | null; onSelect: (choice: WheelChoice) => void; onSuccess: () => void; paused: boolean;
}) {
  // A trial belongs only to this mounted challenge, never to the saved choice.
  const [trial, setTrial] = useState<{ kind: WheelChoice; run: number } | null>(null);
  const [feedback, setFeedback] = useState<'empty' | 'untried' | 'wrongRubber' | 'wrongStone' | null>(null);
  const [pageActive, setPageActive] = useState(() => document.hasFocus() && !document.hidden);
  useEffect(() => {
    const sync = () => setPageActive(document.hasFocus() && !document.hidden);
    window.addEventListener('focus', sync);
    window.addEventListener('blur', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      window.removeEventListener('focus', sync);
      window.removeEventListener('blur', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);
  const submitted = useRef(false);
  const tried = selected !== null && trial?.kind === selected;
  const confirm = () => {
    if (paused || submitted.current) return;
    if (!selected) setFeedback('empty');
    else if (!tried) setFeedback('untried');
    else if (selected !== 'mesh') setFeedback(selected === 'rubber' ? 'wrongRubber' : 'wrongStone');
    else { submitted.current = true; onSuccess(); }
  };
  return <section className="ban-panel ban-wheels" aria-labelledby="ban-wheels-title">
    <h2 id="ban-wheels-title" className="sr-only">{copy['wheels.title'][language]}</h2>
    <p className="ban-wheel-instruction">{copy['wheels.instruction'][language]}</p>
    <div className="ban-wheel-layout">
      <div className="ban-wheel-options" role="group" aria-label={copy['wheels.options'][language]}>{wheelChoices.map(kind => <button key={kind} aria-pressed={selected === kind} aria-label={copy[`wheels.${kind}`][language]} onClick={() => {
        if (paused || submitted.current || selected === kind) return;
        setTrial(null); setFeedback(null); onSelect(kind);
      }}><Wheel kind={kind}/><span>{copy[`wheels.${kind}Short`][language]}</span></button>)}</div>
      <div className="ban-wheel-workbench">
        <div className="ban-wheel-track" role="img" aria-label={tried ? `${copy['wheels.trialModel'][language]} ${copy[`wheels.${selected}Detail`][language]}` : copy['wheels.trialModel'][language]} style={{ animationPlayState: paused || !pageActive ? 'paused' : undefined }}>
          <span className="ban-wheel-rock" aria-hidden="true"/>{selected && <div data-kind={selected} key={`${selected}-${trial?.run ?? 0}`} className={`ban-wheel-run${tried ? ' is-tried' : ''}`} style={{ animationPlayState: paused || !pageActive ? 'paused' : undefined }}><Wheel kind={selected}/></div>}
          {tried && selected && <div key={`surface-${selected}-${trial.run}`} className="ban-wheel-closeup"><WheelSurface kind={selected}/></div>}
          <small>{copy[tried ? selected === 'rubber' ? 'wheels.flatExample' : 'wheels.closeup' : 'wheels.trialModel'][language]}</small>
        </div>
        <p className="ban-feedback" role="status" aria-live="polite" aria-atomic="true">{feedback ? copy[`wheels.${feedback}`][language] : tried ? copy[`wheels.${selected}Trial`][language] : copy['wheels.ready'][language]}</p>
        <div className="ban-wheel-actions">
          <button data-banh-primary onClick={() => {
            if (paused || submitted.current) return;
            if (!selected) { setFeedback('empty'); return; }
            setFeedback(null); setTrial(previous => ({ kind: selected, run: (previous?.run ?? 0) + 1 }));
          }}>{copy['button.tryWheel'][language]}</button>
          <button className="journey-primary" onClick={confirm}>{copy['button.confirm'][language]}</button>
        </div>
      </div>
    </div>
  </section>;
}
