import { banBanhLuoiDialogue } from '../../friends/ban-banh-luoi/dialogue';
import type { StoryLine } from '../types';
import type { Language } from '../../i18n';
import type { LevelId } from '../../friends/index';

/** Repeatable chats after the lantern farewell; these never change saved progress. */
export const endingChatLines = {
  'ban-banh-luoi': { vi: banBanhLuoiDialogue('vi', 'endingChat'), en: banBanhLuoiDialogue('en', 'endingChat') },
  'tai-thinh': {
    vi: [
      { id: 'keen-ears-chat-thanks', speaker: 'taiThinh', text: 'Cảm ơn Cuội đã đến trò chuyện với mình! Được nghe bạn kể và cùng bạn tìm hiểu bao điều, mình vui lắm.' },
      { id: 'keen-ears-chat-trail', speaker: 'taiThinh', text: 'Cuội thử lần theo những dấu bánh xe kia nhé. Biết đâu phía trước có một người bạn đang chờ! Gặp rồi nhớ quay lại kể mình nghe nha!' },
    ],
    en: [
      { id: 'keen-ears-chat-thanks', speaker: 'taiThinh', text: 'Thank you for coming to chat with me, Cuội! Listening to you and discovering things together makes me happy.' },
      { id: 'keen-ears-chat-trail', speaker: 'taiThinh', text: 'Try following those wheel tracks, Cuội. Maybe a friend is waiting up ahead! Come back and tell me when you meet them!' },
    ],
  },

   'gac-troi': {
    vi: [
      { id: 'gac-chat-01', speaker: 'gacTroi', text: 'Cuội và chị Hằng vẫn ở bên cây đa chứ?' },
      { id: 'gac-chat-02', speaker: 'cuoi', text: 'Em vẫn giữ chiếc đèn với ánh sáng của các bạn đây!' },
      { id: 'gac-chat-03', speaker: 'gacTroi', text: 'Những câu chuyện của chúng mình vẫn ở trong sách, bạn mở xem nhé!' },
    ],
    en: [
      { id: 'gac-chat-01', speaker: 'gacTroi', text: 'Are you and Hằng still by the banyan, Cuội?' },
      { id: 'gac-chat-02', speaker: 'cuoi', text: 'I still have my lantern with all our friends’ light!' },
      { id: 'gac-chat-03', speaker: 'gacTroi', text: 'Our stories are still in the book, ready for you to read!' },
    ],
  },
  surveyor: {
    vi: [
      { id: 'round-eyes-chat-thanks', speaker: 'matTron', text: 'Cảm ơn Cuội đã nhớ câu chuyện của mình. Chỉ cần có ai nhớ, mình không bao giờ thật sự một mình.' },
      { id: 'round-eyes-chat-trail', speaker: 'matTron', text: 'Phía xa bên phải là bạn mình, bạn ấy thích chơi với ánh sáng. Đến gặp bạn ấy nhé, Cuội. Và kể bạn ấy nghe chuyện của mình nữa!' },
    ],
    en: [
      { id: 'round-eyes-chat-thanks', speaker: 'matTron', text: 'Thank you for remembering my story, Cuội. As long as someone remembers me, I am never truly alone.' },
      { id: 'round-eyes-chat-trail', speaker: 'matTron', text: 'My friend is far to the right. She loves playing with light. Go and meet her, Cuội. And tell her my story too!' },
    ],
  },
  'lap-lanh': {
    vi: [
      { id: 'sparkle-chat-thanks', speaker: 'lapLanh', text: 'Cảm ơn Cuội đã đến trò chuyện với mình! Mình sẽ nhớ buổi gặp hôm nay, như giữ một tia nắng nhỏ vậy.' },
      { id: 'sparkle-chat-trail', speaker: 'lapLanh', text: 'Những hòn sỏi khẽ rung bên kia làm mình nhớ Tai Thính ở Đại Dương Bão. Bạn ấy đo những rung động trong lòng đất đấy!' },
    ],
    en: [
      { id: 'sparkle-chat-thanks', speaker: 'lapLanh', text: 'Thank you for coming to chat with me, Cuội! I will keep today’s visit like a little ray of sunshine.' },
      { id: 'sparkle-chat-trail', speaker: 'lapLanh', text: 'Those gently trembling pebbles remind me of Sharp Ear in the Ocean of Storms. Our friend measures tremors within the ground!' },
    ],
  },
} as const satisfies Record<LevelId, Record<Language, readonly StoryLine[]>>;
