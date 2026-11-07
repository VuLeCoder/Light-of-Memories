import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import type { GacTroiProgress } from '../content/levels/gac-troi-progress';
import { applyGacRabbitAction, type RabbitAction, type RabbitStop } from '../content/levels/gac-troi-rabbit';
import { spriteSources, cuoiWalkFrames } from '../content/assets';
import { GacCompanion } from './GacCompanion';
import { GacRabbitBackdrop } from './GacRabbitBackdrop';
import { Rabbit, RabbitLantern } from './GacRabbitArt';
import './gac-rabbit.css';

type Point = { x: number; y: number };
const places = {
  slope: { x: 725, y: 400, vi: 'đôi tai trắng sau triền đất thấp', en: 'white ears behind the low slope' },
  rock: { x: 650, y: 435, vi: 'chiếc đuôi trắng bên tảng đá có khe', en: 'a white tail beside the split rock' },
  banyan: { x: 675, y: 450, vi: 'đôi tai đang nhúc nhích dưới cây đa', en: 'wiggling ears beneath the banyan' },
};
const distance = (a: Point, b: Point) => Math.hypot(a.x-b.x, a.y-b.y);
export function GacRabbitTrail({ language, progress, onChange, onBack, paused = false }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void; onBack: () => void; paused?: boolean;
}) {
  const j = progress.rabbitJourney!;
  const stop = j.stage as RabbitStop, vi = language === 'vi', place = places[stop];
  const root = useRef<HTMLDivElement>(null);
  const keys = useRef(new Set<string>());
  const destination = useRef<Point | null>(null);
  const position = useRef<Point>({ x: 180, y: 445 });
  const [pose, setPose] = useState({ x: 180, y: 445, frame: -1, facing: 1 });
  const [message, setMessage] = useState('');
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const gift = { x: 425, y: 455 };
  const guided = j.guidedStops?.includes(stop);
  const collected = j.gifts?.includes(stop);
  const latest = useRef({ progress, paused, running, stop });
  latest.current = { progress, paused, running, stop };
  function commit(action: RabbitAction) {
    const p = latest.current.progress;
    const next = applyGacRabbitAction(p, action);
    latest.current.progress = next;
    if (next !== p) onChange(next);
  }
  function askGuide() {
    if (paused || running) return;
    keys.current.clear(); destination.current = null;
    commit({ type: 'guide', stop });
    setMessage(j.rabbitFound
      ? (vi ? 'Gác Trời: Thỏ Ngọc chạy sang phải rồi! Mình cùng theo bạn ấy nhé!' : 'Sky Watcher: Rabbit went right! Let’s follow!')
      : (vi ? `Gác Trời: Từ trên cao mình thấy ${place.vi}! Cuội thử đến gần xem nhé!` : `Sky Watcher: I can see ${place.en} from above! Go closer and look!`));
    root.current?.focus({ preventScroll: true });
  }
  const interact = useRef(() => {});
  interact.current = () => {
    if (paused || running) return;
    if (!collected && distance(position.current, gift) < 65) {
      commit({ type: 'gift', stop });
      setMessage(vi ? 'Cuội: Mình mang món quà này tặng chị Hằng nhé!' : 'Cuội: A present for Hằng!');
    } else if (!j.rabbitFound && distance(position.current, place) < 80 && guided) {
      commit({ type: 'peek', stop }); setRunning(true);
      setMessage(vi ? 'Thỏ Ngọc: Ú òa! Giỏi quá! Theo mình nào!' : 'Rabbit: Peekaboo! You found me! Follow me!');
      timer.current = setTimeout(() => setRunning(false), 1400);
    } else if (j.rabbitFound && pose.x > 820) {
      // Old saves may still contain unfinished star receipts.
      commit({ type: 'wake', stop, star: j.starsAwake+1 });
      commit({ type: 'wake', stop, star: j.starsAwake+2 });
      commit({ type: 'next', stage: stop });
    } else {
      setMessage(vi ? 'Nhấn H hoặc nút Gợi ý để hỏi Gác Trời nhé!' : 'Press H or Hint to ask Sky Watcher!');
    }
  };
  useEffect(() => {
    position.current = { x: 180, y: 445 }; destination.current = null; keys.current.clear();
    setPose({ x: 180, y: 445, frame: -1, facing: 1 }); setRunning(false);
    setMessage(''); clearTimeout(timer.current); root.current?.focus({ preventScroll: true });
  }, [stop]);
  useEffect(() => {
    if (paused) { keys.current.clear(); destination.current = null; }
  }, [paused]);
  useEffect(() => {
    let raf = 0, last = 0, elapsed = 0, facing = 1;
    const tick = (now: number) => {
      const dt = Math.min((now-last)/1000 || 0, .04); last = now;
      if (!latest.current.paused && !latest.current.running) {
        const k = keys.current;
        let dx = Number(k.has('arrowright') || k.has('d'))-Number(k.has('arrowleft') || k.has('a'));
        let dy = Number(k.has('arrowdown') || k.has('s'))-Number(k.has('arrowup') || k.has('w'));
        if (dx || dy) destination.current = null;
        else if (destination.current) {
          dx = destination.current.x-position.current.x; dy = destination.current.y-position.current.y;
          if (Math.hypot(dx,dy)<5) { destination.current=null; dx=0; dy=0; }
        }
        const length = Math.hypot(dx,dy);
        if (length) {
          position.current = { x: Math.max(70,Math.min(900,position.current.x+dx/length*190*dt)), y: Math.max(360,Math.min(495,position.current.y+dy/length*130*dt)) };
          if (dx) facing = dx < 0 ? -1 : 1;
          elapsed += dt;
        }
        setPose({ ...position.current, frame: length ? Math.floor(elapsed*9)%6 : -1, facing });
      }
      raf=requestAnimationFrame(tick);
    };
    const clear = () => { keys.current.clear(); destination.current=null; };
    window.addEventListener('blur',clear); raf=requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer.current); window.removeEventListener('blur',clear); };
  }, []);
  const frame = pose.frame < 0 ? spriteSources[2].frame : cuoiWalkFrames[pose.frame];
  const prompt = j.rabbitFound ? (vi ? 'Đi sang phải, nhấn E để theo Thỏ Ngọc →' : 'Walk right and press E to follow Rabbit →') : guided ? (vi ? `Tìm ${place.vi}. Đến gần rồi nhấn E: Ú òa!` : `Find ${place.en}. Get close and press E!`) : (vi ? 'Nhấn H hoặc Gợi ý để hỏi Gác Trời: Thỏ Ngọc trốn ở đâu nhỉ?' : 'Press H or Hint to ask Sky Watcher where Rabbit is hiding!');
  return <section className="gac-rabbit rabbit-play" hidden={paused} lang={language}
    onKeyDown={e => { if (e.key.toLowerCase() === 'h') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) askGuide(); } }}>
    <header className="rabbit-hud"><span>{vi ? 'Ú òa cùng Thỏ Ngọc' : 'Peekaboo with Rabbit'} · {j.completedStops+1}/3 · {vi ? 'Quà' : 'Gifts'} {j.gifts?.length ?? 0}/3</span><nav aria-label={vi ? 'Điều khiển hành trình' : 'Journey controls'}><button onClick={askGuide} disabled={paused || running} aria-keyshortcuts="H">{vi ? 'Gợi ý · H' : 'Hint · H'}</button><button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></nav></header>
    <div ref={root} className="rabbit-view rabbit-walk-view" tabIndex={0} role="group" aria-label={prompt}
      onKeyDown={e => { const key=e.key.toLowerCase(); if (['arrowleft','arrowright','arrowup','arrowdown','w','a','s','d','e'].includes(key)) { e.preventDefault(); e.stopPropagation(); if (!paused) { if (key==='e') { if (!e.repeat) interact.current(); } else keys.current.add(key); } } }}
      onKeyUp={e => keys.current.delete(e.key.toLowerCase())} onBlur={() => keys.current.clear()}
      onPointerDown={e => { if (paused || running) return; root.current?.focus({preventScroll:true}); const r=e.currentTarget.getBoundingClientRect(); const point={x:(e.clientX-r.left)/r.width*960,y:(e.clientY-r.top)/r.height*540}; if (distance(point,position.current)<55) interact.current(); else destination.current={x:Math.max(70,Math.min(900,point.x)),y:Math.max(360,Math.min(495,point.y))}; }}>
      <GacRabbitBackdrop stop={stop} hang={false}/>
      <GacCompanion/>
      <svg className="rabbit-player" viewBox="0 0 960 540" aria-hidden="true">
        <g transform={`translate(${pose.x} ${pose.y}) scale(${pose.facing} 1)`}>
          <svg x={-frame.width*.31} y={-frame.height*.62} width={frame.width*.62} height={frame.height*.62} viewBox={`0 0 ${frame.width} ${frame.height}`}><image href={spriteSources[2].url} x={-frame.x} y={-frame.y} width="1536" height="1024"/></svg>
          <g transform="translate(-119 -222) scale(.55)"><RabbitLantern lit/></g>
        </g>
      </svg>
      {(!j.rabbitFound || running) && <div className={`rabbit-figure ${running ? 'rabbit-flee' : ''}`} style={{left:`${place.x/9.6}%`,top:`${(place.y-35)/5.4}%`}}><Rabbit hidden={!running} tail={stop==='rock'}/></div>}
      {!collected && <span className="rabbit-present" style={{left:`${gift.x/9.6}%`,top:`${gift.y/5.4}%`}} aria-label={vi ? 'Quà tặng' : 'Present'}>{stop==='slope'?'🥕':stop==='rock'?'🥮':'🌼'}</span>}
      {j.rabbitFound && !running && <span className="rabbit-exit">→</span>}
    </div>
    <div className="rabbit-play-message" role="status" aria-live="polite"><strong>{prompt}</strong>{message && <p>{message}</p>}</div>
  </section>;
}
