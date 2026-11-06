import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { createServer } from 'vite';
const server = await createServer({ server:{port:0,host:'127.0.0.1'}, plugins:[{
  name:'rabbit-review-only', configureServer(server) {
    server.middlewares.use('/__rabbit-review', async (_req,res)=> {res.setHeader('Content-Type','text/html');res.end(await server.transformIndexHtml('/__rabbit-review', '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}button{font-size:18px}</style><div id="root"></div><script type="module" src="/scripts/fixtures/gac-rabbit-review.tsx"></script>'));});
  }
}] });
await server.listen();
const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
const base = `http://127.0.0.1:${server.httpServer.address().port}/__rabbit-review`;
let runs = 0;
try {
 for (const width of [320,640,960]) for (const lang of ['vi','en']) for (const reducedMotion of ['reduce','no-preference']) {
  const page = await browser.newPage({viewport:{width,height:1000},reducedMotion,hasTouch:true});
  const errors=[]; page.on('pageerror',e=>{errors.push(e.message);console.error(e.message);});
  const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('rabbit-review'))?.rabbitJourney);
  const ready=async()=> { await page.locator('.rabbit-backdrop canvas').waitFor(); await page.waitForFunction(()=>!document.querySelector('.rabbit-target:disabled,.rabbit-panel button:disabled')); };
  const geometry=async()=> {
   const box=await page.locator('.gac-rabbit').evaluate(el=>{
    const buttons=[...el.querySelectorAll('.rabbit-hit')].map(e=>e.getBoundingClientRect());
    const figures=[...el.querySelectorAll('.rabbit-figure,.rabbit-star')].map(e=>e.getBoundingClientRect());
    const [a,b]=buttons;
    return {overflow:document.documentElement.scrollWidth>innerWidth,small:buttons.some(b=>b.width<48||b.height<48),smallFigure:figures.some(b=>b.width<32),overlap:!!(a&&b&&!(a.right+8<=b.left||b.right+8<=a.left||a.bottom+8<=b.top||b.bottom+8<=a.top))};
   }); assert.deepEqual(box,{overflow:false,small:false,smallFigure:false,overlap:false});
  };
  const reload=async()=>{await page.reload();await ready();assert.equal(await page.locator('.rabbit-feedback').innerText(),'\u00a0');};
  await page.goto(`${base}?lang=${lang}`); await ready();
  for(const stop of ['slope','rock','banyan']) {
   await geometry();
   const hint=page.getByRole('button',{name:lang==='vi'?'Gợi ý':'Hint',exact:true});
   await hint.click(); assert.ok(await page.locator('.rabbit-hinted').count());
   if(await page.locator('.rabbit-wrong').count()) {
    await page.locator('.rabbit-wrong').click(); assert.ok(await page.locator('.rabbit-hinted').count());
   }
   await page.locator('.rabbit-target').focus(); await page.keyboard.press('Enter');
   if(reducedMotion==='no-preference') {
    assert.equal((await state()).rabbitFound,true);
    assert.equal(await page.locator('.rabbit-target').isDisabled(),true);
    await page.locator('.rabbit-target').dispatchEvent('click'); assert.equal((await state()).starsAwake,0);
   }
   await ready(); assert.equal((await state()).stage,stop);
   assert.equal(await page.locator('.rabbit-target').evaluate(e=>e===document.activeElement),true);
   await reload();assert.equal((await state()).rabbitFound,true);
   // Book/route pauses clear ephemeral feedback and keep receipts.
   await page.locator('#book').click(); await page.locator('#resume').click(); await ready();
   assert.equal((await state()).rabbitFound,true);
   for(let star=1;star<=(stop==='rock'?2:1);star++) {
    await geometry(); const b=await page.locator('.rabbit-target').boundingBox();
    await page.touchscreen.tap(b.x+b.width/2,b.y+b.height/2);
    // Reload during the reaction must restore the already committed receipt.
    assert.equal((await state()).starsAwake,star);await reload();
   }
   assert.equal(await hint.count(),0);
   assert.equal(await page.locator('.rabbit-target').count(),0);
   if(stop==='banyan') await page.locator('.gac-rabbit').screenshot({path:`/tmp/gac-rabbit-${width}-${lang}-${reducedMotion}.png`});
   await page.locator('.rabbit-panel button').focus();await page.keyboard.press('Space');
   if(stop!=='banyan') await ready();
  }
  await page.locator('#reunion').waitFor();
  assert.equal((await state()).completedStops,3);assert.deepEqual(errors,[]);
  await page.close();runs++; console.log(`Passed ${width}px ${lang} ${reducedMotion}`);
 }
 console.log(`Rabbit UI: ${runs} full journeys passed (320/640/960px, VI/EN, motion/reduced motion, keyboard/touch, reload, pause, duplicate input).`);
} finally {await browser.close();await server.close();}
