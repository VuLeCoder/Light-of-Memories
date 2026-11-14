import { taiThinh } from './tai-thinh/definition';
import { banBanhLuoi } from './ban-banh-luoi/definition';
import { gacTroi } from './gac-troi/definition';
import { lapLanh } from './lap-lanh/definition';
import { surveyor } from './surveyor/definition';
import type { LevelDefinition } from './types';

// Add implemented levels here. IDs are persisted: keep them stable.
export const levels = [surveyor, lapLanh, taiThinh, banBanhLuoi, gacTroi] as const satisfies readonly LevelDefinition[];
export type LevelId = (typeof levels)[number]['id'];

// Empty slots remain mystery stops until their content is implemented.
export const journeyStops: readonly (LevelId | null)[] = ['surveyor', 'lap-lanh', 'tai-thinh', 'ban-banh-luoi', 'gac-troi'];

export function journeyStatus(id: LevelId | null, completed: Record<LevelId, boolean>): 'locked' | 'unfinished' | 'completed' {
  if (!id) return 'locked';
  if (completed[id]) return 'completed';
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
