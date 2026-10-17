import Phaser from 'phaser';
import { cuoiSleepFrame, cuoiWakeFrames, cuoiWalkFrames, spriteSources } from '../content/assets';
import { earthScenery, moonScenery } from './scenery';
import { VIEW, type PreviewOptions } from './types';
import { copy, type Language } from '../content/i18n';

export class PreviewScene extends Phaser.Scene {
  private options: PreviewOptions;
  private marker?: Phaser.GameObjects.Graphics;
  private regions: { name: 'ba' | 'an' | 'cuoi' | 'bench' | 'tree'; rect: Phaser.Geom.Rectangle }[] = [];
  private failedAssets: string[] = [];
  private cuoi?: Phaser.GameObjects.Sprite;
  private moonMode: PreviewOptions['moonMode'];
  private keys?: Record<'left' | 'right' | 'a' | 'd', Phaser.Input.Keyboard.Key>;
  private walkTarget?: number;
  private awake = false;
  private pendingBench = false;
  private exitTriggered = false;
  private benchHint?: Phaser.GameObjects.Text;
  private treeGlow?: Phaser.GameObjects.Graphics;
  private lantern?: Phaser.GameObjects.Graphics;

  setQuest(quest: PreviewOptions['quest'], treeSpeaking: boolean) {
    this.options.quest = quest;
    this.options.treeSpeaking = treeSpeaking;
    this.treeGlow?.setVisible(treeSpeaking);
    this.lantern?.setVisible(['lantern', 'trail', 'complete'].includes(quest));
  }

  private interactBench() {
    if (this.moonMode !== 'free' || this.options.quest !== 'bench' || !this.cuoi || Math.abs(this.cuoi.x - 520) > 90) return;
    this.pendingBench = false;
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
    this.pendingBench = false;
    this.input?.keyboard?.resetKeys();
    if (this.awake) this.setCuoiFrame('rest');
  }

  setLanguage(language: Language) { this.options.language = language; }

