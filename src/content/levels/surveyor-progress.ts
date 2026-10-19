export type SurveyorTool = 'camera' | 'scoop';
export interface SurveyorProgress {
  phase: 'arrival' | 'dialogue' | 'tools' | 'memory';
  turn: number;
  matched: SurveyorTool[];
}
export const freshSurveyor = (): SurveyorProgress => ({ phase: 'arrival', turn: 0, matched: [] });

export function readSurveyorProgress(value: unknown): SurveyorProgress {
  if (!value || typeof value !== 'object') return freshSurveyor();
  const data = value as Record<string, unknown>;
  if (!['arrival', 'dialogue', 'tools', 'memory'].includes(String(data.phase))) return freshSurveyor();
  const matched = (['camera', 'scoop'] as const).filter(tool => Array.isArray(data.matched) && data.matched.includes(tool));
  return {
    phase: matched.length === 2 ? 'memory' : data.phase === 'memory' ? 'tools' : data.phase as SurveyorProgress['phase'],
    turn: typeof data.turn === 'number' && Number.isInteger(data.turn) ? Math.max(0, Math.min(3, data.turn)) : 0,
    matched,
  };
}
