import { useCallback, useState } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy, banBanhLuoiDialogue } from '../content/levels/ban-banh-luoi-content';
import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { BanhLuoiEnding } from './BanhLuoiEnding';
import { EarthDialogue } from './EarthDialogue';
import { BanhLuoiCamera } from './BanhLuoiCamera';
import { BanhLuoiLaunch } from './BanhLuoiLaunch';
import { BanhLuoiRoute } from './BanhLuoiRoute';
import { BanhLuoiWheels } from './BanhLuoiWheels';
import { BanhLuoiPhoto } from './BanhLuoiPhoto';
import { banBanhLuoiMemories } from '../content/levels/ban-banh-luoi-memories';
import './banh-luoi.css';

export function BanhLuoiLevel({ language, progress, onChange, onBack, onHint, paused, stars, onPreview, preview }: {
  language: Language; progress: BanhLuoiProgress; onChange: (p: BanhLuoiProgress) => void;
  stars: number; preview: boolean; onPreview: (value: boolean) => void; onBack: () => void; onHint: () => void; paused: boolean;
}) {
  const [previewProgress, setPreviewProgress] = useState(progress);
  const displayed = preview ? previewProgress : progress;
  const { phase } = displayed;
  const ending = ['recallA', 'recallB', 'farewell', 'gift', 'finished'].includes(phase);
  const togglePreview = (value: boolean) => {
    if (value) setPreviewProgress({ ...progress, phase: 'recallA', turn: 0 });
    onPreview(value);
  };
  const talking = phase === 'route' || phase === 'meeting' || phase === 'routeIntro' || phase === 'cameraIntro' || phase === 'memoriesIntro';
  const onTurn = useCallback((turn: number) => {
    if (turn !== progress.turn) onChange({ ...progress, turn });
  }, [progress, onChange]);
  const routeStage = ['routeIntro', 'routePuzzle'].includes(phase);
  const hint = () => {
    if (routeStage) onChange({ ...progress, routeHint: Math.min(2, progress.routeHint + 1) as 1 | 2 });
    if (['cameraIntro','camera','launch','photoB','memoriesIntro'].includes(phase)) onChange({ ...progress, cameraHint: Math.min(2, progress.cameraHint + 1) as 1 | 2 });
    onHint();
  };
  return <section className={`banh-luoi-scene${ending ? ' ban-ending' : ''}`} hidden={paused} aria-label={copy['identity.name'][language]}>
    <div className="banh-luoi-hud">
      <span>{copy[`objective.${phase}`][language]}</span>{ending && <strong role="status">★ {stars}/5</strong>}
      <div>{['wheels', 'photoA', 'routeIntro', 'routePuzzle', 'cameraIntro', 'camera', 'launch', 'photoB', 'memoriesIntro'].includes(phase) && <button onClick={hint}>{copy['button.hint'][language]}</button>} <button onClick={preview ? () => togglePreview(false) : onBack}>{preview ? copy['button.toGame'][language] : copy['button.back'][language]}</button></div>
    </div>
    {talking && <EarthDialogue key={phase} language={language} paused={paused} title={copy['identity.name'][language]}
      lines={banBanhLuoiDialogue(language, phase)} initialIndex={progress.turn} onTurn={onTurn} finalAction="moon"
      finalLabel={phase === 'memoriesIntro' ? (language === 'vi' ? 'Đọc hai bức ảnh' : 'Read the two photos') : phase === 'route' ? copy['identity.invitation'][language] : phase === 'cameraIntro' ? (language === 'vi' ? 'Cùng tìm góc nhìn' : 'Find the view') : phase === 'routeIntro' ? (language === 'vi' ? 'Cùng vẽ đường đi' : 'Plan the route') : language === 'vi' ? 'Cùng tìm hiểu bánh xe' : 'Discover the wheels'}
      onComplete={() => onChange({ ...progress, phase: phase === 'memoriesIntro' ? 'recallA' : phase === 'route' ? 'approach' : phase === 'routeIntro' ? 'routePuzzle' : phase === 'cameraIntro' ? 'camera' : 'wheels', turn: 0 })} />}
    {phase === 'wheels' && <BanhLuoiWheels language={language} selected={progress.wheelChoice} onSelect={wheelChoice => onChange({ ...progress, wheelChoice })} onSuccess={() => onChange({ ...progress, phase: 'photoA', turn: 0 })}/>}
    {phase === 'photoA' && <BanhLuoiPhoto photo={banBanhLuoiMemories[0]} language={language} onKeep={() => onChange({ ...progress, phase: 'routeIntro', turn: 0, keepsakes: progress.keepsakes.includes('orbit') ? ['vip', 'orbit'] : ['vip'] })}/>}
    {phase === 'routePuzzle' && <BanhLuoiRoute language={language} progress={progress} onChange={onChange} onHint={hint}/>}
    {phase === 'camera' && <BanhLuoiCamera language={language} progress={progress} onChange={onChange} onHint={hint}/>}
    {phase === 'launch' && <BanhLuoiLaunch language={language} paused={paused} onNext={() => onChange({ ...progress, phase: 'photoB', turn: 0 })}/>}
    {phase === 'photoB' && (progress.turn === 0 ? <EarthDialogue language={language} paused={paused} title={copy['identity.name'][language]} lines={banBanhLuoiDialogue(language,'photoBIntro')} onTurn={() => {}} finalAction="moon" finalLabel={language==='vi' ? 'Xem bức ảnh' : 'See the photo'} onComplete={() => onChange({...progress,turn:1})}/> : <BanhLuoiPhoto photo={banBanhLuoiMemories[1]} language={language} onKeep={() => onChange({...progress,phase:'memoriesIntro',turn:0,keepsakes:['vip','orbit']})}/>)}
    {ending && <BanhLuoiEnding language={language} progress={displayed} onChange={preview ? setPreviewProgress : onChange} onBack={onBack} paused={paused} stars={stars} preview={preview} onPreview={togglePreview}/>}

  </section>;
}
