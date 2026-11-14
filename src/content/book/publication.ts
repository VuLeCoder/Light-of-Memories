import { restoredReadingOrder } from './restored-friends';
import { insertRealWorldPages } from './real-world';
import { insertExtendedPages } from './extended';
import { endingPages } from './ending';
import { bookFrontCover } from './front-cover';
import type { Language } from '../i18n';
import { bookPages } from './catalog';
import { pdfText, pdfTitles } from './pdf-edition';
import type { BookBlock, BookChapter } from './types';

const chapterOrder: readonly BookChapter[] = ['overview', 'surveyor', 'apollo11', 'apollo12', 'apollo17', 'lro', 'ending'];
// Editorial order is explicit: original section codes classify content, not plot.
export const readingPageOrder = [
  bookFrontCover.id,
  ...insertExtendedPages(insertRealWorldPages([
    'overview', 'surveyor', 'surveyor-b01',
    'clue-arrive', 'photo-arrive', 'clue-work', 'photo-work', 'clue-visit', 'photo-visit',
    'lap-lanh', 'sparkle-photo-1', 'sparkle-photo-0', 'sparkle-repair-clue', 'sparkle-ranging-clue',
    ...restoredReadingOrder,
    'gac-book-orbit', 'gac-book-sites',
    'gac-book-impact', 'gac-book-impact.story', 'gac-book-light',
  ]), { surveyor: true, apollo11: true, lro: true }),
  ...endingPages.map(p => p.id),
];
/** The complete reading edition, including unrevealed hints and photo details.
 * Deliberately accepts no progress parameter. Blocks retain their browser origin
 * so PDF renderers can cross-reference the appendix without duplicating copy.
 */
export function getReadingBook(language: Language) {
  const blocks = bookPages.filter(page => !page.id.startsWith('ending-book-')).flatMap(page => page.blocks.map(block => ({
    ...block,
    pageId: page.id,
    chapter: page.chapter,
    text: (pdfText[block.id] ?? block.readingText ?? block.text)[language],
    title: (pdfTitles[page.id] ?? page.title)[language],
    image: block.image ? { ...block.image,
      alt: (block.id === 'sparkle-repair-clue-reality.photo' ? pdfText[block.id] : (['photo-arrive', 'photo-work', 'photo-visit'].includes(page.id) ? pdfTitles[page.id] : undefined) ?? block.image.alt)[language],
      credit: block.id === 'sparkle-repair-clue-reality.photo' ? 'Light of Memories · NASA/ILRS' : block.image.credit,
    } : undefined,
  })));
  const compare = (a: typeof blocks[number], b: typeof blocks[number]) =>
    chapterOrder.indexOf(a.chapter) - chapterOrder.indexOf(b.chapter)
    || readingPageOrder.indexOf(a.pageId) - readingPageOrder.indexOf(b.pageId) || a.order - b.order;
  const isMain = (b: typeof blocks[number]) => b.kind === 'fact' && b.publication !== 'appendix'
    && b.id !== 'sparkle-repair-clue-reality.body-2';
  const storyCompare = (a: typeof blocks[number], b: typeof blocks[number]) =>
    readingPageOrder.indexOf(a.pageId) - readingPageOrder.indexOf(b.pageId) || a.order - b.order;
  return {
    language,
    main: blocks.filter(isMain).sort(storyCompare),
    appendix: blocks.filter(b => !isMain(b)).sort(compare),
    sources: [...new Map(blocks.flatMap(b => b.sources).map(s => [s.url, s])).values()],
  };
}

/** Match authored paragraphs to their classified spans, preserving the existing
 * browser paragraph layout. No publication-only text or hidden assets leak in.
 */
export function getParagraphBlocks(blocks: readonly BookBlock[], paragraph: string, language: Language) {
  return blocks.filter(b => !b.image && !b.diagram && paragraph.includes(b.text[language]))
    .sort((a, b) => paragraph.indexOf(a.text[language]) - paragraph.indexOf(b.text[language]));
}
