// Verbatim story text from section 7 of the opening plan.
export const earthDialogue = [
  { id: 'earth-01', speaker: 'narrator', text: 'Đêm Rằm tháng Tám, trăng tròn và sáng như một chiếc đĩa bạc.' },
  { id: 'earth-02', speaker: 'narrator', text: 'Bé An ngồi trên hiên nhà, tay cầm chiếc đèn ông sao, ngước nhìn lên trời.' },
  { id: 'earth-03', speaker: 'an', text: 'Bà ơi, chú Cuội ngồi dưới gốc đa lâu lắm rồi. Chú có buồn không ạ?' },
  { id: 'earth-04', speaker: 'ba', text: 'Ngày xưa chú không buồn đâu con, vì có chị Hằng ở bên cạnh.' },
  { id: 'earth-05', speaker: 'ba', text: 'Nhưng bà nghe kể rằng, có một đêm chú Cuội tỉnh dậy… và chị Hằng không còn ở đó nữa.' },
  { id: 'earth-06', speaker: 'narrator', text: 'Ngọn đèn trên tay An khẽ chớp sáng. Và câu chuyện bắt đầu từ đó.' },
] as const;

export type DialogueState = { index: number; visible: number; finished: boolean };
export type StoryLine = { id: string; speaker: 'narrator' | 'an' | 'ba' | 'cuoi' | 'cayDa' | 'matTron' | 'lapLanh' | 'taiThinh' | 'banhLuoi'; text: string };
export function dialogueReducer(state: DialogueState, action: 'tick' | 'advance' | 'reveal', lines: readonly StoryLine[] = earthDialogue): DialogueState {
  if (state.finished) return state;
  const length = lines[state.index].text.length;
  if (action === 'tick') return { ...state, visible: Math.min(length, state.visible + 1) };
  if (action === 'reveal' || state.visible < length) return { ...state, visible: length };
  return state.index === lines.length - 1
    ? { ...state, finished: true }
    : { index: state.index + 1, visible: 0, finished: false };
}
