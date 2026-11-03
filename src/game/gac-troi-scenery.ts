import type Phaser from 'phaser';

/** Story framing, not a scale model: Cuội remains on the surface. */
export function gacTroiScenery(scene: Phaser.Scene) {
  const g = scene.add.graphics();
  g.fillStyle(0x0d141c).fillRect(0, 0, 960, 540);
  for (let i = 0; i < 52; i++) {
    g.fillStyle(i % 3 ? 0x9baeb1 : 0xd7b875, .35).fillRect((i * 137 + 21) % 960, (i * 47 + 13) % 255, 2, 2);
  }
  g.lineStyle(1, 0x9baeb1, .2).beginPath().arc(485, 430, 370, Math.PI * 1.06, Math.PI * 1.88).strokePath();
  g.fillStyle(0x43545c).fillPoints([{x:0,y:357},{x:140,y:318},{x:300,y:352},{x:490,y:327},{x:680,y:348},{x:840,y:310},{x:960,y:337},{x:960,y:540},{x:0,y:540}], true);
  g.fillStyle(0x727c7b).fillPoints([{x:0,y:405},{x:280,y:383},{x:520,y:402},{x:760,y:376},{x:960,y:391},{x:960,y:540},{x:0,y:540}], true);
  for (let i = 0; i < 210; i++) g.fillStyle(i % 3 ? 0x2c3b43 : 0xc4c4ac, .2).fillRect((i * 137 + 33) % 960, 400 + (i * 71) % 140, 2, 2);
  for (const [x,y,w] of [[90,463,72],[830,475,124],[550,415,42]]) {
    g.fillStyle(0x9ba39b).fillEllipse(x,y,w,w*.2);
    g.fillStyle(0x43545c).fillEllipse(x,y-2,w-6,w*.14);
  }
  // A lantern projection on the ground: the map is part of the imagined story.
  g.fillStyle(0xffdf91,.08).fillEllipse(720,447,190,43);
  g.lineStyle(1,0xd7b875,.5).strokeEllipse(720,447,150,30);
  for (const [x,y] of [[670,444],[716,452],[772,441]]) g.fillStyle(0xffe3a1,.8).fillRect(x,y,4,3);
  g.lineStyle(1,0xd7b875,.3).lineBetween(670,444,716,452).lineBetween(716,452,772,441);

  // Code-native pixel spacecraft, matching the existing rover/instrument props.
  const craft = scene.add.graphics({ x: 640, y: 170 }).setDepth(2);
  craft.fillStyle(0x273940).fillRect(27,-15,120,42);
  craft.lineStyle(2,0x9baeb1).strokeRect(27,-15,120,42);
  for (let x=31;x<145;x+=14) for (let y=-11;y<24;y+=10) {
    craft.fillStyle((x+y)%3 ? 0x3e5868 : 0x526977).fillRect(x,y,11,7);
  }
  craft.fillStyle(0x9c8659).fillRect(16,-2,14,7);
  craft.fillStyle(0x554536).fillRect(-34,-28,54,65);
  craft.fillStyle(0xd7b875).fillRect(-31,-25,48,58);
  craft.fillStyle(0x9d814e).fillRect(4,-24,12,55);
  for (const [x,y] of [[-25,-20],[-12,-7],[-25,9],[-7,22]]) {
    craft.fillStyle(0xf0d99c).fillRect(x,y,10,4);
    craft.fillStyle(0xb19460).fillRect(x+2,y+5,8,3);
  }
  craft.fillStyle(0xc7c6b2).fillRect(-25,33,10,13).fillRect(-8,33,10,9);
  craft.fillStyle(0x101e28).fillRect(-23,41,6,6).fillRect(-6,38,6,5);
  craft.lineStyle(3,0xaeb7af).lineBetween(-28,-12,-54,-33);
  craft.fillStyle(0xdedac0).fillTriangle(-77,-44,-36,-44,-54,-22);
  craft.lineStyle(2,0x889995).lineBetween(-77,-44,-36,-44);
  craft.lineStyle(2,0xdedac0).lineBetween(-55,-36,-59,-55);
  // Discrete signal marks rather than flashing animation.
  g.lineStyle(2,0xd7b875,.5).beginPath().arc(621,168,13,.5,2.5).strokePath();
  g.lineStyle(1,0xd7b875,.3).beginPath().arc(621,168,24,.5,2.5).strokePath();
}
