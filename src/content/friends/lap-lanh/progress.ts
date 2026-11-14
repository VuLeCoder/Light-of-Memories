export type SparklePhase = 'meeting' | 'dust-photo' | 'cleaning-intro' | 'clean-photo' | 'cleaning' | 'route' | 'search-intro' | 'search' | 'memories-intro' | 'memories' | 'arrival' | 'dialogue' | 'mirrors' | 'distance' | 'ending' | 'complete' | 'repair-intro' | 'repair' | 'ranging-intro' | 'ranging' | 'farewell' | 'finished';
export interface SparkleProgress { phase: SparklePhase; turn: number; mirrors: boolean[]; distance: number; completedOnce: boolean; observations: number[]; photos: number[]; keepsakes: number[]; repairAngle: number; measured: boolean; calculation: boolean }
export const freshSparkle = (): SparkleProgress => ({ phase: 'route', turn: 0, repairAngle: 45, measured: false, calculation: false, mirrors: [false, false], distance: 300000, completedOnce: false, observations: [], photos: [], keepsakes: [] });
export function readSparkle(value: unknown): SparkleProgress {
  const p = value as (Partial<SparkleProgress> & { repairRotation?: number }) | null;
  const fresh = freshSparkle();
  if (!p || !['meeting','dust-photo','cleaning-intro','clean-photo','cleaning','search-intro','search','memories-intro','memories','route','arrival','dialogue','mirrors','distance','ending','complete','repair-intro','repair','ranging-intro','ranging','farewell','finished'].includes(p.phase ?? '')) return fresh;
  // Older saves beyond cleaning resume at the current stopping point.
  const pastCleaning = ['dialogue', 'mirrors', 'distance', 'memories-intro', 'memories', 'ending', 'complete'].includes(p.phase!);
  return { phase: pastCleaning ? 'clean-photo' : p.phase!, turn: Number.isInteger(p.turn) ? Math.max(0, Math.min(6, p.turn!)) : 0,
    repairAngle: typeof p.repairAngle === 'number' && Number.isFinite(p.repairAngle)
      ? Math.max(0, Math.min(180, p.repairAngle))
      : typeof p.repairRotation === 'number' && Number.isFinite(p.repairRotation)
        ? Math.max(0, Math.min(180, 90 - p.repairRotation)) : fresh.repairAngle,
    measured: p.measured === true, calculation: p.calculation === true,
    mirrors: [p.mirrors?.[0] === true, p.mirrors?.[1] === true], distance: typeof p.distance === 'number' && Number.isFinite(p.distance) ? Math.max(250000, Math.min(450000, Math.round(p.distance / 1000) * 1000)) : fresh.distance,
    observations: cleanIds(p.observations), photos: cleanIds(p.photos), keepsakes: pastCleaning ? [0, 1] : cleanIds(p.keepsakes).filter(id => id < 2),
    completedOnce: p.completedOnce === true || p.phase === 'complete' || p.phase === 'finished' };
}
function cleanIds(value: unknown): number[] { return Array.isArray(value) ? [...new Set(value.filter((n): n is number => Number.isInteger(n) && n >= 0 && n < 3))] : []; }
export const sparkleRepairUnlocked = (p: SparkleProgress) => p.keepsakes.includes(1);
export const sparkleRangingUnlocked = (p: SparkleProgress) => ['ranging-intro', 'ranging', 'farewell', 'finished'].includes(p.phase) || p.measured;
