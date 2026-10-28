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
export function BanhLuoiRoute({ language, progress, onChange, onHint, hintRequest = 0 }: {
  language: Language; progress: BanhLuoiProgress; onChange: (p: BanhLuoiProgress) => void; onHint: () => void; hintRequest?: number;
}) {
  const [noticeRequest, setNoticeRequest] = useState(0);
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
    if (error) { setNoticeRequest(value => value + 1); setMessage({ key: `route.${error}` }); return; }
    change([...cells, cell]);
  }
  function submit() {
    setNoticeRequest(value => value + 1);
    if (result.correct) { onChange({ ...progress, phase: 'cameraIntro', turn: 0 }); return; }
    setMessage(result.missing.length ? { key: 'route.missing', values: { stops: result.missing.join(', ') } }
      : !result.home ? { key: 'route.notHome' } : null);
  }
  const legend = language === 'vi'
    ? 'LM: tàu; A/B: trạm. ● Hố: không đi qua; ▱ Dốc: 2 pin. ◆ Xe hiện tại; ! Bước vượt giới hạn.'
    : 'LM: home; A/B: stops. ● Crater: blocked; ▱ Slope: 2 battery. ◆ Rover now; ! Step beyond a limit.';
  const notices = [
    ...(message ? [routeMessage(message, language)] : []),
    ...violations.map(v => routeMessage(v, language)),
    ...(routeHint ? [copy[routeHint === 1 ? 'route.hint1' : 'route.hint2'][language]] : []),
    ...(routeHint === 2 ? [firstBad ? routeMessage({ key: 'route.firstViolation', values: { index: firstBad.index, x: firstBad.cell[0], y: firstBad.cell[1] } }, language) : copy['route.noViolation'][language]] : []),
    ...(routeHint ? [copy['route.rule'][language], legend, copy['route.model'][language]] : []),
  ];
  return <section className="ban-panel ban-route-panel" aria-labelledby="ban-route-title">
    <h2 id="ban-route-title">{language === 'vi' ? 'Đi xa, nhớ đường về' : 'Explore and find the way home'}</h2>
    <p className="ban-route-rule"><span className="ban-route-rule-full">{copy['route.rule'][language]}</span><span className="ban-route-rule-short">{language === 'vi' ? 'Ghé A, B → LM · Pin ≤12 · Luôn cách tàu ≤4 bước đi bộ.' : 'A, B → LM · Battery ≤12 · Always ≤4 walking steps from home.'}</span></p>
    <div className="ban-route-layout"><div className="ban-route-board">
      <BanhLuoiRouteMap language={language} cells={cells} showSafe={routeHint === 2} onAdd={add}/>
      <p className="ban-route-legend">LM · {language === 'vi' ? 'Tàu' : 'Home'} · A/B · {language === 'vi' ? 'Trạm' : 'Stops'}<br/>● {copy['route.crater'][language]} · ▱ {copy['route.slope'][language]}<br/>◆ {language === 'vi' ? 'Xe hiện tại' : 'Rover now'} · ! {language === 'vi' ? 'Bước vượt giới hạn' : 'Step beyond a limit'}</p>
    </div><div className="ban-route-controls">
      <div className="ban-route-meters" aria-live="polite"><p className={result.overBattery ? 'ban-feedback' : ''}>{language === 'vi' ? 'Pin' : 'Battery'}: {result.battery}/{model.batteryLimit}</p><p className={current.overWalk ? 'ban-feedback' : ''}>{language === 'vi' ? 'Đi bộ về tàu' : 'Walk home'}: {current.walk}/{model.walkLimit}</p></div>
      <p>{['A','B'].map(stop => `${result.missing.includes(stop as 'A'|'B') ? '○' : '✓'} ${stop}`).join(' · ')} · {result.home ? '✓ LM' : '○ LM'}</p>
      <div className="ban-route-actions"><button aria-label={copy['button.undo'][language]} disabled={cells.length === 1} onClick={() => change(cells.slice(0,-1), { key: 'route.undoStatus' })}>{language === 'vi' ? 'Lùi 1 ô' : 'Undo'}</button><button aria-label={copy['button.reset'][language]} disabled={cells.length === 1} onClick={() => change([model.lm], { key: 'route.resetStatus' })}>{language === 'vi' ? 'Vẽ lại' : 'Reset'}</button></div>
      <button className="journey-primary" data-banh-primary onClick={submit}>{copy['button.routeSubmit'][language]}</button>
      <small>{copy['route.model'][language]}</small>
    </div></div>
    {notices.length > 0 && <RouteNotices key={JSON.stringify([notices, hintRequest, noticeRequest])} language={language} notices={notices} onHint={routeHint === 1 ? onHint : undefined}/>}
  </section>;
}

// Keep every explanation accessible without stacking messages below the board.
function RouteNotices({ language, notices, onHint }: { language: Language; notices: string[]; onHint?: () => void }) {
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(0);
  if (!open) return null;
  return <div className="ban-route-notices is-open">
      <div className="ban-route-feedback" role="status"><p>{notices[index]}</p></div>
      <div className="ban-route-notice-actions">
        {notices.length > 1 && <button onClick={() => setIndex((index + 1) % notices.length)}>{language === 'vi' ? 'Tin tiếp' : 'Next'} · {index + 1}/{notices.length} →</button>}
        {onHint && <button onClick={onHint}>{copy['button.hintMore'][language]}</button>}
        <button onClick={() => setOpen(false)}>{language === 'vi' ? 'Đã hiểu' : 'Got it'}</button>
      </div>
  </div>;
}
