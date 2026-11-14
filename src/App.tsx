import { TaiThinhLevel } from './components/friends/tai-thinh/TaiThinhLevel';
import { TaiThinhSceneLabels } from './components/friends/tai-thinh/TaiThinhChallenges';
import { BanhLuoiLevel } from './components/friends/ban-banh-luoi/BanhLuoiLevel';
import { freshTaiThinh } from './content/friends/tai-thinh/progress';
import { banhLuoiGiftPending, freshBanhLuoi } from './content/friends/ban-banh-luoi/progress';
import { banBanhLuoiCopy as banCopy } from './content/friends/ban-banh-luoi/dialogue';
import { playInstructions } from './content/play-instructions';
import { selectMusicMood } from './audio/music-score';
import { gameAudio } from './audio/game-audio';
import { useGameAudio } from './audio/useGameAudio';
import { readAudioSettings, saveAudioSetting, type AudioSettings } from './audio/settings';
import { sparkleHoleWarningLines } from './content/friends/lap-lanh/dialogue';
import { HangFinale } from './components/ending/HangFinale';
import { BookTopline } from './components/book/BookTopline';
import { GacTroiTrail, isGacTrailPhase } from './components/friends/gac-troi/GacTroiTrail';
import { gacMatchingIntroLength } from './content/friends/gac-troi/challenges/matching';
import { GacTroiLevel } from './components/friends/gac-troi/GacTroiLevel';

