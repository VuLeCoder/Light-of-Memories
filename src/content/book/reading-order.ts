import { gacTroiFriends, type GacTroiProgress } from '../levels/gac-troi-progress';
import { journeyStatus, journeyStops, type LevelId } from '../levels';
import { eventOrder } from '../levels/surveyor-progress';
import { sparkleRepairUnlocked, sparkleRangingUnlocked } from '../levels/lap-lanh';
import type { Progress } from '../../state/progress';
import { insertRealWorldPages } from './real-world';

export type BookProgress = Pick<Progress, 'surveyor' | 'sparkle'> & { gacTroi?: GacTroiProgress };

/** Browser order follows the adventure; NASA companions stay beside their parent.
 * Unlike the complete publication, this edition only includes unlocked entries.
 */
export function getBrowserBookPages({ surveyor, sparkle, gacTroi }: BookProgress): (string | null)[] {
  const completed = { surveyor: surveyor.completedOnce, 'lap-lanh': sparkle.completedOnce, 'gac-troi': gacTroi?.completedOnce ?? false };
  const status = (id: LevelId | null) => journeyStatus(id, completed);
  const fieldUnlocked = surveyor.matched.length === 2;
  return insertRealWorldPages([null, ...journeyStops.flatMap(id => {
    if (id === 'gac-troi') {
      if (status(id) === 'locked') return [];
      const memories = gacTroiFriends.filter(friend => gacTroi?.matched.includes(friend) || gacTroi?.bookUnlocks.includes(`gac-memory-${friend}`));
      const sites = gacTroi && (gacTroi.phase !== 'meeting' || gacTroi.bookUnlocks.includes('gac-book-sites') || memories.length > 0);
      const impact = gacTroi && (gacTroi.bookUnlocks.includes('gac-book-impact') || ['t02-search', 't02-story'].includes(gacTroi.phase) || gacTroi.t02Done);
      const impactStory = gacTroi && (gacTroi.t02Done || gacTroi.bookUnlocks.includes('gac-book-impact.story'));
      return ['gac-book-orbit', ...(sites ? ['gac-book-sites', ...memories.map(friend => `gac-memory-${friend}`)] : []), ...(impact ? ['gac-book-impact'] : []), ...(impactStory ? ['gac-book-impact.story'] : []), ...(gacTroi?.bookUnlocks.includes('gac-book-light') || gacTroi && ['t03-walk', 't03-map', 't03-story', 'gac-farewell', 'gac-free'].includes(gacTroi.phase) ? ['gac-book-light'] : []), ...(gacTroi?.bookUnlocks.includes('gac-book-map') || gacTroi?.farewellDone ? ['gac-book-map'] : [])];
    }
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
    return id ? [id] : [];
  })], id => !journeyStops.includes(id as LevelId) || status(id as LevelId) !== 'locked');
}

/** A hint chooses a stable page ID, independent of page numbers or language. */
export function getBookHintPage({ surveyor, sparkle, gacTroi }: BookProgress, activeLevel: LevelId | null): string | null {
  const fieldUnlocked = surveyor.matched.length === 2;
  const nextClue = eventOrder.find(id => !surveyor.clues.includes(id) && !surveyor.found.includes(id))
    ?? eventOrder.find(id => !surveyor.found.includes(id)) ?? 'arrive';
  switch (activeLevel) {
    case 'gac-troi':
      if (gacTroi?.rabbitJourney?.active) return gacTroi.bookUnlocks.includes('gac-book-map') ? 'gac-book-map' : 'gac-book-light';
      if (gacTroi?.bookUnlocks.includes('gac-book-map') && !['meeting', 'matching', 'stories', 't02-intro', 't02-search', 't02-story', 't03-intro', 't03-walk', 't03-map', 't03-story'].includes(gacTroi.phase)) return 'gac-book-map';
      if (gacTroi && ['t03-walk', 't03-map', 't03-story'].includes(gacTroi.phase)) return 'gac-book-light';
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
