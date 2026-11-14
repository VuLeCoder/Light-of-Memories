import type { Language } from '../../../i18n';
import type { StoryLine } from '../../../story/types';

export const impactSource = 'https://svs.gsfc.nasa.gov/4242/';
export const impactCredit = 'NASA/GSFC/Arizona State University; NASA’s Scientific Visualization Studio · Ernie Wright';
export const impactPhoto = (when: 'before' | 'after') => `${import.meta.env.BASE_URL}images/memories/gac-troi/impact2013-${when}.webp`;
export const impactAlt = {
  before: { vi: 'Bề mặt Mặt Trăng trước va chạm, có nhiều hố nhỏ.', en: 'Lunar surface before the impact, with many small craters.' },
  after: { vi: 'Cùng vùng bề mặt sau va chạm; hãy so sánh với ảnh trước.', en: 'The same surface after the impact; compare it with the earlier picture.' },
  hint: { vi: 'Ảnh trước va chạm với khung gợi ý rộng gần giữa ảnh.', en: 'Before the impact, with a broad hint box near the middle.' },
  answer: { vi: 'Khoanh vùng hố va chạm mới gần giữa ảnh sau.', en: 'The new crater near the middle of the later image is circled.' },
};
export const impactDate = (when: 'before' | 'after', language: Language) => when === 'before'
  ? (language === 'vi' ? 'Trước · 12/02/2012' : 'Before · 12 Feb 2012')
  : (language === 'vi' ? 'Sau · 28/07/2013' : 'After · 28 Jul 2013');
export const impactTarget = { x: .509, y: .5, rx: .06, ry: .1 } as const;
export const gacT02Story = (language: Language): StoryLine[] => [
  { id: 't02-found-01', speaker: 'cuoi', text: language === 'vi' ? 'Đốm sáng ở giữa này trước chưa có!' : 'This bright spot in the middle wasn’t there before!' },
  { id: 't02-found-02', speaker: 'gacTroi', text: language === 'vi' ? 'Đó là một hố va chạm mới, rộng khoảng 18 mét.' : 'It’s a new impact crater, about 18 metres wide.' },
  { id: 't02-found-03', speaker: 'gacTroi', text: language === 'vi' ? 'Kính thiên văn trên Trái Đất thấy chớp sáng hôm ấy. Sau đó, ảnh của mình giúp tìm ra chiếc hố.' : 'A telescope on Earth saw the flash that day. Later, my pictures helped find the crater.' },
  { id: 't02-found-04', speaker: 'cuoi', text: language === 'vi' ? 'Một dấu nhỏ cũng kể được cả một chuyện nhỉ.' : 'Even a little mark can tell a whole story.' },
];

export const impactCopy = {
  vi: {
    instruction: 'Nhìn hai ảnh. Vùng nào có thêm đốm sáng? Chọn 1, 2 hoặc 3.',
    hint: 'Vùng này vẫn giống nhau. Nhìn vùng 2 ở hai ảnh nhé: ảnh sau có gì mới?',
  },
  en: {
    instruction: 'Look at both pictures. Which area has a new bright spot? Choose 1, 2 or 3.',
    hint: 'This area looks the same. Look at area 2 in both pictures: what is new in the later one?',
  },
} as const;
