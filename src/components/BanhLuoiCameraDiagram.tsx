import { useId } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCamera as m } from '../content/levels/ban-banh-luoi-models';
import { angularBounds, cameraSpots, sightBlocked, type CameraSpot } from '../content/levels/ban-banh-luoi-camera';
import { banBanhLuoiCopy as copy } from '../content/levels/ban-banh-luoi-content';

/** All rectangles, rays and the preview use the same coordinates as validation. */
export function BanhLuoiCameraDiagram({language, spot = null, angle = m.initialAngle, preview = false}: {language: Language; spot?: CameraSpot | null; angle?: number; preview?: boolean}) {
  const id = useId();
  const origin = spot ? m.positions[spot] : null;
  const ray = (a: number) => `${origin![0]+900*Math.cos(a*Math.PI/180)},${origin![1]+900*Math.sin(a*Math.PI/180)}`;
  const bounds = origin ? angularBounds(origin,m.required) : null;
  const projectedY = (a: number) => 100-(a-(angle-m.fovDegrees/2))/m.fovDegrees*100;
  const blocked = origin ? sightBlocked(origin,m.required,m.rock) : false;
  const rockBounds = origin ? angularBounds(origin,m.rock) : null;
  return <div className="ban-camera-diagram">
    <svg viewBox="0 0 760 345" role="img" aria-label={language === 'vi' ? `Sơ đồ: đá giữa A và Challenger, B gần tàu hơn C.${spot ? ` Camera ở ${spot}, góc ${angle} độ.` : ''} Vùng viền chấm là vùng cần nhìn.` : `Diagram: rock between A and Challenger; B is closer than C.${spot ? ` Camera at ${spot}, angle ${angle} degrees.` : ''} The dotted region must be visible.`}>
      <defs><clipPath id={id}><rect width="760" height="300"/></clipPath></defs>
      <rect width="760" height="345" fill="#10212a"/>
      <g clipPath={`url(#${id})`} transform="translate(0 300) scale(1 -1)">
        {origin && <path d={`M${origin}L${ray(angle-m.fovDegrees/2)}L${ray(angle+m.fovDegrees/2)}Z`} fill="#dfc18a" fillOpacity=".18" stroke="#dfc18a" strokeWidth="2"/>}
        <rect x={m.rock.left} y={m.rock.bottom} width={m.rock.right-m.rock.left} height={m.rock.top-m.rock.bottom} fill="#6d7d80"/>
        <rect x={m.descentStage.left} y={m.descentStage.bottom} width={m.descentStage.right-m.descentStage.left} height={m.descentStage.top-m.descentStage.bottom} fill="#a99570"/>
        <rect x={m.required.left} y={m.required.bottom} width={m.required.right-m.required.left} height={m.required.top-m.required.bottom} fill="none" stroke="#eee5d1" strokeDasharray="6 5" strokeWidth="3"/>
        <rect x={m.ascentStageStart.left} y={m.ascentStageStart.bottom} width={m.ascentStageStart.right-m.ascentStageStart.left} height={m.ascentStageStart.top-m.ascentStageStart.bottom} fill="#dfc18a"/>
        {cameraSpots.map(s => <circle key={s} cx={m.positions[s][0]} cy={m.positions[s][1]} r={spot===s ? 10 : 7} fill={spot===s ? '#dfc18a' : '#bdcecb'} stroke="#eee5d1" strokeWidth="2"/>)}
      </g>
      <g fill="#eee5d1" fontSize="30" textAnchor="middle">{cameraSpots.map(s=><text key={s} x={m.positions[s][0]} y="331">{s}{spot===s ? ' ◆' : ''}</text>)}<text x="607" y="331">LM</text></g>
    </svg>
    {preview && <><span>{copy['camera.frame'][language]} · {m.fovDegrees}°</span><svg className="ban-camera-preview" viewBox="0 0 160 100" role="img" aria-label={language === 'vi' ? 'Khung nhìn: vùng viền chấm phải nằm trọn giữa mép trên và dưới, không bị đá che.' : 'Camera frame: the dotted region must fit between the top and bottom edges without a rock blocking it.'}>
      <rect width="160" height="100" fill="#10212a"/>
      {bounds && origin && <>
        <rect x="65" y={projectedY(bounds.high)} width="30" height={projectedY(bounds.low)-projectedY(bounds.high)} fill="none" stroke="#eee5d1" strokeDasharray="3 3"/>
        <rect x="65" y={projectedY(angularBounds(origin,m.ascentStageStart).high)} width="30" height={projectedY(angularBounds(origin,m.ascentStageStart).low)-projectedY(angularBounds(origin,m.ascentStageStart).high)} fill="#dfc18a"/>
        {blocked && rockBounds && <rect x="40" y={projectedY(rockBounds.high)} width="80" height={projectedY(rockBounds.low)-projectedY(rockBounds.high)} fill="#6d7d80"/>}
      </>}
    </svg></>}
  </div>;
}
