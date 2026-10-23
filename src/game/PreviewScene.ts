import { taiThinhScenery, taiThinhLayout, drawTaiThinhDevice, drawTaiThinhRipple } from './tai-thinh-scenery';
import { digSites } from '../content/levels/surveyor-dig';
import type { SurveyorEvent } from '../content/levels/surveyor-progress';
import Phaser from 'phaser';
import { cuoiSleepFrame, cuoiWakeFrames, cuoiWalkFrames, spriteSources } from '../content/assets';
import { cacheScenery, earthScenery, moonScenery } from './scenery';
import { VIEW, type PreviewOptions } from './types';
import { surveyorScenery, surveyorGroundY, surveyorEncounter } from './surveyor-scenery';
import { sparkleScenery } from './sparkle-scenery';
import { surveyorEncounterCopy } from '../content/levels/surveyor-encounter';
import { copy, type Language } from '../content/i18n';

export class PreviewScene extends Phaser.Scene {
  private options: PreviewOptions;
  private interactionRegion = new Phaser.Geom.Rectangle(444, 350, 153, 88);
  private failedAssets: string[] = [];
  private cuoi?: Phaser.GameObjects.Sprite;
  private moonMode: PreviewOptions['moonMode'];
  private keys?: Record<'left' | 'right' | 'up' | 'down' | 'w' | 's' | 'a' | 'd', Phaser.Input.Keyboard.Key>;
  private walkTarget?: number;
  private earnedLight?: Phaser.GameObjects.Graphics;
  private digTarget?: { x: number; y: number };
  private digNear: SurveyorEvent | null = null;
  private digMarks?: Phaser.GameObjects.Graphics;
  private digShadow?: Phaser.GameObjects.Ellipse;
  private shovel?: Phaser.GameObjects.Graphics;
  setExcavation(value: PreviewOptions['excavation']) {
    const entering = !this.options.excavation && value;
    this.options.excavation = value;
    if (entering && this.cuoi) { this.cuoi.setPosition(520, 455); this.releaseControls(); }
    this.drawDigMarks();
    if (!value) { this.digShadow?.setVisible(false); this.shovel?.setVisible(false); }
  }
  private drawDigMarks() {
    if (!this.digMarks) return;
    this.digMarks.clear();
    if (!this.options.excavation) return;
    for (const site of digSites) {
      const { x, y, id } = site;
      const g = this.digMarks;
      const found = this.options.excavation.found.includes(id);
      // Soft depressions and raised rims follow the ground's perspective.
      if (found) {
        g.fillStyle(0x273940, .5).fillEllipse(x, y + 2, 40, 15);
        g.fillStyle(0x172a32, .5).fillEllipse(x, y, 28, 9);
        g.lineStyle(1, 0xb7b9a2, .6).beginPath().arc(x, y, 20, .15, 2.9).strokePath();
      } else if (id === 'arrive') {
        for (const offset of [-17, 14]) {
          const py = y - (offset > 0 ? 5 : 0);
          g.fillStyle(0x263a42, .45).fillEllipse(x + offset, py, 24, 10);
          g.fillStyle(0x172b34, .35).fillEllipse(x + offset, py - 1, 17, 5);
          g.lineStyle(1, 0xc2c2a7, .65).lineBetween(x + offset - 9, py + 4, x + offset + 8, py + 4);
        }
      } else if (id === 'work') {
        for (let i = 0; i < 3; i++) {
          const py = y - 8 + i * 8;
          g.lineStyle(5, 0x263a42, .5).lineBetween(x - 20, py, x + 20, py - 5);
          g.lineStyle(1, 0xc8c5a7, .6).lineBetween(x - 19, py + 3, x + 20, py - 2);
          g.fillStyle(0x8f9b94, .8).fillEllipse(x + 24, py - 3, 5, 3);
        }
      } else {
        for (let i = 0; i < 6; i++) {
          const px = x - 28 + i * 11, py = y + (i % 2) * 8 - 6;
          g.fillStyle(0x263a42, .65).fillEllipse(px, py, 9, 5).fillEllipse(px - 5, py + 1, 3, 4);
          g.lineStyle(1, 0xb6b9a2, .55).lineBetween(px - 2, py + 3, px + 3, py + 2);
        }
      }
      if (this.options.excavation.clues.includes(id) && !found) {
        g.fillStyle(0xffd689, .07).fillEllipse(x, y, 76, 30);
        // Four short glints frame the trace without obscuring it with a ring.
        g.lineStyle(1.5, 0xf5d798, .85);
        for (const side of [-1, 1]) {
          g.lineBetween(x + side * 29, y - 13, x + side * 37, y - 9);
          g.lineBetween(x + side * 29, y + 13, x + side * 37, y + 9);
        }
        g.fillStyle(0xffe5ad).fillPoints([{x,y:y-31},{x:x+3,y:y-25},{x:x+7,y:y-23},{x:x+3,y:y-21},{x,y:y-15},{x:x-3,y:y-21},{x:x-7,y:y-23},{x:x-3,y:y-25}], true);
      }
    }
  }
  setFreeRoam(value: boolean) {
    const replayingEnding = this.options.freeRoam && !value;
    this.options.freeRoam = value;
    this.releaseControls();
    if (replayingEnding && this.cuoi && (this.options.scene !== 'lap-lanh' || this.options.sparkleEnding)) {
      const sparkle = this.options.scene === 'lap-lanh';
      const tai = this.options.scene === 'tai-thinh';
      const x = tai ? (this.options.encounterStarted ? 430 : 140) : sparkle ? 340 : surveyorEncounter.x - 80;
      this.cuoi.setPosition(x, sparkle || tai ? 431 : surveyorGroundY(x)).setScale(.62).setFlipX(false).setDepth(10);
      this.setCuoiFrame('rest');
      this.digShadow?.setVisible(false);
      this.exitTriggered = false;
    }
  }
  private updateExcavation(time: number, delta: number) {
    if (!this.cuoi || !this.keys || (!this.options.excavation && !this.options.freeRoam)) return;
    const c = this.cuoi, k = this.keys;
    let dx = Number(k.right.isDown || k.d.isDown) - Number(k.left.isDown || k.a.isDown);
    let dy = Number(k.down.isDown || k.s.isDown) - Number(k.up.isDown || k.w.isDown);
    if (dx || dy) this.digTarget = undefined;
    if (this.digTarget) { dx = this.digTarget.x - c.x; dy = this.digTarget.y - c.y; }
    const length = Math.hypot(dx, dy);
    const scale = .34 + (c.y - 265) / 235 * .42;
    if (this.moonMode === 'free' && length > .5) {
      const step = Math.min(160 * (scale / .62) * Math.min(delta, 50) / 1000, this.digTarget ? length : Infinity);
      c.x = Phaser.Math.Clamp(c.x + dx / length * step, 65, 895);
      c.y = Phaser.Math.Clamp(c.y + dy / length * step, 265, 500);
      if (dx) c.setFlipX(dx < 0);
      if (!c.anims.isPlaying) c.play('cuoi-walk');
    } else { this.setCuoiFrame('rest'); if (length <= 1) this.digTarget = undefined; }
    c.setScale(scale).setDepth(c.y);
    this.digShadow?.setVisible(true).setPosition(c.x, c.y + 1).setScale(scale / .62).setDepth(c.y - 1);
    this.shovel?.setVisible(!!this.options.excavation).setPosition(c.x + (c.flipX ? -22 : 22) * scale / .62, c.y - 18 * scale / .62).setScale((c.flipX ? -1 : 1) * scale / .62, scale / .62).setDepth(c.y + 2).setRotation(this.options.excavation?.digging ? Math.sin(time / 130) * .6 : -.3);
    const near = this.options.excavation ? digSites.find(site => !this.options.excavation!.found.includes(site.id) && Math.hypot(c.x - site.x, c.y - site.y) < 43)?.id ?? null : null;
    if (this.options.freeRoam && this.moonMode === 'free' && Math.hypot(c.x - 880, c.y - 275) < 38 && !this.exitTriggered) {
      this.exitTriggered = true;
      this.setMoonMode('story');
      this.options.onExit();
    }
    if (near !== this.digNear) { this.digNear = near; this.options.onDigNear?.(near); }
    this.interactionHint?.setVisible(false);
  }
  private ripple?: Phaser.GameObjects.Graphics;
  private rippleTime = 0;
  private awake = false;
  private pendingInteraction = false;
  private exitTriggered = false;
  private interactionHint?: Phaser.GameObjects.Text;
  private treeGlow?: Phaser.GameObjects.Graphics;
  private lantern?: Phaser.GameObjects.Graphics;
  private trailHighlight?: Phaser.GameObjects.Graphics;
  private trailHint?: Phaser.GameObjects.Text;

