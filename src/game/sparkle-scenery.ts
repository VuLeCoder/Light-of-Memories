import Phaser from 'phaser';
import { drawEarth } from './scenery';

// A stylized mare plain, using Surveyor's palette and geometric shapes.
// Keep the walking line at y=431 and the reflector's space clear.
// Fixed coordinates also allow cacheScenery to restore the same background.
export function sparkleScenery(scene: Phaser.Scene) {
  const g = scene.add.graphics();
  g.fillStyle(0x080e17).fillRect(0, 0, 960, 540);
  drawEarth(g, 782, 90);
  const horizon = [{ x: 0, y: 174 }, { x: 135, y: 168 }, { x: 290, y: 177 },
    { x: 455, y: 173 }, { x: 620, y: 180 }, { x: 805, y: 170 }, { x: 960, y: 175 }];
  g.fillStyle(0x9a9b97).fillPoints([...horizon, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  g.lineStyle(2, 0xc3c1b5, .65).strokePoints(horizon, false);
  const bands = [
    { color: 0x878c8b, points: [{ x: 0, y: 220 }, { x: 185, y: 232 }, { x: 375, y: 225 },
      { x: 580, y: 242 }, { x: 780, y: 228 }, { x: 960, y: 235 }] },
    { color: 0x757e80, points: [{ x: 0, y: 302 }, { x: 180, y: 288 }, { x: 390, y: 310 },
      { x: 590, y: 300 }, { x: 800, y: 315 }, { x: 960, y: 299 }] },
    { color: 0x626f75, points: [{ x: 0, y: 379 }, { x: 200, y: 391 }, { x: 405, y: 382 },
      { x: 610, y: 394 }, { x: 815, y: 382 }, { x: 960, y: 390 }] },
  ];
  for (const { color, points } of bands) {
    g.fillStyle(color).fillPoints([...points, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  }
  for (let i = 0; i < 380; i++) {
    const x = (i * 137 + 41) % 960, y = 190 + (i * 71) % 350;
    const size = y < 300 ? 1 : 2;
    g.fillStyle(i % 3 === 0 ? 0xd4cfbb : 0x263740, i % 4 === 0 ? .3 : .16)
      .fillRect(x, y, size + i % 3, size);
  }
  for (const [x, y, size] of [[55, 452, 10], [258, 505, 8], [538, 265, 4], [904, 357, 9], [829, 214, 3]]) {
    g.fillStyle(0x33434b, .7).fillEllipse(x - size, y + 3, size * 3.8, size * .65);
    g.fillStyle(0x657278).fillTriangle(x - size, y, x - size * .4, y - size, x + size, y);
    g.fillStyle(0x9eaaa6).fillTriangle(x - size * .4, y - size, x + size * .45, y - size * .6, x + size, y);
  }
}
