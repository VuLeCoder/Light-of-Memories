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
    "vi": "Chào Cuội! Mình là Gác Trời. Tên khoa học của mình là LRO. Mình bay quanh Mặt Trăng để chụp ảnh bề mặt.",
    "en": "Hello, Cuội! I'm Sky Watcher. My scientific name is LRO. I orbit the Moon and photograph its surface."
  },
  {
    "id": "MO-04",
    "speaker": "cuoi",
    "vi": "Bạn có nhìn thấy mọi thứ dưới này không?",
    "en": "Can you see everything down here?"
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
    "vi": "Vậy mình cùng xem những điều ảnh kể được nhé!",
    "en": "Then let's see what the pictures can tell us!"
  },
  {
    "id": "MO-07",
    "speaker": "gacTroi",
    "vi": "Được chứ. Trước hết, hãy giúp mình tìm nơi ở của bốn người bạn.",
    "en": "Let's start by finding where our four friends live."
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