  setQuest(quest: PreviewOptions['quest'], treeSpeaking: boolean) {
    this.options.quest = quest;
    this.options.treeSpeaking = treeSpeaking;
    this.treeGlow?.setVisible(treeSpeaking);
    this.lantern?.setVisible(this.options.scene !== 'surveyor' && this.options.scene !== 'lap-lanh' && ['lantern', 'trail', 'complete'].includes(quest));
    const showTrail = quest === 'lantern' || quest === 'trail';
    this.trailHighlight?.setVisible(showTrail);
    this.trailHint?.setVisible(showTrail);
  }

  private get interactionX() { if (this.options.scene === 'tai-thinh') return 520; if (this.options.scene === 'lap-lanh') return 480; return this.options.scene === 'surveyor' ? surveyorEncounter.x : 520; }
  private get canInteract() { return this.options.scene === 'tai-thinh' ? !this.options.taiEnding || this.options.taiEnding === 'none' : this.options.scene === 'lap-lanh' ? !this.options.sparkleEnding : (this.options.scene === 'surveyor' && !this.options.excavation && !this.options.freeRoam) || this.options.quest === 'bench'; }
  setSparkleEnding(value: boolean) {
    const entering = value && !this.options.sparkleEnding;
    this.options.sparkleEnding = value;
    if (entering && this.cuoi) {
      this.releaseControls();
      this.cuoi.setPosition(340, 431).setScale(.62).setFlipX(false);
    }
  }
  private taiGiftTime = 0;
  private taiGiftLight?: Phaser.GameObjects.Graphics;
  setTaiEnding(value: PreviewOptions['taiEnding'], stars = 0) {
    const entering = value && value !== 'none' && (!this.options.taiEnding || this.options.taiEnding === 'none');
    if (value !== this.options.taiEnding) this.taiGiftTime = 0;
    this.options.taiEnding = value;
    this.options.taiStars = stars;
    if (entering && this.cuoi) {
      this.releaseControls();
      this.cuoi.setPosition(430, 431).setScale(.62).setFlipX(false).setDepth(10);
      this.setCuoiFrame('rest');
    }
    this.drawTaiLight();
    this.syncLanternGrip();
  }
  private drawTaiLight() {
    if (this.options.scene !== 'tai-thinh' || !this.earnedLight) return;
    const g = this.earnedLight.clear();
    const count = this.options.taiStars ?? 0;
    for (let i = 0; i < count; i++) {
      const at = (n: number, r: number) => ({ x: Math.cos(-Math.PI / 2 + n * Math.PI / 5) * r, y: Math.sin(-Math.PI / 2 + n * Math.PI / 5) * r });
      const tip = at(i * 2, 21), before = at(i * 2 - 1, 9), after = at(i * 2 + 1, 9);
      g.fillStyle(0xffe6a2).fillTriangle(0, 0, before.x, before.y, tip.x, tip.y).fillTriangle(0, 0, tip.x, tip.y, after.x, after.y);
    }
  }
  private updateTaiGift(delta: number) {
    if (this.options.scene !== 'tai-thinh' || !this.taiGiftLight) return;
    const g = this.taiGiftLight.clear();
    if (this.options.taiEnding !== 'gifting' || !this.lantern) return;
    if (this.moonMode !== 'paused') this.taiGiftTime += Math.min(delta, 50);
    const t = Math.min(1, this.taiGiftTime / 1400);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const x = reduced ? this.lantern.x : Phaser.Math.Linear(taiThinhLayout.pse.x, this.lantern.x, t);
    const y = reduced ? this.lantern.y : Phaser.Math.Linear(taiThinhLayout.pse.y - 69, this.lantern.y, t) - Math.sin(t * Math.PI) * 45;
    g.fillStyle(0xffdf91, .12).fillCircle(x, y, 17).fillStyle(0xffe6a2, .95).fillCircle(x, y, 4).setDepth(12);
    if (t >= 1) { g.clear(); this.options.onTaiGift?.(); }
  }
  private trailDecor?: Phaser.GameObjects.Graphics;
  private trailTarget?: { x: number; y: number };
  private trailContact = false;
  private readonly trailHoles = [
    { x: 280, y: 425, rx: 78, ry: 34 },
    { x: 430, y: 345, rx: 65, ry: 25 },
    { x: 485, y: 516, rx: 118, ry: 62 },
    { x: 640, y: 416, rx: 83, ry: 35 },
    { x: 795, y: 310, rx: 51, ry: 18 },
    { x: 230, y: 315, rx: 54, ry: 20 },
  ];
  setSparkleTrail(value: boolean) {
    const entering = value && !this.options.sparkleTrail;
    this.options.sparkleTrail = value;
    this.trailDecor?.setVisible(value);
    if (entering && this.cuoi) {
      this.releaseControls();
      this.trailContact = false;
      this.cuoi.setPosition(140, 431).setFlipX(false);
      this.setCuoiFrame('rest');
    }
    this.syncTrailPerspective();
  }
  private syncTrailPerspective() {
    if (!this.cuoi) return;
    // Keep the feet anchored; the starting row retains Cuội's usual size.
    const distance = Phaser.Math.Clamp((this.cuoi.y - 280) / (515 - 280), 0, 1);
    this.cuoi.setScale(this.options.sparkleTrail ? Phaser.Math.Linear(.4, .7424, distance) : .62);
  }
  private createTrailRoute() {
    const g = this.trailDecor = this.add.graphics().setDepth(2);
    const crater = (x: number, y: number, w: number, h: number) => {
      g.fillStyle(0xb2b1a5, .7).fillEllipse(x, y, w, h);
      g.fillStyle(0x505c61).fillEllipse(x + 1, y - 2, w - 5, h - 4);
      g.fillStyle(0x829093).fillEllipse(x + w * .12, y + h * .1, w * .67, h * .48);
    };
    crater(105, 212, 43, 9); crater(480, 205, 26, 7); crater(874, 251, 63, 13);
    crater(285, 283, 54, 12); crater(130, 342, 76, 18);
    crater(91, 496, 139, 31); crater(890, 504, 152, 34);
    // Draw far to near. Broad, flattened rims share the ground's muted palette;
    // the foreground crater extends beyond the frame and closes the bottom shortcut.
    for (const { x, y, rx, ry } of [...this.trailHoles].sort((a, b) => a.y - b.y)) {
      const contour = (scale: number, offsetY = 0) => Array.from({ length: 32 }, (_, i) => {
        const angle = i / 32 * Math.PI * 2;
        const roughness = 1 + .025 * Math.sin(i * 2.7 + x) + .018 * Math.cos(i * 1.9);
        return { x: x + Math.cos(angle) * rx * scale * roughness,
          y: y + offsetY + Math.sin(angle) * ry * scale * roughness };
      });
      g.fillStyle(0x34464e, .18).fillPoints(contour(1.16, ry * .12), true);
      g.fillStyle(0x84908f).fillPoints(contour(1.08), true);
      g.fillStyle(0xadb0a3, .72).fillPoints(contour(1.02, -ry * .06), true);
      g.fillStyle(0x43545c).fillPoints(contour(.94), true);
      g.fillStyle(0x30434c).fillPoints(contour(.78, -ry * .08), true);
      g.fillStyle(0x253740, .7).fillPoints(contour(.57, -ry * .15), true);
      // Sunlit inner slope and broken near lip, avoiding a hard outlined oval.
      const arc = (from: number, to: number, scale: number, offset: number) =>
        Array.from({ length: 17 }, (_, i) => {
          const angle = from + (to - from) * i / 16;
          return { x: x + Math.cos(angle) * rx * scale,
            y: y + Math.sin(angle) * ry * scale + offset };
        });
      g.lineStyle(Math.max(2, ry * .13), 0x748385, .85)
        .strokePoints(arc(.12, Math.PI - .15, .84, 0), false);
      g.lineStyle(Math.max(1, ry * .045), 0xc1bfae, .6)
        .strokePoints(arc(.28, Math.PI - .3, 1.03, 0), false);
      for (let i = 0; i < 7; i++) {
        const angle = .2 + i * .43;
        const px = x + Math.cos(angle) * rx * 1.13;
        const py = y + Math.sin(angle) * ry * 1.13;
        g.fillStyle(i % 2 ? 0x45585f : 0x9da59d, .5)
          .fillEllipse(px, py, rx * .055, ry * .065);
      }
    }
    for (let radius = 130; radius >= 20; radius -= 10) {
      g.fillStyle(0xffdf91, .025).fillEllipse(970, 408, radius * 2, radius * 1.6);
    }
    this.setSparkleTrail(!!this.options.sparkleTrail);
  }
  private updateTrail(delta: number) {
    if (!this.cuoi || !this.keys) return;
    this.interactionHint?.setVisible(false);
    if (this.moonMode !== 'free') return;
    if (document.activeElement?.matches('input, select, textarea')) return;
    let dx = Number(this.keys.right.isDown || this.keys.d.isDown) - Number(this.keys.left.isDown || this.keys.a.isDown);
    let dy = Number(this.keys.down.isDown || this.keys.s.isDown) - Number(this.keys.up.isDown || this.keys.w.isDown);
    if (dx || dy) this.trailTarget = undefined;
    if (this.trailTarget) {
      dx = this.trailTarget.x - this.cuoi.x;
      dy = this.trailTarget.y - this.cuoi.y;
    }
    const length = Math.hypot(dx, dy), step = Math.min(130 * Math.min(delta, 32) / 1000, this.trailTarget ? length : Infinity);
    const safe = (x: number, y: number) => !this.trailHoles.some(h => ((x - h.x) / h.rx) ** 2 + ((y - h.y) / h.ry) ** 2 < 1);
    const oldX = this.cuoi.x, oldY = this.cuoi.y;
    let blocked = false;
    if (length > .5) {
      const x = Phaser.Math.Clamp(oldX + dx / length * step, 35, 925);
      if (safe(x, oldY)) this.cuoi.x = x; else blocked = true;
      const y = Phaser.Math.Clamp(oldY + dy / length * step, 280, 515);
      if (safe(this.cuoi.x, y)) this.cuoi.y = y; else blocked = true;
    }
    this.syncTrailPerspective();
    if (blocked && !this.trailContact) {
      this.trailContact = true;
      this.releaseControls();
      this.setCuoiFrame('rest');
      this.setMoonMode('story');
      this.options.onTrailHole?.();
      return;
    }
    if (!blocked && length > .5) this.trailContact = false;
    const moved = Math.hypot(this.cuoi.x - oldX, this.cuoi.y - oldY) > .1;
    if (moved) {
      if (dx) this.cuoi.setFlipX(dx < 0);
      if (!this.cuoi.anims.isPlaying) this.cuoi.play('cuoi-walk');
    } else { this.setCuoiFrame('rest'); this.trailTarget = undefined; }
    if (this.cuoi.x >= 910) {
      this.setMoonMode('story');
      this.options.onInteract();
    }
  }
  setSparkleDust(value: boolean) {
    this.options.sparkleDust = value;
    this.sparkleSprite?.setTint(value ? 0x686054 : 0xffffff);
  }
  private sparkleSprite?: Phaser.GameObjects.Image;
  setEncounterStarted(value: boolean) {
    if (this.options.scene === 'tai-thinh' && !value && this.options.encounterStarted && this.cuoi) {
      this.releaseControls();
      this.cuoi.setPosition(140, 431).setScale(.62).setFlipX(false).setDepth(10);
      this.setCuoiFrame('rest');
    }
    this.options.encounterStarted = value;
    this.sparkleSprite?.setVisible(value);
    if (value && !this.options.sparkleTrail && this.cuoi && this.cuoi.x >= 900) {
      this.cuoi.setPosition(140, 431);
      this.releaseControls();
    }
  }
  private interactionLabel() { if (this.options.scene === 'tai-thinh') return this.options.language === 'vi' ? 'E · Quan sát cụm thiết bị' : 'E · Observe the instruments'; if (this.options.scene === 'lap-lanh') return this.options.language === 'vi' ? 'E · Trò chuyện với Lấp Lánh' : 'E · Talk to Sparkle'; return this.options.scene === 'surveyor' ? surveyorEncounterCopy[this.options.language].interact : copy[this.options.language].interactBench; }

