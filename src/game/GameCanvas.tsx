import { useEffect, useRef, useState } from 'react';
import type { SceneId } from '../content/scenes';
import type { ScenePoint } from './types';
import { VIEW } from './types';
import { copy, type Language } from '../content/i18n';

export function GameCanvas({ scene, debug, moonMode, language, onPoint, onAwake }: {
  scene: SceneId; debug: boolean; moonMode: 'sleep' | 'wake' | 'story' | 'free' | 'paused';
  language: Language;
  onPoint: (point: ScenePoint | null) => void; onAwake: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const onPointRef = useRef(onPoint);
  onPointRef.current = onPoint;
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
    setReady(false);
    setStatus({ kind: 'loading' });
    onPointRef.current(null);

    // Import after mount; cancellation prevents duplicate instances in StrictMode.
    void Promise.all([import('phaser'), import('./PreviewScene')]).then(([{ default: Phaser }, { PreviewScene }]) => {
      if (cancelled) return;
      const previewScene = new PreviewScene({
        scene, debug, moonMode: moonModeRef.current, language: languageRef.current,
        onPoint: (point) => { if (!cancelled) onPointRef.current(point); },
        onAwake: () => { if (!cancelled) onAwakeRef.current(); },
        onReady: () => { if (!cancelled) { setReady(true); setStatus({ kind: 'loading' }); } },
        onError: (assets) => { if (!cancelled) { setReady(false); setStatus({ kind: 'error', assets }); } },
      });
      phaserScene.current = previewScene;
      game = new Phaser.Game({
        type: Phaser.AUTO, parent: element, width: VIEW.width, height: VIEW.height,
        backgroundColor: '#101d2b', pixelArt: true, antialias: false,
        audio: { noAudio: true },
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: VIEW.width, height: VIEW.height },
        scene: previewScene,
        callbacks: { postBoot: (instance) => {
          instance.canvas.setAttribute('aria-label', scene === 'earth' ? copy[languageRef.current].canvasEarth : copy[languageRef.current].canvasMoon);
          instance.canvas.setAttribute('role', 'img');
        } },
      });
      previewScene.setMoonMode(moonModeRef.current);
      observer = new ResizeObserver(() => { if (!cancelled) game?.scale.refresh(); });
      observer.observe(element);
    }).catch(() => {
      if (!cancelled) setStatus({ kind: 'error' });
    });

    return () => {
      cancelled = true;
      phaserScene.current = null;
      observer?.disconnect();
      if (game) {
        // Phaser destroys on its next frame. Detach the old canvas immediately
        // so rapid scene changes never show two canvases in the same container.
        game.canvas?.remove();
        game.destroy(true);
      }
    };
  }, [scene, debug]);

  useEffect(() => { phaserScene.current?.setMoonMode(moonMode); }, [moonMode]);
  useEffect(() => {
    phaserScene.current?.setLanguage(language);
    const canvas = host.current?.querySelector('canvas');
    canvas?.setAttribute('aria-label', scene === 'earth' ? copy[language].canvasEarth : copy[language].canvasMoon);
  }, [language, scene]);

  return <div className={`canvas-wrap ${debug ? 'is-debug' : ''}`}>
    <div ref={host} className="game-host" data-ready={ready} data-scene={scene} />
    {!ready && <div className="canvas-status" role="status">{status.kind === 'error' ? (status.assets ? `${copy[language].imageError}: ${status.assets.join(', ')}. ${copy[language].reload}` : copy[language].canvasError) : copy[language].loading}</div>}
  </div>;
}
