import type { Language } from '../../content/i18n';

export function BookNavigation({ language, page, count, onChange, contents, selected, onSelect }: {
  contents?: { title: string; index: number }[];
  selected?: number;
  onSelect?: (index: number) => void;
  language: Language;
  page: number;
  count: number;
  onChange: (page: number) => void;
}) {
  const vi = language === 'vi';
  return <nav className="page-bottom book-navigation" aria-label={vi ? 'Lật trang sách' : 'Book pages'}>
    <button type="button" disabled={page === 0} onClick={() => onChange(page - 1)} aria-label={vi ? 'Trang trước' : 'Previous page'} title={vi ? 'Trang trước' : 'Previous page'}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 12H5m6-6-6 6 6 6" /></svg></button>
    <div className="book-navigation-position">
    {contents && <select aria-label={vi ? 'Mục lục sách' : 'Book contents'} value={selected} onChange={event => onSelect?.(Number(event.target.value))}>
      {contents.map(item => <option key={item.index} value={item.index}>{item.title}</option>)}
    </select>}
    <span role="status" aria-live="polite" aria-atomic="true">{vi ? 'Trang' : 'Page'} {page + 1}/{count}</span></div>
    <button type="button" disabled={page === count - 1} onClick={() => onChange(page + 1)} aria-label={vi ? 'Trang sau' : 'Next page'} title={vi ? 'Trang sau' : 'Next page'}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
  </nav>;
}