  private interactNearby() {
    if (this.options.sparkleTrail || this.moonMode !== 'free' || !this.canInteract || !this.cuoi || Math.abs(this.cuoi.x - this.interactionX) > 90) return;
    this.pendingInteraction = false;
    this.walkTarget = undefined;
    this.setMoonMode('story');
    this.options.onInteract();
  }


  constructor(options: PreviewOptions) {
    super('preview');
    this.options = options;
    this.moonMode = options.moonMode;
  }

  releaseControls() {
    this.trailTarget = undefined;
    this.walkTarget = undefined;
    this.digTarget = undefined;
    this.pendingInteraction = false;
    this.input?.keyboard?.resetKeys();
    if (this.awake) this.setCuoiFrame('rest');
  }

  setLanguage(language: Language) {
    this.options.language = language;
    this.trailHint?.setText(copy[language].trailMarker);
    this.interactionHint?.setText(this.interactionLabel());
  }

  setMoonMode(mode: PreviewOptions['moonMode']) {
    if (this.moonMode === mode) return;
    this.moonMode = mode;
    this.trailTarget = undefined;
    this.walkTarget = undefined;
    this.pendingInteraction = false;
    this.digTarget = undefined;
    this.interactionHint?.setVisible(false);
    this.input?.keyboard?.resetKeys();
    if (!this.cuoi) return;
    if (mode === 'wake' && !this.awake) this.beginWake();
    else if (mode !== 'wake' && this.awake) this.setCuoiFrame('rest');
  }

