import { useLayoutEffect, useRef } from 'react';

/** Choose the workspace zoom once when the page mounts. */
export function useWorkspaceFit() {
  const frame = useRef<HTMLDivElement>(null);
  const workspace = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const outer = frame.current;
    const inner = workspace.current;
    if (!outer || !inner) return;
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const enabled = viewport.width >= 900 && viewport.width > viewport.height;
    outer.classList.toggle('is-fitted', enabled);
    if (!enabled) {
      inner.style.removeProperty('width');
      inner.style.removeProperty('zoom');
      return;
    }
    const availableWidth = outer.clientWidth;
    const width = Math.min(1512, Math.max(1100, availableWidth));
    inner.style.width = `${width}px`;
    // offsetHeight is in layout pixels, independent of CSS zoom.
    const height = Math.max(inner.offsetHeight, inner.scrollHeight);
    const scale = Math.min(1, availableWidth / width, (viewport.height - 24) / height);
    inner.style.zoom = String(Math.floor(scale * 1000) / 1000);
  }, []);

  return { frame, workspace };
}
