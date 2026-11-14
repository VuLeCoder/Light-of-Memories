import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Phaser from 'phaser';
import '../styles.css';
import './tai-thinh-preview.css';
import { cacheScenery } from '../game/scenery';
import { drawTaiThinhDevice, drawTaiThinhRipple, taiThinhLayout, taiThinhScenery } from '../game/tai-thinh-scenery';
import { portraits, spriteSources } from '../content/assets';
import { taiThinhBookSources, taiThinhBook, taiThinhDevices, taiThinhDialogue, taiThinhIdentity, taiThinhMemories, taiThinhRecords, taiThinhRhythm, taiThinhTaskCopy as copy, type TaiThinhScriptId } from '../content/levels/tai-thinh-content';
import type { Language } from '../content/i18n';
import { EarthDialogue } from '../components/EarthDialogue';
import { BookNavigation } from '../components/BookNavigation';

const modes = ['encounter', 't01', 't02', 't03', 't04', 'photo', 'ending'] as const;
type Mode = typeof modes[number];
const modeLabels = { vi: ['Gặp gỡ', 'T01 · Thiết bị', 'T02 · Bản ghi', 'T03 · Ngân vang', 'T04 · Nhịp', 'Nhận ảnh', 'Kết'], en: ['Encounter', 'T01 · Instruments', 'T02 · Records', 'T03 · Ringing', 'T04 · Rhythm', 'Photo receipt', 'Ending'] };
const scriptGroups: { id: TaiThinhScriptId; vi: string; en: string }[] = [
  { id: 'route', vi: 'Chuyển vùng', en: 'Journey' },
  { id: 'arrival', vi: 'Gặp gỡ', en: 'Encounter' },
  { id: 'meeting', vi: 'Sau T01', en: 'After T01' },
  { id: 'recordsIntro', vi: 'Trước T02', en: 'Before T02' },
  { id: 'afterRecords', vi: 'Sau T02', en: 'After T02' },
  { id: 'ringingIntro', vi: 'Trước T03', en: 'Before T03' },
  { id: 'afterRinging', vi: 'Sau T03', en: 'After T03' },
  { id: 'rhythmIntro', vi: 'Trước T04', en: 'Before T04' },
  { id: 'afterRhythm', vi: 'Sau T04', en: 'After T04' },
  { id: 'memoriesIntro', vi: 'Trước hồi tưởng', en: 'Before memories' },
  { id: 'farewell', vi: 'Cảm ơn và thắp sao', en: 'Thanks and starlight' },
];

function Scenery({ ending, ripple, language }: { ending: boolean; ripple: boolean; language: Language }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current) return;
    const source = spriteSources.find(s => s.key === 'cuoi')!;
    class ArtScene extends Phaser.Scene {
      private ripple?: Phaser.GameObjects.Graphics;
      preload() { this.load.image('cuoi-art', source.url); }
      create() {
        cacheScenery(this, taiThinhScenery);
        for (const id of ['station', 'magnetometer', 'pse'] as const) {
          const p = taiThinhLayout[id]; drawTaiThinhDevice(this, id, p.x, p.y);
        }
        const texture = this.textures.get('cuoi-art');
        const f = source.frame; texture.add('rest', 0, f.x, f.y, f.width, f.height);
        const p = taiThinhLayout.cuoi;
        this.add.image(p.x, p.y, 'cuoi-art', 'rest').setOrigin(source.foot.x / f.width, source.foot.y / f.height).setScale(p.scale);
        this.ripple = this.add.graphics();
        if (ending) {
          // Static art study only. The hand binding and third-point animation belong to M7.
          const g = this.add.graphics({ x: 382, y: 382 });
          const outer: Phaser.Types.Math.Vector2Like[] = [];
          for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 10 : 24; outer.push({ x: Math.cos(a) * r, y: Math.sin(a) * r }); }
          g.fillStyle(0x6d5740).fillPoints(outer, true);
          for (let i = 0; i < 3; i++) g.fillStyle(0xffdc93).fillTriangle(0, 0, outer[(i * 2 + 9) % 10].x, outer[(i * 2 + 9) % 10].y, outer[(i * 2) % 10].x, outer[(i * 2) % 10].y).fillTriangle(0, 0, outer[(i * 2) % 10].x, outer[(i * 2) % 10].y, outer[(i * 2 + 1) % 10].x, outer[(i * 2 + 1) % 10].y);
          g.lineStyle(2, 0xe3be78).strokePoints(outer, true);
        }
        this.game.canvas.dataset.ready = 'true';
      }
      update(time: number) { if (this.ripple && ripple) drawTaiThinhRipple(this.ripple, time); }
    }
    const game = new Phaser.Game({ type: Phaser.AUTO, parent: host.current, width: 960, height: 540, backgroundColor: '#080e17', pixelArt: true, antialias: false, scene: ArtScene, audio: { noAudio: true }, scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }, callbacks: { postBoot: game => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) game.loop.targetFps = 12;
    } } });
    return () => game.destroy(true);
  }, [ending, ripple]);
  return <div className="tai-art-canvas" ref={host} role="img" aria-label={copy.stageAlt[language]} />;
}

