import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import type { GacTroiProgress } from '../content/levels/gac-troi-progress';
import { applyGacRabbitAction, type RabbitAction, type RabbitStop } from '../content/levels/gac-troi-rabbit';
import { spriteSources, cuoiWalkFrames } from '../content/assets';
import { GacCompanion } from './GacCompanion';
import { GacRabbitBackdrop } from './GacRabbitBackdrop';
import { Rabbit, RabbitLantern, TrailRock, TrailGift } from './GacRabbitArt';
import './gac-rabbit.css';
import { rabbitTrailLayouts, type RabbitRock } from '../content/levels/gac-rabbit-layout';

type Point = { x: number; y: number };
const distance = (a: Point, b: Point) => Math.hypot(a.x-b.x, a.y-b.y);
export function GacRabbitTrail({ language, progress, onChange, onBack, paused = false }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void; onBack: () => void; paused?: boolean;
}) {
  const j = progress.rabbitJourney!;
  const stop = j.stage as RabbitStop, vi = language === 'vi', layout = rabbitTrailLayouts[stop], place = layout.rabbit;
  const root = useRef<HTMLDivElement>(null);
  const continueButton = useRef<HTMLButtonElement>(null);
  const keys = useRef(new Set<string>());
  const destination = useRef<Point | null>(null);
  const pendingRock = useRef<string | null>(null);
  const position = useRef<Point>({ x: 180, y: 445 });
  const [pose, setPose] = useState({ x: 180, y: 445, frame: -1, facing: 1 });
  const [message, setMessage] = useState('');
  const [running, setRunning] = useState(false);
  const [dialogue, setDialogue] = useState(false);
  const [rabbitWaiting, setRabbitWaiting] = useState(false);
  const flight = useRef(0);
  const [flightPose, setFlightPose] = useState({ x: 0, lift: 0, squash: 1, stride: 0 });
  const gift = layout.gift;
  const collected = j.gifts?.includes(stop);
  const latest = useRef({ progress, paused: paused || dialogue, running, stop });
  latest.current = { progress, paused: paused || dialogue, running, stop };
  function commit(action: RabbitAction) {
    const p = latest.current.progress;
    const next = applyGacRabbitAction(p, action);
    latest.current.progress = next;
    if (next !== p) onChange(next);
  }
  const rockPoint = (rock: RabbitRock): Point => ({ x: rock.x, y: Math.min(495, rock.y + 24) });
  const nearestRock = layout.rocks.map(rock => ({ rock, distance: distance(pose, rockPoint(rock)) }))
    .filter(item => item.distance < 78).sort((a, b) => a.distance - b.distance)[0]?.rock;
  function askGuide() {
    if (paused || running || dialogue) return;
    keys.current.clear(); destination.current = null; pendingRock.current = null;
    commit({ type: 'guide', stop });
    setDialogue(true);
    const giftRock = layout.rocks.find(rock => rock.id === layout.giftRock)!;
    setMessage(!j.rabbitFound
      ? (vi ? `Gác Trời: Mình thấy ${place.vi}! Đến gần tảng đá rồi nhấn E nhé!` : `Sky Watcher: I see ${place.en}! Go to the rock and press E!`)
      : !collected
        ? (vi ? `Gác Trời: Còn quà ở ${giftRock.vi}. Cuội có thể lấy quà hoặc đi sang phải theo Thỏ nhé!` : `Sky Watcher: A gift is at ${giftRock.en}. Collect it or head right after Rabbit!`)
        : (vi ? 'Gác Trời: Thỏ Ngọc chạy sang phải rồi! Mình cùng theo bạn ấy nhé!' : 'Sky Watcher: Rabbit went right! Let’s follow!'));
    root.current?.focus({ preventScroll: true });
  }
  const interact = useRef(() => {});
  interact.current = () => {
    if (paused || running || dialogue) return;
    keys.current.clear(); destination.current = null; pendingRock.current = null;
    const nearby = layout.rocks.map(rock => ({ rock, distance: distance(position.current, rockPoint(rock)) }))
      .filter(item => item.distance < 78).sort((a, b) => a.distance - b.distance)[0]?.rock;
    if (nearby?.id === layout.giftRock && !collected) {
      commit({ type: 'gift', stop });
      setMessage(vi ? 'Cuội: Có quà sau tảng đá này! Mình mang tặng chị Hằng nhé!' : 'Cuội: A gift behind this rock! Let’s bring it to Hằng!');
    } else if (nearby?.id === layout.rabbitRock && !j.rabbitFound) {
      commit({ type: 'peek', stop }); setRabbitWaiting(true); setDialogue(true);
      const giftRock = layout.rocks.find(rock => rock.id === layout.giftRock)!;
      const greetings = {
        slope: vi ? 'Ú òa! Bạn tìm thấy mình rồi! Thử tìm mình ở chỗ tiếp theo nhé!' : 'Peekaboo! You found me! Try my next hiding spot!',
        rock: vi ? 'Ôi, Cuội tinh mắt quá! Mình còn một chỗ trốn nữa cơ!' : 'Wow, sharp eyes, Cuội! I have one more hiding spot!',
        banyan: vi ? 'Ú òa! Cuội tìm được mình cả ba lần rồi! Giờ mình dẫn bạn đến gặp chị Hằng nhé!' : 'Peekaboo! You found me all three times! Now I’ll take you to Hằng!',
      };
      setMessage(vi
        ? `Thỏ Ngọc: ${greetings[stop]} ${collected ? 'Bạn đã nhặt quà rồi, giỏi quá!' : `Có quà ở ${giftRock.vi}, bạn có thể nhặt mang theo nhé!`} Đi sang mép phải rồi nhấn E để theo mình nhé!`
        : `Rabbit: ${greetings[stop]} ${collected ? 'You found the gift too! Well done!' : `There is a gift at ${giftRock.en}; you can bring it along!`} Walk to the right edge and press E to follow me!`);

    } else if (j.rabbitFound && position.current.x > 820) {
      // Old saves may still contain unfinished star receipts.
      commit({ type: 'wake', stop, star: j.starsAwake+1 });
      commit({ type: 'wake', stop, star: j.starsAwake+2 });
      commit({ type: 'next', stage: stop });
    } else {
      setMessage(nearby
        ? (vi ? 'Cuội: Sau tảng đá này không còn gì. Mình thử tảng khác nhé!' : 'Cuội: Nothing else behind this rock. Let’s try another!')
        : (vi ? 'Cuội: Mình đến gần một tảng đá rồi nhấn E nhé. Cần giúp thì nhấn H!' : 'Cuội: Let’s get close to a rock and press E. Press H for help!'));
    }
  };
  useEffect(() => {
    if (pendingRock.current && !destination.current && !paused && !running && !dialogue) interact.current();
  }, [pose, paused, running, dialogue]);

  useEffect(() => {
    position.current = { x: 180, y: 445 }; destination.current = null; pendingRock.current = null; keys.current.clear();
    setPose({ x: 180, y: 445, frame: -1, facing: 1 }); setRunning(false);
    setMessage(''); setDialogue(false); setRabbitWaiting(false); flight.current = 0; setFlightPose({ x: 0, lift: 0, squash: 1, stride: 0 }); root.current?.focus({ preventScroll: true });
  }, [stop]);
  useEffect(() => {
    if (paused || dialogue) { keys.current.clear(); destination.current = null; pendingRock.current = null; }
  }, [paused, dialogue]);
  useEffect(() => {
    if (paused) return;
    if (dialogue) continueButton.current?.focus({ preventScroll: true });
    else root.current?.focus({ preventScroll: true });
  }, [paused, dialogue]);
  function finishDialogue() {
    if (paused || !dialogue) return;
    setDialogue(false); setMessage('');
    if (rabbitWaiting) {
      setRabbitWaiting(false); setRunning(true);
      flight.current = 0;
    }
  }
  useEffect(() => {
    let raf = 0, last = 0, elapsed = 0, facing = 1;
    const tick = (now: number) => {
      const dt = Math.min((now-last)/1000 || 0, .04); last = now;
      if (!latest.current.paused && latest.current.running) {
        flight.current += dt;
        const t = Math.min(1, flight.current / 2.2);
        const travel = Math.max(0, (t - .1) / .9);
        const hop = travel >= 1 ? 0 : (travel * 4) % 1;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setFlightPose({ x: travel, stride: reduced ? 0 : hop, lift: reduced ? 0 : Math.sin(hop * Math.PI) * 28,
          squash: reduced ? 1 : t < .1 ? 1 - Math.sin(t / .1 * Math.PI) * .15 : 1 - Math.pow(Math.abs(hop - .5) * 2, 8) * .12 });
        if (t >= 1) setRunning(false);
      }
      if (!latest.current.paused && !latest.current.running) {
        const k = keys.current;
        let dx = Number(k.has('arrowright') || k.has('d'))-Number(k.has('arrowleft') || k.has('a'));
        let dy = Number(k.has('arrowdown') || k.has('s'))-Number(k.has('arrowup') || k.has('w'));
        if (dx || dy) { destination.current = null; pendingRock.current = null; }
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
    const clear = () => { keys.current.clear(); destination.current=null; pendingRock.current=null; };
    window.addEventListener('blur',clear); raf=requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('blur',clear); };
  }, []);
  const frame = pose.frame < 0 ? spriteSources[2].frame : cuoiWalkFrames[pose.frame];
  // Same trimmed-frame fist anchors and wrist angles as PreviewScene.syncLanternGrip.
  const hands = [[139,132],[114,130],[132,132],[139,130],[119,132],[132,134]];
  const hand = pose.frame < 0 ? [106,154] : hands[pose.frame];
  const angle = (pose.frame < 0 ? .68 : [.62,.48,.52,.64,.48,.54][pose.frame]) * 180 / Math.PI;
  const player = <g key="cuoi" transform={`translate(${pose.x} ${pose.y}) scale(${pose.facing} 1)`}>
    <g transform={`translate(${(hand[0]-frame.width/2)*.62} ${(hand[1]-frame.height)*.62}) rotate(${angle}) translate(0 -27)`}><RabbitLantern lit local/></g>
    <svg x={-frame.width*.31} y={-frame.height*.62} width={frame.width*.62} height={frame.height*.62} viewBox={`0 0 ${frame.width} ${frame.height}`}><image href={spriteSources[2].url} x={-frame.x} y={-frame.y} width="1536" height="1024"/></svg>
  </g>;
  const foreground = [
    ...layout.rocks.map(rock => ({ id: rock.id, y: rock.y, art: <TrailRock key={rock.id} rock={rock}/> })),
    { id: 'cuoi', y: pose.y, art: player },
    ...(!collected ? [{ id: 'gift', y: gift.y, art: <g key="gift" className="rabbit-gift-art" transform={`translate(${gift.x} ${gift.y})`}><TrailGift kind={stop}/></g> }] : []),
  ].sort((a,b) => a.y-b.y);
  const prompt = j.rabbitFound
    ? (vi ? 'Có thể tìm quà, hoặc sang phải và nhấn E để theo Thỏ →' : 'Find a gift, or walk right and press E to follow Rabbit →')
    : (vi ? 'Đi gần đá rồi nhấn E, hoặc chạm tảng đá để Cuội tìm. Gợi ý: H.' : 'Walk to a rock and press E, or tap a rock to search. Hint: H.');
  const nearbyPrompt = nearestRock
    ? (vi ? `E · Tìm sau ${nearestRock.vi}` : `E · Search behind ${nearestRock.en}`)
    : j.rabbitFound && pose.x > 820 ? (vi ? 'E · Theo Thỏ Ngọc →' : 'E · Follow Rabbit →') : '';

  return <section className="gac-rabbit rabbit-play" hidden={paused} lang={language} data-paused={paused}
    onKeyDown={e => { if (e.key.toLowerCase() === 'h') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) askGuide(); } }}>
    <header className="rabbit-hud"><span>{vi ? 'Ú òa cùng Thỏ Ngọc' : 'Peekaboo with Rabbit'} · {j.completedStops+1}/3 · {vi ? 'Quà' : 'Gifts'} {j.gifts?.length ?? 0}/3</span><nav aria-label={vi ? 'Điều khiển hành trình' : 'Journey controls'}><button onClick={askGuide} disabled={paused || running || dialogue} aria-keyshortcuts="H">{vi ? 'Gợi ý' : 'Hint'}</button><button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></nav></header>
    <div ref={root} className="rabbit-view rabbit-walk-view" tabIndex={0} role="group" aria-label={prompt}
      onKeyDown={e => { const key=e.key.toLowerCase(); if (['arrowleft','arrowright','arrowup','arrowdown','w','a','s','d','e'].includes(key)) { e.preventDefault(); e.stopPropagation(); if (!paused && !dialogue) { if (key==='e') { if (!e.repeat) interact.current(); } else keys.current.add(key); } } }}
      onKeyUp={e => keys.current.delete(e.key.toLowerCase())} onBlur={() => keys.current.clear()}
      onPointerDown={e => { if (paused || running || dialogue) return; root.current?.focus({preventScroll:true}); const r=e.currentTarget.getBoundingClientRect(); const point={x:(e.clientX-r.left)/r.width*960,y:(e.clientY-r.top)/r.height*540}; const tappedRock=layout.rocks.find(rock => Math.abs(point.x-rock.x)<rock.width*.6 && point.y>=rock.y-rock.height && point.y<=rock.y+28); pendingRock.current=null; if (tappedRock) { pendingRock.current=tappedRock.id; destination.current=rockPoint(tappedRock); } else if (distance(point,position.current)<55) interact.current(); else destination.current={x:Math.max(70,Math.min(900,point.x)),y:Math.max(360,Math.min(495,point.y))}; }}>
      <GacRabbitBackdrop stop={stop} hang={false}/>
      <GacCompanion/>
      <svg className="rabbit-player" viewBox="0 0 960 540" aria-hidden="true">
        {foreground.map(item => item.art)}
      </svg>
      {running && <div className="rabbit-ground-shadow" style={{ left: `${(place.x + flightPose.x * (1030 - place.x)) / 9.6}%`, top: `${(place.y + 5) / 5.4}%`, opacity: .3 - flightPose.lift / 220, scale: String(1 - flightPose.lift / 120) }}/>}
      {(!j.rabbitFound || rabbitWaiting || running) && <div className={`rabbit-figure ${running || rabbitWaiting ? 'rabbit-revealed' : ''}`} style={{left:`${(place.x + (running ? flightPose.x * (1030-place.x) : 0))/9.6}%`,top:`${(place.y-(running || rabbitWaiting ? 45 : 65)-(running ? flightPose.lift : 0))/5.4}%`}}><div className={rabbitWaiting ? 'rabbit-pop' : undefined} style={{ transform: `scale(${running ? 1 / flightPose.squash : 1}, ${running ? flightPose.squash : 1})`, transformOrigin: 'bottom' }}><Rabbit hidden={!running && !rabbitWaiting} hopping={running} stride={flightPose.stride}/></div></div>}

      {nearbyPrompt && !running && !dialogue && <span className="rabbit-nearby">{nearbyPrompt}</span>}
      {j.rabbitFound && !running && <span className="rabbit-exit">→</span>}
    </div>
    <div className={`rabbit-play-message${!message ? ' is-empty' : ''}`} role="status" aria-live="polite"
      onKeyDown={event => {
        if (!dialogue || !['Space', 'Enter', 'NumpadEnter'].includes(event.code)) return;
        event.preventDefault(); event.stopPropagation();
        if (!event.repeat) finishDialogue();
      }}
      onKeyUp={event => {
        if (['Space', 'Enter', 'NumpadEnter'].includes(event.code)) {
          event.preventDefault(); event.stopPropagation();
        }
      }}>
      {message && <p>{message}</p>}
      {dialogue && <button ref={continueButton} disabled={paused} onClick={finishDialogue}>{vi ? 'Tiếp tục' : 'Continue'}</button>}
    </div>
  </section>;
}
