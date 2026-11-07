import type Phaser from 'phaser';
import { drawEarth } from './scenery';
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

  // The portrait is rendered separately at display resolution.
  drawEarth(g, 782, 90);
}
