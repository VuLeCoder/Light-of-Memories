import { useState } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy } from '../content/levels/ban-banh-luoi-content';
import { banBanhLuoiRoute as model } from '../content/levels/ban-banh-luoi-models';
import { analyseRoute, checkRouteStep, type RouteCell } from '../content/levels/ban-banh-luoi-route';
import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { BanhLuoiRouteMap } from './BanhLuoiRouteMap';

type Message = { key: keyof typeof copy; values?: Record<string,string | number> };
export function routeMessage(message: Message, language: Language) {
  let text: string = copy[message.key][language];
  for (const [key, value] of Object.entries(message.values ?? {})) text = text.replaceAll(`{${key}}`, String(value));
  return text;
}
export function BanhLuoiRoute({ language, progress, onChange, onHint }: {
  language: Language; progress: BanhLuoiProgress; onChange: (p: BanhLuoiProgress) => void; onHint: () => void;
}) {
  const [message, setMessage] = useState<Message | null>(null);
  const { routeCells: cells, routeHint } = progress;
  const result = analyseRoute(cells);
  const current = result.steps[result.steps.length - 1];
  const violations: Message[] = [
    ...(result.overBattery ? [{ key: 'route.overBattery' as const, values: { used: result.battery } }] : []),
    ...(result.overWalk ? [{ key: 'route.overWalk' as const, values: { index: result.overWalk.index, steps: result.overWalk.walk } }] : []),
  ];
  const firstBad = result.steps.find(s => s.overWalk || s.overBattery);
  function change(routeCells: RouteCell[], nextMessage: Message | null = null) {
    onChange({ ...progress, routeCells }); setMessage(nextMessage);
  }
  function add(cell: RouteCell) {
    const error = checkRouteStep(cells[cells.length - 1], cell);
    if (error) { setMessage({ key: `route.${error}` }); return; }
    change([...cells, cell]);
  }
  function submit() {
    if (result.correct) { onChange({ ...progress, phase: 'cameraIntro', turn: 0 }); return; }
    setMessage(result.missing.length ? { key: 'route.missing', values: { stops: result.missing.join(', ') } }
      : !result.home ? { key: 'route.notHome' } : null);
  }
  return <section className="ban-panel ban-route-panel" aria-labelledby="ban-route-title">
    <h2 id="ban-route-title">{language === 'vi' ? 'Đi xa, nhớ đường về' : 'Explore and find the way home'}</h2>
    <p className="ban-route-rule">{copy['route.rule'][language]}</p>
    <div className="ban-route-layout"><div>
      <BanhLuoiRouteMap language={language} cells={cells} showSafe={routeHint === 2} onAdd={add}/>
      <p className="ban-route-legend">LM · {language === 'vi' ? 'Tàu' : 'Home'} · A/B · {language === 'vi' ? 'Trạm' : 'Stops'}<br/>● {copy['route.crater'][language]} · ▱ {copy['route.slope'][language]}<br/>◆ {language === 'vi' ? 'Xe hiện tại' : 'Rover now'} · ! {language === 'vi' ? 'Bước vượt giới hạn' : 'Step beyond a limit'}</p>
    </div><div className="ban-route-controls">
      <div className="ban-route-meters" aria-live="polite"><p className={result.overBattery ? 'ban-feedback' : ''}>{routeMessage({ key: 'route.battery', values: { used: result.battery } },language)}</p><p className={current.overWalk ? 'ban-feedback' : ''}>{routeMessage({ key: 'route.walk', values: { steps: current.walk } },language)}</p></div>
      <p>{['A','B'].map(stop => `${result.missing.includes(stop as 'A'|'B') ? '○' : '✓'} ${stop}`).join(' · ')} · {result.home ? '✓ LM' : '○ LM'}</p>
      <div className="ban-route-actions"><button disabled={cells.length === 1} onClick={() => change(cells.slice(0,-1), { key: 'route.undoStatus' })}>{copy['button.undo'][language]}</button><button disabled={cells.length === 1} onClick={() => change([model.lm], { key: 'route.resetStatus' })}>{copy['button.reset'][language]}</button></div>
      <div className="ban-route-feedback" role="status">{message && <p>{routeMessage(message,language)}</p>}{violations.map(v => <p key={v.key}>{routeMessage(v,language)}</p>)}</div>
      {routeHint > 0 && <div className="ban-route-hints"><p>{copy[routeHint === 1 ? 'route.hint1' : 'route.hint2'][language]}</p>{routeHint === 2 && <p>{firstBad ? routeMessage({ key: 'route.firstViolation', values: { index: firstBad.index, x: firstBad.cell[0], y: firstBad.cell[1] } },language) : copy['route.noViolation'][language]}</p>}{routeHint === 1 && <button onClick={onHint}>{copy['button.hintMore'][language]}</button>}</div>}
      <button className="ban-primary" data-banh-primary onClick={submit}>{copy['button.routeSubmit'][language]}</button>
      <small>{copy['route.model'][language]}</small>
    </div></div>
  </section>;
}
