import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import type { Language } from '../content/i18n';
import type { GacTroiProgress } from '../content/levels/gac-troi-progress';
import { applyGacRabbitAction, rabbitObjective, type RabbitAction, type RabbitStop } from '../content/levels/gac-troi-rabbit';
import { gacRabbitCopy } from '../content/levels/gac-rabbit-copy';
import { GacRabbitBackdrop, RabbitCuoi } from './GacRabbitBackdrop';
import './gac-rabbit.css';

const positions = {
  slope: { hidden: [725,335], shown: [650,390], stars: [[790,390]], wrong: [355,340], path: '200,430 790,430 890,410' },
  rock: { hidden: [650,360], shown: [680,390], stars: [[510,415],[840,400]], wrong: [560,375], path: '200,450 510,470 840,450 900,420' },
  banyan: { hidden: [675,380], shown: [600,400], stars: [[740,440]], wrong: [805,410], path: '200,450 740,465 850,420' },
} as const;
const at = (p: readonly number[]): CSSProperties => ({ left: `${p[0]/9.6}%`, top: `${p[1]/5.4}%` });

function Rabbit({ hidden, tail, sneeze = false }: { hidden: boolean; tail: boolean; sneeze?: boolean }) {
  return <svg viewBox="0 0 80 104" aria-hidden="true">
    {hidden ? tail ? <path fill="#eee3c6" d="M18 50h12V38h28v12h12v28H58v12H30V78H18z"/> : <>
      <path fill="#eee3c6" d="M12 94V12h20v66h16V4h20v90z"/><path fill="#b97c64" d="M19 24h6v48h-6zm36-8h6v54h-6z"/>
    </> : <><path fill="#9baeb1" d="M8 97h64v7H8z"/><path fill="#eee3c6" d="M12 94V60h8V40h4V8h16v34h8V2h16v48h8v44H58v8H14v-8z"/>
      <path fill="#b97c64" d="M29 16h6v25h-6zm24-6h6v29h-6z"/>{sneeze ? <path stroke="#263c45" strokeWidth="3" fill="none" d="m29 57 7 4-7 4m30-8-7 4 7 4M40 72h8m24-8 8-4m-8 12h8"/> : <path fill="#263c45" d="M30 57h5v6h-5zm22 0h5v6h-5zM40 70h8v4h-8z"/>}
      <path fill="#9baeb1" d="M16 94h14v6H16zm36-14h24v6H52z"/></>}
  </svg>;
}
function Star({ awake, yawning }: { awake: boolean; yawning: boolean }) {
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path fill={awake ? '#eed395' : '#9baeb1'} stroke="#eee3c6" strokeWidth="2" d="M32 3 41 21 61 24 47 39 50 60 32 50 14 60 17 39 3 24 23 21Z"/>
    {awake ? <path fill="#263c45" d="M23 28h4v6h-4zm14 0h4v6h-4zM27 39h10v4H27z"/> : <path fill="none" stroke="#263c45" strokeWidth="3" d="m21 30 4 3 5-3m5 0 4 3 5-3"/>}
    {yawning && <ellipse fill="#263c45" cx="32" cy="40" rx="5" ry="7"/>}
  </svg>;
}

