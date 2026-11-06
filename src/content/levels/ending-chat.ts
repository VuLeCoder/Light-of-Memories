import type { StoryLine } from '../earth-dialogue';
import type { Language } from '../i18n';
import type { LevelId } from './index';

/** Repeatable chats after the lantern farewell; these never change saved progress. */
export const endingChatLines = {
  'gac-troi': { vi: [], en: [] },
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
      { id: 'sparkle-chat-trail', speaker: 'lapLanh', text: 'Cuội còn đang tìm chị Hằng nhỉ? Có một người bạn tên Gác Trời hay chụp ảnh Mặt Trăng từ trên cao. Bạn thử hỏi xem, biết đâu bạn ấy giúp được!' },
    ],
    en: [
      { id: 'sparkle-chat-thanks', speaker: 'lapLanh', text: 'Thank you for coming to chat with me, Cuội! I will keep today’s visit like a little ray of sunshine.' },
      { id: 'sparkle-chat-trail', speaker: 'lapLanh', text: 'You’re still looking for Hằng, aren’t you? A friend called Sky Watcher photographs the Moon from above. Why not ask? Perhaps they can help!' },
    ],
  },
} as const satisfies Record<LevelId, Record<Language, readonly StoryLine[]>>;
