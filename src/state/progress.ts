import { freshSparkle, readSparkle, type SparkleProgress } from '../content/levels/lap-lanh';
import { freshSurveyor, readSurveyorProgress, type SurveyorProgress } from '../content/levels/surveyor-progress';
import { isLevelId, type LevelId } from '../content/levels';
import type { MoonQuest } from '../game/types';
import type { SceneId } from '../content/scenes';

export type Chapter = 'idle' | 'earth' | 'departing' | 'arriving' | 'moon-waking' | 'moon-story' | 'moon-free';
type Milestone = 'earth' | 'moon' | 'moon-story' | 'awake' | 'tree' | 'lantern' | 'trail' | 'complete' | 'surveyor';
const key = 'cuoi.progress';
const milestones: readonly Milestone[] = ['earth', 'moon', 'moon-story', 'awake', 'tree', 'lantern', 'trail', 'complete', 'surveyor'];
export interface Progress { scene: SceneId; chapter: Chapter; quest: MoonQuest; started: boolean; completed: boolean; activeLevel: LevelId | null; surveyor: SurveyorProgress; sparkle: SparkleProgress }
const fresh: Progress = { scene: 'earth', chapter: 'idle', quest: 'bench', started: false, completed: false, activeLevel: null, surveyor: freshSurveyor(), sparkle: freshSparkle() };

export function readProgress(): { progress: Progress; unavailable: boolean } {
  let raw: string | null;
  try { raw = localStorage.getItem(key); }
  catch { return { progress: fresh, unavailable: true }; }
  if (!raw) return { progress: fresh, unavailable: false };
  try {
    const data = JSON.parse(raw);
    if (!data || ![1, 2, 3, 4].includes(data.version) || !milestones.includes(data.milestone)) return { progress: fresh, unavailable: false };
    const milestone: Milestone = data.milestone;
    return { unavailable: false, progress: {
      scene: milestone === 'earth' ? 'earth' : 'moon',
      chapter: milestone === 'earth' ? 'earth' : milestone === 'moon' ? 'moon-waking' : milestone === 'moon-story' ? 'moon-story' : 'moon-free',
      quest: milestone === 'surveyor' ? 'complete' : milestone === 'tree' || milestone === 'lantern' || milestone === 'trail' || milestone === 'complete' ? milestone : 'bench',
      activeLevel: data.version === 1 && milestone === 'surveyor' ? 'surveyor' : data.version >= 2 && milestone === 'complete' && isLevelId(data.activeLevel) ? data.activeLevel : null,
      surveyor: data.version >= 3 && (milestone === 'complete' || milestone === 'surveyor') ? readSurveyorProgress(data.surveyor) : freshSurveyor(),
      sparkle: readSparkle(data.sparkle),
      started: true, completed: milestone === 'complete' || milestone === 'surveyor',
    } };
  } catch { return { progress: fresh, unavailable: false }; }
}

export function saveProgress(chapter: Chapter, quest: MoonQuest, completed: boolean, activeLevel: LevelId | null = null, surveyor: SurveyorProgress = freshSurveyor(), sparkle: SparkleProgress = freshSparkle()): boolean {
  if (chapter === 'idle') return true;
  const milestone: Milestone = completed ? 'complete' : chapter === 'earth' ? 'earth'
    : ['departing', 'arriving', 'moon-waking'].includes(chapter) ? 'moon'
    : chapter === 'moon-story' ? 'moon-story' : quest === 'bench' ? 'awake' : quest;
  try { localStorage.setItem(key, JSON.stringify({ version: 4, milestone, surveyor, sparkle, activeLevel: milestone === 'complete' ? activeLevel : null })); return true; }
  catch { return false; }
}

export function readSound(): boolean {
  try { return localStorage.getItem('cuoi.sound') !== 'off'; } catch { return true; }
}
