import Phaser from 'phaser';
import { drawSoilStop } from './banh-luoi-soil';
import { drawRockStop } from './banh-luoi-rock';
import { banhLuoiScenery, drawBanhLuoi } from './banh-luoi-scenery';
import { guideKey, guideStop, type GuideCheckpoint, type GuideEvent } from '../content/levels/ban-banh-luoi-guide';
import type { ConfirmedBanhLuoiRoute } from '../content/levels/ban-banh-luoi-route';

export interface RockControls { direction: number; action: boolean; cancelled: boolean }
export interface RockFeedback { near: boolean; force: number; holding: boolean; missed: boolean }
export interface BanhLuoiGuideOptions {
  onObserve?: (observation: { patch: number; key: string }) => void;
  controls?: RockControls;
  onRockFeedback?: (feedback: RockFeedback) => void;
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
  private rockBackground: Phaser.GameObjects.Graphics;
  private soilBackground: Phaser.GameObjects.Graphics;
  private props: Phaser.GameObjects.Graphics;
  private hammer: Phaser.GameObjects.Graphics;
  private swing: { elapsed: number; force: number; success: boolean } | null = null;
  private holding = false;
  private force = 0;
  private missed = false;
  private touchDown = false;
  private lastFeedback = '';
  private target: number | null = null;
  constructor(scene: Phaser.Scene, private cuoi: Phaser.GameObjects.Sprite, private keys: Record<string, Phaser.Input.Keyboard.Key>, options: BanhLuoiGuideOptions) {
    this.options = options;
    banhLuoiScenery(scene);
    this.rockBackground = drawRockStop(scene).setVisible(false);
    this.soilBackground = drawSoilStop(scene).setVisible(false);
    this.props = scene.add.graphics().setDepth(11);
    // Match Mắt Tròn's shovel: outlined wood, blue-grey metal and ivory highlights.
    this.hammer = scene.add.graphics().setDepth(12).setVisible(false);
    this.hammer.lineStyle(7, 0x493e32).lineBetween(0, 3, 0, -39);
    this.hammer.lineStyle(4, 0xb58a52).lineBetween(-1, 2, -1, -39);
    this.hammer.lineStyle(1, 0xd2b27c).lineBetween(-2, -5, -2, -34);
    this.hammer.fillStyle(0x899b9d).fillRect(-15, -48, 30, 14);
    this.hammer.lineStyle(2, 0x35494f).strokeRect(-15, -48, 30, 14);
    this.hammer.fillStyle(0xc6d0c8).fillRect(-14, -47, 28, 4);
    this.hammer.fillStyle(0x60777d).fillRect(-14, -37, 28, 2);
    this.hammer.lineStyle(1, 0xe5e4cd).lineBetween(-13, -47, 13, -47);
    const up = () => this.finishHold();
    scene.input.keyboard?.on('keyup-E', up);
    const pointer = (p: Phaser.Input.Pointer) => { if (this.active() && ['atA', 'atB'].includes(this.options.checkpoint.stage)) this.target = Phaser.Math.Clamp(p.x, 100, 850); };
    scene.input.on('pointerdown', pointer);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => { scene.input.keyboard?.off('keyup-E', up); scene.input.off('pointerdown', pointer); });
    this.rover = drawBanhLuoi(scene).setScale(.55).setDepth(5);
    this.set(options);
  }
  set(options: BanhLuoiGuideOptions) {
    const previous = this.options;
    this.options = options;
    const key = guideKey(options.route, options.checkpoint);
    if (key !== this.key) {
      const first = !this.key;
      this.key = key;
      this.sent = false;
      this.elapsed = 0;
      const entering = first || previous.checkpoint.stage !== options.checkpoint.stage || previous.checkpoint.routeKey !== options.checkpoint.routeKey;
      if (entering) this.cuoi.setPosition(310, 431).setFlipX(false);
      if (first && options.checkpoint.stage === 'atA') this.cuoi.x = 655;
      this.cuoi.setScale(.62);
      this.rockBackground.setVisible(options.checkpoint.stage === 'atA');
      this.soilBackground.setVisible(options.checkpoint.stage === 'atB');
      this.rover.setPosition(180, 431);
      this.release();
    }
    if (!options.enabled) this.release();
  }
  release() {
    this.swing = null;
    this.hammer.setVisible(false);
    this.holding = false;
    this.force = 0;
    this.target = null;
    if (this.options.controls) { this.options.controls.action = false; this.options.controls.direction = 0; }
    this.touchDown = false;
    Object.values(this.keys).forEach(key => key.reset());
    this.cuoi.anims.stop();
    this.cuoi.setFrame('rest');
  }
  private active() {
    return this.options.enabled && !document.hidden && document.hasFocus() && !!document.activeElement?.closest('.ban-guide-play');
  }
  private patch() { return [460, 620, 780].findIndex(x => Math.abs(this.cuoi.x - x) <= 48); }
  private near() {
    if (this.options.checkpoint.stage === 'atB') return this.options.checkpoint.soil === 'carrying' ? Math.abs(this.cuoi.x - 180) <= 48 : this.patch() >= 0;
    return Math.abs(this.cuoi.x - (this.options.checkpoint.rock === 'carrying' ? 180 : 700)) <= 48;
  }
  interact() {
    if (!this.active() || this.sent || this.swing || !['atA', 'atB'].includes(this.options.checkpoint.stage) || !this.near()) return;
    if (this.options.checkpoint.stage === 'atB') {
      this.target = null;
      if (this.options.checkpoint.soil === 'carrying') { this.sent = true; this.options.onEvent({ key: this.key, action: 'store' }); }
      else if (!this.holding) { this.holding = true; this.force = 0; }
      return;
    }
    const rock = this.options.checkpoint.rock;
    this.target = null;
    if (rock === 'loose' || rock === 'carrying') {
      this.sent = true;
      this.options.onEvent({ key: this.key, action: rock === 'loose' ? 'pickRock' : 'store' });
    } else if (!this.holding) { this.cuoi.setFlipX(this.cuoi.x > 700); this.holding = true; this.force = 0; this.missed = false; }
  }
  private finishHold() {
    if (!this.holding) return;
    if (this.options.checkpoint.stage === 'atB') { this.holding = false; this.force = 0; return; }
    const success = this.active() && !this.options.controls?.cancelled && this.near() && this.force >= .35 && this.force <= .8;
    this.holding = false;
    if (this.active() && !this.options.controls?.cancelled && !this.sent) {
      this.swing = { elapsed: 0, force: this.force, success };
    }
    this.force = 0;
  }
  private rockUpdate(delta: number) {
    const control = this.options.controls;
    if (control?.cancelled) { this.release(); control.cancelled = false; }
    if (control?.action && !this.touchDown) { this.interact(); this.touchDown = true; }
    else if (!control?.action && this.touchDown) { this.finishHold(); this.touchDown = false; }
    let direction = (this.keys.right.isDown || this.keys.d.isDown ? 1 : 0) - (this.keys.left.isDown || this.keys.a.isDown ? 1 : 0) || control?.direction || 0;
    if (direction) this.target = null;
    if (!direction && this.target !== null) { direction = Math.sign(this.target - this.cuoi.x); if (Math.abs(this.target - this.cuoi.x) < 5) { this.target = null; direction = 0; } }
    if (!this.holding && !this.swing && direction) {
      this.cuoi.x = Phaser.Math.Clamp(this.cuoi.x + direction * Math.min(delta, 50) * .23, 100, 850);
      this.cuoi.setFlipX(direction < 0);
      if (!this.cuoi.anims.isPlaying) this.cuoi.play('cuoi-walk');
      this.missed = false;
    } else { this.cuoi.anims.stop(); this.cuoi.setFrame('rest'); }
    if (this.holding) this.force = Math.min(1, this.force + delta / 1600);
    const isB = this.options.checkpoint.stage === 'atB';
    if (isB && this.holding && this.force >= .7 / 1.6) {
      const patch = this.patch();
      this.release();
      if (patch >= 0) this.options.onObserve?.({ patch, key: this.key });
    }
    const g = this.props.clear(), rock = isB ? this.options.checkpoint.soil : this.options.checkpoint.rock;
    const facing = this.cuoi.flipX ? -1 : 1;
    g.fillStyle(0x293e45, .6).fillEllipse(this.cuoi.x - 15, 435, 65, 10);
    // Wind up around the hand, strike, then recover before accepting another action.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const swing = this.swing;
    if (swing) swing.elapsed += Math.min(delta, 50);
    const ready = !isB && (rock === 'untouched' || rock === 'hitOnce');
    let angle = this.holding ? -.25 - this.force * .9 : .3;
    if (swing) {
      const raised = -.25 - swing.force * .9;
      const down = Math.min(1, swing.elapsed / 240);
      angle = swing.elapsed < 240 ? raised + (1.8 - raised) * down * down
        : 1.8 - 1.5 * Phaser.Math.Clamp((swing.elapsed - 320) / 200, 0, 1);
      if (reduced) angle = .8;
    }
    this.hammer.setVisible(ready).setPosition(this.cuoi.x + 16 * facing, 393)
      .setScale(facing, 1).setRotation(angle * facing);
    if (swing && swing.elapsed >= 240 && swing.elapsed < 440 && !reduced) {
      const spread = (swing.elapsed - 240) / 200;
      const x = this.cuoi.x + 56 * facing;
      for (let i = 0; i < 4; i++) {
        g.fillStyle(swing.success ? 0xc6d0c8 : 0x899b9d, 1 - spread)
          .fillRect(x + (i - 1.5) * (5 + spread * 12), 402 - Math.sin(spread * Math.PI) * (8 + i * 3), 3, 3);
      }
    }
    if (swing && swing.elapsed >= 520) {
      this.swing = null;
      if (swing.success && !this.sent) {
        this.sent = true;
        this.options.onEvent({ key: this.key, action: 'hit' });
      } else this.missed = true;
    }
    if (rock === 'hitOnce' || rock === 'loose') g.lineStyle(3, 0x394e52).lineBetween(693, 399, 671, 413);
    if (rock === 'loose') g.fillStyle(0xe0d5b5).fillTriangle(680, 429, 691, 417, 702, 429);
    if (rock === 'carrying') {
      const x = this.cuoi.x + (facing > 0 ? 14 : -34);
      g.fillStyle(0xd7c798).fillRect(x, 388, 20, 25);
      g.lineStyle(2, 0x695e48).strokeRect(x, 388, 20, 25);
    }
    const near = this.near();
    g.lineStyle(2, near ? 0xf1d494 : 0xadb7a5, .8).strokeEllipse(rock === 'carrying' ? 180 : isB ? [460, 620, 780][Math.max(0, this.patch())] : 700, 443, 75, 12);
    const feedback = { near, force: Math.round(this.force * 100) / 100, holding: this.holding, missed: this.missed };
    const key = JSON.stringify(feedback);
    if (key !== this.lastFeedback) { this.lastFeedback = key; this.options.onRockFeedback?.(feedback); }
  }
  update(delta: number) {
    if (!this.active()) {
      this.release();
      return;
    }
    if (['atA', 'atB'].includes(this.options.checkpoint.stage)) { this.rockUpdate(delta); return; }
    this.props.clear();
    this.hammer.setVisible(false);
    if (this.sent || this.options.checkpoint.stage !== 'travel') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Give each route edge time to read, including the turn after storing a sample.
    this.elapsed += Math.min(delta, 50);
    const fraction = reduced ? 1 : Math.min(1, this.elapsed / 400);
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
    // The unfolded route always travels right, even after returning left to the rover.
    this.cuoi.setFlipX(false);
    if (!reduced && !this.cuoi.anims.isPlaying) this.cuoi.play('cuoi-walk');
    if (fraction === 1) {
      this.sent = true;
      this.release();
      this.options.onEvent({ key: this.key, action: 'arrive', nodeIndex: this.options.checkpoint.nodeIndex + 1 });
    }
  }
}
