import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import type { Language } from '../../../content/i18n';
import type { BanhLuoiProgress } from '../../../content/friends/ban-banh-luoi/progress';
import { rockForceWindow, advanceGuide, guideKey, guideStop } from '../../../content/friends/ban-banh-luoi/challenges/guide';
import { guideCopy as copy } from '../../../content/friends/ban-banh-luoi/challenges/guide-copy';
import { banBanhLuoiRoute as model } from '../../../content/friends/ban-banh-luoi/challenges/models';
import { sameCell, isSlope } from '../../../content/friends/ban-banh-luoi/challenges/route';
import type { RockControls, RockFeedback } from '../../../game/scenes/ban-banh-luoi/guide';
import { GameCanvas } from '../../../game/GameCanvas';

export function BanhLuoiGuide({ progress, onChange, language, paused, hintRequest }: {
  progress: BanhLuoiProgress; onChange: Dispatch<SetStateAction<BanhLuoiProgress>>; language: Language; paused: boolean; hintRequest: number;
}) {
  const controls = useRef<RockControls>({ direction: 0, action: false, cancelled: false });
  const [feedback, setFeedback] = useState<RockFeedback>({ near: false, force: 0, holding: false, missed: false });
  const [observation, setObservation] = useState<{ patch: number; key: string } | null>(null);
  const [soilCard, setSoilCard] = useState(false);
  const [wrongPatch, setWrongPatch] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
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
    setObservation(null); setWrongPatch(false);
    setHint(true);
    onChange(p => p.confirmedRoute && p.guideCheckpoint ? { ...p, guideCheckpoint: advanceGuide(p.confirmedRoute, p.guideCheckpoint, { key: guideKey(p.confirmedRoute, p.guideCheckpoint), action: 'hint' }) } : p);
  }, [hintRequest, onChange]);
  useEffect(() => { if (hint) closeHint.current?.focus(); }, [hint]);
  useEffect(() => {
    const cancel = () => { controls.current.direction = 0; controls.current.action = false; controls.current.cancelled = true; };
    window.addEventListener('blur', cancel);
    document.addEventListener('visibilitychange', cancel);
    cancel();
    return () => { window.removeEventListener('blur', cancel); document.removeEventListener('visibilitychange', cancel); cancel(); };
  }, [paused, hint, language, observation, soilCard]);
  useEffect(() => { if ((observation || soilCard) && !paused && !hint) dialog.current?.querySelector<HTMLButtonElement>('button')?.focus(); }, [observation, soilCard, paused, hint]);
  const isA = checkpoint.stage === 'atA';
  const isB = checkpoint.stage === 'atB';
  const rock = checkpoint.rock;
  const say = (vi: string, en: string) => language === 'vi' ? vi : en;
  const [footer, setFooter] = useState<HTMLElement | null>(null);
  useEffect(() => { setFooter(paused ? null : document.getElementById('ban-guide-instructions')); }, [paused]);
  const forceWindow = rockForceWindow(rock);
  const rockMessage = feedback.missed ? say('Thử thả khi vạch ở vùng sáng nhé.', 'Release inside the marked zone. Try again.')
    : rock === 'carrying' ? say('Mang mẫu về xe bên trái · E để cất.', 'Bring the sample left to the rover · E to store.')
    : rock === 'loose' ? say('Mẫu đá đã rời ra · Đến gần, nhấn E để nhặt.', 'The sample is loose · Move close and press E to pick up.')
    : feedback.near ? say(`Giữ E, thả trong vùng sáng · ${rock === 'hitOnce' ? 1 : 0}/2 lần gõ.`, `Hold E, release in the marked zone · ${rock === 'hitOnce' ? 1 : 0}/2 hits.`)
    : say('← → / A D tới đá bên phải; hoặc chạm mặt đất.', '← → / A D to the rock on the right; or tap the ground.');
  const soilMessage = checkpoint.soil === 'carrying'
    ? say('Mang mẫu về xe bên trái · E để cất.', 'Bring the sample left to the rover · E to store.')
    : feedback.near ? say('Giữ E để quan sát mảng đất bên cạnh.', 'Hold E to look closely at this patch.')
    : say('← → / A D tới ba mảng đất; giữ E để xem.', '← → / A D to the patches; hold E to look.');
  const dismissObservation = () => { setObservation(null); setSoilCard(false); setWrongPatch(false); requestAnimationFrame(focus); };
  const collectSoil = () => {
    if (!observation || observation.key !== guideKey(route, checkpoint)) { dismissObservation(); return; }
    if (observation.patch !== 1) { setWrongPatch(true); return; }
    const key = observation.key;
    onChange(p => p.confirmedRoute && p.guideCheckpoint ? { ...p, guideCheckpoint: advanceGuide(p.confirmedRoute, p.guideCheckpoint, { key, action: 'collectSoil', patch: 'orange' }) } : p);
    dismissObservation();
  };
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
            {stop && stored && index <= checkpoint.nodeIndex && <path d="M-4 13 l3 3 6 -6" fill="none" stroke="#f5e8c9" strokeWidth="2" />}
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
    <div className="ban-guide-play" ref={play} inert={hint || !!observation || soilCard}>
      <div className="ban-guide-view"><div className="ban-guide-scene-box">
        <GameCanvas initiallyAwake scene="ban-banh-luoi" encounterStarted moonMode={paused || hint || observation || soilCard ? 'paused' : 'free'} language={language} quest="complete" treeSpeaking={false} onInteract={() => {}} onExit={() => {}} onAwake={() => {}} onReady={() => { if (!paused && document.activeElement?.closest('.game-stage')) focus(); }}
          banhLuoiGuide={{ route, checkpoint, controls: controls.current, onRockFeedback: setFeedback, onObserve: setObservation, enabled: !paused && !hint && !observation && !soilCard, onEvent: event => {
            if (event.action === 'store' && checkpoint.stage === 'atB' && event.key === guideKey(route, checkpoint)) setSoilCard(true);
            onChange(p => {
              if (p.phase !== 'guiding' || !p.confirmedRoute || !p.guideCheckpoint) return p;
              const updated = advanceGuide(p.confirmedRoute, p.guideCheckpoint, event);
              return updated === p.guideCheckpoint ? p : { ...p, guideCheckpoint: updated, phase: updated.stage === 'done' ? 'photoB' : 'guiding', turn: 0 };
            });
          } }}/>
      </div>
      {isA && (rock === 'untouched' || rock === 'hitOnce') && <div className="ban-rock-meter" aria-label={say(`Chỉ lực lần ${rock === 'hitOnce' ? 2 : 1}: thả trong vùng ${forceWindow.min * 100} đến ${forceWindow.max * 100} phần trăm`, `Strike ${rock === 'hitOnce' ? 2 : 1} force: release between ${forceWindow.min * 100} and ${forceWindow.max * 100} percent`)}>
        <span>{say('Lực gõ', 'Force')}</span><div className="ban-rock-track"><i style={{ left: `${forceWindow.min * 100}%`, width: `${(forceWindow.max - forceWindow.min) * 100}%` }} /><b style={{ left: `${feedback.force * 100}%` }} /></div>
      </div>}
      {isB && feedback.holding && <div className="ban-soil-progress" role="status">{say('Đang quan sát…', 'Looking closely…')}<progress max={.7 / 1.6} value={feedback.force} /></div>}
      </div>
      {footer && createPortal(<span>{isA ? rockMessage : isB ? soilMessage : copy[checkpoint.stage][language]}</span>, footer)}

    </div>
    {(observation || soilCard) && <div ref={dialog} className="ban-soil-dialog" role="dialog" aria-modal="true" aria-label={say('Quan sát mẫu đất', 'Soil observation')} inert={hint || paused} onKeyDown={event => {
      if (event.key === 'Escape') { event.stopPropagation(); dismissObservation(); }
      if (observation && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
        const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('.ban-soil-choices button')];
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
        const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
        buttons[(index + direction + buttons.length) % buttons.length]?.focus();
      }
      if (event.key === 'Tab') { const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('button')]; const index = buttons.indexOf(document.activeElement as HTMLButtonElement); event.preventDefault(); buttons[(index + (event.shiftKey ? buttons.length - 1 : 1)) % buttons.length]?.focus(); }
    }}>
      <strong>{soilCard ? say('Những mẫu vật kể chuyện', 'Samples tell stories') : say(`Mảng đất ${observation!.patch + 1}`, `Soil patch ${observation!.patch + 1}`)}</strong>
      <svg className="ban-soil-grains" viewBox="0 0 320 130" role="img" aria-label={observation?.patch === 1 || soilCard ? say('Hạt đất xám mịn xen những mảnh vỡ nhỏ', 'Fine grey soil grains mixed with small fragments') : say('Các mảnh đá xám có góc cạnh', 'Angular grey rock fragments')}>
        <rect width="320" height="130" rx="16" fill="#26383c" />
        {Array.from({ length: observation?.patch === 1 || soilCard ? 76 : 28 }, (_, i) => {
          const x = 18 + (i * 7919 + 37) % 283, y = 18 + (i * i * 53 + i * 71 + 11) % 93;
          const fine = (observation?.patch === 1 || soilCard) && i % 5 !== 0;
          const size = fine ? 1.2 + i % 3 * .55 : observation?.patch === 1 || soilCard ? 3.5 : 7;
          return <path key={i} d={`M${x - size} ${y + size * .7} l${size * .4} ${-size * 2} ${size * 1.7} ${size} ${-size * .6} ${size * 1.3}Z`} fill={i % 2 ? '#aaa69e' : '#76736e'} stroke="#c3beb4" strokeWidth={fine ? .35 : .8} />;
        })}
      </svg>
      <p role="status">{soilCard ? say('Mỗi mảng đất kể một câu chuyện về nơi nó nằm. Mẫu đá và đất được mang về để các nhà khoa học nghiên cứu.', 'Each patch tells a story about its surroundings. Rock and soil samples were brought back for scientists to study.') : wrongPatch ? say('Mảng này có những mảnh đá xám vụn. Hãy tìm mảng có hạt mịn hơn xen những mảnh vỡ nhỏ nhé.', 'This patch has grey rock fragments. Look for finer grains mixed with small fragments.') : observation!.patch === 1 ? say('Hạt mịn hơn, xen lẫn những mảnh vỡ nhỏ. Đúng dấu hiệu cần tìm!', 'Finer grains mixed with small fragments. These match our clues!') : say('Những mảnh đá xám có góc cạnh.', 'Angular fragments of grey rock.')}</p>
      <small>{say('Hình phóng đại minh họa · Không phải cách nhận biết thành phần ngay tại chỗ.', 'Illustrated close-up · Composition was studied, not identified on sight.')}</small>
      <div className="ban-soil-choices">{soilCard ? <button onClick={dismissObservation}>{say('Tiếp tục', 'Continue')}</button> : <>
        <button onClick={collectSoil}>{say('Lấy mẫu này', 'Collect this sample')}</button>
        <button onClick={dismissObservation}>{say('Quan sát tiếp', 'Keep looking')}</button>
      </>}</div>
    </div>}
    {hint && <div className="ban-guide-hint" role="dialog" aria-modal="true" aria-label={language === 'vi' ? 'Gợi ý' : 'Hint'} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } if (event.key === 'Tab') { event.preventDefault(); closeHint.current?.focus(); } }}>
      <p>{isA ? copy.rockHints[Math.max(0, checkpoint.hints.A - 1)][language] : isB ? copy.soilHints[Math.max(0, checkpoint.hints.B - 1)][language] : copy.hints[checkpoint.stage][language]}</p>
      <button ref={closeHint} onClick={close}>{language === 'vi' ? 'Đã hiểu' : 'Got it'}</button>
    </div>}
  </section>;
}
