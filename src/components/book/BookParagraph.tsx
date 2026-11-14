import type { Language } from '../../content/i18n';
import { getBookPage } from '../../content/book/catalog';
import { getParagraphBlocks } from '../../content/book/publication';

/** Preserve classified spans and the original mixed factual paragraphs. */
export function BookParagraph({ pageId, value, language }: { pageId: string; value: string; language: Language }) {
  const blocks = getParagraphBlocks(getBookPage(pageId)?.blocks ?? [], value, language);
  if (!blocks.length) return <>{value}</>;
  let cursor = 0;
  const spans = blocks.map(block => {
    const start = value.indexOf(block.text[language], cursor);
    const prefix = value.slice(cursor, start);
    cursor = start + block.text[language].length;
    return <span key={block.id}>{prefix}<span data-book-block={block.id} data-content-kind={block.kind}>{block.text[language]}</span></span>;
  });
  return <>{spans}{value.slice(cursor)}</>;
}
