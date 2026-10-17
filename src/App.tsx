import { useCallback, useEffect, useRef, useState } from 'react';
import { EarthDialogue } from './components/EarthDialogue';
import { GameMenu } from './components/GameMenu';
import { GameCanvas } from './game/GameCanvas';
import { scenes, type SceneId } from './content/scenes';
import { portraits } from './content/assets';
import type { ScenePoint } from './game/types';

function BookPlaceholder() {
  return <>
    <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>TRANG SÁCH BÊN BẠN</span></div>
    <aside className="book-panel" aria-labelledby="book-title">
      <div className="book-sheet">
        <div className="page-corner" aria-hidden="true" />
        <span className="book-kicker">MỘT CÂU CHUYỆN DƯỚI TRĂNG</span>
        <h2 id="book-title">Sách<br />đồng hành</h2>
        <div className="book-illustration" aria-hidden="true"><div className="paper-moon" /><div className="paper-hill hill-one" /><div className="paper-hill hill-two" /><span>✧</span></div>
        <div className="paper-divider" aria-hidden="true">✦</div>
        <p>Nội dung sách sẽ được bổ sung sau</p>
        <div className="placeholder-lines" aria-hidden="true"><i /><i /><i /></div>
        <div className="page-bottom"><span aria-hidden="true">—</span> <span>TRANG ĐẦU TIÊN</span> <span aria-hidden="true">—</span></div>
      </div>
      <p className="book-note">Trang sách đang chờ câu chuyện của bạn.</p>
    </aside>
  </>;
}

