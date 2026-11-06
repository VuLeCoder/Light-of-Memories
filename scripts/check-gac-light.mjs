import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const load = path => server.ssrLoadModule(`/src/${path}.ts`);
  const { gacLightSections, gacLightDialogue } = await load('content/levels/gac-troi-light');
  const { freshGacTroi, readGacTroi, replayGacTroi, gacDialogueLengths } = await load('content/levels/gac-troi-progress');
  const { advanceGacDialogue: advance, keepGacLandmark: keep, enterGacTrail: enter, gacPhaseAvailable } = await load('content/levels/gac-troi-flow');
  let p = readGacTroi({ ...freshGacTroi(), matched: ['surveyor', 'lap-lanh'], seen: ['surveyor', 'lap-lanh'], t02Done: true, phase: 't03-map' });
  const walk = advance({ ...p, phase: 't03-intro', turn: 2 });
  assert.equal(walk.phase, 't03-walk');
  assert.equal(readGacTroi(walk).phase, 't03-walk');
  assert.equal(gacPhaseAvailable('t03-walk'), true);
  assert.ok(p.bookUnlocks.includes('gac-book-light'));
  assert.equal(enter(p), p);
  for (const [i, item] of gacLightSections.entries()) {
    assert.equal(item.branches.filter(b => b.lit.every(Boolean)).length, 1);
    assert.equal(keep(p, gacLightSections[(i + 1) % 3].landmark), p, 'Cannot skip a landmark');
    p = keep(p, item.landmark);
    assert.equal(p.routeLandmarks.length, i + 1);
    assert.deepEqual(readGacTroi(p), p, 'Correct landmark checkpoint reloads exactly');
  }
  assert.equal(p.phase, 't03-story');
  assert.equal(p.completedOnce, false);
  p = advance({ ...p, turn: 1 });
  assert.ok(p.bookUnlocks.includes('gac-book-map'));
  for (let turn = 0; turn < 3; turn++) {
    const q = { ...p, turn };
    assert.equal(advance(q), q);
    assert.equal(q.completedOnce, false);
    assert.deepEqual(readGacTroi(q), q);
  }
  p = advance({ ...p, turn: 3 });
  assert.equal(p.completedOnce, true); assert.equal(p.farewellDone, true);
  assert.equal(enter(p).phase, 't04-slope');
  assert.equal(gacPhaseAvailable('t04-slope'), true);
  const replay = replayGacTroi(p);
  assert.equal(replay.completedOnce, true); assert.equal(replay.farewellDone, false);
  assert.deepEqual(replay.routeLandmarks, []); assert.deepEqual(replay.bookUnlocks, p.bookUnlocks);
  assert.equal(enter(replay), replay, 'Earned light never bypasses the new farewell');
  for (const phase of ['t03-intro', 't03-story', 'gac-farewell']) for (const language of ['vi', 'en']) {
    assert.equal(gacLightDialogue(phase, language).length, gacDialogueLengths[phase]);
  }
  console.log('T03 verified: branch lighting, ordered landmark saves, farewell transactions, replay, dialogue lengths and T04 gate.');
} finally { await server.close(); }
