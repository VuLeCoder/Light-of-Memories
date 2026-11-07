import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ optimizeDeps: { noDiscovery:true, include:[] }, server: { middlewareMode:true, hmr:false, ws:false }, appType:'custom' });
try {
 const { freshGacTroi, readGacTroi } = await server.ssrLoadModule('/src/content/levels/gac-troi-progress.ts');
 const { freshGacRabbit, applyGacRabbitAction: act, replayGacRabbitJourney } = await server.ssrLoadModule('/src/content/levels/gac-troi-rabbit.ts');
 for (const mode of ['before','after','none']) for (const guided of [true,false]) {
 let p={...freshGacTroi(),t02Done:true,matched:['surveyor','lap-lanh'],seen:['surveyor','lap-lanh'],phase:'gac-free',routeLandmarks:['slope','rock','banyan'],farewellDone:true,completedOnce:true,rabbitJourney:{...freshGacRabbit(),active:true,stage:'slope'}};
 for (const stop of ['slope','rock','banyan']) {
  const stale = stop === 'slope' ? 'rock' : 'slope';
  assert.equal(act(p,{type:'peek',stop:stale}),p);
  if(guided) p=act(p,{type:'guide',stop});
  if(mode === 'before') { p=act(p,{type:'gift',stop}); assert.equal(act(p,{type:'gift',stop}),p); }
  p=act(p,{type:'peek',stop});
  assert.equal(p.rabbitJourney.rabbitFound,true);
  assert.equal(act(p,{type:'peek',stop}),p);
  if(mode === 'after') p=act(p,{type:'gift',stop});
  p=readGacTroi(p);
  assert.equal(p.rabbitJourney.guidedStops?.includes(stop) ?? false,guided);
  p=act(p,{type:'next',stage:stop});
 }
 assert.equal(p.rabbitJourney.stage,'reunion');
 assert.equal(p.rabbitJourney.gifts?.length??0,mode === 'none'?0:3);
 assert.equal(p.completedOnce,true);
 const replay = replayGacRabbitJourney(p);
 assert.equal(replay.rabbitJourney.stage,'bridge');
 assert.equal(replay.rabbitJourney.gifts,undefined);
 assert.deepEqual({...replay,rabbitJourney:null},{...p,rabbitJourney:null});
 }
 console.log('Peekaboo: direct discovery, optional hints, gifts before/after/none, stale events, save roundtrip and reunion passed.');
} finally { await server.close(); }
