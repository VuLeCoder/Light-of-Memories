import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { JourneyMap, JourneyBook, journeyCopy } from './components/JourneyMap';
import { BookNavigation } from './components/BookNavigation';
import { EarthDialogue } from './components/EarthDialogue';
import { GameMenu } from './components/GameMenu';
import { VisitorCounter } from './components/VisitorCounter';
import { GameCanvas } from './game/GameCanvas';
import { scenes, type SceneId } from './content/scenes';
import { brandLogo, portraits } from './content/assets';
import { copy, languageOptions, readLanguage, storyLines, type Language } from './content/i18n';
import { readProgress, saveProgress, readSound, type Chapter } from './state/progress';
import type { LevelId } from './content/levels';
import type { MoonQuest } from './game/types';

function BookPlaceholder({ language }: { language: Language }) {
  const t = copy[language];
  return <>
    <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{t.bookTop}</span></div>
    <aside className="book-panel" lang={language} aria-labelledby="book-title">
      <div className="book-sheet">
        <div className="page-corner" aria-hidden="true" />
        <span className="book-kicker">{t.bookKicker}</span>
        <h2 id="book-title">{t.bookTitle[0]}<br />{t.bookTitle[1]}</h2>
        <div className="book-illustration" aria-hidden="true"><div className="paper-moon" /><div className="paper-hill hill-one" /><div className="paper-hill hill-two" /><span>✧</span></div>
        <div className="paper-divider" aria-hidden="true">✦</div>
        <p>{t.bookComing}</p>
        <div className="placeholder-lines" aria-hidden="true"><i /><i /><i /></div>
        <BookNavigation language={language} page={0} count={1} onChange={() => {}} />
      </div>
      <p className="book-note">{t.bookNote}</p>
    </aside>
  </>;
}

