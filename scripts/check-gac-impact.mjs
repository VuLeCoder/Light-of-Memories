import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
 const { checkImpactPoint: hit, gacT02Story } = await server.ssrLoadModule('/src/content/levels/gac-troi-impact.ts');
 const { gacDialogueLengths, freshGacTroi, readGacTroi } = await server.ssrLoadModule('/src/content/levels/gac-troi-progress.ts');
 const previous = {...freshGacTroi(), phase:'t02-search', matched:['surveyor','lap-lanh'], seen:['surveyor','lap-lanh']};
 const upgraded = readGacTroi(previous);
 assert.ok(upgraded.bookUnlocks.includes('gac-book-impact'));
 assert.ok(!upgraded.bookUnlocks.includes('gac-book-impact.story'));
 assert.deepEqual(readGacTroi(upgraded),upgraded);
 for (const [w,h] of [[320,240],[360,500],[640,220],[860,400],[1920,1080]]) {
  const iw=Math.min(w,h*16/9),ih=iw*9/16,ox=(w-iw)/2,oy=(h-ih)/2;
  assert.equal(hit(ox+iw*.509,oy+ih*.5,w,h),true);
  assert.equal(hit(ox+iw*.509+21,oy+ih*.5,w,h),true,'Minimum 44px hit target');
  assert.equal(hit(ox+iw*.1,oy+ih*.1,w,h),false);
  if(ox>0) assert.equal(hit(ox/2,h/2,w,h),null,'Horizontal padding is not an attempt');
  if(oy>0) assert.equal(hit(w/2,oy/2,w,h),null,'Vertical padding is not an attempt');
 }
 assert.equal(hit(0,0,0,0),null);assert.equal(hit(NaN,0,100,100),null);
 for(const lang of ['vi','en']) assert.equal(gacT02Story(lang).length,gacDialogueLengths['t02-story']);
 console.log('T02 verified: contained-image coordinates, padding, 44px targets and bilingual story length.');
} finally { await server.close(); }
