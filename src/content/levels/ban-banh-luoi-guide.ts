import { banBanhLuoiRoute as model } from './ban-banh-luoi-models';
import { sameCell, type ConfirmedBanhLuoiRoute } from './ban-banh-luoi-route';

export type RockState = 'untouched' | 'hitOnce' | 'loose' | 'carrying' | 'stored';
export type SoilState = 'unfound' | 'carrying' | 'stored';
export interface SampleTripCheckpoint {
  kind: 'samples-v1';
  routeKey: string;
  nodeIndex: number;
  stage: 'travel' | 'atA' | 'atB' | 'done';
  rock: RockState;
  soil: SoilState;
  hints: { A: 0 | 1 | 2; B: 0 | 1 | 2 };
}
export type GuideCheckpoint = SampleTripCheckpoint;
export type GuideEvent = { key: string } & (
  | { action: 'arrive'; nodeIndex: number }
  | { action: 'hit' | 'pickRock' | 'store' | 'hint' }
  | { action: 'collectSoil'; patch: 'orange' }
);
export const routeKey = (route: ConfirmedBanhLuoiRoute) => JSON.stringify([route.modelVersion, route.cells]);
export const freshGuide = (route: ConfirmedBanhLuoiRoute): GuideCheckpoint => ({
  kind: 'samples-v1', routeKey: routeKey(route), nodeIndex: 0, stage: 'travel',
  rock: 'untouched', soil: 'unfound', hints: { A: 0, B: 0 },
});
export const guideKey = (route: ConfirmedBanhLuoiRoute, p: GuideCheckpoint) => JSON.stringify([routeKey(route), p]);
export function guideStop(route: ConfirmedBanhLuoiRoute, index: number) {
  return (['A', 'B'] as const).find(id => sameCell(route.cells[index], model.stops[id]));
}
/** React alone advances durable state. Scene events are bound to the exact checkpoint. */
export function advanceGuide(route: ConfirmedBanhLuoiRoute, p: GuideCheckpoint, event: GuideEvent): GuideCheckpoint {
  if (p.routeKey !== routeKey(route) || event.key !== guideKey(route, p)) return p;
  if (event.action === 'hint' && (p.stage === 'atA' || p.stage === 'atB')) {
    const stop = p.stage === 'atA' ? 'A' : 'B';
    return p.hints[stop] === 2 ? p : { ...p, hints: { ...p.hints, [stop]: p.hints[stop] + 1 } };
  }
  if (p.stage === 'travel' && event.action === 'arrive' && event.nodeIndex === p.nodeIndex + 1 && event.nodeIndex < route.cells.length) {
    const nodeIndex = event.nodeIndex, stop = guideStop(route, nodeIndex);
    if (stop === 'A' && p.rock !== 'stored') return { ...p, nodeIndex, stage: 'atA' };
    if (stop === 'B' && p.soil !== 'stored') return { ...p, nodeIndex, stage: 'atB' };
    if (nodeIndex === route.cells.length - 1) {
      return p.rock === 'stored' && p.soil === 'stored' && sameCell(route.cells[nodeIndex], model.lm) ? { ...p, nodeIndex, stage: 'done' } : p;
    }
    return { ...p, nodeIndex };
  }
  if (p.stage === 'atA') {
    if (event.action === 'hit' && (p.rock === 'untouched' || p.rock === 'hitOnce')) return { ...p, rock: p.rock === 'untouched' ? 'hitOnce' : 'loose' };
    if (event.action === 'pickRock' && p.rock === 'loose') return { ...p, rock: 'carrying' };
    if (event.action === 'store' && p.rock === 'carrying') return { ...p, rock: 'stored', stage: 'travel' };
  }
  if (p.stage === 'atB') {
    if (event.action === 'collectSoil' && event.patch === 'orange' && p.soil === 'unfound') return { ...p, soil: 'carrying' };
    if (event.action === 'store' && p.soil === 'carrying') return { ...p, soil: 'stored', stage: 'travel' };
  }
  return p;
}
/** Enumerate reachable sample states, including visits to repeated cells and intermediate LM. */
export function readGuide(value: unknown, route: ConfirmedBanhLuoiRoute | null): GuideCheckpoint | null {
  if (!route || !value || typeof value !== 'object') return null;
  const raw = value as GuideCheckpoint;
  if (raw.kind !== 'samples-v1' || raw.routeKey !== routeKey(route) || !raw.hints ||
      ![0, 1, 2].includes(raw.hints.A) || ![0, 1, 2].includes(raw.hints.B)) return null;
  let p = freshGuide(route);
  for (let i = 0; i < route.cells.length + 10; i++) {
    const visitedA = route.cells.slice(0, p.nodeIndex + 1).some(cell => sameCell(cell, model.stops.A));
    const visitedB = route.cells.slice(0, p.nodeIndex + 1).some(cell => sameCell(cell, model.stops.B));
    if (p.nodeIndex === raw.nodeIndex && p.stage === raw.stage && p.rock === raw.rock && p.soil === raw.soil &&
        (visitedA || raw.hints.A === 0) && (visitedB || raw.hints.B === 0)) return { ...p, hints: { A: raw.hints.A, B: raw.hints.B } };
    if (p.stage === 'done') break;
    const key = guideKey(route, p);
    const event: GuideEvent = p.stage === 'travel' ? { key, action: 'arrive', nodeIndex: p.nodeIndex + 1 }
      : p.stage === 'atA' ? { key, action: p.rock === 'carrying' ? 'store' : p.rock === 'loose' ? 'pickRock' : 'hit' }
      : p.soil === 'carrying' ? { key, action: 'store' } : { key, action: 'collectSoil', patch: 'orange' };
    const next = advanceGuide(route, p, event);
    if (next === p) break;
    p = next;
  }
  return null;
}
