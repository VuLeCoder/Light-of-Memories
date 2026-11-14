import { text, type BookChapter, type BookText } from './types';
import { memoryPhotos } from '../friends/surveyor/images';

const sources = {
 surveyor: 'https://science.nasa.gov/mission/surveyor-3/',
 reflector: 'https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/',
 prisms: 'https://ilrs.cddis.eosdis.nasa.gov/missions/satellite_missions/current_missions/ap11_reflector.html',
 lrrrReport: 'https://ilrs.gsfc.nasa.gov/docs/2026/lunar/Apollo11_Preliminary_Sci_Report_LLR.pdf',
} as const;
export interface RealWorldPage {
 id: string; after: string; chapter: BookChapter; section: string;
 title: BookText; paragraphs: BookText[]; image?: string; caption: BookText;
 sources: string[]; layout: 'above' | 'wrap';
}
/** Existing T01 reward page; reuse the factual-page presentation without inserting a page. */
export const surveyorToolsPage: RealWorldPage = {
 id: 'surveyor-b01', after: 'surveyor-reality', chapter: 'surveyor', section: 'C1.2',
 title: text('Đôi mắt và chiếc xẻng', 'A camera and a scoop'),
 caption: text('', ''), sources: [sources.surveyor], layout: 'above',
 paragraphs: [
  text('Máy ảnh Surveyor 3 gửi về Trái Đất 6.326 bức ảnh. Gương xoay giúp quan sát quanh tàu.', 'Surveyor 3’s camera sent 6,326 pictures to Earth, using a moving mirror to look around.'),
  text('Xẻng vươn tới 1,5 m, đào sâu tới 18 cm. Các phép thử đất cho thấy bề mặt đủ chắc để đỡ mô-đun đổ bộ Apollo.', 'The scoop reached 1.5 m and dug 18 cm deep. Tests showed the soil could support an Apollo Lunar Module.'),
  text('Tháng 11/1969, phi hành gia Apollo 12 mang máy ảnh, xẻng và một số bộ phận về Trái Đất để nghiên cứu tác động của môi trường Mặt Trăng lên vật liệu. Phần còn lại vẫn ở bãi đáp.', 'In November 1969, Apollo 12 astronauts returned the camera, scoop and other parts to Earth to study lunar exposure’s effects on materials. The rest remained at its landing site.'),
 ],
};
export const realWorldPages: RealWorldPage[] = [];
function add(after: string, chapter: BookChapter, section: string, title: BookText, image: string | undefined, caption: BookText, refs: (keyof typeof sources)[], paragraphs: BookText[], layout: 'above' | 'wrap' = 'wrap') {
 realWorldPages.push({ id: `${after}-reality`, after, chapter, section, title, image, caption, sources: refs.map(key => sources[key]), paragraphs, layout: image?.includes('seismogram') ? 'above' : layout });
}
add('surveyor', 'surveyor', 'C1.1', text('Surveyor 3 ngoài đời', 'The real Surveyor 3'), memoryPhotos.visit, text('Pete Conrad bên Surveyor 3, tháng 11/1969. NASA.', 'Pete Conrad beside Surveyor 3, November 1969. NASA.'), ['surveyor'], [
 text('Surveyor 3 là tàu đổ bộ không người lái của NASA, phóng bằng Atlas–Centaur ngày 17/4/1967, hạ cánh trên Mặt Trăng ngày 20/4/1967.', 'Surveyor 3 was a NASA robotic lander, launched by Atlas–Centaur on April 17, 1967. It landed on the Moon on April 20, 1967.'),
 text('Máy ảnh gửi hình về Trái Đất. Xẻng trên cánh tay đào rãnh, thử độ chắc của đất, giúp chuẩn bị cho các chuyến đổ bộ Apollo có người lái.', 'Its camera sent pictures to Earth. A scoop on an arm dug trenches and tested the soil’s firmness, helping prepare for crewed Apollo landings.')
], 'above');
add('lap-lanh', 'apollo11', 'C2.1', text('Bảng phản xạ của Apollo 11', 'Apollo 11’s reflector'), undefined, text('Bảng phản xạ trên Mặt Trăng, 1969. NASA · AS11-40-5952.', 'The reflector on the Moon, 1969. NASA · AS11-40-5952.'), ['reflector'], [
 text('Apollo 11 để lại bảng phản xạ laser này ở Biển Yên Tĩnh trong chuyến đổ bộ năm 1969.', 'Apollo 11 left this laser reflector in the Sea of Tranquility during its 1969 landing.'),
 text('Bảng nhận ánh sáng từ Trái Đất và phản xạ trở lại. Thiết bị hoạt động không cần pin hay tự phát sáng.', 'The panel reflects light sent from Earth back toward its source. It works without batteries or a light source of its own.')
], 'above');
add('sparkle-repair-clue', 'apollo11', 'C2.2', text('Lăng kính phản xạ Apollo 11', 'Apollo 11’s corner-cube prisms'), `${import.meta.env.BASE_URL}images/book/reflector-array.svg`, text('Sơ đồ 100 lăng kính, nhìn từ trên; không theo tỉ lệ.', 'Top-view diagram of 100 prisms; not to scale.'), ['lrrrReport'], [
 text('Bảng Apollo 11 gồm 100 lăng kính silica nung chảy xếp 10 × 10, đường kính khoảng 3,8 cm mỗi chiếc.', 'Apollo 11’s reflector has 100 fused-silica prisms arranged 10 × 10, each about 3.8 cm across.'),
 text('Ba mặt vuông góc trong mỗi lăng kính phản xạ ánh sáng về phía nguồn gửi.', 'Three perpendicular faces inside each prism return light toward its source.'),
 text('Ánh sáng phản xạ toàn phần bên trong silica, không cần lớp phủ kim loại.', 'Total internal reflection inside the silica works without metal coatings.')
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
