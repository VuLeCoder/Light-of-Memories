import { gacTroiMeetingLength } from './gac-troi-content';

export const gacTroiPhases = ['meeting', 'matching', 'stories', 'route', 'changes', 'farewell', 'gift', 'finished'] as const;
export type GacTroiPhase = typeof gacTroiPhases[number];
export const gacTroiFriends = ['surveyor', 'lap-lanh', 'tai-thinh', 'ban-banh-luoi'] as const;
type Friend = typeof gacTroiFriends[number];
export interface GacTroiProgress { phase: GacTroiPhase; turn: number; matched: Friend[]; route: Friend[]; changeFound: boolean; completedOnce: boolean }
export function freshGacTroi(): GacTroiProgress { return { phase: 'meeting', turn: 0, matched: [], route: [], changeFound: false, completedOnce: false }; }
export function readGacTroi(value: unknown): GacTroiProgress {
  if (!value || typeof value !== 'object') return freshGacTroi();
  const p = value as Record<string, unknown>;
  const matched = gacTroiFriends.filter(id => Array.isArray(p.matched) && p.matched.includes(id));
  const route: Friend[] = [];
  if (Array.isArray(p.route)) for (const id of p.route) { if (id !== gacTroiFriends[route.length]) break; route.push(id); }
  const changeFound = p.changeFound === true;
  let phase = gacTroiPhases.includes(p.phase as GacTroiPhase) ? p.phase as GacTroiPhase : 'meeting';
  if (gacTroiPhases.indexOf(phase) > 1 && matched.length < 4) phase = 'matching';
  if (gacTroiPhases.indexOf(phase) > 3 && route.length < 4) phase = 'route';
  if (gacTroiPhases.indexOf(phase) > 4 && !changeFound) phase = 'changes';
  const completedOnce = p.completedOnce === true && matched.length === 4 && route.length === 4 && changeFound;
  if (phase === 'finished' && !completedOnce) phase = 'gift';
  return { phase, turn: phase === p.phase && Number.isInteger(p.turn) && Number(p.turn) >= 0 ? Math.min(Number(p.turn), phase === 'meeting' ? gacTroiMeetingLength - 1 : 100) : 0, matched, route, changeFound, completedOnce };
}
