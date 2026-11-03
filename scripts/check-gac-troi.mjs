import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const load = path => server.ssrLoadModule(`/src/${path}.ts`);
  const { canMeetGacTroi } = await load('content/levels/gac-troi-transition');
  const { freshBanhLuoi } = await load('content/levels/ban-banh-luoi-progress');
  const { readGacTroi, freshGacTroi } = await load('content/levels/gac-troi-progress');
  const { gacTroiMeeting } = await load('content/levels/gac-troi-content');
  const { readProgress, saveProgress } = await load('state/progress');
  const { freshSurveyor } = await load('content/levels/surveyor-progress');
  const { freshSparkle } = await load('content/levels/lap-lanh');
  const { freshTaiThinh } = await load('content/levels/tai-thinh-progress');
  const { getBrowserBookPages, getBookHintPage } = await load('content/book/reading-order');
  for (const phase of ['approach', 'farewell', 'gift']) {
    assert.equal(canMeetGacTroi({ ...freshBanhLuoi(), phase, completedOnce: true }, false), false);
  }
  const end = { ...freshBanhLuoi(), phase: 'finished', completedOnce: true, wheelChoice: 'mesh', keepsakes: ['vip', 'orbit'], guideLegacyPassed: true };
  assert.equal(canMeetGacTroi(end, false), true);
  assert.equal(canMeetGacTroi(end, true), false);
  assert.equal(canMeetGacTroi({ ...end, completedOnce: false }, false), false);
  assert.deepEqual(gacTroiMeeting('vi').map(l => l.id), gacTroiMeeting('en').map(l => l.id));
  assert.ok(gacTroiMeeting('vi').every(l => l.id !== 'MO-01'));
  assert.equal(readGacTroi({ ...freshGacTroi(), turn: 999 }).turn, gacTroiMeeting('vi').length - 1);
  const store = new Map();
  globalThis.localStorage = { getItem: key => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) };
  const prior = { surveyor: { ...freshSurveyor(), completedOnce: true }, sparkle: { ...freshSparkle(), completedOnce: true }, taiThinh: { ...freshTaiThinh(), keepsakes: ['pse', 'station', 'magnetometer'], completedOnce: true }, banhLuoi: end };
  store.set('cuoi.progress', JSON.stringify({ version: 13, milestone: 'complete', activeLevel: 'ban-banh-luoi', ...prior }));
  let p = readProgress().progress;
  assert.equal(p.banhLuoi.phase, 'finished', 'Legacy ending remains walkable');
  assert.deepEqual(p.gacTroi, freshGacTroi());
  const fifth = { ...freshGacTroi(), phase: 'matching', matched: ['surveyor', 'lap-lanh'] };
  assert.ok(saveProgress(p.chapter, p.quest, p.completed, 'gac-troi', p.surveyor, p.sparkle, p.taiThinh, p.banhLuoi, fifth));
  p = readProgress().progress;
  assert.deepEqual(p.gacTroi, fifth, 'Reentry preserves confirmed answers');
  assert.equal(p.activeLevel, 'gac-troi');
  for (let turn = 0; turn < gacTroiMeeting('vi').length; turn++) {
    const intro = { ...freshGacTroi(), turn };
    saveProgress(p.chapter, p.quest, p.completed, 'gac-troi', p.surveyor, p.sparkle, p.taiThinh, p.banhLuoi, intro);
    assert.deepEqual(readProgress().progress.gacTroi, intro, 'Every introduction line survives reload');
  }
  assert.ok(getBrowserBookPages(prior).includes('gac-book-orbit'));
  assert.ok(!getBrowserBookPages({ ...prior, banhLuoi: freshBanhLuoi() }).includes('gac-book-orbit'));
  assert.equal(getBookHintPage(prior, 'gac-troi'), 'gac-book-orbit');
  console.log('M2 verified: ending gate, preview isolation, v13 migration, saved answers, every dialogue checkpoint, bilingual IDs and stable book target.');
} finally { await server.close(); delete globalThis.localStorage; }
