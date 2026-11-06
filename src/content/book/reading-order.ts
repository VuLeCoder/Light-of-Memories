import type { GacTroiProgress } from '../levels/gac-troi-progress';
import { journeyStatus, journeyStops, type LevelId } from '../levels';
import { eventOrder } from '../levels/surveyor-progress';
import { sparkleRepairUnlocked, sparkleRangingUnlocked } from '../levels/lap-lanh';
import { taiThinhPageIds } from '../levels/tai-thinh-progress';
import { banhLuoiPageIds } from '../levels/ban-banh-luoi-progress';
import type { Progress } from '../../state/progress';
import { insertRealWorldPages } from './real-world';

export const extraReadingPages = ['lap-lanh', 'sparkle-photo-1', 'sparkle-photo-0', 'sparkle-repair-clue', 'sparkle-ranging-clue', 'tai-thinh', 'tai-book-devices', 'tai-photo-pse', 'tai-book-sources', 'tai-photo-station', 'tai-book-impact', 'tai-book-ringing', 'tai-book-sensor', 'tai-book-noise', 'tai-book-rhythm', 'tai-photo-magnetometer', 'tai-book-legacy'];

export type BookProgress = Pick<Progress, 'surveyor' | 'sparkle' | 'taiThinh' | 'banhLuoi'> & { gacTroi?: GacTroiProgress; ending?: Progress['ending'] };

/** Browser order follows the adventure; NASA companions stay beside their parent.
 * Unlike the complete publication, this edition only includes unlocked entries.
 */
export function getBrowserBookPages({ surveyor, sparkle, taiThinh, banhLuoi, gacTroi, ending }: BookProgress): (string | null)[] {
  const completed = { surveyor: surveyor.completedOnce, 'lap-lanh': sparkle.completedOnce, 'tai-thinh': taiThinh.completedOnce, 'ban-banh-luoi': banhLuoi.completedOnce, 'gac-troi': gacTroi?.completedOnce ?? false };
  const status = (id: LevelId | null) => journeyStatus(id, completed);
  const fieldUnlocked = surveyor.matched.length === 2;
  return insertRealWorldPages([null, ...journeyStops.flatMap(id => {
    if (id === 'gac-troi') return status(id) === 'locked' ? [] : ['gac-book-orbit', ...(gacTroi && gacTroi.phase !== 'meeting' ? ['gac-book-sites', ...gacTroi.matched.map(id => `gac-memory-${id}`), ...(['route', 'changes', 'farewell', 'gift', 'finished'].includes(gacTroi.phase) ? ['gac-book-route'] : []), ...(['changes', 'farewell', 'gift', 'finished'].includes(gacTroi.phase) ? ['gac-book-changes'] : [])] : [])];
    if (id && status(id) === 'locked') return [id];
    if (id === 'surveyor') return [
      id,
      ...(fieldUnlocked ? ['surveyor-b01'] : []),
      ...eventOrder.flatMap(event => [
        ...(fieldUnlocked ? [`clue-${event}`] : []),
        ...(surveyor.found.includes(event) ? [`photo-${event}`] : []),
      ]),
    ];
    if (id === 'lap-lanh') return [id, ...sparkle.keepsakes.map(photo => `sparkle-photo-${photo}`), ...(sparkleRepairUnlocked(sparkle) ? ['sparkle-repair-clue'] : []), ...(sparkleRangingUnlocked(sparkle) ? ['sparkle-ranging-clue'] : [])];
    if (id === 'tai-thinh') return taiThinhPageIds(taiThinh);
    if (id === 'ban-banh-luoi') return banhLuoiPageIds(banhLuoi);
    return id ? [id] : [];
  }), 'extra-reading', ...extraReadingPages, ...(ending?.completedOnce ? ['gac-book-reunion'] : [])], id => !journeyStops.includes(id as LevelId) || status(id as LevelId) !== 'locked');
}

/** A hint chooses a stable page ID, independent of page numbers or language. */
export function getBookHintPage({ surveyor, sparkle, taiThinh, banhLuoi, gacTroi }: BookProgress, activeLevel: LevelId | null): string | null {
  const fieldUnlocked = surveyor.matched.length === 2;
  const nextClue = eventOrder.find(id => !surveyor.clues.includes(id) && !surveyor.found.includes(id))
    ?? eventOrder.find(id => !surveyor.found.includes(id)) ?? 'arrive';
  switch (activeLevel) {
    case 'gac-troi': return gacTroi?.phase === 'route' ? 'gac-book-route' : gacTroi?.phase === 'changes' ? 'gac-book-changes' : gacTroi && gacTroi.phase !== 'meeting' ? 'gac-book-sites' : 'gac-book-orbit';
    case 'surveyor':
      return fieldUnlocked ? `clue-${nextClue}` : null;
    case 'lap-lanh':
      return sparkle.phase === 'repair' ? 'sparkle-repair-clue'
        : sparkle.phase === 'ranging' ? 'sparkle-ranging-clue' : null;
    case 'tai-thinh':
      switch (taiThinh.phase) {
        case 'identify': return 'tai-book-devices';
        case 'records': return 'tai-book-sources';
        case 'graph':
        case 'duration': return 'tai-book-ringing';
        case 'rhythm': return 'tai-book-rhythm';
        default: return null;
      }
    case 'ban-banh-luoi':
      switch (banhLuoi.phase) {
        case 'photoB':
        case 'memoriesIntro': return 'ban-book-camera';
        case 'guideIntro':
        case 'guiding': return 'ban-book-samples';
        case 'routeIntro':
        case 'routePuzzle': return banhLuoi.routeHint === 2 ? 'ban-book-walkback' : 'ban-book-route';
        default: return 'ban-book-wheels';
      }
    default: return null;
  }
}
