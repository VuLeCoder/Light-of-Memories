import Phaser from 'phaser';

export const banhLuoiLayout = {
  groundY: 431,
  rover: { x: 665, y: 431, width: 290, height: 170 },
  interaction: { x: 510, y: 252, width: 310, height: 184 },
  approachX: 440,
} as const;

/** Compressed side view of Taurus–Littrow, not a surveyed site map. */
export function banhLuoiScenery(scene: Phaser.Scene) {
  const g = scene.add.graphics();
  g.fillStyle(0x080e17).fillRect(0, 0, 960, 540);
  const mountains = [{ x: 0, y: 145 }, { x: 85, y: 97 }, { x: 187, y: 168 },
    { x: 320, y: 222 }, { x: 484, y: 239 }, { x: 639, y: 211 }, { x: 822, y: 119 }, { x: 960, y: 156 }];
  g.fillStyle(0x7b8181).fillPoints([...mountains, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  g.fillStyle(0x9c9e93).fillTriangle(85, 97, 187, 168, 137, 207).fillTriangle(822, 119, 960, 156, 896, 236);
  g.fillStyle(0x5e696e).fillPoints([{ x: 0, y: 270 }, { x: 210, y: 285 }, { x: 430, y: 261 }, { x: 655, y: 276 }, { x: 960, y: 256 }, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  g.fillStyle(0x727c7b).fillPoints([{ x: 0, y: 380 }, { x: 350, y: 349 }, { x: 680, y: 367 }, { x: 960, y: 341 }, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  for (let i = 0; i < 340; i++) {
    g.fillStyle(i % 3 ? 0x2c3b43 : 0xc4c4ac, .2).fillRect((i * 137 + 33) % 960, 286 + (i * 71) % 254, 2 + i % 2, 2);
  }
  // Parallel wheel impressions lead to the parked vehicle, never animate it driving.
  for (let i = 0; i < 45; i++) {
    const x = 55 + i * 14, y = 462 - i * .9 + Math.sin(i / 8) * 7;
    for (const offset of [0, 24]) {
      g.lineStyle(3, 0x46555b, .8).lineBetween(x, y + offset, x + 7, y + offset - 3);
      g.lineStyle(1, 0xb1b4a2, .5).lineBetween(x + 1, y + offset + 3, x + 8, y + offset);
    }
  }
  for (const [x, y, w] of [[99, 329, 38], [340, 506, 86], [877, 480, 98]]) {
    g.fillStyle(0xa6a99b).fillEllipse(x, y, w, w * .24);
    g.fillStyle(0x43545c).fillEllipse(x, y - 2, w - 6, w * .17);
  }
  // Distant descent stage, small enough to preserve the rover as the focal point.
  g.fillStyle(0x9f9477).fillRect(355, 280, 28, 17);
  g.lineStyle(2, 0xc4bca1).lineBetween(358, 289, 346, 302).lineBetween(379, 289, 391, 302);
  g.fillStyle(0x45545c).fillRect(361, 282, 15, 8);
  for (const [x, y] of [[45, 498], [252, 368], [908, 391]]) {
    g.fillStyle(0x34454c).fillEllipse(x - 4, y + 4, 30, 7);
    g.fillStyle(0x9c9f94).fillTriangle(x - 9, y, x, y - 10, x + 11, y);
  }
}

/** Stationary code-native pixel prop: four mesh wheels, two seats, dish and TV camera. */
export function drawBanhLuoi(scene: Phaser.Scene) {
  const { x, y } = banhLuoiLayout.rover;
  const g = scene.add.graphics({ x, y }).setDepth(2);
  g.fillStyle(0x273840, .65).fillEllipse(-25, 4, 355, 30);
  const wheel = (wx: number, wy: number, dark = false) => {
    g.fillStyle(dark ? 0x4c5f67 : 0x839297).fillEllipse(wx, wy - 22, 49, 52);
    g.lineStyle(3, 0xc1c6b8).strokeEllipse(wx, wy - 22, 49, 52);
    for (let j = -16; j <= 16; j += 8) {
      g.lineStyle(1, 0xc7ccba, .75).lineBetween(wx + j, wy - 39, wx + j, wy - 5);
      g.lineStyle(1, 0x334952).lineBetween(wx - 17, wy - 22 + j, wx + 17, wy - 22 + j);
    }
    for (let j = -15; j <= 15; j += 10) {
      g.lineStyle(3, 0xd3cbb1).lineBetween(wx - 18, wy - 24 + j, wx, wy - 30 + j).lineBetween(wx, wy - 30 + j, wx + 18, wy - 24 + j);
    }
    g.fillStyle(0x5b7077).fillCircle(wx, wy - 22, 8);
    g.fillStyle(0xccc9b2).fillRect(wx - 3, wy - 25, 6, 6);
  };
  wheel(-105, -18, true); wheel(95, -18, true);
  g.fillStyle(0x929c95).fillPoints([{ x: -130, y: -55 }, { x: 90, y: -55 }, { x: 126, y: -34 }, { x: -99, y: -34 }], true);
  g.lineStyle(4, 0xd0cfb8).lineBetween(-129, -55, 90, -55).lineBetween(-100, -34, 126, -34);
  g.lineStyle(3, 0x9faeac).lineBetween(-120, -35, -90, -14).lineBetween(107, -35, 126, -14);
  // Empty folding seats and central hand controller.
  for (const sx of [-30, 35]) {
    g.lineStyle(3, 0xc7ccb9).strokeRect(sx - 14, -102, 30, 39);
    g.fillStyle(0xc3c5b4).fillRect(sx - 12, -100, 25, 30).fillRect(sx - 12, -64, 35, 8);
    g.fillStyle(0x657c82).fillRect(sx - 9, -95, 17, 25);
    g.lineStyle(3, 0xb9bfae).lineBetween(sx - 10, -56, sx - 6, -38);
  }
  g.lineStyle(4, 0x4b6067).lineBetween(7, -60, 7, -82).lineBetween(1, -84, 13, -84);
  g.fillStyle(0xb89d65).fillRect(-118, -78, 56, 27).fillRect(74, -76, 38, 26);
  g.lineStyle(2, 0xe0d4ac).strokeRect(-118, -78, 56, 27);
  g.lineStyle(4, 0xc4c9b7).lineBetween(-85, -78, -85, -135);
  g.fillStyle(0xaebcaf).fillEllipse(-94, -141, 76, 39);
  g.lineStyle(2, 0xe2ddc3).strokeEllipse(-94, -141, 76, 39);
  for (const dx of [-26, -13, 0, 13, 26]) g.lineStyle(1, 0x637d83).lineBetween(-94 + dx, -156, -87, -125);
  g.lineStyle(3, 0xd6d7bd).lineBetween(-87, -125, -116, -158);
  g.lineStyle(3, 0xaebfb7).lineBetween(-47, -74, -47, -125);
  g.fillStyle(0xc8ccba).fillRect(-59, -132, 25, 15);
  g.fillStyle(0x344a55).fillRect(-61, -130, 7, 10);
  // High-gain mast / open wire aerial at the rear.
  g.lineStyle(3, 0xc1c8b5).lineBetween(92, -76, 92, -162);
  g.lineStyle(1, 0x9fb5b2).strokeTriangle(75, -154, 111, -154, 92, -180);
  wheel(-94, 0); wheel(123, 0);
  return g;
}
