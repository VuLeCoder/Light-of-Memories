import Phaser from 'phaser';
import { banhLuoiScenery, drawBanhLuoi } from './banh-luoi-scenery';
import { guideKey, guideStop, type GuideCheckpoint, type GuideEvent } from '../content/levels/ban-banh-luoi-guide';
import type { ConfirmedBanhLuoiRoute } from '../content/levels/ban-banh-luoi-route';

export interface BanhLuoiGuideOptions {
  route: ConfirmedBanhLuoiRoute;
  checkpoint: GuideCheckpoint;
  enabled: boolean;
  onEvent: (event: GuideEvent) => void;
}
/** Only transient animation lives here; arrival of each node is persisted by React. */
export class BanhLuoiGuideScene {
  private options: BanhLuoiGuideOptions;
  private key = '';
  private rover: Phaser.GameObjects.Graphics;
  private elapsed = 0;
  private sent = false;
  constructor(scene: Phaser.Scene, private cuoi: Phaser.GameObjects.Sprite, private keys: Record<string, Phaser.Input.Keyboard.Key>, options: BanhLuoiGuideOptions) {
    this.options = options;
    banhLuoiScenery(scene);
    this.rover = drawBanhLuoi(scene).setScale(.55).setDepth(5);
    this.set(options);
  }
  set(options: BanhLuoiGuideOptions) {
    this.options = options;
    const key = guideKey(options.route, options.checkpoint);
    if (key !== this.key) {
      this.key = key;
      this.sent = false;
      this.elapsed = 0;
      this.cuoi.setPosition(310, 431).setScale(.62).setFlipX(false);
      this.rover.setPosition(180, 431);
      this.release();
    }
    if (!options.enabled) this.release();
  }
  release() {
    Object.values(this.keys).forEach(key => key.reset());
    this.cuoi.anims.stop();
    this.cuoi.setFrame('rest');
  }
  // Activities are introduced at M3/M4. E must never bypass an unfinished stop.
  interact() {}
  update(delta: number) {
    if (!this.options.enabled || document.hidden || !document.hasFocus() ||
        !document.activeElement?.closest('.ban-guide-play') || this.sent || this.options.checkpoint.stage !== 'travel') {
      this.release();
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Even the longest valid leg (<=12 edges) stays under two seconds.
    this.elapsed += Math.min(delta, 50);
    const fraction = reduced ? 1 : Math.min(1, this.elapsed / 160);
    const { route, checkpoint: p } = this.options;
    let start = 0, end = route.cells.length - 1;
    for (let i = 1; i <= p.nodeIndex; i++) if (guideStop(route, i)) start = i;
    for (let i = p.nodeIndex + 1; i < route.cells.length; i++) {
      const stop = guideStop(route, i);
      if (stop === 'A' && p.rock !== 'stored' || stop === 'B' && p.soil !== 'stored') { end = i; break; }
    }
    const offset = 100 * (p.nodeIndex - start + fraction) / (end - start);
    this.rover.x = 180 + offset;
    this.cuoi.x = 310 + offset;
    if (!reduced && !this.cuoi.anims.isPlaying) this.cuoi.play('cuoi-walk');
    if (fraction === 1) {
      this.sent = true;
      this.release();
      this.options.onEvent({ key: this.key, action: 'arrive', nodeIndex: this.options.checkpoint.nodeIndex + 1 });
    }
  }
}
