import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const load = path => server.ssrLoadModule(`/src/${path}.ts`);
  const { getBrowserBookPages: pages, getBookHintPage: hint } = await load('content/book/reading-order');
  const { freshSurveyor, eventOrder } = await load('content/levels/surveyor-progress');
  const { freshSparkle } = await load('content/levels/lap-lanh');
  const { freshTaiThinh } = await load('content/levels/tai-thinh-progress');
  const { freshBanhLuoi } = await load('content/levels/ban-banh-luoi-progress');
  const { freshGacTroi, gacTroiFriends } = await load('content/levels/gac-troi-progress');
  const { realWorldPages } = await load('content/book/real-world');
  const { bookPages } = await load('content/book/catalog');
  const fresh = () => ({ surveyor: freshSurveyor(), sparkle: freshSparkle(), taiThinh: freshTaiThinh(), banhLuoi: freshBanhLuoi(), gacTroi: freshGacTroi() });
  const p = fresh();
  const startPages = pages(p);
  let checked = 0;
  function check(level, expectedHint) {
    const ids = pages(p);
    assert.equal(new Set(ids).size, ids.length, 'Duplicate browser page');
    for (const companion of realWorldPages) {
      if (ids.includes(companion.id)) assert.equal(ids[ids.indexOf(companion.after) + 1], companion.id, companion.id);
    }
    if (expectedHint) {
      assert.equal(hint(p, level), expectedHint);
      assert.ok(ids.includes(expectedHint), `Hint target is locked: ${expectedHint}`);
    }
    checked++;
    return ids;
  }
  check();
  assert.ok(!startPages.includes('surveyor-b01'));
  assert.ok(startPages.indexOf('extra-reading') < startPages.indexOf('lap-lanh-reality'));
  assert.ok(!startPages.includes('gac-book-reunion'));
  p.surveyor.matched = ['camera', 'scoop'];
  let ids = check('surveyor', 'clue-arrive');
  assert.ok(ids.indexOf('surveyor-b01') < ids.indexOf('clue-arrive'), 'Tools precede excavation');
  for (const [index, event] of eventOrder.entries()) {
    check('surveyor', `clue-${event}`);
    p.surveyor.clues.push(event);
    p.surveyor.found.push(event);
    ids = check();
    assert.equal(ids[ids.indexOf(`clue-${event}`) + (event === 'visit' ? 2 : 1)], `photo-${event}`, 'Clue and photo stay together (including NASA companion)');
    if (index < 2) assert.ok(ids.indexOf(`photo-${event}`) < ids.indexOf(`clue-${eventOrder[index + 1]}`));
  }
  p.surveyor.completedOnce = true;
  p.sparkle.keepsakes = [0];
  check();
  p.sparkle.keepsakes.push(1);
  p.sparkle.phase = 'repair';
  check('lap-lanh', 'sparkle-repair-clue');
  p.sparkle.phase = 'ranging';
  check('lap-lanh', 'sparkle-ranging-clue');
  p.sparkle.completedOnce = true;
  p.taiThinh.phase = 'identify';
  check('tai-thinh', 'tai-book-devices');
  p.taiThinh.identified = true;
  p.taiThinh.keepsakes.push('pse');
  p.taiThinh.phase = 'records';
  check('tai-thinh', 'tai-book-sources');
  p.taiThinh.keepsakes.push('station');
  for (const phase of ['graph', 'duration']) {
    p.taiThinh.phase = phase;
    check('tai-thinh', 'tai-book-ringing');
  }
  p.taiThinh.durationCorrect = true;
  p.taiThinh.phase = 'rhythm';
  check('tai-thinh', 'tai-book-rhythm');
  p.taiThinh.keepsakes.push('magnetometer');
  p.taiThinh.completedOnce = true;
  for (const phase of ['wheels', 'photoA']) {
    p.banhLuoi.phase = phase;
    check('ban-banh-luoi', 'ban-book-wheels');
  }
  p.banhLuoi.keepsakes.push('vip');
  for (const phase of ['routeIntro', 'routePuzzle']) {
    p.banhLuoi.phase = phase;
    for (const routeHint of [1, 2]) {
      p.banhLuoi.routeHint = routeHint;
      check('ban-banh-luoi', routeHint === 1 ? 'ban-book-route' : 'ban-book-walkback');
    }
  }
  for (const phase of ['guideIntro', 'guiding']) {
    p.banhLuoi.phase = phase;
    check('ban-banh-luoi', 'ban-book-samples');
  }
  for (const phase of ['photoB', 'memoriesIntro']) {
    p.banhLuoi.phase = phase;
    check('ban-banh-luoi', 'ban-book-camera');
  }
  p.banhLuoi.keepsakes.push('orbit');
  p.banhLuoi.completedOnce = true;
  check('gac-troi', 'gac-book-orbit');
  p.gacTroi.phase = 'matching';
  check('gac-troi', 'gac-book-sites');
  for (const friend of gacTroiFriends) {
    p.gacTroi.matched.push(friend);
    assert.ok(check('gac-troi', 'gac-book-sites').includes(`gac-memory-${friend}`));
  }
  p.gacTroi.phase = 'route';
  check('gac-troi', 'gac-book-route');
  p.gacTroi.phase = 'changes';
  check('gac-troi', 'gac-book-changes');
  p.ending = { phase: 'finished', turn: 0, completedOnce: true };
  ids = check();
  assert.deepEqual(ids.map(id => id ?? 'overview').sort(), bookPages.map(page => page.id).sort(), 'Full browser book contains every catalog page exactly once');
  assert.deepEqual(pages(fresh()), startPages, 'Fresh journey has no old archive');
  assert.equal(hint(fresh(), 'surveyor'), null, 'No excavation hint before tools');
  console.log(`Book flow verified: ${checked} checkpoints, all hint targets, NASA adjacency, Surveyor order, complete archive and fresh journey.`);
} finally {
  await server.close();
}
