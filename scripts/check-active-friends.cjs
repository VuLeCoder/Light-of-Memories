const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
 try {
  for (const width of [1440,390]) for (const language of ['vi','en']) {
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(process.env.GAME_URL || 'http://localhost:4174');
   await page.evaluate(async language=>{
    const {freshSurveyor}=await import('/src/content/levels/surveyor-progress.ts');
    const {freshSparkle}=await import('/src/content/levels/lap-lanh.ts');
    const {freshGacTroi}=await import('/src/content/levels/gac-troi-progress.ts');
    const {gacMatchingIntroLength}=await import('/src/content/levels/gac-troi-matching.ts');
    localStorage.setItem('cuoi.language',language);
    localStorage.setItem('cuoi.progress',JSON.stringify({version:17,milestone:'complete',activeLevel:null,
     surveyor:{...freshSurveyor(),completedOnce:true},sparkle:{...freshSparkle(),completedOnce:true},gacTroi:{...freshGacTroi(),phase:'matching',turn:gacMatchingIntroLength}}));
   },language);
   await page.reload();
   await page.getByRole('button',{name:language==='vi'?'Tiếp tục':'Continue',exact:true}).click();
   assert.equal(await page.locator('.journey-stop').count(),3);
   await page.locator('.journey-stop').nth(2).click();
   await page.locator('.journey-entry-action button').click();
   await page.locator('.gac-match').waitFor();
   assert.equal(await page.locator('[data-gac-friend]').count(),2);
   assert.equal(await page.locator('.gac-sites button').count(),2);
   await page.locator('[data-gac-friend="lap-lanh"]').click();
   await page.locator('.gac-sites button').nth(0).click();
   await page.locator('[data-gac-confirm]').click();
   await page.locator('[data-gac-continue]').click();
   await page.locator('[data-gac-friend="surveyor"]').click();
   await page.locator('.gac-sites button').nth(1).click();
   await page.locator('[data-gac-confirm]').click();
   await page.locator('[data-gac-continue]').click();
   assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('cuoi.progress')).gacTroi.seen.length),2);
   const issues=await page.evaluate(()=>({
    broken:[...document.images].filter(i=>i.getClientRects().length && i.complete && !i.naturalWidth).map(i=>i.src),
    overflow:[...document.querySelectorAll('.game-stage,.game-instructions')].filter(e=>e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+2).map(e=>e.className),
    text:document.body.innerText
   }));
   assert.deepEqual(issues.broken,[]);assert.deepEqual(issues.overflow,[]);
   assert.doesNotMatch(issues.text,/Tai Thính|Bánh Lưới|Keen Ears|Mesh Wheels/);
   assert.deepEqual(errors,[]);
   console.log(`${width}px ${language}: route, matching both friends, story receipts, images and overflow passed`);
   await page.close();
  }
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});
