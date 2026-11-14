import type { Language } from '../i18n';

export interface LevelText {
  friend: string;
  enter: string;
  chapter: string;
  intro: string;
  reply: string;
  invitation: string;
  memory: string;
}

/** Shared presentation data; individual challenges can have their own components. */
export interface LevelDefinition {
  readonly id: string;
  readonly label: string;
  readonly portrait: string;
  readonly memoryCount: number;
  readonly text: Record<Language, LevelText>;
}
