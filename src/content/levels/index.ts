import { friendLevels, type FriendId } from './friends';
import { surveyor } from './surveyor';
import type { LevelDefinition } from './types';

// Add implemented levels here. IDs are persisted: keep them stable.
export const levels = [surveyor, ...friendLevels] as const satisfies readonly LevelDefinition[];
export type LevelId = 'surveyor' | FriendId;

// Stops unlock in story order; saved IDs stay stable.
export const journeyStops: readonly (LevelId | null)[] = ['surveyor', 'rover', 'mirror', 'flag', 'footprint'];

export function getLevel(id: unknown) {
  return levels.find(level => level.id === id);
}

export function isLevelId(id: unknown): id is LevelId {
  return getLevel(id) !== undefined;
}
