import type { Language } from '../../../content/i18n';

/** Historical illustration only; there is no camera puzzle or angle validation. */
export function BanhLuoiCameraDiagram({ language }: { language: Language }) {
  const vi = language === 'vi';
  return <div className="ban-camera-diagram"><svg viewBox="0 0 760 280" role="img" aria-label={vi ? 'Sơ đồ chức năng: camera trên LRV Apollo 15 nối bộ tiếp sóng LCRU và ăng-ten chảo gửi hình ảnh về Trái Đất. Không theo tỉ lệ.' : 'Functional diagram: the Apollo 15 LRV camera connects to the LCRU relay and dish antenna to send pictures to Earth. Not to scale.'}>
    <rect width="760" height="280" fill="#10212a"/>
    <path d="M0 230H455" stroke="#8c9f9b" strokeWidth="4"/>
    <g fill="#b7c0ac" stroke="#ddd4b5" strokeWidth="3"><rect x="90" y="192" width="290" height="12"/><circle cx="120" cy="214" r="15"/><circle cx="350" cy="214" r="15"/>
      <path d="M145 192V140"/><rect x="120" y="115" width="45" height="30"/><path d="M165 120L185 110V150L165 140Z"/>
      <rect x="215" y="153" width="60" height="35"/><path d="M335 192V125M305 100Q330 150 355 100Z"/>
    </g>
    <path d="M145 145V171H215M275 171H335V130M355 110L605 64" fill="none" stroke="#dfc18a" strokeWidth="3"/>
    <path d="M590 57L605 64L593 75" fill="none" stroke="#dfc18a" strokeWidth="3"/>
    <circle cx="650" cy="63" r="38" fill="#638b9a" stroke="#ddd4b5" strokeWidth="3"/>
    <path d="M635 32L650 49L638 61L647 77L632 92M665 33L658 50L675 64L665 85" fill="none" stroke="#b7c0ac" strokeWidth="6"/>
    <g fill="#eee5d1" fontSize="23" textAnchor="middle">
      <text x="145" y="264">Camera</text><text x="245" y="264">LCRU</text><text x="355" y="264">{vi ? 'Ăng-ten' : 'Antenna'}</text>
      <text x="650" y="134">{vi ? 'Trái Đất' : 'Earth'}</text><text x="485" y="38">{vi ? 'Hình ảnh' : 'Pictures'}</text>
    </g>
  </svg></div>;
}
