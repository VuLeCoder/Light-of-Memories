import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy } from '../content/levels/ban-banh-luoi-content';
import { banBanhLuoiRoute as model } from '../content/levels/ban-banh-luoi-models';
import { analyseRoute, isCrater, isSlope, routeCells, sameCell, walkDistance, type RouteCell } from '../content/levels/ban-banh-luoi-route';

export function BanhLuoiRouteMap({ language, cells = [model.lm], showSafe = false, onAdd, feedback }: {
  language: Language; cells?: readonly RouteCell[]; showSafe?: boolean; onAdd?: (cell: RouteCell) => void;
  feedback?: { cell: RouteCell; id: number; kind: 'slope' | 'blocked' };
}) {
  const [focused, setFocused] = useState(() => Math.max(0, routeCells.findIndex(c => sameCell(c, cells[cells.length - 1]))));
  const grid = useRef<HTMLDivElement>(null);
  const result = analyseRoute(cells);
  const end = cells[cells.length - 1];
  function move(event: KeyboardEvent<HTMLButtonElement>, i: number) {
    const delta: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -model.columns, ArrowDown: model.columns };
    if (!(event.key in delta)) return;
    event.preventDefault();
    const next = i + delta[event.key];
    if (next < 0 || next >= routeCells.length || (event.key === 'ArrowLeft' && i % model.columns === 0) || (event.key === 'ArrowRight' && i % model.columns === model.columns - 1)) return;
    grid.current?.querySelectorAll('button')[next]?.focus();
  }
  return <div style={{ '--map-columns': model.columns, '--map-rows': model.rows } as CSSProperties} className={`ban-route-map${onAdd ? '' : ' ban-route-map-static'}`} ref={grid} role={onAdd ? 'group' : 'img'} aria-label={onAdd ? copy['route.model'][language] : `${copy['route.model'][language]}. LM (1,1); A (2,3); B (3,3). ${copy['route.crater'][language]}: ${model.craters.map(c => `(${c.join(',')})`).join('; ')}. ${copy['route.slope'][language]}: ${model.slopes.map(c => `(${c.join(',')})`).join('; ')}.${showSafe ? ` ${copy['route.hint2'][language]}` : ''}`}>
    {onAdd && <><span className="ban-map-columns" aria-hidden="true">{Array.from({length:model.columns},(_,i) => <span key={i}>{i+1}</span>)}</span><span className="ban-map-rows" aria-hidden="true">{Array.from({length:model.rows},(_,i) => <span key={i}>{i+1}</span>)}</span></>}
    <svg className="ban-map-tracks" viewBox={`0 0 ${model.columns * 100} ${model.rows * 100}`} preserveAspectRatio="none" aria-hidden="true">
      {cells.slice(1).map((cell, i) => {
        const from = cells[i], dx = cell[0] - from[0], dy = cell[1] - from[1];
        return <g key={i}>{[-8, 8].map(offset => <line key={offset}
          x1={(from[0]-.5)*100 - dy*offset} y1={(from[1]-.5)*100 + dx*offset}
          x2={(cell[0]-.5)*100 - dy*offset} y2={(cell[1]-.5)*100 + dx*offset}
          stroke="#ead4a4" strokeWidth="5" strokeDasharray="7 4"/>)}</g>;
      })}
      {cells.length > 1 && <path d="M -12 -9 L 0 0 L -12 9" fill="none" stroke="#fff0c9" strokeWidth="5"
        transform={`translate(${(end[0]-.5)*100},${(end[1]-.5)*100}) rotate(${Math.atan2(end[1]-cells[cells.length-2][1],end[0]-cells[cells.length-2][0])*180/Math.PI})`}/>}
      {result.steps.filter(s => s.overWalk || s.overBattery).map(s => <circle key={s.index} cx={(s.cell[0]-.5)*100} cy={(s.cell[1]-.5)*100} r="28" fill="none" stroke="#f2b094" strokeWidth="7" strokeDasharray="9 5"/>)}</svg>
    {routeCells.map((cell, i) => {
      const crater = isCrater(cell), slope = isSlope(cell), safe = !crater && walkDistance(cell) <= model.walkLimit;
      const stop = sameCell(cell, model.lm) ? 'LM' : sameCell(cell, model.stops.A) ? 'A' : sameCell(cell, model.stops.B) ? 'B' : null;
      const terrain = copy[crater ? 'route.crater' : slope ? 'route.slope' : 'route.flat'][language];
      const visits = result.steps.filter(s => sameCell(s.cell, cell));
      const bad = visits.some(s => s.overWalk || s.overBattery);
      const label = `${language === 'vi' ? 'Cột' : 'Column'} ${cell[0]}, ${language === 'vi' ? 'hàng' : 'row'} ${cell[1]}: ${stop ? `${stop}, ` : ''}${terrain}${showSafe && !crater ? `. ${copy[safe ? 'route.safe' : 'route.unsafe'][language]}` : ''}${visits.length ? `. ${language === 'vi' ? 'Bước' : 'Steps'} ${visits.map(v => v.index).join(', ')}` : ''}${bad ? ' (!)' : ''}`;
      const hit = feedback && sameCell(cell, feedback.cell) ? feedback : null;
      const content = <>
        <RouteTerrain kind={crater ? 'crater' : slope ? 'slope' : 'flat'} stop={stop}/>
        {stop && <span className="ban-map-stop">{stop}</span>}
        {slope && <span className="ban-map-cost" aria-hidden="true">2<span className="ban-map-battery"/></span>}
        {sameCell(cell,end) && <b className="ban-map-rover" key={`rover-${cells.length}`} aria-hidden="true">▰</b>}
        {hit && <span key={hit.id} className={`ban-map-pulse is-${hit.kind}`} aria-hidden="true">{hit.kind === 'slope' ? '−2' : '×'}</span>}
        {bad && <em aria-hidden="true">!</em>}
      </>;
      const className = `ban-route-cell${crater ? ' is-crater' : ''}${slope ? ' is-slope' : ''}${showSafe && safe ? ' is-safe' : ''}${visits.length ? ' is-visited' : ''}${bad ? ' is-violation' : ''}`;
      return onAdd ? <button key={i} className={className} data-cell={cell.join(',')} tabIndex={focused === i ? 0 : -1} onFocus={() => setFocused(i)} aria-label={label} onKeyDown={e => move(e,i)} onClick={() => onAdd(cell)}>{content}</button>
        : <span key={i} className={className} title={label}>{content}</span>;
    })}
  </div>;
}

