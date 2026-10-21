export type SurveyorTool = 'camera' | 'scoop';
export type SurveyorEvent = 'arrive' | 'work' | 'visit';
export interface SurveyorProgress {
  phase: 'arrival' | 'dialogue' | 'tools' | 'memory' | 'soil-intro' | 'soil' | 'digging' | 'soil-memory' | 'timeline-intro' | 'timeline' | 'complete';
  completedOnce: boolean;
  clues: SurveyorEvent[];
  found: SurveyorEvent[];
  turn: number;
  matched: SurveyorTool[];
  order: SurveyorEvent[];
}
export const freshSurveyor = (completedOnce = false): SurveyorProgress => ({ phase: 'arrival', completedOnce, turn: 0, matched: [], order: [], clues: [], found: [] });
export const replaySurveyor = (progress: SurveyorProgress): SurveyorProgress => freshSurveyor(progress.completedOnce || progress.phase === 'complete');
export const eventOrder: SurveyorEvent[] = ['arrive', 'work', 'visit'];
const phases: SurveyorProgress['phase'][] = ['arrival', 'dialogue', 'tools', 'memory', 'soil-intro', 'soil', 'digging', 'soil-memory', 'timeline-intro', 'timeline', 'complete'];
export const memoryCount = (p: SurveyorProgress) => p.found.length;
export function readSurveyorProgress(value: unknown): SurveyorProgress {
  if (!value || typeof value !== 'object') return freshSurveyor();
  const data = value as Record<string, unknown>;
  if (!phases.includes(data.phase as SurveyorProgress['phase'])) return freshSurveyor();
  const matched = (['camera', 'scoop'] as const).filter(tool => Array.isArray(data.matched) && data.matched.includes(tool));
  const order = Array.isArray(data.order) ? data.order.filter((id, i, all): id is SurveyorEvent => eventOrder.includes(id) && all.indexOf(id) === i).slice(0, 3) : [];
  const validIds = (value: unknown) => eventOrder.filter(id => Array.isArray(value) && value.includes(id));
  const legacyDone = data.phase === 'complete' && !Array.isArray(data.found);
  const found = legacyDone ? [...eventOrder] : validIds(data.found);
  const clues = legacyDone ? [...eventOrder] : [...new Set([...validIds(data.clues), ...found])];
  let phase = data.phase as SurveyorProgress['phase'];
  if (matched.length < 2 && phases.indexOf(phase) >= 3) phase = 'tools';
  if (matched.length === 2 && phases.indexOf(phase) < 3) phase = 'memory';
  if (phase === 'complete' && !eventOrder.every((id, i) => order[i] === id)) phase = 'timeline';
  if (['soil', 'digging', 'soil-memory', 'timeline-intro', 'timeline'].includes(phase) && found.length < 3) phase = 'soil';
  if (phase === 'complete' && found.length < 3) phase = 'soil';
  if (phase === 'digging') phase = 'soil';
  if (phase === 'soil' && found.length === 3) phase = 'soil-memory';
  return { phase, completedOnce: data.completedOnce === true || phase === 'complete', matched, order, clues, found, turn: typeof data.turn === 'number' && Number.isInteger(data.turn) ? Math.max(0, Math.min(phase === 'complete' ? 10 : 3, data.turn)) : 0 };
}
