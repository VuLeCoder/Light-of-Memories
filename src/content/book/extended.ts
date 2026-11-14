import { text, type BookChapter, type BookPage, type BookText } from './types';

/** Factual recaps conclude each completed chapter. Existing notebook IDs remain stable. */
export interface ExtendedPage extends BookPage {
  after: string;
  gate: 'surveyor' | 'apollo11' | 'lro';
  continuation?: boolean;
  sourcesOnNextPage?: boolean;
}
const sources = {
  surveyor: 'https://science.nasa.gov/mission/surveyor-3/',
  apollo11: 'https://ilrs.gsfc.nasa.gov/docs/2026/lunar/Apollo11_Preliminary_Sci_Report_LLR.pdf',
  lro: 'https://science.nasa.gov/mission/lro/about/',
} as const;
function recap(id: string, chapter: ExtendedPage['gate'], title: BookText, paragraphs: BookText[], presentation: Pick<ExtendedPage, 'continuation' | 'sourcesOnNextPage'> = {}): ExtendedPage {
  return { id, after: '', chapter: chapter as BookChapter, title, gate: chapter, ...presentation,
    blocks: paragraphs.map((body, i) => ({
      id: `${id}.paragraph-${i + 1}`, kind: 'fact', publication: 'main', text: body,
      section: `C.notebook.${chapter}`, order: i,
      sources: [{ url: sources[chapter], status: 'recorded' }, ...(chapter === 'lro' ? [{ url: 'https://science.nasa.gov/mission/lro/spacecraft-and-instruments/', status: 'recorded' as const }] : [])],
    })),
  };
}
export const extendedPages: readonly ExtendedPage[] = [
  recap('surveyor-notebook', 'surveyor', text('Surveyor 3 · Câu chuyện có thật', 'Surveyor 3 · The real story'), [
    text('Surveyor 3 là tàu robot của NASA, phóng bằng Atlas–Centaur ngày 17/4/1967 để khảo sát Mặt Trăng trước các chuyến Apollo.', 'On April 17, 1967, an Atlas–Centaur launched NASA’s uncrewed Surveyor 3 to test a soft landing and investigate the lunar surface before Apollo.'),
    text('Ngày 20/4/1967, tàu đáp xuống Đại Dương Bão (Oceanus Procellarum). Đá phản xạ mạnh làm radar nhầm lẫn, khiến động cơ tắt muộn. Tàu nảy hai lần rồi nằm yên.', 'On April 20, it landed in Oceanus Procellarum, the Ocean of Storms. Reflective rocks confused its descent radar, delaying engine shutdown. The lander bounced twice before settling.'),
    text('Chưa đầy một giờ sau, máy ảnh bắt đầu truyền hình về Trái Đất. Tổng cộng 6.326 bức ảnh ghi lại cảnh quanh tàu và việc khảo sát đất.', 'Within an hour, its camera began transmitting pictures. Surveyor 3 returned 6,326 images of its surroundings and soil-sampling work.'),
  ], { sourcesOnNextPage: true }),
  recap('surveyor-notebook-visit', 'surveyor', text('Surveyor 3 · Câu chuyện có thật (tiếp)', 'Surveyor 3 · The real story (continued)'), [
    text('Xẻng đào và thử đất theo lệnh từ Trái Đất. Đất đủ chắc để đỡ mô-đun Apollo. Tàu liên lạc lần cuối ngày 4/5/1967.', 'Commanded from Earth, its scoop dug trenches, pressed and struck the soil. Tests showed it could support an Apollo Lunar Module. Last contact was May 4, 1967.'),
    text('Tháng 11/1969, Apollo 12 đáp gần đó. Pete Conrad và Alan Bean đi bộ tới Surveyor 3, chụp ảnh, mang máy ảnh, xẻng và vài bộ phận về Trái Đất.', 'In November 1969, Apollo 12 landed nearby. Pete Conrad and Alan Bean walked over, photographed the lander and retrieved its camera, scoop and other parts.'),
    text('Các bộ phận giúp nghiên cứu tác động của gần hai năm rưỡi trên Mặt Trăng lên vật liệu. Phần còn lại của tàu vẫn ở bãi đáp.', 'The parts revealed how nearly two and a half years on the Moon affected materials. The remaining spacecraft stayed at its landing site.'),
  ], { continuation: true }),
  recap('apollo-notebook', 'apollo11', text('Bảng phản xạ laser Apollo 11 · Câu chuyện có thật', 'Apollo 11 laser reflector · The real story'), [
    text('Năm 1969, Apollo 11 để lại bảng phản xạ laser LRRR ở Biển Yên Tĩnh. Một trăm lăng kính trả ánh sáng về nguồn gửi, không cần điện.', 'In 1969, Apollo 11 left the LRRR laser reflector in the Sea of Tranquility. Its one hundred prisms return light toward its source without electrical power.'),
    text('Ngày 1/8/1969, Đài thiên văn Lick thu được tín hiệu phản xạ. Thời gian laser đi và về giúp tính khoảng cách từ trạm tới thiết bị.', 'On August 1, 1969, Lick Observatory detected reflected signals. Timing the laser’s round trip gives the distance from the station to the instrument.'),
    text('Phép đo lặp lại giúp nghiên cứu quỹ đạo, chuyển động quay của Mặt Trăng và kiểm nghiệm các lý thuyết về hấp dẫn.', 'Repeated measurements help study the Moon’s orbit and rotation and test theories of gravity.'),
  ]),
  recap('lro-notebook', 'lro', text('LRO · Câu chuyện có thật', 'LRO · The real story'), [
      text('Lunar Reconnaissance Orbiter (LRO) của NASA được phóng ngày 18/6/2009 và vào quỹ đạo Mặt Trăng ngày 23/6. Từ trên cao, tàu khảo sát bề mặt để giúp các nhà khoa học hiểu rõ Mặt Trăng và chuẩn bị cho những chuyến thám hiểm tiếp theo.', 'NASA’s Lunar Reconnaissance Orbiter (LRO) launched on 18 June 2009 and entered lunar orbit on 23 June. From above, it surveys the surface to improve our understanding of the Moon and prepare for future exploration.'),
      text('Hệ máy ảnh LROC ghi lại địa hình, thiết bị còn lại và dấu đường đi tại các bãi đáp Apollo. Khi so sánh ảnh cùng một nơi ở những thời điểm khác nhau, các nhà khoa học còn nhận ra những hố va chạm mới, cho thấy bề mặt Mặt Trăng vẫn đang thay đổi.', 'The LROC camera system records terrain, remaining equipment and trails at Apollo landing sites. Comparing images of the same place taken at different times also reveals new impact craters, showing that the lunar surface continues to change.'),
    ], { sourcesOnNextPage: true }),
  recap('lro-notebook-mapping', 'lro', text('LRO · Câu chuyện có thật (tiếp)', 'LRO · The real story (continued)'), [
      text('Bên cạnh máy ảnh, máy đo cao laser LOLA giúp dựng bản đồ địa hình ba chiều. Dữ liệu độ cao cùng các ảnh quan sát giúp nghiên cứu ánh sáng ở hai cực, nơi một số đáy hố sâu luôn bị che nắng. Nhờ đó, LRO nối những dấu tích thám hiểm trước đây với việc tìm hiểu môi trường cho các hành trình tương lai.', 'Alongside the cameras, the LOLA laser altimeter helps build three-dimensional terrain maps. Elevation data and images help study lighting at the poles, where some deep crater floors remain permanently shadowed. In this way, LRO connects traces of past exploration with knowledge of the environment for future journeys.'),
    ], { continuation: true }),
];

/** Insert at chapter boundaries, even when optional photos were found in another order.
 * Completion is persistent, so replay does not hide previously unlocked recaps. */
export function insertExtendedPages(ids: (string | null)[], completed: Record<'surveyor' | 'apollo11' | 'lro', boolean>): (string | null)[] {
  const result = [...ids];
  for (const chapter of ['surveyor', 'apollo11', 'lro'] as const) {
    if (!completed[chapter]) continue;
    const chapterEnd = result.reduce((last, id, index) => {
      const belongs = chapter === 'surveyor'
        ? id === 'surveyor' || /^(surveyor-|clue-|photo-)/.test(id ?? '')
        : chapter === 'apollo11' ? id === 'lap-lanh' || /^(lap-lanh-|sparkle-)/.test(id ?? '')
        : /^gac-/.test(id ?? '');
      return belongs ? index : last;
    }, -1);
    if (chapterEnd < 0) continue;
    const recapIds = extendedPages.filter(p => p.gate === chapter && !result.includes(p.id)).map(p => p.id);
    result.splice(chapterEnd + 1, 0, ...recapIds);
  }
  return result;
}
