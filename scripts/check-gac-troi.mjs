import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const load = path => server.ssrLoadModule(`/src/${path}.ts`);
  const { freshBanhLuoi } = await load('content/levels/ban-banh-luoi-progress');
  const { readGacTroi, freshGacTroi, matchGacFriend, finishGacMemory, connectGacRoute, findGacChange, receiveGacLight, replayGacTroi } = await load('content/levels/gac-troi-progress');
  const { gacMatchingIntroLength, gacMatchingDialogue, gacMemories } = await load('content/levels/gac-troi-matching');
  const { gacTroiMeeting } = await load('content/levels/gac-troi-content');
  const { gacFarewellDialogue } = await load('content/levels/gac-troi-finale');
  const { freshEnding, endingDialogue, readEnding } = await load('content/ending');
  const { readProgress, saveProgress } = await load('state/progress');
  const { freshSurveyor } = await load('content/levels/surveyor-progress');
  const { freshSparkle } = await load('content/levels/lap-lanh');
  const { freshTaiThinh } = await load('content/levels/tai-thinh-progress');
  const { journeyStops, journeyStatus, lanternPoints } = await load('content/levels/index');
  const { getBrowserBookPages, getBookHintPage } = await load('content/book/reading-order');
  const store = new Map();
  globalThis.localStorage = { getItem: key => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) };
  const end = { ...freshBanhLuoi(), phase: 'finished', completedOnce: true, wheelChoice: 'mesh', keepsakes: ['vip', 'orbit'], guideLegacyPassed: true };
  const prior = { surveyor: { ...freshSurveyor(), completedOnce: true }, sparkle: freshSparkle(), taiThinh: freshTaiThinh(), banhLuoi: end };
  assert.deepEqual(journeyStops, ['surveyor', 'ban-banh-luoi', 'gac-troi']);
  assert.deepEqual([0,1,2,3].map(lanternPoints), [0,1,3,5]);
  const flags = { surveyor: true, 'lap-lanh': false, 'tai-thinh': false, 'ban-banh-luoi': false, 'gac-troi': false };
  assert.equal(journeyStatus('ban-banh-luoi', flags), 'unfinished');
  assert.equal(journeyStatus('gac-troi', flags), 'locked');
  for (const version of [1,3,5,6,13,14,15]) {
    store.set('cuoi.progress', JSON.stringify({ version, milestone: 'complete', activeLevel: 'lap-lanh', ...prior }));
    const p = readProgress().progress;
    assert.equal(p.activeLevel, null, 'Removed chapters return to route');
    assert.equal(p.surveyor.completedOnce, version >= 3);
    assert.deepEqual(p.ending, freshEnding());
  }
  const old = { ...freshGacTroi(), phase: 'route', matched: ['surveyor','lap-lanh','tai-thinh','ban-banh-luoi'], seen: ['surveyor','lap-lanh','tai-thinh','ban-banh-luoi'], route: ['surveyor','lap-lanh','tai-thinh','ban-banh-luoi'] };
  const migrated = readGacTroi(old);
  assert.deepEqual(migrated.matched, ['surveyor','ban-banh-luoi']);
  assert.deepEqual(migrated.route, ['surveyor','ban-banh-luoi']);
  assert.equal(migrated.completedOnce, false);
  assert.equal(readGacTroi({ ...old, seen: [] }).phase, 'matching', 'Unread stories cannot be bypassed');
  let game = { ...freshGacTroi(), phase: 'matching', turn: gacMatchingIntroLength };
  assert.equal(matchGacFriend(game, 'surveyor', 'apollo17'), game, 'Wrong pairs do not change progress');
  for (const memory of [...gacMemories].reverse()) {
    game = matchGacFriend(game, memory.id, memory.site);
    assert.ok(game.matched.includes(memory.id));
    assert.deepEqual(readGacTroi(game), game, 'Unread memory survives reload');
    assert.equal(matchGacFriend(game, 'surveyor', 'apollo12'), game, 'Read the pending story first');
    assert.ok(getBrowserBookPages({ ...prior, gacTroi: game }).includes(`gac-memory-${memory.id}`));
    game = finishGacMemory(game, memory.id);
    assert.deepEqual(readGacTroi(game), game);
  }
  assert.equal(game.phase, 'stories');
  game = { ...game, phase: 'route', turn: 0 };
  assert.equal(connectGacRoute(game, 'ban-banh-luoi'), game);
  assert.equal(receiveGacLight(game), game, 'Cannot award early');
  game = connectGacRoute(game, 'surveyor');
  assert.deepEqual(readGacTroi(game), game);
  game = connectGacRoute(game, 'ban-banh-luoi');
  game = { ...game, phase: 'changes' };
  assert.equal(getBookHintPage({ ...prior, gacTroi: game }, 'gac-troi'), 'gac-book-changes');
  assert.equal(findGacChange(game, 0), game);
  game = findGacChange(game, 4);
  game = { ...game, phase: 'farewell' };
  game = receiveGacLight(game);
  assert.equal(game.completedOnce, true);
  assert.equal(receiveGacLight(game), game, 'No second award');
  assert.deepEqual(readGacTroi(replayGacTroi(game)), replayGacTroi(game), 'Replay keeps earned light');
  assert.deepEqual(replayGacTroi(game).matched, []);
  const dialogues = [gacTroiMeeting, lang => gacMatchingDialogue(lang), lang => gacMatchingDialogue(lang, true), gacFarewellDialogue, lang => gacFarewellDialogue(lang, true), ...['reunion','home','earth'].map(phase => lang => endingDialogue(lang, phase))];
  for (const lines of dialogues) assert.deepEqual(lines('vi').map(l=>l.id), lines('en').map(l=>l.id));
  for (const phase of ['reunion','home','earth','finished']) {
    const finale = readEnding({ phase, turn: 999, completedOnce: phase === 'finished' }, true);
    assert.equal(readEnding(finale, false).phase, 'idle', 'Ending remains locked without three friends');
    assert.ok(saveProgress('moon-free','complete',true,'gac-troi',prior.surveyor,prior.sparkle,prior.taiThinh,end,game,finale));
    assert.deepEqual(readProgress().progress.ending, finale);
  }
  const closed = readEnding({ phase: 'reunion', turn: 2, completedOnce: false, active: false }, true);
  saveProgress('moon-free','complete',true,'gac-troi',prior.surveyor,prior.sparkle,prior.taiThinh,end,game,closed);
  assert.deepEqual(readProgress().progress.ending, closed, 'Returning to a chapter keeps the ending checkpoint inactive');
  assert.equal(JSON.parse(store.get('cuoi.progress')).version,16);
  console.log('Three-friend journey verified: legacy saves, matching/stories, route, changes, award/replay, ending checkpoints and VI/EN.');
} finally { await server.close(); delete globalThis.localStorage; }
