import Phaser from 'phaser';

// Composed for a 960 × 540 side-view, not a scale survey of the ALSEP site.
// The renderer is deterministic so cacheScenery can rebuild it after context loss.
export { taiThinhLayout } from './tai-thinh-layout';

export function taiThinhScenery(scene: Phaser.Scene) {
  const g = scene.add.graphics();
  g.fillStyle(0x080e17).fillRect(0, 0, 960, 540);
  const horizon = [{ x: 0, y: 179 }, { x: 130, y: 174 }, { x: 276, y: 185 },
    { x: 455, y: 181 }, { x: 660, y: 176 }, { x: 818, y: 183 }, { x: 960, y: 175 }];
  g.fillStyle(0x9a9b97).fillPoints([...horizon, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  g.lineStyle(2, 0xc3c1b5, .6).strokePoints(horizon, false);
  for (const [y, color] of [[225, 0x878c8b], [303, 0x757e80], [390, 0x626f75]]) {
    const points = [0, 160, 320, 480, 640, 800, 960].map((x, i) => ({ x, y: y + [0, 9, -3, 7, 2, -5, 0][i] }));
    g.fillStyle(color).fillPoints([...points, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  }
  const crater = (x: number, y: number, w: number, h: number) => {
    g.fillStyle(0xa6a99d, .7).fillEllipse(x, y, w, h);
    g.fillStyle(0x45545c).fillEllipse(x + 1, y - 2, w - 5, h - 4);
    g.fillStyle(0x819093).fillEllipse(x - w * .12, y + h * .12, w * .63, h * .43);
  };
  crater(140, 251, 53, 10); crater(743, 228, 33, 7); crater(926, 320, 59, 14);
  crater(168, 508, 112, 24); crater(886, 501, 92, 22);
  for (let i = 0; i < 360; i++) {
    const x = (i * 137 + 43) % 960, y = 193 + (i * 71) % 347;
    g.fillStyle(i % 3 ? 0x263740 : 0xd4cfbb, i % 4 ? .15 : .28).fillRect(x, y, y < 290 ? 2 : 3, 1 + i % 2);
  }
  for (const [x, y, size] of [[56, 448, 9], [244, 474, 7], [712, 503, 9], [879, 267, 4], [316, 304, 4]]) {
    g.fillStyle(0x33434b, .7).fillEllipse(x - size, y + 3, size * 3.6, size * .65);
    g.fillStyle(0x657278).fillTriangle(x - size, y, x, y - size, x + size, y);
    g.fillStyle(0xaaa99a).fillTriangle(x, y - size, x + size * .55, y - size * .55, x + size, y);
  }
  // Thin flat cables lie on the ground. Distances are compressed for readability.
  const cable = (points: { x: number; y: number }[]) => {
    g.lineStyle(5, 0x33434b, .65).strokePoints(points.map(p => ({ x: p.x - 2, y: p.y + 2 })), false);
    g.lineStyle(3, 0xae8657).strokePoints(points, false);
    g.lineStyle(1, 0xd0b780, .7).strokePoints(points, false);
  };
  cable([{ x: 480, y: 332 }, { x: 508, y: 357 }, { x: 546, y: 369 }, { x: 571, y: 403 }, { x: 603, y: 418 }]);
  cable([{ x: 487, y: 332 }, { x: 535, y: 337 }, { x: 631, y: 354 }, { x: 727, y: 367 }, { x: 820, y: 400 }]);
}

export type TaiThinhDeviceId = 'pse' | 'station' | 'magnetometer';

/** Code-native props remain separate from the cached ground for T01 highlighting. */
export function drawTaiThinhDevice(scene: Phaser.Scene, id: TaiThinhDeviceId, x: number, y: number, scale = 1) {
  const g = scene.add.graphics({ x, y }).setScale(scale);
  if (id === 'pse') {
    g.fillStyle(0x26343c, .7).fillEllipse(-24, 2, 224, 29);
    const skirt = [{ x: -98, y: -12 }, { x: -80, y: -33 }, { x: -50, y: -39 }, { x: -30, y: -49 },
      { x: 15, y: -41 }, { x: 58, y: -37 }, { x: 89, y: -22 }, { x: 100, y: -7 },
      { x: 81, y: 1 }, { x: 53, y: 8 }, { x: 22, y: 5 }, { x: -7, y: 12 }, { x: -43, y: 5 }, { x: -75, y: 4 }];
    g.fillStyle(0xabb5ad).fillPoints(skirt, true);
    g.lineStyle(2, 0xdcd9bf).strokePoints(skirt, true);
    for (let i = 0; i < 12; i++) {
      const a = skirt[i], b = skirt[(i + 1) % skirt.length];
      g.fillStyle(i % 2 ? 0xd1d2c1 : 0x647c83).fillTriangle(-3, -22, a.x, a.y, b.x, b.y);
      g.lineStyle(1, 0xe8e1c9, .7).lineBetween(-3, -22, a.x, a.y);
    }
    // Low circular sensor can, dark top and small levelling/sundial fixtures.
    g.fillStyle(0x83999b).fillRect(-34, -69, 68, 47).fillEllipse(0, -22, 68, 21);
    g.fillStyle(0xc5cdc3).fillRect(4, -69, 30, 47);
    for (const [px, py] of [[-27, -58], [-15, -47], [-1, -61], [14, -51], [24, -40]]) {
      g.fillStyle(0xe2dfca).fillTriangle(px, py, px + 6, py + 16, px + 3, py - 10);
    }
    g.fillStyle(0x3d5964).fillEllipse(0, -69, 68, 25);
    g.lineStyle(2, 0xdbd7be).strokeEllipse(0, -69, 68, 25);
    g.lineStyle(1, 0xc2c9b7).lineBetween(-27, -72, 21, -63).lineBetween(-17, -59, 21, -76);
    g.fillStyle(0xdce1ce).fillRect(-3, -99, 3, 31).fillRect(7, -79, 7, 10);
    g.fillStyle(0x788e8d).fillEllipse(10, -80, 8, 4);
  } else if (id === 'station') {
    g.fillStyle(0x26343c, .7).fillPoints([{ x: -32, y: -5 }, { x: 32, y: 0 }, { x: -46, y: 19 }, { x: -97, y: 14 }], true);
    g.fillStyle(0x9aa7a0).fillRect(-30, -43, 58, 44);
    g.fillStyle(0xd1d1b9).fillPoints([{ x: -30, y: -43 }, { x: -18, y: -51 }, { x: 37, y: -47 }, { x: 28, y: -39 }], true);
    g.fillStyle(0x677d81).fillPoints([{ x: 28, y: -39 }, { x: 37, y: -47 }, { x: 37, y: -9 }, { x: 28, y: 1 }], true);
    for (let i = 0; i < 7; i++) g.lineStyle(2, i % 2 ? 0xbfc9b9 : 0x7b9292).lineBetween(-25 + i * 7, -40, -21 + i * 7, -7);
    g.lineStyle(4, 0xd4d5bd).lineBetween(3, -42, 3, -85);
    g.lineStyle(2, 0x788d8e).lineBetween(7, -42, 7, -85);
    g.fillStyle(0xc0c8b6).fillEllipse(5, -87, 20, 14);
    g.lineStyle(2, 0xdedac1).lineBetween(-5, -87, 13, -91);
    g.lineStyle(2, 0x8da29f).lineBetween(-27, -5, -37, 6).lineBetween(26, -4, 35, 7);
  } else {
    g.fillStyle(0x26343c, .7).fillEllipse(-35, 4, 146, 17);
    // Three deployed sensor booms, not a central communications antenna.
    g.lineStyle(5, 0x8e784e).lineBetween(0, -18, -58, -75).lineBetween(0, -18, 57, -73).lineBetween(0, -18, 3, -92);
    g.lineStyle(2, 0xd2bd80).lineBetween(2, -20, -56, -77).lineBetween(2, -20, 59, -75).lineBetween(3, -20, 5, -94);
    g.lineStyle(3, 0xb7c7bf).lineBetween(-18, -16, -36, 1).lineBetween(16, -16, 36, 1).lineBetween(0, -18, 1, 2);
    g.fillStyle(0xced3c3).fillRect(-20, -25, 39, 23);
    g.fillStyle(0x697f81).fillRect(-17, -22, 15, 17);
    for (const [sx, sy] of [[-58, -77], [59, -75], [5, -94]]) {
      g.fillStyle(0xd8ddc9).fillRoundedRect(sx - 7, sy - 5, 14, 12, 3);
      g.fillStyle(0x8ba3a0).fillRect(sx - 7, sy, 4, 6);
    }
  }
  return g;
}

/** Dynamic ripple layer, deliberately excluded from cacheScenery. */
export function drawTaiThinhRipple(g: Phaser.GameObjects.Graphics, elapsedMs: number) {
  g.clear();
  for (let i = 0; i < 3; i++) {
    const t = ((elapsedMs / 2100 + i / 3) % 1);
    g.lineStyle(2, 0xe4d8ab, (1 - t) * .38).strokeEllipse(610, 434, 45 + t * 180, 9 + t * 32);
  }
}
