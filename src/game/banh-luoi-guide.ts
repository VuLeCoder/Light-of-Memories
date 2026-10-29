import Phaser from 'phaser';
import { banhLuoiScenery, drawBanhLuoi } from './banh-luoi-scenery';
import { guideKey, guideStop, type GuideAction, type GuideCheckpoint, type GuideEvent, type GuideTarget } from '../content/levels/ban-banh-luoi-guide';
import type { ConfirmedBanhLuoiRoute } from '../content/levels/ban-banh-luoi-route';

export interface BanhLuoiGuideOptions {
  route: ConfirmedBanhLuoiRoute;
  checkpoint: GuideCheckpoint;
  enabled: boolean;
  direction: number;
  interaction: number;
  onEvent: (event: GuideEvent) => void;
  onNear: (target: GuideTarget) => void;
  onSlope: () => void;
}
/** Temporary scene coordinates only. React owns route progression and saves. */
export class BanhLuoiGuideScene {
  private options: BanhLuoiGuideOptions;
  private key = '';
  private rover: Phaser.GameObjects.Graphics;
  private marks: Phaser.GameObjects.Graphics;
  private sent = false;
  private targetX?: number;
  private near: GuideTarget = null;
  private interaction = 0;
  private wasActive = false;
  private direction = 0;
  constructor(private scene: Phaser.Scene, private cuoi: Phaser.GameObjects.Sprite, private keys: Record<string, Phaser.Input.Keyboard.Key>, options: BanhLuoiGuideOptions) {
    this.options = options;
    banhLuoiScenery(scene);
    // Background is drawn after Cuội but always behind the sprites.
    this.rover = drawBanhLuoi(scene).setScale(.55).setDepth(5);
    this.marks = scene.add.graphics().setDepth(3);
    const pointer = (p: Phaser.Input.Pointer) => { if (this.active && p.y >= 280) this.targetX = Phaser.Math.Clamp(p.x, 310, 850); };
    scene.input.on('pointerdown', pointer);
    const visibility = () => this.release();
    document.addEventListener('visibilitychange', visibility);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => { scene.input.off('pointerdown', pointer); document.removeEventListener('visibilitychange', visibility); });
    this.set(options);
  }
  private get active() {
    return this.options.enabled && document.hasFocus() && !document.hidden && !!document.activeElement?.closest('.ban-guide-play') && !this.sent;
  }
  set(options: BanhLuoiGuideOptions) {
    this.options = options;
    const key = guideKey(options.route, options.checkpoint);
    if (key !== this.key) {
      const previous = this.key ? JSON.parse(this.key)[1] as GuideCheckpoint : null;
      const sameEdge = previous?.edgeIndex === options.checkpoint.edgeIndex;
      this.key = key;
      this.sent = false;
      this.release();
      const stage = options.checkpoint.stage;
      if (!sameEdge) {
        this.cuoi.setPosition(310, 431).setScale(.62).setFlipX(false);
        this.rover.setPosition(180, 431);
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) this.scene.cameras.main.fadeIn(180, 13, 20, 28);
      }
      // Restore an exact safe checkpoint when mounting after reload/back to route.
      if (!previous && stage === 'reportA') this.cuoi.x = 700;
      if (!previous && stage === 'callB') this.cuoi.x = 700;
      if (!previous && stage === 'travel' && options.checkpoint.completedStops.includes('B')) this.rover.x = this.cuoi.x - 130;
      if (stage === 'observeA' || stage === 'chooseB') {
        if (previous && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) this.scene.cameras.main.fadeIn(180, 13, 20, 28);
        this.cuoi.x = 310; this.rover.x = 180;
      }
      this.draw();
      this.near = null;
      this.options.onNear(null);
    }
    this.direction = options.direction;
    if (options.interaction !== this.interaction) { this.interaction = options.interaction; this.interact(); }
    if (!options.enabled) this.release();
  }
  release() {
    this.targetX = undefined;
    this.direction = 0;
    this.keys && Object.values(this.keys).forEach(key => key.reset());
    this.cuoi.anims.stop(); this.cuoi.setFrame('rest');
  }
  private emit(action: GuideAction) {
    if (this.sent) return;
    this.sent = true; this.release();
    this.options.onEvent({ key: this.key, action });
  }
  private target(): GuideTarget {
    const { stage } = this.options.checkpoint;
    const x = this.cuoi.x;
    if (stage === 'observeA' && Math.abs(x - 700) <= 48) return 'observe';
    if (stage === 'reportA' && Math.abs(x - (this.rover.x + 130)) <= 48) return 'report';
    if (stage === 'chooseB') {
      if (Math.abs(x - 500) <= 48) return 'slope';
      if (Math.abs(x - 700) <= 48) return 'flat';
    }
    return null;
  }
  interact() {
    if (!this.active) return;
    const target = this.target();
    if (target === 'observe') this.emit('observe');
    if (target === 'report') this.emit('report');
    if (target === 'flat') this.emit('choose');
    if (target === 'slope') { this.release(); this.options.onSlope(); }
  }
  update(delta: number) {
    const active = this.active;
    if (!active) { if (this.wasActive) this.release(); this.wasActive = false; return; }
    this.wasActive = true;
    const { checkpoint: p } = this.options;
    const distance = 165 * Math.min(delta, 50) / 1000;
    if (p.stage === 'callB') {
      this.rover.x = Math.min(this.cuoi.x - 130, this.rover.x + distance);
      if (this.rover.x >= this.cuoi.x - 130) this.emit('park');
      return;
    }
    const left = this.keys.left.isDown || this.keys.a.isDown, right = this.keys.right.isDown || this.keys.d.isDown;
    const keyDirection = left === right ? 0 : left ? -1 : 1;
    if (keyDirection || this.direction) this.targetX = undefined;
    const direction = keyDirection || this.direction || (this.targetX === undefined ? 0 : Math.sign(this.targetX - this.cuoi.x));
    const oldX = this.cuoi.x;
    const amount = this.targetX === undefined ? distance : Math.min(distance, Math.abs(this.targetX - oldX));
    this.cuoi.x = Phaser.Math.Clamp(oldX + direction * amount, 310, 850);
    if (this.targetX !== undefined && Math.abs(this.targetX - this.cuoi.x) < 1) this.targetX = undefined;
    if (p.stage === 'travel') this.rover.x += this.cuoi.x - oldX;
    if (Math.abs(this.cuoi.x - oldX) > .01) {
      this.cuoi.setFlipX(direction < 0);
      if (!this.cuoi.anims.isPlaying) this.cuoi.play('cuoi-walk');
    } else { this.cuoi.anims.stop(); this.cuoi.setFrame('rest'); }
    const target = this.target();
    if (target !== this.near) { this.near = target; this.options.onNear(target); }
    if (p.stage === 'travel' && this.cuoi.x >= 790 && this.rover.x >= 660) this.emit('arrive');
  }
  private draw() {
    const g = this.marks.clear(), p = this.options.checkpoint;
    const stop = guideStop(this.options.route, p);
    // Flat foreground lane; all rocks are behind it, not collision obstacles.
    g.fillStyle(0x727c7b).fillRect(0, 390, 960, 150);
    for (let i = 0; i < 70; i++) g.fillStyle(0x46555b, .6).fillRect(i * 14, 440 + i % 3 * 3, 6, 3);
    const flag = (x: number, y: number, color = 0xe4cb91) => {
      g.lineStyle(4, color).lineBetween(x, y - 52, x, y);
      g.fillStyle(color).fillTriangle(x, y - 52, x + 25, y - 43, x, y - 34);
    };
    flag(820, 395);
    if (stop === 'A' || ['observeA', 'reportA'].includes(p.stage)) {
      g.fillStyle(0x3c4e55).fillPoints([{x:540,y:378},{x:575,y:292},{x:640,y:278},{x:689,y:378}], true);
      g.fillStyle(0x9ba394).fillTriangle(575,292,640,278,611,350);
      flag(700, 405);
      if (p.stage === 'reportA') {
        g.lineStyle(6, 0xe9cd90).lineBetween(710, 382, 800, 382).lineBetween(780, 370, 800, 382).lineBetween(780, 394, 800, 382);
      }
    }
    if (stop === 'B' || ['chooseB', 'callB'].includes(p.stage)) {
      g.fillStyle(0x56686c).fillTriangle(445, 389, 535, 350, 550, 389);
      g.lineStyle(4, 0xe4c495).lineBetween(445, 389, 535, 350);
      g.fillStyle(0xa3aa97).fillRect(645, 373, 120, 16);
      g.lineStyle(4, 0xe4d5af).lineBetween(645, 373, 765, 373);
      if (p.stage === 'callB') flag(700, 373);
    }
    if (p.completedStops.includes('A') && p.completedStops.includes('B') && p.edgeIndex === this.options.route.cells.length - 2) {
      g.fillStyle(0xb5a17a).fillRect(770, 300, 90, 65);
      g.fillStyle(0xd5ceae).fillRect(785, 270, 60, 33);
      g.lineStyle(5, 0xd5ceae).lineBetween(780, 350, 745, 390).lineBetween(850, 350, 885, 390);
    }
  }
}
