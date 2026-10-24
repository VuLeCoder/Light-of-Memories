import { useState } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy } from '../content/levels/ban-banh-luoi-content';
import { banBanhLuoiCamera as model } from '../content/levels/ban-banh-luoi-models';
import { analyseCamera, cameraSpots, readCameraAngle } from '../content/levels/ban-banh-luoi-camera';
import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { BanhLuoiCameraDiagram } from './BanhLuoiCameraDiagram';
export function BanhLuoiCamera({language,progress,onChange,onHint}: {language: Language; progress: BanhLuoiProgress; onChange: (p:BanhLuoiProgress)=>void; onHint:()=>void}) {
  const [feedback,setFeedback] = useState<ReturnType<typeof analyseCamera> | null>(null);
  const {cameraSpot:spot,cameraAngle:angle} = progress;
  const changeAngle = (next:number) => { setFeedback(null); onChange({...progress,cameraAngle:readCameraAngle(next)}); };
  return <section className="ban-panel ban-camera-panel" aria-labelledby="ban-camera-title">
    <h2 id="ban-camera-title">{copy['objective.camera'][language]}</h2><p>{copy['camera.rule'][language]}</p>
    <div className="ban-camera-layout">
      <BanhLuoiCameraDiagram language={language} spot={spot} angle={angle} preview/>
      <div className="ban-camera-controls">
        <div className="ban-route-actions" role="group" aria-label={language==='vi' ? 'Chỗ đỗ' : 'Parking spot'}>{cameraSpots.map(s=><button key={s} data-spot={s} aria-pressed={spot===s} onClick={()=>{setFeedback(null);onChange({...progress,cameraSpot:s});}}>{copy['camera.parking'][language].replace('{spot}',s)}</button>)}</div>
        <label htmlFor="ban-camera-angle">{copy['camera.angle'][language].replace('{angle}',String(angle))}</label>
        <input id="ban-camera-angle" type="range" min={model.minAngle} max={model.maxAngle} step={model.angleStep} value={angle} onChange={e=>changeAngle(Number(e.target.value))}/>
        <div className="ban-route-actions"><button aria-label={copy['button.decreaseAngle'][language]} disabled={angle===model.minAngle} onClick={()=>changeAngle(angle-1)}>−</button><button aria-label={copy['button.increaseAngle'][language]} disabled={angle===model.maxAngle} onClick={()=>changeAngle(angle+1)}>+</button></div>
        <p role="status" className="ban-feedback">{feedback ? copy[`camera.${feedback}`][language] : !spot ? copy['camera.none'][language] : language==='vi' ? 'Quan sát sơ đồ và khung camera rồi thử góc nhìn nhé.' : 'Look at the diagram and camera frame, then try your view.'}</p>
        {progress.cameraHint>0 && <div className="ban-route-hints"><p>{copy[progress.cameraHint === 2 ? 'camera.hint2' : 'camera.hint1'][language]}</p>{progress.cameraHint===1 && <button onClick={onHint}>{copy['button.hintMore'][language]}</button>}</div>}
        <button className="journey-primary" data-banh-primary onClick={()=>{const result=analyseCamera(spot,angle); if(result==='correct')onChange({...progress,phase:'launch',turn:0});else setFeedback(result);}}>{copy['button.cameraSubmit'][language]}</button>
        <small>{copy['camera.model'][language]}</small>
      </div>
    </div>
  </section>;
}
