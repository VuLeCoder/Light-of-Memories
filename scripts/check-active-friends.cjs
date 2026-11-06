const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
 try {
  for (const width of [1440,390]) for (const language of ['vi','en']) {
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
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
   // M1: finish the summary, reload inside T02's introduction, then stop
   // safely before the unshipped photo challenge. Drive the actual keyboard UI.
   for (let i=0;i<4;i++) {
    const dialogue=page.locator('.gac-meeting .dialogue');
    await dialogue.locator('.dialogue-next').waitFor();
    await page.waitForFunction(()=>document.querySelector('.gac-meeting .dialogue')?.dataset.complete==='true');
    if(i===3) {
     await page.reload();
     await page.getByRole('button',{name:language==='vi'?'Tiếp tục':'Continue',exact:true}).click();
     await page.locator('[data-line="t02-intro-02"]').waitFor();
     await page.waitForFunction(()=>document.querySelector('.gac-meeting .dialogue')?.dataset.complete==='true');
    }
    const line=await dialogue.getAttribute('data-line');
    await dialogue.locator('.dialogue-next').press('Enter');
    await page.waitForFunction(line=>document.querySelector('.gac-meeting .dialogue')?.dataset.line!==line,line);
   }
   await page.locator('.gac-meeting .ending-farewell').waitFor();
   let saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('cuoi.progress')));
   assert.equal(saved.version,18);assert.equal(saved.gacTroi.phase,'t02-search');
   assert.equal(saved.gacTroi.t02Done,false);assert.equal(saved.gacTroi.completedOnce,false);
   await page.reload();
   await page.getByRole('button',{name:language==='vi'?'Tiếp tục':'Continue',exact:true}).click();
   await page.locator('.gac-meeting .ending-farewell').waitFor();
   // A real v17 completed save keeps its earned light but resumes new T02.
   await page.evaluate(()=>{
    const p=JSON.parse(localStorage.getItem('cuoi.progress'));
    p.version=17;p.gacTroi={phase:'finished',turn:0,matched:['surveyor','lap-lanh'],seen:['surveyor','lap-lanh'],route:['surveyor','lap-lanh'],changeFound:true,completedOnce:true};
    localStorage.setItem('cuoi.progress',JSON.stringify(p));
   });
   await page.reload();
   await page.getByRole('button',{name:language==='vi'?'Tiếp tục':'Continue',exact:true}).click();
   await page.locator('[data-line="t02-intro-01"]').waitFor();
   saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('cuoi.progress')));
   assert.equal(saved.gacTroi.completedOnce,true);assert.equal(saved.gacTroi.farewellDone,false);
   for(let i=0;i<2;i++) {
    await page.waitForFunction(()=>document.querySelector('.gac-meeting .dialogue')?.dataset.complete==='true');
    const line=await page.locator('.gac-meeting .dialogue').getAttribute('data-line');
    await page.locator('.gac-meeting .dialogue-next').click();
    await page.waitForFunction(line=>document.querySelector('.gac-meeting .dialogue')?.dataset.line!==line,line);
   }
   await page.getByRole('button',{name:language==='vi'?'Chơi lại Gác Trời':'Replay Sky Watcher',exact:true}).click();
   await page.locator('[data-line="MO-02"]').waitFor();
   saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('cuoi.progress')));
   assert.equal(saved.gacTroi.completedOnce,true);assert.deepEqual(saved.gacTroi.matched,[]);
   assert.ok(saved.gacTroi.bookUnlocks.includes('gac-memory-surveyor'));
   const issues=await page.evaluate(()=>({
    broken:[...document.images].filter(i=>i.getClientRects().length && i.complete && !i.naturalWidth).map(i=>i.src),
    overflow:[...document.querySelectorAll('.game-stage,.game-instructions')].filter(e=>e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+2).map(e=>e.className),
    text:document.body.innerText
   }));
   assert.deepEqual(issues.broken,[]);assert.deepEqual(issues.overflow,[]);
   assert.doesNotMatch(issues.text,/Tai Thính|Bánh Lưới|Keen Ears|Mesh Wheels/);
   assert.deepEqual(errors,[]);
   console.log(`${width}px ${language}: route, T01, T02 intro/reload/gate, v17 migration, chapter replay, images and overflow passed`);
   await page.close();
  }
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});
