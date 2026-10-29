import { freshBanhLuoi, readBanhLuoi, type BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { freshTaiThinh, readTaiThinh, type TaiThinhProgress } from '../content/levels/tai-thinh-progress';
import { freshSparkle, readSparkle, type SparkleProgress } from '../content/levels/lap-lanh';
import { freshSurveyor, readSurveyorProgress, type SurveyorProgress } from '../content/levels/surveyor-progress';
import { journeyStatus, isLevelId, type LevelId } from '../content/levels';
import type { MoonQuest } from '../game/types';
import type { SceneId } from '../content/scenes';

export type Chapter = 'idle' | 'earth' | 'departing' | 'arriving' | 'moon-waking' | 'moon-story' | 'moon-free';
type Milestone = 'earth' | 'moon' | 'moon-story' | 'awake' | 'tree' | 'lantern' | 'trail' | 'complete' | 'surveyor';
const key = 'cuoi.progress';
const milestones: readonly Milestone[] = ['earth', 'moon', 'moon-story', 'awake', 'tree', 'lantern', 'trail', 'complete', 'surveyor'];
export interface Progress { scene: SceneId; chapter: Chapter; quest: MoonQuest; started: boolean; completed: boolean; activeLevel: LevelId | null; surveyor: SurveyorProgress; sparkle: SparkleProgress; taiThinh: TaiThinhProgress; banhLuoi: BanhLuoiProgress }
const fresh: Progress = { scene: 'earth', chapter: 'idle', quest: 'bench', started: false, completed: false, activeLevel: null, surveyor: freshSurveyor(), sparkle: freshSparkle(), taiThinh: freshTaiThinh(), banhLuoi: freshBanhLuoi() };

export function readProgress(): { progress: Progress; unavailable: boolean } {
  let raw: string | null;
  try { raw = localStorage.getItem(key); }
  catch { return { progress: fresh, unavailable: true }; }
  if (!raw) return { progress: fresh, unavailable: false };
  try {
    const data = JSON.parse(raw);
    if (!data || ![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(data.version) || !milestones.includes(data.milestone)) return { progress: fresh, unavailable: false };
    const milestone: Milestone = data.milestone;
    const sparkle = readSparkle(data.sparkle);
    const surveyor = data.version >= 3 && (milestone === 'complete' || milestone === 'surveyor') ? readSurveyorProgress(data.surveyor) : freshSurveyor();
    const taiThinh = data.version >= 5 ? readTaiThinh(data.taiThinh) : freshTaiThinh();
    const banhLuoi = data.version >= 6 ? readBanhLuoi(data.banhLuoi, data.version) : freshBanhLuoi();
    const activeAllowed = !['tai-thinh', 'ban-banh-luoi'].includes(data.activeLevel) || isLevelId(data.activeLevel) && journeyStatus(data.activeLevel, { surveyor: surveyor.completedOnce, 'lap-lanh': sparkle.completedOnce, 'tai-thinh': taiThinh.completedOnce, 'ban-banh-luoi': banhLuoi.completedOnce }) !== 'locked';
    return { unavailable: false, progress: {
      scene: milestone === 'earth' ? 'earth' : 'moon',
      chapter: milestone === 'earth' ? 'earth' : milestone === 'moon' ? 'moon-waking' : milestone === 'moon-story' ? 'moon-story' : 'moon-free',
      quest: milestone === 'surveyor' ? 'complete' : milestone === 'tree' || milestone === 'lantern' || milestone === 'trail' || milestone === 'complete' ? milestone : 'bench',
      activeLevel: data.version === 1 && milestone === 'surveyor' ? 'surveyor' : data.version >= 2 && milestone === 'complete' && activeAllowed && isLevelId(data.activeLevel) ? data.activeLevel : null,
      surveyor, sparkle, taiThinh, banhLuoi,
      started: true, completed: milestone === 'complete' || milestone === 'surveyor',
    } };
  } catch { return { progress: fresh, unavailable: false }; }
}

export function saveProgress(chapter: Chapter, quest: MoonQuest, completed: boolean, activeLevel: LevelId | null = null, surveyor: SurveyorProgress = freshSurveyor(), sparkle: SparkleProgress = freshSparkle(), taiThinh: TaiThinhProgress = freshTaiThinh(), banhLuoi: BanhLuoiProgress = freshBanhLuoi()): boolean {
  if (chapter === 'idle') return true;
  const milestone: Milestone = completed ? 'complete' : chapter === 'earth' ? 'earth'
    : ['departing', 'arriving', 'moon-waking'].includes(chapter) ? 'moon'
    : chapter === 'moon-story' ? 'moon-story' : quest === 'bench' ? 'awake' : quest;
  try { localStorage.setItem(key, JSON.stringify({ version: 11, milestone, surveyor, sparkle, taiThinh, banhLuoi, activeLevel: milestone === 'complete' ? activeLevel : null })); return true; }
  catch { return false; }
}

export function readSound(): boolean {
  try { return localStorage.getItem('cuoi.sound') !== 'off'; } catch { return true; }
}
