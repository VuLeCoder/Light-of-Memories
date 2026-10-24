import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { GameSceneId, MoonQuest, PreviewOptions } from './types';
import { VIEW } from './types';
import { copy, type Language } from '../content/i18n';
import { surveyorEncounterCopy } from '../content/levels/surveyor-encounter';

const canvasLabel = (scene: GameSceneId, language: Language) => scene === 'tai-thinh' ? (language === 'vi' ? 'Đại Dương Bão — cụm thiết bị Apollo 12' : 'Ocean of Storms — Apollo 12 instruments') : scene === 'lap-lanh' ? (language === 'vi' ? 'Biển Yên Tĩnh — gặp Lấp Lánh' : 'Sea of Tranquility — meet Sparkle') : scene === 'surveyor'
  ? surveyorEncounterCopy[language].canvas : scene === 'earth' ? copy[language].canvasEarth : copy[language].canvasMoon;

function containGameKey(event: KeyboardEvent<HTMLDivElement>) {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'Enter', 'NumpadEnter'].includes(event.code)) return;
  // Bubble phase: Phaser receives the native event before we suppress page behavior.
  event.preventDefault();
  event.stopPropagation();
}

export function GameCanvas({ initiallyAwake, onReady, taiEnding = 'none', taiStars = 0, onTaiGift, sparkleEnding = false, sparkleDust = false, sparkleTrail = false, onTrailHole, freeRoam = false, excavation, onDigNear, encounterStarted = false, scene, moonMode, language, quest, treeSpeaking, onInteract, onExit, onAwake }: {
  onReady?: () => void;
  taiEnding?: PreviewOptions['taiEnding']; taiStars?: number; onTaiGift?: () => void;
  sparkleEnding?: boolean; sparkleDust?: boolean; freeRoam?: boolean; sparkleTrail?: boolean; onTrailHole?: PreviewOptions['onTrailHole'];
  excavation?: PreviewOptions['excavation']; onDigNear?: PreviewOptions['onDigNear'];
  initiallyAwake: boolean; encounterStarted?: boolean; scene: GameSceneId; moonMode: 'sleep' | 'wake' | 'story' | 'free' | 'paused';
  language: Language; quest: MoonQuest; treeSpeaking: boolean; onInteract: () => void; onExit: () => void;
  onAwake: () => void;
}) {
  const readyRef = useRef(onReady);
  readyRef.current = onReady;
  const awakeRef = useRef(initiallyAwake);
  awakeRef.current = initiallyAwake;
  const progressRef = useRef({ quest, treeSpeaking, onInteract, onExit, encounterStarted, excavation, onDigNear, freeRoam, taiEnding, taiStars, onTaiGift, sparkleEnding, sparkleDust, sparkleTrail, onTrailHole });
  progressRef.current = { quest, treeSpeaking, onInteract, onExit, encounterStarted, excavation, onDigNear, freeRoam, taiEnding, taiStars, onTaiGift, sparkleEnding, sparkleDust, sparkleTrail, onTrailHole };
  const host = useRef<HTMLDivElement>(null);
  const onAwakeRef = useRef(onAwake);
  onAwakeRef.current = onAwake;
  const moonModeRef = useRef(moonMode);
  moonModeRef.current = moonMode;
  const languageRef = useRef(language);
  languageRef.current = language;
  const phaserScene = useRef<import('./PreviewScene').PreviewScene | null>(null);
  const [status, setStatus] = useState<{ kind: 'loading' | 'error'; assets?: string[] }>({ kind: 'loading' });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current!;
    let cancelled = false;
    let game: import('phaser').Game | undefined;
    let observer: ResizeObserver | undefined;
    let resizeFrame: number | undefined;
    setReady(false);
    setStatus({ kind: 'loading' });

    // Import after mount; cancellation prevents duplicate instances in StrictMode.
    // Canvas text keeps its rasterized fallback unless the font loads before creation.
    const textFont = document.fonts.load('400 22px "Be Vietnam Pro"', 'Đến gần để trò chuyện').catch(() => []);
    void Promise.all([import('phaser'), import('./PreviewScene'), textFont]).then(([{ default: Phaser }, { PreviewScene }]) => {
      if (cancelled) return;
      const previewScene = new PreviewScene({
        initiallyAwake: awakeRef.current,
        taiEnding: progressRef.current.taiEnding,
        taiStars: progressRef.current.taiStars,
        onTaiGift: () => { if (!cancelled) progressRef.current.onTaiGift?.(); },
        sparkleEnding: progressRef.current.sparkleEnding,
        sparkleDust: progressRef.current.sparkleDust,
        sparkleTrail: progressRef.current.sparkleTrail,
        onTrailHole: () => { if (!cancelled) progressRef.current.onTrailHole?.(); },
        freeRoam: progressRef.current.freeRoam,
        excavation: progressRef.current.excavation,
        onDigNear: id => progressRef.current.onDigNear?.(id),
        encounterStarted: progressRef.current.encounterStarted,
        quest: progressRef.current.quest, treeSpeaking: progressRef.current.treeSpeaking,
        onInteract: () => { if (!cancelled) progressRef.current.onInteract(); },
        onExit: () => { if (!cancelled) progressRef.current.onExit(); },
        scene, moonMode: moonModeRef.current, language: languageRef.current,
        onAwake: () => { if (!cancelled) onAwakeRef.current(); },
        onReady: () => {
          // Reveal overlays only after the scenery has reached the canvas.
          previewScene.game.events.once(Phaser.Core.Events.POST_RENDER, () => {
            if (!cancelled) { setReady(true); setStatus({ kind: 'loading' }); readyRef.current?.(); }
          });
        },
        onError: (assets) => { if (!cancelled) { setReady(false); setStatus({ kind: 'error', assets }); } },
      });
      phaserScene.current = previewScene;
      game = new Phaser.Game({
        type: Phaser.AUTO, parent: element, width: VIEW.width, height: VIEW.height,
        backgroundColor: '#101d2b', pixelArt: true, antialias: false,
        audio: { noAudio: true },
        autoFocus: false,
        input: { keyboard: { target: element, capture: [13, 32, 37, 38, 39, 40] } },
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: VIEW.width, height: VIEW.height },
        scene: previewScene,
        callbacks: { postBoot: (instance) => {
          instance.canvas.setAttribute('aria-label', canvasLabel(scene, languageRef.current));
          instance.canvas.setAttribute('role', 'img');
        } },
      });
      previewScene.setMoonMode(moonModeRef.current);
      let previousWidth = -1;
      let previousHeight = -1;
      observer = new ResizeObserver(([entry]) => {
        if (cancelled || !entry) return;
        const { width, height } = entry.contentRect;
        if (width === previousWidth && height === previousHeight) return;
        previousWidth = width;
        previousHeight = height;
        if (resizeFrame !== undefined) cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
          resizeFrame = undefined;
          if (!cancelled) game?.scale.refresh();
        });
      });
      observer.observe(element);
    }).catch(() => {
      if (!cancelled) setStatus({ kind: 'error' });
    });

    return () => {
      cancelled = true;
      phaserScene.current = null;
      observer?.disconnect();
      if (resizeFrame !== undefined) cancelAnimationFrame(resizeFrame);
      if (game) {
        // Phaser destroys on its next frame. Detach the old canvas immediately
        // so rapid scene changes never show two canvases in the same container.
        game.canvas?.remove();
        game.destroy(true);
      }
    };
  }, [scene]);

  useEffect(() => { phaserScene.current?.setTaiEnding(taiEnding, taiStars); }, [taiEnding, taiStars]);
  useEffect(() => { phaserScene.current?.setSparkleEnding(sparkleEnding); }, [sparkleEnding]);
  useEffect(() => { phaserScene.current?.setSparkleDust(sparkleDust); }, [sparkleDust]);
  useEffect(() => { phaserScene.current?.setSparkleTrail(sparkleTrail); }, [sparkleTrail]);
  useEffect(() => { phaserScene.current?.setEncounterStarted(encounterStarted); }, [encounterStarted]);
  useEffect(() => { phaserScene.current?.setFreeRoam(freeRoam); }, [freeRoam]);
  useEffect(() => { phaserScene.current?.setExcavation(excavation); }, [excavation]);
  useEffect(() => { phaserScene.current?.setQuest(quest, treeSpeaking); }, [quest, treeSpeaking]);
  // Scene interactions temporarily lock movement. Restore the requested mode
  // when the encounter changes, even when both phases use the same mode.
  useEffect(() => { phaserScene.current?.setMoonMode(moonMode); }, [moonMode, sparkleTrail, encounterStarted]);
  useEffect(() => {
    phaserScene.current?.setLanguage(language);
    const canvas = host.current?.querySelector('canvas');
    canvas?.setAttribute('aria-label', canvasLabel(scene, language));
  }, [language, scene]);

  return <div className="canvas-wrap">
    <div ref={host} className="game-host" data-ready={ready} data-scene={scene}
      tabIndex={0} aria-label={canvasLabel(scene, language)}
      onKeyDown={containGameKey}
      onKeyUp={containGameKey}
      onPointerDown={(event) => event.currentTarget.focus({ preventScroll: true })}
      onMouseDown={(event) => {
        // Reassert focus after Phaser handles the native canvas mousedown.
        event.preventDefault();
        event.currentTarget.focus({ preventScroll: true });
      }}
      onBlur={() => phaserScene.current?.releaseControls()} />
    {!ready && <div className="canvas-status" role="status">{status.kind === 'error' ? (status.assets ? `${copy[language].imageError}: ${status.assets.join(', ')}. ${copy[language].reload}` : copy[language].canvasError) : copy[language].loading}</div>}
  </div>;
}
