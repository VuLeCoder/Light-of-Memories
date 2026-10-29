import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import type { Language } from '../content/i18n';
import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { advanceGuide, guideKey, guideStop } from '../content/levels/ban-banh-luoi-guide';
import { guideCopy as copy } from '../content/levels/ban-banh-luoi-guide-content';
import { banBanhLuoiRoute as model } from '../content/levels/ban-banh-luoi-models';
import { sameCell, isSlope } from '../content/levels/ban-banh-luoi-route';
import { GameCanvas } from '../game/GameCanvas';

export function BanhLuoiGuide({ progress, onChange, language, paused, hintRequest }: {
  progress: BanhLuoiProgress; onChange: Dispatch<SetStateAction<BanhLuoiProgress>>; language: Language; paused: boolean; hintRequest: number;
}) {
  const [hint, setHint] = useState(false);
  const play = useRef<HTMLDivElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = useState(640);
  useEffect(() => {
    const element = map.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setMapWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const closeHint = useRef<HTMLButtonElement>(null);
  const route = progress.confirmedRoute!, checkpoint = progress.guideCheckpoint!;
  const previousHint = useRef(hintRequest);
  const focus = () => play.current?.querySelector<HTMLElement>('.game-host')?.focus({ preventScroll: true });
  useEffect(() => {
    if (hintRequest === previousHint.current) return;
    previousHint.current = hintRequest;
    setHint(true);
    onChange(p => p.confirmedRoute && p.guideCheckpoint ? { ...p, guideCheckpoint: advanceGuide(p.confirmedRoute, p.guideCheckpoint, { key: guideKey(p.confirmedRoute, p.guideCheckpoint), action: 'hint' }) } : p);
  }, [hintRequest, onChange]);
  useEffect(() => { if (hint) closeHint.current?.focus(); }, [hint]);
  const atStop = checkpoint.stage === 'atA' || checkpoint.stage === 'atB';
  const location = guideStop(route, checkpoint.nodeIndex) ?? (sameCell(route.cells[checkpoint.nodeIndex], model.lm) ? 'LM' : `${checkpoint.nodeIndex}`);
  const timelineText = route.cells.map((cell, index) => guideStop(route, index) ?? (sameCell(cell, model.lm) ? 'LM' : isSlope(cell) ? (language === 'vi' ? 'dốc' : 'slope') : '·')).join(' → ');
  // Unfold visits horizontally; retain the north/south relief of the selected map.
  const points = route.cells.map((cell, index) => ({ x: 20 + index * Math.max(0, mapWidth - 40) / Math.max(1, route.cells.length - 1), y: 27 + (cell[1] - model.lm[1]) * 3 }));
  const path = (nodes: typeof points) => nodes.map((point, index) => `${index ? 'L' : 'M'}${point.x},${point.y}`).join(' ');
  const current = points[checkpoint.nodeIndex];
  const close = () => { setHint(false); requestAnimationFrame(focus); };
  return <section className="ban-guide" aria-label={language === 'vi' ? 'Hành trình lấy mẫu' : 'Sample journey'}>
    <div ref={map} className="ban-trip-timeline" role="img" aria-label={`${copy.step[language]} ${checkpoint.nodeIndex}/${route.cells.length - 1} · ${location}. ${timelineText}. ${checkpoint.rock === 'stored' ? 'A ✓. ' : ''}${checkpoint.soil === 'stored' ? 'B ✓. ' : ''}${language === 'vi' ? 'Cuội và Bánh Lưới cùng vị trí.' : 'Cuội and the rover are together.'}`}>
      <svg width="100%" height="56" viewBox={`0 0 ${mapWidth} 56`} aria-hidden="true">
        <path d={`M0 39 Q${mapWidth * .2} 27 ${mapWidth * .4} 42 T${mapWidth} 34 V56 H0Z`} fill="#35494c" />
        {points.map((point, index) => <g key={`terrain-${index}`} fill="#52605b" opacity=".7">
          <ellipse cx={point.x + 7} cy={48 - index % 3 * 3} rx="6" ry="2" />
          {isSlope(route.cells[index]) && <path d={`M${point.x - 7} ${point.y + 5} l7 -13 8 13Z`} fill="#7b8070" stroke="#adb09a" strokeWidth="1" />}
        </g>)}
        <path d={path(points)} fill="none" stroke="#101f25" strokeWidth="8" strokeLinejoin="round" />
        <path d={path(points)} fill="none" stroke="#82908a" strokeWidth="3" strokeDasharray="3 4" strokeLinejoin="round" />
        <path d={path(points.slice(0, checkpoint.nodeIndex + 1))} fill="none" stroke="#dec68e" strokeWidth="3" strokeLinejoin="round" />
        {route.cells.map((cell, index) => {
          const stop = guideStop(route, index);
          const home = sameCell(cell, model.lm);
          const stored = stop === 'A' ? checkpoint.rock === 'stored' : stop === 'B' && checkpoint.soil === 'stored';
          const { x, y } = points[index];
          return <g key={index} className="ban-trip-node" transform={`translate(${x} ${y})`}>
            {home ? <g fill="#e3d5af" stroke="#25383d" strokeWidth="1.5"><path d="M-6 3 L-4 -5 H4 L6 3Z M-4 3 L-8 8 M4 3 L8 8" /><rect x="-3" y="-10" width="6" height="5" /></g>
              : stop ? <g><path d="M0 7 V-10" stroke="#efda9f" strokeWidth="2" /><path d="M1 -10 H12 L9 -5 H1Z" fill={stored && index <= checkpoint.nodeIndex ? '#b9ccb1' : '#dec68e'} /><text x="-6" y="-7" textAnchor="end" fill="#f5e8c9" fontSize="14" fontWeight="bold">{stop}</text></g>
              : <circle r="2" fill={index <= checkpoint.nodeIndex ? '#efd397' : '#a4afa3'} />}
          </g>;
        })}
        <g transform={`translate(${current.x} ${current.y})`}>
          <ellipse cy="10" rx="15" ry="3" fill="#101f25" opacity=".6" />
          <g stroke="#172a32" strokeWidth="1.5" fill="#e4c77f"><path d="M-10 1 H8 L11 6 H-10Z" /><circle cx="-6" cy="8" r="3" /><circle cx="7" cy="8" r="3" /><path d="M3 1 V-4 H8" fill="none" /></g>
          <g stroke="#172a32" strokeWidth="1"><path d="M-5 1 V-5 H0 V1" fill="#c28b64" /><circle cx="-3" cy="-8" r="3.5" fill="#e4d6b4" /><path d="M-6 -10 Q-3 -15 0 -10" fill="#283b3c" /></g>
          <path d="M-3 -18 l-3 -4 h6Z" fill="#f4d991" />
        </g>
      </svg>
    </div>
    <div className="ban-guide-play" ref={play} inert={hint}>
      <div className="ban-guide-view"><div className="ban-guide-scene-box">
        <GameCanvas initiallyAwake scene="ban-banh-luoi" encounterStarted moonMode={paused || hint ? 'paused' : 'free'} language={language} quest="complete" treeSpeaking={false} onInteract={() => {}} onExit={() => {}} onAwake={() => {}} onReady={() => { if (!paused && document.activeElement?.closest('.game-stage')) focus(); }}
          banhLuoiGuide={{ route, checkpoint, enabled: !paused && !hint, onEvent: event => {
            onChange(p => {
              if (p.phase !== 'guiding' || !p.confirmedRoute || !p.guideCheckpoint) return p;
              const updated = advanceGuide(p.confirmedRoute, p.guideCheckpoint, event);
              return updated === p.guideCheckpoint ? p : { ...p, guideCheckpoint: updated, phase: updated.stage === 'done' ? 'launch' : 'guiding', turn: 0 };
            });
          } }}/>
      </div></div>
      <p className="ban-guide-message" role="status">{atStop ? copy.waiting[language] : copy[checkpoint.stage][language]}</p>
      <div className="ban-trip-controls"><span>{atStop ? copy[checkpoint.stage][language] : `${copy.step[language]} ${checkpoint.nodeIndex}/${route.cells.length - 1}`}</span>
        <button onClick={() => onChange(p => ({ ...p, phase: 'routePuzzle', turn: 0 }))}>{copy.edit[language]}</button>
      </div>
    </div>
    {hint && <div className="ban-guide-hint" role="dialog" aria-modal="true" aria-label={language === 'vi' ? 'Gợi ý' : 'Hint'} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } if (event.key === 'Tab') { event.preventDefault(); closeHint.current?.focus(); } }}>
      <p>{copy.hints[checkpoint.stage][language]}</p>
      <button ref={closeHint} onClick={close}>{language === 'vi' ? 'Đã hiểu' : 'Got it'}</button>
    </div>}
  </section>;
}
