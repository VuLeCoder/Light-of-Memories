import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const load = path => server.ssrLoadModule(`/src/${path}.ts`);
  const state = await load('content/levels/gac-troi-progress');
  const flow = await load('content/levels/gac-troi-flow');
  const { freshGacTroi, readGacTroi, replayGacTroi, gacCards, gacDialogueLengths, unlockGacBook } = state;
  const { readProgress, saveProgress } = await load('state/progress');
  const { freshSurveyor } = await load('content/levels/surveyor-progress');
  const { freshSparkle } = await load('content/levels/lap-lanh');
  const { gacT02Intro } = await load('content/levels/gac-troi-content');
  const { getBrowserBookPages } = await load('content/book/reading-order');
  // T02's retained data checks; image-coordinate clicking was retired.
  const { gacT02Story } = await load('content/levels/gac-troi-impact');
  const search = readGacTroi({ ...freshGacTroi(), phase: 't02-search', matched: ['surveyor', 'lap-lanh'], seen: ['surveyor', 'lap-lanh'] });
  assert.ok(search.bookUnlocks.includes('gac-book-impact'));
  assert.ok(!search.bookUnlocks.includes('gac-book-impact.story'));
  assert.deepEqual(readGacTroi(search), search);
  for (const language of ['vi', 'en']) assert.equal(gacT02Story(language).length, gacDialogueLengths['t02-story']);
  const store = new Map(); let writes = 0;
  globalThis.localStorage = { getItem: key => store.get(key) ?? null, setItem: (key, value) => { writes++; store.set(key, value); } };
  const prior = { surveyor: { ...freshSurveyor(), completedOnce: true }, sparkle: { ...freshSparkle(), completedOnce: true } };
  const legacy = { phase: 'matching', turn: 3, matched: ['surveyor'], seen: ['surveyor'], route: [], changeFound: false, completedOnce: false };
  function fixture(version, gacTroi, extra = {}) {
    store.set('cuoi.progress', JSON.stringify({ version, milestone: 'complete', activeLevel: 'gac-troi', ...prior, gacTroi, ...extra }));
    const before = writes;
    const result = readProgress().progress;
    assert.equal(writes, before, 'Reading/migration is side effect free');
    return result;
  }
  assert.deepEqual(fixture(13).gacTroi, freshGacTroi());
  for (const version of [14, 15, 16, 17]) {
    const partial = fixture(version, legacy).gacTroi;
    assert.equal(partial.phase, 'matching'); assert.deepEqual(partial.seen, ['surveyor']);
    const pending = fixture(version, { ...legacy, seen: [] }).gacTroi;
    assert.equal(pending.phase, 'matching'); assert.deepEqual(pending.matched, ['surveyor']); assert.deepEqual(pending.seen, []);
    const summary = fixture(version, { ...legacy, phase: 'stories', turn: 1, matched: ['surveyor', 'lap-lanh'], seen: ['surveyor', 'lap-lanh'] }).gacTroi;
    assert.equal(summary.phase, 'stories'); assert.equal(summary.turn, 1);
    for (const phase of ['route', 'changes', 'farewell', 'gift', 'finished']) {
      const complete = fixture(version, { ...legacy, phase, matched: ['surveyor', 'lap-lanh'], seen: ['surveyor', 'lap-lanh'], route: ['surveyor', 'lap-lanh'], changeFound: true, completedOnce: true }).gacTroi;
      assert.equal(complete.phase, 't02-intro'); assert.equal(complete.completedOnce, true);
      assert.equal(complete.farewellDone, false); assert.equal(complete.storyCompletedOnce, false);
      assert.equal(complete.t02Done, false); assert.deepEqual(complete.routeLandmarks, []);
      assert.deepEqual(complete.clues, []); assert.deepEqual(complete.understoodCards, []);
      const unread = fixture(version, { ...legacy, phase, matched: ['surveyor', 'lap-lanh'], seen: ['surveyor'] }).gacTroi;
      assert.equal(unread.phase, 'matching'); assert.deepEqual(unread.seen, ['surveyor']);
    }
    const invalid = fixture(version, { ...legacy, phase: 'finished', completedOnce: true }).gacTroi;
    assert.equal(invalid.phase, 'matching'); assert.equal(invalid.completedOnce, false);
    const reversed = fixture(version, { ...legacy, matched: ['surveyor', 'lap-lanh'], route: ['lap-lanh', 'surveyor'], changeFound: true, completedOnce: true }).gacTroi;
    assert.equal(reversed.completedOnce, false);
  }
  // Exercise the checkpoint API in story order, reloading at every dialogue line
  // and every meaningful puzzle receipt, without rendering unshipped challenges.
  let game = readGacTroi({ ...freshGacTroi(), phase: 'stories', matched: ['surveyor', 'lap-lanh'], seen: ['surveyor', 'lap-lanh'] });
  const visited = new Set();
  function reload() {
    visited.add(game.phase);
    assert.ok(saveProgress('moon-free', 'complete', true, 'gac-troi', prior.surveyor, prior.sparkle, game));
    assert.equal(JSON.parse(store.get('cuoi.progress')).version, 18);
    const loaded = readProgress().progress;
    assert.equal(loaded.activeLevel, 'gac-troi');
    assert.deepEqual(loaded.gacTroi, game, `Reload ${game.phase}/${game.turn}`);
    assert.deepEqual(JSON.parse(JSON.stringify(loaded.surveyor)), prior.surveyor); assert.deepEqual(JSON.parse(JSON.stringify(loaded.sparkle)), prior.sparkle);
    game = loaded.gacTroi;
  }
  function dialogue() {
    const phase = game.phase;
    for (let turn = 0; turn < gacDialogueLengths[phase]; turn++) { game = { ...game, turn }; reload(); }
    game = flow.advanceGacDialogue(game); reload();
  }
  dialogue(); assert.equal(game.phase, 't02-intro');
  assert.deepEqual(gacT02Intro('vi').map(l => l.id), gacT02Intro('en').map(l => l.id));
  assert.equal(gacT02Intro('vi').length, gacDialogueLengths['t02-intro']);
  assert.equal(flow.advanceGacDialogue(game), game, 'Cannot complete dialogue before its last line');
  dialogue(); assert.equal(game.phase, 't02-search'); assert.equal(flow.gacPhaseAvailable(game.phase), true);
  assert.equal(flow.keepGacLandmark(game, 'low-slope'), game, 'Cannot bypass T02');
  game = flow.findGacImpact(game); reload(); assert.equal(game.t02Done, false, 'Correct click alone is not completion');
  dialogue(); assert.equal(game.t02Done, true); assert.equal(game.phase, 't03-intro');
  dialogue(); assert.equal(game.phase, 't03-map');
  assert.equal(flow.keepGacLandmark(game, 'split-rock'), game, 'Cannot skip route segments');
  for (const landmark of state.gacRouteLandmarks) { game = flow.keepGacLandmark(game, landmark); reload(); assert.equal(flow.keepGacLandmark(game, landmark), game); }
  dialogue(); assert.equal(game.phase, 'gac-farewell'); assert.equal(game.completedOnce, false);
  assert.equal(flow.enterGacTrail(game), game, 'Trail waits for farewell, not an achievement');
  dialogue(); assert.equal(game.farewellDone, true); assert.equal(game.completedOnce, true);
  game = flow.enterGacTrail(game); reload();
  assert.equal(flow.keepGacClue(game, 'lantern'), game, 'Clues must be learned in order');
  for (const clue of state.gacClues) { game = flow.keepGacClue(game, clue); reload(); assert.equal(flow.keepGacClue(game, clue), game); }
  assert.equal(game.phase, 'reunion'); assert.equal(game.reunionDone, false);
  dialogue(); assert.equal(game.reunionDone, true); dialogue();
  assert.equal(flow.finishGacCards(game), game);
  assert.equal(flow.understandGacCard(game, 'card-wrapper'), game, 'Do not skip unread cards');
  for (const card of gacCards) {
    game = flow.understandGacCard(game, card); reload();
    assert.equal(flow.understandGacCard(game, card), game, 'Rapid repeated confirmation is idempotent');
    assert.ok(game.bookUnlocks.includes(`ending-book-cards.${card}`));
  }
  assert.equal(game.phase, 'cards', 'All receipts still wait for Continue');
  game = flow.finishGacCards(game); reload();
  dialogue(); dialogue(); assert.equal(game.phase, 'home'); assert.equal(game.storyCompletedOnce, false);
  dialogue(); assert.equal(game.phase, 'story-end'); assert.equal(game.storyCompletedOnce, true);
  for (const phase of state.gacTroiPhases.slice(2)) assert.ok(visited.has(phase), `Covered ${phase}`);
  const completed = structuredClone(game);
  const replay = replayGacTroi(game);
  assert.equal(replay.phase, 'meeting'); assert.equal(replay.completedOnce, true); assert.equal(replay.storyCompletedOnce, true);
  assert.deepEqual(replay.bookUnlocks, game.bookUnlocks); assert.deepEqual(replay.matched, []);
  assert.deepEqual(replay.routeLandmarks, []); assert.deepEqual(replay.clues, []); assert.deepEqual(replay.understoodCards, []);
  assert.equal(flow.enterGacTrail(replay), replay);
  assert.deepEqual(readGacTroi(replay), replay);
  assert.ok(getBrowserBookPages({ ...prior, gacTroi: replay }).includes('gac-memory-surveyor'), 'Replay keeps learned book pages');
  assert.ok(!getBrowserBookPages({ ...prior, gacTroi: replay }).includes('ending-book-home'), 'Unshipped pages stay hidden');
  assert.equal(unlockGacBook(replay, 'unknown'), replay);
  let review = flow.startGacEndingReview(replay); assert.ok(review);
  const beforeReview = store.get('cuoi.progress'); const beforeWrites = writes;
  for (let i = 0; i < 20 && review.phase !== 'story-end'; i++) review = flow.advanceGacEndingReview(review);
  assert.equal(review.phase, 'story-end'); assert.deepEqual(game, completed);
  assert.equal(store.get('cuoi.progress'), beforeReview); assert.equal(writes, beforeWrites);
  assert.equal(flow.startGacEndingReview(freshGacTroi()), null);
  const broken = readGacTroi({ ...completed, phase: 'story-end', routeLandmarks: ['low-slope', 'banyan-shadow', 'split-rock'], clues: ['slope', 'call'], understoodCards: [...gacCards, 'bad'], bookUnlocks: [...completed.bookUnlocks, 'bad'] });
  assert.equal(broken.phase, 't03-map'); assert.deepEqual(broken.routeLandmarks, ['low-slope']);
  assert.deepEqual(broken.clues, []); assert.deepEqual(broken.understoodCards, []); assert.ok(!broken.bookUnlocks.includes('bad'));
  assert.equal(broken.completedOnce, true, 'Earned achievements survive a damaged current replay');
  assert.deepEqual(readGacTroi(broken), broken, 'Repairing a save is idempotent');
  assert.deepEqual(readGacTroi({ ...completed, phase: 't03-map', routeLandmarks: ['bad', 'low-slope', 'low-slope', 'split-rock'] }).routeLandmarks, ['low-slope', 'split-rock']);
  for (const phase of state.gacTroiPhases.slice(15)) assert.equal(flow.gacPhaseAvailable(phase), false, `Unshipped ${phase} gated`);
  const noReceipts = readGacTroi({ ...freshGacTroi(), phase: 'story-end' });
  assert.equal(noReceipts.phase, 'matching'); assert.equal(noReceipts.storyCompletedOnce, false);
  assert.deepEqual(readGacTroi({ ...completed, phase: 't04-rock', clues: ['slope'] }).clues, ['slope']);
  assert.equal(readGacTroi({ ...completed, phase: 't04-rock', clues: ['slope'] }).phase, 't04-rock');
  for (const bad of ['{', 'null', JSON.stringify({ version: 99, milestone: 'complete' })]) {
    store.set('cuoi.progress', bad); const count = writes;
    const result = readProgress(); assert.equal(result.progress.chapter, 'idle'); assert.equal(writes, count);
    assert.equal(store.get('cuoi.progress'), bad, 'Malformed save is not overwritten by reading');
  }
  globalThis.localStorage = { getItem() { throw new Error('storage disabled'); } };
  assert.equal(readProgress().unavailable, true);
  assert.equal(saveProgress('moon-free', 'complete', true), false);
  assert.deepEqual(freshGacTroi().bookUnlocks, ['gac-book-orbit'], 'Full restart clears learned story pages');
  console.log('M1 verified: v13–18 migration, all checkpoint reloads, corrupt data, replay/book persistence, isolated ending review and release gates.');
} finally { await server.close(); delete globalThis.localStorage; }
