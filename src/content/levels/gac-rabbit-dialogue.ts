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
    "vi": "Ơ, Thỏ Ngọc vừa chạy vào bãi đá kia rồi! Mình đi tìm bạn ấy nhé!",
    "en": "Oh, Moon Rabbit just ran into those rocks! Let’s go find our friend!"
  },
  {
    "id": "rabbit-bridge-02",
    "speaker": "gacTroi",
    "vi": "Mình sẽ đi cùng bạn! Nhấn H hoặc nút Gợi ý để hỏi mình; từ trên cao mình sẽ tìm dấu vết của Thỏ.",
    "en": "I’ll come with you! Press H or Hint to ask me; I can spot Rabbit’s clues from above."
  },
  {
    "id": "rabbit-bridge-03",
    "speaker": "gacTroi",
    "vi": "Đi gần tảng đá rồi nhấn E để tìm Thỏ và chơi ú òa nhé! Trên đường có quà cho chị Hằng, thích thì mình nhặt mang theo.",
    "en": "Walk close to a rock and press E to find Rabbit and play peekaboo! We can also collect presents for Hằng along the way."
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
    "vi": "Chiếc đèn giữ kỷ niệm của cả ba người bạn. Mình trở lại nơi em thức giấc nhé!",
    "en": "Your lantern holds memories of all three friends. Let’s return to where you woke up!"
  },
  {
    "id": "rabbit-farewell-01",
    "speaker": "cuoi",
    "vi": "Lúc mới đến, em tưởng nơi này chẳng có ai. Hóa ra em đã gặp được bao nhiêu người bạn!",
    "en": "When I arrived, I thought no one was here. But I have made so many friends!"
},
  {
    "id": "rabbit-farewell-02",
    "speaker": "chiHang",
    "vi": "Những thiết bị ở lại đây từng giúp con người hiểu thêm về Mặt Trăng. Có bạn đã nghỉ ngơi, có bạn vẫn đang làm việc.",
    "en": "The devices left here have helped people learn about the Moon. Some are resting now, while others are still working."
},
  {
    "id": "rabbit-farewell-03",
    "speaker": "cuoi",
    "vi": "Về nhà, em sẽ kể chuyện của các bạn. Để mọi người nhớ các bạn đã giúp chúng mình thế nào!",
    "en": "Back home, I will tell their stories, so everyone remembers how much they have helped us!"
},
  {
    "id": "rabbit-farewell-04",
    "speaker": "chiHang",
    "vi": "Và mỗi lần đi khám phá, chúng mình hãy biết giữ gìn nơi mình đặt chân đến nhé.",
    "en": "And whenever we explore, let’s take care of the places we visit."
},
  {
    "id": "rabbit-farewell-05",
    "speaker": "cuoi",
    "vi": "Em sẽ nhớ! Cảm ơn Mắt Tròn, Lấp Lánh và Gác Trời đã cùng em đi hết chuyến này!",
    "en": "I will! Thank you, Round Eyes, Sparkle and Sky Watcher, for sharing this adventure!"
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
  },
{"id": "rabbit-earth-01", "speaker": "an", "vi": "Bà ơi, những thiết bị ấy vẫn ở trên Mặt Trăng thật ạ?", "en": "Grandma, are those devices really still on the Moon?"},
{"id": "rabbit-earth-02", "speaker": "ba", "vi": "Ừ. Có chiếc đã hoàn thành nhiệm vụ, có chiếc vẫn đang giúp chúng ta khám phá.", "en": "Yes. Some have finished their missions, and others are still helping us explore."},
{"id": "rabbit-earth-03", "speaker": "an", "vi": "Vậy chúng mình vẫn nhớ những điều chúng đã làm, bà nhỉ?", "en": "So we still remember what they have done, don’t we, Grandma?"},
{"id": "rabbit-earth-04", "speaker": "ba", "vi": "Đúng rồi. Và khi đi đến những nơi mới, mình cũng cần nghĩ xem sẽ để lại điều gì.", "en": "That’s right. And when we visit new places, we should think about what we will leave behind."},
] as const;
export type RabbitDialogue = 'real' | 'bridge' | 'reunion' | 'farewell' | 'chat' | 'earth';
export function gacRabbitDialogue(stage: RabbitDialogue, language: Language): StoryLine[] {
  return lines.filter(line => line.id.startsWith(`rabbit-${stage}-`)).map(line => ({ id: line.id, speaker: line.speaker, text: line[language] }));
}
