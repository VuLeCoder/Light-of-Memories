import type { StoryLine } from '../earth-dialogue';
import type { Language } from '../i18n';
import type { LevelId } from './index';

/** Repeatable chats after the lantern farewell; these never change saved progress. */
export const endingChatLines = {
  surveyor: {
    vi: [
      { id: 'round-eyes-chat-thanks', speaker: 'matTron', text: 'Cảm ơn Cuội đã đến trò chuyện với mình! Có bạn ghé thăm, mình vui lắm.' },
      { id: 'round-eyes-chat-trail', speaker: 'matTron', text: 'Cuội nhìn phía xa bên phải kìa, có một điểm sáng đang lấp lánh! Bạn thử đến gần xem nhé. Nhớ quay lại kể mình nghe nữa nha!' },
    ],
    en: [
      { id: 'round-eyes-chat-thanks', speaker: 'matTron', text: 'Thank you for coming to chat with me, Cuội! Your visit makes me so happy.' },
      { id: 'round-eyes-chat-trail', speaker: 'matTron', text: 'Look far to the right, Cuội. A little light is sparkling! Why not go closer and see? Come back and tell me about it!' },
    ],
  },
  'lap-lanh': {
    vi: [
      { id: 'sparkle-chat-thanks', speaker: 'lapLanh', text: 'Cảm ơn Cuội đã đến trò chuyện với mình! Mình sẽ nhớ buổi gặp hôm nay, như giữ một tia nắng nhỏ vậy.' },
      { id: 'sparkle-chat-trail', speaker: 'lapLanh', text: 'Ơ kìa, phía bên phải có những vòng gợn nhỏ trên mặt đất! Có lẽ một người bạn đang đợi Cuội khám phá. Bạn đến xem nhé, mình chờ nghe chuyện đó!' },
    ],
    en: [
      { id: 'sparkle-chat-thanks', speaker: 'lapLanh', text: 'Thank you for coming to chat with me, Cuội! I will keep today’s visit like a little ray of sunshine.' },
      { id: 'sparkle-chat-trail', speaker: 'lapLanh', text: 'Oh, look! Little ripples on the ground to the right! Perhaps another friend is waiting to meet you. Go and see, then tell me all about it!' },
    ],
  },
  'tai-thinh': {
    vi: [
      { id: 'keen-ears-chat-thanks', speaker: 'taiThinh', text: 'Cảm ơn Cuội đã đến trò chuyện với mình! Được nghe bạn kể và cùng bạn tìm hiểu bao điều, mình vui lắm.' },
      { id: 'keen-ears-chat-trail', speaker: 'taiThinh', text: 'Cuội ơi, nhìn về phía bên phải nhé! Có một vệt sáng bí ẩn ở cuối đường. Không biết ai đang chờ nhỉ? Bạn thử đến xem, rồi ghé kể mình nghe nha!' },
    ],
    en: [
      { id: 'keen-ears-chat-thanks', speaker: 'taiThinh', text: 'Thank you for coming to chat with me, Cuội! Listening to you and discovering things together makes me happy.' },
      { id: 'keen-ears-chat-trail', speaker: 'taiThinh', text: 'Cuội, look to the right! There is a mysterious glow at the end of the path. I wonder who is waiting? Go and see, then come back and tell me!' },
    ],
  },
} as const satisfies Record<LevelId, Record<Language, readonly StoryLine[]>>;
