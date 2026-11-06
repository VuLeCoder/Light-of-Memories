import type { Language } from '../i18n';

export type BookText = Readonly<Record<Language, string>>;
export const text = (vi: string, en: string): BookText => ({ vi, en });
export type ContentKind = 'fact' | 'game' | 'fiction';
export type BookChapter = 'overview' | 'surveyor' | 'apollo11' | 'lro';
export type BookDiagram = 'clue-arrive' | 'clue-work' | 'clue-visit' | 'corner' | 'ranging' | 'route' | 'route-safe' | 'camera';
export interface BookSource {
  url: string;
  /** Provenance copied from the project; not an assertion of external verification. */
  status: 'recorded' | 'needs-review';
  note?: BookText;
}
export interface BookImage {
  src: string;
  alt: BookText;
  credit?: string;
  code?: string;
  date?: string;
}
export interface BookBlock {
  id: string;
  kind: ContentKind;
  text: BookText;
  /** Reading edition, when browser wording depends on interaction or characters. */
  readingText?: BookText;
  section: string;
  order: number;
  sources: readonly BookSource[];
  image?: BookImage;
  diagram?: BookDiagram;
  /** Hidden hints and enlarged images still belong to the complete book. */
  reveal?: 'hint' | 'detail';
}
export interface BookPage {
  id: string;
  chapter: BookChapter;
  title: BookText;
  blocks: readonly BookBlock[];
}
