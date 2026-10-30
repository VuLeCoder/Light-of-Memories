import type { Language } from '../i18n';
import { bookPages } from './catalog';
import type { BookBlock, BookChapter } from './types';

const chapterOrder: readonly BookChapter[] = ['overview', 'surveyor', 'apollo11', 'apollo12', 'apollo17'];
/** The complete reading edition, including unrevealed hints and photo details.
 * Deliberately accepts no progress parameter. Blocks retain their browser origin
 * so PDF renderers can cross-reference the appendix without duplicating copy.
 */
export function getReadingBook(language: Language) {
  const blocks = bookPages.flatMap(page => page.blocks.map(block => ({
    ...block,
    pageId: page.id,
    chapter: page.chapter,
    title: page.title[language],
    text: (block.readingText ?? block.text)[language],
    image: block.image ? { ...block.image, alt: block.image.alt[language] } : undefined,
  })));
  const compare = (a: typeof blocks[number], b: typeof blocks[number]) =>
    chapterOrder.indexOf(a.chapter) - chapterOrder.indexOf(b.chapter)
    || a.section.localeCompare(b.section, 'en', { numeric: true }) || a.order - b.order;
  return {
    language,
    main: blocks.filter(b => b.kind === 'fact').sort(compare),
    appendix: blocks.filter(b => b.kind !== 'fact').sort(compare),
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
