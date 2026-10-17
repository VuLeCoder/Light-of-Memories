import type { SceneId } from '../content/scenes';
export interface ScenePoint { x: number; y: number; target: string }
export interface PreviewOptions {
  scene: SceneId;
  debug: boolean;
  sleeping?: boolean;
  onPoint: (point: ScenePoint) => void;
  onReady: () => void;
  onError: (message: string) => void;
}
export const VIEW = { width: 960, height: 540 };
