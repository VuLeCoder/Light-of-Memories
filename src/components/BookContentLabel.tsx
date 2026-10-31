import type { Language } from '../content/i18n';
import type { ContentKind } from '../content/book/types';

/** Visible text carries the meaning without relying on color, hover or icons. */
export function BookContentLabel({ kind, language }: { kind: ContentKind; language: Language }) {
  if (kind === 'fact') return null;
  return <span className={`book-content-label book-content-label-${kind}`}>
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{kind === 'game'
      ? <path d="M7 7h10l4 10-3 2-4-4h-4l-4 4-3-2 4-10Zm0 3v4m-2-2h4m6-1h1m1 3h1" />
      : <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" />}</svg>
    {language === 'vi' ? kind === 'game' ? 'Trong trò chơi' : 'Câu chuyện tưởng tượng' : kind === 'game' ? 'In the game' : 'Imagined story'}
  </span>;
}

export function BookLabelGuide({ language }: { language: Language }) {
  return <details className="book-label-guide"><summary>{language === 'vi' ? 'Ý nghĩa ký hiệu' : 'About the labels'}</summary>
    <div><BookContentLabel kind="game" language={language}/>: {language === 'vi' ? 'nhiệm vụ, luật chơi và mô hình giản lược.' : 'tasks, rules and simplified game models.'}<br/>
      <BookContentLabel kind="fiction" language={language}/>: {language === 'vi' ? 'nhân vật và tình tiết hư cấu.' : 'fictional characters and events.'}<br/>
      {language === 'vi' ? 'Nhãn chỉ áp dụng cho khối đi kèm. Kiến thức thực tế và ảnh tư liệu không có nhãn.' : 'Labels apply only to the accompanying block. Factual content and archive photos have no label.'}</div>
  </details>;
}
