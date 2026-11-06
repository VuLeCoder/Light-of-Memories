import { gacMatchingIntroLength, gacSummaryLength, gacMemories, type GacFriend, type GacSite } from './gac-troi-matching';
import { gacFarewellLength, gacGiftLength } from './gac-troi-finale';
import { gacTroiMeetingLength } from './gac-troi-content';

export const gacTroiPhases = ['meeting', 'matching', 'stories', 'route', 'changes', 'farewell', 'gift', 'finished'] as const;
export type GacTroiPhase = typeof gacTroiPhases[number];
export const gacTroiFriends = ['surveyor', 'ban-banh-luoi'] as const;
type Friend = typeof gacTroiFriends[number];
export interface GacTroiProgress { phase: GacTroiPhase; turn: number; matched: Friend[]; seen: Friend[]; route: Friend[]; changeFound: boolean; completedOnce: boolean }
export function freshGacTroi(): GacTroiProgress { return { phase: 'meeting', turn: 0, matched: [], seen: [], route: [], changeFound: false, completedOnce: false }; }
export function readGacTroi(value: unknown): GacTroiProgress {
  if (!value || typeof value !== 'object') return freshGacTroi();
  const p = value as Record<string, unknown>;
  const matched = gacTroiFriends.filter(id => Array.isArray(p.matched) && p.matched.includes(id));
  const seen = matched.filter(id => Array.isArray(p.seen) && p.seen.includes(id));
  const route: Friend[] = [];
  if (Array.isArray(p.route)) for (const id of p.route) { if (!gacTroiFriends.includes(id as Friend)) continue; if (id !== gacTroiFriends[route.length]) break; route.push(id); }
  const changeFound = p.changeFound === true;
  let phase = gacTroiPhases.includes(p.phase as GacTroiPhase) ? p.phase as GacTroiPhase : 'meeting';
  if (gacTroiPhases.indexOf(phase) > 1 && matched.length < gacTroiFriends.length) phase = 'matching';
  if (gacTroiPhases.indexOf(phase) > 3 && route.length < gacTroiFriends.length) phase = 'route';
  if (gacTroiPhases.indexOf(phase) > 4 && !changeFound) phase = 'changes';
  if (gacTroiPhases.indexOf(phase) >= 2 && seen.length < gacTroiFriends.length) phase = 'matching';
  if (phase === 'matching' && seen.length === gacTroiFriends.length) phase = 'stories';
  // An earned light remains earned during a replay. Current-run prerequisites still gate phases.
  const completedOnce = p.completedOnce === true;
  if ((phase === 'gift' || phase === 'finished') && !completedOnce) phase = 'farewell';
  const maxTurn = phase === 'meeting' ? gacTroiMeetingLength - 1 : phase === 'matching' ? gacMatchingIntroLength : phase === 'stories' ? gacSummaryLength - 1 : phase === 'farewell' ? gacFarewellLength - 1 : phase === 'gift' ? gacGiftLength - 1 : 0;
  const turn = phase === 'matching' && matched.length ? gacMatchingIntroLength
    : phase === p.phase && Number.isInteger(p.turn) && Number(p.turn) >= 0 ? Math.min(Number(p.turn), maxTurn) : 0;
  return { phase, turn, matched, seen, route, changeFound, completedOnce };
}

/** Only a correct new pair changes persistent progress. */
export function matchGacFriend(p: GacTroiProgress, friend: GacFriend, site: GacSite): GacTroiProgress {
  if (p.phase !== 'matching' || p.turn !== gacMatchingIntroLength || p.matched.some(id => !p.seen.includes(id)) || p.matched.includes(friend) || gacMemories.find(m => m.id === friend)?.site !== site) return p;
  return { ...p, matched: gacTroiFriends.filter(id => id === friend || p.matched.includes(id)) };
}
export function finishGacMemory(p: GacTroiProgress, friend: GacFriend): GacTroiProgress {
  if (p.phase !== 'matching' || !p.matched.includes(friend)) return p;
  const seen = gacTroiFriends.filter(id => id === friend || p.seen.includes(id));
  return { ...p, seen, phase: seen.length === gacTroiFriends.length ? 'stories' : 'matching', turn: seen.length === gacTroiFriends.length ? 0 : gacMatchingIntroLength };
}

export function connectGacRoute(p: GacTroiProgress, friend: Friend): GacTroiProgress {
  if (p.phase !== 'route' || friend !== gacTroiFriends[p.route.length]) return p;
  return { ...p, route: [...p.route, friend] };
}
export function findGacChange(p: GacTroiProgress, region: number): GacTroiProgress {
  if (p.phase !== 'changes' || region !== 4) return p;
  return { ...p, changeFound: true };
}
export function receiveGacLight(p: GacTroiProgress): GacTroiProgress {
  if (p.phase !== 'farewell' || p.matched.length !== gacTroiFriends.length || p.seen.length !== gacTroiFriends.length || p.route.length !== gacTroiFriends.length || !p.changeFound) return p;
  return { ...p, phase: 'gift', turn: 0, completedOnce: true };
}
export function replayGacTroi(p: GacTroiProgress): GacTroiProgress {
  return { ...freshGacTroi(), completedOnce: p.completedOnce };
}
