import type { Language } from '../i18n';
import type { StoryLine } from '../earth-dialogue';
import { text } from '../book/types';

const farewell = [
  { id: 'gac-end-01', speaker: 'cuoi', ...text('Mình cứ nghĩ những dấu vết sẽ ở đó mãi. Hóa ra Mặt Trăng vẫn đổi thay.', 'I thought the traces would always stay the same. But the Moon keeps changing.') },
  { id: 'gac-end-02', speaker: 'gacTroi', ...text('Ừ. Vì thế mình chụp lại nhiều lần, rồi so sánh để hiểu điều gì đã xảy ra. Hố mới ấy do một vật thể va vào Mặt Trăng, không phải dấu chân của chị Hằng đâu.', 'Yes. I take pictures again and compare them to understand what happened. An object striking the Moon made that new crater; it is not a trace left by Hằng.') },
  { id: 'gac-end-03', speaker: 'cuoi', ...text('Mắt Tròn giúp mình nhìn kỹ, Bánh Lưới giúp mình nhớ đường. Còn bạn giúp mình nhìn được cả những nơi đã đi qua.', 'Round Eyes helped me look closely, and Mesh Wheels helped me remember the way. You helped me see the places I have visited together.') },
  { id: 'gac-end-04', speaker: 'gacTroi', ...text('Cuội đã biết quan sát và tìm đường rồi đấy. Mang theo ánh sáng của mình nhé. Quãng đường còn lại, Cuội sẽ tự tìm ra thôi.', 'You have learned to observe and find your way. Take my light with you. You can find the rest of the way yourself.') },
] as const;
const gift = [
  { id: 'gac-gift-01', speaker: 'cuoi', ...text('Chiếc đèn sáng cả rồi! Kìa, ánh đèn đang trải về phía sườn đồi quen thuộc.', 'The whole lantern is shining! Look, its light reaches toward that familiar hillside.') },
  { id: 'gac-gift-02', speaker: 'gacTroi', ...text('Cuội thử đi tiếp nhé. Mình vẫn ở trên cao, giữ lại những câu chuyện dưới này.', 'Keep going, Cuội. I will be up here, keeping the stories of the land below.') },
  { id: 'gac-gift-03', speaker: 'cuoi', ...text('Cảm ơn Gác Trời. Mình đi tìm chị Hằng đây!', 'Thank you, Sky Watcher. I am going to find Hằng!') },
] as const;
export const gacFarewellLength = farewell.length;
export const gacGiftLength = gift.length;
export const gacFarewellDialogue = (language: Language, afterGift = false): StoryLine[] =>
  (afterGift ? gift : farewell).map(line => ({ id: line.id, speaker: line.speaker, text: line[language] }));
