import Phaser from 'phaser';

// Side-view interpretation of the shallow crater's inner slope, not a terrain
// survey or a recreation of a particular photograph. See docs/Surveyor-3-Boicanh-NASA.md.
export function surveyorGroundY(x: number) {
  if (x < 300) return 408 + (x - 52) * 27 / 248;
  if (x < 560) return 435 + (x - 300) * 10 / 260;
  return 445 - (x - 560) * 0.15;
}

export const surveyorEncounter = { x: 700, region: { x: 625, y: 166, width: 205, height: 276 } };

export function surveyorScenery(scene: Phaser.Scene) {
  const g = scene.add.graphics();
  g.fillStyle(0x080e17).fillRect(0, 0, 960, 540);
  // Low, gently rolling rim; no atmosphere, mountains or vegetation.
  const rim = [{ x: 0, y: 166 }, { x: 100, y: 159 }, { x: 210, y: 174 }, { x: 310, y: 181 },
    { x: 450, y: 185 }, { x: 610, y: 177 }, { x: 735, y: 167 }, { x: 855, y: 158 }, { x: 960, y: 170 }];
  g.fillStyle(0x9a9b97).fillPoints([...rim, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  g.lineStyle(3, 0xc3c1b5, 0.65).strokePoints(rim, false);
  g.fillStyle(0x878c8b).fillPoints([{ x: 0, y: 182 }, { x: 140, y: 213 }, { x: 300, y: 244 },
    { x: 475, y: 259 }, { x: 640, y: 245 }, { x: 810, y: 214 }, { x: 960, y: 187 }, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  g.fillStyle(0x757e80).fillPoints([{ x: 0, y: 231 }, { x: 130, y: 280 }, { x: 270, y: 321 },
    { x: 430, y: 343 }, { x: 590, y: 328 }, { x: 765, y: 288 }, { x: 960, y: 222 }, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  g.fillStyle(0x626f75).fillPoints([{ x: 0, y: 308 }, { x: 155, y: 363 }, { x: 325, y: 391 },
    { x: 480, y: 408 }, { x: 650, y: 382 }, { x: 825, y: 328 }, { x: 960, y: 289 }, { x: 960, y: 540 }, { x: 0, y: 540 }], true);
  // Fine regolith and small stones, with deterministic placement for restoration.
  for (let i = 0; i < 510; i++) {
    const x = (i * 137 + 29) % 960, y = 190 + (i * 71) % 350;
    const size = y < 300 ? 1 : 2;
    g.fillStyle(i % 3 === 0 ? 0xd4cfbb : 0x263740, i % 4 === 0 ? 0.35 : 0.17)
      .fillRect(x, y, size + i % 4, size);
  }
  const crater = (x: number, y: number, w: number, h: number) => {
    g.fillStyle(0xb2b1a5, 0.7).fillEllipse(x, y, w, h);
    g.fillStyle(0x505c61).fillEllipse(x + 1, y - 2, w - 5, h - 4);
    g.fillStyle(0x829093).fillEllipse(x + w * 0.12, y + h * 0.1, w * 0.67, h * 0.48);
  };
  crater(90, 235, 57, 12); crater(363, 219, 30, 7); crater(876, 252, 74, 16);
  crater(239, 352, 65, 18); crater(416, 490, 135, 30); crater(851, 484, 102, 27);
  // A few angular rocks with hard sunlight/shadow, matching the airless setting.
  for (const [x, y, size] of [[66, 482, 13], [310, 480, 9], [899, 378, 11], [530, 282, 5], [827, 224, 4]]) {
    g.fillStyle(0x33434b, 0.7).fillEllipse(x - size, y + 3, size * 3.8, size * 0.65);
    g.fillStyle(0x9eaaa6).fillTriangle(x - size, y, x - size * 0.4, y - size, x + size, y);
    g.fillStyle(0x657278).fillTriangle(x - size * 0.4, y - size, x + size * 0.45, y - size * 0.6, x + size, y);
  }
  drawSurveyorRemains(g);
}

function drawSurveyorRemains(g: Phaser.GameObjects.Graphics) {
  // Remaining tripod, equipment boxes and solar-panel mast. Camera and scoop
  // are deliberately absent: Apollo 12 returned them to Earth. T01 shows a memory.
  g.fillStyle(0x233039, 0.75).fillPoints([{ x: 641, y: 431 }, { x: 809, y: 411 }, { x: 595, y: 461 }, { x: 480, y: 449 }], true);
  g.lineStyle(8, 0x5c5e58).lineBetween(700, 326, 640, 431).lineBetween(700, 326, 797, 411).lineBetween(705, 337, 712, 433);
  g.lineStyle(4, 0xddd4b5).lineBetween(698, 323, 637, 428).lineBetween(702, 324, 795, 408).lineBetween(705, 334, 710, 430);
  g.lineStyle(3, 0xaaa58e).lineBetween(645, 415, 749, 347).lineBetween(779, 400, 670, 342).lineBetween(677, 352, 707, 221).lineBetween(735, 349, 707, 221);
  // Solar panel above a tall open mast, based on NASA's Apollo 12 photographs.
  g.lineStyle(7, 0xc7c4ad).lineBetween(707, 345, 707, 202);
  g.lineStyle(2, 0x747d78).lineBetween(711, 345, 711, 204);
  g.fillStyle(0x384951).fillPoints([{ x: 656, y: 181 }, { x: 748, y: 201 }, { x: 766, y: 225 }, { x: 674, y: 205 }], true);
  g.lineStyle(3, 0xd0cbb4).strokePoints([{ x: 656, y: 181 }, { x: 748, y: 201 }, { x: 766, y: 225 }, { x: 674, y: 205 }], true);
  for (let i = 1; i < 7; i++) g.lineStyle(1, 0x8c9994).lineBetween(656 + i * 13, 181 + i * 2.85, 674 + i * 13, 205 + i * 2.85);
  g.lineStyle(1, 0x8c9994).lineBetween(665, 193, 757, 213);
  g.fillStyle(0xbdb9a5).fillPoints([{ x: 651, y: 318 }, { x: 683, y: 308 }, { x: 706, y: 338 }, { x: 663, y: 350 }], true);
  g.fillStyle(0x8e9286).fillPoints([{ x: 663, y: 350 }, { x: 706, y: 338 }, { x: 706, y: 359 }, { x: 666, y: 368 }], true);
  g.fillStyle(0xc9c1a8).fillRect(719, 327, 29, 27);
  g.fillStyle(0x858b82).fillRect(744, 327, 8, 29);
  g.fillStyle(0xb6b3a0).fillEllipse(704, 369, 26, 15);
  g.fillStyle(0x5a645f).fillRect(696, 370, 16, 9);
  g.lineStyle(3, 0xb7b5a1).lineBetween(731, 354, 788, 371).lineBetween(788, 371, 811, 386);
  g.lineStyle(2, 0xe1d8b9).lineBetween(725, 308, 742, 279); // Empty camera support.
  for (const [x, y] of [[637, 430], [711, 433], [796, 410]]) {
    g.fillStyle(0x4c5c61).fillEllipse(x - 2, y + 4, 38, 9);
    g.fillStyle(0xbdb8a2).fillEllipse(x, y, 29, 8);
    g.lineStyle(1, 0xe0d7ba).strokeEllipse(x, y - 1, 27, 6);
  }
}
