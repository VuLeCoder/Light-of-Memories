import type { Language } from '../content/i18n';

/** A story cue on the walkable ground; movement remains on the canvas below. */
export function EndingTrail({ language }: { language: Language }) {
  return <div className="ending-trail" role="img" aria-label={language === 'vi'
    ? 'Một vệt sáng bí ẩn ở cuối đường' : 'A mysterious glow at the end of the path'}>
    <span /><span /><span />
  </div>;
}
