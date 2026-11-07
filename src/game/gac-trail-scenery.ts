import type Phaser from 'phaser';
import { sparkleScenery } from './sparkle-scenery';
import type { GameSceneId } from './types';
import { gacLandmarkShapes } from '../content/levels/gac-troi-light';

export const isGacTrail = (scene: GameSceneId) => scene.startsWith('t04-') || scene === 'reunion';

/** Parse the shared orthogonal silhouettes, so map and ground have identical outlines. */
function outline(path: string, x: number, y: number, scale: number) {
  const tokens = path.match(/[MHVLZ]|-?\d+/g)!;
  const points: { x: number; y: number }[] = [];
  let px = 0, py = 0;
  for (let i = 0; i < tokens.length;) {
    const command = tokens[i++];
    if (command === 'Z') break;
    if (command === 'M' || command === 'L') { px = Number(tokens[i++]); py = Number(tokens[i++]); }
    if (command === 'H') px = Number(tokens[i++]);
    if (command === 'V') py = Number(tokens[i++]);
    points.push({ x: x + px * scale, y: y + py * scale });
  }
  return points;
}

/** Entirely imagined pixel scenery. No historical equipment is placed under the tree. */
export function drawGacTrail(scene: Phaser.Scene, phase: GameSceneId, rabbitJourney = false) {
  if (rabbitJourney) { drawRabbitLandscape(scene, phase); return; }
  const g = scene.add.graphics();
  g.fillStyle(0x0d1822).fillRect(0, 0, 960, 540);
  for (let i = 0; i < 50; i++) g.fillStyle(i % 4 ? 0x9baeb1 : 0xd7b875, .45).fillRect((i * 137 + 25) % 960, (i * 43 + 15) % 270, 2, 2);
  g.fillStyle(0x2c414b).fillPoints([{x:0,y:350},{x:140,y:310},{x:310,y:346},{x:520,y:320},{x:690,y:347},{x:840,y:304},{x:960,y:332},{x:960,y:540},{x:0,y:540}], true);
  g.fillStyle(0x667673).fillRect(0, 410, 960, 130);
  g.fillStyle(0x819087).fillRect(0, 410, 960, 8);
  for (let i = 0; i < 220; i++) g.fillStyle(i % 3 ? 0x293e46 : 0xc4c4ac, .23).fillRect((i * 137 + 33) % 960, 425 + (i * 71) % 115, i % 5 ? 2 : 7, 2);
  if (phase === 't04-slope') {
    g.fillStyle(0x1e343c).fillPoints(outline(gacLandmarkShapes[2], 893, 315, .65), true);
    g.fillStyle(0x3a4c55).fillPoints([{x:290,y:390},{x:290,y:320},{x:330,y:320},{x:330,y:250},{x:365,y:250},{x:365,y:218},{x:400,y:218},{x:400,y:300},{x:435,y:300},{x:435,y:340},{x:480,y:340},{x:480,y:390}], true);
    g.lineStyle(3,0x98a39a).strokePoints([{x:290,y:320},{x:330,y:320},{x:330,y:250},{x:365,y:250},{x:365,y:218},{x:400,y:218},{x:400,y:300},{x:435,y:300},{x:435,y:340},{x:480,y:340}], false);
    g.fillStyle(0xa2a78f).fillPoints(outline(gacLandmarkShapes[0], 680, 345, 2.5), true);
    g.lineStyle(3,0xd6c59b).strokePoints(outline(gacLandmarkShapes[0], 680, 345, 2.5), true);
  } else if (phase === 't04-rock') {
    g.fillStyle(0x8c9792).fillPoints(outline(gacLandmarkShapes[1], 560, 350, 2.4), true);
    g.lineStyle(4,0xc9c5ac).strokePoints(outline(gacLandmarkShapes[1], 560, 350, 2.4), true);
    g.fillStyle(0x172b35).fillPoints([{x:543,y:398},{x:560,y:356},{x:579,y:398}], true);
    if (!rabbitJourney) g.fillStyle(0xffe3a2).fillPoints([{x:680,y:78},{x:685,y:94},{x:702,y:100},{x:685,y:106},{x:680,y:122},{x:675,y:106},{x:658,y:100},{x:675,y:94}], true);
    g.fillStyle(0xffdf91,.12).fillEllipse(740,376,140,32);
    g.fillStyle(0x596b6b).fillPoints([{x:775,y:360},{x:802,y:330},{x:834,y:353},{x:846,y:409},{x:770,y:409}],true);
  } else {
    g.fillStyle(0xffdf91,.11).fillEllipse(735,421,240,42);
    g.fillStyle(0x344d48).fillPoints(outline(gacLandmarkShapes[2],740,285,2.7),true);
    g.lineStyle(4,0x6a816a).strokePoints(outline(gacLandmarkShapes[2],740,285,2.7),true);
    g.fillStyle(0x665b43).fillRect(716,253,50,157);
    g.fillStyle(0x8e7b54).fillRect(719,264,9,143).fillRect(746,280,6,127);
    for (const x of [653,674,802,820]) g.fillStyle(0x8e8060).fillRect(x,254,4,125-(x%3)*12);
    g.lineStyle(5,0x796c4e).lineBetween(718,402,692,419).lineBetween(750,403,779,417);
    if (!rabbitJourney) drawHang(scene,phase === 'reunion');
    // Open story notebook and illustrated device cards, rather than actual artefacts.
    if (!rabbitJourney) {
      g.fillStyle(0xe6dcc2).fillPoints([{x:772,y:414},{x:807,y:407},{x:837,y:414},{x:837,y:434},{x:807,y:427},{x:772,y:434}],true);
      g.lineStyle(2,0x9e8960).lineBetween(807,409,807,427);
      g.fillStyle(0x648383).fillRect(782,418,13,6).fillRect(818,418,9,7);
    }
  }
}

