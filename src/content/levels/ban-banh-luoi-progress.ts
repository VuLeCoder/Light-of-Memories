import { readGuide, type GuideCheckpoint } from './ban-banh-luoi-guide';
import { readConfirmedRoute, readRouteCells, type ConfirmedBanhLuoiRoute, type RouteCell } from './ban-banh-luoi-route';
import { banBanhLuoiRoute } from './ban-banh-luoi-models';
import { banBanhLuoiScript } from './ban-banh-luoi-content';

export const banhLuoiPhases = ['route', 'approach', 'meeting', 'wheels', 'photoA', 'routeIntro', 'routePuzzle', 'guideIntro', 'guiding', 'photoB', 'memoriesIntro', 'recallA', 'recallB', 'farewell', 'gift', 'finished'] as const;
export type BanhLuoiPhase = typeof banhLuoiPhases[number];
export const wheelChoices = ['rubber', 'mesh', 'stone'] as const;
export type WheelChoice = typeof wheelChoices[number];
export interface BanhLuoiProgress {
  phase: BanhLuoiPhase;
  turn: number;
  wheelChoice: WheelChoice | null;
  keepsakes: ('vip' | 'orbit')[];
  guideCheckpoint: GuideCheckpoint | null;
  guideHint: 0 | 1 | 2;
  guideLegacyPassed: boolean;
  routeCells: RouteCell[];
  confirmedRoute: ConfirmedBanhLuoiRoute | null;
  routeHint: 0 | 1 | 2;
  completedOnce: boolean;
}
export const freshBanhLuoi = (): BanhLuoiProgress => ({ phase: 'route', turn: 0, wheelChoice: null, keepsakes: [], routeCells: [banBanhLuoiRoute.lm], confirmedRoute: null, routeHint: 0, guideCheckpoint: null, guideHint: 0, guideLegacyPassed: false, completedOnce: false });

