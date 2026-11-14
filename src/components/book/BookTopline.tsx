import { copy, type Language } from '../../content/i18n';
import { storyPdfUrl } from '../../content/book/story-pdf';

export function BookTopline({ language }: { language: Language }) {
  return <div className="book-topline">
    <span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span>
    <a className="book-download" href={storyPdfUrl(language)} target="_blank" rel="noopener noreferrer">
      {language === 'vi' ? 'Mở sách PDF' : 'Open book PDF'}
    </a>
  </div>;
}
