import { useCallback } from 'react';
import type { Language } from '../content/i18n';
import { banBanhLuoiCopy as copy, banBanhLuoiDialogue } from '../content/levels/ban-banh-luoi-content';
import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { EarthDialogue } from './EarthDialogue';
import './banh-luoi.css';

export function BanhLuoiLevel({ language, progress, onChange, onBack, paused }: {
  language: Language; progress: BanhLuoiProgress; onChange: (p: BanhLuoiProgress) => void;
  onBack: () => void; paused: boolean;
}) {
  const { phase } = progress;
  const talking = phase === 'route' || phase === 'meeting';
  const onTurn = useCallback((turn: number) => {
    if (turn !== progress.turn) onChange({ ...progress, turn });
  }, [progress, onChange]);
  return <section className="banh-luoi-scene" hidden={paused} aria-label={copy['identity.name'][language]}>
    <div className="banh-luoi-hud">
      <span>{copy[`objective.${phase}`][language]}</span>
      <button onClick={onBack}>{copy['button.back'][language]}</button>
    </div>
    {talking && <EarthDialogue key={phase} language={language} paused={paused} title={copy['identity.name'][language]}
      lines={banBanhLuoiDialogue(language, phase)} initialIndex={progress.turn} onTurn={onTurn} finalAction="moon"
      finalLabel={phase === 'route' ? copy['identity.invitation'][language] : language === 'vi' ? 'Cùng tìm hiểu bánh xe' : 'Discover the wheels'}
      onComplete={() => onChange({ ...progress, phase: phase === 'route' ? 'approach' : 'wheels', turn: 0 })} />}
    {phase === 'wheels' && <section className="banh-luoi-checkpoint" aria-labelledby="banh-luoi-checkpoint-title">
      <h3 id="banh-luoi-checkpoint-title">{language === 'vi' ? 'Hẹn chuyến khám phá tiếp theo!' : 'Until our next adventure!'}</h3>
      <p>{language === 'vi' ? 'Bạn đã gặp Bánh Lưới. Phần thử thách về bánh xe đang được xây dựng; cuộc trò chuyện của bạn đã được lưu.' : 'You have met Mesh Wheels. The wheel challenge is being built; your conversation has been saved.'}</p>
      <button onClick={onBack}>{copy['button.back'][language]}</button>
    </section>}
  </section>;
}
