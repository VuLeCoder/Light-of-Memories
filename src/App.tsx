import { SparkleLevel } from './components/SparkleLevel';
import { freshSparkle } from './content/levels/lap-lanh';
import { SurveyorEnding } from './components/SurveyorEnding';
import { SurveyorExcavation } from './components/SurveyorExcavation';
import type { SurveyorEvent } from './content/levels/surveyor-progress';
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
import { surveyorEncounterCopy, surveyorEncounterLines } from './content/levels/surveyor-encounter';
import { challengeCopy, challengeLines } from './content/levels/surveyor-challenges';
import { freshSurveyor, replaySurveyor } from './content/levels/surveyor-progress';
import type { LevelId } from './content/levels';
import type { MoonQuest } from './game/types';
import { useWorkspaceFit } from './useWorkspaceFit';

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
      </div>
      <BookNavigation language={language} page={0} count={1} onChange={() => {}} />
    </aside>
  </>;
}

export function App() {
  const fittedWorkspace = useWorkspaceFit();
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
  const [surveyorProgress, setSurveyorProgress] = useState(saved.progress.surveyor);
  const [sparkleProgress, setSparkleProgress] = useState(saved.progress.sparkle);
  useEffect(() => {
    if (chapter !== 'idle') setSaveUnavailable(!saveProgress(chapter, quest, completed, activeLevel, surveyorProgress, sparkleProgress));
  }, [chapter, quest, completed, activeLevel, surveyorProgress, sparkleProgress]);
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
  const inSparkle = journeyOpen && activeLevel === 'lap-lanh';
  const sparkleTrail = inSparkle && ['route', 'search-intro', 'search'].includes(sparkleProgress.phase);
  const sparkleWalking = inSparkle && ['arrival', 'search'].includes(sparkleProgress.phase);
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
  const questLocked = inSparkle ? (!sparkleWalking || trailWarning) : questDialogue || (journeyOpen && !surveyorMeeting && !excavating && !endingFreeRoam) || (excavating && surveyorProgress.phase !== 'soil') || surveyorChat;
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
  // Keep focus on a persistent element while the canvas is inert or dialogue unmounts.
  useLayoutEffect(() => {
    if (menuOpen || !gameOwnsFocus.current) return;
    const stage = gameStage.current;
    const target = transitioning || moonWaking ? stage
      : stage?.querySelector<HTMLElement>('.dialogue:not([hidden]) .dialogue-next, .journey-view button, .story-canvas:not([inert]) .game-host');
    (target ?? stage)?.focus({ preventScroll: true });
  }, [chapter, quest, menuOpen, transitioning, moonWaking, revealing, activeLevel, surveyorProgress.phase, sparkleProgress.phase, trailWarning]);
  // T01 can lose its focused button when a dialogue closes or becomes inert.
  // Recover only while the game owns focus; outside pointer presses release it above.
  useEffect(() => {
    if (!inSparkle || !['search', 'arrival'].includes(sparkleProgress.phase) || menuOpen) return;
    const stage = gameStage.current;
    let frame = 0;
    const restoreFocus = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!gameOwnsFocus.current || !document.hasFocus()) return;
        const active = document.activeElement;
        if (active !== document.body && active !== stage) return;
        stage?.querySelector<HTMLElement>('.dialogue:not([hidden]) .dialogue-next, .story-canvas:not([inert]) .game-host')?.focus({ preventScroll: true });
      });
    };
    stage?.addEventListener('focusout', restoreFocus);
    restoreFocus();
    return () => {
      cancelAnimationFrame(frame);
      stage?.removeEventListener('focusout', restoreFocus);
    };
  }, [inSparkle, sparkleProgress.phase, menuOpen, trailWarning]);
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
  const dialogueHelp = vi ? 'Nhấn Space / Enter hoặc bấm nút trong khung thoại để hiện hết câu và tiếp tục.' : 'Press Space / Enter or use the dialogue button to reveal the full line and continue.';
  const moveHelp = vi ? 'Di chuyển bằng A/D, ←/→ hoặc bấm vào mặt đất.' : 'Move with A/D, ←/→, or click the ground.';
  const depthMoveHelp = vi ? 'Di chuyển: WASD / phím mũi tên hoặc chạm mặt đất.' : 'Move: WASD / arrow keys or tap the ground.';
  let gameInstructions = '';
  if (!menuOpen && !transitioning && !moonWaking && !revealing) {
    if (inSparkle) {
      const phase = sparkleProgress.phase;
      if (phase === 'search' && !trailWarning) gameInstructions = `${depthMoveHelp} ${vi ? 'Đi vòng qua các hố đến vầng sáng bên phải.' : 'Go around the craters toward the glow on the right.'}`;
      else if (phase === 'arrival') gameInstructions = `${moveHelp} ${vi ? 'Đến gần Lấp Lánh rồi nhấn E, hoặc bấm vào bạn ấy.' : 'Approach Sparkle and press E, or click the reflector.'}`;
      else if (phase === 'cleaning') gameInstructions = vi
        ? 'Giữ chuột hoặc kéo ngón tay qua các ô kính để lau bụi. Có thể dùng Tab chọn ô, Enter để lau. Lau sạch rồi nhận ảnh.'
        : 'Hold the mouse button or drag your finger across the glass to wipe dust. You can also select a panel with Tab and wipe with Enter. Clean every panel to receive the picture.';
      else if (phase === 'dust-photo') gameInstructions = vi ? 'Bấm “Cất ảnh và tiếp tục” để trò chuyện với Lấp Lánh.' : 'Select “Keep the picture and continue” to talk to Sparkle.';
      else if (phase === 'clean-photo') gameInstructions = vi ? 'Cất ảnh và tiếp tục để mở thử thách khôi phục đường sáng.' : 'Keep the picture and continue to restore the light path.';
      else if (phase === 'repair') gameInstructions = vi ? 'Kéo cụm gương để xoay rồi chọn “Thử tia sáng”. Có thể dùng thanh góc xoay hoặc Tab và phím mũi tên; xem manh mối trong sách.' : 'Drag the mirror pair to rotate it, then try the light. You can also use the rotation slider or Tab and arrow keys; see the book for clues.';
      else if (phase === 'ranging') gameInstructions = vi ? 'Gửi xung sáng, xem manh mối trong sách, nhập các số và chọn dấu. Bấm Nộp kết quả hoặc nhấn Enter để trả lời.' : 'Send a pulse, read the book clue, enter the numbers and choose operators. Click Submit answer or press Enter.';
      else if (phase === 'finished') gameInstructions = vi ? 'Đọc lại manh mối trong sách, về lộ trình hoặc chơi lại đoạn Lấp Lánh.' : 'Revisit the book, return to the route or replay Sparkle’s chapter.';
      else gameInstructions = dialogueHelp;
    }
    else if (tellingStory || moonStory || questDialogue || surveyorChat || surveyorDigIntro) gameInstructions = dialogueHelp;
    else if (inSurveyor) {
      const phase = surveyorProgress.phase;
      if (surveyorMeeting) gameInstructions = `${moveHelp} ${vi ? 'Đến gần Mắt Tròn rồi nhấn E, hoặc bấm vào Mắt Tròn để trò chuyện.' : 'Approach Round Eyes and press E, or click Round Eyes to talk.'}`;
      else if (excavating) gameInstructions = phase === 'soil-memory'
        ? (vi ? 'Bấm nút bên cạnh ảnh để tiếp tục.' : 'Click the button beside the photo to continue.')
        : `${depthMoveHelp} ${vi ? 'Nhấn E để đào; bấm “Gợi ý” khi cần.' : 'Press E to dig. Click “Hint” to check the book if you need help.'}`;
      else if (phase === 'tools') gameInstructions = vi ? 'Bấm chọn công dụng, rồi bấm dụng cụ phù hợp trên hình. Bấm riêng dụng cụ để xem gợi ý.' : 'Choose a purpose, then click the matching tool. Click a tool first to see a hint.';
      else if (phase === 'timeline') gameInstructions = vi ? 'Bấm các ảnh theo thứ tự xảy ra trước đến sau. Bấm lại để bỏ chọn, rồi bấm nút ghép nhật ký khi đủ ba ảnh.' : 'Select the photos from earliest to latest. Select again to undo, then click the journal button when all three are selected.';
      else if (phase === 'timeline-intro') gameInstructions = dialogueHelp;
      else if (endingFreeRoam) gameInstructions = `${depthMoveHelp} ${vi ? 'Đến điểm sáng hoặc bấm “Về lộ trình”.' : 'Walk to the distant light or click “View the route” to return to the route.'}`;
      else if (surveyorEnding) gameInstructions = surveyorProgress.turn >= 3 && surveyorProgress.turn <= 5
        ? (vi ? 'Bấm mũi tên để xem các trang, rồi bấm nút để trở lại Mắt Tròn.' : 'Click the arrows to read the pages, then use the button to return to Round Eyes.')
        : dialogueHelp;
      else gameInstructions = vi ? 'Bấm nút tiếp tục để sang thử thách tiếp theo.' : 'Click the continue button to start the next challenge.';
    } else if (journeyOpen) gameInstructions = vi ? 'Bấm chọn một người bạn, rồi bấm nút bên dưới để đến gặp.' : 'Select a friend, then click the button below to visit.';
    else if (chapter === 'moon-free') gameInstructions = `${moveHelp} ${quest === 'bench' ? t.benchHint : t.trailHint}`;
  }
  const current = inSparkle ? { number: '04', characters: ['cuoi', 'lapLanh'] as const } : inSurveyor ? { number: '03', characters: ['cuoi', 'matTron'] as const } : scenes[scene];
  const currentText = inSparkle ? { title: vi ? 'Bạn Lấp Lánh' : 'A sparkling friend', subtitle: vi ? 'Biển Yên Tĩnh · Apollo 11, 1969' : 'Sea of Tranquility · Apollo 11, 1969', description: vi ? 'Gương phản xạ laser không cần pin hay động cơ: nó trả ánh sáng về phía nguồn.' : 'A laser retroreflector needs no batteries or motor: it returns light toward its source.' } : inSurveyor ? encounterText : t[scene];
  const characterName = (id: keyof typeof portraits) => language === 'en' ? ({ lapLanh: 'Sparkle', an: 'An', ba: 'Grandma', cuoi: 'Cuội', cayDa: 'Banyan tree', matTron: 'Round Eyes', chiHang: 'Hằng' } as const)[id] : portraits[id].name;

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
              if (menuOpen || !(tellingStory || moonStory || questDialogue || surveyorChat || surveyorDigIntro)) return;
              if ((event.target as Element).closest('button, select, input, a')) return;
              // The scenery is inert during dialogue; clicking it resumes keyboard dialogue control.
              event.currentTarget.querySelector<HTMLButtonElement>('.dialogue:not([hidden]) .dialogue-next')?.focus({ preventScroll: true });
            }}>
            <div className={`story-canvas ${revealing ? 'journey-revealing' : ''} ${chapter === 'departing' ? 'is-departing' : ''} ${chapter === 'arriving' ? 'is-arriving' : ''}`} inert={menuOpen || tellingStory || moonStory || transitioning || moonWaking || questLocked}>
              <GameCanvas sparkleDust={inSparkle && ['arrival', 'meeting', 'dust-photo', 'cleaning-intro', 'cleaning'].includes(sparkleProgress.phase)} onTrailHole={() => setTrailWarning(true)} sparkleTrail={sparkleTrail} freeRoam={endingFreeRoam} excavation={excavation} onDigNear={setDigNear} key={`${journey}-${surveyorEnding ? 'ending' : 'play'}`} initiallyAwake={chapter === 'moon-story' || chapter === 'moon-free'} quest={quest} treeSpeaking={quest === 'tree' && treeTurn >= 2 && !menuOpen} onInteract={inSparkle ? () => setSparkleProgress(p => p.phase === 'search' ? { ...p, phase: 'arrival', turn: 0 } : p.phase === 'arrival' ? { ...p, phase: 'meeting', turn: 0 } : p) : surveyorMeeting ? onSurveyorInteract : onBench} onExit={endingFreeRoam ? () => setActiveLevel(null) : onExit} scene={inSparkle ? 'lap-lanh' : inSurveyor ? 'surveyor' : scene} encounterStarted={inSparkle ? !['route', 'search-intro', 'search'].includes(sparkleProgress.phase) : surveyorProgress.phase !== 'arrival'} moonMode={moonMode} language={language} onAwake={onCuoiAwake} />
              {tellingStory && turn === 5 && !menuOpen && <span className="an-lantern-glow" aria-hidden="true" />}
            </div>
            {tellingStory && <EarthDialogue key={journey} language={language} lines={storyLines[language].earth} title={t.earthDialogueTitle} finalAction="earth" paused={menuOpen} onComplete={finishEarth} onTurn={setTurn} />}
            {moonStory && <EarthDialogue key={`moon-${journey}`} language={language} lines={storyLines[language].moon} title={t.moonDialogueTitle} finalAction="moon" paused={menuOpen} onComplete={finishMoonStory} onTurn={noopTurn} />}
            {scene === 'moon' && chapter === 'moon-free' && !journeyOpen && !menuOpen && <div className="quest-hud" aria-live="polite">
              <span>{quest === 'bench' ? t.benchGoal : quest === 'tree' ? t.treeTitle : t.trailGoal}</span>
              {['lantern', 'trail', 'complete'].includes(quest) && <strong aria-label={`${t.lantern}: 0/5`}><span aria-hidden="true">☆</span> 0/5</strong>}
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
            {inSparkle && <SparkleLevel language={language} progress={sparkleProgress} onChange={setSparkleProgress} onBack={() => setActiveLevel(null)} paused={menuOpen} />}
            {journeyOpen && !inSparkle && !surveyorEnding && !excavating && !surveyorMeeting && !surveyorDigIntro && !revealing && !menuOpen && <JourneyMap sparkleProgress={sparkleProgress} language={language} surveyorProgress={surveyorProgress} onSurveyorChange={setSurveyorProgress} onReplay={playSurveyorAgain} activeLevel={activeLevel} onEnter={setActiveLevel} onBack={() => setActiveLevel(null)} />}
            {menuOpen && <GameMenu sound={sound} onToggleSound={toggleSound} soundUnavailable={soundUnavailable} language={language} canContinue={started} onStart={startJourney} onContinue={closeMenu} />}
          </div>
          <p className="chapter-arrival game-instructions">{gameInstructions}</p>
        </div>
        {saveUnavailable && <p className="save-notice" role="status">{t.saveNotice}</p>}
      </section>
      {journeyOpen && !revealing ? <JourneyBook sparkleProgress={sparkleProgress} key={journey} bookRequest={bookRequest} onSurveyorChange={setSurveyorProgress} language={language} surveyorProgress={surveyorProgress} activeLevel={activeLevel} /> : <BookPlaceholder language={language} />}
    </div>
    </div>
    <section className="characters-section" aria-labelledby="characters-title">
      <h2 id="characters-title">{t.cast}</h2>
        <div className="scene-details">
          <div className="cast" aria-label={t.cast}>{current.characters.map((id) => <div className="cast-member" key={id}><span className={`portrait portrait-${id}`}><img src={portraits[id].url} alt="" /></span><span>{characterName(id)}</span></div>)}</div>
          <p>{currentText.description}{inSurveyor && <> <a className="scenery-source" href="https://www.nasa.gov/humans-in-space/lunar-encore-leads-to-first-precision-extraterrestrial-landing/" target="_blank" rel="noreferrer">NASA ↗</a></>}</p>
        </div>
    </section>
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