function Wave({ type, long = false, timed = false, language }: { type: string; long?: boolean; timed?: boolean; language: Language }) {
  const samples = Array.from({ length: 241 }, (_, i) => {
    const t = i / 240;
    const envelope = type === 'square' ? 0 : long ? (1 - Math.exp(-t * 18)) * Math.exp(-t * 2.2) : type === 'impact' ? Math.exp(-t * (timed ? 60 : 7)) : Math.sin(t * Math.PI) * .65;
    const y = type === 'square' ? (i % 48 < 7 ? -19 : 0) : Math.sin(i * 2.1) * envelope * 30;
    return `${20 + t * 320},${48 + y}`;
  }).join(' ');
  return <svg viewBox="0 0 360 108" role="img" aria-label={language === 'vi' ? 'Đường sóng minh họa' : 'Illustrated wave trace'}>
    <path d="M20 15V80H340M20 48H340" fill="none" stroke="currentColor" opacity=".28" />
    <polyline points={samples} fill="none" stroke="currentColor" strokeWidth="1.5" />
    {timed && <><path d="M313 14V80" stroke="currentColor" opacity=".5" strokeDasharray="3 4" /><text x="20" y="12">{language === 'vi' ? 'Va chạm' : 'Impact'}</text><text x="299" y="12">55</text><text x="20" y="99">0</text><text x="160" y="99">30</text><text x="303" y="99">60 {language === 'vi' ? 'phút' : 'min'}</text></>}
  </svg>;
}