/** Code-native pixel scenery: shared by the playable map and the book. */
function RouteTerrain({ kind, stop }: { kind: 'crater' | 'slope' | 'flat'; stop: string | null }) {
  return <svg className="ban-map-terrain" viewBox="0 0 40 40" aria-hidden="true" shapeRendering="crispEdges">
    <path d="M4 7h3v2H4z M31 30h3v2h-3z M7 32h2v2H7z M30 8h2v2h-2z" fill="#8a9990" opacity=".45"/>
    {kind === 'crater' && <>
      <path d="M10 10h20v3h5v5h3v9h-5v4H9v-3H4V17h3v-4h3z" fill="#a5aa91"/>
      <path d="M10 15h20v3h4v8h-5v3H11v-3H7v-8h3z" fill="#24363a"/>
      <path d="M11 15h19v3H15v3h-5v5H7v-8h4z" fill="#101f28"/>
      <path d="M13 29h16v-3h5v3h-4v3H13z" fill="#65756e"/>
    </>}
    {kind === 'slope' && <>
      <path d="M4 30v-4h6v-5h7v-5h7v-5h10v19z" fill="#bac1a0"/>
      <path d="M4 30v-4h11v-4h9v-5h10v13z" fill="#89987c"/>
      <path d="M4 33v-3h14v-4h9v-5h7v12z" fill="#506c63"/>
      <path d="M9 28h5v-2h5v-3h5v-3h5" fill="none" stroke="#d9d5af" strokeWidth="1"/>
    </>}
    {stop === 'LM' && <>
      <path d="M14 6h12v4h3v12H11V10h3z" fill="#c9c7ac"/>
      <path d="M17 9h7v6h-7z" fill="#344954"/>
      <path d="M11 22h18v4H11z M11 24H8v6H4v2h8v-6h16v6h8v-2h-4v-6h-3" fill="#c9a96b"/>
    </>}
    {stop && stop !== 'LM' && <>
      <path d="M12 7h2v25h-2z" fill="#d9d9be"/>
      <path d="M14 7h16v10H14z" fill={stop === 'A' ? '#d8b97d' : '#a9c8bd'}/>
      <path d="M8 32h13v2H8z" fill="#b2b7a1"/>
    </>}
  </svg>;
}
