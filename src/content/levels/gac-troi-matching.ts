import { portraits } from '../assets';
import { text } from '../book/types';
import type { Language } from '../i18n';
import type { StoryLine } from '../earth-dialogue';
import type { GacImageId } from './gac-troi-images';

export const gacSites = [
  { id: 'apollo12', name: 'Apollo 12', place: text('Đại Dương Bão', 'Ocean of Storms'), image: 'apollo12-surveyor3-lro' },
  { id: 'apollo17', name: 'Apollo 17', place: text('Thung lũng Taurus–Littrow', 'Taurus–Littrow valley'), image: 'apollo17-lro' },
] as const;
export type GacSite = typeof gacSites[number]['id'];
export const gacMemories = [
  { id: 'surveyor', portrait: portraits.matTron.url, name: text('Mắt Tròn', 'Round Eyes'), site: 'apollo12', image: 'conrad-surveyor3-as12-48-7134',
    title: text('Một chuyến ghé thăm', 'A visitor on the Moon'),
    story: text('Bạn nhận ra nơi của Mắt Tròn rồi! Năm 1969, các phi hành gia Apollo 12 đã ghé thăm Surveyor 3, mang camera và một số bộ phận về Trái Đất để nghiên cứu.', 'You found Round Eyes’ home! In 1969, Apollo 12 astronauts visited Surveyor 3 and brought its camera and some other parts back to Earth for study.'),
    caption: text('Ảnh chụp trên bề mặt: Conrad bên Surveyor 3.', 'Surface photograph: Conrad beside Surveyor 3.') },
  { id: 'ban-banh-luoi', portrait: portraits.banhLuoi.url, name: text('Bánh Lưới', 'Mesh Wheels'), site: 'apollo17', image: 'apollo17-lro',
    title: text('Những đường xe còn đó', 'Tracks that remain'),
    story: text('Bạn nhớ đúng rồi! Đây là vùng Apollo 17. Những vệt xe trong ảnh nhắc mình nhớ những chuyến Bánh Lưới chở các phi hành gia đi khám phá.', 'You remembered! This is the Apollo 17 area. The rover tracks recall the journeys Mesh Wheels made, carrying astronauts as they explored.'),
    caption: text('Ảnh quỹ đạo có nhãn LRV chỉ nơi xe dừng lại.', 'The LRV label marks the rover’s final parking spot in this orbital image.') },
] as const satisfies readonly { id: string; portrait: string; name: ReturnType<typeof text>; site: GacSite; image: GacImageId; title: ReturnType<typeof text>; story: ReturnType<typeof text>; caption: ReturnType<typeof text> }[];
export type GacFriend = typeof gacMemories[number]['id'];
const intro = [
  { id: 'TC1-01', speaker: 'gacTroi', ...text('Đây là hai vùng đất mình chụp từ trên cao. Bạn còn nhớ đã gặp ai ở đâu không?', 'Here are two places I photographed from above. Do you remember whom you met in each place?') },
  { id: 'TC1-02', speaker: 'cuoi', ...text('Mắt Tròn và Bánh Lưới ở hai nơi khác nhau. Mình còn nhớ những dấu vết ở đó!', 'Round Eyes and Mesh Wheels live in different places. I remember the traces there!') },
  { id: 'TC1-03', speaker: 'gacTroi', ...text('Mình thử ghép từng bạn với vùng đất quen thuộc nhé. Những dấu vết sẽ giúp Cuội nhớ lại.', 'Let’s match each friend with their familiar place. The traces will help you remember.') },
] as const;
const summary = [
  { id: 'TC1-11', speaker: 'cuoi', ...text('Mình nhớ ra rồi! Hai người bạn ở hai vùng đất. Nhìn từ trên cao, những nơi mình đi qua trông khác thật đấy.', 'Now I remember! Two friends in two places. The places I’ve visited look so different from above.') },
  { id: 'TC1-12', speaker: 'gacTroi', ...text('Bạn đã tìm lại được những nơi quen thuộc rồi. Mình giữ chúng trong sách nhé, để cùng tìm đường đi tiếp tới chị Hằng.', 'You’ve found those familiar places again. Let’s keep them in your book as we look for a way onward to chị Hằng.') },
] as const;
export const gacMatchingIntroLength = intro.length;
export const gacSummaryLength = summary.length;
export function gacMatchingDialogue(language: Language, ending = false): StoryLine[] {
  return (ending ? summary : intro).map(line => ({ id: line.id, speaker: line.speaker, text: line[language] }));
}
