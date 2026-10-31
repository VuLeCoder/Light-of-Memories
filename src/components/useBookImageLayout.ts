import { useLayoutEffect } from 'react';

/** Keep short pages stacked; flow text around the photo when the sheet overflows. */
export function useBookImageLayout(pageId: string | null, language: string) {
  useLayoutEffect(() => {
    const sheet = document.querySelector<HTMLElement>('.book-panel .book-sheet');
    if (!sheet) return;
    const prose = sheet.querySelector<HTMLElement>('.book-prose');
    if (!prose?.querySelector('img') || prose.classList.contains('book-prose--intro')) return;
    let disposed = false;
    let frame = 0;
    const fit = () => {
      if (disposed) return;
      const scrollTop = sheet.scrollTop;
      sheet.classList.remove('book-image-wrap');
      if (sheet.scrollHeight > sheet.clientHeight + 1) sheet.classList.add('book-image-wrap');
      sheet.scrollTop = scrollTop;
    };
    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(sheet);
    observer.observe(prose);
    // Capture also covers images replaced by the archive detail/retry controls.
    prose.addEventListener('load', schedule, true);
    prose.addEventListener('error', schedule, true);
    document.fonts.ready.then(schedule);
    fit();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      prose.removeEventListener('load', schedule, true);
      prose.removeEventListener('error', schedule, true);
      sheet.classList.remove('book-image-wrap');
    };
  }, [pageId, language]);
}
