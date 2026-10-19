import type { Language } from '../content/i18n';

export function BookNavigation({ language, page, count, onChange }: {
  language: Language;
  page: number;
  count: number;
  onChange: (page: number) => void;
}) {
  const vi = language === 'vi';
  return <nav className="page-bottom book-navigation" aria-label={vi ? 'Lật trang sách' : 'Book pages'}>
    <button type="button" disabled={page === 0} onClick={() => onChange(page - 1)} aria-label={vi ? 'Trang trước' : 'Previous page'} title={vi ? 'Trang trước' : 'Previous page'}>←</button>
    <span role="status" aria-live="polite" aria-atomic="true">{vi ? 'Trang' : 'Page'} {page + 1}/{count}</span>
    <button type="button" disabled={page === count - 1} onClick={() => onChange(page + 1)} aria-label={vi ? 'Trang sau' : 'Next page'} title={vi ? 'Trang sau' : 'Next page'}>→</button>
  </nav>;
}
