import Phaser from 'phaser';
import { cuoiSleepFrame, spriteSources } from '../content/assets';
import { earthScenery, moonScenery } from './scenery';
import { VIEW, type PreviewOptions } from './types';

export class PreviewScene extends Phaser.Scene {
  private options: PreviewOptions;
  private marker?: Phaser.GameObjects.Graphics;
  private regions: { name: string; rect: Phaser.Geom.Rectangle }[] = [];
  private failedAssets: string[] = [];

  constructor(options: PreviewOptions) {
    super('preview');
    this.options = options;
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
      }
    }
    if (this.options.scene === 'earth') {
      earthScenery(this);
      this.addCharacter('ba', 188, 410, 0.49);
      // Align An's seated hips with the porch edge (y=425), feet on the lower step.
      this.addCharacter('an', 313, 465, 0.37);
      this.regions = [
        { name: 'Bà', rect: new Phaser.Geom.Rectangle(145, 232, 133, 180) },
        { name: 'An', rect: new Phaser.Geom.Rectangle(265, 320, 100, 148) },
      ];
    } else {
      moonScenery(this);
      this.addCharacter('cuoi', 307, 431, 0.62);
      this.regions = [
        { name: 'Cuội', rect: this.options.sleeping ? new Phaser.Geom.Rectangle(231, 367, 152, 67) : new Phaser.Geom.Rectangle(258, 293, 93, 143) },
        { name: 'Ghế đá', rect: new Phaser.Geom.Rectangle(444, 350, 153, 88) },
        { name: 'Cây Đa', rect: new Phaser.Geom.Rectangle(35, 83, 370, 352) },
      ];
    }
    if (this.options.debug) {
      const guides = this.add.graphics().lineStyle(1, 0xf1cf83, 0.65);
      for (const { rect } of this.regions) guides.strokeRectShape(rect);
      guides.lineStyle(1, 0x8fc4c2, 0.5).lineBetween(0, 432, VIEW.width, 432);
    }
    this.marker = this.add.graphics().setDepth(100);
    const onPointerDown = (pointer: Phaser.Input.Pointer) => {
      if (!this.options.debug) return;
      // Phaser Scale Manager converts CSS pixels to 960×540 scene coordinates.
      const x = Phaser.Math.Clamp(pointer.x, 0, VIEW.width);
      const y = Phaser.Math.Clamp(pointer.y, 0, VIEW.height);
      this.marker!.clear().lineStyle(1, 0xffdf98).strokeCircle(x, y, 9);
      this.marker!.lineBetween(x - 14, y, x + 14, y).lineBetween(x, y - 14, x, y + 14);
      const target = this.regions.find(({ rect }) => rect.contains(x, y))?.name ?? 'Nền cảnh';
      this.options.onPoint({ x: Math.round(x), y: Math.round(y), target });
    };
    this.input.on('pointerdown', onPointerDown);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.input.off('pointerdown', onPointerDown));
    if (this.failedAssets.length) this.options.onError(`Không tải được ảnh: ${this.failedAssets.join(', ')}. Hãy tải lại trang.`);
    else this.options.onReady();
  }

  private addCharacter(key: typeof spriteSources[number]['key'], x: number, y: number, scale: number) {
    if (!this.textures.exists(key)) return;
    const source = spriteSources.find((item) => item.key === key)!;
    this.add.ellipse(x, y + 2, 65, 10, 0x111c22, 0.24);
    const sleep = key === 'cuoi' && this.options.sleeping;
    const frame = sleep ? cuoiSleepFrame : source.frame;
    const foot = sleep ? cuoiSleepFrame.foot : source.foot;
    this.add.image(x, y, key, sleep ? 'sleep' : 'rest')
      .setOrigin(foot.x / frame.width, foot.y / frame.height)
      .setScale(scale);
  }
}
