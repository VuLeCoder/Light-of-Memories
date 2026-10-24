import { useCallback } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy, banBanhLuoiDialogue } from '../content/levels/ban-banh-luoi-content';
import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { EarthDialogue } from './EarthDialogue';
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
  const talking = phase === 'route' || phase === 'meeting' || phase === 'routeIntro';
  const onTurn = useCallback((turn: number) => {
    if (turn !== progress.turn) onChange({ ...progress, turn });
  }, [progress, onChange]);
  const routeStage = ['routeIntro', 'routePuzzle', 'cameraIntro'].includes(phase);
  const hint = () => {
    if (routeStage) onChange({ ...progress, routeHint: Math.min(2, progress.routeHint + 1) as 1 | 2 });
    onHint();
  };
  return <section className="banh-luoi-scene" hidden={paused} aria-label={copy['identity.name'][language]}>
    <div className="banh-luoi-hud">
      <span>{copy[`objective.${phase}`][language]}</span>
      <div>{['wheels', 'photoA', 'routeIntro', 'routePuzzle', 'cameraIntro'].includes(phase) && <button onClick={hint}>{copy['button.hint'][language]}</button>} <button onClick={onBack}>{copy['button.back'][language]}</button></div>
    </div>
    {talking && <EarthDialogue key={phase} language={language} paused={paused} title={copy['identity.name'][language]}
      lines={banBanhLuoiDialogue(language, phase)} initialIndex={progress.turn} onTurn={onTurn} finalAction="moon"
      finalLabel={phase === 'route' ? copy['identity.invitation'][language] : phase === 'routeIntro' ? (language === 'vi' ? 'Cùng vẽ đường đi' : 'Plan the route') : language === 'vi' ? 'Cùng tìm hiểu bánh xe' : 'Discover the wheels'}
      onComplete={() => onChange({ ...progress, phase: phase === 'route' ? 'approach' : phase === 'routeIntro' ? 'routePuzzle' : 'wheels', turn: 0 })} />}
    {phase === 'wheels' && <BanhLuoiWheels language={language} selected={progress.wheelChoice} onSelect={wheelChoice => onChange({ ...progress, wheelChoice })} onSuccess={() => onChange({ ...progress, phase: 'photoA', turn: 0 })}/>}
    {phase === 'photoA' && <BanhLuoiPhoto photo={banBanhLuoiMemories[0]} language={language} onKeep={() => onChange({ ...progress, phase: 'routeIntro', turn: 0, keepsakes: ['vip'] })}/>}
    {phase === 'routePuzzle' && <BanhLuoiRoute language={language} progress={progress} onChange={onChange} onHint={hint}/>}
    {phase === 'cameraIntro' && <section className="banh-luoi-checkpoint" aria-labelledby="banh-luoi-checkpoint-title">
      <h3 id="banh-luoi-checkpoint-title">{language === 'vi' ? 'Hẹn chuyến khám phá tiếp theo!' : 'Until our next adventure!'}</h3>
      <p>{language === 'vi' ? 'Ghé đủ hai trạm rồi về nhà! Xe đủ pin, và mọi chặng đều có đường đi bộ trong giới hạn. Bài chọn chỗ đỗ sẽ mở trong phần tiếp theo; đường đi của bạn đã được lưu.' : 'Both stops visited and safely home! The rover has enough battery, and every step stays within walking range. The parking puzzle is coming next; your route is saved.'}</p>
      <button onClick={onBack}>{copy['button.back'][language]}</button>
    </section>}
  </section>;
}
