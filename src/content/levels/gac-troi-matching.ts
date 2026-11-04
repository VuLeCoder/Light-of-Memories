import { portraits } from '../assets';
import { text } from '../book/types';
import type { Language } from '../i18n';
import type { StoryLine } from '../earth-dialogue';
import type { GacImageId } from './gac-troi-images';

export const gacSites = [
  { id: 'apollo11', name: 'Apollo 11', place: text('Biển Yên Tĩnh', 'Sea of Tranquility'), image: 'apollo11-lro' },
  { id: 'apollo12', name: 'Apollo 12', place: text('Đại Dương Bão', 'Ocean of Storms'), image: 'apollo12-surveyor3-lro' },
  { id: 'apollo17', name: 'Apollo 17', place: text('Thung lũng Taurus–Littrow', 'Taurus–Littrow valley'), image: 'apollo17-lro' },
] as const;
export type GacSite = typeof gacSites[number]['id'];
export const gacMemories = [
  { id: 'surveyor', portrait: portraits.matTron.url, name: text('Mắt Tròn', 'Round Eyes'), site: 'apollo12', image: 'conrad-surveyor3-as12-48-7134',
    title: text('Một chuyến ghé thăm', 'A visitor on the Moon'),
    story: text('Bạn nhận ra nơi của Mắt Tròn rồi! Năm 1969, các phi hành gia Apollo 12 đã ghé thăm Surveyor 3, mang camera và một số bộ phận về Trái Đất để nghiên cứu.', 'You found Round Eyes’ home! In 1969, Apollo 12 astronauts visited Surveyor 3 and brought its camera and some other parts back to Earth for study.'),
    caption: text('Ảnh chụp trên bề mặt: Conrad bên Surveyor 3.', 'Surface photograph: Conrad beside Surveyor 3.') },
  { id: 'lap-lanh', portrait: portraits.lapLanh.url, name: text('Lấp Lánh', 'Sparkle'), site: 'apollo11', image: 'apollo11-lro-annotated',
    title: text('Ánh sáng gửi về nhà', 'Light sent home'),
    story: text('Đúng Biển Yên Tĩnh rồi! Apollo 11 mang bộ phản xạ của Lấp Lánh đến đây. Nó gửi ánh sáng laser trở về phía Trái Đất, giúp đo khoảng cách đến Mặt Trăng.', 'The Sea of Tranquility, that’s right! Apollo 11 brought Sparkle’s reflector here. It sends laser light back toward Earth, helping measure the distance to the Moon.'),
    caption: text('Ảnh quỹ đạo khu Apollo 11; không phải ảnh cận cảnh bộ phản xạ.', 'Orbital view of Apollo 11; not a close-up of the reflector.') },
  { id: 'tai-thinh', portrait: portraits.taiThinh.url, name: text('Tai Thính', 'Keen Ears'), site: 'apollo12', image: 'apollo12-surveyor3-lro-annotated',
    title: text('Hai người bạn cùng vùng đất', 'Two friends in one place'),
    story: text('Tai Thính cũng ở vùng Apollo 12, gần Mắt Tròn đấy! Bạn ấy thuộc nhóm thiết bị lắng nghe và tìm hiểu Mặt Trăng mà các phi hành gia đặt lại nơi này.', 'Keen Ears is in the Apollo 12 area too, near Round Eyes! This friend belongs to the experiments the astronauts left here to listen to and study the Moon.'),
    caption: text('Nhãn ALSEP chỉ khu thí nghiệm, không phải ảnh cận cảnh Tai Thính.', 'ALSEP labels the experiment area, not a close-up of Keen Ears.') },
  { id: 'ban-banh-luoi', portrait: portraits.banhLuoi.url, name: text('Bánh Lưới', 'Mesh Wheels'), site: 'apollo17', image: 'apollo17-lro',
    title: text('Những đường xe còn đó', 'Tracks that remain'),
    story: text('Bạn nhớ đúng rồi! Đây là vùng Apollo 17. Những vệt xe trong ảnh nhắc mình nhớ những chuyến Bánh Lưới chở các phi hành gia đi khám phá.', 'You remembered! This is the Apollo 17 area. The rover tracks recall the journeys Mesh Wheels made, carrying astronauts as they explored.'),
    caption: text('Ảnh quỹ đạo có nhãn LRV chỉ nơi xe dừng lại.', 'The LRV label marks the rover’s final parking spot in this orbital image.') },
] as const satisfies readonly { id: string; portrait: string; name: ReturnType<typeof text>; site: GacSite; image: GacImageId; title: ReturnType<typeof text>; story: ReturnType<typeof text>; caption: ReturnType<typeof text> }[];
export type GacFriend = typeof gacMemories[number]['id'];
const intro = [
  { id: 'TC1-01', speaker: 'gacTroi', ...text('Đây là ba vùng đất mình chụp từ trên cao. Bạn còn nhớ đã gặp ai ở đâu không?', 'Here are three places I photographed from above. Do you remember whom you met in each place?') },
  { id: 'TC1-02', speaker: 'cuoi', ...text('Có bốn người bạn mà chỉ có ba tấm ảnh thôi à?', 'Four friends, but only three pictures?') },
  { id: 'TC1-03', speaker: 'gacTroi', ...text('Ừ, có hai bạn ở cùng một vùng đấy. Chọn một người bạn, rồi chọn vùng đất bạn ấy ở nhé!', 'Yes, two friends share one area. Choose a friend, then choose the place where they live!') },
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
