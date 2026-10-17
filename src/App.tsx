import { useCallback, useEffect, useRef, useState } from 'react';
import { EarthDialogue } from './components/EarthDialogue';
import { GameMenu } from './components/GameMenu';
import { GameCanvas } from './game/GameCanvas';
import { scenes, type SceneId } from './content/scenes';
import { portraits } from './content/assets';
import { copy, languageOptions, readLanguage, storyLines, type Language } from './content/i18n';
import type { ScenePoint } from './game/types';

function BookPlaceholder({ language }: { language: Language }) {
  const t = copy[language];
  return <>
    <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{t.bookTop}</span></div>
    <aside className="book-panel" aria-labelledby="book-title">
      <div className="book-sheet">
        <div className="page-corner" aria-hidden="true" />
        <span className="book-kicker">{t.bookKicker}</span>
        <h2 id="book-title">{t.bookTitle[0]}<br />{t.bookTitle[1]}</h2>
        <div className="book-illustration" aria-hidden="true"><div className="paper-moon" /><div className="paper-hill hill-one" /><div className="paper-hill hill-two" /><span>✧</span></div>
        <div className="paper-divider" aria-hidden="true">✦</div>
        <p>{t.bookComing}</p>
        <div className="placeholder-lines" aria-hidden="true"><i /><i /><i /></div>
        <div className="page-bottom"><span aria-hidden="true">—</span> <span>{t.bookFirst}</span> <span aria-hidden="true">—</span></div>
      </div>
      <p className="book-note">{t.bookNote}</p>
    </aside>
  </>;
}

