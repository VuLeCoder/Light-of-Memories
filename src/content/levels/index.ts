import { surveyor } from './surveyor';
import type { LevelDefinition } from './types';

// Add implemented levels here. IDs are persisted: keep them stable.
export const levels = [surveyor] as const satisfies readonly LevelDefinition[];
export type LevelId = (typeof levels)[number]['id'];

// Empty slots remain mystery stops until their content is implemented.
export const journeyStops: readonly (LevelId | null)[] = ['surveyor', null, null, null, null];

export function getLevel(id: unknown) {
  return levels.find(level => level.id === id);
}

export function isLevelId(id: unknown): id is LevelId {
  return getLevel(id) !== undefined;
}
