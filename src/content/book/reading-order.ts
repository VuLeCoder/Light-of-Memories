import { freshTaiThinh, taiThinhPageIds } from '../friends/tai-thinh/progress';
import { freshBanhLuoi, banhLuoiPageIds } from '../friends/ban-banh-luoi/progress';
import { insertExtendedPages } from './extended';



import { bookFrontCover } from './front-cover';
import { bookBackCover } from './back-cover';
import { gacTroiFriends, type GacTroiProgress } from '../friends/gac-troi/progress';
import { journeyStatus, journeyStops, type LevelId } from '../friends/index';
import { eventOrder } from '../friends/surveyor/progress';
import { sparkleRepairUnlocked, sparkleRangingUnlocked } from '../friends/lap-lanh/progress';
import type { Progress } from '../../state/progress';
import { insertRealWorldPages } from './real-world';

export type BookProgress = Pick<Progress, 'surveyor' | 'sparkle'> & Partial<Pick<Progress, 'taiThinh' | 'banhLuoi'>> & { gacTroi?: GacTroiProgress };

/** Browser order follows the adventure; NASA companions stay beside their parent.
 * Both covers are always available; content between them unlocks with progress.
 */
export function getBrowserBookPages({ surveyor, sparkle, gacTroi, taiThinh = freshTaiThinh(), banhLuoi = freshBanhLuoi() }: BookProgress): (string | null)[] {
  const completed = { surveyor: surveyor.completedOnce, 'lap-lanh': sparkle.completedOnce, 'gac-troi': gacTroi?.completedOnce ?? false, 'tai-thinh': taiThinh.completedOnce, 'ban-banh-luoi': banhLuoi.completedOnce };
  const status = (id: LevelId | null) => journeyStatus(id, completed);
  const fieldUnlocked = surveyor.matched.length === 2;
  const surveyorMet = surveyor.completedOnce || fieldUnlocked || !['arrival', 'dialogue'].includes(surveyor.phase);
  const base = insertRealWorldPages([null, ...journeyStops.flatMap(id => {
    if (id === 'gac-troi') {
      if (status(id) === 'locked') return [];
      const memories = gacTroiFriends.filter(friend => gacTroi?.matched.includes(friend) || gacTroi?.bookUnlocks.includes(`gac-memory-${friend}`));
      const sites = gacTroi && (gacTroi.phase !== 'meeting' || gacTroi.bookUnlocks.includes('gac-book-sites') || memories.length > 0);
      const impact = gacTroi && (gacTroi.bookUnlocks.includes('gac-book-impact') || ['t02-search', 't02-story'].includes(gacTroi.phase) || gacTroi.t02Done);
      const impactStory = gacTroi && (gacTroi.t02Done || gacTroi.bookUnlocks.includes('gac-book-impact.story'));
      return ['gac-book-orbit', ...(sites ? ['gac-book-sites'] : []), ...(impact ? ['gac-book-impact'] : []), ...(impactStory ? ['gac-book-impact.story'] : []), ...(gacTroi?.bookUnlocks.includes('gac-book-light') || gacTroi?.bookUnlocks.includes('gac-book-map') || gacTroi && ['t03-walk', 't03-dark-intro', 't03-map', 't03-story', 'gac-farewell', 'gac-free'].includes(gacTroi.phase) ? ['gac-book-light'] : [])];
    }
    if (id && status(id) === 'locked') return [id];
    if (id === 'surveyor') return [
      id,
      ...(fieldUnlocked ? ['surveyor-b01'] : []),
      ...(fieldUnlocked ? eventOrder.map(event => `clue-${event}`) : []),
      ...(eventOrder.every(event => surveyor.found.includes(event)) ? ['surveyor-photos'] : []),
    ];
    if (id === 'tai-thinh') return taiThinhPageIds(taiThinh);
    if (id === 'ban-banh-luoi') return banhLuoiPageIds(banhLuoi);
    if (id === 'lap-lanh') return [id, ...[0, 1].filter(photo => sparkle.keepsakes.includes(photo)).map(photo => `sparkle-photo-${photo}`), ...(sparkleRepairUnlocked(sparkle) ? ['sparkle-repair-clue'] : []), ...(sparkleRangingUnlocked(sparkle) ? ['sparkle-ranging-clue'] : [])];
    return id ? [id] : [];
  })], id => id === 'surveyor' ? surveyorMet : !journeyStops.includes(id as LevelId) || status(id as LevelId) !== 'locked');
  return [bookFrontCover.id, ...insertExtendedPages(
    base.filter(id => id !== 'lap-lanh-reality'),
    { surveyor: completed.surveyor, apollo11: completed['lap-lanh'], lro: completed['gac-troi'] },
  ), bookBackCover.id];
}

/** A hint chooses a stable page ID, independent of page numbers or language. */
export function getBookHintPage({ surveyor, sparkle, gacTroi, taiThinh = freshTaiThinh(), banhLuoi = freshBanhLuoi() }: BookProgress, activeLevel: LevelId | null): string | null {
  const fieldUnlocked = surveyor.matched.length === 2;
  const nextClue = eventOrder.find(id => !surveyor.clues.includes(id) && !surveyor.found.includes(id))
    ?? eventOrder.find(id => !surveyor.found.includes(id)) ?? 'arrive';
  switch (activeLevel) {
    case 'tai-thinh': return ['identify', 'arrival'].includes(taiThinh.phase) ? null : taiThinh.phase === 'records' ? 'tai-book-sources' : ['graph', 'duration'].includes(taiThinh.phase) ? 'tai-book-ringing' : taiThinh.phase === 'rhythm' ? 'tai-book-rhythm' : 'tai-thinh';
    case 'ban-banh-luoi': return ['photoB', 'memoriesIntro'].includes(banhLuoi.phase) ? (banhLuoi.keepsakes.includes('orbit') ? 'ban-book-legacy' : 'ban-book-samples') : ['guideIntro', 'guiding'].includes(banhLuoi.phase) ? 'ban-book-samples' : ['routeIntro', 'routePuzzle'].includes(banhLuoi.phase) ? (banhLuoi.routeHint === 2 ? 'ban-book-walkback' : 'ban-book-route') : 'ban-book-wheels';
    case 'gac-troi':
      if (gacTroi?.hangArrival) return 'gac-book-light';
      if (gacTroi?.bookUnlocks.includes('gac-book-map') && !['meeting', 'matching', 'stories', 't02-intro', 't02-search', 't02-story', 't03-intro', 't03-walk', 't03-dark-intro', 't03-map', 't03-story'].includes(gacTroi.phase)) return 'gac-book-light';
      if (gacTroi && ['t03-walk', 't03-dark-intro', 't03-map', 't03-story'].includes(gacTroi.phase)) return 'gac-book-light';
      if (gacTroi?.phase === 't03-intro' && gacTroi.t02Done) return 'gac-book-impact.story';
      if (gacTroi && ['t02-intro', 't02-search', 't02-story'].includes(gacTroi.phase)) return gacTroi.phase === 't02-intro' ? 'gac-book-sites' : 'gac-book-impact';
      return gacTroi && gacTroi.phase !== 'meeting' ? 'gac-book-sites' : 'gac-book-orbit';
    case 'surveyor':
      return fieldUnlocked ? `clue-${nextClue}` : null;
    case 'lap-lanh':
      return sparkle.phase === 'repair' ? 'sparkle-repair-clue'
        : sparkle.phase === 'ranging' ? 'sparkle-ranging-clue' : null;
    default: return null;
  }
}
