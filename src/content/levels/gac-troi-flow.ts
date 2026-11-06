import { startGacRabbitJourney } from './gac-troi-rabbit';
// The released rabbit journey follows T02; legacy helpers remain for saved-state compatibility.
export { gacRabbitReleased, startGacRabbitJourney, applyGacRabbitAction, rabbitObjective } from './gac-troi-rabbit';
import { gacCards, gacClues, gacDialogueLengths, gacRouteLandmarks, unlockGacBook, type GacCard, type GacClue, type GacLandmark, type GacTroiPhase, type GacTroiProgress } from './gac-troi-progress';

/** M4 ships T01–T04 and the reunion. Later checkpoints survive saves,
 * but their screens stay behind this release gate until implemented. */
export function gacPhaseAvailable(phase: GacTroiPhase): boolean {
  return ['meeting', 'matching', 'stories', 't02-intro', 't02-search', 't02-story', 't03-intro', 't03-map', 't03-story', 'gac-farewell', 'gac-free', 't04-slope', 't04-rock', 't04-banyan', 'reunion'].includes(phase);
}
export function advanceGacDialogue(p: GacTroiProgress): GacTroiProgress {
  const length = gacDialogueLengths[p.phase];
  if (!length || p.phase === 'matching' || p.turn !== length - 1) return p;
  switch (p.phase) {
    case 'meeting': return unlockGacBook({ ...p, phase: 'matching', turn: 0 }, 'gac-book-sites');
    case 'stories': return { ...p, phase: 't02-intro', turn: 0 };
    case 't02-intro': return unlockGacBook({ ...p, phase: 't02-search', turn: 0 }, 'gac-book-impact');
    case 't02-story': return startGacRabbitJourney(unlockGacBook({ ...p, phase: 't03-intro', turn: 0, t02Done: true }, 'gac-book-impact.story'));
    case 't03-intro': return unlockGacBook({ ...p, phase: 't03-map', turn: 0 }, 'gac-book-light');
    case 't03-story': return unlockGacBook({ ...p, phase: 'gac-farewell', turn: 0 }, 'gac-book-map');
    case 'gac-farewell': return { ...p, phase: 'gac-free', turn: 0, farewellDone: true, completedOnce: true };
    case 'reunion': return unlockGacBook({ ...p, phase: 'cards-intro', turn: 0, reunionDone: true }, 'ending-book-cards');
    case 'cards-intro': return { ...p, phase: 'cards', turn: 0 };
    case 'reflection': return { ...p, phase: 'return-home', turn: 0 };
    case 'return-home': return unlockGacBook({ ...p, phase: 'home', turn: 0 }, 'ending-book-home');
    case 'home': return { ...p, phase: 'story-end', turn: 0, storyCompletedOnce: true };
    default: return p;
  }
}
/** UI calls after a verified correct answer, never on hover or opening a hint. */
export function findGacImpact(p: GacTroiProgress): GacTroiProgress {
  return p.phase === 't02-search' ? { ...p, phase: 't02-story', turn: 0 } : p;
}
export function keepGacLandmark(p: GacTroiProgress, id: GacLandmark): GacTroiProgress {
  if (p.phase !== 't03-map' || id !== gacRouteLandmarks[p.routeLandmarks.length]) return p;
  const routeLandmarks = [...p.routeLandmarks, id];
  return { ...p, routeLandmarks, phase: routeLandmarks.length === 3 ? 't03-story' : 't03-map', turn: 0 };
}
export function enterGacTrail(p: GacTroiProgress): GacTroiProgress {
  return p.phase === 'gac-free' && p.farewellDone ? { ...p, phase: 't04-slope', turn: 0 } : p;
}
export function keepGacClue(p: GacTroiProgress, id: GacClue): GacTroiProgress {
  const phases = ['t04-slope', 't04-rock', 't04-banyan', 'reunion'] as const;
  const index = p.clues.length;
  if (p.phase !== phases[index] || id !== gacClues[index]) return p;
  return { ...p, clues: [...p.clues, id], phase: phases[index + 1], turn: 0 };
}
/** Call only after the correct explanation's explicit “I understand” action. */
export function understandGacCard(p: GacTroiProgress, id: GacCard): GacTroiProgress {
  if (p.phase !== 'cards' || id !== gacCards.find(card => !p.understoodCards.includes(card))) return p;
  return unlockGacBook({ ...p, understoodCards: [...p.understoodCards, id] }, `ending-book-cards.${id}`);
}
export function finishGacCards(p: GacTroiProgress): GacTroiProgress {
  return p.phase === 'cards' && p.understoodCards.length === gacCards.length ? { ...p, phase: 'reflection', turn: 0 } : p;
}
// Deliberately not GacTroiProgress: a review cursor cannot be passed to saveProgress.
// Its future renderer owns this locally; closing/reloading leaves the main save alone.
export type GacEndingReview = { phase: 'reflection' | 'return-home' | 'home' | 'story-end'; turn: number };
export function startGacEndingReview(p: GacTroiProgress): GacEndingReview | null {
  return p.storyCompletedOnce ? { phase: 'reflection', turn: 0 } : null;
}
export function advanceGacEndingReview(p: GacEndingReview): GacEndingReview {
  if (p.phase === 'story-end') return p;
  if (p.turn < (gacDialogueLengths[p.phase] ?? 1) - 1) return { ...p, turn: p.turn + 1 };
  const next = { reflection: 'return-home', 'return-home': 'home', home: 'story-end' } as const;
  return { phase: next[p.phase], turn: 0 };
}
