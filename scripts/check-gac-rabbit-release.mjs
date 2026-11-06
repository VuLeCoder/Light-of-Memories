import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { chromium } from 'playwright';
const server = await createServer({server:{host:'127.0.0.1',port:0}});
await server.listen();
const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
try {
 const { freshGacTroi } = await server.ssrLoadModule('/src/content/levels/gac-troi-progress.ts');
 const { freshSurveyor } = await server.ssrLoadModule('/src/content/levels/surveyor-progress.ts');
 const { freshSparkle } = await server.ssrLoadModule('/src/content/levels/lap-lanh.ts');
 const save={version:18,milestone:'complete',activeLevel:'gac-troi',surveyor:{...freshSurveyor(),completedOnce:true},sparkle:{...freshSparkle(),completedOnce:true},gacTroi:{...freshGacTroi(),phase:'t02-story',turn:2,matched:['surveyor','lap-lanh'],seen:['surveyor','lap-lanh'],t02Done:false}};
 for(const width of [360,960]) for(const lang of ['vi','en']) {
  const page=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce',hasTouch:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.httpServer.address().port}`);
  await page.evaluate(({save,lang})=>{localStorage.setItem('cuoi.progress',JSON.stringify(save));localStorage.setItem('cuoi.language',lang);localStorage.setItem('cuoi.sound','off');},{save,lang});
  const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('cuoi.progress')).gacTroi);
  const resume=async()=> {await page.getByRole('button',{name:lang==='vi'?'Tiếp tục':'Continue',exact:true}).click();};
  await page.reload();await resume();
  const layout=async()=> {
   const issues=await page.locator('.gac-rabbit').evaluate(el=>{
    const frame=el.getBoundingClientRect();
    const cards=[...el.querySelectorAll('.rabbit-hud,.rabbit-panel,.dialogue')];
    const outside=cards.some(card=>{const b=card.getBoundingClientRect();return b.left<frame.left-1||b.right>frame.right+1||b.top<frame.top-1||b.bottom>frame.bottom+1;});
    const target=el.querySelector('.rabbit-target');
    const b=target?.getBoundingClientRect();
    const covered=b && !target.contains(document.elementFromPoint(b.x+b.width/2,b.y+b.height/2));
    return {outside,covered:!!covered};
   });
   assert.deepEqual(issues,{outside:false,covered:false});
  };
  const next=async()=>{const b=page.locator('.dialogue:not([hidden]) .dialogue-next:visible');await b.click();await page.waitForTimeout(80);};
  // Finish T02 story and verify that the app activates the released journey.
  for(let i=0;i<8 && !(await state()).rabbitJourney?.active;i++) await next();
  assert.equal((await state()).rabbitJourney.stage,'real');
  const dialogue=async(stage,length)=>{
   for(let i=0;i<length;i++) {
    await page.waitForFunction(id=>document.querySelector('.rabbit-story .dialogue')?.getAttribute('data-line')===`rabbit-${id}`,`${stage}-${String(i+1).padStart(2,'0')}`);
    await page.waitForFunction(()=>document.querySelector('.rabbit-story .dialogue')?.getAttribute('data-complete')==='true');
    await layout();
    await next();
   }
  };
  await dialogue('real',3);await dialogue('bridge',3);
  for(const stop of ['slope','rock','banyan']) {
   for(let i=0;i<(stop==='rock'?3:2);i++) { await page.locator('.gac-rabbit').scrollIntoViewIfNeeded(); await layout(); await page.locator('.rabbit-target').click(); }
   assert.equal((await state()).completedOnce,false);
   await page.locator('.rabbit-panel button').click();
  }
  await dialogue('reunion',4);
  assert.equal((await state()).completedOnce,false);
  for(let i=0;i<5;i++) {
   await page.waitForFunction(id=>document.querySelector('.rabbit-story .dialogue')?.getAttribute('data-line')===id,`rabbit-farewell-0${i+1}`);
   await page.waitForFunction(()=>document.querySelector('.rabbit-story .dialogue')?.getAttribute('data-complete')==='true');
   assert.equal((await state()).completedOnce,i>=3);
   if(i===3) {await page.reload();await resume();assert.equal((await state()).rabbitJourney.turn,3);}
   await next();
  }
  assert.equal((await state()).rabbitJourney.stage,'free');
  const before=await state();
  await page.getByRole('button',{name:lang==='vi'?'Trò chuyện':'Chat',exact:true}).click();
  await dialogue('chat',3);assert.deepEqual(await state(),before);
  assert.equal(await page.locator('.rabbit-story').evaluate(el=>getComputedStyle(el).position),'relative');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.getByRole('button',{name:lang==='vi'?'Mở sách':'Open book',exact:true}).click();
  await page.locator('#gac-book-title').filter({hasText:lang==='vi'?'Theo Thỏ tới gốc đa':'Follow Rabbit to the banyan'}).waitFor();
  assert.deepEqual(await state(),before);
  await page.getByRole('button',{name:lang==='vi'?'Về lộ trình':'Back to route',exact:true}).click();
  await page.locator('.journey-stop.stop-2').click();
  await page.locator('.journey-entry-action button').click();
  assert.deepEqual(await state(),before);
  await page.locator('.rabbit-story').screenshot({path:`/tmp/gac-r3-${width}-${lang}.png`});
  await page.getByRole('button',{name:lang==='vi'?'Chơi lại Gác Trời':'Replay Sky Watcher',exact:true}).click();
  assert.equal((await state()).phase,'meeting');assert.equal((await state()).completedOnce,true);assert.equal((await state()).rabbitJourney,null);
  assert.deepEqual(errors,[]);await page.close();console.log(`GT-R3 full app passed: ${width}px ${lang}`);
 }
} finally {await browser.close();await server.close();}