export function App() {
  const gameStage = useRef<HTMLDivElement>(null);
  const gameOwnsFocus = useRef(false);
  // Clicking non-focusable page content must also release the game's focus.
  useEffect(() => {
    const releaseFocus = (event?: PointerEvent) => {
      if (event?.target instanceof Element && event.target.closest('.game-stage')) return;
      gameOwnsFocus.current = false;
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest('.game-stage')) active.blur();
    };
    const onWindowBlur = () => releaseFocus();
    document.addEventListener('pointerdown', releaseFocus, true);
    window.addEventListener('blur', onWindowBlur);
    return () => {
      document.removeEventListener('pointerdown', releaseFocus, true);
      window.removeEventListener('blur', onWindowBlur);
    };
  }, []);
  const [language, setLanguage] = useState<Language>(readLanguage);
  const t = copy[language];
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.pageDescription);
    try { localStorage.setItem('cuoi.language', language); } catch { /* The choice still works for this visit. */ }
  }, [language, t]);
  const [saved] = useState(readProgress);
  const [saveUnavailable, setSaveUnavailable] = useState(saved.unavailable);
  const [completed, setCompleted] = useState(saved.progress.completed);
  const [sound, setSound] = useState(readSound);
  const [soundUnavailable, setSoundUnavailable] = useState(false);
  function toggleSound() {
    const next = !sound;
    setSound(next);
    try { localStorage.setItem('cuoi.sound', next ? 'on' : 'off'); setSoundUnavailable(false); }
    catch { setSoundUnavailable(true); }
  }
  const [scene, setScene] = useState<SceneId>(saved.progress.scene);
  const [menuOpen, setMenuOpen] = useState(true);
  const [started, setStarted] = useState(saved.progress.started);
  const [chapter, setChapter] = useState<Chapter>(saved.progress.chapter);
  const [quest, setQuest] = useState<MoonQuest>(saved.progress.quest);
  const [activeLevel, setActiveLevel] = useState<LevelId | null>(saved.progress.activeLevel);
  useEffect(() => {
    if (chapter !== 'idle') setSaveUnavailable(!saveProgress(chapter, quest, completed, activeLevel));
  }, [chapter, quest, completed, activeLevel]);
  const [treeTurn, setTreeTurn] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const [journey, setJourney] = useState(0);
  const [turn, setTurn] = useState(0);
  const transitioning = chapter === 'departing' || chapter === 'arriving';
  const tellingStory = chapter === 'earth';
  const moonStory = chapter === 'moon-story';
  const moonWaking = chapter === 'moon-waking';
  const questDialogue = quest === 'tree' || quest === 'lantern';
  const journeyOpen = quest === 'complete';
  const questLocked = questDialogue || journeyOpen;
  const moonMode = menuOpen ? 'paused' : questLocked ? 'story' : chapter === 'moon-waking' ? 'wake' : moonStory ? 'story' : chapter === 'moon-free' ? 'free' : 'sleep';
  const finishEarth = useCallback(() => { gameOwnsFocus.current = true; setChapter('departing'); }, []);
  const finishMoonStory = useCallback(() => setChapter('moon-free'), []);
  const onCuoiAwake = useCallback(() => setChapter((value) => value === 'moon-waking' ? 'moon-story' : value), []);
  const onBench = useCallback(() => { setTreeTurn(0); setQuest((value) => value === 'bench' ? 'tree' : value); }, []);
  const onExit = useCallback(() => {
    if (quest !== 'trail') return;
    setCompleted(true);
    setRevealing(true);
    setQuest('complete');
  }, [quest]);
  const receiveLantern = useCallback(() => setQuest((value) => value === 'tree' ? 'lantern' : value), []);
  const followTracks = useCallback(() => setQuest('trail'), []);
  useEffect(() => {
    if (!revealing || menuOpen) return;
    const timer = window.setTimeout(() => setRevealing(false), 1800);
    return () => window.clearTimeout(timer);
  }, [revealing, menuOpen]);
  // Keep focus on a persistent element while the canvas is inert or dialogue unmounts.
  useLayoutEffect(() => {
    if (menuOpen || !gameOwnsFocus.current) return;
    const stage = gameStage.current;
    const target = transitioning || moonWaking ? stage
      : stage?.querySelector<HTMLElement>('.dialogue:not([hidden]) .dialogue-next, .journey-view button, .story-canvas:not([inert]) .game-host');
    (target ?? stage)?.focus({ preventScroll: true });
  }, [chapter, quest, menuOpen, transitioning, moonWaking, revealing, activeLevel]);
  const noopTurn = useCallback(() => {}, []);
  useEffect(() => {
    if (!transitioning) return;
    const timer = window.setTimeout(() => {
      if (chapter === 'departing') { setScene('moon'); setChapter('arriving'); }
      else { setChapter('moon-waking'); }
    }, 700);
    return () => window.clearTimeout(timer);
  }, [chapter, transitioning]);
  function closeMenu() {
    setMenuOpen(false);
    gameOwnsFocus.current = true;
  }
  function startJourney() {
    gameOwnsFocus.current = true;
    setCompleted(false);
    setActiveLevel(null);
    setRevealing(false);
    setScene('earth');
    setQuest('bench');
    setTreeTurn(0);
    setStarted(true);
    setChapter('earth');
    // The initial menu already has the Earth scene ready. Recreate the game
    // only when restarting an existing journey, avoiding a second asset load.
    if (started) setJourney((value) => value + 1);
    setTurn(0);
    setMenuOpen(false);
  }
  const current = scenes[scene];
  const currentText = t[scene];
  const characterName = (id: keyof typeof portraits) => language === 'en' ? ({ an: 'An', ba: 'Grandma', cuoi: 'Cuội', cayDa: 'Banyan tree', matTron: 'Round Eyes', chiHang: 'Hằng' } as const)[id] : portraits[id].name;

  return <main className="app-shell">
    <header className="site-header">
      <a className="brand" href="#main-scene" aria-label={t.goToScene}><img className="brand-logo" src={brandLogo} alt="" width="52" height="52" decoding="async" /><span>CUỘI<span className="brand-caption">{t.brandCaption}</span></span></a>
      <div className="header-actions"><VisitorCounter language={language} /><label className="language-picker"><span>{language === 'vi' ? 'Ngôn ngữ' : 'Language'}</span><select aria-label={language === 'vi' ? 'Chọn ngôn ngữ' : 'Choose language'} value={language} onChange={(event) => { setLanguage(event.target.value as Language); }}>{languageOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label></div>
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
          <button className="open-menu" disabled={menuOpen || transitioning || moonWaking || revealing} onClick={() => setMenuOpen(true)}>{t.menu}</button>
        </div>
      </div>
      <section className="game-panel" id="main-scene" aria-label={t.sceneArea}>
        <div className="scene-frame">
          <div ref={gameStage} tabIndex={-1} className={`game-stage ${menuOpen ? 'has-menu' : ''}`}
            onFocusCapture={() => { gameOwnsFocus.current = true; }}
            onBlurCapture={(event) => {
              if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) gameOwnsFocus.current = false;
            }}
            onKeyDown={(event) => {
              if (event.target === event.currentTarget && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'Enter', 'NumpadEnter'].includes(event.code)) {
                event.preventDefault();
                event.stopPropagation();
              }
            }}
            onKeyUp={(event) => {
              if (event.target === event.currentTarget && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'Enter', 'NumpadEnter'].includes(event.code)) {
                event.preventDefault();
                event.stopPropagation();
              }
            }}
            onClick={(event) => {
              if (transitioning || moonWaking) { event.currentTarget.focus({ preventScroll: true }); return; }
              if (menuOpen || !(tellingStory || moonStory || questDialogue)) return;
              if ((event.target as Element).closest('button, select, input, a')) return;
              // The scenery is inert during dialogue; clicking it resumes keyboard dialogue control.
              event.currentTarget.querySelector<HTMLButtonElement>('.dialogue:not([hidden]) .dialogue-next')?.focus({ preventScroll: true });
            }}>
            <div className={`story-canvas ${revealing ? 'journey-revealing' : ''} ${chapter === 'departing' ? 'is-departing' : ''} ${chapter === 'arriving' ? 'is-arriving' : ''}`} inert={menuOpen || tellingStory || moonStory || transitioning || moonWaking || questLocked}>
              <GameCanvas key={journey} initiallyAwake={chapter === 'moon-story' || chapter === 'moon-free'} quest={quest} treeSpeaking={quest === 'tree' && treeTurn >= 2 && !menuOpen} onInteract={onBench} onExit={onExit} scene={scene} moonMode={moonMode} language={language} onAwake={onCuoiAwake} />
              {tellingStory && turn === 5 && !menuOpen && <span className="an-lantern-glow" aria-hidden="true" />}
            </div>
            {tellingStory && <EarthDialogue key={journey} language={language} lines={storyLines[language].earth} title={t.earthDialogueTitle} finalAction="earth" paused={menuOpen} onComplete={finishEarth} onTurn={setTurn} />}
            {moonStory && <EarthDialogue key={`moon-${journey}`} language={language} lines={storyLines[language].moon} title={t.moonDialogueTitle} finalAction="moon" paused={menuOpen} onComplete={finishMoonStory} onTurn={noopTurn} />}
            {scene === 'moon' && chapter === 'moon-free' && !journeyOpen && !menuOpen && <div className="quest-hud" aria-live="polite">
              <span>{quest === 'bench' ? t.benchGoal : quest === 'tree' ? t.treeTitle : t.trailGoal}</span>
              {['lantern', 'trail', 'complete'].includes(quest) && <strong aria-label={`${t.lantern}: 0/5`}><span aria-hidden="true">☆</span> 0/5</strong>}
            </div>}
            {questDialogue && <EarthDialogue key={`${quest}-${journey}`} language={language} lines={quest === 'tree' ? storyLines[language].tree : storyLines[language].departure} title={t.treeTitle} finalAction={quest === 'tree' ? 'lantern' : 'moon'} paused={menuOpen} onComplete={quest === 'tree' ? receiveLantern : followTracks} onTurn={quest === 'tree' ? setTreeTurn : noopTurn} />}
            {revealing && !menuOpen && <div className="journey-light" role="status">✦<p>{journeyCopy[language].reveal}</p></div>}
            {journeyOpen && !revealing && !menuOpen && <JourneyMap language={language} activeLevel={activeLevel} onEnter={setActiveLevel} onBack={() => setActiveLevel(null)} />}
            {menuOpen && <GameMenu sound={sound} onToggleSound={toggleSound} soundUnavailable={soundUnavailable} language={language} canContinue={started} onStart={startJourney} onContinue={closeMenu} />}
          </div>
          {moonWaking && !menuOpen && <p className="chapter-arrival" role="status">{t.moonWaking}</p>}
          {chapter === 'moon-free' && scene === 'moon' && !menuOpen && <p className="chapter-arrival" role="status">{quest === 'bench' ? `${t.moonMove} ${t.benchHint}` : quest === 'trail' ? t.trailHint : journeyOpen ? journeyCopy[language].title : t.treeTitle}</p>}
        </div>
        {saveUnavailable && <p className="save-notice" role="status">{t.saveNotice}</p>}
        <div className="scene-details">
          <div className="cast" aria-label={t.cast}>{current.characters.map((id) => <div className="cast-member" key={id}><span className={`portrait portrait-${id}`}><img src={portraits[id].url} alt="" /></span><span>{characterName(id)}</span></div>)}</div>
          <p>{currentText.description}</p>
        </div>
      </section>
      {journeyOpen && !revealing ? <JourneyBook language={language} activeLevel={activeLevel} /> : <BookPlaceholder language={language} />}
    </div>
      <section className="introduction" id="introduction" aria-labelledby="introduction-title">
        <div className="introduction-copy">
          <div className="chapter-label"><span className="small-star" aria-hidden="true">✦</span> {t.introLabel} <span className="label-line" /></div>
          <h1 id="introduction-title">{t.heroOne}<br /><span>{t.heroTwo}</span></h1>
        </div>
        <div className="team-identity">
          <span>{t.teamLabel}</span>
          <img src={brandLogo} alt="Light of Memories" width="200" height="200" loading="lazy" decoding="async" />
        </div>
      </section>
    <footer className="site-footer"><span>{t.footerOne}</span><span>{t.footerTwo} <span aria-hidden="true">✦</span></span></footer>
  </main>;
}
