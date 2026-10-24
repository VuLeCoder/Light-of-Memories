import { analyseRoute, readRouteCells, type RouteCell } from './ban-banh-luoi-route';
import { banBanhLuoiRoute } from './ban-banh-luoi-models';
import { banBanhLuoiScript } from './ban-banh-luoi-content';

export const banhLuoiPhases = ['route', 'approach', 'meeting', 'wheels', 'photoA', 'routeIntro', 'routePuzzle', 'cameraIntro'] as const;
export type BanhLuoiPhase = typeof banhLuoiPhases[number];
export const wheelChoices = ['rubber', 'mesh', 'stone'] as const;
export type WheelChoice = typeof wheelChoices[number];
export interface BanhLuoiProgress {
  phase: BanhLuoiPhase;
  turn: number;
  wheelChoice: WheelChoice | null;
  keepsakes: ('vip')[];
  routeCells: RouteCell[];
  routeHint: 0 | 1 | 2;
  completedOnce: boolean;
}
export const freshBanhLuoi = (): BanhLuoiProgress => ({ phase: 'route', turn: 0, wheelChoice: null, keepsakes: [], routeCells: [banBanhLuoiRoute.lm], routeHint: 0, completedOnce: false });

/** A damaged fourth chapter never resets the three earlier friends. */
export function readBanhLuoi(value: unknown): BanhLuoiProgress {
  if (!value || typeof value !== 'object') return freshBanhLuoi();
  const d = value as Record<string, unknown>;
  if (!banhLuoiPhases.includes(d.phase as BanhLuoiPhase)) return freshBanhLuoi();
  let phase = d.phase as BanhLuoiPhase;
  const wheelChoice = wheelChoices.includes(d.wheelChoice as WheelChoice) ? d.wheelChoice as WheelChoice : null;
  // A receipt requires the correct wheel; the next checkpoint also requires keeping it.
  if (['photoA', 'routeIntro', 'routePuzzle', 'cameraIntro'].includes(phase) && wheelChoice !== 'mesh') phase = 'wheels';
  const kept = wheelChoice === 'mesh' && Array.isArray(d.keepsakes) && d.keepsakes.includes('vip') && ['routeIntro', 'routePuzzle', 'cameraIntro'].includes(phase);
  if (['routeIntro', 'routePuzzle', 'cameraIntro'].includes(phase) && !kept) phase = 'photoA';
  const routeCells = readRouteCells(d.routeCells);
  if (phase === 'cameraIntro' && !analyseRoute(routeCells).correct) phase = 'routePuzzle';
  const maxTurn = phase === 'route' || phase === 'meeting' || phase === 'routeIntro' ? banBanhLuoiScript[phase].length - 1 : 0;
  return { phase, turn: Number.isInteger(d.turn) ? Math.max(0, Math.min(maxTurn, d.turn as number)) : 0,
    wheelChoice, keepsakes: kept ? ['vip'] : [], routeCells, routeHint: d.routeHint === 1 || d.routeHint === 2 ? d.routeHint : 0, completedOnce: false };
}

export function banhLuoiPageIds(progress: BanhLuoiProgress): string[] {
  return ['ban-banh-luoi', ...(['wheels', 'photoA', 'routeIntro', 'routePuzzle', 'cameraIntro'].includes(progress.phase) ? ['ban-book-wheels'] : []),
    ...(progress.keepsakes.includes('vip') ? ['ban-photo-vip', 'ban-book-route', 'ban-book-walkback'] : [])];
}
