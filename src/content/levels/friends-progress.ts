import type { FriendId } from './friends';

export const orderedFriends: readonly FriendId[] = ['rover', 'mirror', 'flag', 'footprint'];
export interface FriendProgress {
  /** 0: meeting, 1–3: challenges, 4: ending, 5: lit/completed. */
  step: number;
  answers: number[];
  keepsake: number | null;
}
export interface FriendsProgress {
  levels: Record<FriendId, FriendProgress>;
  finale: { seen: boolean; choice: string | null };
}
export const freshFriend = (): FriendProgress => ({ step: 0, answers: [], keepsake: null });
export const freshFriends = (): FriendsProgress => ({ levels: { rover: freshFriend(), mirror: freshFriend(), flag: freshFriend(), footprint: freshFriend() }, finale: { seen: false, choice: null } });
export function readFriends(value: unknown, surveyorDone: boolean): FriendsProgress {
  const result = freshFriends();
  if (!surveyorDone || !value || typeof value !== 'object') return result;
  const data = value as Partial<FriendsProgress>;
  let unlocked = true;
  for (const id of orderedFriends) {
    const p = data.levels?.[id];
    if (!unlocked || !p || !Number.isInteger(p.step) || p.step < 0 || p.step > 5) { unlocked = false; continue; }
    result.levels[id] = {
      step: p.step,
      answers: normalizeAnswers(id, p.step, p.answers),
      keepsake: Number.isInteger(p.keepsake) && p.keepsake! >= 0 && p.keepsake! < 3 ? p.keepsake : null,
    };
    unlocked = p.step === 5;
  }
  if (unlocked && data.finale && typeof data.finale === 'object') result.finale = {
    seen: data.finale.seen === true,
    choice: ['surveyor', ...orderedFriends].includes(data.finale.choice ?? '') ? data.finale.choice : null,
  };
  return result;
}
export const isFriendUnlocked = (id: FriendId, surveyorDone: boolean, progress: FriendsProgress) => surveyorDone && orderedFriends.slice(0, orderedFriends.indexOf(id)).every(previous => progress.levels[previous].step === 5);
export const starCount = (surveyorDone: boolean, progress: FriendsProgress) => {
  let count = surveyorDone ? 1 : 0;
  if (!surveyorDone) return count;
  for (const id of orderedFriends) { if (progress.levels[id].step !== 5) break; count++; }
  return count;
};

export const routeStart = 15;
export const routeEnd = 4;
export const routeRocks = [1, 6, 8, 11, 13, 18];
export function canStep(route: number[], cell: number) {
  const from = route.at(-1) ?? routeStart;
  return Number.isInteger(cell) && cell >= 0 && cell < 20 && !routeRocks.includes(cell) && !route.includes(cell) &&
    Math.abs(from % 5 - cell % 5) + Math.abs(Math.floor(from / 5) - Math.floor(cell / 5)) === 1;
}
export const isCompleteOrder = (answers: number[]) => answers.length === 3 && answers.every((value, index) => value === index);
export const isCompletePuzzle = (answers: number[]) => answers.length === 6 && answers.every((value, index) => value === index);
export const footDirections = [2, 0, 2, 1]; // right, up, right, left; the final toe shows the next turn.

/** Recover valid partial work without leaving a corrupted save in an unwinnable state. */
function normalizeAnswers(id: FriendId, step: number, value: unknown): number[] {
  const answers = Array.isArray(value) ? value.filter(n => Number.isInteger(n)).slice(0, 20) as number[] : [];
  if (step < 1 || step > 3) return [];
  if (id === 'rover' && step === 2) {
    if (answers[0] !== routeStart) return [];
    const route = [routeStart];
    for (const cell of answers.slice(1)) { if (!canStep(route, cell)) break; route.push(cell); }
    return route;
  }
  if (id === 'flag' && step === 2) {
    const used = new Set<number>();
    return Array.from({length: 6}, (_, i) => {
      const n = Array.isArray(value) ? value[i] : -1;
      if (!Number.isInteger(n) || n < 0 || n > 5 || used.has(n)) return -1;
      used.add(n); return n;
    });
  }
  if ((id === 'rover' && step === 3) || (id === 'footprint' && step === 2)) {
    const expected = id === 'rover' ? [0, 1, 2] : footDirections;
    const prefix: number[] = [];
    for (let i = 0; i < expected.length; i++) { if (answers[i] !== expected[i]) break; prefix.push(answers[i]); }
    return prefix;
  }
  const unique = [...new Set(answers.filter(n => n >= 0 && n < 3))];
  return step === 3 && id !== 'flag' ? unique : unique.slice(0, 1);
}
