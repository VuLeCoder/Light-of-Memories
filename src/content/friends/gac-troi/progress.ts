import { finaleDialogueLength } from '../../story/ending/dialogue';
import { endingBookIds, retainEndingBookUnlocks } from '../../book/ending-progress';
import { gacMatchingIntroLength, gacSummaryLength, gacMemories, type GacFriend, type GacSite } from './challenges/matching';
import { gacTroiMeetingLength } from './dialogue';

export const gacTroiPhases = ['meeting', 'matching', 'stories', 't02-intro', 't02-search', 't02-story', 't03-intro', 't03-walk', 't03-dark-intro', 't03-map', 't03-story', 'gac-farewell', 'gac-free', 't04-slope', 't04-rock', 't04-banyan', 'reunion', 'cards-intro', 'cards', 'reflection', 'return-home', 'home', 'story-end'] as const;
export type GacTroiPhase = typeof gacTroiPhases[number];
export const gacTroiFriends = ['surveyor', 'lap-lanh', 'tai-thinh', 'ban-banh-luoi'] as const;
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
  ...endingBookIds] as const;
export interface GacTroiProgress {
  legacyMatchingComplete?: boolean;
  revision: 4; phase: GacTroiPhase; turn: number; matched: Friend[]; seen: Friend[];
  hangArrival?: boolean;
  finale?: { stage: number; turn: number; cards: number };
  shadowWatch?: { views: number[]; position: number; recorded: boolean };
  t02Done: boolean; routeLandmarks: GacLandmark[]; farewellDone: boolean; clues: GacClue[];
  reunionDone: boolean; understoodCards: GacCard[]; completedOnce: boolean; storyCompletedOnce: boolean; bookUnlocks: string[];
}
export function freshGacTroi(): GacTroiProgress {
  return { revision: 4, hangArrival: false, phase: 'meeting', turn: 0, matched: [], seen: [], t02Done: false, routeLandmarks: [], farewellDone: false, clues: [], reunionDone: false, understoodCards: [], completedOnce: false, storyCompletedOnce: false, bookUnlocks: ['gac-book-orbit'] };
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
  't02-intro': 2, 't02-story': 4, 't03-intro': 3, 't03-dark-intro': 3, 't03-story': 5, 'gac-farewell': 4,
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
  if (p.revision !== 4) {
    const old = {...p, revision:4,  clues:[], reunionDone:false, understoodCards:[]};
    if (p.completedOnce === true) Object.assign(old,{phase:'gac-free',routeLandmarks:[...gacRouteLandmarks],farewellDone:true});
    else if (!['meeting','matching','stories','t02-intro','t02-search','t02-story'].includes(String(p.phase))) Object.assign(old,{phase:'t03-intro',turn:0,routeLandmarks:[],farewellDone:false});
    return readGacTroi(old, 19);
  }
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
export function readGacTroi(value: unknown, saveVersion = 20): GacTroiProgress {
  if (!value || typeof value !== 'object') return freshGacTroi();
  const p = value as Record<string, unknown>;
  if (p.revision !== 2 && p.revision !== 3 && p.revision !== 4) return migrateGacTroi(value);
  if (p.revision !== 4) {
    const old = {...p, revision:4,  clues:[], reunionDone:false, understoodCards:[]};
    if (p.completedOnce === true) Object.assign(old,{phase:'gac-free',routeLandmarks:[...gacRouteLandmarks],farewellDone:true});
    else if (!['meeting','matching','stories','t02-intro','t02-search','t02-story'].includes(String(p.phase))) Object.assign(old,{phase:'t03-intro',turn:0,routeLandmarks:[],farewellDone:false});
    return readGacTroi(old, saveVersion);
  }
  const matched = setOf(p.matched, gacTroiFriends);
  const seen = setOf(p.seen, matched);
  // Old later checkpoints stay valid without inventing matches for new friends.
  const legacyMatchingComplete = p.legacyMatchingComplete === true || saveVersion < 20 && seen.includes('surveyor') && seen.includes('lap-lanh') && !['meeting', 'matching'].includes(String(p.phase));
  const t01Done = seen.length === gacTroiFriends.length || legacyMatchingComplete;
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
  if (legacyMatchingComplete && p.completedOnce !== true && seen.length < gacTroiFriends.length) phase = 'matching';
  if (phase === 'matching' && seen.length === gacTroiFriends.length) phase = 'stories';
  if (after('t02-story') && !t02Done) phase = 't02-intro';
  if (after('t03-map') && routeLandmarks.length < 3) phase = 't03-map';
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
  const result: GacTroiProgress = { revision: 4, ...(legacyMatchingComplete ? { legacyMatchingComplete: true } : {}), phase, turn: turnFor(p, phase, matched), matched, seen, t02Done, routeLandmarks, farewellDone, clues, reunionDone, understoodCards,
    completedOnce: p.completedOnce === true, storyCompletedOnce: p.storyCompletedOnce === true, bookUnlocks: setOf(bookUnlocks, gacBookUnlockIds) };
  const watch = p.shadowWatch as Record<string, unknown> | undefined;
  if (watch && Array.isArray(watch.views)) result.shadowWatch = {
    views: [0, 1, 2].filter(i => watch.views instanceof Array && watch.views.includes(i)),
    position: [0, 1, 2].includes(Number(watch.position)) ? Number(watch.position) : 0,
    recorded: watch.recorded === true && routeLandmarks.length === 3,
  };
  const f = p.finale as { stage?: number; turn?: number; cards?: number } | undefined;
  if (f) result.finale = { stage: Math.max(0, Math.min(5, Number(f.stage) || 0)), turn: Math.max(0, Math.min(finaleDialogueLength(Math.max(0, Math.min(5, Number(f.stage) || 0))) - 1, Math.floor(Number(f.turn) || 0))), cards: Math.max(0, Math.min(6, Number(f.cards) || 0)) };
  result.hangArrival = p.hangArrival === true;
  return retainEndingBookUnlocks(result);
}
/** Chapter replay retains earned light, ending access and learned book entries. */
export function replayGacTroi(p: GacTroiProgress): GacTroiProgress {
  return { ...freshGacTroi(), hangArrival: p.hangArrival, completedOnce: p.completedOnce, storyCompletedOnce: p.storyCompletedOnce, bookUnlocks: [...p.bookUnlocks] };
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
