import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSync } from 'esbuild';

const load = async path => {
  const result=buildSync({entryPoints:[path],bundle:true,write:false,platform:'node',format:'esm',define:{'import.meta.env.BASE_URL':'"/"'}});
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
};
const p=await load('src/content/levels/friends-progress.ts');
const storage=await load('src/state/progress.ts');
const surveyor={phase:'complete',turn:3,matched:['camera','scoop'],order:['arrive','work','visit'],found:['arrive','work','visit'],clues:['arrive','work','visit']};
let raw=null;
globalThis.localStorage={getItem:()=>raw,setItem:(_,value)=>{raw=value;}};

test('stops unlock sequentially and cannot skip Surveyor',()=>{
 const f=p.freshFriends(); assert.equal(p.isFriendUnlocked('rover',false,f),false);assert.equal(p.isFriendUnlocked('rover',true,f),true);assert.equal(p.isFriendUnlocked('mirror',true,f),false);
 f.levels.footprint.step=5;assert.equal(p.starCount(true,f),1);
 f.levels.rover.step=5;assert.equal(p.isFriendUnlocked('mirror',true,f),true);assert.equal(p.isFriendUnlocked('flag',true,f),false);assert.equal(p.starCount(true,f),2);
});
test('all five stars are required to retain finale progress',()=>{
 const f=p.freshFriends();for(const id of p.orderedFriends)f.levels[id].step=5;
 f.finale={seen:true,choice:'mirror'};assert.equal(p.starCount(true,f),5);assert.deepEqual(p.readFriends(f,true).finale,f.finale);
 f.levels.flag.step=3;const read=p.readFriends(f,true);assert.equal(read.levels.footprint.step,0);assert.equal(read.finale.seen,false);
});
test('rover route rejects rocks, diagonal moves, repeats, and row wrapping',()=>{
 assert.equal(p.canStep([15],10),true);assert.equal(p.canStep([15],11),false);assert.equal(p.canStep([9],10),false);assert.equal(p.canStep([15,10],15),false);assert.equal(p.canStep([15],-1),false);
 const route=[15];for(const cell of [10,5,0]) {assert.equal(p.canStep(route,cell),true);route.push(cell);}
 // Alternate valid route reaches the flag without crossing the rock barrier.
 const valid=[15,16,17,12,7,2,3,4];for(let i=1;i<valid.length;i++)assert.equal(p.canStep(valid.slice(0,i),valid[i]),true);assert.equal(valid.at(-1),p.routeEnd);
});
test('ordering and jigsaw require every piece in the right place',()=>{
 assert.equal(p.isCompleteOrder([0,1,2]),true);assert.equal(p.isCompleteOrder([0,0,2]),false);assert.equal(p.isCompleteOrder([0,1]),false);
 assert.equal(p.isCompletePuzzle([0,1,2,3,4,5]),true);assert.equal(p.isCompletePuzzle([0,1,2,3,5,4]),false);
});
test('v3 saves migrate without losing Surveyor or unlocking later friends',()=>{
 raw=JSON.stringify({version:3,milestone:'complete',activeLevel:'surveyor',surveyor});const result=storage.readProgress();assert.equal(result.progress.surveyor.phase,'complete');assert.equal(result.progress.activeLevel,'surveyor');assert.equal(result.progress.friends.levels.rover.step,0);
});
test('v4 saves retain a partial puzzle and the chosen keepsake',()=>{
 const f=p.freshFriends();f.levels.rover.step=5;f.levels.mirror.step=5;f.levels.flag={step:2,answers:[0,-1,2,-1,-1,5],keepsake:null};
 assert.equal(storage.saveProgress('moon-free','complete',true,'flag',surveyor,f),true);
 const read=storage.readProgress();assert.equal(read.progress.activeLevel,'flag');assert.deepEqual(read.progress.friends.levels.flag.answers,[0,-1,2,-1,-1,5]);
 f.levels.flag={step:5,answers:[],keepsake:2};storage.saveProgress('moon-free','complete',true,'flag',surveyor,f);assert.equal(storage.readProgress().progress.friends.levels.flag.keepsake,2);
});
test('locked active levels and malformed saves fall back safely',()=>{
 raw=JSON.stringify({version:4,milestone:'complete',activeLevel:'footprint',surveyor,friends:p.freshFriends()});assert.equal(storage.readProgress().progress.activeLevel,null);
 raw='{';assert.equal(storage.readProgress().progress.started,false);
 const malformed=p.freshFriends();malformed.levels.rover={step:2,answers:['x',NaN,-100,5],keepsake:900};assert.deepEqual(p.readFriends(malformed,true).levels.rover.answers,[]);
});
test('new journeys start with independent, empty progress',()=>{
 const first=p.freshFriends();first.levels.rover.step=5;assert.equal(p.freshFriends().levels.rover.step,0);
 storage.saveProgress('earth','bench',false,null,{phase:'arrival',turn:0,matched:[],order:[],clues:[],found:[]},p.freshFriends());const read=storage.readProgress();assert.equal(read.progress.friends.levels.rover.step,0);assert.equal(read.progress.activeLevel,null);
});

test('damaged routes and duplicate jigsaw pieces recover to playable states',()=>{
 const f=p.freshFriends();f.levels.rover={step:2,answers:[15,16,3,4],keepsake:null};assert.deepEqual(p.readFriends(f,true).levels.rover.answers,[15,16]);
 f.levels.rover.step=5;f.levels.mirror.step=5;f.levels.flag={step:2,answers:[0,0,2,99,null,5],keepsake:null};assert.deepEqual(p.readFriends(f,true).levels.flag.answers,[0,-1,2,-1,-1,5]);
});
