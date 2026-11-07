import type { Language } from '../i18n';
import type { StoryLine } from '../earth-dialogue';
import type { GacLandmark } from './gac-troi-progress';

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
    ['t03-intro-01', 'cuoi', 'Nhìn kỹ có giúp mình tìm đường tới chị Hằng không?', 'Could looking closely help me find the way to Hằng?'],
    ['t03-intro-02', 'gacTroi', 'Các nhà khoa học dùng ảnh LROC để lập bản đồ ánh sáng và bóng tối gần cực nam Mặt Trăng.', 'Scientists use LROC pictures to map light and shadow near the Moon’s south pole.'],
    ['t03-intro-03', 'gacTroi', 'Mình dẫn Cuội một đoạn đi tìm chị Hằng nhé! Đi sang phải nào. Phía trước có ba ngọn đèn đang chờ Cuội thắp sáng.', 'Let me guide you part of the way to Hằng! Walk to the right. Three lanterns ahead are waiting for you to light them.'],
  ],
  't03-dark-intro': [
    ['t03-dark-01', 'cuoi', 'Ôi, dưới này tối quá! Gác Trời ơi, mình đi đâu bây giờ?', 'Oh, it is so dark down here! Sky Watcher, where should I go?'],
    ['t03-dark-02', 'gacTroi', 'Cuội thấy ba đốm sáng nhỏ không? Đó là những ngọn đèn đang ngủ. Mình cùng đánh thức chúng nhé!', 'Can you see three tiny glimmers? Those are sleeping lanterns. Let’s wake them up!'],
    ['t03-dark-03', 'gacTroi', 'Đi tới đèn số 1, rồi nhấn E để thắp nhé. Nếu dùng màn hình cảm ứng, chạm đất để đi, tới gần rồi chạm đèn. Thắp lần lượt cả ba, con đường sẽ sáng lên!', 'Walk to lantern 1 and press E to light it. On a touchscreen, tap the ground to walk, then tap the lantern when you are close. Light all three in order and the path will shine!'],
  ],
  't03-story': [
    ['t03-done-01', 'cuoi', 'Qua triền đất thấp, tới tảng đá có khe, rồi tìm bóng cây đa.', 'Past the low slope, to the split rock, then look for the banyan’s shadow.'],
    ['t03-done-02', 'gacTroi', 'Đúng rồi. Mình gửi bản đồ ấy vào đèn của Cuội nhé.', 'That’s it. I’ll tuck the map into your lantern.'],
  ],
  'gac-farewell': [
    ['gac-farewell-01', 'gacTroi', 'Mình chỉ nhìn được đến đây thôi. Qua triền đất, Cuội sẽ tự tìm tiếp nhé.', 'This is as far as I can see. Beyond the slope, you’ll need to look around for yourself.'],
    ['gac-farewell-02', 'cuoi', 'Cảm ơn bạn. Mình đã biết nhìn kỹ ánh sáng và bóng tối rồi.', 'Thank you. I have learned to look closely at light and shadow.'],
    ['gac-farewell-03', 'gacTroi', 'Mình gửi thêm một chút sáng vào đèn của bạn.', 'Here’s a little more light for your lantern.'],
    ['gac-farewell-04', 'cuoi', 'Đèn sáng đủ rồi! Mình đi tìm chị Hằng đây!', 'All the lantern’s lights are shining! I’m off to find Hằng!'],
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

