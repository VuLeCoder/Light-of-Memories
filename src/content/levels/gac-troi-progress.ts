import { gacMatchingIntroLength, gacSummaryLength, gacMemories, type GacFriend, type GacSite } from './gac-troi-matching';
import { gacTroiMeetingLength } from './gac-troi-content';

export const gacTroiPhases = ['meeting', 'matching', 'stories', 'route', 'changes', 'farewell', 'gift', 'finished'] as const;
export type GacTroiPhase = typeof gacTroiPhases[number];
export const gacTroiFriends = ['surveyor', 'lap-lanh'] as const;
type Friend = typeof gacTroiFriends[number];
export interface GacTroiProgress { phase: GacTroiPhase; turn: number; matched: Friend[]; seen: Friend[]; route: Friend[]; changeFound: boolean; completedOnce: boolean }
export function freshGacTroi(): GacTroiProgress { return { phase: 'meeting', turn: 0, matched: [], seen: [], route: [], changeFound: false, completedOnce: false }; }
export function readGacTroi(value: unknown): GacTroiProgress {
  if (!value || typeof value !== 'object') return freshGacTroi();
  const p = value as Record<string, unknown>;
  const matched = gacTroiFriends.filter(id => Array.isArray(p.matched) && p.matched.includes(id));
  const seen = matched.filter(id => Array.isArray(p.seen) && p.seen.includes(id));
  const route: Friend[] = [];
  if (Array.isArray(p.route)) for (const id of p.route.filter(id => gacTroiFriends.includes(id as Friend))) { if (id !== gacTroiFriends[route.length]) break; route.push(id); }
  const changeFound = p.changeFound === true;
  let phase = gacTroiPhases.includes(p.phase as GacTroiPhase) ? p.phase as GacTroiPhase : 'meeting';
  if (gacTroiPhases.indexOf(phase) > 1 && matched.length < gacTroiFriends.length) phase = 'matching';
  if (gacTroiPhases.indexOf(phase) > 3 && route.length < gacTroiFriends.length) phase = 'route';
  if (gacTroiPhases.indexOf(phase) > 4 && !changeFound) phase = 'changes';
  if (phase === 'stories' && seen.length < gacTroiFriends.length) phase = 'matching';
  if (phase === 'matching' && seen.length === gacTroiFriends.length) phase = 'stories';
  const completedOnce = p.completedOnce === true && matched.length === gacTroiFriends.length && route.length === gacTroiFriends.length && changeFound;
  if (phase === 'finished' && !completedOnce) phase = 'gift';
  const maxTurn = phase === 'meeting' ? gacTroiMeetingLength - 1 : phase === 'matching' ? gacMatchingIntroLength : phase === 'stories' ? gacSummaryLength - 1 : 0;
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
