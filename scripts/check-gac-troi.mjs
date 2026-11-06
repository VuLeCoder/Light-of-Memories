import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const load = path => server.ssrLoadModule(`/src/${path}.ts`);
  const { readGacTroi, freshGacTroi, matchGacFriend, finishGacMemory } = await load('content/levels/gac-troi-progress');
  const { gacMatchingIntroLength, gacMatchingDialogue, gacMemories } = await load('content/levels/gac-troi-matching');
  const { gacTroiMeeting } = await load('content/levels/gac-troi-content');
  const { readProgress, saveProgress } = await load('state/progress');
  const { freshSurveyor } = await load('content/levels/surveyor-progress');
  const { freshSparkle } = await load('content/levels/lap-lanh');
  const { getBrowserBookPages, getBookHintPage } = await load('content/book/reading-order');
  assert.deepEqual(gacTroiMeeting('vi').map(l => l.id), gacTroiMeeting('en').map(l => l.id));
  assert.ok(gacTroiMeeting('vi').every(l => l.id !== 'MO-01'));
  assert.equal(readGacTroi({ ...freshGacTroi(), turn: 999 }).turn, gacTroiMeeting('vi').length - 1);
  const store = new Map();
  globalThis.localStorage = { getItem: key => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) };
  const prior = { surveyor: { ...freshSurveyor(), completedOnce: true }, sparkle: { ...freshSparkle(), completedOnce: true } };
  store.set('cuoi.progress', JSON.stringify({ version: 13, milestone: 'complete', activeLevel: 'ban-banh-luoi', ...prior }));
  let p = readProgress().progress;
  assert.equal(p.activeLevel, null, 'Removed scene returns to route');
  assert.deepEqual(p.gacTroi, freshGacTroi());
  const fifth = readGacTroi({ ...freshGacTroi(), phase: 'matching', turn: gacMatchingIntroLength, matched: ['surveyor', 'lap-lanh'] });
  assert.ok(saveProgress(p.chapter, p.quest, p.completed, 'gac-troi', p.surveyor, p.sparkle, fifth));
  p = readProgress().progress;
  assert.deepEqual(p.gacTroi, fifth, 'Reentry preserves confirmed answers');
  assert.equal(p.activeLevel, 'gac-troi');
  for (let turn = 0; turn < gacTroiMeeting('vi').length; turn++) {
    const intro = { ...freshGacTroi(), turn };
    saveProgress(p.chapter, p.quest, p.completed, 'gac-troi', p.surveyor, p.sparkle, intro);
    assert.deepEqual(readProgress().progress.gacTroi, intro, 'Every introduction line survives reload');
  }
  assert.ok(getBrowserBookPages(prior).includes('gac-book-orbit'));
  assert.ok(!getBrowserBookPages({ ...prior, sparkle: freshSparkle() }).includes('gac-book-orbit'));
  assert.equal(getBookHintPage(prior, 'gac-troi'), 'gac-book-orbit');
  // Legacy v14 has no story receipts; keep pairs and resume the unread memories.
  const legacy = { ...fifth }; delete legacy.seen; delete legacy.revision;
  assert.deepEqual(readGacTroi(legacy), fifth);
  store.set('cuoi.progress', JSON.stringify({ version: 14, milestone: 'complete', activeLevel: 'gac-troi', ...prior, gacTroi: legacy }));
  assert.deepEqual(readProgress().progress.gacTroi, fifth);
  let game = readGacTroi({ ...freshGacTroi(), phase: 'matching', turn: gacMatchingIntroLength });
  assert.equal(matchGacFriend(game, 'surveyor', 'apollo11'), game, 'Wrong match changes nothing');
  assert.ok(!getBrowserBookPages({ ...prior, gacTroi: game }).includes('gac-memory-surveyor'));
  for (const memory of [gacMemories[1], gacMemories[0]]) {
    game = matchGacFriend(game, memory.id, memory.site);
    assert.ok(game.matched.includes(memory.id));
    assert.ok(!game.seen.includes(memory.id));
    assert.equal(matchGacFriend(game, 'surveyor', 'apollo12'), game, 'Unread story cannot be skipped by another match');
    assert.deepEqual(readGacTroi(game), game, 'Pending story survives reload');
    assert.ok(getBrowserBookPages({ ...prior, gacTroi: game }).includes(`gac-memory-${memory.id}`));
    game = finishGacMemory(game, memory.id);
    assert.deepEqual(readGacTroi(game), game, 'Story receipt survives reload');
  }
  assert.equal(game.phase, 'stories');
  assert.equal(game.matched.length, 2);
  assert.equal(game.completedOnce, false, 'Matching does not grant a reward');
  assert.equal(getBookHintPage({ ...prior, gacTroi: game }, 'gac-troi'), 'gac-book-sites');
  for (const ending of [false, true]) {
    const lines = gacMatchingDialogue('vi', ending);
    assert.deepEqual(lines.map(l => l.id), gacMatchingDialogue('en', ending).map(l => l.id));
    for (let turn = 0; turn < lines.length; turn++) {
      const checkpoint = readGacTroi(ending ? { ...game, turn } : { ...freshGacTroi(), phase: 'matching', turn });
      assert.deepEqual(readGacTroi(checkpoint), checkpoint);
    }
  }
  assert.equal(readGacTroi({ ...game, turn: 999 }).turn, 1);
  assert.equal(readGacTroi({ ...game, phase: 't02-intro', turn: -1 }).turn, 0);
  assert.deepEqual(readGacTroi({ ...freshGacTroi(), matched: ['unknown', 'surveyor', 'surveyor'], seen: ['unknown','lap-lanh','surveyor'] }).seen, ['surveyor']);
  const { levels, journeyStops, journeyStatus, isLevelId } = await load('content/levels/index');
  assert.deepEqual(levels.map(l => l.id), ['surveyor', 'lap-lanh', 'gac-troi']);
  assert.equal(journeyStops.length, 3);
  for (const removed of ['tai-thinh', 'ban-banh-luoi']) {
    assert.equal(isLevelId(removed), false);
    for (const version of [5, 13, 15, 16, 17]) {
      store.set('cuoi.progress', JSON.stringify({ version, milestone: 'complete', activeLevel: removed, ...prior }));
      const migrated = readProgress().progress;
      assert.equal(migrated.activeLevel, null);
      assert.equal(migrated.surveyor.completedOnce, true);
      assert.equal(migrated.sparkle.completedOnce, true);
    }
  }
  assert.equal(journeyStatus('gac-troi', { surveyor: true, 'lap-lanh': false, 'gac-troi': false }), 'locked');
  assert.equal(journeyStatus('gac-troi', { surveyor: true, 'lap-lanh': true, 'gac-troi': false }), 'unfinished');
  const old = { ...game, revision: undefined, phase: 'route', matched: ['surveyor', 'lap-lanh', 'tai-thinh', 'ban-banh-luoi'], seen: ['surveyor', 'lap-lanh', 'tai-thinh', 'ban-banh-luoi'], route: ['surveyor', 'lap-lanh', 'tai-thinh', 'ban-banh-luoi'] };
  assert.deepEqual(readGacTroi(old).matched, ['surveyor', 'lap-lanh']);
  assert.deepEqual(readGacTroi(old).routeLandmarks, [], 'Old friend route is not the new light map');
  assert.equal(readGacTroi(old).phase, 't02-intro');
  console.log('M2/M3 verified: correct/incorrect pairs, two friends, story receipts, hint unlocks, v14 migration, and dialogue reloads.');
  console.log('M2 verified: v13 migration, saved answers, every dialogue checkpoint, bilingual IDs and stable book target.');
} finally { await server.close(); delete globalThis.localStorage; }
