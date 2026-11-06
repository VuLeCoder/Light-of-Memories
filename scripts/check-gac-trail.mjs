import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const load = path => server.ssrLoadModule(`/src/${path}.ts`);
  const { freshGacTroi, readGacTroi, replayGacTroi, gacDialogueLengths } = await load('content/levels/gac-troi-progress');
  const { enterGacTrail, keepGacClue, advanceGacDialogue, gacPhaseAvailable } = await load('content/levels/gac-troi-flow');
  const { gacReunionDialogue } = await load('content/levels/gac-troi-trail');
  const { getBookHintPage } = await load('content/book/reading-order');
  const { freshSurveyor } = await load('content/levels/surveyor-progress');
  const { freshSparkle } = await load('content/levels/lap-lanh');
  let p = readGacTroi({...freshGacTroi(), phase:'gac-free', matched:['surveyor','lap-lanh'], seen:['surveyor','lap-lanh'], t02Done:true, routeLandmarks:['low-slope','split-rock','banyan-shadow'], farewellDone:true, completedOnce:true});
  const reload = () => assert.deepEqual(readGacTroi(JSON.parse(JSON.stringify(p))),p);
  p = enterGacTrail(p);
  for (const [i, clue] of ['slope','lantern','call'].entries()) {
    assert.equal(gacPhaseAvailable(p.phase),true);
    assert.equal(keepGacClue(p,['lantern','call','slope'][i]),p,'Cannot skip or repeat a clue');
    assert.equal(advanceGacDialogue(p),p,'Observation alone cannot complete a clue');
    assert.equal(getBookHintPage({surveyor:freshSurveyor(),sparkle:freshSparkle(),gacTroi:p},'gac-troi'),'gac-book-map');
    reload(); p=keepGacClue(p,clue); reload();
    assert.equal(p.clues.length,i+1);
    assert.equal(p.reunionDone,false); assert.equal(p.storyCompletedOnce,false);
  }
  assert.equal(p.phase,'reunion');
  assert.equal(keepGacClue(p,'call'),p,'The approach cannot trigger reunion twice');
  for (const language of ['vi','en']) {
    const lines=gacReunionDialogue(language);
    assert.equal(lines.length,gacDialogueLengths.reunion);
    assert.deepEqual(lines.map(l=>l.id),gacReunionDialogue('vi').map(l=>l.id));
    assert.ok(lines.some(l=>l.speaker==='chiHang'));
  }
  for (let turn=0;turn<5;turn++) {
    p={...p,turn};reload();
    if(turn<4)assert.equal(advanceGacDialogue(p),p);
  }
  p=advanceGacDialogue(p); reload();
  assert.equal(p.phase,'cards-intro'); assert.equal(p.reunionDone,true);
  assert.ok(p.bookUnlocks.includes('ending-book-cards')); assert.equal(p.storyCompletedOnce,false);
  assert.equal(gacPhaseAvailable(p.phase),false,'M5 stays gated');
  const replay=replayGacTroi(p);
  assert.deepEqual(replay.clues,[]);assert.equal(replay.reunionDone,false);
  assert.equal(enterGacTrail(replay),replay,'Past achievement cannot bypass this playthrough');
  assert.ok(replay.bookUnlocks.includes('gac-book-map'));
  assert.equal(readGacTroi({...p,phase:'reunion',clues:['slope','call']}).phase,'t04-rock');
  console.log('T04 verified: ordered clue transactions/reloads, single reunion, bilingual script, map hint, replay and M5 gate.');
} finally { await server.close(); }
