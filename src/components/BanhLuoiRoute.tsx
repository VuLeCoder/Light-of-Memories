import { useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy } from '../content/levels/ban-banh-luoi-content';
import { banBanhLuoiRoute as model } from '../content/levels/ban-banh-luoi-models';
import { analyseRoute, checkRouteStep, confirmRoute, isSlope, sameCell, type RouteCell } from '../content/levels/ban-banh-luoi-route';
import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { BanhLuoiRouteMap } from './BanhLuoiRouteMap';

type Message = { key: keyof typeof copy; values?: Record<string,string | number> };
export function routeMessage(message: Message, language: Language) {
  let text: string = copy[message.key][language];
  for (const [key, value] of Object.entries(message.values ?? {})) text = text.replaceAll(`{${key}}`, String(value));
  return text;
}
export function BanhLuoiRoute({ language, progress, onChange, onHint, hintRequest = 0 }: {
  language: Language; progress: BanhLuoiProgress; onChange: (p: BanhLuoiProgress) => void; onHint: () => void; hintRequest?: number;
}) {
  const [noticeRequest, setNoticeRequest] = useState(0);
  const [message, setMessage] = useState<Message | null>(null);
  const [feedback, setFeedback] = useState<{ cell: RouteCell; id: number; kind: 'slope' | 'blocked' }>();
  const board = useRef<HTMLDivElement>(null);
  const { routeCells: cells, routeHint } = progress;
  const result = analyseRoute(cells);
  const current = result.steps[result.steps.length - 1];
  const violations: Message[] = [
    ...(result.overBattery ? [{ key: 'route.overBattery' as const, values: { used: result.battery } }] : []),
    ...(result.overWalk ? [{ key: 'route.overWalk' as const, values: { index: result.overWalk.index, steps: result.overWalk.walk } }] : []),
  ];
  const firstBad = result.steps.find(s => s.overWalk || s.overBattery);
  function change(routeCells: RouteCell[], nextMessage: Message | null = null) {
    onChange({ ...progress, routeCells }); setMessage(nextMessage); setFeedback(undefined);
  }
  function add(cell: RouteCell) {
    const error = checkRouteStep(cells[cells.length - 1], cell);
    if (error) { if (error === 'blocked') setFeedback({ cell, id: performance.now(), kind: 'blocked' }); setNoticeRequest(value => value + 1); setMessage({ key: `route.${error}` }); return; }
    change([...cells, cell]);
    if (isSlope(cell)) setFeedback({ cell, id: performance.now(), kind: 'slope' });
  }
  function submit() {
    setNoticeRequest(value => value + 1);
    const confirmedRoute = confirmRoute(cells);
    if (confirmedRoute) {
      const unchanged = JSON.stringify(progress.confirmedRoute) === JSON.stringify(confirmedRoute);
      onChange({ ...progress, confirmedRoute, phase: unchanged && progress.guideCheckpoint ? 'guiding' : 'guideIntro', turn: 0,
        ...(!unchanged ? { guideCheckpoint: null, guideHint: 0, guideLegacyPassed: false } : {}) });
      return;
    }
    setMessage(result.missing.length ? { key: 'route.missing', values: { stops: result.missing.join(', ') } }
      : !result.home ? { key: 'route.notHome' } : null);
  }
  const legend = language === 'vi'
    ? 'LM: tàu; A/B: trạm. Hố: không đi qua; Dốc: 2 pin. ▰ Xe hiện tại; ! Bước vượt giới hạn.'
    : 'LM: home; A/B: stops. Crater: blocked; Slope: 2 battery. ▰ Rover now; ! Step beyond a limit.';
  const notices = [
    ...(message ? [routeMessage(message, language)] : []),
    ...violations.map(v => routeMessage(v, language)),
    ...(routeHint ? [copy[routeHint === 1 ? 'route.hint1' : 'route.hint2'][language]] : []),
    ...(routeHint === 2 ? [firstBad ? routeMessage({ key: 'route.firstViolation', values: { index: firstBad.index, x: firstBad.cell[0], y: firstBad.cell[1] } }, language) : copy['route.noViolation'][language]] : []),
    ...(routeHint ? [copy['route.rule'][language], legend, copy['route.model'][language]] : []),
  ];
  const stops = result.steps.flatMap(s => sameCell(s.cell, model.stops.A) ? ['A'] : sameCell(s.cell, model.stops.B) ? ['B'] : []);
  const order = [...new Set(stops)];
  const goal = result.missing.length ? { key: 'route.nextStops' as const, values: { stops: result.missing.join(', ') } }
    : { key: !result.home ? 'route.return' as const : result.correct ? 'route.ready' as const : 'route.review' as const };
  return <section className="ban-panel ban-route-panel" aria-labelledby="ban-route-title">
    <h2 id="ban-route-title">{copy['route.title'][language]}</h2>
    <p className="ban-route-rule"><span className="ban-route-rule-full">{copy['route.rule'][language]}</span><span className="ban-route-rule-short">{copy['route.shortRule'][language]}</span></p>
    <div className="ban-route-layout"><div className="ban-route-board" ref={board}>
      <BanhLuoiRouteMap language={language} cells={cells} showSafe={routeHint === 2} onAdd={add} feedback={feedback}/>
      <p className="ban-route-legend">LM · {language === 'vi' ? 'Tàu' : 'Home'} · A/B · {language === 'vi' ? 'Trạm' : 'Stops'}<br/>{copy['route.crater'][language]} · {copy['route.slope'][language]}<br/>▰ {language === 'vi' ? 'Xe hiện tại' : 'Rover now'} · ! {language === 'vi' ? 'Bước vượt giới hạn' : 'Step beyond a limit'}</p>
    </div><div className="ban-route-controls">
      <div className="ban-route-meters" aria-live="polite"><p className={result.overBattery ? 'ban-feedback' : ''}>{language === 'vi' ? 'Pin' : 'Battery'}: {result.battery}/{model.batteryLimit}</p><p className={current.overWalk ? 'ban-feedback' : ''}>{language === 'vi' ? 'Đi bộ về tàu' : 'Walk home'}: {current.walk}/{model.walkLimit}</p></div>
      <p className="ban-route-stop-status" role="status" aria-label={copy['route.visited'][language]}>{order.length ? `LM → ${order.join(' → ')}${result.home ? ' → LM' : ''}` : '○ A · ○ B · ○ LM'}<span>{routeMessage(goal, language)}</span></p>
      <div className="ban-route-actions"><button aria-label={copy['button.undo'][language]} disabled={cells.length === 1} onClick={() => change(cells.slice(0,-1))}>{copy['route.undoShort'][language]}</button><button aria-label={copy['button.reset'][language]} disabled={cells.length === 1} onClick={() => change([model.lm])}>{copy['route.resetShort'][language]}</button></div>
      <div className={`ban-route-submit${progress.confirmedRoute ? ' has-resume' : ''}`}><button className="journey-primary" data-banh-primary aria-label={copy['button.routeSubmit'][language]} onClick={submit}>{progress.confirmedRoute ? (language === 'vi' ? 'Thử' : 'Try') : copy['button.routeSubmit'][language]}</button>
      {progress.confirmedRoute && <button className="ban-route-resume" aria-label={language === 'vi' ? 'Tiếp tục chuyến đi đã xác nhận' : 'Resume the confirmed trip'} onClick={() => onChange({ ...progress, phase: progress.guideCheckpoint ? 'guiding' : 'guideIntro', turn: 0 })}>{language === 'vi' ? 'Tiếp tục' : 'Resume'}</button>}</div>
      <small>{copy['route.model'][language]}</small>
    </div></div>
    {notices.length > 0 && <RouteNotices key={JSON.stringify([notices, hintRequest, noticeRequest])} language={language} notices={notices} onHint={routeHint === 1 ? onHint : undefined} onClose={() => board.current?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus()}/>}
  </section>;
}

// Keep every explanation accessible without stacking messages below the board.
function RouteNotices({ language, notices, onHint, onClose }: { language: Language; notices: string[]; onHint?: () => void; onClose: () => void }) {
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(0);
  if (!open) return null;
  const close = () => { setOpen(false); onClose(); };
  return <div className="ban-route-notices is-open" role="region" aria-label={copy['route.messages'][language]} onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } }}>
      <div className="ban-route-feedback" role="status"><p>{notices[index]}</p></div>
      <div className="ban-route-notice-actions">
        {notices.length > 1 && <button onClick={() => setIndex((index + 1) % notices.length)}>{language === 'vi' ? 'Tin tiếp' : 'Next'} · {index + 1}/{notices.length} →</button>}
        {onHint && <button onClick={onHint}>{copy['button.hintMore'][language]}</button>}
        <button onClick={close}>{language === 'vi' ? 'Đã hiểu' : 'Got it'}</button>
      </div>
  </div>;
}
