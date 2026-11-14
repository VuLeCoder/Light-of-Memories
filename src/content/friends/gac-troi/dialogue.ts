import type { Language } from '../../i18n';
import type { StoryLine } from '../../story/types';

const meeting = [
  {
    "id": "MO-02",
    "speaker": "cuoi",
    "vi": "Nhìn hình chiếu bên Bánh Lưới, mình nhớ những dấu đường đi trong ảnh chụp từ trên cao. Bạn là Gác Trời, người đã chụp bức ảnh ấy phải không?",
    "en": "The projection beside Mesh Wheels reminded me of the trails in that overhead picture. Are you Sky Watcher, the friend who took it?"
  },
  {
    "id": "MO-03",
    "speaker": "gacTroi",
    "vi": "Cuội đến rồi! Là mình đây. Mọi người còn gọi mình là LRO. Mình bay quanh Mặt Trăng, chụp lại những vùng đất bên dưới.",
    "en": "You’re here, Cuội! That’s me. I’m also called LRO. I travel around the Moon, taking pictures of the land below."
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
    "vi": "Ừ! Bạn đã gặp Mắt Tròn, Lấp Lánh, Tai Thính và Bánh Lưới rồi nhỉ? Mình cùng tìm những nơi ấy trên ảnh nhé.",
    "en": "Yes! You’ve met Round Eye, Twinkle, Sharp Ear and Mesh Wheels, haven’t you? Let’s find those places in the pictures."
  }
] as const;
export const gacTroiMeetingLength = meeting.length;
export const gacTroiMeeting = (language: Language): StoryLine[] => meeting.map(line => ({ id: line.id, speaker: line.speaker, text: line[language] }));
// T02 introduction continues into the side-by-side photo comparison.
export const gacT02Intro = (language: Language): StoryLine[] => [
  { id: 't02-intro-01', speaker: 'gacTroi', text: language === 'vi' ? 'Còn đây là hai ảnh của cùng một vùng đất, chụp vào hai ngày khác nhau.' : 'Here are two pictures of the same place, taken on different days.' },
  { id: 't02-intro-02', speaker: 'gacTroi', text: language === 'vi' ? 'Mình đặt hai ảnh cạnh nhau nhé. Cuội tìm vùng có thêm đốm sáng rồi chọn số của vùng ấy.' : 'Let’s put them side by side. Find the area with a new bright spot, Cuội, then choose its number.' },
];
