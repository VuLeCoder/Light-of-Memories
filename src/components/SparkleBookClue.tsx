import { useState } from 'react';
import type { Language } from '../content/i18n';
import { mirrorRotation } from '../game/sparkle-optics';
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
      <p>{vi ? 'Ba mặt phản xạ vuông góc giúp ánh sáng quay về trạm đã gửi nó đi.' : 'Three perpendicular reflecting faces return light toward the station that sent it.'}</p>
      <div className="sparkle-book-blueprint" aria-label={vi ? 'Hướng lắp ba mặt gương theo hình mẫu' : 'Three mirror orientations matching the model'}>{[0, 1, 2].map(i => <span key={i}>{i + 1}<svg width="28" height="28" viewBox="0 0 40 40" aria-hidden="true"><path d="M5 20H35" transform={`rotate(${mirrorRotation(i, i)} 20 20)`} stroke="currentColor" strokeWidth="3" /></svg></span>)}</div>
      <p>{vi ? 'Trong sơ đồ, tia phản xạ lần lượt qua các mặt 1 → 2 → 3 rồi về ô nhận. Góc của mỗi mặt quyết định hướng tia tiếp theo.' : 'In the diagram, light reflects from faces 1 → 2 → 3 and reaches the receiver. Each face’s angle determines the next direction.'}</p>
      <small>{vi ? 'Trò lắp mô hình mô phỏng. Ô phản xạ thật là khối kính cố định, không có động cơ.' : 'An imagined model puzzle. Real reflectors are fixed glass prisms with no motors.'}</small>
      <a className="sparkle-book-source" href="https://www.apo.nmsu.edu/mainpage/apollo/apollolrrr/" target="_blank" rel="noreferrer">{vi ? 'Nguồn: Apache Point ↗' : 'Source: Apache Point ↗'}</a>
    </>}
  </>;
}
