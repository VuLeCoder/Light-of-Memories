const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const output = path.resolve('docs/plan/three-friends/verification');
fs.mkdirSync(output,{recursive:true});
(async () => {
 const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || '/usr/bin/google-chrome',headless:true});
 const results=[];
 try {
  for(const width of [1440,390]) for(const language of ['vi','en']) {
   const vi=language==='vi';
   const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce',hasTouch:width===390});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   page.setDefaultTimeout(12000);
   await page.goto(process.env.GAME_URL || 'http://localhost:4173');
   await page.locator('#menu-title').waitFor();
   await page.evaluate(async language=>{
    const {freshSurveyor}=await import('/src/content/levels/surveyor-progress.ts');
    const {freshBanhLuoi}=await import('/src/content/levels/ban-banh-luoi-progress.ts');
    const {freshGacTroi}=await import('/src/content/levels/gac-troi-progress.ts');
    localStorage.setItem('cuoi.language',language);
    localStorage.setItem('cuoi.progress',JSON.stringify({version:15,milestone:'complete',activeLevel:'gac-troi',surveyor:{...freshSurveyor(),phase:'complete',turn:10,completedOnce:true},banhLuoi:{...freshBanhLuoi(),phase:'finished',wheelChoice:'mesh',keepsakes:['vip','orbit'],guideLegacyPassed:true,completedOnce:true},gacTroi:freshGacTroi()}));
   },language);
   const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('cuoi.progress')));
   const resume=async()=>{await page.reload();await page.getByRole('button',{name:vi?'Tiếp tục':'Continue',exact:true}).click();};
   const advance=async()=>{
    const next=page.locator('.game-stage .dialogue:not([hidden]) .dialogue-next');
    await next.waitFor();
    await page.waitForFunction(()=>document.querySelector('.game-stage .dialogue:not([hidden])')?.dataset.complete==='true');
    const before=await saved();await next.click();
    await page.waitForFunction(prior=>localStorage.getItem('cuoi.progress')!==prior,JSON.stringify(before));
   };
   const fits=async name=>{
    const m=await page.evaluate(()=>{
     const stage=document.querySelector('.game-stage'),b=stage.getBoundingClientRect();
     const controls=[...stage.querySelectorAll('.gac-meeting button,.gac-meeting figure,.final-chapter button,.final-chapter .dialogue')].filter(e=>e.getClientRects().length&&!e.closest('[hidden]'));
     return {scroll:stage.scrollHeight-stage.clientHeight,width:document.documentElement.scrollWidth,footer:document.querySelector('.game-instructions').getBoundingClientRect().height,
      overflow:controls.filter(e=>{const r=e.getBoundingClientRect();return r.left<b.left-1||r.right>b.right+1||r.top<b.top-1||r.bottom>b.bottom+1;}).map(e=>e.outerHTML.slice(0,100))};
    });
    assert.equal(m.scroll,0,name+' scroll');assert.ok(m.width<=width,name+' width');assert.equal(m.footer,96);assert.deepEqual(m.overflow,[],name+' overflow');
    await page.screenshot({path:path.join(output,`${width}-${language}-${name}.png`)});return m;
   };
   await resume();
   for(let i=0;i<6;i++)await advance();
   for(let i=0;i<3;i++)await advance();
   await page.locator('.gac-match').waitFor();await fits('matching');
   await page.getByRole('button',{name:vi?'Gợi ý':'Hint',exact:true}).click();
   await page.waitForFunction(()=>document.activeElement?.id==='gac-book-title');
   assert.equal(await page.locator('#gac-book-title').textContent(),vi?'Hai người bạn, hai vùng đất':'Two friends, two places');
   await page.locator('[data-gac-friend="ban-banh-luoi"]').click();await page.locator('[data-gac-confirm]').click();
   assert.equal((await saved()).gacTroi.matched.length,0,'Wrong pair rejected');
   for(const [id,site] of [['surveyor','Apollo 12'],['ban-banh-luoi','Apollo 17']]) {
    await page.locator(`[data-gac-friend="${id}"]`).click();await page.locator('.gac-sites button').filter({hasText:site}).click();await page.locator('[data-gac-confirm]').click();
    await page.locator('.gac-memory').waitFor();await fits(id);
    const snapshot=(await saved()).gacTroi;await resume();assert.deepEqual((await saved()).gacTroi,snapshot);
    await page.locator('[data-gac-continue]').click();
    if(id==='surveyor') assert.ok(await page.locator('[data-gac-friend="surveyor"]').evaluate(e=>e.classList.contains('gac-friend-complete')));
   }
   await advance();await advance();await page.locator('.gac-route-cards').waitFor();
   await page.getByRole('button',{name:vi?'Bánh Lưới':'Mesh Wheels',exact:true}).click();assert.equal((await saved()).gacTroi.route.length,0);
   await page.getByRole('button',{name:vi?'Mắt Tròn':'Round Eyes',exact:true}).click();
   await page.getByRole('button',{name:vi?'Hoàn tác':'Undo',exact:true}).click();assert.equal((await saved()).gacTroi.route.length,0);
   await page.getByRole('button',{name:vi?'Mắt Tròn':'Round Eyes',exact:true}).click();
   await resume();assert.equal((await saved()).gacTroi.route.length,1);
   await page.getByRole('button',{name:vi?'Bánh Lưới':'Mesh Wheels',exact:true}).click();await fits('route-complete');
   await page.locator('[data-gac-continue]').click();
   await page.locator('.gac-changes').waitFor();await fits('changes-before');
   if(width===390 && vi) await page.route('**/impact2013-after.webp',r=>r.abort());
   await page.locator('.gac-sites button').filter({hasText:vi?'Sau':'After'}).click();
   if(width===390 && vi) {
    await page.getByRole('button',{name:'Thử lại',exact:true}).waitFor();await fits('image-error');
    await page.unroute('**/impact2013-after.webp');await page.getByRole('button',{name:'Thử lại',exact:true}).click();
    await page.locator('.gac-change-image img').evaluate(img=>img.decode());
   }
   await page.getByRole('button',{name:vi?'Vùng trên trái':'Area top left',exact:true}).click();assert.equal((await saved()).gacTroi.changeFound,false);
   await page.getByRole('button',{name:vi?'Gợi ý':'Hint',exact:true}).click();await page.waitForFunction(()=>document.activeElement?.id==='gac-book-title');assert.equal(await page.locator('#gac-book-title').textContent(),vi?'Nhìn ra điều đổi thay':'Noticing change');
   await page.getByRole('button',{name:vi?'Vùng chính giữa':'Area centre',exact:true}).focus();await page.keyboard.press('Enter');
   assert.equal((await saved()).gacTroi.changeFound,true);await fits('changes-found');await resume();assert.equal((await saved()).gacTroi.changeFound,true);
   await page.locator('[data-gac-continue]').click();
   for(let i=0;i<4;i++)await advance();assert.equal((await saved()).gacTroi.completedOnce,true);await fits('gift');
   for(let i=0;i<3;i++)await advance();await fits('gac-finished');
   await page.getByRole('button',{name:vi?'Đi tìm chị Hằng →':'Find Hằng →',exact:true}).click();
   await page.locator('.final-canvas .game-host[data-ready="true"]').waitFor();await fits('final-walk');
   await page.locator('.final-canvas .game-host').focus();await page.keyboard.down('ArrowRight');
   await page.waitForFunction(()=>JSON.parse(localStorage.getItem('cuoi.progress')).ending.phase==='reunion',{},{timeout:15000});await page.keyboard.up('ArrowRight');
   await page.locator('.final-chapter .dialogue:not([hidden])').waitFor();await page.waitForFunction(()=>document.querySelector('.final-chapter .dialogue')?.dataset.complete==='true');await fits('reunion');
   await advance();const last=(await saved()).ending;await resume();assert.deepEqual((await saved()).ending,last);
   for(let i=0;i<5;i++)await advance();await page.locator('.final-chapter .dialogue:not([hidden])').waitFor();await fits('home');
   for(let i=0;i<5;i++)await advance();await page.locator('.final-chapter .dialogue:not([hidden])').waitFor();await fits('earth');
   await page.getByRole('button',{name:/Menu/}).click();const paused=(await saved()).ending;await page.keyboard.press('Space');assert.deepEqual((await saved()).ending,paused);await page.getByRole('button',{name:vi?'Tiếp tục':'Continue',exact:true}).click();
   for(let i=0;i<5;i++)await advance();await page.locator('.final-actions').waitFor();await fits('finished');assert.equal((await saved()).ending.completedOnce,true);
   await page.getByRole('button',{name:vi?'Chơi lại hành trình':'Play the journey again',exact:true}).click();await fits('confirm');await page.getByRole('button',{name:vi?'Giữ hành trình':'Keep this journey',exact:true}).click();
   await page.locator('[data-final-primary]').click();assert.equal((await saved()).ending.phase,'walk');assert.equal((await saved()).gacTroi.completedOnce,true);
   await page.locator('.final-chapter .surveyor-scene-hud button').click();await page.locator('.journey-overview').waitFor();assert.equal(await page.locator('.journey-stop').count(),3);await fits('journey');
   await page.locator('.journey-stop.stop-2').click();await page.locator('.journey-entry-action button').click();await page.getByRole('button',{name:vi?'Chơi lại từ đầu':'Play again from the start',exact:true}).click();assert.equal((await saved()).gacTroi.phase,'meeting');assert.equal((await saved()).gacTroi.completedOnce,true);
   await resume();assert.equal((await saved()).gacTroi.completedOnce,true);await page.locator('.gac-meeting .dialogue:not([hidden])').waitFor();assert.equal((await saved()).ending.active,false);
   // Restart through the ending's own confirmation, then play the opening without seeded checkpoints.
   await page.evaluate(()=>{const p=JSON.parse(localStorage.getItem('cuoi.progress'));p.ending={phase:'finished',turn:0,completedOnce:true,active:true};localStorage.setItem('cuoi.progress',JSON.stringify(p));});
   await resume();await page.getByRole('button',{name:vi?'Chơi lại hành trình':'Play the journey again',exact:true}).click();await page.getByRole('button',{name:vi?'Bắt đầu lại':'Start again',exact:true}).click();
   let fresh=await saved();assert.equal(fresh.ending.phase,'idle');assert.equal(fresh.surveyor.completedOnce,false);assert.equal(fresh.banhLuoi.completedOnce,false);assert.equal(fresh.gacTroi.completedOnce,false);
   const openingNext=async()=>{const d=page.locator('.game-stage .dialogue:not([hidden])');await page.waitForFunction(()=>document.querySelector('.game-stage .dialogue:not([hidden])')?.dataset.complete==='true');const id=await d.getAttribute('data-line');await d.locator('.dialogue-next').click();await page.waitForFunction(id=>document.querySelector('.game-stage .dialogue:not([hidden])')?.dataset.line!==id,id);};
   for(let i=0;i<6;i++)await openingNext();
   await page.locator('[data-line="moon-01"]:not([hidden])').waitFor();
   for(let i=0;i<2;i++)await openingNext();
   await page.locator('.story-canvas .game-host[data-ready="true"]').waitFor();
   const canvas=page.locator('.story-canvas canvas');let bounds=await canvas.boundingBox();
   await page.mouse.click(bounds.x+bounds.width*520/960,bounds.y+bounds.height*390/540);
   await page.waitForFunction(()=>JSON.parse(localStorage.getItem('cuoi.progress')).milestone==='tree');
   for(let i=0;i<5;i++)await openingNext();
   for(let i=0;i<2;i++)await openingNext();
   bounds=await canvas.boundingBox();await page.mouse.click(bounds.x+bounds.width*910/960,bounds.y+bounds.height*440/540);
   await page.locator('.journey-overview').waitFor();assert.equal(await page.locator('.journey-stop').count(),3);await fits('fresh-route');
   await page.locator('.journey-entry-action button').click();assert.equal((await saved()).activeLevel,'surveyor');
   assert.deepEqual(errors,[]);results.push({width,language,errors});console.log('Passed',width,language);await page.close();
  }
  fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
