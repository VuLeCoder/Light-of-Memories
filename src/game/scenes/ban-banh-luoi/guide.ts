import Phaser from 'phaser';
import { drawSoilStop } from './soil';
import { drawRockStop } from './rock';
import { banhLuoiScenery, drawBanhLuoi } from './scenery';
import { isCorrectRockForce, guideKey, guideStop, type GuideCheckpoint, type GuideEvent } from '../../../content/friends/ban-banh-luoi/challenges/guide';
import type { ConfirmedBanhLuoiRoute } from '../../../content/friends/ban-banh-luoi/challenges/route';

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
  private groundMarks: Phaser.GameObjects.Graphics;
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
    // Ground marks must stay beneath both the rover and Cuội.
    this.groundMarks = scene.add.graphics().setDepth(3);
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
    this.drawGroundMarks();
    if (!options.enabled) this.release();
  }
  private drawGroundMarks() {
    const g = this.groundMarks.clear();
    // Rest frame has four transparent pixels below the soles (at scale .62).
    const footY = this.cuoi.y - 2.5;
    g.fillStyle(0x293e45, .4).fillEllipse(this.cuoi.x - 20, footY + 3, 86, 12);
    g.fillStyle(0x26383d, .7).fillEllipse(this.cuoi.x, footY, 48, 5);
    // Small contact shadows under the near wheels anchor the existing cast shadow.
    for (const x of [-94, 123]) {
      g.fillStyle(0x26383d, .75).fillEllipse(this.rover.x + x * .55, this.rover.y + 2, 23, 4);
    }
    const p = this.options.checkpoint;
    if (!['atA', 'atB'].includes(p.stage)) return;
    const carrying = (p.stage === 'atB' ? p.soil : p.rock) === 'carrying';
    const x = carrying ? 180 : p.stage === 'atB' ? [460, 620, 780][Math.max(0, this.patch())] : 700;
    g.lineStyle(1, this.near() ? 0xf1d494 : 0xadb7a5, .65)
      .strokeEllipse(x, carrying ? 434 : 429, carrying ? 100 : 90, 17);
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
    const success = this.active() && !this.options.controls?.cancelled && this.near() && isCorrectRockForce(this.options.checkpoint.rock, this.force);
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
    this.drawGroundMarks();
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
    if (swing?.success && swing.elapsed >= 240 && swing.elapsed < 520 && !reduced) {
      const t = (swing.elapsed - 240) / 280;
      // Small angular chips separate from the rock face and fall back to the ground.
      for (let i = 0; i < 6; i++) {
        const x = 693 + (i - 2.5) * 15 * t;
        const y = 399 - Math.sin(t * Math.PI) * (14 + i % 3 * 7) + 29 * t;
        const size = 3 + i % 3;
        g.fillStyle(i % 2 ? 0xb7b7a1 : 0x888d83, 1 - t * t)
          .fillTriangle(x - size, y + size / 2, x, y - size, x + size, y + size);
      }
    }
    if (swing && swing.elapsed >= 520) {
      this.swing = null;
      if (swing.success && !this.sent) {
        this.sent = true;
        this.options.onEvent({ key: this.key, action: 'hit' });
      } else this.missed = true;
    }
    if (!isB && rock === 'hitOnce') {
      g.lineStyle(2, 0x394345).lineBetween(709, 374, 693, 399).lineBetween(693, 399, 678, 411);
    }
    if (!isB && ['loose', 'carrying', 'stored'].includes(rock)) {
      // Keep the open, branching fracture visible after the sample has been picked up.
      g.lineStyle(5, 0x273438).lineBetween(732, 344, 716, 369).lineBetween(716, 369, 731, 390)
        .lineBetween(731, 390, 716, 411).lineBetween(716, 411, 699, 420)
        .lineBetween(716, 369, 700, 355).lineBetween(731, 390, 751, 387);
      g.lineStyle(1, 0xd2cfb6).lineBetween(735, 345, 719, 369).lineBetween(719, 369, 734, 390)
        .lineBetween(734, 390, 719, 412);
      g.fillStyle(0x273438).fillTriangle(674, 416, 699, 420, 684, 407);
    }
    if (!isB && rock === 'loose') {
      g.fillStyle(0x293b40, .7).fillEllipse(692, 433, 36, 7);
      g.fillStyle(0xb7b7a1).fillTriangle(680, 429, 691, 417, 702, 429);
      g.lineStyle(2, 0x444f4c).strokeTriangle(680, 429, 691, 417, 702, 429);
      g.fillStyle(0x888d83).fillTriangle(691, 417, 691, 429, 702, 429);
    }
    if (rock === 'carrying') {
      const x = this.cuoi.x + (facing > 0 ? 14 : -34);
      g.fillStyle(0xd7c798).fillRect(x, 388, 20, 25);
      g.lineStyle(2, 0x695e48).strokeRect(x, 388, 20, 25);
    }
    const near = this.near();

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
    this.drawGroundMarks();
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
