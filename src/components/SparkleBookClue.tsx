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
      <p>{vi ? 'Một trạm trên Trái Đất gửi tia laser đến Lấp Lánh. Bạn phản xạ ánh sáng về phía trạm. Đồng hồ đo thời gian của cả lượt đi lẫn lượt về.' : 'A station on Earth sends laser light to Sparkle. The reflector sends it back toward the station. A clock measures the time for both journeys.'}</p>
      <dl className="sparkle-book-data"><dt>{vi ? 'Vận tốc làm tròn' : 'Light speed, rounded'}</dt><dd>{vi ? '300.000 km/s' : '300,000 km/s'}</dd><dt>{vi ? 'Thời gian hai lượt' : 'Round-trip time'}</dt><dd>{vi ? '2,56 s' : '2.56 s'}</dd></dl>
      <p>{hint ? (vi ? 'Khoảng cách = 300.000 × 2,56 ÷ 2 = 384.000 km.' : 'Distance = 300,000 × 2.56 ÷ 2 = 384,000 km.') : (vi ? 'Lấy vận tốc ánh sáng nhân với thời gian sẽ được quãng đường của hai lượt. Chia đôi kết quả ấy sẽ được khoảng cách từ Trái Đất đến Mặt Trăng.' : 'Light speed multiplied by time gives the distance for both journeys. Half of that is the distance from Earth to the Moon.')}</p>
      <button className="book-new-entry" aria-expanded={hint} onClick={() => setHint(!hint)}>{vi ? (hint ? 'Thu gọn gợi ý' : 'Cần thêm gợi ý?') : (hint ? 'Hide hint' : 'Need another hint?')}</button>
      <small>{vi ? 'Các số trong trò chơi đã được làm tròn. Khoảng cách thật thay đổi khi Mặt Trăng chuyển động quanh Trái Đất. Hình vẽ không theo tỉ lệ.' : 'The game uses rounded numbers. The real distance changes as the Moon travels around Earth. The drawing is not to scale.'}</small>
      <a className="sparkle-book-source" href="https://www.nasa.gov/missions/laser-beams-reflected-between-earth-and-moon-boost-science/" target="_blank" rel="noreferrer">{vi ? 'NASA · Đo khoảng cách bằng laser ↗' : 'NASA · Lunar laser ranging ↗'}</a>
    </> : <>
      <CornerDiagram lit={4} language={language} />
      <p>{vi ? 'Trong mô hình, gương thứ nhất đứng yên, còn gương thứ hai có thể xoay. Khi hai gương tạo thành góc vuông 90°, tia sáng phản xạ qua cả hai gương rồi trở về khe nhận.' : 'In the model, the first mirror stays still and the second can turn. When they form a right angle of 90°, light bounces off both mirrors and returns to the receiving slit.'}</p>
      <p>{vi ? 'Ánh sáng gặp gương sẽ đổi hướng. Góc tới bằng góc phản xạ, cùng đo từ đường vuông góc với mặt gương. Sau hai lần phản xạ ở góc vuông, tia đi ra song song và ngược chiều tia đi vào, nhưng có thể lệch sang bên.' : 'Light changes direction when it meets a mirror. Its incoming and outgoing angles are equal, measured from a line perpendicular to the mirror. After two bounces in a right-angle corner, the ray travels parallel to the incoming ray in the opposite direction. It may be shifted to one side.'}</p>
      <small>{vi ? 'Hình vẽ là mô hình phẳng. Lấp Lánh thật có 100 lăng kính cố định. Mỗi lăng kính có ba mặt phản xạ vuông góc với nhau và làm việc không cần điện.' : 'The drawing is a flat model. The real Sparkle has 100 fixed prisms. Each has three reflecting faces at right angles to one another and works without electricity.'}</small>
      <a className="sparkle-book-source" href="https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/" target="_blank" rel="noreferrer">{vi ? 'NASA/JPL · Gương Apollo 11 ↗' : 'NASA/JPL · Apollo 11 reflector ↗'}</a>
    </>}
  </>;
}
