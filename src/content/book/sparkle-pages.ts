import type { RealWorldPage } from './real-world';
import { text } from './types';
import { sparkleKeepsakes } from '../friends/lap-lanh/images';

export const sparkleIntroTitle = text('Lấp Lánh — Người bạn thích đố vui', 'Twinkle — A friend who loves riddles');
const report = 'https://ilrs.gsfc.nasa.gov/docs/2026/lunar/Apollo11_Preliminary_Sci_Report_LLR.pdf';

/** Book chronology is independent of the order in which the game gifts photos. */
export const sparkleFactualPages: RealWorldPage[] = [
  {
    id: 'sparkle-photo-0', after: 'lap-lanh', chapter: 'apollo11', section: 'C2.1',
    title: text('Bảng phản xạ laser Apollo 11 · Đặt xuống Mặt Trăng', 'Apollo 11 laser reflector · Placed on the Moon'),
    image: sparkleKeepsakes[1].src,
    caption: text('Bảng phản xạ còn gấp trên mặt đất, năm 1969. NASA · AS11-40-5945.', 'The folded reflector on the lunar surface, 1969. NASA · AS11-40-5945.'),
    paragraphs: [
      text('Laser Ranging Retroreflector (LRRR) là bảng phản xạ laser được Apollo 11 đưa tới Biển Yên Tĩnh năm 1969.', 'The Laser Ranging Retroreflector (LRRR) was delivered to the Sea of Tranquility by Apollo 11 in 1969.'),
      text('Ảnh ghi lại bảng khi còn gấp, trước khi được mở và căn chỉnh để hướng về Trái Đất.', 'This photograph shows the folded panel, before it was opened and aligned toward Earth.'),
    ],
    sources: [report], layout: 'above',
  },
  {
    id: 'sparkle-photo-1', after: 'sparkle-photo-0', chapter: 'apollo11', section: 'C2.1',
    title: text('Bảng phản xạ laser Apollo 11 · Sẵn sàng phản xạ ánh sáng', 'Apollo 11 laser reflector · Ready to reflect light'),
    image: sparkleKeepsakes[0].src,
    caption: text('Bảng phản xạ đã triển khai, năm 1969. NASA · AS11-40-5952.', 'The deployed reflector, 1969. NASA · AS11-40-5952.'),
    paragraphs: [
      text('Neil Armstrong mở và căn chỉnh bảng phản xạ laser Apollo 11 hướng về Trái Đất.', 'Neil Armstrong opened and aligned the Apollo 11 laser reflector toward Earth.'),
      text('Lăng kính đưa xung laser về phía trạm gửi. Thời gian ánh sáng đi và về giúp đo khoảng cách từ trạm trên Trái Đất tới thiết bị.', 'Its prisms return laser pulses toward the sending station. Timing the round trip measures the distance from the Earth station to the instrument.'),
    ],
    sources: [report], layout: 'above',
  },
];
