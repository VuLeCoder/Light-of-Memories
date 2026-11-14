import type { Language } from '../i18n';

/** Published manuscripts are served verbatim, independently of game progress. */
export const storyPdf = {
  vi: { file: 'Truyen.pdf', name: 'chuyen-ke-duoi-trang.pdf' },
  en: { file: 'Truyen_en.pdf', name: 'tales-under-the-moon.pdf' },
} as const;
export const storyPdfUrl = (language: Language) => `${import.meta.env.BASE_URL}books/${storyPdf[language].file}`;
