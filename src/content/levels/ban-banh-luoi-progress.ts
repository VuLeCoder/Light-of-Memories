import { banBanhLuoiScript } from './ban-banh-luoi-content';

// M1 stops before T01. Later milestones extend this contract without reusing IDs.
export const banhLuoiPhases = ['route', 'approach', 'meeting', 'wheels'] as const;
export type BanhLuoiPhase = typeof banhLuoiPhases[number];
export interface BanhLuoiProgress {
  phase: BanhLuoiPhase;
  turn: number;
  completedOnce: boolean;
}
export const freshBanhLuoi = (): BanhLuoiProgress => ({ phase: 'route', turn: 0, completedOnce: false });

/** A damaged fourth chapter never resets the three earlier friends. */
export function readBanhLuoi(value: unknown): BanhLuoiProgress {
  if (!value || typeof value !== 'object') return freshBanhLuoi();
  const d = value as Record<string, unknown>;
  if (!banhLuoiPhases.includes(d.phase as BanhLuoiPhase)) return freshBanhLuoi();
  const phase = d.phase as BanhLuoiPhase;
  const maxTurn = phase === 'route' || phase === 'meeting' ? banBanhLuoiScript[phase].length - 1 : 0;
  return { phase, turn: Number.isInteger(d.turn) ? Math.max(0, Math.min(maxTurn, d.turn as number)) : 0,
    // M1 cannot award a light, including when stored data claims completion.
    completedOnce: false };
}
