import { useState, type CSSProperties } from 'react';
import type { Language } from '../content/i18n';
import { impactAlt, impactPhoto, impactTarget } from '../content/levels/gac-troi-impact';

/** Overlay shares the image's 16:9 rectangle, including inside a contained frame. */
export function GacImpactPhoto({ when, language, annotation, region, onReady }: {
  when: 'before' | 'after'; language: Language; annotation?: 'hint' | 'answer'; region?: number | null;
  onReady?: (ready: boolean) => void;
}) {
  const [failed, setFailed] = useState(false);
  return <div className="gac-impact-photo">
    {!failed ? <img src={impactPhoto(when)} alt={impactAlt[annotation ?? when][language]} draggable={false}
      onLoad={() => onReady?.(true)} onError={() => { setFailed(true); onReady?.(false); }}/>
      : <span className="gac-impact-error" role="status">{language === 'vi' ? 'Ảnh chưa tải được. Hãy thử tải lại.' : 'The picture could not load. Please reload to try again.'}</span>}
    {!failed && annotation === 'answer' && <span className="gac-impact-answer" aria-hidden="true" style={{ left: `${impactTarget.x * 100}%`, top: `${impactTarget.y * 100}%`, width: `${impactTarget.rx * 200}%`, height: `${impactTarget.ry * 200}%` }}/>}
    {!failed && annotation === 'hint' && <span className="gac-impact-hint" aria-hidden="true"/>}
    {!failed && region != null && <span className="gac-impact-region" aria-hidden="true" style={{ '--region': region } as CSSProperties}/>}
  </div>;
}
