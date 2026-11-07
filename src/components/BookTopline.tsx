import { useRef, useState } from 'react';
import { copy, type Language } from '../content/i18n';

export function BookTopline({ language }: { language: Language }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const downloading = useRef(false);
  const vi = language === 'vi';
  async function download() {
    if (downloading.current) return;
    downloading.current = true;
    setBusy(true);
    setError(false);
    try {
      const { downloadBookPdf } = await import('../export/book-pdf');
      await downloadBookPdf(language);
    } catch (cause) {
      console.error('Book PDF export failed', cause);
      setError(true);
    } finally {
      downloading.current = false;
      setBusy(false);
    }
  }
  return <div className="book-topline">
    <span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span>
    <button className="book-download" type="button" disabled={busy} onClick={download}
      title={vi ? 'Tải toàn bộ sách, gồm cả các trang chưa mở' : 'Download the complete book, including locked pages'}>
      {busy ? (vi ? 'Đang tạo…' : 'Preparing…') : (vi ? 'Tải PDF' : 'Download PDF')}
    </button>
    <span className={`book-download-status${error ? ' has-error' : ''}`} role="status">{error ? (vi ? 'Chưa tải được sách. Vui lòng thử lại.' : 'Download failed. Please try again.') : busy ? (vi ? 'Đang tạo bản sách đầy đủ.' : 'Preparing the complete book.') : ''}</span>
  </div>;
}