/** Kept out of the cached backdrop so the lantern can sway gently. */
export function drawTrailLantern(scene: Phaser.Scene) {
  const g = scene.add.graphics({x:740,y:271}).setDepth(2);
  g.lineStyle(4,0xd7b875).strokeRect(-10,0,20,14);
  g.fillStyle(0xeed395).fillRect(-21,15,42,47);
  g.lineStyle(4,0x9a704b).strokeRect(-21,15,42,47).lineBetween(-8,15,-8,62).lineBetween(8,15,8,62);
  return g;
}

/** Two code-native pixel poses with the same foot anchor; based on the existing portrait. */
export function drawHang(scene: Phaser.Scene, greeting: boolean, x = 790) {
  const g = scene.add.graphics({x,y:421});
  const poly = (color:number, points:number[]) => g.fillStyle(color).fillPoints(points.reduce<{x:number;y:number}[]>((a,_,i)=>i%2?a:[...a,{x:points[i],y:points[i+1]}],[]),true);
  g.fillStyle(0x182c34,.4).fillEllipse(0,1,70,12);
  g.fillStyle(0x283136).fillRect(-20,-145,40,108).fillRect(-27,-129,12,99).fillRect(17,-125,13,94);
  poly(0x83a89b,[-19,-63,19,-63,27,-4,3,-4,0,-42,-4,-4,-27,-4]);
  poly(0xeee3c6,[-16,-104,17,-104,28,-22,6,-17,0,-61,-7,-19,-29,-25]);
  g.lineStyle(2,0x96b8a3).lineBetween(-9,-105,0,-94).lineBetween(0,-94,9,-105).lineBetween(0,-94,4,-39);
  g.fillStyle(0xf0c49c).fillRect(-14,-140,28,34).fillRect(-8,-109,16,9);
  g.fillStyle(0x302c29).fillRect(-20,-148,40,13).fillRect(-22,-137,10,25).fillRect(-17,-156,23,12);
  g.fillStyle(0x88b9aa).fillRect(-19,-145,7,7).fillRect(-22,-138,3,18);
  g.fillStyle(0x40352e).fillRect(-10,-127,4,4).fillRect(7,-127,4,4);
  g.fillStyle(0xb97c64).fillRect(-2,-115,9,2);
  poly(0xe5d9bb,greeting?[-16,-102,-25,-95,-43,-115,-50,-108,-33,-81,-20,-79]:[-16,-102,-29,-97,-32,-76,-15,-64,-8,-75,-19,-83]);
  g.fillStyle(0xf0c49c).fillRect(greeting?-51:-13,greeting?-122:-78,9,13);
  poly(0xe5d9bb,[16,-103,27,-96,32,-75,13,-67,9,-76,20,-83]);
  g.fillStyle(0x9fc0aa).fillRect(-29,-81,10,5).fillRect(22,-82,8,5);
  for (const [x,y] of [[7,-86],[-14,-45],[12,-28]]) {
    g.fillStyle(0x8caf9a).fillRect(x,y,4,12).fillRect(x-4,y+2,12,4).fillRect(x-2,y+9,8,3);
  }
  g.fillStyle(0xeee3c6).fillRect(-27,-5,23,5).fillRect(5,-5,24,5);
  if (!greeting) {
    g.fillStyle(0xf2e9cf).fillRect(-15,-77,30,16);
    g.lineStyle(2,0xb29b6c).strokeRect(-15,-77,30,16).lineBetween(0,-77,0,-61);
    g.fillStyle(0x6f9290).fillRect(-11,-73,7,6);
    g.fillStyle(0xf0c49c).fillRect(-20,-72,7,7).fillRect(13,-72,7,7);
  }
}

