import type { Language } from '../../content/i18n';

/** Accessible equivalent of the signpost drawn on the canvas, without a second visual layer. */
export function EndingTrail({ language, kind = 'tremors' }: { language: Language; kind?: 'tremors' | 'tracks' | 'orbital-photo' }) {
  const labels = {
    tremors: { vi: 'Những vòng rung sát mặt đất và các hòn sỏi khẽ rung ở bên phải', en: 'Low ground ripples and gently trembling pebbles on the right' },
    tracks: { vi: 'Hai hàng dấu bánh xe trên mặt đất bên phải', en: 'Two rows of wheel tracks in the ground on the right' },
    'orbital-photo': { vi: 'Hình chiếu minh họa góc nhìn từ trên cao, có dấu đường đi và vị trí xe ở bên phải', en: 'An illustrative overhead projection with trails and the rover location on the right' },
  };
  return <div className="sr-only" role="img" aria-label={labels[kind][language]} />;
}