function Preview() {
  const [language, setLanguage] = useState<Language>('vi');
  const [mode, setMode] = useState<Mode>('encounter');
  const [device, setDevice] = useState(0);
  const [record, setRecord] = useState(0);
  const [photo, setPhoto] = useState(0);
  const [page, setPage] = useState(0);
  const [scriptGroup, setScriptGroup] = useState<TaiThinhScriptId>('arrival');
  const [take, setTake] = useState(0);
  const vi = language === 'vi';
  const book = taiThinhBook[page];
  const picture = taiThinhMemories[photo];
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const task = ['t01', 't02', 't03', 't04'].includes(mode) ? mode as 't01' | 't02' | 't03' | 't04' : null;
  const openHint = () => { setPage(mode === 't01' ? 1 : mode === 't02' ? 3 : mode === 't03' ? 6 : 7); document.getElementById('tai-art-book')?.focus({ preventScroll: true }); };
  return <main className="tai-art" lang={language}>
    <header className="tai-art-header"><div><small>CUỘI · M0–M1</small><h1>{taiThinhIdentity.name[language]}</h1><p>{vi ? 'Bản xem bố cục và tài nguyên · chưa phải màn chơi hoàn chỉnh' : 'Layout and asset study · not the complete level'}</p></div><label>{vi ? 'Ngôn ngữ' : 'Language'} <select value={language} onChange={e => setLanguage(e.target.value as Language)}><option value="vi">Tiếng Việt</option><option value="en">English</option></select></label></header>
    <nav className="tai-art-modes" aria-label={vi ? 'Chọn bố cục' : 'Choose layout'}>{modes.map((id, i) => <button key={id} aria-pressed={mode === id} onClick={() => { setMode(id); setScriptGroup(id === 'ending' ? 'farewell' : 'arrival'); setTake(n => n + 1); }}>{modeLabels[language][i]}</button>)}</nav>
    {(mode === 'encounter' || mode === 'ending') && <div className="tai-art-script"><label>{vi ? 'Đoạn thoại' : 'Dialogue'} <select value={scriptGroup} onChange={e => { setScriptGroup(e.target.value as TaiThinhScriptId); setTake(n => n + 1); }}>{scriptGroups.map(group => <option key={group.id} value={group.id}>{group[language]}</option>)}</select></label><button onClick={() => setTake(n => n + 1)}>{vi ? 'Đọc lại từ đầu' : 'Read again'}</button></div>}
    <div className="tai-art-workspace">
      <section className="tai-art-game" aria-label={vi ? 'Bố cục cảnh 960 × 540' : '960 × 540 scene layout'}>
        <div className={`tai-art-stage mode-${mode}`}>
          <Scenery language={language} ending={mode === 'ending'} ripple={mode === 'encounter' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches} />
          <div className="tai-art-hud"><span>{task ? `${mode.toUpperCase()} · ${copy[task].title[language]}` : taiThinhIdentity.location[language]}</span>{task && <button onClick={openHint}>{copy.hint[language]}</button>}</div>
          {(mode === 'encounter' || mode === 'ending') && <div className="tai-art-dialogue"><EarthDialogue key={`${mode}-${language}-${scriptGroup}-${take}`} language={language} lines={taiThinhDialogue(language, scriptGroup)} title={taiThinhIdentity.name[language]} finalAction="moon" paused={false} onTurn={() => {}} onComplete={() => setTake(n => n + 1)} finalLabel={vi ? 'Đọc lại đoạn này' : 'Read this passage again'} /></div>}
          {mode === 'ending' && <strong className="tai-art-star">★ 3/5</strong>}
          {mode === 't01' && <>
            {taiThinhDevices.map((d, i) => { const p = taiThinhLayout[d.id]; return <button className="tai-art-device" key={d.id} aria-pressed={device === i} style={{ left: `${p.x / 9.6}%`, top: `${(p.y - p.height - 16) / 9.6}cqw` }} onClick={() => setDevice(i)}>{d.label[language]}</button>; })}
            <div className="tai-art-inspect"><p>{taiThinhDevices[device].clue[language]}</p><button disabled>{copy.confirm[language]}</button></div>
          </>}
          {mode === 't02' && <section className="tai-art-panel"><h2>{copy.t02.goal[language]}</h2><div className="tai-art-record-tabs">{taiThinhRecords.map((r, i) => <button key={r.id} aria-pressed={record === i} onClick={() => setRecord(i)}>{r.title[language]}</button>)}</div><Wave language={language} type={taiThinhRecords[record].waveform} /><p>{taiThinhRecords[record].clue[language]}</p><small>{copy.recordNote[language]}</small></section>}
          {mode === 't03' && <section className="tai-art-panel"><h2>{copy.t03.goal[language]}</h2><div className="tai-art-graphs">{copy.graphOptions.map((label, i) => <div key={i}><Wave language={language} type="impact" timed long={i === 1} /><b>{label[language]}</b></div>)}</div><div className="tai-art-record-tabs">{copy.durationOptions.map((d, i) => <span className={i === 1 ? 'tai-art-answer' : ''} key={i}>{d[language]}</span>)}</div><small>{copy.graphNote[language]}</small></section>}
          {mode === 't04' && <section className="tai-art-panel"><h2>{copy.t04.goal[language]}</h2><p>{copy.rhythmDescription[language]}</p><div className="tai-art-stones">{taiThinhRhythm.options.map(r => <div className="tai-art-stone" key={r.id}><b>{r.id.toUpperCase()}</b><svg viewBox="0 0 220 44" role="img" aria-label={`${r.id.toUpperCase()}: ${r.description[language]}`}><path d="M10 22H210" stroke="currentColor" opacity=".3" />{r.beats.map(ms => <circle key={ms} cx={15 + ms / 10} cy="22" r="7" fill="currentColor" />)}</svg></div>)}</div><small>{copy.fiction[language]}</small></section>}
          {mode === 'photo' && <section className="tai-art-panel tai-art-photo excavation-photo"><figure className="memory-photo-frame"><img src={picture.src} alt={picture.alt[language]} /><figcaption>{picture.code} · {picture.credit}</figcaption></figure><div className="memory-photo-copy"><small>{vi ? 'Nhận ảnh' : 'Photo receipt'} · {photo + 1}/3</small><h2>{picture.title[language]}</h2><p>{picture.receipt[language]}</p><button onClick={() => setPhoto((photo + 1) % 3)}>{vi ? 'Xem ảnh kế tiếp' : 'Preview next photo'} →</button></div></section>}
        </div>
        <p className="tai-art-footnote">{vi ? '960 × 540 · Nền cache riêng; thiết bị, Cuội và gợn rung là các lớp tách biệt.' : '960 × 540 · Cached ground; instruments, Cuội and ripples use separate layers.'}</p>
      </section>
      <aside className="book-panel tai-art-book" aria-label={vi ? 'Trang sách mẫu' : 'Book study'}><div className="book-sheet" id="tai-art-book" tabIndex={-1}><span className="book-kicker">03 · Apollo 12</span><h2>{book.title[language]}</h2><img className="tai-art-portrait" src={portraits.taiThinh.url} alt={taiThinhIdentity.name[language]} /><p>{book.body[language]}</p>{taiThinhBookSources[book.id] && <a href={taiThinhBookSources[book.id]!} target="_blank" rel="noreferrer">{vi ? 'Nguồn tư liệu' : 'Source'} · NASA ↗</a>}</div><BookNavigation language={language} page={page} count={taiThinhBook.length} onChange={setPage} /></aside>
    </div>
    <p className="tai-art-note">{vi ? 'Các nút chọn bố cục, xem thiết bị, đổi bản ghi, lật sách và đổi ảnh dùng để duyệt thiết kế. Nộp đáp án, mở cửa, lưu tiến trình và trao sao được triển khai ở các mốc sau.' : 'Layout tabs, instrument clues, record tabs, book pages and photos are for design review. Answer submission, the door, saving progress and awarding a star come in later milestones.'}</p>
  </main>;
}

createRoot(document.getElementById('root')!).render(<Preview />);
