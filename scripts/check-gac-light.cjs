const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const { mkdirSync } = require('node:fs');
(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  try {
    for (const size of [320, 360, 640, 860]) for (const language of ['vi', 'en']) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      await page.goto(process.env.GAME_URL || 'http://localhost:4174');
      await page.evaluate(async language => {
        const { freshSurveyor } = await import('/src/content/levels/surveyor-progress.ts');
        const { freshSparkle } = await import('/src/content/levels/lap-lanh.ts');
        const { freshGacTroi } = await import('/src/content/levels/gac-troi-progress.ts');
        localStorage.setItem('cuoi.language', language);
        localStorage.setItem('cuoi.progress', JSON.stringify({ version: 18, milestone: 'complete', activeLevel: 'gac-troi', surveyor: { ...freshSurveyor(), completedOnce: true }, sparkle: { ...freshSparkle(), completedOnce: true }, gacTroi: { ...freshGacTroi(), phase: 't03-intro', matched: ['surveyor', 'lap-lanh'], seen: ['surveyor', 'lap-lanh'], t02Done: true } }));
      }, language);
      const resume = async () => {
        await page.reload();
        await page.getByRole('button', { name: language === 'vi' ? 'Tiếp tục' : 'Continue', exact: true }).click();
        await page.addStyleTag({ content: `#main-scene .game-stage {width:${size}px!important;height:480px!important;min-height:480px!important;max-width:none!important} .game-panel {width:${size}px!important}` });
      };
      const state = () => page.evaluate(() => JSON.parse(localStorage.getItem('cuoi.progress')).gacTroi);
      const next = async () => {
        await page.waitForFunction(() => document.querySelector('.gac-meeting .dialogue')?.dataset.complete === 'true');
        const before = await state();
        await page.locator('.gac-meeting .dialogue-next').press('Enter');
        await page.waitForFunction(before => { const p = JSON.parse(localStorage.getItem('cuoi.progress')).gacTroi; return p.phase !== before.phase || p.turn !== before.turn; }, before);
      };
      const fits = async () => {
        const issues = await page.locator('.gac-light').evaluate(el => ({
          overflow: el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2,
          small: [...el.querySelectorAll('button')].filter(b => b.getBoundingClientRect().height < 43.9).length,
        }));
        if (issues.small) console.log(await page.locator('.gac-light button').evaluateAll(bs=>bs.map(b=>({text:b.textContent,h:b.getBoundingClientRect().height,css:getComputedStyle(b).height,min:getComputedStyle(b).minHeight}))));
        assert.deepEqual(issues, { overflow: false, small: 0 });
      };
      await resume();
      for (let i = 0; i < 3; i++) {
        await page.locator(`[data-line="t03-intro-0${i + 1}"]`).waitFor();
        await resume();
        await page.locator(`[data-line="t03-intro-0${i + 1}"]`).waitFor();
        await next();
      }
      for (let section = 0; section < 3; section++) {
        await page.locator('.gac-light-branches').waitFor();
        await fits();
        assert.equal(await page.locator('.gac-light-branches button').first().isDisabled(), true);
        // Reload the open section: viewing either moment is temporary, receipts persist.
        await page.locator('.gac-light-times button').nth(1).press('Enter');
        await resume();
        assert.equal((await state()).routeLandmarks.length, section);
        assert.equal(await page.locator('.gac-light-branches button').first().isDisabled(), true);
        await page.locator('.gac-light-times button').nth(1).press('Enter');
        await page.locator('.gac-light-branches button').nth(1).press('Enter');
        assert.equal((await state()).routeLandmarks.length, section);
        assert.ok((await page.locator('.gac-light-feedback').innerText()).length > 20);
        // Book hint does not solve a section or move Cuội.
        if (section === 0) {
          await page.locator('.gac-light-times button').nth(2).click();
          await page.locator('#gac-book-title').filter({ hasText: language === 'vi' ? 'Ánh sáng' : 'Light' }).waitFor();
          await page.locator('div[data-book-block="gac-book-light.hint"]').waitFor({ state: 'visible' });
          assert.equal((await state()).routeLandmarks.length, 0);
        }
        await page.locator('.gac-light-branches button').first().press('Enter');
        assert.equal((await state()).routeLandmarks.length, section + 1);
        assert.equal((await state()).completedOnce, false);
        assert.equal(await page.locator('.gac-light-branches button').first().isDisabled(), true);
        await fits();
        if (section === 0 && language === 'vi' && [320, 860].includes(size)) {
          mkdirSync('/tmp/cuoi-m3', { recursive: true });
          await page.locator('.game-stage').screenshot({ path: `/tmp/cuoi-m3/map-${size}.png` });
        }
        await page.locator('[data-gac-continue]').press('Enter');
        await page.waitForFunction(section => section === 2 ? document.activeElement?.classList.contains('dialogue-next') : document.activeElement?.getAttribute('aria-pressed') === 'true', section);
      }
      for (let i = 0; i < 2; i++) {
        await page.locator(`[data-line="t03-done-0${i + 1}"]`).waitFor(); await fits();
        await resume(); await page.locator(`[data-line="t03-done-0${i + 1}"]`).waitFor();
        await next();
      }
      for (let i = 0; i < 4; i++) {
        await page.locator(`[data-line="gac-farewell-0${i + 1}"]`).waitFor();
        assert.equal((await state()).completedOnce, false);
        assert.equal((await state()).farewellDone, false);
        await resume(); await page.locator(`[data-line="gac-farewell-0${i + 1}"]`).waitFor();
        await next();
      }
      await page.locator('.gac-free-panel').waitFor();
      assert.equal((await state()).completedOnce, true); assert.equal((await state()).farewellDone, true);
      assert.ok((await state()).bookUnlocks.includes('gac-book-map'));
      await resume(); await page.locator('.gac-free-panel').waitFor();
      assert.equal((await state()).phase, 'gac-free', 'Reload starts before the exit threshold');
      await page.locator('.gac-free-panel nav button').first().click();
      await page.locator('[data-line="gac-chat-01"]').waitFor();
      const saved = await state();
      for (let i = 0; i < 2; i++) {
        await page.waitForFunction(() => document.querySelector('.ending-chat .dialogue')?.dataset.complete === 'true');
        await page.locator('.ending-chat .dialogue-next').press('Enter');
      }
      assert.deepEqual(await state(), saved, 'Optional chat never changes progress');
      if (language === 'vi' && [320, 860].includes(size)) await page.locator('.game-stage').screenshot({ path: `/tmp/cuoi-m3/free-${size}.png` });
      const host = page.locator('.game-host');
      await host.focus();
      if (size === 320 || size === 640) {
        const canvas = await page.locator('.game-host canvas').boundingBox();
        await page.mouse.click(canvas.x + canvas.width * .93, canvas.y + canvas.height * .8);
      } else { await page.keyboard.down('ArrowRight'); }
      await page.locator('.gac-trail').waitFor();
      await page.keyboard.up('ArrowRight');
      assert.equal((await state()).phase, 't04-slope'); assert.deepEqual((await state()).clues, []);
      await resume(); await page.locator('.gac-trail').waitFor();
      assert.equal((await state()).phase, 't04-slope');
      // Replay from the new T04 endpoint is covered by check-gac-trail.cjs.
      assert.deepEqual(errors, []);
      console.log(`${size}px ${language}: two moments, retry, saved landmarks, hint, dialogue reloads, farewell, chat, walk/tap exit into T04 passed`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
