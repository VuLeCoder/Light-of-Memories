import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server=await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom',optimizeDeps:{noDiscovery:true,include:[]}});
const param=()=>({value:0,setValueAtTime(){},setTargetAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){},cancelScheduledValues(){},cancelAndHoldAtTime(){}});
const contexts=[];
class Context {
  constructor(){this.currentTime=0;this.state='suspended';this.destination={};this.voices=[];contexts.push(this);}
  createGain(){return {gain:param(),connect(){},disconnect(){}};}
  createDynamicsCompressor(){return {threshold:param(),knee:param(),ratio:param(),connect(){}};}
  createOscillator(){const node={frequency:param(),connect(){},disconnect(){},start(){this.started=true;},stop(){this.stopped=true;}};this.voices.push(node);return node;}
  async resume(){this.state='running';}
  async close(){this.state='closed';}
}
let engine;
try{
 globalThis.window={AudioContext:Context};
 const {GameAudio}=await server.ssrLoadModule('/src/audio/game-audio.ts');engine=new GameAudio();
 const active={enabled:true,paused:false,mood:'explore',duck:false,stars:1};
 engine.update(active);engine.cue('gift');assert.equal(contexts.length,0,'No context or sound before a gesture');
 await engine.unlock();assert.equal(contexts.length,1);const c=contexts[0];assert.ok(c.voices.length>0,'Music starts after resume');
 await engine.unlock();assert.equal(contexts.length,1,'One context across repeated gestures');
 engine.update({...active,enabled:false});assert.ok(c.voices.every(v=>v.stopped));let n=c.voices.length;engine.cue('rabbit');assert.equal(c.voices.length,n,'Muted effects stay silent');
 engine.update({...active,paused:true});engine.cue('gift');assert.equal(c.voices.length,n,'Paused effects stay silent');
 c.currentTime=2;engine.update({...active,mood:'rabbit'});engine.cue('rabbit');assert.ok(c.voices.length>n,'Effects resume');n=c.voices.length;
 engine.cue('rabbit');assert.equal(c.voices.length,n,'Duplicate sound is ignored');
 c.currentTime=3;engine.cue('touch');n=c.voices.length;engine.cue('success');assert.ok(c.voices.length>n,'A click cannot suppress the success cue');
 engine.dispose();assert.equal(c.state,'closed');
 globalThis.window={};let failed=false;engine=new GameAudio();engine.onUnavailable=()=>{failed=true;};await engine.unlock();assert.equal(failed,true,'Unsupported audio falls back without breaking gameplay');
 console.log('Audio: gesture gate, single context, mute/pause, replay-safe cues, priority and cleanup passed.');
}finally{engine?.dispose();delete globalThis.window;await server.close();}
