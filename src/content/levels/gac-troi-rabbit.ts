import type { GacTroiProgress } from './gac-troi-progress';

/** GT-R2 interactions and GT-R3 story screens are connected in the released app. */
export const gacRabbitReleased: boolean = true;
export const rabbitStops = ['slope', 'rock', 'banyan'] as const;
export type RabbitStop = typeof rabbitStops[number];
export const rabbitStages = ['real', 'bridge', ...rabbitStops, 'reunion', 'farewell', 'free'] as const;
export type RabbitStage = typeof rabbitStages[number];
export interface GacRabbitJourney {
  gifts?: RabbitStop[];
  guidedStops?: RabbitStop[];
  active: boolean;
  stage: RabbitStage;
  turn: number;
  /** Completed stops form a prefix. The current stop is saved after every success. */
  completedStops: number;
  rabbitFound: boolean;
  starsAwake: number;
  reunionDone: boolean;
  farewellDone: boolean;
}
export const rabbitStarCount = (stop: RabbitStop): number => stop === 'rock' ? 2 : 1;
export const rabbitDialogueLengths = { real: 3, bridge: 3, reunion: 4, farewell: 5 } as const;
export function freshGacRabbit(): GacRabbitJourney {
  return { active: false, stage: 'real', turn: 0, completedStops: 0, rabbitFound: false, starsAwake: 0, reunionDone: false, farewellDone: false };
}
/** Keep the playable legacy cursor untouched until the release gate opens. */
export function migrateGacRabbit(p: Pick<GacTroiProgress, 'phase' | 'reunionDone' | 'farewellDone'>): GacRabbitJourney {
  const result = freshGacRabbit();
  if (p.reunionDone) return { ...result, stage: 'free', completedStops: 3, rabbitFound: true, starsAwake: 1, reunionDone: true, farewellDone: true };
  if (p.phase === 'reunion') return { ...result, stage: 'reunion', completedStops: 3, rabbitFound: true, starsAwake: 1 };
  const index = ['t04-slope', 't04-rock', 't04-banyan'].indexOf(p.phase);
  return index < 0 ? result : { ...result, stage: rabbitStops[index], completedStops: index };
}
export function readGacRabbit(value: unknown): GacRabbitJourney {
  if (!value || typeof value !== 'object') return freshGacRabbit();
  const p = value as Record<string, unknown>;
  const count = typeof p.completedStops === 'number' && Number.isInteger(p.completedStops) ? Math.max(0, Math.min(3, p.completedStops)) : 0;
  let stage: RabbitStage = rabbitStages.includes(p.stage as RabbitStage) ? p.stage as RabbitStage : 'real';
  const stopIndex = rabbitStops.indexOf(stage as RabbitStop);
  if (stopIndex >= 0 && stopIndex !== count || ['reunion', 'farewell', 'free'].includes(stage) && count < 3) stage = rabbitStops[count] ?? 'reunion';
  if (stage === 'farewell' && p.reunionDone !== true) stage = 'reunion';
  if (stage === 'free' && (p.reunionDone !== true || p.farewellDone !== true)) stage = p.reunionDone === true ? 'farewell' : 'reunion';
  const completedStops = ['real', 'bridge'].includes(stage) ? 0 : count;
  const rabbitFound = !['real', 'bridge'].includes(stage) && p.rabbitFound === true;
  const maxStars = rabbitStarCount(stage === 'rock' ? 'rock' : 'slope');
  const starsAwake = rabbitFound && Number.isInteger(p.starsAwake) ? Math.max(0, Math.min(maxStars, Number(p.starsAwake))) : 0;
  const length = rabbitDialogueLengths[stage as keyof typeof rabbitDialogueLengths] ?? 1;
  const turn = Number.isInteger(p.turn) ? Math.max(0, Math.min(length - 1, Number(p.turn))) : 0;
  return { ...(Array.isArray(p.gifts) ? { gifts: rabbitStops.filter(s => p.gifts instanceof Array && p.gifts.includes(s)) } : {}), ...(Array.isArray(p.guidedStops) ? { guidedStops: rabbitStops.filter(s => p.guidedStops instanceof Array && p.guidedStops.includes(s)) } : {}), active: p.active === true, stage, turn, completedStops, rabbitFound, starsAwake,
    reunionDone: ['farewell', 'free'].includes(stage) && p.reunionDone === true,
    farewellDone: stage === 'free' && p.farewellDone === true };
}
export function rabbitObjective(j: GacRabbitJourney): 'find' | 'wake-1' | 'wake-2' | 'ready' | null {
  if (!rabbitStops.includes(j.stage as RabbitStop)) return null;
  return !j.rabbitFound ? 'find' : j.starsAwake === rabbitStarCount(j.stage as RabbitStop) ? 'ready' : j.starsAwake === 0 ? 'wake-1' : 'wake-2';
}
/** The renderer must not activate a journey until every required screen ships. */
export function startGacRabbitJourney(p: GacTroiProgress): GacTroiProgress {
  if (!gacRabbitReleased || !p.t02Done || p.rabbitJourney?.active) return p;
  const journey = p.rabbitJourney ?? { ...freshGacRabbit(), stage: 'bridge' as const };
  return { ...p, rabbitJourney: { ...journey, active: true }, bookUnlocks: p.bookUnlocks.includes('gac-book-light') ? p.bookUnlocks : [...p.bookUnlocks, 'gac-book-light'] };
}
export type RabbitAction =
  | { type: 'guide' | 'gift' | 'peek'; stop: RabbitStop }
  | { type: 'find'; stop: RabbitStop }
  | { type: 'wake'; stop: RabbitStop; star: number }
  | { type: 'next'; stage: RabbitStage }
  | { type: 'dialogue'; stage: keyof typeof rabbitDialogueLengths; turn: number };
