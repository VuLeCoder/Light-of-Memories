import { earthDialogue } from './opening/earth-dialogue';
import type { DialogueState, StoryLine } from './types';
export function dialogueReducer(state: DialogueState, action: 'tick' | 'advance' | 'reveal', lines: readonly StoryLine[] = earthDialogue): DialogueState {
  if (state.finished) return state;
  const length = lines[state.index].text.length;
  if (action === 'tick') return { ...state, visible: Math.min(length, state.visible + 1) };
  if (action === 'reveal' || state.visible < length) return { ...state, visible: length };
  return state.index === lines.length - 1
    ? { ...state, finished: true }
    : { index: state.index + 1, visible: 0, finished: false };
}
