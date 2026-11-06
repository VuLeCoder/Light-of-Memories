import type { StoryLine } from './earth-dialogue';
import type { Language } from './i18n';
import { text } from './book/types';

export const endingPhases = ['idle', 'walk', 'reunion', 'home', 'earth', 'finished'] as const;
export type EndingPhase = typeof endingPhases[number];
export interface EndingProgress { phase: EndingPhase; turn: number; completedOnce: boolean; active: boolean }
export const freshEnding = (): EndingProgress => ({ phase: 'idle', turn: 0, completedOnce: false, active: false });
const reunion = [
  { id: 'reunion-01', speaker: 'cuoi', ...text('Chị Hằng! Em tìm thấy chị rồi!', 'Hằng! I found you!') },
  { id: 'reunion-02', speaker: 'chiHang', ...text('Cuội đấy à! Chị đi ngắm trăng một lát, rồi dừng ở đây. Em có nhận ra sườn đồi mình vẫn hay ngồi không?', 'Cuội! I went for a walk and stopped here. Do you recognise the hillside where we used to sit?') },
  { id: 'reunion-03', speaker: 'cuoi', ...text('Có chứ! Nhưng hôm nay em nhìn thấy nhiều điều trước đây chưa từng để ý. Em còn gặp được ba người bạn nữa.', 'I do! But today I noticed so many things I had never seen before. I met three friends, too.') },
  { id: 'reunion-04', speaker: 'chiHang', ...text('Vậy chắc em có nhiều chuyện để kể lắm nhỉ?', 'Then you must have plenty of stories to tell.') },
  { id: 'reunion-05', speaker: 'cuoi', ...text('Mắt Tròn có những bức ảnh cũ, Bánh Lưới nhớ những chuyến đi xa. Gác Trời còn cho em xem Mặt Trăng từ trên cao! Nhờ các bạn, em mới tìm được đường tới đây.', 'Round Eyes has old photographs, and Mesh Wheels remembers long journeys. Sky Watcher even showed me the Moon from above! My friends helped me find the way here.') },
  { id: 'reunion-06', speaker: 'chiHang', ...text('Chiếc đèn ấm quá. Mình về bên gốc đa nhé. Chị muốn nghe em kể từng chuyện một.', 'Your lantern feels so warm. Let’s go back to the banyan tree. I want to hear every story.') },
] as const;
const home = [
  { id: 'home-01', speaker: 'narrator', ...text('Cuội và chị Hằng trở về dưới bóng cây đa. Bên chiếc ghế đá quen thuộc, hai người bắt đầu kể chuyện.', 'Cuội and Hằng returned to the banyan tree. Beside the familiar stone bench, they began to share their stories.') },
  { id: 'home-02', speaker: 'cayDa', ...text('Con tìm được chị Hằng rồi. Chuyến đi hôm nay thế nào?', 'You found Hằng. How was your journey?') },
  { id: 'home-03', speaker: 'cuoi', ...text('Con cứ tưởng mình chỉ đi tìm chị Hằng. Giờ con còn có những người bạn để ghé thăm, và bao nhiêu chuyện để kể nữa!', 'I thought I was only looking for Hằng. Now I have friends to visit and so many stories to tell!') },
  { id: 'home-04', speaker: 'chiHang', ...text('Lần tới mình cùng đi thăm các bạn nhé, Cuội.', 'Next time, let’s visit your friends together, Cuội.') },
  { id: 'home-05', speaker: 'narrator', ...text('Ánh đèn ông sao khẽ lay dưới tán lá. Từ rất xa, một chiếc đèn nhỏ nơi hiên nhà cũng đang sáng.', 'The star lantern swayed beneath the leaves. Far away, another little lantern shone on a porch.') },
] as const;
const earth = [
  { id: 'earth-end-01', speaker: 'an', ...text('Bà ơi, vậy chú Cuội không còn ngồi một mình nữa rồi!', 'Grandma, Cuội is not sitting all alone anymore!') },
  { id: 'earth-end-02', speaker: 'ba', ...text('Ừ, có chị Hằng ở bên, lại có những người bạn đang chờ chú ghé thăm nữa.', 'That’s right. Hằng is beside him, and his friends are waiting for another visit.') },
  { id: 'earth-end-03', speaker: 'an', ...text('Con cũng muốn nghe chuyện của các bạn ấy. Mai bà kể tiếp cho con nhé!', 'I want to hear their stories too. Will you tell me more tomorrow?') },
  { id: 'earth-end-04', speaker: 'ba', ...text('Bà sẽ kể. Còn tối nay, mình ngắm trăng thêm một lát nhé con.', 'Of course. Tonight, let’s look at the Moon a little longer.') },
  { id: 'earth-end-05', speaker: 'narrator', ...text('An tựa vào bà, nâng chiếc đèn ông sao lên. Trên cao, trăng vẫn tròn và sáng.', 'An leaned against Grandma and lifted the star lantern. Above them, the Moon shone round and bright.') },
] as const;
export function endingDialogue(language: Language, phase: EndingPhase): StoryLine[] {
  const lines = phase === 'reunion' ? reunion : phase === 'home' ? home : earth;
  return lines.map(line => ({ id: line.id, speaker: line.speaker, text: line[language] }));
}
export function readEnding(value: unknown, unlocked: boolean): EndingProgress {
  if (!unlocked || !value || typeof value !== 'object') return freshEnding();
  const p = value as Record<string, unknown>;
  const phase = endingPhases.includes(p.phase as EndingPhase) ? p.phase as EndingPhase : 'idle';
  const max = ['reunion', 'home', 'earth'].includes(phase) ? endingDialogue('vi', phase).length - 1 : 0;
  return { phase, active: phase !== 'idle' && p.active !== false, turn: Number.isInteger(p.turn) ? Math.max(0, Math.min(max, Number(p.turn))) : 0, completedOnce: p.completedOnce === true || phase === 'finished' };
}
