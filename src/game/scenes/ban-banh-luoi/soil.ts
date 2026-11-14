import Phaser from 'phaser';

/** Illustrated soil-sampling stop, with the same sun direction as stop A. */
export function drawSoilStop(scene: Phaser.Scene) {
  const g = scene.add.graphics().setDepth(1);
  g.fillStyle(0x0d141c).fillRect(0, 0, 960, 540);
  for (const [r, a] of [[64, .035], [46, .05], [30, .08]]) g.fillStyle(0xf0dfb9, a).fillCircle(720, 164, r);
  g.fillStyle(0xfffbed).fillCircle(720, 164, 22);
  g.fillStyle(0x626f73).fillPoints([{ x: 0, y: 250 }, { x: 170, y: 203 }, { x: 390, y: 266 }, { x: 620, y: 226 }, { x: 810, y: 197 }, { x: 960, y: 239 }, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  g.fillStyle(0x8b9187).fillTriangle(810, 197, 960, 239, 850, 260);
  g.fillStyle(0x747e77).fillRect(0, 322, 960, 218);
  g.fillStyle(0xb0b09b).fillEllipse(610, 335, 470, 86);
  g.fillStyle(0x35464c).fillEllipse(598, 332, 430, 64);
  g.fillStyle(0x556560).fillEllipse(637, 348, 330, 29);
  for (let i = 0; i < 240; i++) g.fillStyle(i % 3 ? 0x384a50 : 0xc5c2a6, .25).fillRect(i * 137 % 960, 374 + i * 43 % 166, 3, 2);
  [460, 620, 780].forEach((x, patch) => {
    // Exposed soil is flush with the surface, not a raised mound casting a shadow.
    g.fillStyle(0x686f65, .45).fillEllipse(x, 429, 92, 21);
    g.fillStyle(patch === 1 ? 0x85817b : 0x93918b).fillEllipse(x, 429, 82, 19);
    for (let i = 0; i < (patch === 1 ? 42 : 18); i++) {
      const px = x - 32 + (i * 7919 + 37) % 64, py = 423 + (i * i * 53 + i * 71 + 11) % 11;
      const fine = patch === 1 && i % 5 !== 0;
      const size = fine ? .7 + i % 3 * .25 : patch === 1 ? 1.8 : 3;
      g.fillStyle(i % 2 ? 0xb5b1a8 : 0x5e5d59);
      g.fillTriangle(px, py - size, px - size, py + size / 2, px + size, py + size);
    }
    // One, two, three strokes distinguish patches without relying on color.
    for (let i = 0; i <= patch; i++) g.lineStyle(2, 0xe6d6aa).lineBetween(x - patch * 4 + i * 8, 453, x - patch * 4 + i * 8, 461);
  });
  return g;
}
