const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const output = 'docs/plan/three-friends/image-review';
fs.mkdirSync(output, {recursive:true});
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || '/usr/bin/google-chrome',headless:true});
 try {
  for(const width of [1440,390]) for(const language of ['vi','en']) {
   const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
   const errors=[]; page.on('pageerror',e=>errors.push(e.message));
   await page.goto(process.env.GAME_URL || 'http://localhost:4173');
   await page.locator('#menu-title').waitFor();
   await page.evaluate(async language=>{
    const {freshSurveyor,eventOrder}=await import('/src/content/levels/surveyor-progress.ts');
    const {freshBanhLuoi}=await import('/src/content/levels/ban-banh-luoi-progress.ts');
    const {freshGacTroi}=await import('/src/content/levels/gac-troi-progress.ts');
    localStorage.setItem('cuoi.language',language);
    localStorage.setItem('cuoi.progress',JSON.stringify({version:16,milestone:'complete',activeLevel:null,
     surveyor:{...freshSurveyor(),phase:'complete',turn:10,matched:['camera','scoop'],found:eventOrder,clues:eventOrder,order:eventOrder,completedOnce:true},
     banhLuoi:{...freshBanhLuoi(),phase:'finished',wheelChoice:'mesh',keepsakes:['vip','orbit'],guideLegacyPassed:true,completedOnce:true},
     gacTroi:{...freshGacTroi(),phase:'finished',matched:['surveyor','ban-banh-luoi'],seen:['surveyor','ban-banh-luoi'],route:['surveyor','ban-banh-luoi'],changeFound:true,completedOnce:true},
     ending:{phase:'finished',turn:0,active:false,completedOnce:true}}));
   },language);
   const resume=async()=>{await page.reload();await page.getByRole('button',{name:language==='vi'?'Tiếp tục':'Continue',exact:true}).click();};
   await resume();
   const checkImages=async()=>{
    const failed=await page.locator('img:visible').evaluateAll(async imgs=>{
     await Promise.all(imgs.map(i=>i.decode().catch(()=>{})));
     return imgs.filter(i=>!i.naturalWidth).map(i=>i.src);
    }); assert.deepEqual(failed,[],'All visible images decode');
   };
   let count=0; const headings=[];
   while(count++<150){
    await checkImages();
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const overflow=await page.locator('.book-sheet').evaluate(s=>s.scrollHeight-s.clientHeight);
    assert.ok(overflow<=1,`Book overflow ${overflow}px: ${await page.locator('.book-panel h2').innerText()}`);
    headings.push(await page.locator('.book-panel h2').innerText());
    const next=page.getByRole('button',{name:language==='vi'?'Trang sau':'Next page',exact:true});
    if(await next.isDisabled())break;
    const prior=await page.locator('.book-navigation [role="status"]').textContent();
    await next.click();
    await page.waitForFunction(prior=>document.querySelector('.book-navigation [role="status"]').textContent!==prior,prior);
   }
   assert.ok(count<150,'Book reaches final page');
   const joined=headings.join('\n');
   assert.ok(joined.includes(language==='vi'?'Lấp Lánh':'Sparkle'),'Further reading Sparkle unlocked');
   assert.ok(joined.includes(language==='vi'?'Tai Thính':'Keen Ears'),'Further reading Keen Ears unlocked');
   assert.equal(await page.locator('.book-panel .book-friend').count(),0,'Reunion has no unrelated LRO portrait');
   await page.locator('.book-panel').screenshot({path:`${output}/${width}-${language}-reunion-book.png`});
   for(const [activeLevel,phase,turn] of [['surveyor','complete',10],['ban-banh-luoi','finished',0],['ban-banh-luoi','photoA',0],['ban-banh-luoi','photoB',1],['ban-banh-luoi','routePuzzle',0]]) {
    await page.evaluate(({activeLevel,phase,turn})=>{const p=JSON.parse(localStorage.getItem('cuoi.progress'));p.activeLevel=activeLevel;p[activeLevel==='surveyor'?'surveyor':'banhLuoi'].phase=phase;p[activeLevel==='surveyor'?'surveyor':'banhLuoi'].turn=turn;localStorage.setItem('cuoi.progress',JSON.stringify(p));},{activeLevel,phase,turn});
    await resume(); await page.locator('.story-canvas .game-host[data-ready="true"]').waitFor({state:'attached'}); await checkImages();
    const metrics=await page.locator('.game-stage').evaluate(s=>({x:s.scrollWidth-s.clientWidth,y:s.scrollHeight-s.clientHeight}));
    assert.deepEqual(metrics,{x:0,y:0},`${activeLevel}/${phase} fits`);
    assert.equal(await page.locator('.canvas-status').count(),0);
    if(activeLevel==='surveyor') {
     const canvas=await page.locator('.story-canvas canvas').boundingBox();
     const glow=await page.locator('.ending-distant-light').boundingBox();
     assert.ok(glow.y>=canvas.y && glow.y+glow.height<=canvas.y+canvas.height+1,'Distant light stays inside scenery');
    }
    await page.screenshot({path:`${output}/${width}-${language}-${activeLevel}-${phase}.png`});
   }
   assert.deepEqual(errors,[]);console.log('Images/book/scenes passed',width,language,`${count} book pages`);await page.close();
  }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
