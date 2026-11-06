import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const state = await server.ssrLoadModule('/src/content/levels/gac-troi-progress.ts');
  const rabbit = await server.ssrLoadModule('/src/content/levels/gac-troi-rabbit.ts');
  const storage = await server.ssrLoadModule('/src/state/progress.ts');
  const { freshGacTroi, readGacTroi, replayGacTroi } = state;
  const base = { ...freshGacTroi(), matched: ['surveyor', 'lap-lanh'], seen: ['surveyor', 'lap-lanh'], t02Done: true };
  const old = { ...base, revision: 2, routeLandmarks: [...state.gacRouteLandmarks], farewellDone: true, completedOnce: true };
  for (const phase of ['t03-intro', 't03-map', 't03-story', 'gac-farewell', 'gac-free']) {
    const result = readGacTroi({ ...old, phase });
    assert.equal(result.revision, 3);
    assert.equal(result.rabbitJourney.stage, 'real');
    assert.equal(result.completedOnce, true);
    assert.deepEqual(readGacTroi(result), result);
  }
  for (const [index, phase] of ['t04-slope', 't04-rock', 't04-banyan'].entries()) {
    const result = readGacTroi({ ...old, phase, clues: state.gacClues.slice(0, index) });
    assert.equal(result.rabbitJourney.stage, rabbit.rabbitStops[index]);
    assert.equal(result.rabbitJourney.completedStops, index);
    assert.equal(result.rabbitJourney.rabbitFound, false);
    assert.equal(result.rabbitJourney.starsAwake, 0);
  }
  const completed = readGacTroi({ ...old, phase: 'story-end', clues: [...state.gacClues], reunionDone: true,
    understoodCards: [...state.gacCards], storyCompletedOnce: true, bookUnlocks: [...state.gacBookUnlockIds] });
  assert.equal(completed.phase, 'story-end');
  assert.equal(completed.rabbitJourney.stage, 'free');
  assert.deepEqual(readGacTroi(completed), completed);
  assert.equal(replayGacTroi(completed).rabbitJourney, null);
  assert.equal(replayGacTroi(completed).completedOnce, true);
  assert.equal(replayGacTroi(completed).storyCompletedOnce, true);
  assert.deepEqual(replayGacTroi(completed).bookUnlocks, completed.bookUnlocks);
  assert.equal(rabbit.gacRabbitReleased, false);
  assert.equal(rabbit.startGacRabbitJourney(base), base);
  // Exercise staged flow directly; the production activation remains closed.
  let p = { ...base, phase: 't03-intro', rabbitJourney: { ...rabbit.freshGacRabbit(), active: true } };
  let raw;
  globalThis.localStorage = { getItem: () => raw ?? null, setItem: (_, value) => { raw = value; } };
  function reload() {
    assert.equal(storage.saveProgress('moon-free', 'complete', true, null, undefined, undefined, p), true);
    const loaded = storage.readProgress().progress.gacTroi;
    assert.deepEqual(loaded, readGacTroi(p));
    p = loaded;
    assert.deepEqual(readGacTroi(p), p);
  }
  function action(event) {
    p = rabbit.applyGacRabbitAction(p, event);
    const result = p;
    assert.equal(rabbit.applyGacRabbitAction(p, event), result, `Duplicate ${JSON.stringify(event)}`);
    reload();
  }
  function dialogue(stage) {
    for (let turn = 0; turn < rabbit.rabbitDialogueLengths[stage]; turn++) action({ type: 'dialogue', stage, turn });
  }
  reload(); dialogue('real'); dialogue('bridge');
  assert.ok(p.bookUnlocks.includes('gac-book-map'));
  for (const stop of rabbit.rabbitStops) {
    assert.equal(p.rabbitJourney.stage, stop);
    assert.equal(rabbit.applyGacRabbitAction(p, { type: 'next', stage: stop }), p);
    assert.equal(rabbit.applyGacRabbitAction(p, { type: 'wake', stop, star: 1 }), p);
    action({ type: 'find', stop });
    if (stop === 'rock') assert.equal(rabbit.applyGacRabbitAction(p, { type: 'wake', stop, star: 2 }), p);
    for (let star = 1; star <= rabbit.rabbitStarCount(stop); star++) action({ type: 'wake', stop, star });
    assert.equal(rabbit.rabbitObjective(p.rabbitJourney), 'ready');
    assert.equal(p.completedOnce, false, 'Stars never grant the farewell reward');
    action({ type: 'next', stage: stop });
  }
  dialogue('reunion');
  assert.equal(p.rabbitJourney.reunionDone, true);
  assert.equal(p.completedOnce, false);
  for (let turn = 0; turn < 5; turn++) {
    action({ type: 'dialogue', stage: 'farewell', turn });
    assert.equal(p.completedOnce, turn >= 2, 'Reward on farewell-03 → farewell-04');
  }
  assert.equal(p.rabbitJourney.stage, 'free');
  assert.equal(p.rabbitJourney.farewellDone, true);
  assert.equal(rabbit.applyGacRabbitAction(p, { type: 'find', stop: 'slope' }), p);
  const corrupt = rabbit.readGacRabbit({ active: true, stage: 'free', completedStops: 1, rabbitFound: false, starsAwake: 99, turn: -2 });
  assert.equal(corrupt.stage, 'rock');
  assert.equal(corrupt.starsAwake, 0);
  assert.deepEqual(rabbit.readGacRabbit(corrupt), corrupt);
  console.log('GT-R1: migration, release gate, 3 rabbits/4 stars, reload per action, duplicate/stale events, reward timing, replay and late-ending preservation passed.');
} finally { await server.close(); delete globalThis.localStorage; }
