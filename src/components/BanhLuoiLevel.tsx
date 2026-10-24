import { useCallback } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy, banBanhLuoiDialogue } from '../content/levels/ban-banh-luoi-content';
import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { EarthDialogue } from './EarthDialogue';
import { BanhLuoiCamera } from './BanhLuoiCamera';
import { BanhLuoiLaunch } from './BanhLuoiLaunch';
import { BanhLuoiRoute } from './BanhLuoiRoute';
import { BanhLuoiWheels } from './BanhLuoiWheels';
import { BanhLuoiPhoto } from './BanhLuoiPhoto';
import { banBanhLuoiMemories } from '../content/levels/ban-banh-luoi-memories';
import './banh-luoi.css';

export function BanhLuoiLevel({ language, progress, onChange, onBack, onHint, paused }: {
  language: Language; progress: BanhLuoiProgress; onChange: (p: BanhLuoiProgress) => void;
  onBack: () => void; onHint: () => void; paused: boolean;
}) {
  const { phase } = progress;
  const talking = phase === 'route' || phase === 'meeting' || phase === 'routeIntro' || phase === 'cameraIntro';
  const onTurn = useCallback((turn: number) => {
    if (turn !== progress.turn) onChange({ ...progress, turn });
  }, [progress, onChange]);
  const routeStage = ['routeIntro', 'routePuzzle'].includes(phase);
  const hint = () => {
    if (routeStage) onChange({ ...progress, routeHint: Math.min(2, progress.routeHint + 1) as 1 | 2 });
    if (['cameraIntro','camera','launch','photoB','memoriesIntro'].includes(phase)) onChange({ ...progress, cameraHint: Math.min(2, progress.cameraHint + 1) as 1 | 2 });
    onHint();
  };
  return <section className="banh-luoi-scene" hidden={paused} aria-label={copy['identity.name'][language]}>
    <div className="banh-luoi-hud">
      <span>{copy[`objective.${phase}`][language]}</span>
      <div>{['wheels', 'photoA', 'routeIntro', 'routePuzzle', 'cameraIntro', 'camera', 'launch', 'photoB', 'memoriesIntro'].includes(phase) && <button onClick={hint}>{copy['button.hint'][language]}</button>} <button onClick={onBack}>{copy['button.back'][language]}</button></div>
    </div>
    {talking && <EarthDialogue key={phase} language={language} paused={paused} title={copy['identity.name'][language]}
      lines={banBanhLuoiDialogue(language, phase)} initialIndex={progress.turn} onTurn={onTurn} finalAction="moon"
      finalLabel={phase === 'route' ? copy['identity.invitation'][language] : phase === 'cameraIntro' ? (language === 'vi' ? 'Cùng tìm góc nhìn' : 'Find the view') : phase === 'routeIntro' ? (language === 'vi' ? 'Cùng vẽ đường đi' : 'Plan the route') : language === 'vi' ? 'Cùng tìm hiểu bánh xe' : 'Discover the wheels'}
      onComplete={() => onChange({ ...progress, phase: phase === 'route' ? 'approach' : phase === 'routeIntro' ? 'routePuzzle' : phase === 'cameraIntro' ? 'camera' : 'wheels', turn: 0 })} />}
    {phase === 'wheels' && <BanhLuoiWheels language={language} selected={progress.wheelChoice} onSelect={wheelChoice => onChange({ ...progress, wheelChoice })} onSuccess={() => onChange({ ...progress, phase: 'photoA', turn: 0 })}/>}
    {phase === 'photoA' && <BanhLuoiPhoto photo={banBanhLuoiMemories[0]} language={language} onKeep={() => onChange({ ...progress, phase: 'routeIntro', turn: 0, keepsakes: ['vip'] })}/>}
    {phase === 'routePuzzle' && <BanhLuoiRoute language={language} progress={progress} onChange={onChange} onHint={hint}/>}
    {phase === 'camera' && <BanhLuoiCamera language={language} progress={progress} onChange={onChange} onHint={hint}/>}
    {phase === 'launch' && <BanhLuoiLaunch language={language} paused={paused} onNext={() => onChange({ ...progress, phase: 'photoB', turn: 0 })}/>}
    {phase === 'photoB' && (progress.turn === 0 ? <EarthDialogue language={language} paused={paused} title={copy['identity.name'][language]} lines={banBanhLuoiDialogue(language,'photoBIntro')} onTurn={() => {}} finalAction="moon" finalLabel={language==='vi' ? 'Xem bức ảnh' : 'See the photo'} onComplete={() => onChange({...progress,turn:1})}/> : <BanhLuoiPhoto photo={banBanhLuoiMemories[1]} language={language} onKeep={() => onChange({...progress,phase:'memoriesIntro',turn:0,keepsakes:['vip','orbit']})}/>)}
    {phase === 'memoriesIntro' && <section className="banh-luoi-checkpoint" aria-labelledby="banh-luoi-checkpoint-title">
      <h3 id="banh-luoi-checkpoint-title">{language === 'vi' ? 'Hai bức ảnh đã ở trong sách' : 'Two photos are in the book'}</h3>
      <p>{language === 'vi' ? 'Một bức ảnh ở nơi đỗ cuối năm 1972, một bức ảnh từ quỹ đạo năm 2011. Cuội đã cất cả hai để giữ câu chuyện của Bánh Lưới.' : 'One photo at the final parking spot in 1972, another from orbit in 2011. Cuội has kept both to remember Mesh Wheels’ story.'}</p>
      <button data-banh-primary onClick={onBack}>{copy['button.back'][language]}</button>
    </section>}
  </section>;
}
