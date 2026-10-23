import { taiThinh } from './tai-thinh';
import { lapLanh } from './lap-lanh';
import { surveyor } from './surveyor';
import type { LevelDefinition } from './types';

// Add implemented levels here. IDs are persisted: keep them stable.
export const levels = [surveyor, lapLanh, taiThinh] as const satisfies readonly LevelDefinition[];
export type LevelId = (typeof levels)[number]['id'];

// Empty slots remain mystery stops until their content is implemented.
export const journeyStops: readonly (LevelId | null)[] = ['surveyor', 'lap-lanh', 'tai-thinh', null, null];

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
