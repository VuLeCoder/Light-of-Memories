import { taiThinhScript } from './tai-thinh-content';

export const taiThinhPhases = ['route', 'approach', 'arrival', 'identify', 'meeting', 'photoA', 'recordsIntro', 'records', 'afterRecords', 'photoB', 'ringingIntro', 'graph', 'duration', 'afterRinging', 'rhythmIntro', 'rhythm', 'door', 'afterRhythm', 'photoC', 'afterPhotoC', 'memoriesIntro', 'recallA', 'recallB', 'recallC', 'farewell', 'gift', 'finished'] as const;
export type TaiThinhPhase = typeof taiThinhPhases[number];
export type TaiThinhMemory = 'pse' | 'station' | 'magnetometer';
export type TaiThinhRecord = 'inside' | 'impact' | 'electronics';
export interface TaiThinhProgress {
  phase: TaiThinhPhase;
  turn: number;
  identified: boolean;
  matches: TaiThinhRecord[];
  graphCorrect: boolean;
  durationCorrect: boolean;
  rhythmCorrect: boolean;
  keepsakes: TaiThinhMemory[];
  recallIndex: number;
  completedOnce: boolean;
  replayCheckpoint?: Omit<TaiThinhProgress, 'completedOnce' | 'replayCheckpoint'>;
}
export const freshTaiThinh = (): TaiThinhProgress => ({ phase: 'route', turn: 0, identified: false, matches: [], graphCorrect: false, durationCorrect: false, rhythmCorrect: false, keepsakes: [], recallIndex: 0, completedOnce: false });

/** Validate each prerequisite rather than trusting a later phase in stored JSON. */
export function readTaiThinh(value: unknown): TaiThinhProgress {
  if (!value || typeof value !== 'object') return freshTaiThinh();
  const d = value as Record<string, unknown>;
  if (!taiThinhPhases.includes(d.phase as TaiThinhPhase)) return freshTaiThinh();
  const ids = <T extends string>(allowed: readonly T[], input: unknown): T[] => allowed.filter(id => Array.isArray(input) && input.includes(id));
  const matches = ids(['inside', 'impact', 'electronics'] as const, d.matches);
  const keepsakes = ids(['pse', 'station', 'magnetometer'] as const, d.keepsakes);
  const identified = d.identified === true;
  const graphCorrect = identified && matches.length === 3 && d.graphCorrect === true;
  const durationCorrect = graphCorrect && d.durationCorrect === true;
  const rhythmCorrect = durationCorrect && d.rhythmCorrect === true;
  let phase = d.phase as TaiThinhPhase;
  const after = (id: TaiThinhPhase) => taiThinhPhases.indexOf(phase) > taiThinhPhases.indexOf(id);
  if (!identified && after('identify')) phase = 'identify';
  if (!keepsakes.includes('pse') && after('photoA')) phase = 'photoA';
  if (matches.length < 3 && after('records')) phase = 'records';
  if (!keepsakes.includes('station') && after('photoB')) phase = 'photoB';
  if (!graphCorrect && after('graph')) phase = 'graph';
  if (!durationCorrect && after('duration')) phase = 'duration';
  if (!rhythmCorrect && after('rhythm')) phase = 'rhythm';
  if (!keepsakes.includes('magnetometer') && after('photoC')) phase = 'photoC';
  const lines = taiThinhScript[phase as keyof typeof taiThinhScript];
  const maxTurn = phase === 'afterRhythm' || phase === 'afterPhotoC' ? 0 : lines ? lines.length - 1 : 0;
  const p: TaiThinhProgress = { phase, turn: phase === d.phase && Number.isInteger(d.turn) ? Math.max(0, Math.min(maxTurn, d.turn as number)) : 0,
    identified, matches: identified ? matches : [], graphCorrect, durationCorrect, rhythmCorrect, keepsakes,
    recallIndex: Number.isInteger(d.recallIndex) ? Math.max(0, Math.min(2, d.recallIndex as number)) : 0,
    // Historical completion survives a new run. Never infer it from a phase alone.
    completedOnce: d.completedOnce === true && keepsakes.length === 3 };
  if (p.phase === 'finished' && !p.completedOnce) p.phase = 'gift';
  if (p.completedOnce && d.replayCheckpoint && typeof d.replayCheckpoint === 'object') {
    const checkpoint = readTaiThinh({ ...d.replayCheckpoint, replayCheckpoint: undefined, completedOnce: false });
    const { completedOnce: _, ...run } = checkpoint;
    p.replayCheckpoint = run;
  }
  return p;
}

/** Page IDs stay stable when a new photograph is inserted in this friend's group. */
export function taiThinhPageIds(p: TaiThinhProgress): string[] {
  return ['tai-thinh',
    ...(taiThinhPhases.indexOf(p.phase) >= taiThinhPhases.indexOf('identify') || p.keepsakes.length > 0 ? ['tai-book-devices'] : []),
    ...(p.keepsakes.includes('pse') ? ['tai-photo-pse', 'tai-book-sensor', 'tai-book-sources', 'tai-book-noise'] : []),
    ...(p.keepsakes.includes('station') ? ['tai-photo-station'] : []),
  ];
}
