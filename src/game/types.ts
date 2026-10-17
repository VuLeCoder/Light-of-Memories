import type { SceneId } from '../content/scenes';
import type { Language } from '../content/i18n';
export interface ScenePoint { x: number; y: number; target: string }
export interface PreviewOptions {
  scene: SceneId;
  debug: boolean;
  language: Language;
  moonMode: 'sleep' | 'wake' | 'story' | 'free' | 'paused';
  onPoint: (point: ScenePoint) => void;
  onAwake: () => void;
  onReady: () => void;
  onError: (assets: string[]) => void;
}
export const VIEW = { width: 960, height: 540 };