  setMoonMode(mode: PreviewOptions['moonMode']) {
    if (this.moonMode === mode) return;
    this.moonMode = mode;
    this.walkTarget = undefined;
    this.pendingBench = false;
    this.benchHint?.setVisible(false);
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
      earthScenery(this);
      this.addCharacter('ba', 188, 410, 0.49);
      // Align An's seated hips with the porch edge (y=425), feet on the lower step.
      this.addCharacter('an', 313, 465, 0.37);
      this.regions = [
        { name: 'ba', rect: new Phaser.Geom.Rectangle(145, 232, 133, 180) },
        { name: 'an', rect: new Phaser.Geom.Rectangle(265, 320, 100, 148) },
      ];
    } else {
      moonScenery(this);
      this.treeGlow = this.add.graphics().fillStyle(0xe4c987, 0.11).fillCircle(205, 300, 130).setVisible(false);
      this.benchHint = this.add.text(520, 310, '', { fontFamily: 'Arial', fontSize: '22px', color: '#f5e4b6', backgroundColor: '#15232b', padding: { x: 12, y: 8 } }).setOrigin(0.5).setDepth(20).setVisible(false);
      this.addMoonCuoi();
      this.lantern = this.add.graphics().setDepth(10);
      const points = Array.from({ length: 10 }, (_, i) => {
        const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 9 : 21;
        return { x: Math.cos(a) * r, y: Math.sin(a) * r };
      });
      this.lantern.fillStyle(0x514d43).fillPoints(points, true).lineStyle(2, 0xcdb77b).strokePoints(points, true).lineBetween(0, 21, 0, 33);
      this.setQuest(this.options.quest, this.options.treeSpeaking);
      this.regions = [
        { name: 'cuoi', rect: new Phaser.Geom.Rectangle(231, 293, 152, 143) },
        { name: 'bench', rect: new Phaser.Geom.Rectangle(444, 350, 153, 88) },
        { name: 'tree', rect: new Phaser.Geom.Rectangle(35, 83, 370, 352) },
      ];
    }
    if (this.options.debug) {
      const guides = this.add.graphics().lineStyle(1, 0xf1cf83, 0.65);
      for (const { rect } of this.regions) guides.strokeRectShape(rect);
      guides.lineStyle(1, 0x8fc4c2, 0.5).lineBetween(0, 432, VIEW.width, 432);
    }
    this.marker = this.add.graphics().setDepth(100);
    const onPointerDown = (pointer: Phaser.Input.Pointer) => {
      // Phaser Scale Manager converts CSS pixels to 960×540 scene coordinates.
      const x = Phaser.Math.Clamp(pointer.x, 0, VIEW.width);
      const y = Phaser.Math.Clamp(pointer.y, 0, VIEW.height);
      if (this.options.debug) {
        this.marker!.clear().lineStyle(1, 0xffdf98).strokeCircle(x, y, 9);
        this.marker!.lineBetween(x - 14, y, x + 14, y).lineBetween(x, y - 14, x, y + 14);
        const region = this.regions.find(({ rect }) => rect.contains(x, y))?.name;
        const t = copy[this.options.language];
        const target = region === 'ba' ? (this.options.language === 'vi' ? 'Bà' : 'Grandma') : region === 'an' ? 'An' : region === 'cuoi' ? 'Cuội' : region === 'bench' ? t.bench : region === 'tree' ? t.tree : t.ground;
        this.options.onPoint({ x: Math.round(x), y: Math.round(y), target });
      }
      if (this.options.scene !== 'moon' || this.moonMode !== 'free') return;
      const bench = this.regions.find((region) => region.name === 'bench')!;
      this.pendingBench = this.options.quest === 'bench' && bench.rect.contains(x, y);
      if (this.pendingBench) {
        this.walkTarget = 520;
        if (this.cuoi && Math.abs(this.cuoi.x - 520) <= 90) this.interactBench();
      } else if (y >= 400) this.walkTarget = Phaser.Math.Clamp(x, 52, this.options.quest === 'trail' ? 908 : 830);
    };
    this.input.on('pointerdown', onPointerDown);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.input.off('pointerdown', onPointerDown));
    if (this.failedAssets.length) this.options.onError(this.failedAssets);
    else this.options.onReady();
  }

  update(_time: number, delta: number) {
    if (!this.cuoi || !this.keys) return;
    this.lantern?.setPosition(this.cuoi.x + (this.cuoi.flipX ? -38 : 38), this.cuoi.y - 56);
    this.benchHint?.setText(copy[this.options.language].interactBench).setVisible(this.moonMode === 'free' && this.options.quest === 'bench' && Math.abs(this.cuoi.x - 520) <= 90);
    if (this.moonMode !== 'free' || !this.awake) return;
    if (this.cuoi.x < 850) this.exitTriggered = false;
    if (document.activeElement?.matches('input, select, textarea')) { this.walkTarget = undefined; this.pendingBench = false; this.setCuoiFrame('rest'); return; }
    const left = this.keys!.left.isDown || this.keys!.a.isDown;
    const right = this.keys!.right.isDown || this.keys!.d.isDown;
    if (left || right) { this.walkTarget = undefined; this.pendingBench = false; }
    const direction = left === right ? 0 : left ? -1 : 1;
    const targetDirection = this.walkTarget === undefined ? 0 : Math.sign(this.walkTarget - this.cuoi.x);
    const heading = direction || targetDirection;
    if (this.pendingBench && Math.abs(this.cuoi.x - 520) <= 90) { this.interactBench(); return; }
    if (!heading) { this.setCuoiFrame('rest'); return; }
    this.cuoi.setFlipX(heading < 0);
    const distance = 165 * Math.min(delta, 50) / 1000;
    const remaining = this.walkTarget === undefined ? Infinity : Math.abs(this.walkTarget - this.cuoi.x);
    const rightEdge = this.options.quest === 'trail' ? 908 : 830;
    this.cuoi.x = Phaser.Math.Clamp(this.cuoi.x + heading * Math.min(distance, remaining), 52, rightEdge);
    if (this.options.quest === 'trail' && this.cuoi.x >= 890 && !this.exitTriggered) {
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

  private addMoonCuoi() {
    if (!this.textures.exists('cuoi')) return;
    this.cuoi = this.add.sprite(307, 431, 'cuoi', this.moonMode === 'sleep' ? 'sleep' : 'rest')
      .setOrigin(0.5, 1).setScale(0.62);
    this.awake = this.moonMode !== 'sleep' && this.moonMode !== 'wake';
    this.anims.create({ key: 'cuoi-wake', frames: cuoiWakeFrames.map((_, index) => ({ key: 'cuoi', frame: `wake-${index}` })), frameRate: 5, repeat: 0 });
    this.anims.create({ key: 'cuoi-walk', frames: cuoiWalkFrames.map((_, index) => ({ key: 'cuoi', frame: `walk-${index}` })), frameRate: 8, repeat: -1 });
    this.keys = this.input.keyboard?.addKeys({ left: 'LEFT', right: 'RIGHT', a: 'A', d: 'D' }, false) as typeof this.keys;
    const onInteractKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!event.repeat && !target?.closest('input, select, textarea')) this.interactBench();
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
