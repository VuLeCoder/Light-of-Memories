import type Phaser from 'phaser';
import type { GameSceneId } from '../types';

// Story signposts, not geographic connections between the real landing sites.
export function journeyMarkerKind(scene: GameSceneId) {
  return scene === 'lap-lanh' ? 'tremors' : scene === 'tai-thinh' ? 'tracks' : scene === 'ban-banh-luoi' ? 'orbital-photo' : undefined;
}

export function drawJourneyMarker(g: Phaser.GameObjects.Graphics, scene: GameSceneId, elapsed: number) {
  g.clear();
  if (scene === 'lap-lanh') {
    // Low ellipses and tiny moving stones: ground motion, never camera shake.
    for (let i = 0; i < 3; i++) {
      const t = (elapsed / 2100 + i / 3) % 1;
      g.lineStyle(2, 0xe4d8ab, (1 - t) * .55).strokeEllipse(867, 443, 36 + t * 150, 7 + t * 27);
    }
    for (const [x, y, size] of [[810, 447, 5], [855, 432, 7], [903, 449, 5]]) {
      const offset = Math.sin(elapsed / 190 + x) * 1.4;
      g.fillStyle(0x33434b, .7).fillEllipse(x, y + 3, size * 3, 4);
      g.fillStyle(0xaeb5a5).fillTriangle(x - size + offset, y, x + offset, y - size, x + size + offset, y);
    }
  } else if (scene === 'tai-thinh') {
    for (let i = 0; i < 13; i++) {
      const x = 783 + i * 13, y = 445 - i * .6;
      for (const offset of [0, 21]) {
        g.lineStyle(3, 0x35474f, .9).lineBetween(x, y + offset, x + 7, y + offset - 3);
        g.lineStyle(1, 0xc0c1ab, .7).lineBetween(x + 1, y + offset + 3, x + 8, y + offset);
      }
    }
  } else if (scene === 'ban-banh-luoi') {
    // Lantern projection recalling the orbital photo already collected in this level.
    // Deliberately schematic: no new archival image or scientific measurement.
    g.fillStyle(0xffdf91, .09).fillEllipse(866, 446, 174, 63);
    const frame = [{ x: 799, y: 423 }, { x: 919, y: 413 }, { x: 945, y: 460 }, { x: 816, y: 476 }];
    g.fillStyle(0x263a40, .8).fillPoints(frame, true);
    g.lineStyle(1.5, 0xd7b875, .75).strokePoints(frame, true);
    for (const [x, y, w] of [[829, 436, 20], [896, 452, 25], [880, 425, 12]]) {
      g.lineStyle(1, 0xaeb6a4, .55).strokeEllipse(x, y, w, w * .36);
    }
    for (const offset of [0, 4]) {
      g.lineStyle(1, 0xdfcc98, .8).beginPath().moveTo(836, 452 + offset)
        .lineTo(857, 437 + offset).lineTo(876, 441 + offset).lineTo(906, 430 + offset).strokePath();
    }
    // Landing stage and parked rover, seen from above.
    g.fillStyle(0xffe3a1, .9).fillRect(832, 449, 6, 5).fillRect(902, 427, 5, 3);
    g.fillStyle(0x111f29, .8).fillRect(907, 429, 8, 3);
  }
}
