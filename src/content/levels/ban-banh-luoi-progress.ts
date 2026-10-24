import { analyseCamera, cameraSpots, readCameraAngle, type CameraSpot } from './ban-banh-luoi-camera';
import { analyseRoute, readRouteCells, type RouteCell } from './ban-banh-luoi-route';
import { banBanhLuoiRoute } from './ban-banh-luoi-models';
import { banBanhLuoiScript } from './ban-banh-luoi-content';

export const banhLuoiPhases = ['route', 'approach', 'meeting', 'wheels', 'photoA', 'routeIntro', 'routePuzzle', 'cameraIntro', 'camera', 'launch', 'photoB', 'memoriesIntro', 'recallA', 'recallB', 'farewell', 'gift', 'finished'] as const;
export type BanhLuoiPhase = typeof banhLuoiPhases[number];
export const wheelChoices = ['rubber', 'mesh', 'stone'] as const;
export type WheelChoice = typeof wheelChoices[number];
export interface BanhLuoiProgress {
  phase: BanhLuoiPhase;
  turn: number;
  wheelChoice: WheelChoice | null;
  keepsakes: ('vip' | 'orbit')[];
  cameraSpot: CameraSpot | null;
  cameraAngle: number;
  cameraHint: 0 | 1 | 2;
  routeCells: RouteCell[];
  routeHint: 0 | 1 | 2;
  completedOnce: boolean;
}
export const freshBanhLuoi = (): BanhLuoiProgress => ({ phase: 'route', turn: 0, wheelChoice: null, keepsakes: [], routeCells: [banBanhLuoiRoute.lm], routeHint: 0, cameraSpot: null, cameraAngle: 0, cameraHint: 0, completedOnce: false });

/** A damaged fourth chapter never resets the three earlier friends. */
export function readBanhLuoi(value: unknown): BanhLuoiProgress {
  if (!value || typeof value !== 'object') return freshBanhLuoi();
  const d = value as Record<string, unknown>;
  if (!banhLuoiPhases.includes(d.phase as BanhLuoiPhase)) return freshBanhLuoi();
  let phase = d.phase as BanhLuoiPhase;
  const wheelChoice = wheelChoices.includes(d.wheelChoice as WheelChoice) ? d.wheelChoice as WheelChoice : null;
  const ending = ['memoriesIntro', 'recallA', 'recallB', 'farewell', 'gift', 'finished'];
  const completedOnce = d.completedOnce === true;
  const afterPhotoA = ['routeIntro', 'routePuzzle', 'cameraIntro', 'camera', 'launch', 'photoB', ...ending];
  const afterRoute = ['cameraIntro', 'camera', 'launch', 'photoB', ...ending];
  const afterCamera = ['launch', 'photoB', ...ending];
  if (['photoA', ...afterPhotoA].includes(phase) && wheelChoice !== 'mesh') phase = 'wheels';
  const kept = Array.isArray(d.keepsakes) && d.keepsakes.includes('vip') && (completedOnce || wheelChoice === 'mesh' && afterPhotoA.includes(phase));
  if (afterPhotoA.includes(phase) && !kept) phase = 'photoA';
  const routeCells = readRouteCells(d.routeCells);
  if (afterRoute.includes(phase) && !analyseRoute(routeCells).correct) phase = 'routePuzzle';
  const cameraSpot = cameraSpots.includes(d.cameraSpot as CameraSpot) ? d.cameraSpot as CameraSpot : null;
  const cameraAngle = readCameraAngle(d.cameraAngle);
  if (afterCamera.includes(phase) && analyseCamera(cameraSpot,cameraAngle) !== 'correct') phase = 'camera';
  const orbit = (completedOnce || ending.includes(phase)) && kept && Array.isArray(d.keepsakes) && d.keepsakes.includes('orbit');
  if (ending.includes(phase) && !orbit) phase = 'photoB';
  if (phase === 'finished' && !completedOnce) phase = 'gift';
  const maxTurn = phase === 'route' || phase === 'meeting' || phase === 'routeIntro' || phase === 'cameraIntro' || phase === 'memoriesIntro' || phase === 'farewell' ? banBanhLuoiScript[phase].length - 1 : phase === 'photoB' ? 1 : phase === 'gift' && completedOnce ? banBanhLuoiScript.giftAfter.length : 0;
  return { phase, turn: phase === 'gift' && completedOnce ? Math.max(1, Math.min(maxTurn, Number.isInteger(d.turn) ? d.turn as number : 1)) : Number.isInteger(d.turn) ? Math.max(0, Math.min(maxTurn, d.turn as number)) : 0,
    wheelChoice, keepsakes: kept ? orbit ? ['vip','orbit'] : ['vip'] : [], routeCells, routeHint: d.routeHint === 1 || d.routeHint === 2 ? d.routeHint : 0,
    cameraSpot, cameraAngle, cameraHint: d.cameraHint === 1 || d.cameraHint === 2 ? d.cameraHint : 0, completedOnce };
}

export function banhLuoiPageIds(progress: BanhLuoiProgress): string[] {
  return ['ban-banh-luoi', ...((progress.completedOnce || progress.keepsakes.includes('vip') || ['wheels', 'photoA', 'routeIntro', 'routePuzzle', 'cameraIntro', 'camera', 'launch', 'photoB', 'memoriesIntro'].includes(progress.phase)) ? ['ban-book-wheels'] : []),
    ...(progress.keepsakes.includes('vip') ? ['ban-photo-vip', 'ban-book-route', 'ban-book-walkback'] : []),
    ...((progress.completedOnce || progress.keepsakes.includes('orbit') || ['cameraIntro','camera','launch','photoB','memoriesIntro'].includes(progress.phase)) ? ['ban-book-camera'] : []),
    ...(progress.keepsakes.includes('orbit') ? ['ban-photo-orbit', 'ban-book-legacy'] : [])];
}

export function replayBanhLuoi(p: BanhLuoiProgress): BanhLuoiProgress {
  return { ...freshBanhLuoi(), completedOnce: p.completedOnce, keepsakes: [...p.keepsakes] };
}
