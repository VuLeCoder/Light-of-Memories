import type { Language } from '../content/i18n';

/** A story cue on the walkable ground; movement remains on the canvas below. */
export function EndingTrail({ language, ripple = false, tracks = false }: { language: Language; ripple?: boolean; tracks?: boolean }) {
  const vi = language === 'vi';
  if (tracks) return <div className="ending-trail ending-trail-tracks" role="img" aria-label={vi
    ? 'Hai vệt bánh xe song song trên bụi trăng, dẫn về phía bên phải'
    : 'Two parallel wheel tracks in the lunar dust, leading to the right'}>
    <svg viewBox="0 0 240 100" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" strokeLinecap="square">
        {[0, 23].map(offset => <g key={offset} transform={`translate(0 ${offset})`}>
          <path d="M8 65 Q110 59 240 17" stroke="#34464d" strokeWidth="11" opacity=".65" />
          <path d="M8 71 Q110 65 240 23" stroke="#c6c5ac" strokeWidth="1.5" opacity=".65" />
          {Array.from({ length: 17 }, (_, i) => {
            const x = 10 + i * 14;
            const y = 65 - .06 * x - .00058 * x * x;
            return <path key={i} d={`M${x - 3} ${y - 4}l5 3 -3 5`} stroke="#d7c697" strokeWidth="2" opacity=".85" />;
          })}
        </g>)}
      </g>
    </svg>
  </div>;
  return <div className={`ending-trail${ripple ? ' ending-trail-ripple' : ''}`} role="img" aria-label={ripple
    ? (vi ? 'Những vòng gợn kỳ diệu trên mặt đất phía xa' : 'Mysterious ripples on the distant ground')
    : (vi ? 'Một vệt sáng bí ẩn ở cuối đường' : 'A mysterious glow at the end of the path')}>
    <span /><span /><span />
  </div>;
}
