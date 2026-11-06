import { gacTroi } from './gac-troi';
import { banBanhLuoi } from './ban-banh-luoi';
import { taiThinh } from './tai-thinh';
import { lapLanh } from './lap-lanh';
import { surveyor } from './surveyor';
import type { LevelDefinition } from './types';

// Add implemented levels here. IDs are persisted: keep them stable.
export const levels = [surveyor, lapLanh, taiThinh, banBanhLuoi, gacTroi] as const satisfies readonly LevelDefinition[];
export type LevelId = (typeof levels)[number]['id'];

// The main story uses three encounters. Keep the legacy registry above for saved data and reading assets.
export const journeyStops: readonly (LevelId | null)[] = ['surveyor', 'ban-banh-luoi', 'gac-troi'];

export function journeyStatus(id: LevelId | null, completed: Record<LevelId, boolean>): 'locked' | 'unfinished' | 'completed' {
  if (!id) return 'locked';
  const index = journeyStops.indexOf(id);
  if (index < 0 || !journeyStops.slice(0, index).every(previous => previous && completed[previous])) return 'locked';
  return completed[id] ? 'completed' : 'unfinished';
}

export function getLevel(id: unknown) {
  return levels.find(level => level.id === id);
}

export function isLevelId(id: unknown): id is LevelId {
  return getLevel(id) !== undefined;
}

/** The lantern keeps its five-point shape while three friends kindle it. */
export const lanternPoints = (friends: number) => [0, 1, 3, 5][Math.max(0, Math.min(3, friends))];
