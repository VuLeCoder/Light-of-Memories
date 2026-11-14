import type { GacTroiProgress } from '../friends/gac-troi/progress';

// Card order matches the actual HangFinale, not the retired ending phases.
export const endingCardKeys = ['card-sparkle', 'card-gac-troi', 'card-surveyor', 'card-footprint', 'card-wrapper', 'card-tie'] as const;
export const endingBookIds = ['ending-book-reunion', 'ending-book-cards',
  ...endingCardKeys.map(id => `ending-book-cards.${id}`), 'ending-book-home', 'ending-book-closing', 'ending-book-back-cover'];

export function earnedEndingBookIds(p: GacTroiProgress): string[] {
  const f = p.finale;
  const complete = p.storyCompletedOnce || f?.stage === 4 || f?.stage === 5;
  const count = complete ? 6 : Math.min(6, Math.max(0, Math.floor(f?.cards ?? 0)));
  const reunited = complete || !!f && f.stage >= 1;
  return [
    ...(reunited ? ['ending-book-reunion', 'ending-book-cards'] : []),
    ...endingCardKeys.slice(0, count).map(id => `ending-book-cards.${id}`),
    ...(complete ? ['ending-book-home'] : []),
    ...(p.storyCompletedOnce || f?.stage === 4 ? ['ending-book-closing', 'ending-book-back-cover'] : []),
  ];
}

/** Monotonic book access; no game phase, card answer or reward is changed. */
export function retainEndingBookUnlocks(p: GacTroiProgress): GacTroiProgress {
  const earned = earnedEndingBookIds(p);
  if (earned.every(id => p.bookUnlocks.includes(id))) return p;
  return { ...p, bookUnlocks: [...new Set([...p.bookUnlocks, ...earned])] };
}

export function availableEndingBookIds(p: GacTroiProgress): string[] {
  return [...new Set([...p.bookUnlocks.filter(id => endingBookIds.includes(id)), ...earnedEndingBookIds(p)])];
}
