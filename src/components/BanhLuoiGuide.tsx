import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import type { Language } from '../content/i18n';
import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { advanceGuide, guideKey, guideStop } from '../content/levels/ban-banh-luoi-guide';
import { guideCopy as copy } from '../content/levels/ban-banh-luoi-guide-content';
import { banBanhLuoiRoute as model } from '../content/levels/ban-banh-luoi-models';
import { sameCell, isSlope } from '../content/levels/ban-banh-luoi-route';
import type { RockControls, RockFeedback } from '../game/banh-luoi-guide';
import { GameCanvas } from '../game/GameCanvas';

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
      {isA && (rock === 'untouched' || rock === 'hitOnce') && <div className="ban-rock-meter" aria-label={say('Chỉ lực: thả trong vùng 35 đến 80 phần trăm', 'Force: release between 35 and 80 percent')}>
        <span>{say('Lực gõ', 'Force')}</span><div className="ban-rock-track"><i /><b style={{ left: `${feedback.force * 100}%` }} /></div>
      </div>}
      {isB && feedback.holding && <div className="ban-soil-progress" role="status">{say('Đang quan sát…', 'Looking closely…')}<progress max={.7 / 1.6} value={feedback.force} /></div>}
      </div>
      <p className="ban-guide-message" role="status">{isA ? rockMessage : isB ? soilMessage : copy[checkpoint.stage][language]}</p>

    </div>
    {(observation || soilCard) && <div ref={dialog} className="ban-soil-dialog" role="dialog" aria-modal="true" aria-label={say('Quan sát mẫu đất', 'Soil observation')} inert={hint || paused} onKeyDown={event => {
      if (event.key === 'Escape') { event.stopPropagation(); dismissObservation(); }
      if (event.key === 'Tab') { const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('button')]; const index = buttons.indexOf(document.activeElement as HTMLButtonElement); event.preventDefault(); buttons[(index + (event.shiftKey ? buttons.length - 1 : 1)) % buttons.length]?.focus(); }
    }}>
      <strong>{soilCard ? say('Một câu chuyện núi lửa', 'A volcanic story') : say(`Mảng đất ${observation!.patch + 1}`, `Soil patch ${observation!.patch + 1}`)}</strong>
      <svg className="ban-soil-grains" viewBox="0 0 320 130" role="img" aria-label={observation?.patch === 1 || soilCard ? say('Hạt tròn cam và đen xen mảnh vỡ', 'Round orange and black grains mixed with fragments') : say('Các mảnh đá xám có góc cạnh', 'Angular grey rock fragments')}>
        <rect width="320" height="130" rx="16" fill="#26383c" />
        {Array.from({ length: 28 }, (_, i) => { const x = 18 + i * 59 % 284, y = 18 + i * 37 % 94; const orange = observation?.patch === 1 || soilCard; return orange && i % 3 ? <circle key={i} cx={x} cy={y} r={5 + i % 4} fill={i % 2 ? '#dca566' : '#111e25'} stroke="#c6b695" strokeWidth="1" /> : <path key={i} d={`M${x - 7} ${y + 5} l3 -14 12 7 -4 9Z`} fill={orange ? '#b78252' : '#a9afa5'} stroke="#d2cfb6" />; })}
      </svg>
      <p role="status">{soilCard ? say('Những hạt thủy tinh cam và đen gợi câu chuyện về núi lửa rất lâu trước đây.', 'Orange and black glass grains tell a story of volcanic activity long ago.') : wrongPatch ? say('Đây là mảnh đá xám. Thử tìm hạt tròn cam và đen nhé.', 'These are grey rock fragments. Look for round orange and black grains.') : observation!.patch === 1 ? say('Hạt tròn cam, đen xen mảnh vỡ. Đúng dấu hiệu cần tìm!', 'Round orange and black grains, mixed with fragments. These match our clues!') : say('Những mảnh đá xám có góc cạnh.', 'Angular fragments of grey rock.')}</p>
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