export function App() {
  const [language, setLanguage] = useState<Language>(readLanguage);
  const t = copy[language];
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.pageDescription);
    try { localStorage.setItem('cuoi.language', language); } catch { /* The choice still works for this visit. */ }
  }, [language, t]);
  const [scene, setScene] = useState<SceneId>('earth');
  const [debug, setDebug] = useState(false);
  const [point, setPoint] = useState<ScenePoint | null>(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const [started, setStarted] = useState(false);
  const [chapter, setChapter] = useState<'preview' | 'earth' | 'departing' | 'arriving' | 'moon-waking' | 'moon-story' | 'moon-free'>('preview');
  const [journey, setJourney] = useState(0);
  const [turn, setTurn] = useState(0);
  const transitioning = chapter === 'departing' || chapter === 'arriving';
  const tellingStory = chapter === 'earth';
  const moonStory = chapter === 'moon-story';
  const moonWaking = chapter === 'moon-waking';
  const moonMode = menuOpen ? 'paused' : chapter === 'moon-waking' ? 'wake' : moonStory ? 'story' : chapter === 'moon-free' ? 'free' : 'sleep';
  const finishEarth = useCallback(() => setChapter('departing'), []);
  const finishMoonStory = useCallback(() => setChapter('moon-free'), []);
  const onCuoiAwake = useCallback(() => setChapter((value) => value === 'moon-waking' ? 'moon-story' : value), []);
  const noopTurn = useCallback(() => {}, []);
  useEffect(() => {
    if (!transitioning) return;
    const timer = window.setTimeout(() => {
      if (chapter === 'departing') { setScene('moon'); setChapter('arriving'); }
      else { setChapter('moon-waking'); }
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
  const currentText = t[scene];
  const characterName = (id: keyof typeof portraits) => language === 'en' ? ({ an: 'An', ba: 'Grandma', cuoi: 'Cuội', cayDa: 'Banyan tree', matTron: 'Round Eyes', chiHang: 'Hằng' } as const)[id] : portraits[id].name;

  return <main className="app-shell">
    <header className="site-header">
      <a className="brand" href="#main-scene" aria-label={t.goToScene}><span className="brand-moon" aria-hidden="true" /><span>CUỘI<span className="brand-caption">{t.brandCaption}</span></span></a>
      <div className="header-actions"><label className="language-picker"><span>{language === 'vi' ? 'Ngôn ngữ' : 'Language'}</span><select aria-label={language === 'vi' ? 'Chọn ngôn ngữ' : 'Choose language'} value={language} onChange={(event) => { setPoint(null); setLanguage(event.target.value as Language); }}>{languageOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label><div className="edition"><span aria-hidden="true" />{t.edition} <span className="edition-number">01</span></div></div>
    </header>
    <div className="workspace">
      <div className="scene-toolbar" aria-label={t.sceneControls}>
        <div className="scene-heading">
          <span className="scene-number">{current.number}</span>
          <div className="scene-heading-copy">
            <h2>{currentText.title}</h2>
            <span className="scene-subtitle">{currentText.subtitle}</span>
          </div>
        </div>
        <div className="story-controls">
          {tellingStory && !menuOpen && <button className="skip-story" onClick={finishEarth}>{t.skip}</button>}
          <button className="open-menu" disabled={menuOpen || transitioning || moonWaking} ref={menuButton} onClick={() => setMenuOpen(true)}>{t.menu}</button>
        </div>
      </div>
      <section className="game-panel" id="main-scene" aria-label={t.sceneArea}>
        <div className="scene-frame">
          <div className={`game-stage ${menuOpen ? 'has-menu' : ''}`}>
            <div className={`story-canvas ${chapter === 'departing' ? 'is-departing' : ''} ${chapter === 'arriving' ? 'is-arriving' : ''}`} inert={menuOpen || tellingStory || moonStory || transitioning || moonWaking}>
              <GameCanvas scene={scene} debug={debug} moonMode={moonMode} language={language} onPoint={setPoint} onAwake={onCuoiAwake} />
              {tellingStory && turn === 5 && !menuOpen && <span className="an-lantern-glow" aria-hidden="true" />}
            </div>
            {tellingStory && <EarthDialogue key={journey} language={language} lines={storyLines[language].earth} title={t.earthDialogueTitle} finalAction="earth" paused={menuOpen} onComplete={finishEarth} onTurn={setTurn} />}
            {moonStory && <EarthDialogue key={`moon-${journey}`} language={language} lines={storyLines[language].moon} title={t.moonDialogueTitle} finalAction="moon" paused={menuOpen} onComplete={finishMoonStory} onTurn={noopTurn} />}
            {menuOpen && <GameMenu language={language} canContinue={started} onStart={startJourney} onContinue={closeMenu} />}
          </div>
          {moonWaking && !menuOpen && <p className="chapter-arrival" role="status">{t.moonWaking}</p>}
          {chapter === 'moon-free' && scene === 'moon' && !menuOpen && <p className="chapter-arrival" role="status">{t.moonMove}</p>}
        </div>
        {(chapter === 'preview' || chapter === 'moon-free') && !menuOpen && <div className="preview-scenes"><span>{t.preview}</span><div className="scene-tabs" role="group" aria-label={t.choosePreview}>
          {(Object.keys(scenes) as SceneId[]).map((id) => <button key={id} aria-pressed={scene === id} onClick={() => setScene(id)}><span>{scenes[id].number}</span>{t[id].tab}</button>)}
        </div></div>}
        <div className="scene-details">
          <div className="cast" aria-label={t.cast}>{current.characters.map((id) => <div className="cast-member" key={id}><span className={`portrait portrait-${id}`}><img src={portraits[id].url} alt="" /></span><span>{characterName(id)}</span></div>)}</div>
          <p>{currentText.description}</p>
        </div>
        <details className="preview-tools" inert={menuOpen || tellingStory || moonStory || moonWaking || transitioning}>
          <summary>{t.debugTitle} <span aria-hidden="true">＋</span></summary>
          <div className="tools-content">
            <label><input type="checkbox" checked={debug} onChange={(event) => setDebug(event.target.checked)} />{t.debugToggle}</label>
            <output aria-live="polite" data-testid="coordinates">{debug ? (point ? `${point.target} · x: ${point.x}, y: ${point.y}` : t.debugClick) : t.debugCanvas}</output>
            <p>{t.debugNote}</p>
          </div>
        </details>
      </section>
      <BookPlaceholder language={language} />
    </div>
      <section className="introduction" id="introduction" aria-labelledby="introduction-title">
        <div className="chapter-label"><span className="small-star" aria-hidden="true">✦</span> {t.introLabel} <span className="label-line" /></div>
        <h1 id="introduction-title">{t.heroOne}<br /><span>{t.heroTwo}</span></h1>
      </section>
    <footer className="site-footer"><span>{t.footerOne}</span><span>{t.footerTwo} <span aria-hidden="true">✦</span></span></footer>
  </main>;
}
