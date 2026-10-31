import type { Language } from '../content/i18n';
import { getBookPage } from '../content/book/catalog';

/** One shared browser label; the catalog retains separate publication categories. */
export function BookContentLabel({ language }: { language: Language }) {
  return <span className="book-content-label">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" /></svg>
    {language === 'vi' ? 'Nội dung giả tưởng' : 'Fictional content'}
  </span>;
}

export function BookPageLabel({ pageId, language }: { pageId: string | null; language: Language }) {
  if (!getBookPage(pageId)?.blocks.some(block => block.kind !== 'fact')) return null;
  return <div className="book-page-label"><BookContentLabel language={language}/></div>;
}

export function BookLabelGuide({ language }: { language: Language }) {
  return <details className="book-label-guide"><summary>{language === 'vi' ? 'Ý nghĩa ký hiệu' : 'About the label'}</summary>
    <div><BookContentLabel language={language}/>: {language === 'vi'
      ? 'Trang có nội dung trò chơi hoặc câu chuyện tưởng tượng, gồm nhiệm vụ, luật chơi, mô hình giản lược, nhân vật và tình tiết hư cấu. Trang có thể kèm kiến thức thực tế và ảnh tư liệu; nhãn không có nghĩa toàn bộ trang là hư cấu. Trang chỉ có kiến thức thực tế không có nhãn.'
      : 'This page includes game or imagined story content: tasks, rules, simplified models, fictional characters or events. It may also contain factual knowledge and archive photos; the label does not mean the entire page is fictional. Pages containing only factual content have no label.'}</div>
  </details>;
}
