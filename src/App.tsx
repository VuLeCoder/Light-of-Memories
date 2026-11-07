import { BookTopline } from './components/BookTopline';
import { startGacRabbitJourney, rabbitStops, type RabbitStop } from './content/levels/gac-troi-rabbit';
import { GacTroiTrail, isGacTrailPhase } from './components/GacTroiTrail';
import { gacMatchingIntroLength } from './content/levels/gac-troi-matching';
import { GacTroiLevel } from './components/GacTroiLevel';

import { freshGacTroi } from './content/levels/gac-troi-progress';
import { endingChatLines } from './content/levels/ending-chat';
import { focusGame } from './focus/game-focus';
import { SparkleLevel } from './components/SparkleLevel';
import { freshSparkle } from './content/levels/lap-lanh';
import { SurveyorEnding } from './components/SurveyorEnding';
import { SurveyorExcavation } from './components/SurveyorExcavation';
import type { SurveyorEvent } from './content/levels/surveyor-progress';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { JourneyMap, JourneyBook, journeyCopy } from './components/JourneyMap';
import { BookNavigation } from './components/BookNavigation';
import { BookLabelGuide } from './components/BookContentLabel';
import { EarthDialogue } from './components/EarthDialogue';
import { GameMenu } from './components/GameMenu';
import { VisitorCounter } from './components/VisitorCounter';
import { GameCanvas } from './game/GameCanvas';
import { scenes, type SceneId } from './content/scenes';
import { brandLogo, portraits } from './content/assets';
import { copy, languageOptions, readLanguage, storyLines, type Language } from './content/i18n';
import { readProgress, saveProgress, readSound, type Chapter } from './state/progress';
import { surveyorEncounterCopy, surveyorEncounterLines } from './content/levels/surveyor-encounter';
import { challengeCopy, challengeLines } from './content/levels/surveyor-challenges';
import { freshSurveyor, replaySurveyor } from './content/levels/surveyor-progress';
import { journeyStatus, type LevelId } from './content/levels';
import type { MoonQuest } from './game/types';
import { useWorkspaceFit } from './useWorkspaceFit';

function BookPlaceholder({ language }: { language: Language }) {
  const t = copy[language];
  return <>
    <BookTopline language={language} />
    <aside className="book-panel" lang={language} aria-labelledby="book-title">
      <div className="book-sheet">
        <div className="page-corner" aria-hidden="true" />
        <span className="book-kicker">{t.bookKicker}</span>
        <h2 id="book-title">{t.bookTitle[0]}<br />{t.bookTitle[1]}</h2>
        <div className="book-illustration" aria-hidden="true"><div className="paper-moon" /><div className="paper-hill hill-one" /><div className="paper-hill hill-two" /><span>✧</span></div>
        <div className="paper-divider" aria-hidden="true">✦</div>
        <p>{t.bookComing}</p>
        <div className="placeholder-lines" aria-hidden="true"><i /><i /><i /></div>
      </div>
      <BookNavigation language={language} page={0} count={1} onChange={() => {}} />
    </aside>
  </>;
}

