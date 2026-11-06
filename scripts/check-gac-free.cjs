const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
 try {
  for(const size of [320,360,640,860]) for(const language of ['vi','en']) {
   const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(process.env.GAME_URL||'http://localhost:4174');
   await page.evaluate(async language=>{
    const {freshSurveyor}=await import('/src/content/levels/surveyor-progress.ts');
    const {freshSparkle}=await import('/src/content/levels/lap-lanh.ts');
    const {freshGacTroi}=await import('/src/content/levels/gac-troi-progress.ts');
    localStorage.setItem('cuoi.language',language);
    localStorage.setItem('cuoi.progress',JSON.stringify({version:18,milestone:'complete',activeLevel:'gac-troi',surveyor:{...freshSurveyor(),completedOnce:true},sparkle:{...freshSparkle(),completedOnce:true},gacTroi:{...freshGacTroi(),phase:'gac-free',matched:['surveyor','lap-lanh'],seen:['surveyor','lap-lanh'],t02Done:true,routeLandmarks:['low-slope','split-rock','banyan-shadow'],farewellDone:true,completedOnce:true}}));
   },language);
   await page.reload();await page.getByRole('button',{name:language==='vi'?'Tiếp tục':'Continue',exact:true}).click();
   await page.addStyleTag({content:`#main-scene .game-stage{width:${size}px!important;height:480px!important;min-height:480px!important;max-width:none!important}.game-panel{width:${size}px!important}`});
   const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('cuoi.progress')).gacTroi);
   await page.locator('.gac-free-panel').waitFor();const saved=await state();
   await page.locator('.gac-free-panel nav button').nth(1).click();
   await page.locator('.gac-free-map svg').waitFor({state:'visible'});
   assert.equal(await page.locator('.gac-free-panel').evaluate(el=>{const p=el.getBoundingClientRect(),s=el.closest('.game-stage').getBoundingClientRect();return p.top>=s.top&&p.bottom<=s.bottom+1&&p.right<=s.right+1}),true);
   await page.locator('.gac-free-map button').click();
   await page.locator('.book-gac-map svg').waitFor({state:'visible'});
   assert.deepEqual(await state(),saved);
   await page.keyboard.press('ArrowRight');assert.deepEqual(await state(),saved);
   await page.locator('.gac-free-panel nav button').nth(1).click();
   await page.locator('.open-menu').click();await page.keyboard.press('ArrowRight');
   assert.deepEqual(await state(),saved);
   await page.getByRole('button',{name:language==='vi'?'Tiếp tục':'Continue',exact:true}).click();await page.locator('.gac-free-panel').waitFor();
   await page.locator('.gac-meeting .surveyor-scene-hud button').click();
   await page.locator('.journey-stop').last().click();
   await page.locator('.journey-entry-action button').click();
   await page.locator('.gac-free-panel').waitFor();assert.deepEqual(await state(),saved);
   assert.deepEqual(errors,[]);
   console.log(`${size}px ${language}: expanded map, book, menu pause and route re-entry preserve the farewell checkpoint`);
   await page.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
