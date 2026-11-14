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
    const generated: HTMLElement[] = [];
    // These factual LRO articles share one title and one final source footer.
    const factualArticle = pageId === 'gac-book-light' || pageId === 'gac-book-impact.story';
    const heading = factualArticle ? sheet.querySelector<HTMLElement>('h2') : null;
    const kicker = factualArticle ? sheet.querySelector<HTMLElement>('.book-kicker') : null;
    const sources = factualArticle ? sheet.querySelector<HTMLElement>('.book-reality-sources') : null;
    const restoreArticle = () => {
      heading?.classList.remove('sr-only');
      if (kicker) hide(kicker, false);
      if (sources) hide(sources, false);
    };
    const hide = (el: Element, hidden: boolean) => el.toggleAttribute('hidden', hidden);
    const originalHidden = new Map(originalBlocks.map(el => [el, el.hasAttribute('hidden')]));
    const restore = () => {
      generated.splice(0).forEach(el => el.remove());
      originalHidden.forEach((hidden, el) => hide(el, hidden));
    };
    const overflows = () => sheet.scrollHeight > sheet.clientHeight + 1;
    const compose = () => {
      sheet.classList.remove('book-image-wrap', 'book-image-stacked');
      sheet.style.removeProperty('--book-image-height');
      if (!prose?.querySelector('img, svg') || prose.classList.contains('book-prose--intro') || pageId === 'ban-book-wheels') return;
      const length = Array.from(prose.querySelectorAll('p')).filter(el => !el.hidden).reduce((sum, el) => sum + (el.textContent?.length ?? 0), 0);
      if (length <= 420 && pageId !== 'ban-book-walkback' && pageId !== 'ban-photo-orbit') {
        sheet.classList.add('book-image-stacked');
        // Short reading stays centred: reduce the illustration before switching
        // to a narrow float. Captions and image controls retain their full size.
        for (let height = 200; height >= 120; height -= 20) {
          sheet.style.setProperty('--book-image-height', `${height}px`);
          if (!overflows()) return;
        }
        sheet.classList.remove('book-image-stacked');
      }
      sheet.classList.add('book-image-wrap');
    };
    const show = () => {
      originalBlocks.forEach(el => hide(el, !!originalHidden.get(el) || !groups[part]?.includes(el)));
      generated.forEach(el => hide(el, !groups[part]?.includes(el)));
      if (heading) heading.classList.toggle('sr-only', part > 0);
      if (kicker) hide(kicker, part > 0);
      if (sources) hide(sources, part < groups.length - 1);
      compose();
      setLeaf(part);
      sheet.scrollTop = 0;
    };
    move.current = value => { keepLast = false; part = value; show(); };
    const fit = () => {
      if (disposed) return;
      restore();
      restoreArticle();
      sheet.classList.remove('book-image-wrap', 'book-image-stacked', 'book-compact');
      compose();
      // Recover small amounts of space before introducing another page.
      if (overflows()) sheet.classList.add('book-compact');
      groups = [];
      if (overflows()) {
        originalBlocks.forEach(el => hide(el, true));
        let group: HTMLElement[] = [];
        const finish = () => {
          if (!group.length) return;
          group.forEach(el => hide(el, true));
          groups.push(group);
          group = [];
        };
        for (const block of originalBlocks) {
          if (originalHidden.get(block)) continue;
          hide(block, false);
          if (!overflows()) { group.push(block); continue; }
          hide(block, true);
          if (block.tagName !== 'P') {
            finish();
            hide(block, false);
            group.push(block);
            continue;
          }
          // Fit a paragraph into the space beside the current illustration,
          // rather than measuring it alone and stranding the image on a leaf.
          const value = block.textContent ?? '';
          const ends = Array.from(value.matchAll(/\S+\s*/g), match => match.index! + match[0].length);
          const sentenceEnds = Array.from(new Intl.Segmenter(language, { granularity: 'sentence' }).segment(value), segment => segment.index + segment.segment.length);
          let start = 0;
          let anchor = block;
          while (start < value.length) {
            let low = ends.findIndex(end => end > start);
            const first = low;
            let high = ends.length - 1;
            let best = start;
            while (low <= high) {
              const middle = (low + high) >>> 1;
              const probe = clonePassage(block, start, ends[middle]);
              anchor.after(probe);
              const fits = !overflows();
              probe.remove();
              if (fits) { best = ends[middle]; low = middle + 1; }
              else high = middle - 1;
            }
            if (best === start && group.length) { finish(); continue; }
            const sentence = sentenceEnds.filter(end => end > start && end <= best).at(-1);
            const end = sentence ?? (best > start ? best : ends[first] ?? value.length);
            const piece = clonePassage(block, start, end);
            anchor.after(piece);
            anchor = piece;
            generated.push(piece);
            group.push(piece);
            start = end;
            if (start < value.length) finish();
          }
        }
        finish();
      }
      if (!groups.length) groups = [originalBlocks.filter(el => !originalHidden.get(el))];
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
    sheet.addEventListener('toggle', schedule, true);
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
      sheet.removeEventListener('toggle', schedule, true);
      window.removeEventListener('resize', schedule);
      restore();
      restoreArticle();
      sheet.classList.remove('book-image-wrap', 'book-image-stacked', 'book-compact');
      sheet.style.removeProperty('--book-image-height');
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
