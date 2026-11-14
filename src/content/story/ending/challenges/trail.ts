import type { Language } from '../../../i18n';
import type { StoryLine } from '../../types';

const text = (vi: string, en: string) => ({ vi, en });
export const gacTrailCopy = {
  't04-slope': {
    intro: text('Triền đất thấp… Mình mở bản đồ xem nào.', 'The low slope… Let me look at the map.'),
    help: text('Đối chiếu bản đồ rồi chọn dáng đất giống điểm mốc đầu tiên.', 'Compare the map, then choose the shape matching the first landmark.'),
    done: text('Dáng đất này giống trong bản đồ. Bóng cây ở phía bên kia!', 'This slope matches the map. The tree’s shadow is on the other side!'),
  },
  't04-rock': {
    intro: text('Có ánh sáng sau khe đá. Là ngôi sao hay chiếc đèn nhỉ?', 'There’s a light beyond the split rock. Is it a star or a lantern?'),
    help: text('Xem từng điểm sáng, tìm hình chiếc đèn sau khe đá.', 'Look at each light and find the lantern shape beyond the split rock.'),
    done: text('Một chiếc đèn thấp thoáng sau đá! Mình đến gần xem.', 'A lantern peeping out from behind the rock! I’ll take a closer look.'),
  },
  't04-banyan': {
    intro: text('Cuội ơi, chị ở đây!', 'Cuội, I’m over here!'),
    help: text('Đi tới vùng sáng dưới cây để gặp chị Hằng.', 'Walk to the light beneath the tree to meet Hằng.'),
  },
  wrong: text('Thử so đường viền nhé. Triền đất trong bản đồ thấp và thoải hơn.', 'Compare the outlines. The slope on the map is lower and gentler.'),
  star: text('Ngôi sao ở cao, sáng thành những tia nhỏ.', 'A star high above, shining in little rays.'),
  lantern: text('Chiếc đèn ở thấp, có khung và quai.', 'A lantern down low, with a frame and handle.'),
};
const reunion = [
  ['reunion-01', 'cuoi', 'Gốc đa đây rồi! Mình đã trở về nơi bắt đầu.', 'The banyan! I am back where I began.'],
  ['reunion-02', 'chiHang', 'Cuội ơi, đi theo ánh đèn về bên gốc đa nhé.', 'Cuội, follow the lantern light back to the banyan.'],
  ['reunion-03', 'cuoi', 'Nhờ Mắt Tròn, Lấp Lánh, Tai Thính, Bánh Lưới và Gác Trời đấy chị.', 'Round Eye, Twinkle, Sharp Ear, Mesh Wheels and Sky Watcher helped me.'],
  ['reunion-04', 'cuoi', 'Chiếc đèn đang tỏa sáng xuống gốc cây!', 'The lantern is spreading light beneath the tree!'],
  ['reunion-05', 'chiHang', 'Hãy giữ những câu chuyện ấy trong lòng và kể lại cho mọi người, Cuội nhé.', 'Keep those stories in your heart and share them with others, Cuội.'],
] as const;
export const gacReunionDialogue = (language: Language): StoryLine[] =>
  reunion.map(([id, speaker, vi, en]) => ({ id, speaker, text: language === 'vi' ? vi : en }));
