import { useLayoutEffect, useRef } from 'react';

/** Fit the play area, without changing the browser's own zoom or canvas size. */
export function useWorkspaceFit() {
  const frame = useRef<HTMLDivElement>(null);
  const workspace = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const outer = frame.current;
    const inner = workspace.current;
    if (!outer || !inner) return;
    let viewport = { width: window.innerWidth, height: window.innerHeight };
    let pixelRatio = window.devicePixelRatio;
    let availableWidth = outer.clientWidth;
    let pending = 0;
    let disposed = false;
    const fit = () => {
      pending = 0;
      const enabled = viewport.width >= 900 && viewport.width > viewport.height;
      outer.classList.toggle('is-fitted', enabled);
      if (!enabled) {
        inner.style.removeProperty('width');
        inner.style.removeProperty('zoom');
        return;
      }
      const width = Math.min(1512, Math.max(1100, availableWidth));
      inner.style.width = `${width}px`;
      // offsetHeight is in layout pixels, independent of CSS zoom.
      const height = Math.max(inner.offsetHeight, inner.scrollHeight);
      const scale = Math.min(1, availableWidth / width, (viewport.height - 24) / height);
      inner.style.zoom = String(Math.floor(scale * 1000) / 1000);
    };
    const schedule = () => {
      if (!disposed && !pending) pending = requestAnimationFrame(fit);
    };
    const resize = () => {
      // Desktop browser zoom changes DPR: retain the chosen fit so it does
      // not cancel the user's zoom. Pinch zoom is also left to the browser.
      if (window.devicePixelRatio !== pixelRatio) {
        pixelRatio = window.devicePixelRatio;
        return;
      }
      viewport = { width: window.innerWidth, height: window.innerHeight };
      availableWidth = outer.clientWidth;
      schedule();
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(inner);
    window.addEventListener('resize', resize);
    document.fonts.ready.then(schedule);
    fit();
    return () => {
      disposed = true;
      cancelAnimationFrame(pending);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return { frame, workspace };
}
