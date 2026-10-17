import type { SceneId } from '../content/scenes';
export interface ScenePoint { x: number; y: number; target: string }
export interface PreviewOptions {
  scene: SceneId;
  debug: boolean;
  moonMode: 'sleep' | 'wake' | 'story' | 'free' | 'paused';
  onPoint: (point: ScenePoint) => void;
  onAwake: () => void;
  onReady: () => void;
  onError: (message: string) => void;
}
export const VIEW = { width: 960, height: 540 };
