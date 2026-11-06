const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const { mkdirSync } = require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
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
    localStorage.setItem('cuoi.progress',JSON.stringify({version:18,milestone:'complete',activeLevel:'gac-troi',surveyor:{...freshSurveyor(),completedOnce:true},sparkle:{...freshSparkle(),completedOnce:true},gacTroi:{...freshGacTroi(),phase:'t02-search',matched:['surveyor','lap-lanh'],seen:['surveyor','lap-lanh']}}));
   },language);
   // Keep exact game widths and the minimum height after every checkpoint reload.
   const resume=async()=>{await page.reload();await page.getByRole('button',{name:language==='vi'?'Tiếp tục':'Continue',exact:true}).click({timeout:10000}).catch(async e=>{console.log({errors,body:await page.locator('body').innerText()});throw e;});await page.addStyleTag({content:`#main-scene .game-stage {width:${size}px!important;height:480px!important;min-height:480px!important;max-width:none!important} .game-panel {width:${size}px!important}`});};
   await resume();
   const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('cuoi.progress')).gacTroi);
   const photo=page.locator('.gac-impact-frame .gac-impact-photo');
   await page.waitForFunction(()=>document.querySelector('.gac-impact-regions button')?.disabled===false);
   const before=await photo.boundingBox();
   await page.locator('.gac-impact-switch button').nth(1).click();
   await page.waitForFunction(()=>document.querySelector('.gac-impact-regions button')?.disabled===false);
   const after=await photo.boundingBox();assert.deepEqual(after,before,'Before/after use identical full frame');
   assert.ok(Math.abs(after.width/after.height-16/9)<.01);
   const frame=await page.locator('.gac-impact-frame').boundingBox();
   if(frame.height>after.height+8) await page.mouse.click(frame.x+frame.width/2,frame.y+2);
   assert.equal(await page.locator('.gac-impact-response').innerText(),'\u00a0');
   await page.locator('.gac-impact-regions button').nth(0).press('Enter');
   assert.equal((await state()).phase,'t02-search');
   assert.ok((await page.locator('.gac-impact-response').innerText()).length>10);
   // Hint opens the broad reference, keeps the answer and scene untouched.
   await page.locator('.gac-impact-switch button').nth(2).click();
   await page.locator('.book-panel [data-book-block="gac-book-impact.hint"] .gac-impact-hint').waitFor({state:'visible'});
   assert.equal((await state()).phase,'t02-search');assert.equal((await state()).t02Done,false);
   assert.equal(await page.locator('.book-panel .gac-impact-answer').count(),0);
   await page.locator('.gac-impact-switch button').nth(0).focus();
   // Choose on the Before frame. Both pointer and keyboard paths are exercised.
   await page.locator('.gac-impact-switch button').nth(0).click();
   await page.waitForFunction(()=>document.querySelector('.gac-impact-regions button')?.disabled===false);
   if(size===320||size===640) {
    const box=await photo.boundingBox();await page.mouse.click(box.x+box.width*.509,box.y+box.height*.5);
   } else await page.locator('.gac-impact-regions button').nth(1).press('Enter');
   await page.locator('[data-line="t02-found-01"]').waitFor();
   assert.equal((await state()).t02Done,false);
   assert.ok((await page.locator('.gac-impact-frame img').getAttribute('src')).includes('after'));
   await page.locator('.gac-impact-answer').first().waitFor();
   const imageBox=await photo.boundingBox(),dialogueBox=await page.locator('.gac-impact .dialogue').boundingBox();
   assert.ok(imageBox.y+imageBox.height<=dialogueBox.y+1,'Dialogue does not cover photo');
   const issues=await page.locator('.gac-impact').evaluate(el=>({overflow:el.scrollHeight>el.clientHeight+2||el.scrollWidth>el.clientWidth+2,broken:[...el.querySelectorAll('img')].some(i=>i.complete&&!i.naturalWidth)}));
   assert.deepEqual(issues,{overflow:false,broken:false});
   if((size===320||size===860)&&language==='vi') {
    mkdirSync('/tmp/cuoi-m2',{recursive:true});await page.locator('.game-stage').screenshot({path:`/tmp/cuoi-m2/story-${size}.png`});
   }
   for(let i=0;i<4;i++) {
    await page.locator(`[data-line="t02-found-0${i+1}"]`).waitFor();
    assert.equal((await state()).t02Done,false);
    assert.equal(await page.locator('.gac-impact').evaluate(el=>el.scrollHeight>el.clientHeight+2||el.scrollWidth>el.clientWidth+2),false,'Story line fits');
    // Persist and resume every story checkpoint, without triggering a second award.
    await resume();await page.locator(`[data-line="t02-found-0${i+1}"]`).waitFor();
    await page.waitForFunction(()=>document.querySelector('.gac-impact .dialogue')?.dataset.complete==='true');
    await page.locator('.gac-impact .dialogue-next').press('Enter');
   }
   await page.locator('[data-line="t03-intro-01"]').waitFor();
   assert.equal((await state()).phase,'t03-intro');assert.equal((await state()).t02Done,true);assert.equal((await state()).completedOnce,false);
   assert.ok((await state()).bookUnlocks.includes('gac-book-impact.story'));
   await resume();await page.locator('[data-line="t03-intro-01"]').waitFor();
   assert.equal((await state()).phase,'t03-intro');
   assert.deepEqual(errors,[]);
   console.log(`${size}px ${language}: frame, padding, retry, book hint, pointer/keyboard, story reloads and T03 introduction passed`);
   await page.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
