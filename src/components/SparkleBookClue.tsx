import { useState } from 'react';
import type { Language } from '../content/i18n';
import { CornerDiagram, RangingDiagram } from './SparkleScience';

export function SparkleBookClue({ language, ranging }: { language: Language; ranging: boolean }) {
  const vi = language === 'vi';
  const [hint, setHint] = useState(false);
  return <>
    <span className="book-kicker">{vi ? 'Manh mối của Lấp Lánh' : 'Sparkle’s clues'}</span>
    <h2 id="sparkle-clue-title" tabIndex={-1}>{ranging ? (vi ? 'Một lời chào, hai lượt đi' : 'One greeting, two journeys') : (vi ? 'Bí mật của góc gương' : 'The corner reflector’s secret')}</h2>
    {ranging ? <>
      <div className="sparkle-book-route"><RangingDiagram language={language} /></div>
      <p>{vi ? 'Trạm ở Trái Đất gửi một xung laser lên Lấp Lánh. Ánh sáng phản xạ trở về và đồng hồ ghi lại cả lượt đi lẫn lượt về.' : 'A station on Earth sends a laser pulse to Sparkle. The light returns, and a clock records both the outward and return journeys.'}</p>
      <dl className="sparkle-book-data"><dt>{vi ? 'Ánh sáng đi trong 1 giây' : 'Light travels in 1 second'}</dt><dd>≈ 300.000 km</dd><dt>{vi ? 'Thời gian mô phỏng đi và về' : 'Simulated round-trip time'}</dt><dd>2,56 s</dd></dl>
      <p>{vi ? 'Muốn biết khoảng cách một chiều, đừng quên ánh sáng đã đi cùng quãng đường hai lần nhé!' : 'To find the one-way distance, remember that light travelled the distance twice!'}</p>
      <button className="book-new-entry" aria-expanded={hint} onClick={() => setHint(!hint)}>{vi ? (hint ? 'Thu gọn gợi ý' : 'Cần thêm gợi ý?') : (hint ? 'Hide hint' : 'Need another hint?')}</button>
      {hint && <p className="sparkle-book-formula">{vi ? 'Khoảng cách = vận tốc ánh sáng × thời gian đi và về ÷ 2.' : 'Distance = speed of light × round-trip time ÷ 2.'}</p>}
      <small>{vi ? 'Số liệu đã làm tròn để chơi. Khoảng cách thực tế thay đổi theo quỹ đạo; hình và hoạt ảnh không theo tỉ lệ.' : 'Rounded game data. The real distance varies along the orbit; diagrams and animation are not to scale.'}</small>
      <a className="sparkle-book-source" href="https://www.nist.gov/history/moon-and-back-25-seconds" target="_blank" rel="noreferrer">{vi ? 'Tư liệu NIST: Đo khoảng cách bằng laser ↗' : 'NIST: Measuring distance with lasers ↗'}</a>
    </> : <>
      <CornerDiagram lit={4} language={language} />
      <p>{vi ? 'Gương 1 được giữ cố định. Góc của gương 2 được tính từ mặt gương 1; 90° nghĩa là hai mặt gương vuông góc.' : 'Mirror 1 stays fixed. Mirror 2’s angle is measured from mirror 1; 90° means the mirror faces are perpendicular.'}</p>
      <p>{vi ? 'Góc tới bằng góc phản xạ. Khi hai mặt gương vuông góc, sau hai lần phản xạ tia đi ra ngược chiều tia tới. Tia trở về song song với tia tới dù đổi hướng đặt cặp gương, miễn tia chạm đủ cả hai mặt.' : 'The angle of incidence equals the angle of reflection. When the mirrors are perpendicular, two reflections reverse the ray’s direction. The returning ray is parallel to the incoming ray in either orientation, provided it hits both mirrors.'}</p>
      <small>{vi ? 'Mô hình 2D có hai mặt gương. Lăng kính Apollo 11 thật có ba mặt phản xạ vuông góc và nằm cố định.' : 'The 2D model has two mirror faces. Real Apollo 11 prisms have three fixed, mutually perpendicular reflecting faces.'}</small>
      <a className="sparkle-book-source" href="https://www.apo.nmsu.edu/mainpage/apollo/apollolrrr/" target="_blank" rel="noreferrer">{vi ? 'Nguồn: Apache Point ↗' : 'Source: Apache Point ↗'}</a>
    </>}
  </>;
}