/** A damaged fourth chapter never resets the three earlier friends. */
export function readBanhLuoi(value: unknown, version = 13): BanhLuoiProgress {
  if (!value || typeof value !== 'object') return freshBanhLuoi();
  const d = value as Record<string, unknown>;
  const keepsakes = (['vip', 'orbit'] as const).filter(id => Array.isArray(d.keepsakes) && d.keepsakes.includes(id));
  const sourcePhase = d.phase;
  const migratedPhase = version <= 11 && ['cameraIntro', 'camera'].includes(String(sourcePhase)) ? 'guideIntro' : sourcePhase === 'launch' ? 'photoB' : sourcePhase;
  if (!banhLuoiPhases.includes(migratedPhase as BanhLuoiPhase)) return { ...freshBanhLuoi(), completedOnce: d.completedOnce === true, keepsakes };
  let phase = migratedPhase as BanhLuoiPhase;
  const wheelChoice = wheelChoices.includes(d.wheelChoice as WheelChoice) ? d.wheelChoice as WheelChoice : null;
  const ending = ['memoriesIntro', 'recallA', 'recallB', 'farewell', 'gift', 'finished'];
  const completedOnce = d.completedOnce === true;
  const afterPhotoA = ['routeIntro', 'routePuzzle', 'guideIntro', 'guiding', 'photoB', ...ending];
  const afterRoute = ['guideIntro', 'guiding', 'photoB', ...ending];
  const afterGuide = ['photoB', ...ending];
  if (['photoA', ...afterPhotoA].includes(phase) && wheelChoice !== 'mesh') phase = 'wheels';
  const kept = keepsakes.includes('vip');
  if (afterPhotoA.includes(phase) && !kept) phase = 'photoA';
  const routeCells = readRouteCells(d.routeCells);
  // Older saves had only a draft. Migrate it only after the player passed T02,
  // and validate the original array so a damaged suffix cannot confirm a trip.
  const confirmedRoute = version <= 10 && afterRoute.includes(phase)
    ? readConfirmedRoute({ modelVersion: 1, cells: d.routeCells })
    : readConfirmedRoute(d.confirmedRoute);
  const guideLegacyPassed = (version <= 12 ? (sourcePhase === 'launch' || afterGuide.includes(String(sourcePhase))) && wheelChoice === 'mesh' && !!kept : d.guideLegacyPassed === true);
  let guideCheckpoint = version >= 13 ? readGuide(d.guideCheckpoint, confirmedRoute) : null;
  if (afterRoute.includes(phase) && !confirmedRoute && !(guideLegacyPassed && afterGuide.includes(phase))) phase = 'routePuzzle';
  if (version <= 12 && ['guideIntro', 'guiding'].includes(phase)) phase = 'guideIntro';
  if (phase === 'guiding' && (!guideCheckpoint || guideCheckpoint.stage === 'done')) { phase = 'guideIntro'; guideCheckpoint = null; }
  if (afterGuide.includes(phase) && !guideLegacyPassed && guideCheckpoint?.stage !== 'done') { phase = confirmedRoute ? 'guideIntro' : 'routePuzzle'; guideCheckpoint = null; }
  if (phase === 'guideIntro' || phase === 'routePuzzle' && guideCheckpoint?.stage === 'done') guideCheckpoint = null;
  // Collected photos survive route recovery, including its subsequent reloads.
  // They never bypass this run’s route/guide prerequisites or award completion.
  const orbit = keepsakes.includes('orbit');
  if (ending.includes(phase) && !orbit) phase = 'photoB';
  if (phase === 'finished' && !completedOnce) phase = 'gift';
  const resetGuide = migratedPhase !== phase && phase === 'guideIntro' || version <= 12 && ['cameraIntro', 'camera', 'guideIntro', 'guiding'].includes(String(sourcePhase));
  const maxTurn = phase === 'route' || phase === 'meeting' || phase === 'routeIntro' || phase === 'guideIntro' || phase === 'memoriesIntro' || phase === 'farewell' ? banBanhLuoiScript[phase].length - 1 : phase === 'photoB' ? 1 : phase === 'gift' && completedOnce ? banBanhLuoiScript.giftAfter.length : 0;
  return { phase, turn: phase === 'gift' && completedOnce ? Math.max(1, Math.min(maxTurn, Number.isInteger(d.turn) ? d.turn as number : 1)) : !resetGuide && sourcePhase !== 'launch' && Number.isInteger(d.turn) ? Math.max(0, Math.min(maxTurn, d.turn as number)) : 0,
    wheelChoice, keepsakes, routeCells, confirmedRoute, routeHint: d.routeHint === 1 || d.routeHint === 2 ? d.routeHint : 0,
    guideCheckpoint, guideLegacyPassed, guideHint: !resetGuide && (d.guideHint === 1 || d.guideHint === 2) ? d.guideHint : 0, completedOnce };
}

export function banhLuoiPageIds(progress: BanhLuoiProgress): string[] {
  return ['ban-banh-luoi', ...((progress.completedOnce || progress.keepsakes.includes('vip') || ['wheels', 'photoA', 'routeIntro', 'routePuzzle', 'guideIntro', 'guiding', 'photoB', 'memoriesIntro'].includes(progress.phase)) ? ['ban-book-wheels'] : []),
    ...(progress.keepsakes.includes('vip') ? ['ban-photo-vip', 'ban-book-route', 'ban-book-walkback', 'ban-book-samples'] : []),
    ...((progress.completedOnce || progress.keepsakes.includes('orbit') || ['photoB','memoriesIntro'].includes(progress.phase)) ? ['ban-book-camera'] : []),
    ...(progress.keepsakes.includes('orbit') ? ['ban-photo-orbit', 'ban-book-legacy'] : [])];
}

export function replayBanhLuoi(p: BanhLuoiProgress): BanhLuoiProgress {
  return { ...freshBanhLuoi(), completedOnce: p.completedOnce, keepsakes: [...p.keepsakes] };
}
