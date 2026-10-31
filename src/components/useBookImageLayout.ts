import { useLayoutEffect, useRef, useState } from 'react';

/** Measure real typography; retain paragraph boundaries and stable book page IDs. */
export function useBookImageLayout(pageId: string | null, language: string, request = 0, pages: (string | null)[] = [], page = 0, onChange: (page: number) => void = () => {}) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [leaf, setLeaf] = useState(0);
  const move = useRef<(leaf: number) => void>(() => {});
  const enteringLast = useRef(false);
  const key = (id: string | null) => `${language}:${id}`;
  useLayoutEffect(() => {
    const sheet = document.querySelector<HTMLElement>('.book-panel .book-sheet');
    if (!sheet) return;
    const prose = sheet.querySelector<HTMLElement>('.book-prose');
    setLeaf(0);
    if (!prose) { move.current = () => {}; return; }
    let disposed = false;
    let frame = 0;
    let part = 0;
    let groups: HTMLElement[][] = [];
    const paragraphs = Array.from(prose.querySelectorAll<HTMLElement>(':scope > p'));
    const illustrations = Array.from(prose.children).filter(el => el.tagName !== 'P') as HTMLElement[];
    const originalHidden = new Map([...paragraphs, ...illustrations].map(el => [el, el.hidden]));
    const restore = () => originalHidden.forEach((hidden, el) => { el.hidden = hidden; });
    const show = () => {
      paragraphs.forEach(el => { el.hidden = !groups[part]?.includes(el); });
      illustrations.forEach(el => { el.hidden = part > 0 || !!originalHidden.get(el); });
      setLeaf(part);
      sheet.scrollTop = 0;
    };
    move.current = value => { part = value; show(); };
    const fit = () => {
      if (disposed) return;
      restore();
      sheet.classList.remove('book-image-wrap', 'book-image-stacked');
      if (prose.querySelector('img') && !prose.classList.contains('book-prose--intro') && pageId !== 'ban-book-wheels') {
        // Try a generous image first. Keep it only when the complete page fits.
        sheet.classList.add('book-image-stacked');
        if (sheet.scrollHeight > sheet.clientHeight + 1) {
          sheet.classList.remove('book-image-stacked');
          sheet.classList.add('book-image-wrap');
        }
      }
      groups = [];
      // Narrow screens and enlarged text retain normal scrolling. Never split a sentence.
      if (window.innerWidth >= 760 && paragraphs.length > 1 && sheet.scrollHeight > sheet.clientHeight + 1) {
        paragraphs.forEach(el => { el.hidden = true; });
        let group: HTMLElement[] = [];
        for (const paragraph of paragraphs) {
          paragraph.hidden = false;
          if (group.length && sheet.scrollHeight > sheet.clientHeight + 1) {
            group.forEach(el => { el.hidden = true; });
            groups.push(group);
            illustrations.forEach(el => { el.hidden = true; });
            group = [];
          }
          group.push(paragraph);
        }
        if (group.length) groups.push(group);
        if (groups.length > 1) {
          part = enteringLast.current ? groups.length - 1 : Math.min(part, groups.length - 1);
          show();
        } else { restore(); part = 0; setLeaf(0); }
      } else { part = 0; setLeaf(0); }
      enteringLast.current = false;
      const count = Math.max(1, groups.length);
      setCounts(previous => previous[key(pageId)] === count ? previous : { ...previous, [key(pageId)]: count });
    };
    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    const observer = new ResizeObserver(schedule);
    // Observe the fixed sheet, not the prose whose geometry we change ourselves.
    observer.observe(sheet);
    prose.addEventListener('load', schedule, true);
    prose.addEventListener('error', schedule, true);
    window.addEventListener('resize', schedule);
    document.fonts.ready.then(schedule);
    fit();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      prose.removeEventListener('load', schedule, true);
      prose.removeEventListener('error', schedule, true);
      window.removeEventListener('resize', schedule);
      restore();
      sheet.classList.remove('book-image-wrap', 'book-image-stacked');
    };
  }, [pageId, language, request]);
  const offset = pages.slice(0, page).reduce((sum, id) => sum + (counts[key(id)] ?? 1), 0);
  const currentCount = counts[key(pageId)] ?? 1;
  return {
    page: offset + leaf,
    count: pages.reduce((sum, id) => sum + (counts[key(id)] ?? 1), 0),
    onChange: (target: number) => {
      const next = target - offset;
      if (next >= 0 && next < currentCount) move.current(next);
      else {
        enteringLast.current = next < 0;
        onChange(page + (next < 0 ? -1 : 1));
      }
    },
  };
}
