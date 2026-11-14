import type { Language } from '../content/i18n';

/** Historical illustration only; there is no camera puzzle or angle validation. */
export function BanhLuoiCameraDiagram({ language }: { language: Language }) {
  return <div className="ban-camera-diagram"><svg viewBox="0 0 760 280" role="img" aria-label={language === 'vi' ? 'Minh họa camera trên xe nhìn theo tầng bay lên của Challenger. Xe và tầng dưới ở lại Mặt Trăng.' : 'Illustration of the rover camera watching Challenger’s ascent stage. The rover and descent stage remain on the Moon.'}>
    <rect width="760" height="280" fill="#10212a"/>
    <path d="M0 230H760" stroke="#8c9f9b" strokeWidth="4"/>
    <path d="M180 180L555 70L555 205Z" fill="#dfc18a" opacity=".14"/>
    <g fill="#b7c0ac" stroke="#ddd4b5" strokeWidth="3"><rect x="100" y="192" width="120" height="12"/><circle cx="120" cy="214" r="15"/><circle cx="200" cy="214" r="15"/><path d="M170 192V164"/><rect x="164" y="154" width="28" height="16"/></g>
    <g fill="#a99570"><rect x="520" y="190" width="90" height="35"/><path d="M530 210L500 230H515L540 210M600 210L630 230H615L590 210"/></g>
    <rect x="535" y="65" width="60" height="40" fill="#dfc18a"/>
    <path d="M565 170V120M555 135L565 120L575 135" fill="none" stroke="#eee5d1" strokeWidth="3"/>
    <g fill="#eee5d1" fontSize="24" textAnchor="middle"><text x="160" y="264">{language === 'vi' ? 'Camera trên xe' : 'Rover camera'}</text><text x="565" y="264">Challenger</text></g>
  </svg></div>;
}