/** GT-R2 screen. Mounted by the release renderer only for active stop stages. */
export function GacRabbitTrail({ language, progress, onChange, onBack, paused = false }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void; onBack: () => void; paused?: boolean;
}) {
  const j = progress.rabbitJourney!;
  const stop = j.stage as RabbitStop;
  const objective = rabbitObjective(j)!;
  const vi = language === 'vi';
  const data = positions[stop];
  const root = useRef<HTMLElement>(null);
  const target = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);
  const latest = useRef(progress); latest.current = progress;
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const focusPending = useRef(false);
  const [reaction, setReaction] = useState('');
  const [feedback, setFeedback] = useState('');
  const [hint, setHint] = useState(false);
  const [optionalFits, setOptionalFits] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [busy, setBusy] = useState(false);
  const text = (key: string) => (gacRabbitCopy[stop] as Record<string, {vi: string; en: string}>)[key]?.[language] ?? '';
  const wrongPoint = objective === 'find' ? data.wrong : objective === 'wake-2' ? data.stars[0] : data.shown;
  const targetPoint = objective === 'find' ? data.hidden : (data.stars[objective === 'wake-2' ? 1 : 0] ?? data.stars[0]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    // Returning from a book/route shows the saved pose, without replaying reactions.
    if (paused) { clearTimeout(timer.current); busyRef.current = false; setBusy(false); setReaction(''); setFeedback(''); setHint(false); focusPending.current = false; }
  }, [paused]);
  useEffect(() => { setFeedback(''); setHint(false); }, [stop]);
  useLayoutEffect(() => {
    if (!busy && focusPending.current && !paused) {
      (objective === 'ready' ? nextButton.current : target.current)?.focus({ preventScroll: true });
      focusPending.current = false;
    }
  }, [busy, objective, paused]);
  useLayoutEffect(() => {
    const view = root.current?.querySelector('.rabbit-view');
    if (!view) return;
    const measure = () => {
      const rect = view.getBoundingClientRect();
      const dx = Math.abs(wrongPoint[0] - targetPoint[0]) * rect.width / 960;
      const dy = Math.abs(wrongPoint[1] - targetPoint[1]) * rect.height / 540;
      setOptionalFits(dx >= Math.max(48, rect.width * .09) + 8 || dy >= Math.max(48, rect.height * .19) + 8);
    };
    const observer = new ResizeObserver(measure); observer.observe(view); measure();
    return () => observer.disconnect();
  }, [stop, objective, wrongPoint, targetPoint]);
  function act(action: RabbitAction, message: string, duration: number, pose: string) {
    if (paused || busyRef.current) return;
    const result = applyGacRabbitAction(latest.current, action);
    if (result === latest.current) return;
    clearTimeout(timer.current);
    latest.current = result; busyRef.current = true;
    focusPending.current = true; setHint(false); setFeedback(message); setReaction(pose); setBusy(!reduced);
    onChange(result); // Persist the receipt before any visual reaction.
    const finish = () => { busyRef.current = false; setBusy(false); setReaction(''); };
    if (reduced) finish(); else timer.current = setTimeout(finish, duration);
  }
  function next() {
    if (paused || busyRef.current) return;
    // No walking prerequisite: the button itself commits the next stop.
    act({ type: 'next', stage: stop }, '', 400, 'walk');
  }
  const targetLabel = objective === 'find' ? (stop === 'rock' ? (vi ? 'Chiếc đuôi trắng' : 'White tail') : (vi ? 'Đôi tai trắng' : 'White ears')) : (vi ? 'Ngôi sao đang ngủ' : 'Sleepy star');
  const wrongLabel = objective === 'find' ? (stop === 'slope' ? (vi ? 'Hòn đá' : 'Rock') : stop === 'rock' ? (vi ? 'Khe đá' : 'Rock crack') : (vi ? 'Rễ cây' : 'Tree root')) : objective === 'wake-2' ? (vi ? 'Ngôi sao đã thức' : 'Awake star') : (vi ? 'Thỏ Ngọc' : 'Moon Rabbit');
  const miss = objective === 'find' ? 'find.miss' : stop === 'rock' ? 'wake.miss' : 'wake-1.miss';
  return <section ref={root} className="gac-rabbit" hidden={paused} lang={language} aria-label={vi ? 'Theo Thỏ Ngọc, gọi ánh sao' : 'Follow Moon Rabbit, wake the lights'}>
    <header className="rabbit-hud"><span>{(vi ? ['Triền đất thấp','Đá có khe','Cây đa'] : ['Low slope','Split rock','Banyan tree'])[['slope','rock','banyan'].indexOf(stop)]} · {j.completedStops + 1}/3</span><nav>
      {objective !== 'ready' && <button disabled={busy} onClick={() => { setHint(true); setFeedback(''); }}>{vi ? 'Gợi ý' : 'Hint'}</button>}
      <button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button>
    </nav></header>
    <div className={`rabbit-view ${reaction ? `rabbit-react-${reaction}` : ''}`} role="group" aria-label={vi ? 'Cảnh tìm Thỏ trong truyện' : 'Story scene: find Rabbit'}>
      <GacRabbitBackdrop stop={stop} hang={stop === 'banyan' && objective === 'ready'}/>
      <svg className="rabbit-path" viewBox="0 0 960 540" aria-hidden="true">
        {objective === 'ready' && <polyline points={data.path} fill="none" stroke="#eed395" strokeWidth="6" strokeDasharray="8 14"/>}
        {stop === 'slope' && !j.rabbitFound && [570,610,650].map((x,i) => <path key={x} fill="#c4c4ac" d={`M${x} ${385-i*10}h8v5h-8zm12-6h8v5h-8z`}/>)}
      </svg>
      <svg className="rabbit-path" viewBox="0 0 960 540" aria-hidden="true"><path stroke="#9a704b" strokeWidth="3" fill="none" d="M220 386h28v12"/><path fill="#eed395" stroke="#b97c64" strokeWidth="3" d="m248 392 8 14 16 3-12 11 2 16-14-8-14 8 2-16-12-11 16-3Z"/></svg>
      <RabbitCuoi/>
      {objective === 'find' && optionalFits && <svg className="rabbit-wrong-figure" style={at(data.wrong)} viewBox="0 0 64 48" aria-hidden="true"><path fill={stop === 'banyan' ? '#796c4e' : '#8c9792'} stroke="#667673" strokeWidth="3" d={stop === 'banyan' ? 'M4 40 22 22 30 4 36 24 60 38 56 44 32 32 12 46Z' : 'M4 40 12 12 34 4 54 18 60 42Z'}/></svg>}
      {/* Decoration has no invisible hitbox; exactly one progress button below. */}
      <div className="rabbit-figure" style={at(j.rabbitFound ? data.shown : data.hidden)}><Rabbit hidden={!j.rabbitFound} tail={stop === 'rock'} sneeze={stop === 'rock' && reaction === 'found'}/></div>
      {j.rabbitFound && data.stars.map((p,i) => i <= j.starsAwake && <div key={i} className={`rabbit-star ${i < j.starsAwake ? 'awake' : ''}`} style={at(p)}><Star awake={i < j.starsAwake} yawning={reaction === 'star' && i === j.starsAwake-1}/></div>)}
      {objective !== 'ready' && <button ref={target} className={`rabbit-hit rabbit-target ${hint ? 'rabbit-hinted' : ''}`} style={at(targetPoint)} disabled={busy || paused} aria-label={targetLabel}
        onClick={() => act(objective === 'find' ? {type:'find',stop} : {type:'wake',stop,star:j.starsAwake+1}, `${objective}.success`, objective === 'find' ? 600 : stop === 'banyan' ? 1000 : 700, objective === 'find' ? 'found' : 'star')}/>}
      {objective !== 'ready' && optionalFits && <button className="rabbit-hit rabbit-wrong" style={at(wrongPoint)} disabled={busy || paused} aria-label={wrongLabel} onClick={() => {
        if (busyRef.current || paused) return;
        setFeedback(miss); setReaction('miss');
        clearTimeout(timer.current); timer.current = setTimeout(() => setReaction(''), reduced ? 0 : 300);
      }}/ >}
    </div>
    <div className="rabbit-panel"><p className="rabbit-prompt">{text(`${objective}.prompt`)}</p>
      <p className="rabbit-feedback" role="status" aria-live="polite">{feedback ? text(feedback) : hint ? text(`${objective}.hint`) : '\u00a0'}</p>
      {objective === 'ready' && <button ref={nextButton} disabled={busy || paused} onClick={next}>{stop === 'banyan' ? (vi ? 'Gặp chị Hằng' : 'Meet Hằng') : (vi ? 'Đi tiếp' : 'Next')} →</button>}
    </div>
  </section>;
}
