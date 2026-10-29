import Phaser from 'phaser';

/** Illustrated Station 2 setting; fixed right-hand sunlight, not a surveyed view. */
export function drawRockStop(scene: Phaser.Scene) {
  const g = scene.add.graphics().setDepth(1);
  g.fillStyle(0x0d141c).fillRect(0, 0, 960, 540);
  for (const [radius, alpha] of [[64, .035], [46, .05], [30, .08]]) g.fillStyle(0xf0dfb9, alpha).fillCircle(720, 164, radius);
  g.fillStyle(0xfffbed).fillCircle(720, 164, 22);
  g.fillStyle(0x58656b).fillPoints([{ x: 0, y: 220 }, { x: 130, y: 112 }, { x: 300, y: 236 }, { x: 550, y: 250 }, { x: 720, y: 172 }, { x: 840, y: 142 }, { x: 960, y: 198 }, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  g.fillStyle(0x8b9189).fillTriangle(840, 142, 960, 198, 885, 263);
  g.fillStyle(0x45555d).fillPoints([{ x: 0, y: 310 }, { x: 240, y: 278 }, { x: 480, y: 326 }, { x: 790, y: 284 }, { x: 960, y: 302 }, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  g.fillStyle(0x78807b).fillPoints([{ x: 0, y: 383 }, { x: 280, y: 360 }, { x: 620, y: 375 }, { x: 960, y: 351 }, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  for (let i = 0; i < 250; i++) g.fillStyle(i % 3 ? 0x394b50 : 0xc6c5ad, .25).fillRect(i * 137 % 960, 373 + i * 43 % 167, 3, 2);
  for (const [x, y, size] of [[60, 403, 16], [490, 477, 24], [870, 458, 21], [820, 367, 12]]) {
    g.fillStyle(0x384b51).fillEllipse(x - 14, y + 5, size * 2, 9);
    g.fillStyle(0xa5a799).fillTriangle(x - size, y, x, y - size, x + size, y);
  }
  g.fillStyle(0x35474c, .8).fillEllipse(646, 439, 200, 24);
  g.fillStyle(0x888d83).fillPoints([{ x: 659, y: 425 }, { x: 649, y: 367 }, { x: 686, y: 323 }, { x: 737, y: 336 }, { x: 769, y: 390 }, { x: 750, y: 431 }], true);
  g.fillStyle(0xb7b7a1).fillPoints([{ x: 686, y: 323 }, { x: 737, y: 336 }, { x: 769, y: 390 }, { x: 709, y: 374 }], true);
  g.fillStyle(0x65736e).fillTriangle(659, 425, 649, 367, 709, 374);
  g.lineStyle(2, 0x525f5c).lineBetween(709, 374, 693, 399).lineBetween(693, 399, 703, 420);
  return g;
}
