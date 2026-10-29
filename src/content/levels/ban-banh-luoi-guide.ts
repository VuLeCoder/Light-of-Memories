import { banBanhLuoiRoute as model } from './ban-banh-luoi-models';
import { sameCell, type ConfirmedBanhLuoiRoute } from './ban-banh-luoi-route';

export type GuideStage = 'travel' | 'observeA' | 'reportA' | 'chooseB' | 'callB' | 'done';
export interface GuideCheckpoint {
  edgeIndex: number;
  stage: GuideStage;
  completedStops: ('A' | 'B')[];
}
export type GuideAction = 'arrive' | 'observe' | 'report' | 'choose' | 'park';
export interface GuideEvent { key: string; action: GuideAction }
export type GuideTarget = 'observe' | 'report' | 'slope' | 'flat' | null;
export const freshGuide = (): GuideCheckpoint => ({ edgeIndex: 0, stage: 'travel', completedStops: [] });
export const guideKey = (route: ConfirmedBanhLuoiRoute, checkpoint: GuideCheckpoint) => JSON.stringify([route.cells, checkpoint]);
export function guideStop(route: ConfirmedBanhLuoiRoute, p: GuideCheckpoint) {
  const cell = route.cells[p.edgeIndex + 1];
  return (['A', 'B'] as const).find(id => sameCell(cell, model.stops[id]) && !p.completedStops.includes(id));
}
/** One accepted scene event advances one checkpoint; duplicate/stale events are ignored. */
export function advanceGuide(route: ConfirmedBanhLuoiRoute, p: GuideCheckpoint, event: GuideEvent): GuideCheckpoint {
  if (event.key !== guideKey(route, p)) return p;
  if (p.stage === 'travel' && event.action === 'arrive') {
    const stop = guideStop(route, p);
    if (stop) return { ...p, stage: stop === 'A' ? 'observeA' : 'chooseB' };
    if (p.edgeIndex < route.cells.length - 2) return { ...p, edgeIndex: p.edgeIndex + 1 };
    if (p.completedStops.length === 2) return { ...p, stage: 'done' };
  }
  if (p.stage === 'observeA' && event.action === 'observe') return { ...p, stage: 'reportA' };
  if (p.stage === 'reportA' && event.action === 'report') return { ...p, stage: 'travel', completedStops: [...p.completedStops, 'A'] };
  if (p.stage === 'chooseB' && event.action === 'choose') return { ...p, stage: 'callB' };
  if (p.stage === 'callB' && event.action === 'park') return { ...p, stage: 'travel', completedStops: [...p.completedStops, 'B'] };
  return p;
}
export function readGuide(value: unknown, route: ConfirmedBanhLuoiRoute | null): GuideCheckpoint | null {
  if (!route || !value || typeof value !== 'object') return null;
  const raw = value as GuideCheckpoint;
  if (!Array.isArray(raw.completedStops)) return null;
  // Enumerate the legal sequence. This also checks stop order, repeated cells and final LM.
  let p = freshGuide();
  const actions = { travel: 'arrive', observeA: 'observe', reportA: 'report', chooseB: 'choose', callB: 'park' } as const;
  for (let i = 0; i < route.cells.length + 8; i++) {
    if (p.edgeIndex === raw.edgeIndex && p.stage === raw.stage && JSON.stringify(p.completedStops) === JSON.stringify(raw.completedStops)) return p;
    if (p.stage === 'done') break;
    p = advanceGuide(route, p, { key: guideKey(route, p), action: actions[p.stage] });
  }
  return null;
}
