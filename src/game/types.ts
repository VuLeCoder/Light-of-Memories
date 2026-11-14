import type { SurveyorEvent } from '../content/levels/surveyor-progress';
import type { SceneId } from '../content/scenes';
import type { Language } from '../content/i18n';
export type MoonQuest = 'bench' | 'tree' | 'lantern' | 'trail' | 'complete';
export type GameSceneId = SceneId | 'surveyor' | 'lap-lanh';
export interface PreviewOptions {
  freeRoam?: boolean;
  sparkleTrail?: boolean;
  sparkleEnding?: boolean;
  sparkleDust?: boolean;
  onTrailHole?: () => void;
  excavation?: { found: SurveyorEvent[]; clues: SurveyorEvent[]; digging: boolean };
  onDigNear?: (id: SurveyorEvent | null) => void;
  initiallyAwake: boolean;
  encounterStarted: boolean;
  quest: MoonQuest;
  treeSpeaking: boolean;
  onInteract: () => void;
  onExit: () => void;
  scene: GameSceneId;
  language: Language;
  moonMode: 'sleep' | 'wake' | 'story' | 'free' | 'paused';
  onAwake: () => void;
  onReady: () => void;
  onError: (assets: string[]) => void;
}
export const VIEW = { width: 960, height: 540 };
