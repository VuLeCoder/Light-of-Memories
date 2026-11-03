import type { BanhLuoiProgress } from './ban-banh-luoi-progress';
/** Receiving the fourth light is earlier than finishing the final conversation. */
export function canMeetGacTroi(progress: BanhLuoiProgress, preview: boolean) {
  return progress.phase === 'finished' && progress.completedOnce && !preview;
}