  preload() {
    if (this.options.scene === 'lap-lanh') {
      this.load.image('sparkle', `${import.meta.env.BASE_URL}images/sprites/lap-lanh-idle.webp`);
    }
    const onLoadError = (file: Phaser.Loader.File) => this.failedAssets.push(file.key);
    this.load.on('loaderror', onLoadError);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.load.off('loaderror', onLoadError));
    for (const source of spriteSources) {
      const needed = this.options.scene === 'earth' ? source.key !== 'cuoi' : source.key === 'cuoi';
      if (needed) this.load.image(source.key, source.url);
    }
  }

  create() {
    for (const source of spriteSources) {
      if (!this.textures.exists(source.key)) continue;
      const f = source.frame;
      this.textures.get(source.key).add('rest', 0, f.x, f.y, f.width, f.height);
      if (source.key === 'cuoi') {
        const sleep = cuoiSleepFrame;
        this.textures.get(source.key).add('sleep', 0, sleep.x, sleep.y, sleep.width, sleep.height);
        cuoiWakeFrames.forEach((frame, index) => this.textures.get(source.key).add(`wake-${index}`, 0, frame.x, frame.y, frame.width, frame.height));
        cuoiWalkFrames.forEach((frame, index) => this.textures.get(source.key).add(`walk-${index}`, 0, frame.x, frame.y, frame.width, frame.height));
      }
    }
    if (this.options.scene === 'earth') {
      cacheScenery(this, earthScenery);
      this.addCharacter('ba', 188, 410, 0.49);
      // Align An's seated hips with the porch edge (y=425), feet on the lower step.
      this.addCharacter('an', 313, 465, 0.37);
    } else {
      if (this.options.scene === 'tai-thinh') {
        cacheScenery(this, taiThinhScenery);
        for (const id of ['station', 'magnetometer', 'pse'] as const) {
          const at = taiThinhLayout[id];
          drawTaiThinhDevice(this, id, at.x, at.y);
        }
        this.ripple = this.add.graphics().setDepth(1);
        this.interactionRegion = new Phaser.Geom.Rectangle(410, 234, 500, 210);
      } else if (this.options.scene === 'lap-lanh') {
        cacheScenery(this, sparkleScenery);
        if (this.textures.exists('sparkle')) this.sparkleSprite = this.add.image(480, 431, 'sparkle').setOrigin(.5, 1).setDisplaySize(140, 140).setVisible(this.options.encounterStarted);
        this.interactionRegion = new Phaser.Geom.Rectangle(410, 291, 140, 140);
      } else if (this.options.scene === 'surveyor') {
        cacheScenery(this, surveyorScenery);
        const { x, y, width, height } = surveyorEncounter.region;
        this.interactionRegion = new Phaser.Geom.Rectangle(x, y, width, height);
      } else {
        cacheScenery(this, moonScenery);
        this.trailHighlight = this.add.graphics();
        for (let i = 0; i < 9; i++) {
          const x = 659 + i * 29, y = 435 - i * 3 + i % 2 * 10;
          this.trailHighlight.fillStyle(0xffdf91, 0.18).fillEllipse(x + 5, y + 2, 26, 16);
          this.trailHighlight.fillStyle(0xffdf91, .6).fillEllipse(x + 6, y + 2, 10, 5).fillEllipse(x - 1, y + 3, 4, 4);
          this.trailHighlight.lineStyle(1, 0x786c53, .7).lineBetween(x + 4, y, x + 4, y + 4);
        }
        this.trailHint = this.add.text(780, 353, copy[this.options.language].trailMarker, {
          fontFamily: 'Arial', fontSize: '22px', color: '#ffe3a1',
          backgroundColor: '#15232b', padding: { x: 12, y: 8 },
        }).setOrigin(0.5).setDepth(20);
        this.treeGlow = this.add.graphics().fillStyle(0xe4c987, 0.11).fillCircle(205, 300, 130).setVisible(false);
      }
      this.interactionHint = this.add.text(this.options.scene === 'tai-thinh' ? 520 : this.options.scene === 'lap-lanh' ? 480 : this.options.scene === 'surveyor' ? 705 : 520, this.options.scene === 'surveyor' ? 146 : 310, this.interactionLabel(), { fontFamily: 'Arial', fontSize: '22px', color: '#f5e4b6', backgroundColor: '#15232b', padding: { x: 12, y: 8 } }).setOrigin(0.5).setDepth(20).setVisible(false);
      this.setSparkleDust(!!this.options.sparkleDust);
      this.addMoonCuoi();
      if (this.options.scene === 'lap-lanh') this.createTrailRoute();
      this.lantern = this.add.graphics().setDepth(10);
      const points = Array.from({ length: 10 }, (_, i) => {
        const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 9 : 21;
        return { x: Math.cos(a) * r, y: Math.sin(a) * r };
      });
      // Unlit paper: no halo or luminous hub before a friend lights a point.
      const paper = [0x69533f, 0x584437, 0x746044, 0x604938, 0x796348];
      for (let i = 0; i < 10; i++) {
        const a = points[i], b = points[(i + 1) % 10];
        this.lantern.fillStyle(paper[Math.floor(i / 2)], .95).fillTriangle(0, 0, a.x, a.y, b.x, b.y);
      }
      this.lantern.lineStyle(3, 0x624226).strokePoints(points, true);
      this.lantern.lineStyle(1.2, 0xa58b60).strokePoints(points, true);
      for (let i = 0; i < 10; i += 2) this.lantern.lineBetween(0, 0, points[i].x, points[i].y);
      this.lantern.fillStyle(0x8c714c).fillCircle(0, 0, 3);
      this.lantern.lineStyle(3, 0x805634).lineBetween(0, 9, 0, 35);
      for (const x of [-12, 12]) {
        this.lantern.lineStyle(1, 0x9d855c).lineBetween(x, 15, x, 23);
        this.lantern.fillStyle(0x744333).fillRect(x - 2, 23, 4, 8);
        this.lantern.lineStyle(1, 0xa77b4b).lineBetween(x, 23, x, 33);
      }
      this.earnedLight = this.add.graphics();
      this.earnedLight.fillStyle(0xffdf91, .14).fillCircle(0, -12, 20);
      this.earnedLight.fillStyle(0xffe6a2).fillTriangle(0, 0, points[9].x, points[9].y, points[0].x, points[0].y);
      this.earnedLight.fillTriangle(0, 0, points[0].x, points[0].y, points[1].x, points[1].y);
      if (this.options.scene === 'lap-lanh') {
        this.earnedLight.fillTriangle(0, 0, points[1].x, points[1].y, points[2].x, points[2].y);
        this.earnedLight.fillTriangle(0, 0, points[2].x, points[2].y, points[3].x, points[3].y);
      }
      if (this.options.scene === 'tai-thinh') {
        this.taiGiftLight = this.add.graphics();
        this.drawTaiLight();
      }
      this.syncLanternGrip();
      // Follow the final animated pose and position, including direction changes.
      this.events.on(Phaser.Scenes.Events.POST_UPDATE, this.syncLanternGrip, this);
      this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
        this.events.off(Phaser.Scenes.Events.POST_UPDATE, this.syncLanternGrip, this);
      });
      this.setQuest(this.options.quest, this.options.treeSpeaking);
      if (this.options.scene === 'surveyor') {
        this.digMarks = this.add.graphics().setDepth(1);
        this.digShadow = this.add.ellipse(0, 0, 65, 12, 0x15232b, .45).setVisible(false);
        this.shovel = this.add.graphics().setVisible(false);
        this.shovel.lineStyle(6, 0x493e32).lineBetween(0, -27, 0, 5);
        this.shovel.lineStyle(3, 0xb58a52).lineBetween(-1, -27, -1, 5);
        this.shovel.lineStyle(3, 0x574637).strokeRoundedRect(-6, -36, 12, 11, 3);
        this.shovel.lineStyle(1, 0xd2b27c).lineBetween(-4, -34, 4, -34);
        const blade = [{x:-9,y:1},{x:9,y:1},{x:8,y:13},{x:3,y:19},{x:-3,y:19},{x:-8,y:13}];
        this.shovel.fillStyle(0x899b9d).fillPoints(blade, true);
        this.shovel.lineStyle(2, 0x35494f).strokePoints(blade, true);
        this.shovel.fillStyle(0xc6d0c8).fillTriangle(-7, 3, -6, 12, 0, 17);
        this.shovel.lineStyle(1, 0xe5e4cd).lineBetween(-7, 2, 7, 2);
        this.shovel.lineStyle(3, 0x60777d).lineBetween(0, 1, 0, 10);
        this.drawDigMarks();
      }
    }
    const onPointerDown = (pointer: Phaser.Input.Pointer) => {
      // Phaser Scale Manager converts CSS pixels to 960×540 scene coordinates.
      const x = Phaser.Math.Clamp(pointer.x, 0, VIEW.width);
      const y = Phaser.Math.Clamp(pointer.y, 0, VIEW.height);
      if (this.options.scene === 'earth' || this.moonMode !== 'free') return;
      if (this.options.sparkleTrail) { if (y >= 280 && y <= 530) this.trailTarget = { x: Phaser.Math.Clamp(x, 35, 925), y: Phaser.Math.Clamp(y, 280, 515) }; return; }
      if (this.options.excavation || (this.options.freeRoam && this.options.scene === 'surveyor')) { if (y >= 250) this.digTarget = { x: Phaser.Math.Clamp(x, 65, 895), y: Phaser.Math.Clamp(y, 265, 500) }; return; }
      this.pendingInteraction = this.canInteract && this.interactionRegion.contains(x, y);
      if (this.pendingInteraction) {
        this.walkTarget = this.interactionX;
        if (this.cuoi && Math.abs(this.cuoi.x - this.interactionX) <= 90) this.interactNearby();
      } else if (y >= (this.options.scene === 'surveyor' ? 300 : 400)) this.walkTarget = Phaser.Math.Clamp(x, 52, this.rightEdge);
    };
    this.input.on('pointerdown', onPointerDown);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.input.off('pointerdown', onPointerDown));
    if (this.failedAssets.length) this.options.onError(this.failedAssets);
    else this.options.onReady();
  }

  update(_time: number, delta: number) {
    if (!this.cuoi || !this.keys) return;
    if (this.ripple && this.moonMode !== 'paused') {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) this.rippleTime += Math.min(delta, 50);
      drawTaiThinhRipple(this.ripple, this.rippleTime);
    }
    this.updateTaiGift(delta);
    if (this.options.sparkleTrail) { this.updateTrail(delta); return; }
    if (this.options.excavation || (this.options.freeRoam && this.options.scene === 'surveyor')) { this.updateExcavation(_time, delta); return; }
    this.interactionHint?.setVisible((this.options.scene !== 'lap-lanh' || this.options.encounterStarted) && this.moonMode === 'free' && this.canInteract && Math.abs(this.cuoi.x - this.interactionX) <= 90);
    if (this.moonMode !== 'free' || !this.awake) return;
    if (this.cuoi.x < 850) this.exitTriggered = false;
    if (document.activeElement?.matches('input, select, textarea')) { this.walkTarget = undefined; this.pendingInteraction = false; this.setCuoiFrame('rest'); return; }
    const left = this.keys!.left.isDown || this.keys!.a.isDown;
    const right = this.keys!.right.isDown || this.keys!.d.isDown;
    if (left || right) { this.walkTarget = undefined; this.pendingInteraction = false; }
    const direction = left === right ? 0 : left ? -1 : 1;
    const targetDirection = this.walkTarget === undefined ? 0 : Math.sign(this.walkTarget - this.cuoi.x);
    const heading = direction || targetDirection;
    if (this.pendingInteraction && Math.abs(this.cuoi.x - this.interactionX) <= 90) { this.interactNearby(); return; }
    if (!heading) { this.setCuoiFrame('rest'); return; }
    this.cuoi.setFlipX(heading < 0);
    const distance = 165 * Math.min(delta, 50) / 1000;
    const remaining = this.walkTarget === undefined ? Infinity : Math.abs(this.walkTarget - this.cuoi.x);
    const rightEdge = this.rightEdge;
    this.cuoi.x = Phaser.Math.Clamp(this.cuoi.x + heading * Math.min(distance, remaining), 52, rightEdge);
    if (this.options.scene === 'surveyor') this.cuoi.y = surveyorGroundY(this.cuoi.x);
    const finishedTrail = this.options.freeRoam && ['lap-lanh', 'tai-thinh'].includes(this.options.scene);
    if (((this.options.scene === 'moon' && this.options.quest === 'trail' && this.cuoi.x >= 890) || (finishedTrail && this.cuoi.x >= 875)) && !this.exitTriggered) {
      this.exitTriggered = true;
      this.setMoonMode('story');
      this.options.onExit();
      return;
    }
    if (this.walkTarget !== undefined && Math.abs(this.walkTarget - this.cuoi.x) < 1) this.walkTarget = undefined;
    if (this.cuoi.x === 52 || this.cuoi.x === rightEdge) this.walkTarget = undefined;
    if (this.walkTarget === undefined && !direction) this.setCuoiFrame('rest');
    else if (!this.cuoi.anims.isPlaying || this.cuoi.anims.currentAnim?.key !== 'cuoi-walk') this.cuoi.play('cuoi-walk');
  }

  private syncLanternGrip() {
    const c = this.cuoi, lantern = this.lantern;
    if (!c || !lantern) return;
    if ((this.options.scene === 'tai-thinh' && (!this.options.taiEnding || this.options.taiEnding === 'none')) || (this.options.scene === 'lap-lanh' && !this.options.freeRoam)) {
      lantern.setVisible(false);
      this.earnedLight?.setVisible(false);
      return;
    }
    // Fist centers in each trimmed sprite frame (original image pixels).
    const walkingHands = [[139, 132], [114, 130], [132, 132], [139, 130], [119, 132], [132, 134]];
    const frame = String(c.frame.name);
    const hand = frame.startsWith('walk-') ? walkingHands[Number(frame.slice(5))] : [106, 154];
    if (!hand) return;
    const facing = c.flipX ? -1 : 1;
    const scale = c.scaleX / .62;
    const angle = facing * .3;
    const handX = c.x + facing * (hand[0] - c.frame.realWidth / 2) * c.scaleX;
    const handY = c.y + (hand[1] - c.frame.realHeight) * c.scaleY;
    // The grip is 27px below the star: place that point in the fist,
    // with the sprite drawn in front so its fingers cover the wooden shaft.
    lantern.setScale(scale).setRotation(angle)
      .setPosition(handX + Math.sin(angle) * 27 * scale, handY - Math.cos(angle) * 27 * scale)
      .setDepth(c.depth - .1)
      .setVisible(this.options.scene === 'surveyor' ? !!this.options.freeRoam : ['lantern', 'trail', 'complete'].includes(this.options.quest));
    this.earnedLight?.setVisible(this.options.scene === 'tai-thinh' || !!this.options.freeRoam)
      .setPosition(lantern.x, lantern.y).setScale(scale).setRotation(angle).setDepth(c.depth - .05);
  }

  private get rightEdge() { return this.options.freeRoam || this.options.scene === 'surveyor' ? 895 : this.options.quest === 'trail' ? 908 : 830; }

  private addMoonCuoi() {
    if (!this.textures.exists('cuoi')) return;
    const startX = this.options.scene === 'tai-thinh' ? (this.options.encounterStarted ? 430 : 140) : this.options.scene === 'lap-lanh' ? (this.options.sparkleEnding ? 340 : 140) : this.options.scene === 'surveyor' ? (this.options.encounterStarted ? surveyorEncounter.x - 80 : 140) : this.options.quest === 'complete' ? 890 : this.options.quest === 'bench' ? 307 : 470;
    this.cuoi = this.add.sprite(startX, this.options.scene === 'surveyor' ? surveyorGroundY(startX) : 431, 'cuoi', this.options.initiallyAwake ? 'rest' : 'sleep')
      .setOrigin(0.5, 1).setScale(0.62).setDepth(10);
    if (this.options.sparkleTrail) this.syncTrailPerspective();
    this.awake = this.options.initiallyAwake;
    this.anims.create({ key: 'cuoi-wake', frames: cuoiWakeFrames.map((_, index) => ({ key: 'cuoi', frame: `wake-${index}` })), frameRate: 5, repeat: 0 });
    this.anims.create({ key: 'cuoi-walk', frames: cuoiWalkFrames.map((_, index) => ({ key: 'cuoi', frame: `walk-${index}` })), frameRate: 8, repeat: -1 });
    this.keys = this.input.keyboard?.addKeys({ left: 'LEFT', right: 'RIGHT', a: 'A', d: 'D', up: 'UP', down: 'DOWN', w: 'W', s: 'S' }, false) as typeof this.keys;
    const onInteractKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!event.repeat && !target?.closest('input, select, textarea')) this.interactNearby();
    };
    this.input.keyboard?.on('keydown-E', onInteractKey);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.input.keyboard?.off('keydown-E', onInteractKey));
    const onBlur = () => this.releaseControls();
    window.addEventListener('blur', onBlur);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => window.removeEventListener('blur', onBlur));
    if (this.moonMode === 'wake') this.beginWake();
  }

  private beginWake() {
    if (!this.cuoi || this.awake) return;
    this.cuoi.play('cuoi-wake');
    this.cuoi.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'cuoi-wake', () => {
      this.awake = true;
      this.setCuoiFrame('rest');
      this.options.onAwake();
    });
  }

  private setCuoiFrame(frame: string) {
    if (!this.cuoi) return;
    if (this.cuoi.anims.isPlaying) this.cuoi.anims.stop();
    if (this.cuoi.frame.name !== frame) this.cuoi.setFrame(frame);
  }

  private addCharacter(key: typeof spriteSources[number]['key'], x: number, y: number, scale: number) {
    if (!this.textures.exists(key)) return;
    const source = spriteSources.find((item) => item.key === key)!;
    this.add.ellipse(x, y + 2, 65, 10, 0x111c22, 0.24);
    this.add.image(x, y, key, 'rest')
      .setOrigin(source.foot.x / source.frame.width, source.foot.y / source.frame.height)
      .setScale(scale);
  }
}
