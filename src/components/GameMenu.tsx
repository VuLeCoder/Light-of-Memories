import { useEffect, useRef, useState } from 'react';

export function GameMenu({ canContinue, onStart, onContinue }: {
  canContinue: boolean; onStart: () => void; onContinue: () => void;
}) {
  const [screen, setScreen] = useState<'main' | 'help' | 'restart'>('main');
  const [sound, setSound] = useState(() => {
    try { return localStorage.getItem('cuoi.sound') !== 'off'; } catch { return true; }
  });
  const [notice, setNotice] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [screen]);

  function toggleSound() {
    const next = !sound;
    setSound(next);
    try {
      localStorage.setItem('cuoi.sound', next ? 'on' : 'off');
      setNotice('');
    } catch { setNotice('Lựa chọn âm thanh chỉ được giữ trong lần mở menu này.'); }
  }

  return <section className="game-menu" aria-labelledby="menu-title">
    <div className="menu-story">
      <span className="menu-eyebrow">✦ CHUYỆN KỂ DƯỚI TRĂNG</span>
      <h2 id="menu-title" ref={heading} tabIndex={-1}>{screen === 'help' ? 'Cùng bắt đầu nhé!' : screen === 'restart' ? 'Bắt đầu lại từ hiên nhà?' : <>Chú Cuội, chị Hằng<span>và những người bạn bị lãng quên</span></>}</h2>
      <p>{screen === 'help' ? 'Chọn một nút bằng chuột, hoặc nhấn Tab rồi Enter.' : screen === 'restart' ? 'Bạn sẽ rời cảnh đang xem và trở về đêm Trung Thu cùng An và bà.' : 'Một đêm trăng tròn. Một câu chuyện đang chờ bạn khám phá.'}</p>
    </div>
    <div className="menu-actions">
      {screen === 'main' ? <>
        <button className="menu-primary" onClick={() => canContinue ? setScreen('restart') : onStart()}>Bắt đầu hành trình <span aria-hidden="true">→</span></button>
        <button disabled={!canContinue} onClick={onContinue} aria-describedby="continue-note">Tiếp tục</button>
        <p className="menu-hint" id="continue-note">{canContinue ? 'Quay lại cảnh bạn đang xem.' : 'Bắt đầu hành trình để mở nút này.'}</p>
        <div className="menu-secondary">
          <button onClick={() => setScreen('help')}>Hướng dẫn</button>
          <button aria-pressed={sound} onClick={toggleSound}>Âm thanh: {sound ? 'Bật' : 'Tắt'}</button>
        </div>
        <p className="menu-hint">Chưa có nhạc trong bản hiện tại.</p>
        {notice && <p className="menu-hint" role="status">{notice}</p>}
      </> : screen === 'help' ? <>
        <ul className="menu-help">
          <li><strong>Bắt đầu hành trình:</strong> đọc câu chuyện An và bà ở hiên nhà.</li>
          <li>Bấm <strong>Hiện hết câu</strong> hoặc nhấn <strong>Space / Enter</strong> để hiện đủ chữ. Bấm thêm lần nữa để sang câu tiếp theo.</li>
          <li>Nhấn <strong>Menu</strong> để tạm dừng, <strong>Tiếp tục</strong> để đọc tiếp. <strong>Bỏ qua mở đầu</strong> đưa bạn tới Cuội đang ngủ.</li>
          <li>Sau khi Cuội thức dậy và bạn đọc hết lời dẫn, dùng <strong>A/D</strong>, <strong>←/→</strong> hoặc <strong>bấm vào mặt đất</strong> để di chuyển.</li>
        </ul>
        <p className="menu-hint">Hãy đọc theo nhịp của bạn. Tương tác đồ vật và lưu hành trình qua tải lại sẽ được bổ sung sau.</p>
        <button className="menu-primary" onClick={() => setScreen('main')}>Về menu</button>
      </> : <>
        <button className="menu-primary" onClick={onStart}>Bắt đầu lại</button>
        <button onClick={() => setScreen('main')}>Giữ cảnh hiện tại</button>
      </>}
    </div>
  </section>;
}
