import { text, type BookChapter, type BookText } from './types';
import { memoryPhotos } from '../levels/surveyor-dig';

const sources = {
 surveyor: 'https://science.nasa.gov/mission/surveyor-3/',
 visit: 'https://www.jpl.nasa.gov/blog/2012/1/surveyor-3-camera-returned-from-the-moon',
 reflector: 'https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/',
 prisms: 'https://ilrs.cddis.eosdis.nasa.gov/missions/satellite_missions/current_missions/ap11_reflector.html',
} as const;
export interface RealWorldPage {
 id: string; after: string; chapter: BookChapter; section: string;
 title: BookText; paragraphs: BookText[]; image?: string; caption: BookText;
 sources: string[]; layout: 'above' | 'wrap';
}
export const realWorldPages: RealWorldPage[] = [];
function add(after: string, chapter: BookChapter, section: string, title: BookText, image: string | undefined, caption: BookText, refs: (keyof typeof sources)[], paragraphs: BookText[], layout: 'above' | 'wrap' = 'wrap') {
 realWorldPages.push({ id: `${after}-reality`, after, chapter, section, title, image, caption, sources: refs.map(key => sources[key]), paragraphs, layout: image?.includes('seismogram') ? 'above' : layout });
}
add('surveyor', 'surveyor', 'C1.1', text('Surveyor 3 ngoài đời thật', 'Meet the real Surveyor 3'), undefined, text('Surveyor 3 trên bề mặt Mặt Trăng. NASA.', 'Surveyor 3 on the lunar surface. NASA.'), ['surveyor'], [
 text('Trước khi con người đặt chân lên Mặt Trăng, Surveyor 3 đã đến đây vào tháng 4 năm 1967. Không có phi hành gia ngồi bên trong: con tàu tự làm việc rồi gửi dữ liệu về Trái Đất.', 'Before people walked on the Moon, Surveyor 3 arrived in April 1967. With no astronauts aboard, the robotic lander worked on the surface and returned data to Earth.'),
 text('Ảnh và phép thử đất của tàu giúp chuẩn bị cho các chuyến đổ bộ Apollo.', 'Its photographs and soil tests helped prepare for Apollo landings.')
], 'above');
add('clue-visit', 'surveyor', 'C1.3', text('Những bộ phận trở về', 'Parts that came home'), undefined, text('Apollo 12 đến thăm Surveyor 3. NASA.', 'Apollo 12 visits Surveyor 3. NASA.'), ['visit'], [
 text('Các bộ phận của Surveyor 3 được mang về giúp các nhà nghiên cứu tìm hiểu vật liệu thay đổi ra sao sau thời gian dài trên Mặt Trăng. Con tàu không trở về nguyên vẹn: phần còn lại vẫn ở nơi hạ cánh.', 'The returned parts of Surveyor 3 helped researchers study how materials changed after prolonged exposure on the Moon. The whole lander did not return: the remaining structure stayed at its landing site.')
], 'above');
add('lap-lanh', 'apollo11', 'C2.1', text('Bảng phản xạ của Apollo 11', 'Apollo 11’s reflector'), undefined, text('Bảng phản xạ trên Mặt Trăng, 1969. NASA · AS11-40-5952.', 'The reflector on the Moon, 1969. NASA · AS11-40-5952.'), ['reflector'], [
 text('Apollo 11 để lại bảng phản xạ laser này ở Biển Yên Tĩnh trong chuyến đổ bộ năm 1969.', 'Apollo 11 left this laser reflector in the Sea of Tranquility during its 1969 landing.'),
 text('Bảng nhận ánh sáng từ Trái Đất và phản xạ trở lại. Thiết bị hoạt động không cần pin hay tự phát sáng.', 'The panel reflects light sent from Earth back toward its source. It works without batteries or a light source of its own.')
], 'above');
add('sparkle-repair-clue', 'apollo11', 'C2.2', text('Bên trong những chiếc “gương”', 'Inside the “mirrors”'), `${import.meta.env.BASE_URL}images/book/reflector-array.svg`, text('Sơ đồ 100 lăng kính, nhìn từ trên; không theo tỉ lệ. Minh họa của trò chơi dựa trên NASA/ILRS.', 'Top-view diagram of 100 prisms; not to scale. Game illustration based on NASA/ILRS.'), ['prisms', 'reflector'], [
 text('Bảng Apollo 11 có 100 lăng kính silica nung chảy, xếp thành mười hàng, mỗi lăng kính rộng khoảng 3,8 cm.', 'Apollo 11’s panel holds 100 fused-silica prisms in ten rows, each about 3.8 cm across.'),
 text('Ba mặt phản xạ vuông góc bên trong một lăng kính giúp ánh sáng quay về phía đã gửi nó tới. Cấu tạo này được gọi là bộ phản xạ góc.', 'Three mutually perpendicular reflecting faces inside a prism send light back toward its source. This is called a corner-cube reflector.'),
 text('Lăng kính thật được gắn cố định; hai gương xoay trong trò chơi chỉ là mô hình phẳng minh họa.', 'The real prisms are fixed; the game’s two turning mirrors are a flat demonstration model.')
]);
/** Insert only after an available parent; never unlock a chapter through its companion page. */
export function insertRealWorldPages(pages: (string | null)[], canRead: (id: string) => boolean = () => true) {
 const append = (id: string | null): (string | null)[] => [id, ...realWorldPages.filter(p => p.after === id && canRead(p.after)).flatMap(p => append(p.id))];
 return pages.flatMap(append);
}

/** Archival images enrich existing factual pages without repeating their prose. */
export const bookArchiveImages = {
 'surveyor-b01': { src: memoryPhotos.work, caption: text('Những rãnh khảo sát của Surveyor 3. NASA.', 'Surveyor 3 soil-test trenches. NASA.') },
} as const;
