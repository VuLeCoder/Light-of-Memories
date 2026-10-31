import { useLayoutEffect, useRef, useState } from 'react';

/** Measure actual book typography and turn overflow into consecutive leaves. */
export function useBookImageLayout(pageId: string | null, language: string, request = 0, pages: (string | null)[] = [], page = 0, onChange: (page: number) => void = () => {}, revision = '') {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [leaf, setLeaf] = useState(0);
  const move = useRef<(leaf: number) => void>(() => {});
  const enteringLast = useRef(false);
  const key = (id: string | null) => `${language}:${id}`;
  const order = JSON.stringify(pages);
  useLayoutEffect(() => {
    const sheet = document.querySelector<HTMLElement>('.book-panel .book-sheet');
    if (!sheet) return;
    const prose = sheet.querySelector<HTMLElement>('.book-prose');
    const container = prose ?? sheet;
    let disposed = false;
    let frame = 0;
    let part = 0;
    let keepLast = enteringLast.current;
    enteringLast.current = false;
    let groups: HTMLElement[][] = [];
    // Headings, classification, source links and the return action stay on each leaf.
    const originalBlocks = Array.from(container.children).filter(el => prose || !el.matches('.page-corner, .book-page-label, .book-kicker, h2, .sparkle-book-source, .book-return-game')) as HTMLElement[];
    let blocks = originalBlocks;
    const generated: HTMLElement[] = [];
    const hide = (el: Element, hidden: boolean) => el.toggleAttribute('hidden', hidden);
    const originalHidden = new Map(originalBlocks.map(el => [el, el.hasAttribute('hidden')]));
    const restore = () => {
      generated.splice(0).forEach(el => el.remove());
      blocks = originalBlocks;
      originalHidden.forEach((hidden, el) => hide(el, hidden));
    };
    const overflows = () => sheet.scrollHeight > sheet.clientHeight + 1;
    const show = () => {
      originalBlocks.forEach(el => hide(el, !!originalHidden.get(el) || !groups[part]?.includes(el)));
      generated.forEach(el => hide(el, !groups[part]?.includes(el)));
      setLeaf(part);
      sheet.scrollTop = 0;
    };
    move.current = value => { keepLast = false; part = value; show(); };
    const fit = () => {
      if (disposed) return;
      restore();
      sheet.classList.remove('book-image-wrap', 'book-image-stacked', 'book-compact');
      if (prose?.querySelector('img') && !prose.classList.contains('book-prose--intro') && pageId !== 'ban-book-wheels') {
        sheet.classList.add('book-image-stacked');
        if (overflows()) {
          sheet.classList.remove('book-image-stacked');
          sheet.classList.add('book-image-wrap');
        }
      }
      // Recover small amounts of space before introducing another page.
      if (overflows()) sheet.classList.add('book-compact');
      groups = [];
      if (overflows()) {
        blocks.forEach(el => hide(el, true));
        // A single long paragraph may itself need another leaf. Clone text ranges
        // so classified spans survive and React continues to own the original.
        blocks = originalBlocks.flatMap(block => {
          if (originalHidden.get(block)) return [];
          hide(block, false);
          const needsSplit = block.tagName === 'P' && overflows();
          hide(block, true);
          if (!needsSplit) return [block];
          const value = block.textContent ?? '';
          const ends = Array.from(value.matchAll(/\S+\s*/g), match => match.index! + match[0].length);
          const sentenceEnds = Array.from(new Intl.Segmenter(language, { granularity: 'sentence' }).segment(value), segment => segment.index + segment.segment.length);
          const pieces: HTMLElement[] = [];
          let start = 0;
          while (start < value.length) {
            // Binary search limits synchronous layout reads on long paragraphs.
            let low = ends.findIndex(end => end > start);
            const first = low;
            let high = ends.length - 1;
            let best = start;
            while (low <= high) {
              const middle = (low + high) >>> 1;
              const probe = clonePassage(block, start, ends[middle]);
              block.after(probe);
              const fits = !overflows();
              probe.remove();
              if (fits) {
                best = ends[middle];
                low = middle + 1;
              } else high = middle - 1;
            }
            // Prefer a whole sentence; split at a word only if a sentence is too tall.
            const sentence = sentenceEnds.filter(end => end > start && end <= best).at(-1);
            const end = sentence ?? (best > start ? best : ends[first] ?? value.length);
            const piece = clonePassage(block, start, end);
            (pieces.at(-1) ?? block).after(piece);
            hide(piece, true);
            pieces.push(piece);
            generated.push(piece);
            start = end;
          }
          return pieces;
        });
        let group: HTMLElement[] = [];
        for (const block of blocks) {
          if (originalHidden.get(block)) continue;
          hide(block, false);
          if (group.length && overflows()) {
            group.forEach(el => hide(el, true));
            groups.push(group);
            group = [];
          }
          group.push(block);
        }
        if (group.length) groups.push(group);
      }
      if (!groups.length) groups = [blocks.filter(el => !originalHidden.get(el))];
      part = keepLast ? groups.length - 1 : Math.min(part, groups.length - 1);
      show();
      const count = groups.length;
      setCounts(previous => previous[key(pageId)] === count ? previous : { ...previous, [key(pageId)]: count });
    };
    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('button')) schedule();
    };
    let width = sheet.clientWidth;
    let height = sheet.clientHeight;
    const observer = new ResizeObserver(() => {
      const nextWidth = sheet.clientWidth;
      const nextHeight = sheet.clientHeight;
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      schedule();
    });
    observer.observe(sheet);
    sheet.addEventListener('load', schedule, true);
    sheet.addEventListener('error', schedule, true);
    sheet.addEventListener('click', onClick);
    window.addEventListener('resize', schedule);
    if (document.fonts.status === 'loading') document.fonts.ready.then(schedule);
    fit();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sheet.removeEventListener('load', schedule, true);
      sheet.removeEventListener('error', schedule, true);
      sheet.removeEventListener('click', onClick);
      window.removeEventListener('resize', schedule);
      restore();
      sheet.classList.remove('book-image-wrap', 'book-image-stacked', 'book-compact');
    };
  }, [pageId, language, request, order, revision]);
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

/** Copy a text interval while retaining inline classification and emphasis. */
function clonePassage(paragraph: HTMLElement, start: number, end: number): HTMLElement {
  const range = document.createRange();
  const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
  let offset = 0;
  let started = false;
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const length = node.textContent?.length ?? 0;
    if (!started && start < offset + length) {
      range.setStart(node, Math.max(0, start - offset));
      started = true;
    }
    if (started && end <= offset + length) {
      range.setEnd(node, end - offset);
      break;
    }
    offset += length;
  }
  const clone = paragraph.cloneNode(false) as HTMLElement;
  clone.removeAttribute('id');
  clone.removeAttribute('hidden');
  clone.dataset.bookFragment = '';
  clone.append(range.cloneContents());
  return clone;
}
