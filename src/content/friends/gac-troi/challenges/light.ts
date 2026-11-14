import { remembrance } from '../../../story/remembrance';
import type { Language } from '../../../i18n';
import type { StoryLine } from '../../../story/types';
import type { GacLandmark } from '../progress';

const text = (vi: string, en: string) => ({ vi, en });
export const gacLightSections: readonly {
  landmark: GacLandmark; name: Record<Language, string>; right: Record<Language, string>;
  wrong: Record<Language, string>; branches: readonly { id: string; name: Record<Language, string>; points: string; lit: readonly boolean[] }[];
}[] = [
  { landmark: 'low-slope', name: text('Triền đất thấp', 'Low slope'),
    right: text('Triền đất thấp còn nhìn rõ ở cả hai lúc.', 'The low slope is visible at both moments.'),
    wrong: text('Lúc sau, lòng hố nằm trong bóng tối nên khó nhìn rõ lối.', 'Later, the crater floor is in shadow, so the path is hard to see.'),
    branches: [
      { id: 'low-slope', name: text('Qua triền thấp', 'Past the low slope'), points: '90,330 210,330 300,310', lit: [true, true] },
      { id: 'crater-floor', name: text('Qua lòng hố', 'Across the crater floor'), points: '90,330 170,180 300,310', lit: [true, false] },
    ] },
  { landmark: 'split-rock', name: text('Đá có khe', 'Split rock'),
    right: text('Đường vòng phía ngoài đưa mình tới khe đá.', 'The outer path leads to the split rock.'),
    wrong: text('Chỗ sát chân đá này bị bóng che ở một lúc. Thử nhìn phía ngoài nhé.', 'The foot of the rock is shaded at one moment. Try looking around the outside.'),
    branches: [
      { id: 'outer-rock', name: text('Vòng phía ngoài', 'Around the outside'), points: '300,310 420,360 540,300', lit: [true, true] },
      { id: 'rock-foot', name: text('Sát chân đá', 'By the foot of the rock'), points: '300,310 430,245 540,300', lit: [false, true] },
    ] },
  { landmark: 'banyan-shadow', name: text('Bóng cây đa', 'Banyan shadow'),
    right: text('Từ dải đất này, mình nhận ra bóng cây đa.', 'From this strip of ground, we can make out the banyan’s shadow.'),
    wrong: text('Lối sát vách nằm trong bóng tối lúc đầu. Mình xem nhánh còn lại nhé.', 'The path by the wall is shaded earlier. Let’s look at the other branch.'),
    branches: [
      { id: 'open-strip', name: text('Qua dải đất thoáng', 'Along the open strip'), points: '540,300 680,320 820,280', lit: [true, true] },
      { id: 'wall-path', name: text('Đi sát vách', 'Along the wall'), points: '540,300 680,180 820,280', lit: [false, true] },
    ] },
];
const lines = {
  't03-intro': [
    ['t03-intro-01', 'cuoi', 'Gác Trời ơi, bạn có theo dõi những nơi tối trên Mặt Trăng không?', 'Sky Watcher, do you keep watch over dark places on the Moon?'],
    ['t03-intro-02', 'gacTroi', 'Có chứ! Mình ghi lại ánh sáng và bóng tối gần cực Mặt Trăng. Có nơi đang tối nhưng một lúc sau lại sáng lên.', 'Yes! I record light and shadow near the lunar poles. Some places are dark at first, but light up later.'],
    ['t03-intro-03', 'gacTroi', 'Cuội giúp mình một ca trực nhé. Mình cần tìm vùng vẫn tối qua các hướng nắng trong mô hình miệng hố này.', 'Help me with a watch, Cuội. We need to find the region that stays dark under each sunlight direction in this crater model.'],
  ],
  't03-dark-intro': [
    ['t03-dark-01', 'cuoi', 'Ôi, dưới này tối quá! Gác Trời ơi, mình đi đâu bây giờ?', 'Oh, it is so dark down here! Sky Watcher, where should I go?'],
    ['t03-dark-02', 'gacTroi', 'Cuội thấy ba đốm sáng nhỏ không? Đó là những ngọn đèn đang ngủ. Mình cùng đánh thức chúng nhé!', 'Can you see three tiny glimmers? Those are sleeping lanterns. Let’s wake them up!'],
    ['t03-dark-03', 'gacTroi', 'Đi tới đèn số 1, rồi nhấn E để thắp nhé. Nếu dùng màn hình cảm ứng, chạm đất để đi, tới gần rồi chạm đèn. Thắp lần lượt cả ba, con đường sẽ sáng lên!', 'Walk to lantern 1 and press E to light it. On a touchscreen, tap the ground to walk, then tap the lantern when you are close. Light all three in order and the path will shine!'],
  ],
  't03-story': [
    ['t03-done-01', 'cuoi', 'Ca trực xong rồi! Hóa ra những chỗ tối cũng có câu chuyện riêng, Gác Trời nhỉ?', 'Our watch is over! Even the dark places have stories of their own, don’t they?'],
    ['t03-done-02', 'gacTroi', 'Ừ! Cảm ơn Cuội đã cùng mình quan sát. Mình mở lại những bức ảnh nhé, để kể bạn nghe công việc của mình từ trên cao.', 'Yes! Thank you for watching with me, Cuội. Let’s open the pictures again, so I can tell you about my work from above.'],
  ],
  'gac-farewell': [
    ['gac-farewell-01', 'gacTroi', remembrance.vi.request, remembrance.en.request],
    ['gac-farewell-02', 'cuoi', remembrance.vi.reply, remembrance.en.reply],
    ['gac-farewell-03', 'gacTroi', 'Mình gửi thêm một chút sáng vào đèn của bạn.', 'Here’s a little more light for your lantern.'],
    ['gac-farewell-04', 'cuoi', 'Đèn ông sao đã sáng đủ rồi! Mỗi ánh sáng nhắc mình nhớ một người bạn.', 'All five points are shining! Each light reminds me of a friend.'],
  ],
  chat: [
    ['gac-chat-01', 'gacTroi', 'Có Cuội ghé thăm, mình vui lắm. Những câu chuyện vẫn ở trong sách nhé.', 'I’m glad you stopped by, Cuội. The stories are still in your book.'],
    ['gac-chat-02', 'gacTroi', 'Bên phải là triền đất thấp. Cứ nhìn bản đồ rồi chậm rãi đi tiếp nhé.', 'The low slope is to the right. Check your map and take your time.'],
  ],
} as const;
export type GacLightDialoguePhase = Exclude<keyof typeof lines, 'chat'>;
export const gacLightDialogue = (phase: keyof typeof lines, language: Language): StoryLine[] =>
  lines[phase].map(([id, speaker, vi, en]) => ({ id, speaker, text: language === 'vi' ? vi : en }));

/** Shared silhouettes for the imaginary map and the forthcoming ground scenes. */
export const gacLandmarkShapes = [
  'M-45 16H-30V12H-15V4H0V-4H18V0H30V8H44V16Z',
  'M-32 20V-12H-24V-28H-10L0 -5L12 -30H28V-16H35V20H8L0 3L-7 20Z',
  'M-54 -12V-30H-38V-42H-15V-48H18V-42H40V-30H54V-12H28V16H24V-12H10V34H-9V-12H-28V18H-32V-12Z',
] as const;

