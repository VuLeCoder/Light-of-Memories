import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import { unlockGacBook, gacRouteLandmarks, type GacTroiProgress } from '../content/levels/gac-troi-progress';
import { cuoiWalkFrames, spriteSources } from '../content/assets';
import { GacRabbitBackdrop } from './GacRabbitBackdrop';
import './gac-rest-light.css';

type Point = { x: number; y: number };
const stops: Point[] = [{ x: 320, y: 470 }, { x: 550, y: 400 }, { x: 790, y: 490 }];
const clamp = (p: Point): Point => ({ x: Math.max(65, Math.min(895, p.x)), y: Math.max(395, Math.min(510, p.y)) });
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const scaleAt = (y: number) => .65 + (y - 395) / 115 * .45;
const controls = [{ x: -1, y: 0, icon: '←', vi: 'Đi sang trái', en: 'Move left' }, { x: 0, y: -1, icon: '↑', vi: 'Đi lên', en: 'Move up' }, { x: 0, y: 1, icon: '↓', vi: 'Đi xuống', en: 'Move down' }, { x: 1, y: 0, icon: '→', vi: 'Đi sang phải', en: 'Move right' }];

export function GacRestLight({ language, progress, onChange, onBack, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void;
  onBack: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const approach = progress.phase === 't03-walk';
  const count = progress.routeLandmarks.length;
  const done = count === stops.length;
  const [point, setPoint] = useState<Point>(() => count ? stops[count - 1] : { x: 135, y: 490 });
  const [moving, setMoving] = useState(false);
  const [frame, setFrame] = useState(0);
  const [facing, setFacing] = useState(1);
  const [hint, setHint] = useState(false);
  const root = useRef<HTMLElement>(null);
  const position = useRef(point);
  const keys = useRef(new Set<string>());
  const direction = useRef<Point>({ x: 0, y: 0 });
  const destination = useRef<Point | null>(null);
  const latest = useRef({ progress, onChange, paused });
  latest.current = { progress, onChange, paused };
  const near = !approach && !done && distance(point, stops[count]) < 43;
  const stop = () => { keys.current.clear(); direction.current = { x: 0, y: 0 }; destination.current = null; };
  const light = () => {
    const { progress: p, onChange: change, paused: frozen } = latest.current;
    const n = p.routeLandmarks.length;
    if (frozen || p.phase === 't03-walk' || n >= stops.length || distance(position.current, stops[n]) >= 43) return;
    stop(); setMoving(false); setHint(false);
    const next = { ...p, routeLandmarks: gacRouteLandmarks.slice(0, n + 1) };
    latest.current = { ...latest.current, progress: next };
    change(next);
  };
  useEffect(() => {
    root.current?.focus({ preventScroll: true });
    const clear = () => { stop(); setMoving(false); };
    window.addEventListener('blur', clear);
    document.addEventListener('visibilitychange', clear);
    return () => { window.removeEventListener('blur', clear); document.removeEventListener('visibilitychange', clear); };
  }, []);
  useEffect(() => {
    if (paused) { stop(); setMoving(false); return; }
    let raf = 0;
    let previous = 0;
    const tick = (time: number) => {
      const dt = previous ? Math.min((time - previous) / 1000, .04) : 0;
      previous = time;
      const held = { x: direction.current.x || Number(keys.current.has('ArrowRight') || keys.current.has('d')) - Number(keys.current.has('ArrowLeft') || keys.current.has('a')),
        y: direction.current.y || Number(keys.current.has('ArrowDown') || keys.current.has('s')) - Number(keys.current.has('ArrowUp') || keys.current.has('w')) };
      if (held.x || held.y) destination.current = null;
      const target = destination.current;
      const vector = target ? { x: target.x - position.current.x, y: target.y - position.current.y } : held;
      const length = Math.hypot(vector.x, vector.y);
      const step = latest.current.progress.routeLandmarks.length === stops.length ? 0 : Math.min(160 * scaleAt(position.current.y) * dt, target ? length : Infinity);
      const next = length > .1 ? clamp({ x: position.current.x + vector.x / length * step, y: position.current.y + vector.y / length * step }) : position.current;
      const walking = distance(next, position.current) > .001;
      if (walking) { position.current = next; setPoint(next); if (vector.x) setFacing(Math.sign(vector.x)); setFrame(Math.floor(time / 110) % cuoiWalkFrames.length); }
      if (target && distance(target, next) <= .2) destination.current = null;
      setMoving(walking);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);
  useEffect(() => {
    if (!approach || paused || point.x < 880) return;
    stop();
    onChange({ ...progress, phase: 't03-map', turn: 0 });
  }, [approach, paused, point.x, progress, onChange]);
  useEffect(() => {
    if (!done || paused) return;
    stop();
    const timer = window.setTimeout(() => {
      const current = latest.current;
      if (!current.paused) current.onChange(unlockGacBook({ ...current.progress, phase: 'gac-farewell', turn: 0 }, 'gac-book-map'));
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [done, paused]);
  const source = spriteSources[2];
  const pose = moving ? cuoiWalkFrames[frame] : source.frame;
  return <section ref={root} tabIndex={0} className={`gac-rest${approach ? ' is-approach' : ''}${done ? ' is-complete' : ''}`} hidden={paused} lang={language}
    aria-label={vi ? 'Theo bước ánh sáng. Điều khiển Cuội bằng phím mũi tên hoặc W, A, S, D. Nhấn E để thắp đèn.' : 'Follow the light. Move Cuội with arrow keys or W, A, S, D. Press E to light a lantern.'}
    onKeyDown={event => {
      if (paused || event.altKey || event.ctrlKey || event.metaKey) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'w', 'a', 's', 'd'].includes(key)) { event.preventDefault(); keys.current.add(key); destination.current = null; }
      if (key === 'e') { event.preventDefault(); if (!event.repeat) light(); }
    }}
    onKeyUp={event => keys.current.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { stop(); setMoving(false); } }}>
    <header className="rest-hud"><span>{vi ? 'Gác Trời · Theo bước ánh sáng' : 'Sky Watcher · Follow the light'}</span><nav>
      <button disabled={paused} onClick={() => setHint(v => !v)} aria-expanded={hint}>{vi ? 'Gợi ý' : 'Hint'}</button>
      <button disabled={paused} onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button>
    </nav></header>
    <div className="rest-world">
      <GacRabbitBackdrop stop="slope" hang={false} orbit/>
      <div className="rest-darkness" aria-hidden="true"/>
      {!approach && stops.map((lamp, i) => <div key={i} className={`rest-lamp${i < count ? ' is-lit' : ''}`} style={{ left: `${lamp.x / 9.6}%`, top: `${lamp.y / 5.4}%`, zIndex: Math.round(lamp.y), transform: `translate(-50%, -100%) scale(${scaleAt(lamp.y)})` }} aria-hidden="true">
        <svg viewBox="0 0 100 110">
          <ellipse className="rest-lamp-pool" cx="50" cy="100" rx="48" ry="9" fill="#ffe3a2"/>
          <ellipse className="rest-lamp-glow" cx="50" cy="65" rx="36" ry="40" fill="#ffda87"/>
          <path d="M37 100h26l-5-9H42Z" fill="#827252"/><path d="M50 94V65" stroke="#bda776" strokeWidth="4"/>
          <rect className="rest-lamp-core" x="40" y="52" width="20" height="25" rx="5" stroke="#c7ac75" strokeWidth="3"/>
          <text x="50" y="43" textAnchor="middle" fill="#e2c98f" fontSize="16">{i < count ? '✓' : i + 1}</text>
        </svg>
      </div>)}
      <svg className="rest-cuoi" style={{ left: `${point.x / 9.6}%`, top: `${point.y / 5.4}%`, height: `${26 * scaleAt(point.y)}%`, zIndex: Math.round(point.y), transform: `translate(-50%, -100%) scaleX(${facing})` }} viewBox={`0 0 ${pose.width} ${pose.height}`} aria-hidden="true">
        <image href={source.url} x={-pose.x} y={-pose.y} width={source.width} height={source.height}/>
      </svg>
      <button className="rest-ground" disabled={paused || done} aria-label={vi ? 'Chạm mặt đất để Cuội đi tới' : 'Tap the ground to move Cuội'} tabIndex={-1}
        onPointerDown={event => {
          if (event.button !== 0 || paused || done) return;
          const rect = event.currentTarget.parentElement!.getBoundingClientRect();
          stop(); destination.current = clamp({ x: (event.clientX - rect.left) / rect.width * 960, y: (event.clientY - rect.top) / rect.height * 540 });
          root.current?.focus({ preventScroll: true });
        }}/>
    </div>
    <div className="rest-card">
      <h2>{approach ? (vi ? 'Đi cùng Gác Trời' : 'Follow Sky Watcher') : done ? (vi ? 'Ba ngọn đèn đã sáng!' : 'All three lanterns are shining!') : (vi ? 'Cùng Cuội thắp đèn dẫn đường' : 'Help Cuội light the path')}</h2>
      <p role="status">{approach ? (vi ? 'Điều khiển Cuội sang mép phải màn hình để đi tiếp nhé!' : 'Move Cuội to the right edge to continue!') : done ? (vi ? 'Đường đã sáng rồi! Gác Trời có lời nhắn cho Cuội…' : 'The path is bright! Sky Watcher has a message for Cuội…') : hint ? (vi ? `Đi tới đèn sáng mờ số ${count + 1}, rồi bấm “Thắp đèn” hoặc phím E nhé.` : `Walk to dim lantern ${count + 1}, then press “Light lantern” or E.`) : (vi ? `Đến gần và nhấn E để thắp đèn ${count + 1}/3 nhé!` : `Walk closer and press E to light lantern ${count + 1}/3!`)}</p>
    </div>
    <footer className="rest-controls">
      {done ? <span role="status">{vi ? 'Ánh sáng đang lan khắp lối đi…' : 'Light is spreading across the path…'}</span> : <>
        <div className="rest-directions">{controls.map(control => <button key={control.icon} disabled={paused} aria-label={vi ? control.vi : control.en}
          onPointerDown={event => { if (paused || event.button !== 0) return; stop(); direction.current = control; event.currentTarget.setPointerCapture(event.pointerId); }}
          onPointerUp={() => { direction.current = { x: 0, y: 0 }; }} onPointerCancel={() => { direction.current = { x: 0, y: 0 }; }} onLostPointerCapture={() => { direction.current = { x: 0, y: 0 }; }}
          onClick={event => { if (event.detail === 0 && !paused) destination.current = clamp({ x: position.current.x + control.x * 60, y: position.current.y + control.y * 40 }); }}>{control.icon}</button>)}</div>
        <span>{vi ? '↑ ↓ ← → / W A S D để đi · E để thắp đèn' : '↑ ↓ ← → / W A S D to walk · E to light'}</span>
        {!approach && <button className="rest-action" disabled={paused || !near} onClick={light}>{vi ? 'Thắp đèn' : 'Light lantern'} · E · {count}/3</button>}
      </>}
    </footer>
  </section>;
}
