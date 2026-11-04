import type { Language } from '../i18n';
import type { StoryLine } from '../earth-dialogue';

const meeting = [
  {
    "id": "MO-02",
    "speaker": "cuoi",
    "vi": "Đây là bức ảnh Bánh Lưới vừa cho mình xem! Gác Trời ơi, bạn đã chụp những đường xe này phải không?",
    "en": "This is the picture Mesh Wheels showed me! Sky Watcher, did you photograph these tracks?"
  },
  {
    "id": "MO-03",
    "speaker": "gacTroi",
    "vi": "Cuội đến rồi! Mình chụp đấy. Mọi người còn gọi mình là LRO. Mình bay quanh Mặt Trăng, chụp lại những vùng đất bên dưới.",
    "en": "You’re here, Cuội! Yes, I took it. I’m also called LRO. I travel around the Moon, taking pictures of the land below."
  },
  {
    "id": "MO-04",
    "speaker": "cuoi",
    "vi": "Mình vẫn chưa tìm được chị Hằng… Nhìn từ trên ấy, bạn có thấy rõ mọi thứ không?",
    "en": "I still haven’t found chị Hằng… Can you see everything clearly from up there?"
  },
  {
    "id": "MO-05",
    "speaker": "gacTroi",
    "vi": "Mình chụp được nhiều vùng đất. Nhưng có những vật quá nhỏ, ảnh của mình không nhìn rõ được đâu.",
    "en": "I photograph many places. Some things are too small to see clearly in my pictures."
  },
  {
    "id": "MO-06",
    "speaker": "cuoi",
    "vi": "Vậy mình thử nhìn lại những nơi đã đi qua nhé. Biết đâu lại tìm được đường đi tiếp!",
    "en": "Then let’s look back at the places I’ve visited. Maybe that will help us find a way ahead!"
  },
  {
    "id": "MO-07",
    "speaker": "gacTroi",
    "vi": "Ừ! Bạn đã gặp bốn người bạn rồi nhỉ? Mình cùng tìm những nơi ấy trên ảnh nhé.",
    "en": "Yes! You’ve met four friends, haven’t you? Let’s find those places in the pictures."
  }
] as const;
export const gacTroiMeetingLength = meeting.length;
export const gacTroiMeeting = (language: Language): StoryLine[] => meeting.map(line => ({ id: line.id, speaker: line.speaker, text: line[language] }));
export const gacTroiOrbitBook = {
  "id": "gac-book-orbit",
  "unlock": "meeting",
  "kind": "fact",
  "title": {
    "vi": "Góc nhìn từ quỹ đạo",
    "en": "A view from orbit"
  },
  "body": {
    "vi": "LRO là tàu bay quanh Mặt Trăng. Hệ máy ảnh LROC ghi ảnh bề mặt để các nhà khoa học nghiên cứu. Ảnh cho thấy nhiều dấu vết, nhưng những vật quá nhỏ không hiện rõ. Gác Trời nói chuyện qua đèn là nhân vật trong truyện.",
    "en": "LRO travels around the Moon. Its LROC camera system photographs the surface for scientists to study. Pictures reveal many traces, but very small objects cannot be seen clearly. Sky Watcher speaking through the lantern is part of the story."
  },
  "images": [
    "lro-instruments"
  ],
  "sources": [
    "https://science.nasa.gov/mission/lro/spacecraft-and-instruments/"
  ]
} as const;
