import { gameAudio } from '../../../audio/game-audio';
import { shadowWatchCopy } from '../../../content/friends/gac-troi/challenges/shadow-watch';
import { useId, useState } from 'react';
import type { Language } from '../../../content/i18n';
import { gacRouteLandmarks, unlockGacBook, type GacTroiProgress } from '../../../content/friends/gac-troi/progress';

// A schematic cross-section, not a lighting simulation or a mapped real crater.
// Broad crater rim with small, fixed relief variations (illustrative, not survey data).
// Reference: https://svs.gsfc.nasa.gov/4716
const rearRim = Array.from({ length: 41 }, (_, i) => {
  const x = i * 20;
  const arc = Math.sqrt(Math.max(0, 1 - ((x - 400) / 300) ** 2));
  const relief = arc * (4 * Math.sin(i * 1.7) + 2.5 * Math.sin(i * .73 + 1));
  return [x, 175 - 125 * arc + relief];
});
const rimHeight = (x: number) => {
  const index = rearRim.findIndex(([px]) => px >= x);
  if (index <= 0) return rearRim[0][1];
  const [ax, ay] = rearRim[index - 1];
  const [bx, by] = rearRim[index];
  return ay + (by - ay) * (x - ax) / (bx - ax);
};
export function GacRestLight({ language, progress, onChange, onBack, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void;
  onBack: () => void; onBook: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const sunClip = useId();
  const watch = progress.shadowWatch ?? { views: [0], position: 0, recorded: false };
  const [selected, select] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);
  const [sunPosition, setSunPosition] = useState(watch.position);
  const ready = watch.views.length === 3;
  const names = vi ? ['Thềm trái', 'Đáy sâu', 'Thềm phải'] : ['Left ledge', 'Deep floor', 'Right ledge'];
  const observe = (position: number) => {
    if (paused || watch.recorded) return;
    setSunPosition(position);
    position = Math.round(position);
    onChange({ ...progress, shadowWatch: { ...watch, position, views: [...new Set([...watch.views, position])] } });
    select(null); setWrong(false);
  };
  const record = () => {
    if (paused || !ready || selected === null || watch.recorded) return;
    if (selected !== 1) {
      // Show the observation that contradicts this mark, without choosing for the child.
      onChange({ ...progress, shadowWatch: { ...watch, position: selected === 0 ? 2 : 0 } });
      setSunPosition(selected === 0 ? 2 : 0);
      gameAudio.cue('retry'); setWrong(true); return;
    }
    gameAudio.cue('success');
    onChange(unlockGacBook({ ...progress, routeLandmarks: [...gacRouteLandmarks], shadowWatch: { ...watch, recorded: true } }, 'gac-book-map'));
    setWrong(false);
  };
  // Schematic rays originate at the displayed solar disc and stop at terrain.
  const sun = [90 + 620 * sunPosition / 2, 100 - 35 * Math.sin(Math.PI * sunPosition / 2)];
  // Sample the visible solar disc against the rear rim. Its disappearance is
  // geometric occlusion, not a timed fade. This remains a schematic model.
  let visibleSamples = 0;
  let totalSamples = 0;
  for (let y = -15; y <= 15; y += 2) for (let x = -15; x <= 15; x += 2) {
    if (x*x + y*y > 16*16) continue;
    totalSamples++;
    if (sun[1] + y < rimHeight(sun[0] + x)) visibleSamples++;
  }
  const visibility = visibleSamples / totalSamples;
  const leftLight = Math.max(0, sunPosition - 1) * visibility;
  const rightLight = Math.max(0, 1 - sunPosition) * visibility;
  const lit = [leftLight > .03, false, rightLight > .03];
  const ridge = rearRim.map(point => point.join(',')).join(' L');
  const terrain = [[0,230],[100,217],[180,164],[250,235],[310,248],[350,294],[450,294],[490,248],[550,235],[620,164],[700,217],[800,230]];
  const rays = Array.from({ length: 12 }, (_, i) => {
    // A compact fan connects the solar symbol to the opposite wall. This is
    // a visual diagram, not the angular size of the real, distant Sun.
    const targetX = sunPosition <= 1 ? 800 : 0;
    const targetY = 190 + i * 12;
    const length = Math.hypot(targetX - sun[0], targetY - sun[1]);
    const dx = (targetX - sun[0]) / length;
    const dy = (targetY - sun[1]) / length;
    const x = sun[0] + dx * 17;
    const y = sun[1] + dy * 17;
    // Rays from a hidden part of the disc cannot escape the far rim.
    if (y >= rimHeight(x)) return null;
    let distance = length - 17;
    for (let j = 0; j < terrain.length - 1; j++) {
      const [ax, ay] = terrain[j], [bx, by] = terrain[j + 1];
      const sx = bx - ax, sy = by - ay;
      const determinant = dx * sy - dy * sx;
      if (Math.abs(determinant) < 1e-8) continue;
      const t = ((ax - x) * sy - (ay - y) * sx) / determinant;
      const u = ((ax - x) * dy - (ay - y) * dx) / determinant;
      if (t >= 0 && u >= 0 && u <= 1) distance = Math.min(distance, t);
    }
    return <path key={i} d={`M${x} ${y} l${dx * distance} ${dy * distance}`} />;
  });
  return <section className="ending-scene gac-meeting gac-activity gac-map-puzzle" hidden={paused} lang={language} aria-label={vi ? 'Trực gác vùng tối' : 'Watch the shadows'}>
    <div className="surveyor-scene-hud">
      <span>{vi ? 'T03 · Trực gác vùng tối' : 'T03 · Watch the shadows'}</span>
      <button disabled={paused} onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button>
    </div>
    <div className="gac-watch-workspace">
      <figure className="gac-watch-figure">
        <svg viewBox="0 0 800 340" role="img" aria-label={vi ? `Mặt cắt miệng hố, hướng nắng ${watch.position + 1}. ${names.filter((_, i) => lit[i]).join(', ') || 'Các vùng quan sát'} ${vi ? 'đang' : ''} ${!lit.some(Boolean) ? 'nằm trong bóng tối' : 'nhận ánh sáng'}.` : `Crater cross-section, sunlight direction ${watch.position + 1}. ${names.filter((_, i) => lit[i]).join(' and ') || 'All observed regions'} ${!lit.some(Boolean) ? 'are in shadow' : 'receive sunlight'}.`}>
          <path d="M65 110 Q400 -5 735 110" fill="none" stroke="#d7b875" strokeOpacity=".2" strokeDasharray="5 8"/>
          <defs>
            <clipPath id={sunClip}>
              <path d={`M0 0 H800 V175 L${[...rearRim].reverse().map(point => point.join(',')).join(' L')} Z`}/>
            </clipPath>
          </defs>
          <g clipPath={`url(#${sunClip})`}>
            <circle cx={sun[0]} cy={sun[1]} r="16" fill="#efce85"/>
            <circle cx={sun[0]} cy={sun[1]} r="25" fill="none" stroke="#efce85" strokeOpacity=".25"/>
          </g>
          <path d={`M${ridge} V340 H0 Z`} fill="#263943"/>
          <path d={`M${ridge}`} fill="none" stroke="#77857c" strokeOpacity=".65" strokeWidth="2"/>
          <g stroke="#e7c783" strokeWidth="1.5" opacity={.4 * Math.abs(sunPosition - 1) * visibility}>{rays}</g>
          <path d="M0 230 L100 217 L180 164 L250 235 L310 248 L350 294 L450 294 L490 248 L550 235 L620 164 L700 217 L800 230 V340 H0Z" fill="#536369" stroke="#9ca79b" strokeWidth="3"/>
          <path d="M180 164 L250 235 L310 248 L350 294 H450 L490 248 L550 235 L620 164 L555 274 L475 322 H325 L245 274Z" fill="#09141e"/>
          <path d="M180 164 L250 235 L310 248 L285 260 L240 245Z" fill={`rgb(${38+143*leftLight},${55+112*leftLight},${71+52*leftLight})`}/>
          <path d="M620 164 L550 235 L490 248 L515 260 L560 245Z" fill={`rgb(${38+143*rightLight},${55+112*rightLight},${71+52*rightLight})`}/>
          <path d="M250 235 L310 248" stroke={`rgb(${69+170*leftLight},${83+123*leftLight},${102+31*leftLight})`} strokeWidth="12"/>
          <path d="M352 294 H448" stroke="#263747" strokeWidth="12"/>
          <path d="M490 248 L550 235" stroke={`rgb(${69+170*rightLight},${83+123*rightLight},${102+31*rightLight})`} strokeWidth="12"/>
        </svg>
        <div className="gac-watch-regions">{names.map((name, i) => <button key={name} disabled={paused || !ready || watch.recorded} aria-pressed={watch.recorded ? i === 1 : selected === i} onClick={() => { select(i); setWrong(false); }}>
          <span>{name}</span><small>{lit[i] ? (vi ? 'Có ánh nắng' : 'Sunlit') : (vi ? 'Trong bóng tối' : 'In shadow')}</small>
        </button>)}</div>
      </figure>
      <div className="gac-watch-observe">
        <label htmlFor="gac-sun">{vi ? 'Hướng nắng' : 'Sunlight direction'} · {watch.position + 1}/3</label>
        <input id="gac-sun" type="range" min="0" max="2" step="0.01" value={sunPosition} disabled={paused || watch.recorded} onChange={e => observe(Number(e.target.value))} aria-valuetext={`${vi ? 'Hướng' : 'Direction'} ${watch.position + 1}`}/>
        <div className="gac-watch-log" aria-label={vi ? 'Sổ quan sát' : 'Observation log'}>{[0, 1, 2].map(i => <span key={i} data-seen={watch.views.includes(i)}>{vi ? 'Hướng' : 'Direction'} {i + 1} {watch.views.includes(i) ? '✓' : '○'}</span>)}</div>
      </div>
    </div>
    <div className="gac-map-feedback">
      <p className="gac-map-status" role="status">{watch.recorded
        ? (shadowWatchCopy[language].recorded)
        : wrong ? (shadowWatchCopy[language].retry)
        : !ready ? (vi ? `Đã quan sát ${watch.views.length}/3 hướng nắng. ` : `${watch.views.length}/3 sunlight directions observed. `)
        : (shadowWatchCopy[language].question)}</p>
      <div className="gac-map-action">{watch.recorded
        ? <button className="journey-primary" disabled={paused} onClick={() => onChange({ ...progress, phase: 't03-story', turn: 0 })}>{vi ? 'Tiếp tục' : 'Continue'}</button>
        : <button className="journey-primary" disabled={paused || !ready || selected === null} onClick={record}>{vi ? 'Ghi vào sổ trực' : 'Record the observation'}</button>}</div>
    </div>
  </section>;
}
