import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode:true, hmr:false, ws:false }, appType:'custom' });
try {
 const { freshGacTroi, readGacTroi } = await server.ssrLoadModule('/src/content/levels/gac-troi-progress.ts');
 const { freshGacRabbit, applyGacRabbitAction: act } = await server.ssrLoadModule('/src/content/levels/gac-troi-rabbit.ts');
 for (const collect of [true,false]) {
 let p={...freshGacTroi(),t02Done:true,matched:['surveyor','lap-lanh'],seen:['surveyor','lap-lanh'],phase:'gac-free',routeLandmarks:['slope','rock','banyan'],farewellDone:true,completedOnce:true,rabbitJourney:{...freshGacRabbit(),active:true,stage:'slope'}};
 for (const stop of ['slope','rock','banyan']) {
  assert.equal(act(p,{type:'peek',stop}),p);
  p=act(p,{type:'guide',stop});
  if(collect) { p=act(p,{type:'gift',stop}); assert.equal(act(p,{type:'gift',stop}),p); }
  p=act(p,{type:'peek',stop});
  assert.equal(p.rabbitJourney.rabbitFound,true);
  p=readGacTroi(p);
  assert.equal(p.rabbitJourney.guidedStops.includes(stop),true);
  p=act(p,{type:'next',stage:stop});
 }
 assert.equal(p.rabbitJourney.stage,'reunion');
 assert.equal(p.rabbitJourney.gifts?.length??0,collect?3:0);
 assert.equal(p.completedOnce,true);
 }
 console.log('Peekaboo: hints, optional gifts, save roundtrip and reunion passed.');
} finally { await server.close(); }
