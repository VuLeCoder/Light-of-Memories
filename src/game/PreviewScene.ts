import { digSites } from '../content/levels/surveyor-dig';
import type { SurveyorEvent } from '../content/levels/surveyor-progress';
import Phaser from 'phaser';
import { cuoiSleepFrame, cuoiWakeFrames, cuoiWalkFrames, spriteSources } from '../content/assets';
import { cacheScenery, earthScenery, moonScenery } from './scenery';
import { VIEW, type PreviewOptions } from './types';
import { surveyorScenery, surveyorGroundY, surveyorEncounter } from './surveyor-scenery';
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
      this.digMarks.lineStyle(3, 0x303d43, .9).fillStyle(0x303d43, .7);
      if (this.options.excavation.found.includes(id)) this.digMarks.fillEllipse(x, y, 32, 13);
      else if (id === 'arrive') this.digMarks.strokeEllipse(x - 15, y, 22, 9).strokeEllipse(x + 13, y - 5, 22, 9);
      else if (id === 'work') for (let i = 0; i < 3; i++) this.digMarks.lineBetween(x - 22, y - 9 + i * 8, x + 22, y - 14 + i * 8);
      else for (let i = 0; i < 6; i++) this.digMarks.fillEllipse(x - 22 + i * 9, y + (i % 2) * 7 - 6, 6, 3);
      if (this.options.excavation.clues.includes(id) && !this.options.excavation.found.includes(id)) {
        // Mark only locations the player has remembered in the field notebook.
        this.digMarks.lineStyle(7, 0x172730, .7).strokeEllipse(x, y, 64, 27);
        this.digMarks.lineStyle(2, 0xffdf99, 1).strokeEllipse(x, y, 64, 27);
        this.digMarks.lineStyle(2, 0x172730, .9).fillStyle(0xffdf99, 1);
        this.digMarks.fillTriangle(x, y - 19, x - 6, y - 29, x + 6, y - 29);
        this.digMarks.strokeTriangle(x, y - 19, x - 6, y - 29, x + 6, y - 29);
      }
    }
  }
  private updateExcavation(time: number, delta: number) {
    if (!this.cuoi || !this.keys || !this.options.excavation) return;
    const c = this.cuoi, k = this.keys;
    let dx = Number(k.right.isDown || k.d.isDown) - Number(k.left.isDown || k.a.isDown);
    let dy = Number(k.down.isDown || k.s.isDown) - Number(k.up.isDown || k.w.isDown);
    if (dx || dy) this.digTarget = undefined;
    if (this.digTarget) { dx = this.digTarget.x - c.x; dy = this.digTarget.y - c.y; }
    const length = Math.hypot(dx, dy);
    const scale = .34 + (c.y - 265) / 235 * .42;
    if (this.moonMode === 'free' && length > .5) {
      const step = Math.min(160 * (scale / .62) * Math.min(delta, 50) / 1000, this.digTarget ? length : Infinity);
      const oldX = c.x, oldY = c.y;
      c.x = Phaser.Math.Clamp(c.x + dx / length * step, 65, 895);
      c.y = Phaser.Math.Clamp(c.y + dy / length * step, 265, 500);
      // Keep the walkable ground clear of the fixed lander silhouette.
      if (c.x > 625 && c.x < 800 && c.y < 450) {
        if (oldX <= 625 || oldX >= 800) c.x = oldX;
        else c.y = Math.max(450, oldY);
      }
      if (dx) c.setFlipX(dx < 0);
      if (!c.anims.isPlaying) c.play('cuoi-walk');
    } else { this.setCuoiFrame('rest'); if (length <= 1) this.digTarget = undefined; }
    c.setScale(scale).setDepth(c.y);
    this.digShadow?.setVisible(true).setPosition(c.x, c.y + 1).setScale(scale / .62).setDepth(c.y - 1);
    this.lantern?.setScale(scale / .62).setPosition(c.x + (c.flipX ? -38 : 38) * scale / .62, c.y - 56 * scale / .62).setDepth(c.y + 1);
    this.shovel?.setVisible(true).setPosition(c.x + (c.flipX ? -25 : 25), c.y - 15).setScale(scale / .62).setDepth(c.y + 2).setRotation(this.options.excavation.digging ? Math.sin(time / 130) * .6 : -.3);
    const near = digSites.find(site => !this.options.excavation!.found.includes(site.id) && Math.hypot(c.x - site.x, c.y - site.y) < 43)?.id ?? null;
    if (near !== this.digNear) { this.digNear = near; this.options.onDigNear?.(near); }
    this.interactionHint?.setVisible(false);
  }
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
    this.lantern?.setVisible(['lantern', 'trail', 'complete'].includes(quest));
    const showTrail = quest === 'lantern' || quest === 'trail';
    this.trailHighlight?.setVisible(showTrail);
    this.trailHint?.setVisible(showTrail);
  }

  private get interactionX() { return this.options.scene === 'surveyor' ? surveyorEncounter.x : 520; }
  private get canInteract() { return (this.options.scene === 'surveyor' && !this.options.excavation) || this.options.quest === 'bench'; }
  private interactionLabel() { return this.options.scene === 'surveyor' ? surveyorEncounterCopy[this.options.language].interact : copy[this.options.language].interactBench; }

  private interactNearby() {
    if (this.moonMode !== 'free' || !this.canInteract || !this.cuoi || Math.abs(this.cuoi.x - this.interactionX) > 90) return;
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
      if (this.options.scene === 'surveyor') {
        cacheScenery(this, surveyorScenery);
        const { x, y, width, height } = surveyorEncounter.region;
        this.interactionRegion = new Phaser.Geom.Rectangle(x, y, width, height);
      } else {
        cacheScenery(this, moonScenery);
        this.trailHighlight = this.add.graphics();
        for (let i = 0; i < 9; i++) {
          const x = 659 + i * 29, y = 435 - i * 3 + i % 2 * 10;
          this.trailHighlight.fillStyle(0xffdf91, 0.18).fillEllipse(x + 5, y + 2, 26, 16);
          this.trailHighlight.lineStyle(2, 0xffdf91, 0.95).strokeRect(x - 1, y - 1, 12, 7);
        }
        this.trailHint = this.add.text(780, 353, copy[this.options.language].trailMarker, {
          fontFamily: 'Arial', fontSize: '22px', color: '#ffe3a1',
          backgroundColor: '#15232b', padding: { x: 12, y: 8 },
        }).setOrigin(0.5).setDepth(20);
        this.treeGlow = this.add.graphics().fillStyle(0xe4c987, 0.11).fillCircle(205, 300, 130).setVisible(false);
      }
      this.interactionHint = this.add.text(this.options.scene === 'surveyor' ? 705 : 520, this.options.scene === 'surveyor' ? 146 : 310, this.interactionLabel(), { fontFamily: 'Arial', fontSize: '22px', color: '#f5e4b6', backgroundColor: '#15232b', padding: { x: 12, y: 8 } }).setOrigin(0.5).setDepth(20).setVisible(false);
      this.addMoonCuoi();
      this.lantern = this.add.graphics().setDepth(10);
      const points = Array.from({ length: 10 }, (_, i) => {
        const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 9 : 21;
        return { x: Math.cos(a) * r, y: Math.sin(a) * r };
      });
      this.lantern.fillStyle(0x514d43).fillPoints(points, true).lineStyle(2, 0xcdb77b).strokePoints(points, true).lineBetween(0, 21, 0, 33);
      this.setQuest(this.options.quest, this.options.treeSpeaking);
      if (this.options.scene === 'surveyor') {
        this.digMarks = this.add.graphics().setDepth(1);
        this.digShadow = this.add.ellipse(0, 0, 65, 12, 0x15232b, .45).setVisible(false);
        this.shovel = this.add.graphics().lineStyle(4, 0xcdb77b).lineBetween(0, -25, 10, 5).fillStyle(0xd8d7c9).fillTriangle(3, 3, 20, 0, 15, 16).setVisible(false);
        this.drawDigMarks();
      }
    }
    const onPointerDown = (pointer: Phaser.Input.Pointer) => {
      // Phaser Scale Manager converts CSS pixels to 960×540 scene coordinates.
      const x = Phaser.Math.Clamp(pointer.x, 0, VIEW.width);
      const y = Phaser.Math.Clamp(pointer.y, 0, VIEW.height);
      if (this.options.scene === 'earth' || this.moonMode !== 'free') return;
      if (this.options.excavation) { if (y >= 250) this.digTarget = { x: Phaser.Math.Clamp(x, 65, 895), y: Phaser.Math.Clamp(y, 265, 500) }; return; }
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
    if (this.options.excavation) { this.updateExcavation(_time, delta); return; }
    this.lantern?.setPosition(this.cuoi.x + (this.cuoi.flipX ? -38 : 38), this.cuoi.y - 56);
    this.interactionHint?.setVisible(this.moonMode === 'free' && this.canInteract && Math.abs(this.cuoi.x - this.interactionX) <= 90);
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
    if (this.options.scene === 'moon' && this.options.quest === 'trail' && this.cuoi.x >= 890 && !this.exitTriggered) {
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

  private get rightEdge() { return this.options.scene === 'surveyor' ? 890 : this.options.quest === 'trail' ? 908 : 830; }

  private addMoonCuoi() {
    if (!this.textures.exists('cuoi')) return;
    const startX = this.options.scene === 'surveyor' ? (this.options.encounterStarted ? surveyorEncounter.x - 80 : 140) : this.options.quest === 'complete' ? 890 : this.options.quest === 'bench' ? 307 : 470;
    this.cuoi = this.add.sprite(startX, this.options.scene === 'surveyor' ? surveyorGroundY(startX) : 431, 'cuoi', this.options.initiallyAwake ? 'rest' : 'sleep')
      .setOrigin(0.5, 1).setScale(0.62);
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