import { freshGacTroi } from './content/friends/gac-troi/progress';
import { endingChatLines } from './content/story/ending/friend-dialogue';
import { focusGame } from './focus/game-focus';
import { SparkleLevel } from './components/friends/lap-lanh/SparkleLevel';
import { freshSparkle } from './content/friends/lap-lanh/progress';
import { SurveyorEnding } from './components/friends/surveyor/SurveyorEnding';
import { SurveyorExcavation } from './components/friends/surveyor/SurveyorExcavation';
import type { SurveyorEvent } from './content/friends/surveyor/progress';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { JourneyMap, JourneyBook, journeyCopy } from './components/journey/JourneyMap';
import { BookNavigation } from './components/book/BookNavigation';
import { BookLabelGuide } from './components/book/BookContentLabel';
import { EarthDialogue } from './components/shared/EarthDialogue';
import { GameMenu } from './components/shell/GameMenu';
import { VisitorCounter } from './components/shell/VisitorCounter';
import { GameCanvas } from './game/GameCanvas';
import { scenes, type SceneId } from './content/story/opening/scenes';
import { brandLogo, portraits } from './content/assets';
import { copy, languageOptions, readLanguage, type Language } from './content/i18n';
import { storyLines } from './content/story/opening/dialogue';
import { readProgress, saveProgress, type Chapter } from './state/progress';
import { surveyorEncounterCopy, surveyorEncounterLines } from './content/friends/surveyor/dialogue';
import { challengeCopy, challengeLines } from './content/friends/surveyor/challenges/journal';
import { freshSurveyor, replaySurveyor } from './content/friends/surveyor/progress';
import { journeyStatus, type LevelId } from './content/friends/index';
import type { MoonQuest } from './game/types';
import { useWorkspaceFit } from './hooks/useWorkspaceFit';

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
  const [audio, setAudio] = useState(readAudioSettings);
  const [audioSaveFailures, setAudioSaveFailures] = useState<Record<keyof AudioSettings, boolean>>({ music: false, effects: false });
  function toggleAudio(kind: keyof AudioSettings) {
    const next = !audio[kind];
    setAudio({ ...audio, [kind]: next });
    // Apply the independent toggle immediately, including while the menu is open.
    gameAudio.update({ ...audioScene, [kind === 'music' ? 'musicEnabled' : 'effectsEnabled']: kind === 'music' ? next && !inTaiThinh : next });
    if (next) void gameAudio.unlock();
    const failed = !saveAudioSetting(kind, next);
    setAudioSaveFailures(previous => ({ ...previous, [kind]: failed }));
  }
  const [scene, setScene] = useState<SceneId>(saved.progress.scene);
  const [menuOpen, setMenuOpen] = useState(true);
  const [menuStageHeight, setMenuStageHeight] = useState<number | null>(null);
  function openMenu() {
    // Some paused scenes hide their content or change layout. Preserve the
    // current stage's layout height before those pause updates are applied.
    // Computed CSS pixels stay correct inside the workspace's CSS zoom.
    const stage = gameStage.current;
    setMenuStageHeight(stage ? parseFloat(getComputedStyle(stage).height) : null);
    setMenuOpen(true);
  }
  const [started, setStarted] = useState(saved.progress.started);
  const [chapter, setChapter] = useState<Chapter>(saved.progress.chapter);
  const [quest, setQuest] = useState<MoonQuest>(saved.progress.quest);
  const [activeLevel, setActiveLevel] = useState<LevelId | null>(saved.progress.activeLevel);
  const [surveyorProgress, setSurveyorProgress] = useState(saved.progress.surveyor);
  const [gacTroiProgress, setGacTroiProgress] = useState(() => saved.progress.gacTroi);
  const [hangOpen, setHangOpen] = useState(saved.progress.gacTroi.hangArrival === true && saved.progress.activeLevel === 'gac-troi');
  const [starTravel, setStarTravel] = useState(false);
  const previousFarewell = useRef(gacTroiProgress.farewellDone);
  useEffect(() => {
    if (!previousFarewell.current && gacTroiProgress.farewellDone && !gacTroiProgress.completedOnce) return;
    if (!previousFarewell.current && gacTroiProgress.farewellDone && !gacTroiProgress.hangArrival) {
      setStarTravel(true);
      setGacTroiProgress(p => ({ ...p, hangArrival: true }));
    }
    previousFarewell.current = gacTroiProgress.farewellDone;
  }, [gacTroiProgress]);
  useEffect(() => {
    if (!starTravel || menuOpen) return;
    const timer = window.setTimeout(() => { gameAudio.cue('gift'); setHangOpen(true); }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 800);
    return () => window.clearTimeout(timer);
  }, [starTravel, menuOpen]);
  const [taiThinhProgress, setTaiThinhProgress] = useState(saved.progress.taiThinh);
  const [banhLuoiProgress, setBanhLuoiProgress] = useState(saved.progress.banhLuoi);
  const [sparkleProgress, setSparkleProgress] = useState(saved.progress.sparkle);
  useEffect(() => {
    if (chapter !== 'idle') setSaveUnavailable(!saveProgress(chapter, quest, completed, activeLevel, surveyorProgress, sparkleProgress, gacTroiProgress, taiThinhProgress, banhLuoiProgress));
  }, [chapter, quest, completed, activeLevel, surveyorProgress, sparkleProgress, gacTroiProgress, taiThinhProgress, banhLuoiProgress]);
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
  const completedFriends = { surveyor: surveyorProgress.completedOnce, 'lap-lanh': sparkleProgress.completedOnce, 'gac-troi': gacTroiProgress.completedOnce, 'tai-thinh': taiThinhProgress.completedOnce, 'ban-banh-luoi': banhLuoiProgress.completedOnce };
  const inGacTroi = journeyOpen && activeLevel === 'gac-troi' && journeyStatus('gac-troi', completedFriends) !== 'locked';
  const litStars = Object.values(completedFriends).filter(Boolean).length;
  const inBanhLuoi = journeyOpen && activeLevel === 'ban-banh-luoi' && journeyStatus('ban-banh-luoi', completedFriends) !== 'locked';
  const inTaiThinh = journeyOpen && activeLevel === 'tai-thinh' && journeyStatus('tai-thinh', completedFriends) !== 'locked';
  const [banPreview, setBanPreview] = useState(false);
  const [banPreviewProgress, setBanPreviewProgress] = useState(banhLuoiProgress);
  const displayedBan = banPreview ? banPreviewProgress : banhLuoiProgress;
  const banGiftPending = banhLuoiGiftPending(displayedBan);
  const banStars = banPreview && (displayedBan.phase !== 'gift' || banGiftPending) ? 3 : litStars;
  useEffect(() => { setBanPreview(false); }, [activeLevel]);
  const banEnding = displayedBan.phase === 'finished' ? 'free' : displayedBan.phase === 'gift' ? (banGiftPending ? 'gifting' : 'lit') : displayedBan.phase === 'farewell' || banPreview ? 'thanks' : 'none';
  const taiEnding = !inTaiThinh ? 'none' : taiThinhProgress.phase === 'finished' ? 'free' : taiThinhProgress.phase === 'gift' ? (taiThinhProgress.turn === 0 ? 'gifting' : 'lit') : taiThinhProgress.phase === 'farewell' ? 'thanks' : 'none';
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
  const openFieldBook = () => { gameAudio.cue('hint'); setBookRequest(n => n + 1); };
  const surveyorMeeting = inSurveyor && (surveyorProgress.phase === 'arrival' || surveyorProgress.phase === 'dialogue');
  const surveyorEnding = inSurveyor && surveyorProgress.phase === 'complete';
  const endingFreeRoam = surveyorEnding && surveyorProgress.turn >= 10;
  const surveyorDigIntro = inSurveyor && surveyorProgress.phase === 'soil-intro';
  const surveyorChat = surveyorMeeting && surveyorProgress.phase === 'dialogue';
  const encounterText = surveyorEncounterCopy[language];
  const gacTrail = inGacTroi && isGacTrailPhase(gacTroiProgress.phase);
  const gacWalking = inGacTroi && gacTroiProgress.phase === 'gac-free';
  const endingExploring = (inTaiThinh && taiThinhProgress.phase === 'finished') || (inBanhLuoi && banhLuoiProgress.phase === 'finished' && !banPreview) || gacWalking || endingFreeRoam || (inSparkle && sparkleProgress.phase === 'finished');
  const [endingChat, setEndingChat] = useState<LevelId | null>(null);
  const chattingAtEnd = endingExploring && endingChat === activeLevel;
  useEffect(() => { setEndingChat(null); }, [activeLevel, endingExploring]);
  const closeEndingChat = () => {
    setEndingChat(null);
    gameStage.current?.querySelector<HTMLElement>('.game-host')?.focus({ preventScroll: true });
  };
  const questLocked = hangOpen || starTravel || chattingAtEnd || ( inBanhLuoi ? banPreview || !['approach','finished'].includes(banhLuoiProgress.phase) : inTaiThinh ? !['approach', 'finished'].includes(taiThinhProgress.phase) : inSparkle ? (!sparkleWalking || trailWarning) : questDialogue || (journeyOpen && !surveyorMeeting && !excavating && !endingFreeRoam && !gacWalking) || (excavating && surveyorProgress.phase !== 'soil') || surveyorChat);
  const moonMode = menuOpen ? 'paused' : questLocked ? 'story' : chapter === 'moon-waking' ? 'wake' : moonStory ? 'story' : chapter === 'moon-free' ? 'free' : 'sleep';
  const [replayEndingMusic, setReplayEndingMusic] = useState(false);
  const audioScene = {
    endingSuspended: menuOpen,
    endingMusic: tellingStory || (hangOpen && ([3, 5].includes(gacTroiProgress.finale?.stage ?? 0) || replayEndingMusic)),
    musicEnabled: audio.music && !inTaiThinh, effectsEnabled: audio.effects, paused: false, effectsPaused: menuOpen || !started,
    mood: selectMusicMood({ menuOpen, hangOpen, inSurveyor: inSurveyor || inBanhLuoi, inSparkle, inGacTroi }),
    duck: !menuOpen && (tellingStory || moonStory || questDialogue || surveyorChat || surveyorDigIntro || chattingAtEnd || transitioning || hangOpen
      || (surveyorEnding && !endingFreeRoam) || (inSparkle && !sparkleWalking) || (inBanhLuoi && !['approach', 'finished'].includes(displayedBan.phase)) || (inGacTroi && !gacWalking)),
  };
  const audioUnavailable = useGameAudio(audioScene);

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
  const receiveLantern = useCallback(() => { gameAudio.cue('gift'); setQuest(value => value === 'tree' ? 'lantern' : value); }, []);
  const followTracks = useCallback(() => setQuest('trail'), []);
  useEffect(() => {
    if (!revealing || menuOpen) return;
    const timer = window.setTimeout(() => setRevealing(false), 1800);
    return () => window.clearTimeout(timer);
  }, [revealing, menuOpen]);
  // A new scene starts at the top of the shared scroll viewport.
  useLayoutEffect(() => {
    gameStage.current?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [chapter, quest, activeLevel, surveyorProgress.phase, sparkleProgress.phase, taiThinhProgress.phase, displayedBan.phase, banPreview, gacTroiProgress.phase, menuOpen]);
  // Keep focus on a persistent element while the canvas is inert or dialogue unmounts.
  useLayoutEffect(() => {
    if (menuOpen || !gameOwnsFocus.current) return;
    const stage = gameStage.current;
    if (transitioning || moonWaking) stage?.focus({ preventScroll: true });
    else focusGame(stage);
  }, [chapter, quest, menuOpen, transitioning, moonWaking, revealing, activeLevel, surveyorProgress.phase, sparkleProgress.phase, taiThinhProgress.phase, displayedBan.phase, banPreview, gacTroiProgress.phase, trailWarning, chattingAtEnd, canvasReady]);
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
    setTaiThinhProgress(freshTaiThinh());
    setBanhLuoiProgress(freshBanhLuoi());
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
  const instruction = (key: keyof typeof playInstructions) => playInstructions[key][vi ? 0 : 1];
  let gameInstructions: string = instruction('dialogue');
  if (endingExploring && !chattingAtEnd) gameInstructions = inSurveyor ? depthMoveHelp : moveHelp;
  else if (inSurveyor) {
    const phase = surveyorProgress.phase;
    if (phase === 'arrival') gameInstructions = `${depthMoveHelp} ${vi ? 'Bấm Mắt Tròn để tới trò chuyện.' : 'Click Round Eye to walk over and talk.'}`;
    else if (phase === 'tools') gameInstructions = instruction('tools');
    else if (phase === 'memory' || phase === 'soil-memory') gameInstructions = instruction('photo');
    else if (phase === 'soil') gameInstructions = instruction('dig');
    else if (phase === 'digging') gameInstructions = instruction('digging');
    else if (phase === 'timeline') gameInstructions = instruction('journal');
    else if (phase === 'complete' && surveyorProgress.turn >= 3 && surveyorProgress.turn <= 5) gameInstructions = instruction('photo');
  } else if (inSparkle) {
    const phase = sparkleProgress.phase;
    if (phase === 'search' && !trailWarning) gameInstructions = instruction('search');
    else if (phase === 'arrival') gameInstructions = `${moveHelp} ${vi ? 'Bấm Lấp Lánh để tới trò chuyện.' : 'Click Twinkle to walk over and talk.'}`;
    else if (phase === 'cleaning') gameInstructions = instruction('cleaning');
    else if (phase === 'repair') gameInstructions = instruction('repair');
    else if (phase === 'ranging') gameInstructions = instruction('ranging');
    else if (phase === 'finished') gameInstructions = `${moveHelp} ${vi ? 'Đi tới những vòng rung bên phải để về lộ trình và gặp Tai Thính.' : 'Walk to the ground ripples on the right to return to the route and meet Sharp Ear.'}`;
    else if (phase === 'dust-photo' || phase === 'clean-photo' || phase === 'farewell' && [1, 2].includes(sparkleProgress.turn)) gameInstructions = instruction('photo');
  } else if (inGacTroi) {
    const phase = gacTroiProgress.phase;
    if (phase === 'matching' && gacTroiProgress.turn >= gacMatchingIntroLength) gameInstructions = instruction('matching');
    else if (phase === 't02-search') gameInstructions = instruction('impact');
    else if (['t03-walk', 't03-dark-intro', 't03-map'].includes(phase)) gameInstructions = instruction('shadow');
    else if (phase === 't03-story' && gacTroiProgress.turn >= 2) gameInstructions = instruction('photo');
    else if (['t04-slope', 't04-rock', 't04-banyan'].includes(phase)) gameInstructions = instruction('trail');
  } else if (journeyOpen) gameInstructions = instruction('route');
  else if (chapter === 'moon-free' && !questDialogue) {
    gameInstructions = `${moveHelp} ${quest === 'bench' ? t.benchHint : t.trailHint}`;
  }
  if (inBanhLuoi) {
      gameInstructions = displayedBan.phase === 'wheels' ? banCopy['footer.wheels'][language] : (displayedBan.phase === 'photoA' || displayedBan.phase === 'photoB' && displayedBan.turn === 1) ? banCopy['footer.photo'][language] : displayedBan.phase === 'routePuzzle' ? banCopy['footer.route'][language] : displayedBan.phase === 'guiding' ? banCopy['footer.guide'][language] : ['recallA','recallB'].includes(displayedBan.phase) ? banCopy['footer.recall'][language] : displayedBan.phase === 'finished' ? `${moveHelp} ${banCopy['footer.finished'][language]}` : banGiftPending ? banCopy['footer.gift'][language] : banCopy[displayedBan.phase === 'approach' ? 'footer.walk' : 'footer.dialogue'][language];
    } else if (inTaiThinh) {
      gameInstructions = taiThinhProgress.phase === 'gift' && taiThinhProgress.turn === 0 ? (vi ? 'Ánh sáng đang tới chiếc đèn. Bạn có thể mở menu để tạm dừng.' : 'The light is reaching the lantern. Open the menu to pause.') : ['recallA', 'recallB', 'recallC'].includes(taiThinhProgress.phase) ? (vi ? 'Dùng nút Trang trước / Trang tiếp bằng chuột, chạm hoặc Tab và Enter/Space.' : 'Use Previous / Next with mouse, touch, or Tab and Enter/Space.') : taiThinhProgress.phase === 'finished' ? `${moveHelp} ${vi ? 'Đi tới dấu bánh xe bên phải để về lộ trình và gặp Bánh Lưới.' : 'Walk to the wheel tracks on the right to return to the route and meet Mesh Wheels.'}` : taiThinhProgress.phase === 'approach' ? `${moveHelp} ${vi ? 'Đến gần cụm thiết bị rồi nhấn E, hoặc bấm vào cụm thiết bị.' : 'Approach the instruments and press E, or click the instruments.'}` : ['route', 'arrival', 'meeting', 'recordsIntro', 'afterRecords', 'ringingIntro', 'afterRinging', 'rhythmIntro', 'afterRhythm', 'afterPhotoC', 'memoriesIntro', 'farewell', 'gift'].includes(taiThinhProgress.phase) ? instruction('dialogue') : taiThinhProgress.phase === 'identify' ? (vi ? 'Bấm thiết bị để xem manh mối, rồi xác nhận lựa chọn. Dùng Tab và Enter/Space hoặc bấm “Gợi ý” để đọc sách.' : 'Inspect an instrument, then confirm your choice. Use Tab and Enter/Space, or select “Hint” to read the book.') : taiThinhProgress.phase === 'records' ? (vi ? 'Chọn bản ghi, đọc ghi chú rồi chọn nhãn. Dùng chuột/chạm hoặc Tab và Enter/Space; các cặp đúng được giữ lại.' : 'Choose a record, read its note, then select a label. Use mouse/touch or Tab and Enter/Space; correct matches stay in place.') : ['graph', 'duration'].includes(taiThinhProgress.phase) ? (vi ? 'Chọn đồ thị, rồi chọn thời lượng. Sai ở bước sau vẫn giữ bước trước; bấm “Gợi ý” để đọc sách.' : 'Choose a graph, then a duration. Correct steps stay saved; select “Hint” to read the book.') : taiThinhProgress.phase === 'rhythm' ? (vi ? 'Xem mẫu và nhịp từng phiến đá, rồi chọn chuỗi trùng khớp. Không cần âm thanh hoặc bấm theo nhịp.' : 'Watch the sample and each stone, then choose the matching sequence. No sound or timed tapping needed.') : ['photoA', 'photoB', 'photoC'].includes(taiThinhProgress.phase) ? (vi ? 'Bấm “Cất ảnh và tiếp tục” để thêm ảnh vào sách.' : 'Select “Keep the photo and continue” to add it to the book.') : (vi ? 'Tiến trình đã được lưu. Bạn có thể quay lại lộ trình.' : 'Your progress is saved. You can return to the route.');
    }
  if (chattingAtEnd) gameInstructions = instruction('dialogue');
  if (hangOpen) {
    const stage = gacTroiProgress.finale?.stage ?? 0;
    gameInstructions = instruction(stage === 1 ? 'cards' : stage === 3 ? 'automatic' : stage === 5 ? 'credits' : stage === 4 ? 'closing' : 'dialogue');
  }
  if (menuOpen) gameInstructions = vi ? 'Chọn Tiếp tục để trở về cảnh. Mở Hướng dẫn trong menu để xem các chức năng chung.' : 'Choose Continue to return to the scene. Open How to play in the menu for general controls.';
  else if (transitioning || moonWaking || revealing) gameInstructions = vi ? 'Đang chuyển cảnh, bạn chờ một chút nhé.' : 'The scene is changing. Please wait a moment.';
  const endingEarth = (hangOpen && (gacTroiProgress.finale?.stage ?? 0) >= 3);
  const meetingHang = hangOpen && !endingEarth;
  const current = inTaiThinh ? { number: '05', characters: ['cuoi', 'taiThinh'] as const } : inBanhLuoi ? { number: '06', characters: ['cuoi', 'banhLuoi'] as const } : endingEarth ? { number: '08', characters: ['an', 'ba'] as const } : (meetingHang || gacTrail) ? { number: '07', characters: ['cuoi', 'chiHang'] as const } : inGacTroi ? { number: '07', characters: ['cuoi', 'gacTroi'] as const } : inSparkle ? { number: '04', characters: ['cuoi', 'lapLanh'] as const } : inSurveyor ? { number: '03', characters: ['cuoi', 'matTron'] as const } : scenes[scene];
  const currentText = inTaiThinh ? { title: vi ? 'Bạn Tai Thính' : 'Sharp Ear', subtitle: 'Apollo 12 · 1969', description: vi ? 'Địa chấn kế đo những rung động rất nhỏ của đất.' : 'A seismometer measures tiny ground vibrations.' } : inBanhLuoi ? { title: vi ? 'Bạn Bánh Lưới' : 'Mesh Wheels', subtitle: 'Apollo 15 · Hadley–Apennine', description: vi ? 'Xe có người lái giúp phi hành gia khảo sát và mang mẫu về tàu.' : 'A crewed rover helped astronauts explore and bring samples back.' } : endingEarth ? { title: vi ? 'An và Bà' : 'An and Grandma', subtitle: vi ? 'Dưới ánh trăng quê nhà' : 'Under the moon at home', description: vi ? 'Câu chuyện khép lại, những đóng góp vẫn được nhớ đến.' : 'The story ends; their contributions are remembered.' } : meetingHang ? { title: vi ? 'Cuội và chị Hằng' : 'Cuội and Hằng', subtitle: vi ? 'Dưới gốc đa · Chuyện tưởng tượng' : 'Beneath the banyan · An imagined story', description: vi ? 'Cuội gặp chị Hằng, kể lại hành trình và cùng nhớ những đóng góp của các người bạn.' : 'Cuội meets Hằng, shares his journey and remembers his friends’ contributions.' } : gacTrail ? { title: vi ? 'Tìm chị Hằng' : 'Finding Hằng', subtitle: vi ? 'Dưới bóng cây đa · Chuyện tưởng tượng' : 'Beneath the banyan · An imagined story', description: vi ? 'Cuội theo bản đồ trong đèn, nhìn kỹ từng manh mối để tìm chị Hằng.' : 'Cuội follows the map in his lantern, looking closely at each clue to find Hằng.' } : inGacTroi ? { title: vi ? 'Bạn Gác Trời' : 'Sky Watcher', subtitle: vi ? 'LRO · Quỹ đạo Mặt Trăng' : 'LRO · Lunar orbit', description: vi ? 'LRO quan sát bề mặt Mặt Trăng từ quỹ đạo. Cuội trò chuyện qua tín hiệu trong câu chuyện tưởng tượng.' : 'LRO observes the lunar surface from orbit. Cuội speaks through a signal in the imagined story.' } : inSparkle ? { title: vi ? 'Bạn Lấp Lánh' : 'A sparkling friend', subtitle: vi ? 'Biển Yên Tĩnh · Apollo 11, 1969' : 'Sea of Tranquility · Apollo 11, 1969', description: vi ? 'Gương phản xạ laser không cần pin hay động cơ: nó trả ánh sáng về phía nguồn.' : 'A laser retroreflector needs no batteries or motor: it returns light toward its source.' } : inSurveyor ? encounterText : t[scene];
  const characterName = (id: keyof typeof portraits) => language === 'en' ? ({ gacTroi: 'Sky Watcher', banhLuoi: 'Mesh Wheels', taiThinh: 'Sharp Ear', lapLanh: 'Twinkle', an: 'An', ba: 'Grandma', cuoi: 'Cuội', cayDa: 'Banyan tree', matTron: 'Round Eye', chiHang: 'Hằng' } as const)[id] : portraits[id].name;

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
          <button className="open-menu" disabled={menuOpen || transitioning || moonWaking || revealing} onClick={openMenu}>{t.menu}</button>
        </div>
      </div>
      <section className="game-panel" id="main-scene" aria-label={t.sceneArea}>
        <div className="scene-frame">
          <div ref={gameStage} tabIndex={-1} className={`game-stage ${inSurveyor || inSparkle || inTaiThinh || inBanhLuoi || inGacTroi ? 'classic-friend-scene' : ''} ${menuOpen ? 'has-menu' : ''} ${chattingAtEnd ? 'has-ending-chat' : ''}`}
            style={menuOpen && menuStageHeight !== null ? { height: menuStageHeight, minHeight: 0, maxHeight: 'none' } : undefined}
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
              if (menuOpen || !(tellingStory || moonStory || questDialogue || surveyorChat || surveyorDigIntro || (inGacTroi && (['meeting', 'stories', 't02-intro', 't02-story', 't03-intro', 't03-story', 'gac-farewell'].includes(gacTroiProgress.phase) || gacTroiProgress.phase === 'matching' && gacTroiProgress.turn < gacMatchingIntroLength)))) return;
              if ((event.target as Element).closest('button, select, input, a')) return;
              // The scenery is inert during dialogue; clicking it resumes keyboard dialogue control.
              event.currentTarget.querySelector<HTMLButtonElement>('.dialogue:not([hidden]) .dialogue-next')?.focus({ preventScroll: true });
            }}>
            <div className={`story-canvas ${revealing ? 'journey-revealing' : ''} ${chapter === 'departing' ? 'is-departing' : ''} ${chapter === 'arriving' ? 'is-arriving' : ''}`} inert={menuOpen || tellingStory || moonStory || transitioning || moonWaking || questLocked}>
              {!gacTrail && !(inBanhLuoi && displayedBan.phase === 'guiding') && <GameCanvas taiEnding={inBanhLuoi ? banEnding : taiEnding} onTaiGift={() => { if (inBanhLuoi) { if (banPreview) setBanPreviewProgress(p => ({ ...p, turn: 1 })); else setBanhLuoiProgress(p => ({ ...p, turn: 1, completedOnce: true })); } else if (inTaiThinh) setTaiThinhProgress(p => ({ ...p, turn: 1, completedOnce: true })); }} sparkleLantern={inSparkle && sparkleProgress.phase === 'farewell' && sparkleProgress.turn >= 4 ? sparkleProgress.turn >= 5 ? 'lit' : 'unlit' : 'hidden'} surveyorLantern={surveyorEnding && surveyorProgress.turn >= 6 ? surveyorProgress.turn >= 7 ? 'lit' : 'unlit' : 'hidden'} taiStars={Math.max(inBanhLuoi ? banStars : litStars, inGacTroi && gacTroiProgress.phase === 'gac-farewell' && gacTroiProgress.turn >= 2 ? 5 : 0)} onReady={onCanvasReady} sparkleEnding={inSparkle && ['farewell', 'finished'].includes(sparkleProgress.phase)} sparkleDust={inSparkle && ['arrival', 'meeting', 'dust-photo', 'cleaning-intro', 'cleaning'].includes(sparkleProgress.phase)} onTrailHole={() => setTrailWarning(true)} sparkleTrail={sparkleTrail} freeRoam={endingExploring} excavation={excavation} onDigNear={setDigNear} key={`${journey}-${surveyorEnding ? 'ending' : 'play'}`} initiallyAwake={chapter === 'moon-story' || chapter === 'moon-free'} quest={quest} treeSpeaking={quest === 'tree' && treeTurn >= 2 && !menuOpen} onInteract={endingExploring ? () => setEndingChat(activeLevel) : inBanhLuoi ? () => setBanhLuoiProgress(p => p.phase === 'approach' ? { ...p, phase: 'meeting', turn: 0 } : p) : inTaiThinh ? () => setTaiThinhProgress(p => p.phase === 'approach' ? { ...p, phase: 'arrival', turn: 0 } : p) : inSparkle ? () => setSparkleProgress(p => p.phase === 'search' ? { ...p, phase: 'arrival', turn: 0 } : p.phase === 'arrival' ? { ...p, phase: 'meeting', turn: 0 } : p) : surveyorMeeting ? onSurveyorInteract : onBench} onExit={gacWalking ? () => setActiveLevel(null) : endingExploring ? () => setActiveLevel(null) : onExit} scene={inBanhLuoi ? 'ban-banh-luoi' : inTaiThinh ? 'tai-thinh' : inGacTroi ? 'gac-troi' : inSparkle ? 'lap-lanh' : inSurveyor ? 'surveyor' : scene} encounterStarted={inTaiThinh ? !['route', 'approach'].includes(taiThinhProgress.phase) : inBanhLuoi ? !['route', 'approach'].includes(displayedBan.phase) : inSparkle ? !['route', 'search-intro', 'search'].includes(sparkleProgress.phase) : surveyorProgress.phase !== 'arrival'} moonMode={moonMode} language={language} onAwake={onCuoiAwake} />}
              {tellingStory && turn === 5 && !menuOpen && <span className="an-lantern-glow" aria-hidden="true" />}
            </div>
            {inTaiThinh && taiThinhProgress.phase === 'approach' && !menuOpen && <TaiThinhSceneLabels language={language}/>}
            {tellingStory && <EarthDialogue key={journey} autoAdvance autoAdvanceDelay={1100} language={language} lines={storyLines[language].earth} title={t.earthDialogueTitle} finalAction="earth" paused={menuOpen} onComplete={finishEarth} onTurn={setTurn} />}
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
            {surveyorEnding && <SurveyorEnding stars={litStars} language={language} progress={surveyorProgress} onChange={setSurveyorProgress} onReplay={playSurveyorAgain} onBack={() => setActiveLevel(null)} paused={menuOpen} />}
            {inSparkle && sparkleProgress.phase === 'search' && trailWarning && <EarthDialogue language={language} paused={menuOpen} title={language === 'vi' ? 'Cuội' : 'Cuội'} lines={sparkleHoleWarningLines(language)} onTurn={noopTurn} finalAction="moon" finalLabel={language === 'vi' ? 'Tìm lối khác' : 'Find another way'} onComplete={() => setTrailWarning(false)} />}
            {gacTrail && <GacTroiTrail key={gacTroiProgress.phase} language={language} progress={gacTroiProgress} onChange={setGacTroiProgress} onBook={openFieldBook} onBack={() => setActiveLevel(null)} paused={menuOpen} />}
            {inGacTroi && !gacTrail && !hangOpen && <GacTroiLevel litStars={litStars} language={language} progress={gacTroiProgress} onChange={setGacTroiProgress} onBook={openFieldBook} onBack={() => setActiveLevel(null)} paused={menuOpen} />}
            {inBanhLuoi && <BanhLuoiLevel stars={banStars} previewProgress={banPreviewProgress} onPreviewChange={setBanPreviewProgress} preview={banPreview} onPreview={setBanPreview} onHint={openFieldBook} language={language} progress={banhLuoiProgress} onChange={setBanhLuoiProgress} onBack={() => setActiveLevel(null)} paused={menuOpen} />}
            {inTaiThinh && <TaiThinhLevel stars={litStars} onBook={openFieldBook} language={language} progress={taiThinhProgress} onChange={setTaiThinhProgress} onBack={() => setActiveLevel(null)} paused={menuOpen} />}
            {inSparkle && <SparkleLevel stars={litStars} onBook={openFieldBook} language={language} progress={sparkleProgress} onChange={setSparkleProgress} onBack={() => setActiveLevel(null)} paused={menuOpen} />}
            {hangOpen && <HangFinale onReplayCreditsChange={setReplayEndingMusic} language={language} progress={gacTroiProgress} onChange={setGacTroiProgress} paused={menuOpen} onBack={() => { setHangOpen(false); setActiveLevel(null); }} onBook={openFieldBook}/>}
            {starTravel && <div className="star-travel" style={{ animationPlayState: menuOpen ? 'paused' : 'running' }} onAnimationEnd={() => { setStarTravel(false); }} />}
            {chattingAtEnd && activeLevel && <section className="ending-scene ending-chat" hidden={menuOpen}><EarthDialogue managedFocus language={language} paused={menuOpen} title={language === 'vi' ? 'Trò chuyện cùng bạn' : 'A chat with your friend'} lines={endingChatLines[activeLevel][language]} onTurn={noopTurn} onComplete={closeEndingChat} finalAction="moon" finalLabel={language === 'vi' ? 'Mình đi xem nhé!' : 'Let’s take a look!'} /></section>}
            {journeyOpen && !inTaiThinh && !inBanhLuoi && !inGacTroi && !inSparkle && !surveyorEnding && !excavating && !surveyorMeeting && !surveyorDigIntro && !revealing && !menuOpen && <JourneyMap taiThinhProgress={taiThinhProgress} banhLuoiProgress={banhLuoiProgress} onFindHang={() => { if (gacTroiProgress.completedOnce) { if (!gacTroiProgress.hangArrival) gameAudio.cue('gift'); setGacTroiProgress(p => ({ ...p, hangArrival: true })); setHangOpen(true); setActiveLevel('gac-troi'); } }} gacTroiProgress={gacTroiProgress} sparkleProgress={sparkleProgress} language={language} surveyorProgress={surveyorProgress} onSurveyorChange={setSurveyorProgress} onReplay={playSurveyorAgain} activeLevel={activeLevel} onEnter={id => { setHangOpen(false); setActiveLevel(id); }} onBack={() => setActiveLevel(null)} />}
            {menuOpen && <GameMenu audio={audio} onToggleAudio={toggleAudio} audioSaveUnavailable={audioSaveFailures.music || audioSaveFailures.effects} audioUnavailable={audioUnavailable} language={language} canContinue={started} onStart={startJourney} onContinue={closeMenu} />}
          </div>
          <p className="chapter-arrival game-instructions" aria-label={vi ? 'Hướng dẫn cảnh hiện tại' : 'Current scene instructions'}>{inBanhLuoi && displayedBan.phase === 'guiding' && !menuOpen ? <span id="ban-guide-instructions" role="status"/> : gameInstructions}</p>
        </div>
        {saveUnavailable && <p className="save-notice" role="status">{t.saveNotice}</p>}
      </section>
      {journeyOpen && !revealing ? <JourneyBook taiThinhProgress={taiThinhProgress} banhLuoiProgress={banhLuoiProgress} gacTroiProgress={gacTroiProgress} sparkleProgress={sparkleProgress} key={journey} bookRequest={bookRequest} onSurveyorChange={setSurveyorProgress} language={language} surveyorProgress={surveyorProgress} activeLevel={activeLevel} /> : <BookPlaceholder language={language} />}
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
