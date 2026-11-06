import type { StoryLine } from '../earth-dialogue';
import type { Language } from '../i18n';

const lines = [
  {
    "id": "rabbit-real-01",
    "speaker": "gacTroi",
    "vi": "Camera LROC trên tàu LRO chụp ảnh Mặt Trăng từ trên cao.",
    "en": "The LROC camera aboard LRO takes pictures of the Moon from above."
  },
  {
    "id": "rabbit-real-02",
    "speaker": "gacTroi",
    "vi": "Các nhà khoa học dùng nhiều ảnh để lập bản đồ ánh sáng và bóng tối gần cực nam Mặt Trăng.",
    "en": "Scientists use many pictures to map light and shadow near the Moon’s south pole."
  },
  {
    "id": "rabbit-real-03",
    "speaker": "gacTroi",
    "vi": "Cuội cũng thử nhìn kỹ những dấu hiệu quanh mình nhé!",
    "en": "Cuội, try looking closely at the clues around you too!"
  },
  {
    "id": "rabbit-bridge-01",
    "speaker": "cuoi",
    "vi": "Ơ, Thỏ Ngọc đang trốn sau triền đất kìa!",
    "en": "Oh, Moon Rabbit is hiding behind the slope!"
  },
  {
    "id": "rabbit-bridge-02",
    "speaker": "gacTroi",
    "vi": "Trong câu chuyện của mình, đèn có những đốm sáng phép thuật hình ngôi sao.",
    "en": "In our story, the lantern has magical little lights shaped like stars."
  },
  {
    "id": "rabbit-bridge-03",
    "speaker": "gacTroi",
    "vi": "Các bạn sao ngủ quên trên đường rồi; mình tìm Thỏ rồi gọi sao dậy nhé!",
    "en": "The little stars fell asleep along the path; let’s find Rabbit, then wake them up!"
  },
  {
    "id": "rabbit-reunion-01",
    "speaker": "cuoi",
    "vi": "Chị Hằng ơi, em tìm thấy chị rồi!",
    "en": "Hằng, I found you!"
  },
  {
    "id": "rabbit-reunion-02",
    "speaker": "chiHang",
    "vi": "Cuội giỏi quá; Thỏ Ngọc dẫn em tới đây rồi!",
    "en": "Well done, Cuội; Moon Rabbit led you here!"
  },
  {
    "id": "rabbit-reunion-03",
    "speaker": "cuoi",
    "vi": "Mắt Tròn, Lấp Lánh và Gác Trời đã giúp em đấy chị.",
    "en": "Round Eyes, Sparkle and Sky Watcher helped me."
  },
  {
    "id": "rabbit-reunion-04",
    "speaker": "chiHang",
    "vi": "Chiếc đèn giữ kỷ niệm của cả ba người bạn. Mình nghỉ dưới cây đa nhé!",
    "en": "Your lantern holds memories of all three friends. Let’s rest beneath the banyan!"
  },
  {
    "id": "rabbit-farewell-01",
    "speaker": "cuoi",
    "vi": "Gác Trời ơi, mình gặp chị Hằng rồi; cảm ơn bạn nhé!",
    "en": "Sky Watcher, I found Hằng; thank you!"
  },
  {
    "id": "rabbit-farewell-02",
    "speaker": "chiHang",
    "vi": "Cảm ơn bạn đã giúp Cuội biết nhìn kỹ những dấu hiệu quanh mình.",
    "en": "Thank you for helping Cuội look closely at the clues around him."
  },
  {
    "id": "rabbit-farewell-03",
    "speaker": "gacTroi",
    "vi": "Mình vui lắm; gửi Cuội một chút sáng làm kỷ niệm nhé!",
    "en": "I’m so happy; here’s a little light to remember our adventure!"
  },
  {
    "id": "rabbit-farewell-04",
    "speaker": "cuoi",
    "vi": "Đèn sáng đủ rồi, có kỷ niệm của cả ba người bạn!",
    "en": "All the lantern’s lights are shining, with memories of all three friends!"
  },
  {
    "id": "rabbit-farewell-05",
    "speaker": "gacTroi",
    "vi": "Mình tiếp tục ngắm Mặt Trăng từ trên cao; hẹn gặp lại nhé!",
    "en": "I’ll keep watching the Moon from above; see you again!"
  },
  {
    "id": "rabbit-chat-01",
    "speaker": "gacTroi",
    "vi": "Cuội và chị Hằng vẫn ở bên cây đa chứ?",
    "en": "Are you and Hằng still by the banyan, Cuội?"
  },
  {
    "id": "rabbit-chat-02",
    "speaker": "cuoi",
    "vi": "Có cả Thỏ Ngọc nữa; bạn ấy lại ngủ cạnh đèn rồi!",
    "en": "Moon Rabbit is here too, asleep beside the lantern again!"
  },
  {
    "id": "rabbit-chat-03",
    "speaker": "gacTroi",
    "vi": "Những câu chuyện của chúng mình vẫn ở trong sách, bạn mở xem nhé!",
    "en": "Our stories are still in the book, ready for you to read!"
  }
] as const;
export type RabbitDialogue = 'real' | 'bridge' | 'reunion' | 'farewell' | 'chat';
export function gacRabbitDialogue(stage: RabbitDialogue, language: Language): StoryLine[] {
  return lines.filter(line => line.id.startsWith(`rabbit-${stage}-`)).map(line => ({ id: line.id, speaker: line.speaker, text: line[language] }));
}
