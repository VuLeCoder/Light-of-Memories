import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import type { Language } from '../content/i18n';
import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { advanceGuide, type GuideTarget } from '../content/levels/ban-banh-luoi-guide';
import { guideCopy as copy } from '../content/levels/ban-banh-luoi-guide-content';
import { banBanhLuoiRoute as model } from '../content/levels/ban-banh-luoi-models';
import { routeCells, sameCell, isCrater } from '../content/levels/ban-banh-luoi-route';
import { GameCanvas } from '../game/GameCanvas';

export function BanhLuoiGuide({ progress, onChange, language, paused, hintRequest }: {
  progress: BanhLuoiProgress; onChange: Dispatch<SetStateAction<BanhLuoiProgress>>; language: Language; paused: boolean; hintRequest: number;
}) {
  const [direction, setDirection] = useState(0);
  const [interaction, setInteraction] = useState(0);
  const [near, setNear] = useState<GuideTarget>(null);
  const [slope, setSlope] = useState(false);
  const [hint, setHint] = useState(false);
  const play = useRef<HTMLDivElement>(null);
  const closeHint = useRef<HTMLButtonElement>(null);
  const route = progress.confirmedRoute!, checkpoint = progress.guideCheckpoint!;
  const previousHint = useRef(hintRequest);
  useEffect(() => { if (hintRequest !== previousHint.current) { setHint(true); setDirection(0); previousHint.current = hintRequest; } }, [hintRequest]);
  useEffect(() => { if (hint) closeHint.current?.focus(); }, [hint]);
  useEffect(() => { setDirection(0); setSlope(false); setNear(null); }, [checkpoint]);
  useEffect(() => {
    const stop = () => setDirection(0);
    window.addEventListener('blur', stop); document.addEventListener('visibilitychange', stop);
    return () => { window.removeEventListener('blur', stop); document.removeEventListener('visibilitychange', stop); };
  }, []);
  const focus = () => play.current?.querySelector<HTMLElement>('.game-host')?.focus({ preventScroll: true });
  const atStop = checkpoint.stage !== 'travel';
  const current = route.cells[checkpoint.edgeIndex], next = route.cells[checkpoint.edgeIndex + 1];
  const nextName = (['A', 'B'] as const).find(id => sameCell(next, model.stops[id])) ?? (sameCell(next, model.lm) ? 'LM' : `(${next.join(', ')})`);
  const north = next[1] < current[1], south = next[1] > current[1];
  const heading = north ? '↑' : south ? '↓' : next[0] > current[0] ? '→' : '←';
  return <section className="ban-guide" aria-label={language === 'vi' ? 'Cuội dẫn đường' : 'Cuội leads the way'}>
    <div className="ban-guide-map-row">
      <svg viewBox="0 0 120 100" role="img" aria-label={`${copy.step[language]} ${checkpoint.edgeIndex + 1}/${route.cells.length - 1}: (${current}) ${heading} ${nextName}`}>
        {routeCells.map(cell => <rect key={cell.join()} x={(cell[0]-1)*20+1} y={(cell[1]-1)*20+1} width="18" height="18" rx="2" fill={isCrater(cell) ? '#0b171f' : '#3e5358'}/>)}
        <polyline points={route.cells.map(([x,y]) => `${x*20-10},${y*20-10}`).join(' ')} fill="none" stroke="#82928b" strokeWidth="2"/>
        <polyline points={route.cells.slice(0, checkpoint.edgeIndex + (atStop ? 2 : 1)).map(([x,y]) => `${x*20-10},${y*20-10}`).join(' ')} fill="none" stroke="#e6c88e" strokeWidth="3"/>
        {Object.entries({ LM: model.lm, ...model.stops }).map(([id,[x,y]]) => <text key={id} x={x*20-10} y={y*20-6} textAnchor="middle" fill="#fff0c9" fontSize="11">{id}</text>)}
        <circle cx={(atStop ? next : current)[0]*20-10} cy={(atStop ? next : current)[1]*20-10} r="7" fill="none" stroke="#fff1c9" strokeWidth="2"/>
      </svg>
      <p>{copy.step[language]} {checkpoint.edgeIndex+1}/{route.cells.length-1} · {heading} {nextName}<br/><span>{checkpoint.completedStops.includes('A') ? '✓' : '○'} A · {checkpoint.completedStops.includes('B') ? '✓' : '○'} B</span></p>
      <button onClick={() => onChange(p => ({ ...p, phase: 'routePuzzle', turn: 0 }))}>{copy.edit[language]}</button>
    </div>
    <div className="ban-guide-play" ref={play} inert={hint} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDirection(0); }} onKeyDown={event => {
      if (event.code === 'KeyE' && !(event.target as HTMLElement).closest('.game-host') && !event.repeat) { event.preventDefault(); setInteraction(n => n + 1); }
    }}>
      <div className="ban-guide-view"><div className="ban-guide-scene-box">
        <GameCanvas initiallyAwake scene="ban-banh-luoi" encounterStarted moonMode={paused || hint ? 'paused' : 'free'} language={language} quest="complete" treeSpeaking={false} onInteract={() => {}} onExit={() => {}} onAwake={() => {}} onReady={() => { if (!paused && document.activeElement?.closest('.game-stage')) focus(); }}
          banhLuoiGuide={{ route, checkpoint, enabled: !paused && !hint, direction, interaction, onNear: setNear, onSlope: () => setSlope(true), onEvent: event => {
            onChange(p => {
              if (p.phase !== 'guiding' || !p.confirmedRoute || !p.guideCheckpoint) return p;
              const updated = advanceGuide(p.confirmedRoute, p.guideCheckpoint, event);
              if (updated === p.guideCheckpoint) return p;
              return { ...p, guideCheckpoint: updated, phase: updated.stage === 'done' ? 'launch' : 'guiding', turn: 0 };
            });
          } }}/>
        {near && <button className="ban-guide-near" style={{ left: near === 'report' ? '30%' : near === 'slope' ? '52%' : '73%' }} onClick={() => { focus(); setInteraction(n => n+1); }}>E · {near === 'slope' ? (language === 'vi' ? 'Nền nghiêng' : 'Sloping ground') : copy[near][language]}</button>}
      </div></div>
      <p className="ban-guide-message" role="status">{slope && checkpoint.stage === 'chooseB' ? copy.slope[language] : copy[checkpoint.stage][language]}</p>
      <div className="ban-guide-controls">
        {([-1, 1] as const).map(dir => <button key={dir} aria-label={language === 'vi' ? dir < 0 ? 'Đi trái' : 'Đi phải' : dir < 0 ? 'Walk left' : 'Walk right'} onPointerDown={event => { event.currentTarget.focus({ preventScroll: true }); event.currentTarget.setPointerCapture(event.pointerId); setDirection(dir); }} onPointerUp={() => setDirection(0)} onPointerCancel={() => setDirection(0)} onLostPointerCapture={() => setDirection(0)} onKeyDown={event => { if (['Enter', ' '].includes(event.key)) { event.preventDefault(); setDirection(dir); } }} onKeyUp={() => setDirection(0)} onBlur={() => setDirection(0)}>{dir < 0 ? '←' : '→'}</button>)}
        <button aria-disabled={!near || checkpoint.stage === 'callB'} onClick={() => { setSlope(false); setInteraction(n => n+1); }}>{near && near !== 'slope' ? copy[near][language] : copy.interact[language]}</button>
      </div>
    </div>
    {hint && <div className="ban-guide-hint" role="dialog" aria-modal="true" aria-label={language === 'vi' ? 'Gợi ý' : 'Hint'} onKeyDown={event => { if (event.key === 'Escape') { setHint(false); focus(); } if(event.key === 'Tab') { event.preventDefault(); closeHint.current?.focus(); } }}>
      <p>{progress.guideHint < 2 ? copy[checkpoint.stage][language] : copy.hints[checkpoint.stage][language]}</p>
      <button ref={closeHint} onClick={() => { setHint(false); focus(); }}>{language === 'vi' ? 'Đã hiểu' : 'Got it'}</button>
    </div>}
  </section>;
}