export function App() {
  const fittedWorkspace = useWorkspaceFit();
  const gameStage = useRef<HTMLDivElement>(null);
  const gameOwnsFocus = useRef(false);
  const [canvasReady, setCanvasReady] = useState(0);
  const onCanvasReady = useCallback(() => setCanvasReady(n => n + 1), []);
  // Clicking non-focusable page content must also release the game's focus.
  useEffect(() => {
    const releaseFocus = (event?: PointerEvent) => {
      if (event?.target instanceof Element && event.target.closest('.game-stage')) return;
      gameOwnsFocus.current = false;
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest('.game-stage')) active.blur();
    };
    const onWindowBlur = () => releaseFocus();
    const onFocusOutside = (event: FocusEvent) => {
      // A removed/inert control can send focus to body without a user action.
      if (event.target instanceof Element && event.target !== document.body && !event.target.closest('.game-stage')) gameOwnsFocus.current = false;
    };
    document.addEventListener('pointerdown', releaseFocus, true);
    document.addEventListener('focusin', onFocusOutside);
    window.addEventListener('blur', onWindowBlur);
    return () => {
      document.removeEventListener('pointerdown', releaseFocus, true);
      document.removeEventListener('focusin', onFocusOutside);
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
  const [surveyorProgress, setSurveyorProgress] = useState(saved.progress.surveyor);
  const [gacTroiProgress, setGacTroiProgress] = useState(() => saved.progress.gacTroi);
  const [sparkleProgress, setSparkleProgress] = useState(saved.progress.sparkle);
  useEffect(() => {
    if (chapter !== 'idle') setSaveUnavailable(!saveProgress(chapter, quest, completed, activeLevel, surveyorProgress, sparkleProgress, gacTroiProgress));
  }, [chapter, quest, completed, activeLevel, surveyorProgress, sparkleProgress, gacTroiProgress]);
  const [trailWarning, setTrailWarning] = useState(false);
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
  const completedFriends = { surveyor: surveyorProgress.completedOnce, 'lap-lanh': sparkleProgress.completedOnce, 'gac-troi': gacTroiProgress.completedOnce };
  const inGacTroi = journeyOpen && activeLevel === 'gac-troi' && journeyStatus('gac-troi', completedFriends) !== 'locked';
  const litStars = Number(surveyorProgress.completedOnce) + 2 * Number(sparkleProgress.completedOnce) + 2 * Number(gacTroiProgress.completedOnce);
  const inSparkle = journeyOpen && activeLevel === 'lap-lanh';
  const sparkleTrail = inSparkle && ['route', 'search-intro', 'search'].includes(sparkleProgress.phase);
  const sparkleWalking = inSparkle && ['arrival', 'search', 'finished'].includes(sparkleProgress.phase);
  useEffect(() => {
    if (!inSparkle || sparkleProgress.phase !== 'search') setTrailWarning(false);
  }, [inSparkle, sparkleProgress.phase]);
  const inSurveyor = journeyOpen && activeLevel === 'surveyor';
  const [digNear, setDigNear] = useState<SurveyorEvent | null>(null);
  const [bookRequest, setBookRequest] = useState(0);
  const excavating = inSurveyor && ['soil', 'digging', 'soil-memory'].includes(surveyorProgress.phase);
  useEffect(() => { setDigNear(null); }, [excavating]);
  const excavation = excavating ? { found: surveyorProgress.found, clues: surveyorProgress.clues, digging: surveyorProgress.phase === 'digging' } : undefined;
  const openFieldBook = () => { setBookRequest(n => n + 1); };
  const surveyorMeeting = inSurveyor && (surveyorProgress.phase === 'arrival' || surveyorProgress.phase === 'dialogue');
  const surveyorEnding = inSurveyor && surveyorProgress.phase === 'complete';
  const endingFreeRoam = surveyorEnding && surveyorProgress.turn >= 10;
  const surveyorDigIntro = inSurveyor && surveyorProgress.phase === 'soil-intro';
  const surveyorChat = surveyorMeeting && surveyorProgress.phase === 'dialogue';
  const encounterText = surveyorEncounterCopy[language];
  const gacRabbit = inGacTroi && gacTroiProgress.rabbitJourney?.active === true;
  const rabbitStage = gacRabbit ? gacTroiProgress.rabbitJourney!.stage : null;
  const gacTrail = inGacTroi && (gacRabbit ? rabbitStops.includes(rabbitStage as RabbitStop) : isGacTrailPhase(gacTroiProgress.phase));
  const gacWalking = inGacTroi && !gacRabbit && gacTroiProgress.phase === 'gac-free';
  const endingExploring = gacWalking || endingFreeRoam || (inSparkle && sparkleProgress.phase === 'finished');
  const [endingChat, setEndingChat] = useState<LevelId | null>(null);
  const chattingAtEnd = endingExploring && endingChat === activeLevel;
  useEffect(() => { setEndingChat(null); }, [activeLevel, endingExploring]);
  const closeEndingChat = () => {
    setEndingChat(null);
    gameStage.current?.querySelector<HTMLElement>('.game-host')?.focus({ preventScroll: true });
  };
  const questLocked = chattingAtEnd || ( inSparkle ? (!sparkleWalking || trailWarning) : questDialogue || (journeyOpen && !surveyorMeeting && !excavating && !endingFreeRoam && !gacWalking) || (excavating && surveyorProgress.phase !== 'soil') || surveyorChat);
  const moonMode = menuOpen ? 'paused' : questLocked ? 'story' : chapter === 'moon-waking' ? 'wake' : moonStory ? 'story' : chapter === 'moon-free' ? 'free' : 'sleep';
  const finishEarth = useCallback(() => { gameOwnsFocus.current = true; setChapter('departing'); }, []);
  const finishMoonStory = useCallback(() => setChapter('moon-free'), []);
  const onCuoiAwake = useCallback(() => setChapter((value) => value === 'moon-waking' ? 'moon-story' : value), []);
  const onBench = useCallback(() => { setTreeTurn(0); setQuest((value) => value === 'bench' ? 'tree' : value); }, []);
  const onSurveyorInteract = useCallback(() => setSurveyorProgress(value => value.phase === 'arrival' ? { ...value, phase: 'dialogue' } : value), []);
  const onSurveyorTurn = useCallback((index: number) => setSurveyorProgress(value => value.turn === index ? value : { ...value, turn: index }), []);
  const startSurveyorTools = useCallback(() => setSurveyorProgress(value => ({ ...value, phase: 'tools' })), []);
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
  // A new scene starts at the top of the shared scroll viewport.
  useLayoutEffect(() => {
    gameStage.current?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [chapter, quest, activeLevel, surveyorProgress.phase, sparkleProgress.phase, gacTroiProgress.phase, rabbitStage, menuOpen]);
  // Keep focus on a persistent element while the canvas is inert or dialogue unmounts.
  useLayoutEffect(() => {
    if (menuOpen || !gameOwnsFocus.current) return;
    const stage = gameStage.current;
    if (transitioning || moonWaking) stage?.focus({ preventScroll: true });
    else focusGame(stage);
  }, [chapter, quest, menuOpen, transitioning, moonWaking, revealing, activeLevel, surveyorProgress.phase, sparkleProgress.phase, gacTroiProgress.phase, rabbitStage, trailWarning, chattingAtEnd, canvasReady]);
  // Removal, disabling and inert updates do not consistently emit focusout.
  // Recover after the DOM settles, for every scene, without taking focus from
  // another game control, the companion book, or the rest of the page.
  useEffect(() => {
    if (menuOpen) return;
    const stage = gameStage.current;
    let frame = 0;
    const restoreFocus = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!gameOwnsFocus.current || !document.hasFocus()) return;
        const active = document.activeElement;
        if (active instanceof HTMLElement && active !== stage && active !== document.body
          && !active.closest('[hidden], [inert]') && !active.matches(':disabled') && active.getClientRects().length) return;
        if (transitioning || moonWaking) stage?.focus({ preventScroll: true });
        else focusGame(stage);
      });
    };
    const observer = new MutationObserver(restoreFocus);
    if (stage) observer.observe(stage, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'inert', 'disabled'] });
    stage?.addEventListener('focusout', restoreFocus);
    restoreFocus();
    return () => {
      cancelAnimationFrame(frame);
      stage?.removeEventListener('focusout', restoreFocus);
      observer.disconnect();
    };
  }, [menuOpen, transitioning, moonWaking]);
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
    setSurveyorProgress(freshSurveyor());
    setSparkleProgress(freshSparkle());
    setGacTroiProgress(freshGacTroi());
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
  function playSurveyorAgain() {
    if (surveyorProgress.phase !== 'complete') return;
    setSurveyorProgress(replaySurveyor(surveyorProgress));
    setActiveLevel('surveyor');
    setDigNear(null);
    setBookRequest(0);
    setJourney(value => value + 1);
    gameOwnsFocus.current = true;
  }
  const vi = language === 'vi';
  const moveHelp = vi ? 'Di chuyển: A/D, ←/→ hoặc chạm mặt đất.' : 'Move: A/D, ←/→, or tap the ground.';
  const depthMoveHelp = vi ? 'Di chuyển: WASD, phím mũi tên hoặc chạm mặt đất.' : 'Move: WASD, arrow keys, or tap the ground.';
  // Task and dialogue instructions already appear beside their controls.
  let gameInstructions = '';
  if (!menuOpen && !transitioning && !moonWaking && !revealing && !chattingAtEnd) {
    if (inGacTroi && ['t03-walk', 't03-map', 't03-story'].includes(gacTroiProgress.phase)) {
      const count = gacTroiProgress.routeLandmarks.length;
      gameInstructions = count === 3
        ? (vi ? 'Đường đã sáng rồi! Cùng nghe lời nhắn của Gác Trời…' : 'The path is bright! Let’s hear Sky Watcher’s message…')
        : gacTroiProgress.phase === 't03-walk'
          ? (vi ? 'Di chuyển: WASD, phím mũi tên hoặc chạm mặt đất. Đi sang mép phải để tiếp tục.' : 'Move: WASD, arrow keys, or tap the ground. Walk to the right edge to continue.')
          : (vi ? `Di chuyển: WASD, phím mũi tên hoặc chạm mặt đất. Đến gần đèn và nhấn E hoặc chạm đèn để thắp · ${count}/3` : `Move: WASD, arrow keys, or tap the ground. Approach a lantern and press E or tap it to light · ${count}/3`);
    }
    else if (endingExploring) gameInstructions = inSurveyor ? depthMoveHelp : moveHelp;
    else if (inSurveyor && (surveyorMeeting || excavating && surveyorProgress.phase !== 'soil-memory')) gameInstructions = depthMoveHelp;
    else if (inSparkle && sparkleProgress.phase === 'search' && !trailWarning) gameInstructions = depthMoveHelp;
    else if (inSparkle && sparkleProgress.phase === 'arrival' || chapter === 'moon-free' && !journeyOpen && !tellingStory && !moonStory && !questDialogue) gameInstructions = moveHelp;
  }
  if (gacTrail && gacRabbit && !menuOpen) gameInstructions = vi ? '↑ ↓ ← → / WASD để đi · H để hỏi Gác Trời · E để ú òa / nhặt quà · Chạm đất để đi, chạm Cuội để tương tác' : 'Arrows / WASD to move · H to ask Sky Watcher · E for peekaboo / collect · Tap ground to walk, tap Cuội to interact';
  const gacTogether = gacRabbit && ['reunion', 'farewell', 'free'].includes(rabbitStage!);
  const gacGround = gacRabbit && rabbitStage !== 'real';
  const current = (gacTogether || gacTrail && !gacRabbit) ? { number: '05', characters: ['cuoi', 'chiHang'] as const } : inGacTroi ? { number: '05', characters: ['cuoi', 'gacTroi'] as const } : inSparkle ? { number: '04', characters: ['cuoi', 'lapLanh'] as const } : inSurveyor ? { number: '03', characters: ['cuoi', 'matTron'] as const } : scenes[scene];
  const currentText = gacGround ? { title: vi ? (gacTogether ? 'Dưới gốc đa' : 'Theo Thỏ Ngọc') : (gacTogether ? 'Beneath the banyan' : 'Follow Moon Rabbit'), subtitle: vi ? 'Chuyện tưởng tượng · Cuội và những người bạn' : 'An imagined story · Cuội and friends', description: vi ? 'Cuội cùng Gác Trời tìm Thỏ Ngọc, nhặt quà trên đường đến gặp chị Hằng.' : 'Cuội and Sky Watcher find Moon Rabbit and collect presents on their way to Hằng.' } : gacTrail ? { title: vi ? 'Tìm chị Hằng' : 'Finding Hằng', subtitle: vi ? 'Dưới bóng cây đa · Chuyện tưởng tượng' : 'Beneath the banyan · An imagined story', description: vi ? 'Cuội theo bản đồ trong đèn, nhìn kỹ từng manh mối để tìm chị Hằng.' : 'Cuội follows the map in his lantern, looking closely at each clue to find Hằng.' } : inGacTroi ? { title: vi ? 'Bạn Gác Trời' : 'Sky Watcher', subtitle: vi ? 'LRO · Quỹ đạo Mặt Trăng' : 'LRO · Lunar orbit', description: vi ? 'LRO quan sát bề mặt Mặt Trăng từ quỹ đạo. Cuội trò chuyện qua tín hiệu trong câu chuyện tưởng tượng.' : 'LRO observes the lunar surface from orbit. Cuội speaks through a signal in the imagined story.' } : inSparkle ? { title: vi ? 'Bạn Lấp Lánh' : 'A sparkling friend', subtitle: vi ? 'Biển Yên Tĩnh · Apollo 11, 1969' : 'Sea of Tranquility · Apollo 11, 1969', description: vi ? 'Gương phản xạ laser không cần pin hay động cơ: nó trả ánh sáng về phía nguồn.' : 'A laser retroreflector needs no batteries or motor: it returns light toward its source.' } : inSurveyor ? encounterText : t[scene];
  const characterName = (id: keyof typeof portraits) => language === 'en' ? ({ gacTroi: 'Sky Watcher', banhLuoi: 'Mesh Wheels', taiThinh: 'Keen Ears', lapLanh: 'Sparkle', an: 'An', ba: 'Grandma', cuoi: 'Cuội', cayDa: 'Banyan tree', matTron: 'Round Eyes', chiHang: 'Hằng' } as const)[id] : portraits[id].name;

  return <main className="app-shell">
    <header className="site-header">
      <a className="brand" href="#main-scene" aria-label={t.goToScene}><img className="brand-logo" src={brandLogo} alt="" width="52" height="52" decoding="async" /><span>CUỘI<span className="brand-caption">{t.brandCaption}</span></span></a>
      <div className="header-actions"><VisitorCounter language={language} /><label className="language-picker"><span>{language === 'vi' ? 'Ngôn ngữ' : 'Language'}</span><select aria-label={language === 'vi' ? 'Chọn ngôn ngữ' : 'Choose language'} value={language} onChange={(event) => { setLanguage(event.target.value as Language); }}>{languageOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label></div>
    </header>
    <div className="workspace-fit" ref={fittedWorkspace.frame}>
    <div className="workspace" ref={fittedWorkspace.workspace}>
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
          <div ref={gameStage} tabIndex={-1} className={`game-stage ${inSurveyor || inSparkle || inGacTroi ? 'classic-friend-scene' : ''} ${menuOpen ? 'has-menu' : ''} ${chattingAtEnd ? 'has-ending-chat' : ''}`}
            onFocusCapture={() => { gameOwnsFocus.current = true; }}
            onPointerDownCapture={() => { gameOwnsFocus.current = true; }}
            onBlurCapture={(event) => {
              if (event.relatedTarget instanceof Node && event.relatedTarget !== document.body && !event.currentTarget.contains(event.relatedTarget)) gameOwnsFocus.current = false;
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
              if (menuOpen || !(tellingStory || moonStory || questDialogue || surveyorChat || surveyorDigIntro || (inGacTroi && (gacRabbit ? ['real', 'bridge', 'reunion', 'farewell'].includes(rabbitStage!) : (['meeting', 'stories', 't02-intro', 't02-story', 't03-intro', 't03-story', 'gac-farewell'].includes(gacTroiProgress.phase) || gacTroiProgress.phase === 'matching' && gacTroiProgress.turn < gacMatchingIntroLength))))) return;
              if ((event.target as Element).closest('button, select, input, a')) return;
              // The scenery is inert during dialogue; clicking it resumes keyboard dialogue control.
              event.currentTarget.querySelector<HTMLButtonElement>('.dialogue:not([hidden]) .dialogue-next')?.focus({ preventScroll: true });
            }}>
            <div className={`story-canvas ${revealing ? 'journey-revealing' : ''} ${chapter === 'departing' ? 'is-departing' : ''} ${chapter === 'arriving' ? 'is-arriving' : ''}`} inert={menuOpen || tellingStory || moonStory || transitioning || moonWaking || questLocked}>
              {!gacTrail && !gacRabbit && <GameCanvas sparkleLantern={inSparkle && sparkleProgress.phase === 'farewell' && sparkleProgress.turn >= 4 ? sparkleProgress.turn >= 5 ? 'lit' : 'unlit' : 'hidden'} surveyorLantern={surveyorEnding && surveyorProgress.turn >= 6 ? surveyorProgress.turn >= 7 ? 'lit' : 'unlit' : 'hidden'} taiStars={Math.max(litStars, inGacTroi && !gacRabbit && gacTroiProgress.phase === 'gac-farewell' && gacTroiProgress.turn >= 2 ? 5 : 0)} onReady={onCanvasReady} sparkleEnding={inSparkle && ['farewell', 'finished'].includes(sparkleProgress.phase)} sparkleDust={inSparkle && ['arrival', 'meeting', 'dust-photo', 'cleaning-intro', 'cleaning'].includes(sparkleProgress.phase)} onTrailHole={() => setTrailWarning(true)} sparkleTrail={sparkleTrail} freeRoam={endingExploring} excavation={excavation} onDigNear={setDigNear} key={`${journey}-${surveyorEnding ? 'ending' : 'play'}`} initiallyAwake={chapter === 'moon-story' || chapter === 'moon-free'} quest={quest} treeSpeaking={quest === 'tree' && treeTurn >= 2 && !menuOpen} onInteract={endingExploring ? () => setEndingChat(activeLevel) : inSparkle ? () => setSparkleProgress(p => p.phase === 'search' ? { ...p, phase: 'arrival', turn: 0 } : p.phase === 'arrival' ? { ...p, phase: 'meeting', turn: 0 } : p) : surveyorMeeting ? onSurveyorInteract : onBench} onExit={gacWalking ? () => setActiveLevel(null) : endingExploring ? () => setActiveLevel(null) : onExit} scene={inGacTroi ? 'gac-troi' : inSparkle ? 'lap-lanh' : inSurveyor ? 'surveyor' : scene} encounterStarted={inSparkle ? !['route', 'search-intro', 'search'].includes(sparkleProgress.phase) : surveyorProgress.phase !== 'arrival'} moonMode={moonMode} language={language} onAwake={onCuoiAwake} />}
              {tellingStory && turn === 5 && !menuOpen && <span className="an-lantern-glow" aria-hidden="true" />}
            </div>
            {tellingStory && <EarthDialogue key={journey} language={language} lines={storyLines[language].earth} title={t.earthDialogueTitle} finalAction="earth" paused={menuOpen} onComplete={finishEarth} onTurn={setTurn} />}
            {moonStory && <EarthDialogue key={`moon-${journey}`} language={language} lines={storyLines[language].moon} title={t.moonDialogueTitle} finalAction="moon" paused={menuOpen} onComplete={finishMoonStory} onTurn={noopTurn} />}
            {scene === 'moon' && chapter === 'moon-free' && !journeyOpen && !menuOpen && <div className="quest-hud" aria-live="polite">
              <span>{quest === 'bench' ? t.benchGoal : quest === 'tree' ? t.treeTitle : t.trailGoal}</span>
              {['lantern', 'trail', 'complete'].includes(quest) && <strong aria-label={`${t.lantern}: 0/3`}><span aria-hidden="true">☆</span> 0/3</strong>}
            </div>}
            {questDialogue && <EarthDialogue key={`${quest}-${journey}`} language={language} lines={quest === 'tree' ? storyLines[language].tree : storyLines[language].departure} title={t.treeTitle} finalAction={quest === 'tree' ? 'lantern' : 'moon'} paused={menuOpen} onComplete={quest === 'tree' ? receiveLantern : followTracks} onTurn={quest === 'tree' ? setTreeTurn : noopTurn} />}
            {surveyorMeeting && !menuOpen && <div className="surveyor-scene-hud">
              <span>{encounterText.subtitle}</span>
              <button onClick={() => setActiveLevel(null)}>{encounterText.back}</button>
            </div>}
            {surveyorChat && <EarthDialogue key={`surveyor-${journey}`} language={language} lines={surveyorEncounterLines[language]} initialIndex={surveyorProgress.turn} title={encounterText.title} finalAction="moon" finalLabel={encounterText.begin} paused={menuOpen} onComplete={startSurveyorTools} onTurn={onSurveyorTurn} />}
            {surveyorDigIntro && !menuOpen && <div className="surveyor-scene-hud">
              <span>{challengeCopy[language].soilTitle}</span>
              <button onClick={() => setActiveLevel(null)}>{encounterText.back}</button>
            </div>}
            {surveyorDigIntro && <EarthDialogue key={`surveyor-dig-intro-${journey}`} language={language} lines={challengeLines(language, false)} initialIndex={surveyorProgress.turn} title={challengeCopy[language].soilTitle} finalAction="moon" finalLabel={challengeCopy[language].begin} paused={menuOpen} onTurn={turn => { if (turn !== surveyorProgress.turn) setSurveyorProgress({ ...surveyorProgress, turn }); }} onComplete={() => setSurveyorProgress({ ...surveyorProgress, phase: 'soil', turn: 0 })} />}
            {revealing && !menuOpen && <div className="journey-light" role="status">✦<p>{journeyCopy[language].reveal}</p></div>}
            {excavating && <SurveyorExcavation paused={menuOpen} language={language} progress={surveyorProgress} near={digNear} onChange={setSurveyorProgress} onBack={() => setActiveLevel(null)} onBook={openFieldBook} />}
            {surveyorEnding && <SurveyorEnding language={language} progress={surveyorProgress} onChange={setSurveyorProgress} onReplay={playSurveyorAgain} onBack={() => setActiveLevel(null)} paused={menuOpen} />}
            {inSparkle && sparkleProgress.phase === 'search' && trailWarning && <EarthDialogue language={language} paused={menuOpen} title={language === 'vi' ? 'Cuội' : 'Cuội'} lines={[{ id: 'sparkle-hole-warning', speaker: 'cuoi', text: language === 'vi' ? 'Hố này sâu quá, mình đi vào là ngã, đau lắm.' : 'This crater is so deep. If I walk in, I will fall and hurt myself.' }]} onTurn={noopTurn} finalAction="moon" finalLabel={language === 'vi' ? 'Tìm lối khác' : 'Find another way'} onComplete={() => setTrailWarning(false)} />}
            {gacTrail && <GacTroiTrail key={gacTroiProgress.phase} language={language} progress={gacTroiProgress} onChange={setGacTroiProgress} onBook={openFieldBook} onBack={() => setActiveLevel(null)} paused={menuOpen} />}
            {inGacTroi && !gacTrail && <GacTroiLevel language={language} progress={gacTroiProgress} onChange={setGacTroiProgress} onChat={() => setEndingChat('gac-troi')} onBook={openFieldBook} onBack={() => setActiveLevel(null)} paused={menuOpen} />}
            {inSparkle && <SparkleLevel onBook={openFieldBook} language={language} progress={sparkleProgress} onChange={setSparkleProgress} onBack={() => setActiveLevel(null)} paused={menuOpen} />}
            {chattingAtEnd && activeLevel && <section className="ending-scene ending-chat" hidden={menuOpen}><EarthDialogue managedFocus language={language} paused={menuOpen} title={language === 'vi' ? 'Trò chuyện cùng bạn' : 'A chat with your friend'} lines={endingChatLines[activeLevel][language]} onTurn={noopTurn} onComplete={closeEndingChat} finalAction="moon" finalLabel={language === 'vi' ? 'Mình đi xem nhé!' : 'Let’s take a look!'} /></section>}
            {journeyOpen && !inGacTroi && !inSparkle && !surveyorEnding && !excavating && !surveyorMeeting && !surveyorDigIntro && !revealing && !menuOpen && <JourneyMap onFindHang={() => { if (gacTroiProgress.completedOnce) { setGacTroiProgress(p => startGacRabbitJourney({ ...p, t02Done: true })); setActiveLevel('gac-troi'); } }} gacTroiProgress={gacTroiProgress} sparkleProgress={sparkleProgress} language={language} surveyorProgress={surveyorProgress} onSurveyorChange={setSurveyorProgress} onReplay={playSurveyorAgain} activeLevel={activeLevel} onEnter={id => { if (id === 'gac-troi') setGacTroiProgress(p => ({ ...p, rabbitJourney: p.rabbitJourney ? { ...p.rabbitJourney, active: false } : null })); setActiveLevel(id); }} onBack={() => setActiveLevel(null)} />}
            {menuOpen && <GameMenu sound={sound} onToggleSound={toggleSound} soundUnavailable={soundUnavailable} language={language} canContinue={started} onStart={startJourney} onContinue={closeMenu} />}
          </div>
          <p className="chapter-arrival game-instructions">{gameInstructions}</p>
        </div>
        {saveUnavailable && <p className="save-notice" role="status">{t.saveNotice}</p>}
      </section>
      {journeyOpen && !revealing ? <JourneyBook gacTroiProgress={gacTroiProgress} sparkleProgress={sparkleProgress} key={journey} bookRequest={bookRequest} onSurveyorChange={setSurveyorProgress} language={language} surveyorProgress={surveyorProgress} activeLevel={activeLevel} /> : <BookPlaceholder language={language} />}
    </div>
    </div>
    <section className="characters-section" aria-labelledby="characters-title">
      <h2 id="characters-title">{t.cast}</h2>
        <div className="scene-details">
          <div className="cast" aria-label={t.cast}>{current.characters.map((id) => <div className="cast-member" key={id}><span className={`portrait portrait-${id}`}><img src={portraits[id].url} alt="" /></span><span>{characterName(id)}</span></div>)}</div>
          <p>{currentText.description}{inSurveyor && <> <a className="scenery-source" href="https://www.nasa.gov/humans-in-space/lunar-encore-leads-to-first-precision-extraterrestrial-landing/" target="_blank" rel="noreferrer">NASA ↗</a></>}</p>
        </div>
    </section>
    <BookLabelGuide language={language}/>
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