export function App() {
  const [scene, setScene] = useState<SceneId>('earth');
  const [debug, setDebug] = useState(false);
  const [point, setPoint] = useState<ScenePoint | null>(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const [started, setStarted] = useState(false);
  const [chapter, setChapter] = useState<'preview' | 'earth' | 'departing' | 'arriving' | 'moon'>('preview');
  const [journey, setJourney] = useState(0);
  const [turn, setTurn] = useState(0);
  const transitioning = chapter === 'departing' || chapter === 'arriving';
  const tellingStory = chapter === 'earth';
  const finishEarth = useCallback(() => setChapter('departing'), []);
  useEffect(() => {
    if (!transitioning) return;
    const timer = window.setTimeout(() => {
      if (chapter === 'departing') { setScene('moon'); setChapter('arriving'); }
      else { setChapter('moon'); requestAnimationFrame(() => menuButton.current?.focus({ preventScroll: true })); }
    }, 700);
    return () => window.clearTimeout(timer);
  }, [chapter, transitioning]);
  const menuButton = useRef<HTMLButtonElement>(null);
  function closeMenu() {
    setMenuOpen(false);
    if (!tellingStory) requestAnimationFrame(() => menuButton.current?.focus({ preventScroll: true }));
  }
  function startJourney() {
    setScene('earth');
    setStarted(true);
    setChapter('earth');
    setJourney((value) => value + 1);
    setTurn(0);
    setDebug(false);
    setMenuOpen(false);
  }
  const current = scenes[scene];

  return <main className="app-shell">
    <header className="site-header">
      <a className="brand" href="#main-scene" aria-label="Đến khung cảnh"><span className="brand-moon" aria-hidden="true" /><span>CUỘI<span className="brand-caption">CHUYỆN KỂ DƯỚI TRĂNG</span></span></a>
      <div className="edition"><span aria-hidden="true" />BẢN DỰNG MỞ ĐẦU <span className="edition-number">01</span></div>
    </header>
    <div className="workspace">
      <div className="scene-toolbar" aria-label="Thông tin và điều khiển cảnh">
        <div className="scene-heading">
          <span className="scene-number">{current.number}</span>
          <div className="scene-heading-copy">
            <h2>{current.title}</h2>
            <span className="scene-subtitle">{current.subtitle}</span>
          </div>
        </div>
        <div className="story-controls">
          {tellingStory && !menuOpen && <button className="skip-story" onClick={finishEarth}>Bỏ qua mở đầu</button>}
          <button className="open-menu" disabled={menuOpen || transitioning} ref={menuButton} onClick={() => setMenuOpen(true)}>☰ Menu</button>
        </div>
      </div>
      <section className="game-panel" id="main-scene" aria-label="Khung cảnh game">
        <div className="scene-frame">
          <div className={`game-stage ${menuOpen ? 'has-menu' : ''}`}>
            <div className={`story-canvas ${chapter === 'departing' ? 'is-departing' : ''} ${chapter === 'arriving' ? 'is-arriving' : ''}`} inert={menuOpen || tellingStory || transitioning}>
              <GameCanvas scene={scene} debug={debug} sleeping={scene === 'moon' && chapter !== 'preview'} onPoint={setPoint} />
              {tellingStory && turn === 5 && !menuOpen && <span className="an-lantern-glow" aria-hidden="true" />}
            </div>
            {tellingStory && <EarthDialogue key={journey} paused={menuOpen} onComplete={finishEarth} onTurn={setTurn} />}
            {menuOpen && <GameMenu canContinue={started} onStart={startJourney} onContinue={closeMenu} />}
          </div>
          {chapter === 'moon' && scene === 'moon' && !menuOpen && <p className="chapter-arrival" role="status">Cuội đang ngủ dưới gốc đa. Câu chuyện sẽ tiếp tục ở phần sau.</p>}
        </div>
        {!tellingStory && !transitioning && !menuOpen && <div className="preview-scenes"><span>Xem thử cảnh</span><div className="scene-tabs" role="group" aria-label="Chọn cảnh xem thử">
          {(Object.keys(scenes) as SceneId[]).map((id) => <button key={id} aria-pressed={scene === id} onClick={() => setScene(id)}><span>{scenes[id].number}</span>{scenes[id].tab}</button>)}
        </div></div>}
        <div className="scene-details">
          <div className="cast" aria-label="Nhân vật trong cảnh">{current.characters.map((id) => <div className="cast-member" key={id}><span className={`portrait portrait-${id}`}><img src={portraits[id].url} alt="" /></span><span>{portraits[id].name}</span></div>)}</div>
          <p>{current.description}</p>
        </div>
        <details className="preview-tools" inert={menuOpen || tellingStory || transitioning}>
          <summary>Kiểm tra bản dựng <span aria-hidden="true">＋</span></summary>
          <div className="tools-content">
            <label><input type="checkbox" checked={debug} onChange={(event) => setDebug(event.target.checked)} />Hiện vùng kiểm tra và tọa độ click</label>
            <output aria-live="polite" data-testid="coordinates">{debug ? (point ? `${point.target} · x: ${point.x}, y: ${point.y}` : 'Click trong cảnh để kiểm tra tọa độ 960 × 540.') : 'Canvas 16:9 · Tư thế nghỉ tĩnh · Cảnh và đạo cụ tạm'}</output>
            <p>Đã có câu chuyện An–bà. Di chuyển và lưu tiến trình qua tải lại chưa được triển khai.</p>
          </div>
        </details>
      </section>
      <BookPlaceholder />
    </div>
      <section className="introduction" id="introduction" aria-labelledby="introduction-title">
        <div className="chapter-label"><span className="small-star" aria-hidden="true">✦</span> KHỞI ĐẦU MỘT HÀNH TRÌNH <span className="label-line" /></div>
        <h1 id="introduction-title">Chú Cuội, chị Hằng<br /><span>và những người bạn bị lãng quên</span></h1>
      </section>
    <footer className="site-footer"><span>MỖI CÂU CHUYỆN BẮT ĐẦU TỪ MỘT ÁNH TRĂNG</span><span>Khung cảnh mở đầu <span aria-hidden="true">✦</span></span></footer>
  </main>;
}
