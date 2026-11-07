import { migrateGacRabbit, readGacRabbit, type GacRabbitJourney } from './gac-troi-rabbit';
import { gacMatchingIntroLength, gacSummaryLength, gacMemories, type GacFriend, type GacSite } from './gac-troi-matching';
import { gacTroiMeetingLength } from './gac-troi-content';

export const gacTroiPhases = ['meeting', 'matching', 'stories', 't02-intro', 't02-search', 't02-story', 't03-intro', 't03-walk', 't03-dark-intro', 't03-map', 't03-story', 'gac-farewell', 'gac-free', 't04-slope', 't04-rock', 't04-banyan', 'reunion', 'cards-intro', 'cards', 'reflection', 'return-home', 'home', 'story-end'] as const;
export type GacTroiPhase = typeof gacTroiPhases[number];
export const gacTroiFriends = ['surveyor', 'lap-lanh'] as const;
export const gacRouteLandmarks = ['low-slope', 'split-rock', 'banyan-shadow'] as const;
export const gacClues = ['slope', 'lantern', 'call'] as const;
export const gacCards = ['card-sparkle', 'card-gac-troi', 'card-surveyor', 'card-footprint', 'card-wrapper', 'card-tie'] as const;
type Friend = typeof gacTroiFriends[number];
export type GacLandmark = typeof gacRouteLandmarks[number];
export type GacClue = typeof gacClues[number];
export type GacCard = typeof gacCards[number];
// Stable IDs from M0. Future entries are persisted now, exposed by the book only
// when their catalog content ships. Unlocking never changes the current page.
export const gacBookUnlockIds = ['gac-book-orbit', 'gac-book-sites', ...gacTroiFriends.map(id => `gac-memory-${id}`),
  'gac-book-impact', 'gac-book-impact.hint', 'gac-book-impact.story', 'gac-book-light', 'gac-book-light.hint', 'gac-book-map',
  'ending-book-cards', ...gacCards.map(id => `ending-book-cards.${id}`), 'ending-book-home'] as const;
