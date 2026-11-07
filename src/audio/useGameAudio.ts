import { useEffect, useRef, useState } from 'react';
import { gameAudio, type AudioScene } from './game-audio';
interface Receipts { scope: string; stars: number; memories: number; lamps: number; digging: boolean }
export function useGameAudio(scene: AudioScene, receipts: Receipts) {
  const current=useRef(scene);current.current=scene;
  const previous=useRef(receipts);
  const [unavailable,setUnavailable]=useState(false);
  const background=useRef(false);
  useEffect(()=>{
    gameAudio.onUnavailable=()=>setUnavailable(true);
    const sync=()=>gameAudio.update({...current.current,paused:current.current.paused||background.current||document.hidden});
    const wake=(e:Event)=>{if(e.isTrusted)void gameAudio.unlock();};
    const click=(e:MouseEvent)=>{const button=(e.target as Element)?.closest?.('button');if(button&&!button.disabled&&!button.closest('[inert]'))gameAudio.cue('touch');};
    const blur=()=>{background.current=true;sync();};
    const focus=()=>{background.current=false;sync();};
    const visibility=()=>{background.current=document.hidden;sync();};
    document.addEventListener('pointerdown',wake,true);document.addEventListener('keydown',wake,true);document.addEventListener('click',click);
    window.addEventListener('blur',blur);window.addEventListener('focus',focus);document.addEventListener('visibilitychange',visibility);sync();
    return()=>{document.removeEventListener('pointerdown',wake,true);document.removeEventListener('keydown',wake,true);document.removeEventListener('click',click);window.removeEventListener('blur',blur);window.removeEventListener('focus',focus);document.removeEventListener('visibilitychange',visibility);gameAudio.dispose();};
  },[]);
  useEffect(()=>{gameAudio.update({...scene,paused:scene.paused||background.current||document.hidden});},[scene.enabled,scene.paused,scene.mood,scene.duck,scene.stars]);
  useEffect(()=>{
    const old=previous.current;previous.current=receipts;
    if(old.scope!==receipts.scope)return;
    if(receipts.stars>old.stars)gameAudio.cue('lamp',2);
    else if(receipts.lamps>old.lamps)gameAudio.cue('lamp',receipts.lamps-1);
    else if(receipts.memories>old.memories)gameAudio.cue('success');
    else if(receipts.digging&&!old.digging)gameAudio.cue('dig');
  },[receipts.scope,receipts.stars,receipts.memories,receipts.lamps,receipts.digging]);
  return unavailable;
}
