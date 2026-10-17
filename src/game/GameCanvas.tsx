import { useEffect, useRef, useState } from 'react';
import type { SceneId } from '../content/scenes';
import type { ScenePoint } from './types';
import { VIEW } from './types';

export function GameCanvas({ scene, debug, sleeping = false, onPoint }: {
  scene: SceneId; debug: boolean; sleeping?: boolean; onPoint: (point: ScenePoint | null) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const onPointRef = useRef(onPoint);
  onPointRef.current = onPoint;
  const [status, setStatus] = useState('Đang chuẩn bị cảnh…');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current!;
    let cancelled = false;
    let game: import('phaser').Game | undefined;
    let observer: ResizeObserver | undefined;
    setReady(false);
    setStatus('Đang chuẩn bị cảnh…');
    onPointRef.current(null);

    // Import after mount; cancellation prevents duplicate instances in StrictMode.
    void Promise.all([import('phaser'), import('./PreviewScene')]).then(([{ default: Phaser }, { PreviewScene }]) => {
      if (cancelled) return;
      game = new Phaser.Game({
        type: Phaser.AUTO, parent: element, width: VIEW.width, height: VIEW.height,
        backgroundColor: '#101d2b', pixelArt: true, antialias: false,
        audio: { noAudio: true },
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: VIEW.width, height: VIEW.height },
        scene: new PreviewScene({
          scene, debug, sleeping,
          onPoint: (point) => { if (!cancelled) onPointRef.current(point); },
          onReady: () => { if (!cancelled) { setReady(true); setStatus(''); } },
          onError: (message) => { if (!cancelled) { setReady(false); setStatus(message); } },
        }),
        callbacks: { postBoot: (instance) => {
          instance.canvas.setAttribute('aria-label', scene === 'earth' ? 'Cảnh pixel An và bà trên hiên nhà' : 'Cảnh pixel Cuội dưới gốc đa trên Mặt Trăng');
          instance.canvas.setAttribute('role', 'img');
        } },
      });
      observer = new ResizeObserver(() => { if (!cancelled) game?.scale.refresh(); });
      observer.observe(element);
    }).catch(() => {
      if (!cancelled) setStatus('Không khởi tạo được cảnh. Hãy tải lại trang hoặc dùng trình duyệt hỗ trợ canvas.');
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (game) {
        // Phaser destroys on its next frame. Detach the old canvas immediately
        // so rapid scene changes never show two canvases in the same container.
        game.canvas?.remove();
        game.destroy(true);
      }
    };
  }, [scene, debug, sleeping]);

  return <div className={`canvas-wrap ${debug ? 'is-debug' : ''}`}>
    <div ref={host} className="game-host" data-ready={ready} data-scene={scene} />
    {status && <div className="canvas-status" role="status">{status}</div>}
  </div>;
}
