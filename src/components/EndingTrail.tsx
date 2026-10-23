import type { Language } from '../content/i18n';

/** A story cue on the walkable ground; movement remains on the canvas below. */
export function EndingTrail({ language, ripple = false }: { language: Language; ripple?: boolean }) {
  const vi = language === 'vi';
  return <div className={`ending-trail${ripple ? ' ending-trail-ripple' : ''}`} role="img" aria-label={ripple
    ? (vi ? 'Những vòng gợn kỳ diệu trên mặt đất phía xa' : 'Mysterious ripples on the distant ground')
    : (vi ? 'Một vệt sáng bí ẩn ở cuối đường' : 'A mysterious glow at the end of the path')}>
    <span /><span /><span />
  </div>;
}
