import type { SceneId } from '../content/scenes';
import type { Language } from '../content/i18n';
export type MoonQuest = 'bench' | 'tree' | 'lantern' | 'trail' | 'complete' | 'surveyor';
export interface PreviewOptions {
  initiallyAwake: boolean;
  quest: MoonQuest;
  treeSpeaking: boolean;
  onInteract: () => void;
  onExit: () => void;
  scene: SceneId;
  language: Language;
  moonMode: 'sleep' | 'wake' | 'story' | 'free' | 'paused';
  onAwake: () => void;
  onReady: () => void;
  onError: (assets: string[]) => void;
}
export const VIEW = { width: 960, height: 540 };
