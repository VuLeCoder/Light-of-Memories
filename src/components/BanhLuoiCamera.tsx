import { useState } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy } from '../content/levels/ban-banh-luoi-content';
import { banBanhLuoiCamera as model } from '../content/levels/ban-banh-luoi-models';
import { analyseCamera, cameraSpots, readCameraAngle } from '../content/levels/ban-banh-luoi-camera';
import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { BanhLuoiCameraDiagram } from './BanhLuoiCameraDiagram';
export function BanhLuoiCamera({language,progress,onChange,onHint,hintRequest=0}: {language: Language; progress: BanhLuoiProgress; onChange: (p:BanhLuoiProgress)=>void; onHint:()=>void; hintRequest?:number}) {
  const [feedback,setFeedback] = useState<ReturnType<typeof analyseCamera> | null>(null);
  const [noticeRequest,setNoticeRequest] = useState(0);
  const {cameraSpot:spot,cameraAngle:angle} = progress;
  const changeAngle = (next:number) => { setFeedback(null); onChange({...progress,cameraAngle:readCameraAngle(next)}); };
  return <section className="ban-panel ban-camera-panel" aria-labelledby="ban-camera-title">
    <h2 id="ban-camera-title">{copy['objective.camera'][language]}</h2><p className="ban-camera-rule">{copy['camera.rule'][language]}</p>
    <div className="ban-camera-layout">
      <BanhLuoiCameraDiagram language={language} spot={spot} angle={angle} preview/>
      <div className="ban-camera-controls">
        <div className="ban-route-actions" role="group" aria-label={language==='vi' ? 'Chỗ đỗ' : 'Parking spot'}>{cameraSpots.map(s=><button key={s} data-spot={s} aria-label={copy['camera.parking'][language].replace('{spot}',s)} aria-pressed={spot===s} onClick={()=>{setFeedback(null);onChange({...progress,cameraSpot:s});}}>{language==='vi' ? `Đỗ ${s}` : `Spot ${s}`}</button>)}</div>
        <div className="ban-camera-angle-control">
          <label htmlFor="ban-camera-angle">{copy['camera.angle'][language].replace('{angle}',String(angle))}</label>
          <div className="ban-camera-angle-row">
            <button aria-label={copy['button.decreaseAngle'][language]} disabled={angle===model.minAngle} onClick={()=>changeAngle(angle-1)}>−</button>
            <input id="ban-camera-angle" type="range" min={model.minAngle} max={model.maxAngle} step={model.angleStep} value={angle} onChange={e=>changeAngle(Number(e.target.value))}/>
            <button aria-label={copy['button.increaseAngle'][language]} disabled={angle===model.maxAngle} onClick={()=>changeAngle(angle+1)}>+</button>
          </div>
        </div>
        <button className="journey-primary" data-banh-primary onClick={()=>{setNoticeRequest(value=>value+1);const result=analyseCamera(spot,angle); if(result==='correct')onChange({...progress,phase:'launch',turn:0});else setFeedback(result);}}>{copy['button.cameraSubmit'][language]}</button>
        <small>{copy['camera.model'][language]}</small>
      </div>
    </div>
    {(feedback || progress.cameraHint>0) && <CameraNotices key={JSON.stringify([feedback,progress.cameraHint,hintRequest,noticeRequest])} language={language}
      feedback={feedback} hint={progress.cameraHint} onHint={onHint}/>}
  </section>;
}

function CameraNotices({language,feedback,hint,onHint}: {language:Language; feedback:ReturnType<typeof analyseCamera>|null; hint:number; onHint:()=>void}) {
  const [open,setOpen] = useState(true);
  const [index,setIndex] = useState(0);
  const notices = [
    ...(feedback ? [copy[`camera.${feedback}`][language]] : []),
    ...(hint ? [copy[hint===2 ? 'camera.hint2' : 'camera.hint1'][language],copy['camera.model'][language]] : []),
  ];
  if (!open) return null;
  return <div className="ban-route-notices is-open">
    <div className="ban-route-feedback" role="status"><p>{notices[index]}</p></div>
    <div className="ban-route-notice-actions">
      {notices.length>1 && <button onClick={()=>setIndex((index+1)%notices.length)}>{language==='vi' ? 'Tin tiếp' : 'Next'} · {index+1}/{notices.length} →</button>}
      {hint===1 && <button onClick={onHint}>{copy['button.hintMore'][language]}</button>}
      <button onClick={()=>setOpen(false)}>{language==='vi' ? 'Đã hiểu' : 'Got it'}</button>
    </div>
  </div>;
}