/** The same layered lunar soil as Sparkle, with story landmarks in the foreground. */
function drawRabbitLandscape(scene: Phaser.Scene, phase: GameSceneId) {
  sparkleScenery(scene);
  const g = scene.add.graphics();
  const polygon = (color: number, points: number[], alpha = 1) => g.fillStyle(color, alpha).fillPoints(
    Array.from({length: points.length / 2}, (_, i) => ({x: points[i * 2], y: points[i * 2 + 1]})), true);
  // Low, distant crater rims keep the foreground clues readable.
  for (const [x,y,w] of [[140,245,95],[480,215,70],[850,285,100]]) {
    g.fillStyle(0x33434b,.2).fillEllipse(x,y,w,14);
    g.lineStyle(2,0xc3c1b5,.35).strokeEllipse(x,y-3,w,13);
  }
  if (phase === 't04-banyan') {
    // Low ridges keep the orbital companion clear and leave the search rocks readable.
    polygon(0x6e7c7d,[0,213,70,201,124,178,166,194,222,211,283,207,340,222,0,239]);
    polygon(0x87928e,[70,201,124,178,110,198,151,207,166,194,222,211,185,216]);
    polygon(0x68787b,[535,221,589,209,642,181,682,197,720,215,779,207,830,185,874,201,921,218,960,209,960,245,535,245]);
    polygon(0x89958f,[589,209,642,181,625,204,667,215,682,197,720,215,677,224]);
    polygon(0x7d8b88,[779,207,830,185,817,206,851,214,874,201,921,218,858,224]);
    g.lineStyle(2,0xa6aea0,.25).lineBetween(605,228,674,232).lineBetween(843,233,913,237);
    // Small loose stones stay well behind the interactive foreground props.
    for (const [x,y,w] of [[100,299,16],[395,277,12],[871,318,21]]) {
      g.fillStyle(0x33434b,.25).fillEllipse(x,y+3,w*1.7,5);
      polygon(0x7a8987,[x-w/2,y,x-w*.15,y-7,x+w*.3,y-4,x+w/2,y]);
    }
  }
  if (phase === 'reunion') {
    g.fillStyle(0x263740,.3).fillEllipse(743,428,280,32);
    // Organic trunk and interlocking foliage echo the banyan of the opening.
    polygon(0x655b46,[683,424,710,395,722,302,709,250,731,238,747,293,759,244,777,246,758,331,769,402,806,426,751,414,735,386,723,415]);
    polygon(0x9a8860,[710,408,731,330,727,269,736,280,742,356,730,404]);
    polygon(0x3c483a,[749,405,748,320,766,260,759,331,769,402,793,421]);
    for (const [x,y,rx,ry] of [[640,233,120,61],[688,194,151,81],[761,181,156,87],[819,214,143,75],[752,236,171,73]]) {
      g.fillStyle(0x263f3d).fillEllipse(x,y,rx,ry);
      g.fillStyle(0x3a5750).fillEllipse(x-9,y-12,rx*.88,ry*.75);
      g.fillStyle(0x506b59,.7).fillEllipse(x-21,y-23,rx*.55,ry*.4);
    }
    for(let i=0;i<85;i++) {
      const x=593+(i*47)%278,y=170+(i*29)%83;
      g.fillStyle(i%3 ? 0x789075 : 0xabc29a,.24).fillEllipse(x,y,8+i%5,3);
    }
    for(const [x,y,h] of [[653,251,111],[677,266,98],[801,250,119],[824,243,99]]) {
      g.lineStyle(2,0x8e8060,.8).lineBetween(x,y,x-3,y+h);
      g.lineStyle(1,0xb3a27a,.5).lineBetween(x+3,y,x+1,y+h-15);
    }
  }
}
