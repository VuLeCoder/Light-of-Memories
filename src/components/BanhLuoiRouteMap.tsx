import { useRef, useState, type KeyboardEvent } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy } from '../content/levels/ban-banh-luoi-content';
import { banBanhLuoiRoute as model } from '../content/levels/ban-banh-luoi-models';
import { analyseRoute, isCrater, isSlope, routeCells, sameCell, walkDistance, type RouteCell } from '../content/levels/ban-banh-luoi-route';

export function BanhLuoiRouteMap({ language, cells = [model.lm], showSafe = false, onAdd }: {
  language: Language; cells?: readonly RouteCell[]; showSafe?: boolean; onAdd?: (cell: RouteCell) => void;
}) {
  const [focused, setFocused] = useState(() => Math.max(0, routeCells.findIndex(c => sameCell(c, cells[cells.length - 1]))));
  const grid = useRef<HTMLDivElement>(null);
  const result = analyseRoute(cells);
  const end = cells[cells.length - 1];
  function move(event: KeyboardEvent<HTMLButtonElement>, i: number) {
    const delta: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -model.size, ArrowDown: model.size };
    if (!(event.key in delta)) return;
    event.preventDefault();
    const next = i + delta[event.key];
    if (next < 0 || next >= routeCells.length || (event.key === 'ArrowLeft' && i % model.size === 0) || (event.key === 'ArrowRight' && i % model.size === model.size - 1)) return;
    grid.current?.querySelectorAll('button')[next]?.focus();
  }
  return <div className={`ban-route-map${onAdd ? '' : ' ban-route-map-static'}`} ref={grid} role={onAdd ? 'group' : 'img'} aria-label={onAdd ? copy['route.model'][language] : `${copy['route.model'][language]}. LM (1,1); A (2,3); B (3,3). ${copy['route.crater'][language]}: ${model.craters.map(c => `(${c.join(',')})`).join('; ')}. ${copy['route.slope'][language]}: ${model.slopes.map(c => `(${c.join(',')})`).join('; ')}.${showSafe ? ` ${copy['route.hint2'][language]}` : ''}`}>
    {onAdd && <><span className="ban-map-columns" aria-hidden="true">{Array.from({length:model.size},(_,i) => <span key={i}>{i+1}</span>)}</span><span className="ban-map-rows" aria-hidden="true">{Array.from({length:model.size},(_,i) => <span key={i}>{i+1}</span>)}</span></>}
    <svg viewBox="0 0 600 600" preserveAspectRatio="none" aria-hidden="true"><polyline points={cells.map(([x,y]) => `${(x-.5)*100},${(y-.5)*100}`).join(' ')} fill="none" stroke="#ead4a4" strokeWidth="9" strokeLinejoin="round"/>
      {result.steps.filter(s => s.overWalk || s.overBattery).map(s => <circle key={s.index} cx={(s.cell[0]-.5)*100} cy={(s.cell[1]-.5)*100} r="28" fill="none" stroke="#f2b094" strokeWidth="7" strokeDasharray="9 5"/>)}</svg>
    {routeCells.map((cell, i) => {
      const crater = isCrater(cell), slope = isSlope(cell), safe = !crater && walkDistance(cell) <= model.walkLimit;
      const stop = sameCell(cell, model.lm) ? 'LM' : sameCell(cell, model.stops.A) ? 'A' : sameCell(cell, model.stops.B) ? 'B' : null;
      const terrain = copy[crater ? 'route.crater' : slope ? 'route.slope' : 'route.flat'][language];
      const visits = result.steps.filter(s => sameCell(s.cell, cell));
      const bad = visits.some(s => s.overWalk || s.overBattery);
      const label = `${language === 'vi' ? 'Cột' : 'Column'} ${cell[0]}, ${language === 'vi' ? 'hàng' : 'row'} ${cell[1]}: ${stop ? `${stop}, ` : ''}${terrain}${showSafe && !crater ? `. ${copy[safe ? 'route.safe' : 'route.unsafe'][language]}` : ''}${visits.length ? `. ${language === 'vi' ? 'Bước' : 'Steps'} ${visits.map(v => v.index).join(', ')}` : ''}${bad ? ' (!)' : ''}`;
      const content = <><span>{stop ?? (crater ? '●' : slope ? '▱' : '·')}</span>{sameCell(cell,end) && <b aria-hidden="true">◆</b>}{bad && <em aria-hidden="true">!</em>}</>;
      const className = `ban-route-cell${crater ? ' is-crater' : ''}${showSafe && safe ? ' is-safe' : ''}${visits.length ? ' is-visited' : ''}${bad ? ' is-violation' : ''}`;
      return onAdd ? <button key={i} className={className} data-cell={cell.join(',')} tabIndex={focused === i ? 0 : -1} onFocus={() => setFocused(i)} aria-label={label} onKeyDown={e => move(e,i)} onClick={() => onAdd(cell)}>{content}</button>
        : <span key={i} className={className} title={label}>{content}</span>;
    })}
  </div>;
}
