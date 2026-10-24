import type { Language } from '../content/i18n';

/** A story cue on the walkable ground; movement remains on the canvas below. */
export function EndingTrail({ language, ripple = false, tracks = false }: { language: Language; ripple?: boolean; tracks?: boolean }) {
  const vi = language === 'vi';
  if (tracks) return <div className="ending-trail ending-trail-tracks" role="img" aria-label={vi
    ? 'Hai vệt bánh xe song song trên bụi trăng, dẫn về phía bên phải'
    : 'Two parallel wheel tracks in the lunar dust, leading to the right'}>
    <svg viewBox="0 0 132 48" preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden="true">
      <g>
        {[0, 20].map(offset => <g key={offset} transform={`translate(0 ${offset})`}>
          {Array.from({ length: 9 }, (_, i) => {
            const x = 5 + i * 15;
            const y = 17 - Math.floor(i / 3);
            return <g key={i}>
              <path d={`M${x} ${y}h4v-3h4v-2h3v4h-3v2h-4v2h-4z`} fill="#43565c" opacity=".85" />
              <path d={`M${x + 1} ${y + 5}h4v-1h4v-1h3`} fill="none" stroke="#b0b29f" strokeWidth="1" opacity=".65" />
            </g>;
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
