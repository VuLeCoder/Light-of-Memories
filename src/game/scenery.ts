import Phaser from 'phaser';

// Temporary scenery drawn in game coordinates; replace each layer independently.
export function sky(scene: Phaser.Scene, lunar = false) {
  const g = scene.add.graphics();
  const bands = lunar ? [0x101a30, 0x17223a, 0x24354b, 0x35455d] : [0x101d2b, 0x162b39, 0x203b48, 0x385153];
  bands.forEach((color, i) => g.fillStyle(color).fillRect(0, i * 135, 960, 136));
  for (let i = 0; i < 62; i++) {
    const x = (i * 137 + 31) % 948;
    const y = (i * 73 + 19) % 320;
    g.fillStyle(i % 4 === 0 ? 0xe9d6a0 : 0x829da6, i % 3 === 0 ? 0.7 : 0.35);
    g.fillRect(x, y, i % 5 === 0 ? 3 : 2, 2);
  }
  if (!lunar) {
    g.fillStyle(0xbdd1bd, 0.035).fillCircle(772, 117, 112);
    g.fillStyle(0xc8d8bc, 0.05).fillCircle(772, 117, 90);
    g.fillStyle(0xf1e8c1).fillCircle(772, 117, 53);
    g.fillStyle(0xcfcda8, 0.6).fillRect(748, 91, 16, 8).fillRect(778, 135, 21, 9).fillRect(795, 103, 12, 19);
    g.fillStyle(0x8da1a4, 0.12).fillRect(656, 172, 131, 7).fillRect(697, 179, 143, 5);
  } else {
    g.fillStyle(0x8ca8ad, 0.045).fillCircle(782, 118, 67);
    g.fillStyle(0x9bbcc4).fillCircle(782, 118, 32);
    g.fillStyle(0x668b88).fillRect(764, 96, 21, 11).fillRect(774, 105, 10, 22).fillRect(790, 124, 16, 9);
    g.fillStyle(0xd0dddb, 0.75).fillRect(757, 110, 41, 4).fillRect(779, 134, 22, 4);
  }
  return g;
}

export function earthScenery(scene: Phaser.Scene) {
  sky(scene);
  const far = scene.add.graphics();
  far.fillStyle(0x203b3d);
  for (let i = 0; i < 12; i++) {
    far.fillRect(520 + i * 42, 308 - (i % 3) * 21, 51, 114);
    far.fillTriangle(504 + i * 42, 310 - (i % 3) * 21, 545 + i * 42, 275 - (i % 3) * 21, 586 + i * 42, 310 - (i % 3) * 21);
  }
  far.fillStyle(0x132e32).fillRect(0, 381, 960, 159);
  const house = scene.add.graphics();
  house.fillStyle(0x5c5144).fillRect(0, 192, 492, 229);
  house.fillStyle(0x6f6049).fillRect(0, 205, 473, 204);
  for (let x = 0; x < 470; x += 62) {
    house.fillStyle(0x8b7652, 0.25).fillRect(x, 207, 3, 201);
  }
  house.fillStyle(0x2e3330).fillRect(29, 227, 94, 170).fillRect(300, 224, 106, 170);
  house.fillStyle(0xb38d4b, 0.2).fillRect(35, 232, 82, 161);
  house.fillStyle(0x8d6942).fillRect(310, 233, 87, 106);
  house.fillStyle(0xe8b65c, 0.42).fillRect(316, 239, 75, 93);
  house.fillStyle(0x493f32).fillRect(350, 235, 6, 103).fillRect(311, 280, 85, 6);
  house.fillStyle(0x453f37).fillRect(22, 220, 108, 9).fillRect(293, 217, 120, 10);
  // Stepped terracotta roof, with individual tiles.
  for (let row = 0; row < 8; row++) {
    const x = 42 - row * 13;
    const y = 108 + row * 12;
    house.fillStyle(row % 2 === 0 ? 0x6b4b40 : 0x785446).fillRect(x, y, 404 + row * 26, 12);
    for (let tx = x + 12; tx < 447 + row * 13; tx += 29) {
      house.fillStyle(0xaa7953, 0.4).fillRect(tx, y, 19, 3);
      house.fillStyle(0x3b3834, 0.35).fillRect(tx + 20, y + 3, 3, 9);
    }
  }
  house.fillStyle(0x3e3933).fillRect(0, 205, 549, 13);
  house.fillStyle(0x433c32).fillRect(451, 212, 18, 209);
  house.fillStyle(0x8d6a43).fillRect(453, 214, 5, 204);
  house.fillStyle(0x81745d).fillRect(0, 408, 509, 17);
  house.fillStyle(0x544d43).fillRect(0, 425, 533, 16);
  house.fillStyle(0x94826a).fillRect(0, 441, 552, 10);
  house.fillStyle(0x615a4b).fillRect(0, 451, 570, 17);
  // Lantern glow and the small hanging lantern.
  const lamp = scene.add.graphics();
  lamp.fillStyle(0xf9c165, 0.035).fillCircle(419, 257, 83);
  lamp.lineStyle(2, 0xbaa06c).lineBetween(419, 218, 419, 242);
  lamp.fillStyle(0x9a533d).fillRect(405, 241, 28, 37);
  lamp.fillStyle(0xedb85c).fillRect(409, 245, 20, 28);
  lamp.fillStyle(0xffd984).fillRect(415, 246, 8, 26);
  lamp.fillStyle(0xaa7049).fillRect(405, 239, 28, 4).fillRect(405, 275, 28, 4).fillRect(418, 280, 2, 11);
  const ground = scene.add.graphics();
  ground.fillStyle(0x263a34).fillRect(570, 416, 390, 124).fillRect(0, 488, 960, 52);
  for (let i = 0; i < 70; i++) {
    const x = (i * 83 + 17) % 960;
    const y = 473 + (i * 23) % 65;
    ground.fillStyle(i % 3 ? 0x3c4b3b : 0x697052, 0.7).fillRect(x, y, 4 + i % 9, 3);
  }
  // Right-hand bamboo silhouette frames the moon without covering it.
  for (let i = 0; i < 4; i++) {
    ground.fillStyle(0x132d2b).fillRect(891 + i * 19, 205 - i * 23, 7, 284 + i * 23);
    for (let j = 0; j < 5; j++) {
      const x = 891 + i * 19, y = 224 + j * 43 - i * 23;
      ground.fillStyle(0x284337).fillRect(x, y, 7, 3);
      ground.fillStyle(0x18342e).fillTriangle(x, y, x - 51, y - 21, x - 14, y - 3);
      ground.fillTriangle(x, y + 8, x + 49, y - 13, x + 18, y + 7);
    }
  }
  return { house, ground };
}

