const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async()=>{
 const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
 const results=[];
 try {
  for(const size of [320,360,640,860]) for(const language of ['vi','en']) {
   const vi=language==='vi';
   const page=await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce',hasTouch:true});
   page.setDefaultTimeout(15000);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(process.env.GAME_URL||'http://localhost:4174');
   await page.evaluate(async language=>{
    const {freshSurveyor}=await import('/src/content/levels/surveyor-progress.ts');
    const {freshSparkle}=await import('/src/content/levels/lap-lanh.ts');
    const {freshGacTroi}=await import('/src/content/levels/gac-troi-progress.ts');
    localStorage.setItem('cuoi.language',language);
    localStorage.setItem('cuoi.progress',JSON.stringify({version:18,milestone:'complete',activeLevel:'gac-troi',surveyor:{...freshSurveyor(),completedOnce:true},sparkle:{...freshSparkle(),completedOnce:true},gacTroi:{...freshGacTroi(),phase:'gac-free',matched:['surveyor','lap-lanh'],seen:['surveyor','lap-lanh'],t02Done:true,routeLandmarks:['low-slope','split-rock','banyan-shadow'],farewellDone:true,completedOnce:true}}));
   },language);
   async function continueGame(){await page.getByRole('button',{name:vi?'Tiếp tục':'Continue',exact:true}).click();}
   async function fit(){await page.addStyleTag({content:`#main-scene .game-stage{width:${size}px!important;max-width:none!important}.game-panel{width:${size}px!important}`});}
   async function reload(){await page.reload();await continueGame();await fit();await page.locator('.gac-trail .game-host[data-ready=true]').waitFor();}
   const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('cuoi.progress')).gacTroi);
   const button=name=>page.locator('.gac-trail-panel').getByRole('button',{name,exact:true});
   const phase=async expected=>{await page.waitForFunction(expected=>JSON.parse(localStorage.getItem('cuoi.progress')).gacTroi.phase===expected,expected);};
   const bounds=async()=>{
    const report=await page.locator('.gac-trail').evaluate(el=>{
     const stage=el.closest('.game-stage').getBoundingClientRect(), box=el.getBoundingClientRect();
     return {overflow:el.scrollWidth>el.clientWidth+1,clipped:box.bottom>stage.bottom+1,small:[...el.querySelectorAll('button:not([tabindex="-1"])')].filter(b=>b.getBoundingClientRect().height&&b.getBoundingClientRect().height<43).length};
    });assert.deepEqual(report,{overflow:false,clipped:false,small:0});
   };
   await page.reload();await continueGame();await fit();await page.locator('.gac-free-panel').waitFor();await page.locator('.game-host[data-ready=true]').waitFor();
   await page.locator('.game-host').focus();await page.keyboard.down('ArrowRight');await phase('t04-slope');await page.keyboard.up('ArrowRight');
   await page.locator('.gac-trail .game-host[data-ready=true]').waitFor();await bounds();
   assert.equal(await button(vi?'Triền thấp':'Low slope').isDisabled(),true);
   await page.locator('.gac-trail-hud button').first().click();await page.locator('dialog[open]').waitFor();await page.keyboard.press('Escape');
   assert.equal(await page.locator('.gac-trail-hud button').first().evaluate(e=>e===document.activeElement),true);
   await button(vi?'Triền cao':'High ridge').click();assert.deepEqual((await state()).clues,[]);
   if(size===320||size===860){fs.mkdirSync('docs/done/m4-review',{recursive:true});await page.locator('.gac-trail').screenshot({path:`docs/done/m4-review/${size}-${language}-slope.png`});}
   if(size>=640){const box=await page.locator('.gac-trail-hotspots button').nth(1).boundingBox();await page.touchscreen.tap(box.x+box.width/2,box.y+box.height/2);}else{await button(vi?'Triền thấp':'Low slope').focus();await page.keyboard.press('Enter');}
   await button(vi?'Xác nhận triền thấp':'Confirm the low slope').click();
   assert.deepEqual((await state()).clues,[]);
   // Menu pauses a held direction, and never collapses the game stage.
   await page.locator('.open-menu').click();assert.ok(await page.locator('.game-stage').evaluate(e=>e.getBoundingClientRect().height)>400);await page.keyboard.press('ArrowRight');await continueGame();
   await button(vi?'Đi sang phải →':'Walk to the right →').click();await phase('t04-rock');
   assert.deepEqual((await state()).clues,['slope']);await reload();assert.equal((await state()).phase,'t04-rock');
   await button(vi?'Xem ngôi sao':'Look at the star').click();assert.equal(await button(vi?'Theo ánh đèn':'Follow the lantern').isDisabled(),true);
   if(size>=640){const box=await page.locator('.gac-trail-hotspots button').nth(1).boundingBox();await page.touchscreen.tap(box.x+box.width/2,box.y+box.height/2);}else await button(vi?'Xem chiếc đèn':'Look at the lantern').click();assert.deepEqual((await state()).clues,['slope']);
   await button(vi?'Theo ánh đèn':'Follow the lantern').click();await bounds();
   if(size===320||size===860)await page.locator('.gac-trail').screenshot({path:`docs/done/m4-review/${size}-${language}-rock.png`});
   await button(vi?'Gợi ý trong sách ▤':'Hint in the book ▤').click();await page.locator('.book-gac-map svg').waitFor({state:'visible'});assert.equal((await state()).phase,'t04-rock');
   await button(vi?'Đi sang phải →':'Walk to the right →').click();await phase('t04-banyan');await reload();
   await bounds();
   if(size===320||size===860){fs.mkdirSync('docs/done/m4-review',{recursive:true});await page.locator('.gac-trail').screenshot({path:`docs/done/m4-review/${size}-${language}-banyan.png`});}
   await button(vi?'Tới gốc đa →':'Go to the tree →').click();await phase('reunion');assert.deepEqual((await state()).clues,['slope','lantern','call']);
   await page.locator('.dialogue[data-line="reunion-01"]').waitFor();
   await page.locator('.dialogue[data-complete=true]').waitFor();await page.locator('.dialogue-next').click();
   await phase('reunion');await page.waitForFunction(()=>JSON.parse(localStorage.getItem('cuoi.progress')).gacTroi.turn===1);
   await reload();assert.equal((await state()).turn,1);assert.equal((await state()).reunionDone,false);
   while((await state()).phase==='reunion'){
    await page.locator('.dialogue[data-complete=true]').waitFor();await page.locator('.dialogue-next').click();await page.waitForTimeout(80);
   }
   await phase('cards-intro');const done=await state();assert.equal(done.reunionDone,true);assert.equal(done.storyCompletedOnce,false);assert.ok(done.bookUnlocks.includes('ending-book-cards'));
   await reload();assert.equal((await state()).phase,'cards-intro');await bounds();
   if(size===320||size===860)await page.locator('.gac-trail').screenshot({path:`docs/done/m4-review/${size}-${language}-reunion.png`});
   assert.deepEqual(errors,[]);assert.equal(await page.locator('img').evaluateAll(imgs=>imgs.some(i=>i.complete&&!i.naturalWidth)),false);
   await button(vi?'Chơi lại Gác Trời':'Replay Sky Watcher').click();const replay=await state();assert.equal(replay.phase,'meeting');assert.deepEqual(replay.clues,[]);assert.equal(replay.completedOnce,true);
   results.push({size,language,passed:true});console.log(`${size}px ${language}: three clues, keyboard/tap alternatives, map/Escape, menu, book, reload, reunion once, M5 gate and replay passed`);
   await page.close();
  }
  fs.writeFileSync('docs/done/m4-review/results.json',JSON.stringify(results,null,2)+'\n');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