/** Receipts identify the expected target/line, so stale or repeated events are inert. */
export function applyGacRabbitAction(p: GacTroiProgress, action: RabbitAction): GacTroiProgress {
  const j = p.rabbitJourney;
  if (!j?.active || !p.t02Done) return p;
  let next = j;
  if (action.type === 'guide' && j.stage === action.stop && !j.guidedStops?.includes(action.stop)) next = { ...j, guidedStops: [...(j.guidedStops ?? []), action.stop] };
  if (action.type === 'gift' && j.stage === action.stop && !j.gifts?.includes(action.stop)) next = { ...j, gifts: [...(j.gifts ?? []), action.stop] };
  if (action.type === 'peek' && j.stage === action.stop && !j.rabbitFound && j.guidedStops?.includes(action.stop)) next = { ...j, rabbitFound: true, starsAwake: rabbitStarCount(action.stop) };
  let completedOnce = p.completedOnce;
  let books = p.bookUnlocks;
  if (action.type === 'find' && j.stage === action.stop && rabbitObjective(j) === 'find') next = { ...j, rabbitFound: true };
  if (action.type === 'wake' && j.stage === action.stop && j.rabbitFound && action.star === j.starsAwake + 1 && action.star <= rabbitStarCount(action.stop)) next = { ...j, starsAwake: action.star };
  if (action.type === 'next' && action.stage === j.stage && rabbitObjective(j) === 'ready') {
    const count = j.completedStops + 1;
    next = { ...j, completedStops: count, stage: rabbitStops[count] ?? 'reunion', turn: 0, rabbitFound: count === 3, starsAwake: count === 3 ? 1 : 0 };
  }
  if (action.type === 'dialogue' && j.stage === action.stage && action.turn === j.turn) {
    const length = rabbitDialogueLengths[action.stage];
    if (j.turn < length - 1) {
      next = { ...j, turn: j.turn + 1 };
      if (j.stage === 'farewell' && j.turn === 2) completedOnce = true;
    } else {
      const stage = ({ real: 'bridge', bridge: 'slope', reunion: 'free', farewell: 'free' } as const)[action.stage];
      next = { ...j, stage, turn: 0, reunionDone: j.reunionDone || j.stage === 'reunion', farewellDone: j.stage === 'farewell' || j.stage === 'reunion' };
      if (stage === 'slope' && !books.includes('gac-book-map')) books = [...books, 'gac-book-map'];
    }
  }
  return next === j ? p : { ...p, rabbitJourney: next, completedOnce, bookUnlocks: books };
}
