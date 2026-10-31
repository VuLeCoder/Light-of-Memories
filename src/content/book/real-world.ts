import { text, type BookChapter, type BookText } from './types';
import { memoryPhotos } from '../levels/surveyor-dig';
import { sparkleKeepsakes } from '../levels/lap-lanh';
import { taiThinhPhotos, banBanhLuoiPhotos } from '../assets';

const sources = {
 surveyor: 'https://science.nasa.gov/mission/surveyor-3/',
 visit: 'https://www.jpl.nasa.gov/blog/2012/1/surveyor-3-camera-returned-from-the-moon',
 reflector: 'https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/',
 prisms: 'https://ilrs.cddis.eosdis.nasa.gov/missions/satellite_missions/current_missions/ap11_reflector.html',
 seismic: 'https://www.nasa.gov/wp-content/uploads/2025/11/a12-missionreport.pdf',
 rover: 'https://www.nasa.gov/history/50-years-ago-apollo-17-lands-at-taurus-littrow/',
 route: 'https://science.nasa.gov/resource/apollo-17-moon-flyover-visualization/',
 soil: 'https://ares.jsc.nasa.gov/interaction/lmdp/diskdetails.cfm?class=Orange+Soil&disk=80',
} as const;
export interface RealWorldPage {
 id: string; after: string; chapter: BookChapter; section: string;
 title: BookText; paragraphs: BookText[]; image: string; caption: BookText;
 sources: string[]; layout: 'above' | 'wrap';
}
const image = (name: string) => `${import.meta.env.BASE_URL}images/book/${name}`;
export const realWorldPages: RealWorldPage[] = [];
function add(after: string, chapter: BookChapter, section: string, title: BookText, image: string, caption: BookText, refs: (keyof typeof sources)[], paragraphs: BookText[], layout: 'above' | 'wrap' = 'wrap') {
 realWorldPages.push({ id: `${after}-reality`, after, chapter, section, title, image, caption, sources: refs.map(key => sources[key]), paragraphs, layout: image.includes('seismogram') ? 'above' : layout });
}
add('surveyor', 'surveyor', 'C1.1', text('Surveyor 3 ngoài đời thật', 'Meet the real Surveyor 3'), memoryPhotos.visit, text('Surveyor 3 trên bề mặt Mặt Trăng. NASA.', 'Surveyor 3 on the lunar surface. NASA.'), ['surveyor'], [
 text('Trước khi con người đặt chân lên Mặt Trăng, Surveyor 3 đã đến đây vào tháng 4 năm 1967. Không có phi hành gia ngồi bên trong: con tàu tự làm việc rồi gửi dữ liệu về Trái Đất.', 'Before people walked on the Moon, Surveyor 3 arrived in April 1967. With no astronauts aboard, the robotic lander worked on the surface and returned data to Earth.'),
 text('Ảnh và phép thử đất của tàu giúp chuẩn bị cho các chuyến đổ bộ Apollo.', 'Its photographs and soil tests helped prepare for Apollo landings.')
], 'above');
add('clue-visit', 'surveyor', 'C1.3', text('Những bộ phận trở về', 'Parts that came home'), memoryPhotos.visit, text('Apollo 12 đến thăm Surveyor 3. NASA.', 'Apollo 12 visits Surveyor 3. NASA.'), ['visit'], [
 text('Tháng 11 năm 1969, Pete Conrad và Alan Bean mang camera, xẻng cùng một số bộ phận của Surveyor 3 về Trái Đất. Các nhà nghiên cứu xem chúng đã thay đổi ra sao sau thời gian dài trong môi trường Mặt Trăng.', 'In November 1969, Pete Conrad and Alan Bean returned Surveyor 3’s camera, scoop and other parts to Earth. Researchers examined how prolonged exposure to the lunar environment had affected them.')
], 'above');
add('lap-lanh', 'apollo11', 'C2.1', text('Bảng phản xạ của Apollo 11', 'Apollo 11’s reflector'), sparkleKeepsakes[0].src, text('Bảng phản xạ trên Mặt Trăng, 1969. NASA · AS11-40-5952.', 'The reflector on the Moon, 1969. NASA · AS11-40-5952.'), ['reflector'], [
 text('Apollo 11 để lại bảng phản xạ laser này ở Biển Yên Tĩnh trong chuyến đổ bộ năm 1969.', 'Apollo 11 left this laser reflector in the Sea of Tranquility during its 1969 landing.'),
 text('Bảng nhận ánh sáng từ Trái Đất và phản xạ trở lại. Thiết bị hoạt động không cần pin hay tự phát sáng.', 'The panel reflects light sent from Earth back toward its source. It works without batteries or a light source of its own.')
], 'above');
add('sparkle-repair-clue', 'apollo11', 'C2.2', text('Bên trong những chiếc “gương”', 'Inside the “mirrors”'), sparkleKeepsakes[0].src, text('Các lăng kính xếp thành bảng phản xạ. NASA.', 'The prisms form a reflector array. NASA.'), ['prisms', 'reflector'], [
 text('Bảng Apollo 11 có 100 lăng kính silica nung chảy, xếp thành mười hàng, mỗi lăng kính rộng khoảng 3,8 cm.', 'Apollo 11’s panel holds 100 fused-silica prisms in ten rows, each about 3.8 cm across.'),
 text('Ba mặt phản xạ vuông góc bên trong một lăng kính giúp ánh sáng quay về phía đã gửi nó tới. Cấu tạo này được gọi là bộ phản xạ góc.', 'Three mutually perpendicular reflecting faces inside a prism send light back toward its source. This is called a corner-cube reflector.'),
 text('Lăng kính thật được gắn cố định; hai gương xoay trong trò chơi chỉ là mô hình phẳng minh họa.', 'The real prisms are fixed; the game’s two turning mirrors are a flat demonstration model.')
]);
add('tai-thinh', 'apollo12', 'C3.1', text('Địa chấn kế Apollo 12', 'Apollo 12’s seismometer'), taiThinhPhotos.pse, text('Địa chấn kế với tấm phủ bảo vệ. NASA · AS12-47-6916.', 'The seismometer with its protective blanket. NASA · AS12-47-6916.'), ['seismic'], [
 text('Ngày 19 tháng 11 năm 1969, các phi hành gia Apollo 12 đặt địa chấn kế PSE ở Đại Dương Bão. Trong ảnh, tấm phủ trải quanh chân thiết bị giúp bảo vệ nó trước sự thay đổi nhiệt độ.', 'On 19 November 1969, Apollo 12 astronauts placed the PSE seismometer in the Ocean of Storms. The blanket around its base helped protect it from temperature changes.'),
 text('Các cảm biến ghi lại chuyển động rất nhỏ của mặt đất. Dữ liệu đi qua trạm trung tâm để được gửi về Trái Đất.', 'Its sensors recorded tiny ground movements. Measurements passed through the central station on their way to Earth.')
], 'above');
add('tai-book-rhythm', 'apollo12', 'C3.2', text('Từ chuyển động đến bản ghi', 'From movement to a record'), image('apollo12-seismogram.png'), text('Bản ghi thật sau cú va chạm, với thước thời gian 10 phút. NASA.', 'Actual impact record with a ten-minute time scale. NASA.'), ['seismic'], [
 text('Ba đường ghi thể hiện ba hướng chuyển động của mặt đất. Thước 10 phút bên dưới giúp đọc thời gian.', 'Three traces show three directions of ground motion. The ten-minute scale below helps us read time.'),
 text('Cùng một sự kiện, mỗi hướng đo cho một đường ghi khác nhau. Nhịp mở cửa trong câu chuyện là giả tưởng.', 'The same event produces different traces in each direction. The story’s door-opening rhythm is fictional.')
]);
add('ban-banh-luoi', 'apollo17', 'C4.1', text('Chiếc xe của Apollo 17', 'Apollo 17’s lunar rover'), banBanhLuoiPhotos.vip, text('Xe LRV ở nơi đỗ cuối. NASA · AS17-143-21933.', 'The LRV at its final parking place. NASA · AS17-143-21933.'), ['rover'], [
 text('Tháng 12 năm 1972, Eugene Cernan và Harrison Schmitt dùng xe LRV để đi khảo sát thung lũng Taurus–Littrow. Chiếc xe chạy bằng pin, chở người, dụng cụ và mẫu vật.', 'In December 1972, Eugene Cernan and Harrison Schmitt used the LRV to explore Taurus–Littrow valley. The battery-powered vehicle carried people, tools and samples.'),
 text('Sau chuyến khảo sát cuối, xe được để lại trên Mặt Trăng.', 'After its final excursion, the rover remained on the Moon.')
], 'above');
add('ban-book-route', 'apollo17', 'C4.3', text('Những hành trình có thật', 'The real traverses'), image('apollo17-route.jpg'), text('Bản đồ ba chuyến khảo sát Apollo 17. NASA.', 'Map of Apollo 17’s three traverses. NASA.'), ['route', 'rover'], [
 text('Apollo 17 thực hiện ba chuyến khảo sát trên bề mặt. Trên bản đồ thật, các trạm dừng được đánh số và gắn với địa hình của thung lũng.', 'Apollo 17 made three surface excursions. On the real map, numbered stations sit within the terrain of the valley.'),
 text('Mỗi điểm dừng là cơ hội quan sát, chụp ảnh và lấy mẫu. Những tuyến đường uốn theo địa hình giúp nối các mẫu vật với nơi chúng được tìm thấy.', 'Each stop offered a chance to observe, photograph and collect samples. Routes across the terrain connect the samples with the places where they were found.')
], 'above');
add('ban-book-samples', 'apollo17', 'C4.4', text('Một tảng đá, nhiều manh mối', 'One boulder, many clues'), image('nansen-rock.jpg'), text('Tảng đá được lấy mẫu tại Trạm 2, vùng Nansen. NASA · AS17-137-20901.', 'Sampled boulder at Station 2, Nansen. NASA · AS17-137-20901.'), ['rover'], [
 text('Cernan và Schmitt dừng tại vùng Nansen để khảo sát những tảng đá. Họ thu thập mẫu đá và đất, ghi lại nơi lấy mẫu để các nhà khoa học nghiên cứu sau chuyến bay.', 'Cernan and Schmitt stopped in the Nansen area to investigate boulders. They collected rock and soil, recording the sampling locations for study after the flight.'),
 text('Họ còn lấy đất dưới phần đá nhô ra để tìm hiểu ảnh hưởng của gió Mặt Trời.', 'They also sampled soil beneath a rock overhang to investigate solar-wind effects.')
]);
realWorldPages[realWorldPages.length - 1].id = 'ban-book-samples-rock-reality';
add('ban-book-samples-rock-reality', 'apollo17', 'C4.4', text('Những hạt đất màu cam', 'Tiny orange grains'), image('orange-soil.jpg'), text('Ảnh mẫu đất cam trong bộ học liệu NASA.', 'Orange-soil sample in NASA’s educational collection.'), ['soil', 'rover'], [
 text('Ở hố Shorty, các phi hành gia Apollo 17 nhận ra một vùng đất màu cam. Mẫu mang về chứa những hạt tròn đỏ cam, đen và các mảnh vỡ rất nhỏ.', 'At Shorty crater, Apollo 17 astronauts noticed orange soil. Returned material contained tiny reddish-orange and black spheres and fragments.'),
 text('Các hạt hình thành khi những giọt dung nham từ núi lửa cổ xưa nguội đi.', 'The grains formed as droplets from ancient volcanic eruptions cooled.')
]);
/** Insert only after an available parent; never unlock a chapter through its companion page. */
export function insertRealWorldPages(pages: (string | null)[], canRead: (id: string) => boolean = () => true) {
 const append = (id: string | null): (string | null)[] => [id, ...realWorldPages.filter(p => p.after === id && canRead(p.after)).flatMap(p => append(p.id))];
 return pages.flatMap(append);
}

/** Archival images enrich existing factual pages without repeating their prose. */
export const bookArchiveImages = {
 'surveyor-b01': { src: memoryPhotos.work, caption: text('Những rãnh khảo sát của Surveyor 3. NASA.', 'Surveyor 3 soil-test trenches. NASA.') },
 'tai-book-devices': { src: taiThinhPhotos.station, caption: text('Khu thí nghiệm Apollo 12. NASA · AS12-47-6918.', 'Apollo 12 experiment site. NASA · AS12-47-6918.') },
} as const;
