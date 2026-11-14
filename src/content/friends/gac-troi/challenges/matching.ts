import { portraits } from '../../../assets';
import { text } from '../../../book/types';
import type { Language } from '../../../i18n';
import type { StoryLine } from '../../../story/types';
import type { GacImageId } from '../images';

export const gacSites = [
  { id: 'apollo11', name: 'Apollo 11', place: text('Biển Yên Tĩnh', 'Sea of Tranquility'), image: 'apollo11-lro' },
  { id: 'apollo12', name: 'Apollo 12', place: text('Đại Dương Bão', 'Ocean of Storms'), image: 'apollo12-surveyor3-lro' },
  { id: 'apollo15', name: 'Apollo 15', place: text('Hadley–Apennine', 'Hadley–Apennine'), image: 'apollo15-lro' },
] as const;
export type GacSite = typeof gacSites[number]['id'];
export const gacMemories = [
  { id: 'surveyor', portrait: portraits.matTron.url, name: text('Mắt Tròn', 'Round Eye'), site: 'apollo12', image: 'conrad-surveyor3-as12-48-7134',
    title: text('Một chuyến ghé thăm', 'A visitor on the Moon'),
    story: text('Bạn nhận ra nơi của Mắt Tròn rồi! Năm 1969, các phi hành gia Apollo 12 đã ghé thăm Surveyor 3, mang camera và một số bộ phận về Trái Đất để nghiên cứu.', 'You found Round Eye’ home! In 1969, Apollo 12 astronauts visited Surveyor 3 and brought its camera and some other parts back to Earth for study.'),
    caption: text('Ảnh chụp trên bề mặt: Conrad bên Surveyor 3.', 'Surface photograph: Conrad beside Surveyor 3.') },
  { id: 'lap-lanh', portrait: portraits.lapLanh.url, name: text('Lấp Lánh', 'Twinkle'), site: 'apollo11', image: 'apollo11-lro-annotated',
    title: text('Ánh sáng gửi về nhà', 'Light sent home'),
    story: text('Đúng Biển Yên Tĩnh rồi! Apollo 11 mang bộ phản xạ của Lấp Lánh đến đây. Nó gửi ánh sáng laser trở về phía Trái Đất, giúp đo khoảng cách đến Mặt Trăng.', 'The Sea of Tranquility, that’s right! Apollo 11 brought Twinkle’s reflector here. It sends laser light back toward Earth, helping measure the distance to the Moon.'),
    caption: text('Ảnh quỹ đạo khu Apollo 11; không phải ảnh cận cảnh bộ phản xạ.', 'Orbital view of Apollo 11; not a close-up of the reflector.') },
  { id: 'tai-thinh', portrait: portraits.taiThinh.url, name: text('Tai Thính', 'Sharp Ear'), site: 'apollo12', image: 'apollo12-surveyor3-lro-annotated',
    title: text('Những phép đo từ Đại Dương Bão', 'Measurements from the Ocean of Storms'),
    story: text('Tai Thính thuộc khu thiết bị ALSEP của Apollo 12 ở Đại Dương Bão, cùng vùng với Mắt Tròn. Địa chấn kế đo rung động của đất rồi gửi dữ liệu về Trái Đất. Ảnh quỹ đạo giúp nhận ra khu thí nghiệm; không cho thấy rõ chiếc máy nhỏ.', 'Sharp Ear belongs to Apollo 12’s ALSEP site in the Ocean of Storms, in the same region as Round Eye. Its seismometer measured ground vibrations and sent data to Earth. The orbital view identifies the experiment site, rather than showing the small instrument clearly.'),
    caption: text('Khu Apollo 12 và ALSEP nhìn từ quỹ đạo.', 'Apollo 12 and its ALSEP site seen from orbit.') },
  { id: 'ban-banh-luoi', portrait: portraits.banhLuoi.url, name: text('Bánh Lưới', 'Mesh Wheels'), site: 'apollo15', image: 'apollo15-lro',
    title: text('Dấu bánh xe ở Hadley–Apennine', 'Rover tracks at Hadley–Apennine'),
    story: text('Bánh Lưới chở các phi hành gia Apollo 15 khảo sát Hadley–Apennine năm 1971. Ảnh LRO chụp sau đó cho thấy bãi đáp và những dấu vết chuyến đi. Các vệt trên đất giúp nối góc nhìn từ quỹ đạo với câu chuyện trên bề mặt.', 'Mesh Wheels carried the Apollo 15 astronauts around Hadley–Apennine in 1971. Later LRO imagery shows the landing site and traces of their journey. Marks on the ground connect the orbital view with the surface story.'),
    caption: text('Khu Apollo 15 nhìn từ quỹ đạo, năm 2011. LROC NAC M175252641L,R.', 'Apollo 15 from orbit, 2011. LROC NAC M175252641L,R.') },
] as const satisfies readonly { id: string; portrait: string; name: ReturnType<typeof text>; site: GacSite; image: GacImageId; title: ReturnType<typeof text>; story: ReturnType<typeof text>; caption: ReturnType<typeof text> }[];
export type GacFriend = typeof gacMemories[number]['id'];
const intro = [
  { id: 'TC1-01', speaker: 'gacTroi', ...text('Đây là ba vùng đất mình chụp từ trên cao. Bạn còn nhớ đã gặp ai ở đâu không?', 'Here are three places I photographed from above. Do you remember whom you met in each place?') },
  { id: 'TC1-02', speaker: 'cuoi', ...text('Bốn người bạn ở những vùng đất nào nhỉ?', 'Where do our four friends live?') },
  { id: 'TC1-03', speaker: 'gacTroi', ...text('Mắt Tròn và Tai Thính cùng ở vùng Apollo 12. Chọn một người bạn, rồi chọn vùng đất bạn ấy ở nhé!', 'Round Eye and Sharp Ear share the Apollo 12 region. Choose a friend, then choose the place where they live!') },
] as const;
const summary = [
  { id: 'TC1-11', speaker: 'cuoi', ...text('Mình nhớ ra rồi! Bốn người bạn ở ba vùng đất. Nhìn từ trên cao, những nơi mình đi qua trông khác thật đấy.', 'Now I remember! Four friends in three places. The places I’ve visited look so different from above.') },
  { id: 'TC1-12', speaker: 'gacTroi', ...text('Bạn đã tìm lại được những nơi quen thuộc rồi. Mình giữ chúng trong sách nhé, để cùng tìm đường đi tiếp tới chị Hằng.', 'You’ve found those familiar places again. Let’s keep them in your book as we look for a way onward to chị Hằng.') },
] as const;
export const gacMatchingIntroLength = intro.length;
export const gacSummaryLength = summary.length;
export function gacMatchingDialogue(language: Language, ending = false): StoryLine[] {
  return (ending ? summary : intro).map(line => ({ id: line.id, speaker: line.speaker, text: line[language] }));
}

export const matchingCopy = {
  vi: {
    instruction: 'Chọn một người bạn, rồi chọn vùng đất bạn ấy ở.',
    hint: 'Mình thử nhớ lại nhé. Bạn ấy gắn với chuyến thám hiểm nào nhỉ?',
    waiting: 'Bốn người bạn đang chờ bạn tìm lại nơi quen thuộc.',
  },
  en: {
    instruction: 'Choose a friend, then choose the place where they live.',
    hint: 'Let’s think back. Which mission was this friend part of?',
    waiting: 'Help all four friends find their familiar places.',
  },
} as const;
