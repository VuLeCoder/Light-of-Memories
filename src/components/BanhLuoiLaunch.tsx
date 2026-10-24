import { useEffect, useState } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCamera as model } from '../content/levels/ban-banh-luoi-models';
import { banBanhLuoiCopy as copy } from '../content/levels/ban-banh-luoi-content';

export function BanhLuoiLaunch({language,paused,onNext}: {language:Language;paused:boolean;onNext:()=>void}) {
  const [reduced,setReduced] = useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [elapsed,setElapsed] = useState(0);
  useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)'); const change=()=>setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
  const duration=model.previewDurationSeconds*1000;
  useEffect(()=>{
    if(paused || reduced || elapsed>=duration) return;
    let frame=0,previous:number | null=null;
    const tick=(time:number)=>{ if(previous!==null){const delta=Math.min(time-previous,100);setElapsed(n=>Math.min(duration,n+delta));}previous=time;frame=requestAnimationFrame(tick); };
    frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
  },[paused,reduced,elapsed>=duration,duration]);
  const fraction=reduced?1:Math.min(1,elapsed/duration), stage=model.ascentStageStart;
  const y=stage.bottom+(model.required.top-stage.top)*fraction;
  return <section className="ban-panel ban-launch-panel" aria-labelledby="ban-launch-title">
    <h2 id="ban-launch-title">{copy['objective.launch'][language]}</h2>
    <svg viewBox="480 0 240 310" role="img" aria-label={language==='vi' ? 'Tầng bay lên rời tầng dưới Challenger; xe và tầng dưới ở lại Mặt Trăng.' : 'Challenger’s ascent stage leaves its descent stage; the rover and descent stage stay on the Moon.'}>
      <rect x="480" width="240" height="310" fill="#10212a"/>
      <g transform="translate(0 285) scale(1 -1)">
        <path d="M480 0H720" stroke="#8c9f9b" strokeWidth="3"/>
        <rect x={model.descentStage.left} y={model.descentStage.bottom} width={model.descentStage.right-model.descentStage.left} height={model.descentStage.top-model.descentStage.bottom} fill="#a99570"/>
        <rect x={stage.left} y={y} width={stage.right-stage.left} height={stage.top-stage.bottom} fill="#dfc18a"/>
        <rect x={stage.left} y={stage.bottom} width={stage.right-stage.left} height={model.required.top-stage.bottom} fill="none" stroke="#eee5d1" strokeDasharray="5 5"/>
      </g>
    </svg>
    <p>{language==='vi' ? 'Tầng bay lên đưa các nhà du hành rời Mặt Trăng. Tầng dưới và chiếc xe ở lại; camera trên xe được điều khiển từ Trái Đất.' : 'The ascent stage carries the astronauts away from the Moon. The descent stage and rover stay behind; people on Earth control the rover’s camera.'}</p>
    <p role="status">{fraction===1 ? (language==='vi' ? 'Challenger đã bay lên. Những dấu vết vẫn ở lại.' : 'Challenger has lifted off. The tracks remain.') : (language==='vi' ? 'Challenger đang bay lên…' : 'Challenger is lifting off…')}</p>
    <button className="ban-primary" data-banh-primary disabled={fraction<1 || paused} onClick={onNext}>{copy['button.next'][language]} →</button>
  </section>;
}
