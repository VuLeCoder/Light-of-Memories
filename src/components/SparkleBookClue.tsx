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
      <p>{vi ? 'Bấm “Gửi xung sáng”. Đồng hồ đo hai lượt: từ trạm tới gương rồi trở về.' : 'Press “Send a light pulse” to time both journeys: to the reflector and back.'}</p>
      <dl className="sparkle-book-data"><dt>{vi ? 'Vận tốc làm tròn' : 'Light speed, rounded'}</dt><dd>{vi ? '300.000 km/s' : '300,000 km/s'}</dd><dt>{vi ? 'Thời gian hai lượt' : 'Round-trip time'}</dt><dd>{vi ? '2,56 s' : '2.56 s'}</dd></dl>
      <p>{hint ? (vi ? 'Khoảng cách = 300.000 × 2,56 ÷ 2 = 384.000 km.' : 'Distance = 300,000 × 2.56 ÷ 2 = 384,000 km.') : (vi ? 'Nhân vận tốc ánh sáng với thời gian, rồi chia cho 2 để tìm khoảng cách một chiều.' : 'Multiply light speed by time, then divide by 2 to find the one-way distance.')}</p>
      <button className="book-new-entry" aria-expanded={hint} onClick={() => setHint(!hint)}>{vi ? (hint ? 'Thu gọn gợi ý' : 'Cần thêm gợi ý?') : (hint ? 'Hide hint' : 'Need another hint?')}</button>
      <small>{vi ? 'Số liệu mô phỏng, làm tròn. Khoảng cách thật thay đổi theo quỹ đạo; hình không theo tỉ lệ.' : 'Rounded simulation. The real distance varies along the orbit; diagram not to scale.'}</small>
      <a className="sparkle-book-source" href="https://www.nasa.gov/missions/laser-beams-reflected-between-earth-and-moon-boost-science/" target="_blank" rel="noreferrer">{vi ? 'NASA · Đo khoảng cách bằng laser ↗' : 'NASA · Lunar laser ranging ↗'}</a>
    </> : <>
      <CornerDiagram lit={4} language={language} />
      <p>{vi ? 'Gương 1 cố định. Kéo gương 2 hoặc thanh góc tới 90°, rồi bấm “Thử tia sáng”: tia cần chạm hai gương và về khe nhận.' : 'Mirror 1 is fixed. Turn mirror 2 to 90° relative to it. Press “Try the light”: the ray must hit both mirrors and reach the slit.'}</p>
      <p>{vi ? 'Góc tới bằng góc phản xạ, đo từ đường vuông góc với mặt gương. Hai gương vuông góc cho tia ra song song, ngược chiều tia tới sau hai lần phản xạ; hai tia có thể lệch nhau.' : 'Incidence and reflection angles are equal, measured from the surface normal. Two perpendicular mirrors return a parallel ray in the opposite direction, possibly offset.'}</p>
      <small>{vi ? 'Mô hình 2D. Apollo 11 thật có 100 lăng kính cố định, mỗi lăng kính có ba mặt phản xạ vuông góc; không cần điện.' : '2D model. Apollo 11 has 100 fixed prisms, each with three perpendicular reflecting faces; no electricity needed.'}</small>
      <a className="sparkle-book-source" href="https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/" target="_blank" rel="noreferrer">{vi ? 'NASA/JPL · Gương Apollo 11 ↗' : 'NASA/JPL · Apollo 11 reflector ↗'}</a>
    </>}
  </>;
}