export function moonScenery(scene: Phaser.Scene) {
  sky(scene, true);
  const hills = scene.add.graphics();
  hills.fillStyle(0x3d4c61).fillPoints([
    {x: 0, y: 356}, {x: 113, y: 295}, {x: 238, y: 337}, {x: 386, y: 280},
    {x: 529, y: 345}, {x: 664, y: 292}, {x: 813, y: 320}, {x: 960, y: 272},
    {x: 960, y: 540}, {x: 0, y: 540},
  ], true);
  hills.fillStyle(0x526176).fillRect(0, 391, 960, 149);
  hills.fillStyle(0x778291).fillRect(0, 420, 960, 8);
  hills.fillStyle(0x677484).fillRect(0, 428, 960, 112);
  for (let i = 0; i < 70; i++) {
    hills.fillStyle(i % 3 ? 0x9a9da2 : 0x414f66, 0.45);
    hills.fillRect((i * 137) % 955, 438 + (i * 37) % 100, 3 + i % 15, 2 + i % 3);
  }
  hills.fillStyle(0x4e5d73).fillEllipse(767, 481, 108, 23).fillEllipse(481, 515, 75, 16);
  hills.fillStyle(0x7f8b99).fillEllipse(769, 477, 97, 13).fillEllipse(483, 512, 64, 9);
  // Separate tree object: deliberately a pixel stand-in, not the dialogue portrait.
  const tree = scene.add.graphics();
  tree.fillStyle(0xdeb974, 0.035).fillCircle(225, 323, 158);
  tree.fillStyle(0x685846).fillRect(171, 203, 58, 217).fillRect(157, 351, 31, 69).fillRect(222, 358, 23, 62);
  tree.fillStyle(0x8a7151).fillRect(180, 200, 13, 210).fillRect(211, 271, 9, 142);
  tree.fillStyle(0x50483e).fillRect(198, 226, 9, 186);
  tree.fillStyle(0x685846).fillTriangle(181, 417, 99, 439, 173, 388).fillTriangle(212, 410, 284, 435, 227, 381);
  tree.fillStyle(0x675c48).fillRect(135, 197, 42, 22).fillRect(121, 160, 25, 54).fillRect(226, 189, 56, 22).fillRect(264, 145, 19, 57);
  for (let i = 0; i < 17; i++) {
    const x = 33 + (i * 61) % 317;
    const y = 95 + (i * 37) % 115;
    tree.fillStyle([0x304d47, 0x3c5c4e, 0x4b6851, 0x5b7355][i % 4]);
    tree.fillRect(x, y, 72, 47).fillRect(x + 10, y - 12, 50, 71);
  }
  for (let i = 0; i < 9; i++) {
    tree.fillStyle(i % 2 ? 0x685d45 : 0x4e5743).fillRect(52 + i * 38, 192 + i % 3 * 9, 3, 73 + i % 4 * 23);
  }
  const bench = scene.add.graphics();
  bench.fillStyle(0x3d4a5b, 0.35).fillEllipse(520, 438, 170, 18);
  bench.fillStyle(0x92989b).fillRect(451, 350, 139, 14).fillRect(456, 363, 129, 26);
  bench.fillStyle(0xb3b5ad).fillRect(451, 350, 139, 5);
  bench.fillStyle(0x6d7882).fillRect(460, 388, 10, 17).fillRect(570, 388, 10, 17);
  bench.fillStyle(0xa2a8a8).fillRect(444, 402, 153, 11);
  bench.fillStyle(0x7a8690).fillRect(453, 413, 17, 23).fillRect(570, 413, 17, 23);
  const tracks = scene.add.graphics();
  for (let i = 0; i < 9; i++) {
    tracks.fillStyle(0x404f65, 0.55).fillRect(659 + i * 29, 435 - i * 3 + i % 2 * 10, 10, 5);
    tracks.fillStyle(0x46556a, 0.45).fillRect(698 + i * 29, 421 - i * 3, 13, 2).fillRect(698 + i * 29, 412 - i * 3, 13, 2);
  }
  return { tree, bench, tracks };
}
