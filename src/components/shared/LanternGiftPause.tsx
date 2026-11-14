import { useEffect, useRef, useState } from 'react';
import type { Language } from '../../content/i18n';

/** Match PreviewScene's 250ms gather, 1250ms flight and 400ms glow.
 * Freeze in the menu and cap long frames just like the canvas animation. */
export function useLanternGiftPause(active: boolean, paused: boolean) {
  const elapsed = useRef(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { elapsed.current = 0; setDone(false); return; }
    if (paused || done) return;
    let frame: number;
    let previous = performance.now();
    const tick = (now: number) => {
      elapsed.current += Math.min(now - previous, 50);
      previous = now;
      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 150 : 1900;
      if (elapsed.current >= duration) setDone(true);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, paused, done]);
  return active && !done;
}

export function LanternGiftPause({ language }: { language: Language }) {
  return <p className="tai-gift-status" role="status">{language === 'vi'
    ? 'Một chút ánh sáng đang tìm đến chiếc đèn của Cuội…'
    : 'A little light is reaching Cuội’s lantern…'}</p>;
}