export interface GacTroiProgress {
  revision: 3; rabbitJourney: GacRabbitJourney | null; phase: GacTroiPhase; turn: number; matched: Friend[]; seen: Friend[];
  t02Done: boolean; routeLandmarks: GacLandmark[]; farewellDone: boolean; clues: GacClue[];
  reunionDone: boolean; understoodCards: GacCard[]; completedOnce: boolean; storyCompletedOnce: boolean; bookUnlocks: string[];
}
export function freshGacTroi(): GacTroiProgress {
  return { revision: 3, rabbitJourney: null, phase: 'meeting', turn: 0, matched: [], seen: [], t02Done: false, routeLandmarks: [], farewellDone: false, clues: [], reunionDone: false, understoodCards: [], completedOnce: false, storyCompletedOnce: false, bookUnlocks: ['gac-book-orbit'] };
}
const setOf = <T extends string>(value: unknown, ids: readonly T[]): T[] => ids.filter(id => Array.isArray(value) && value.includes(id));
function prefixOf<T extends string>(value: unknown, ids: readonly T[]): T[] {
  const result: T[] = [];
  if (Array.isArray(value)) for (const id of value) {
    if (!ids.includes(id) || result.includes(id)) continue;
    if (id !== ids[result.length]) break;
    result.push(id);
  }
  return result;
}
// Number of persisted dialogue turns, matching the finalized M0 script.
export const gacDialogueLengths: Partial<Record<GacTroiPhase, number>> = {
  meeting: gacTroiMeetingLength, matching: gacMatchingIntroLength + 1, stories: gacSummaryLength,
  't02-intro': 2, 't02-story': 4, 't03-intro': 3, 't03-dark-intro': 3, 't03-story': 2, 'gac-farewell': 4,
  reunion: 5, 'cards-intro': 1, reflection: 3, 'return-home': 1, home: 4,
};
function turnFor(p: Record<string, unknown>, phase: GacTroiPhase, matched: Friend[]): number {
  if (phase === 'matching' && matched.length) return gacMatchingIntroLength;
  return phase === p.phase && Number.isInteger(p.turn) && Number(p.turn) >= 0
    ? Math.min(Number(p.turn), (gacDialogueLengths[phase] ?? 1) - 1) : 0;
}
function t01Books(matched: Friend[], phase: GacTroiPhase): string[] {
  return ['gac-book-orbit', ...(phase !== 'meeting' || matched.length ? ['gac-book-sites'] : []), ...matched.map(id => `gac-memory-${id}`)];
}
/** Read raw legacy data before any old reader can discard the original phase. */
export function migrateGacTroi(value: unknown): GacTroiProgress {
  if (!value || typeof value !== 'object') return freshGacTroi();
  const p = value as Record<string, unknown>;
  const matched = setOf(p.matched, gacTroiFriends);
  const seen = setOf(p.seen, matched);
  // Preserve the v17 rule: the first two valid route IDs must be in this order.
  const route = Array.isArray(p.route) ? p.route.filter(id => gacTroiFriends.includes(id as Friend)) : [];
  const completedOnce = p.completedOnce === true && matched.length === 2 && p.changeFound === true
    && route[0] === 'surveyor' && route[1] === 'lap-lanh';
  let phase: GacTroiPhase = p.phase === 'meeting' && matched.length === 0 ? 'meeting' : 'matching';
  if (matched.length === 2 && seen.length === 2) phase = p.phase === 'stories' || p.phase === 'matching' ? 'stories'
    : ['route', 'changes', 'farewell', 'gift', 'finished'].includes(String(p.phase)) ? 't02-intro' : phase;
  return { ...freshGacTroi(), phase, turn: turnFor(p, phase, matched), matched, seen, completedOnce, bookUnlocks: t01Books(matched, phase) };
}
export function readGacTroi(value: unknown): GacTroiProgress {
  if (!value || typeof value !== 'object') return freshGacTroi();
  const p = value as Record<string, unknown>;
  if (p.revision !== 2 && p.revision !== 3) return migrateGacTroi(value);
  const matched = setOf(p.matched, gacTroiFriends);
  const seen = setOf(p.seen, matched);
  const t01Done = seen.length === 2;
  const t02Done = t01Done && p.t02Done === true;
  const routeLandmarks = t02Done ? prefixOf(p.routeLandmarks, gacRouteLandmarks) : [];
  const farewellDone = routeLandmarks.length === 3 && p.farewellDone === true;
  const clues = farewellDone ? prefixOf(p.clues, gacClues) : [];
  const reunionDone = clues.length === 3 && p.reunionDone === true;
  const understoodCards = reunionDone ? setOf(p.understoodCards, gacCards) : [];
  let phase: GacTroiPhase = gacTroiPhases.includes(p.phase as GacTroiPhase) ? p.phase as GacTroiPhase : 'meeting';
  const after = (limit: GacTroiPhase) => gacTroiPhases.indexOf(phase) > gacTroiPhases.indexOf(limit);
  if (phase === 'meeting' && matched.length) phase = 'matching';
  if (after('matching') && !t01Done) phase = 'matching';
  if (phase === 'matching' && t01Done) phase = 'stories';
  if (after('t02-story') && !t02Done) phase = 't02-intro';
  if (after('t03-map') && routeLandmarks.length < 3) phase = 't03-map';
  if (phase === 't03-map' && routeLandmarks.length === 3) phase = 't03-story';
  if (after('gac-farewell') && !farewellDone) phase = 'gac-farewell';
  if (after('t04-slope') && clues.length < 1) phase = 't04-slope';
  if (after('t04-rock') && clues.length < 2) phase = 't04-rock';
  if (after('t04-banyan') && clues.length < 3) phase = 't04-banyan';
  if (phase === 't04-slope' && clues.length >= 1) phase = 't04-rock';
  if (phase === 't04-rock' && clues.length >= 2) phase = 't04-banyan';
  if (phase === 't04-banyan' && clues.length === 3) phase = 'reunion';
  if (after('reunion') && !reunionDone) phase = 'reunion';
  if (after('cards') && understoodCards.length < 6) phase = 'cards';
  if (phase === 'story-end' && p.storyCompletedOnce !== true) phase = 'home';
  const bookUnlocks = setOf(p.bookUnlocks, gacBookUnlockIds);
  for (const id of t01Books(matched, phase)) if (!bookUnlocks.includes(id)) bookUnlocks.push(id);
  if (t01Done && gacTroiPhases.indexOf(phase) >= gacTroiPhases.indexOf('t02-search') && !bookUnlocks.includes('gac-book-impact')) bookUnlocks.push('gac-book-impact');
  if (t02Done && !bookUnlocks.includes('gac-book-impact.story')) bookUnlocks.push('gac-book-impact.story');
  if (t02Done && gacTroiPhases.indexOf(phase) >= gacTroiPhases.indexOf('t03-map') && !bookUnlocks.includes('gac-book-light')) bookUnlocks.push('gac-book-light');
  if (routeLandmarks.length === 3 && gacTroiPhases.indexOf(phase) >= gacTroiPhases.indexOf('gac-farewell') && !bookUnlocks.includes('gac-book-map')) bookUnlocks.push('gac-book-map');
  const result: GacTroiProgress = { revision: 3, rabbitJourney: null, phase, turn: turnFor(p, phase, matched), matched, seen, t02Done, routeLandmarks, farewellDone, clues, reunionDone, understoodCards,
    completedOnce: p.completedOnce === true, storyCompletedOnce: p.storyCompletedOnce === true, bookUnlocks: setOf(bookUnlocks, gacBookUnlockIds) };
  result.rabbitJourney = p.revision === 2 ? migrateGacRabbit(result) : p.rabbitJourney ? readGacRabbit(p.rabbitJourney) : null;
  return result;
}
/** Chapter replay retains earned light, ending access and learned book entries. */
export function replayGacTroi(p: GacTroiProgress): GacTroiProgress {
  return { ...freshGacTroi(), completedOnce: p.completedOnce, storyCompletedOnce: p.storyCompletedOnce, bookUnlocks: [...p.bookUnlocks] };
}
export function unlockGacBook(p: GacTroiProgress, id: string): GacTroiProgress {
  return !gacBookUnlockIds.includes(id) || p.bookUnlocks.includes(id) ? p : { ...p, bookUnlocks: setOf([...p.bookUnlocks, id], gacBookUnlockIds) };
}
/** Only a correct new pair changes persistent progress. */
export function matchGacFriend(p: GacTroiProgress, friend: GacFriend, site: GacSite): GacTroiProgress {
  if (p.phase !== 'matching' || p.turn !== gacMatchingIntroLength || p.matched.some(id => !p.seen.includes(id)) || p.matched.includes(friend) || gacMemories.find(m => m.id === friend)?.site !== site) return p;
  return unlockGacBook({ ...p, matched: gacTroiFriends.filter(id => id === friend || p.matched.includes(id)) }, `gac-memory-${friend}`);
}
export function finishGacMemory(p: GacTroiProgress, friend: GacFriend): GacTroiProgress {
  if (p.phase !== 'matching' || !p.matched.includes(friend)) return p;
  const seen = gacTroiFriends.filter(id => id === friend || p.seen.includes(id));
  return { ...p, seen, phase: seen.length === gacTroiFriends.length ? 'stories' : 'matching', turn: seen.length === gacTroiFriends.length ? 0 : gacMatchingIntroLength };
}
