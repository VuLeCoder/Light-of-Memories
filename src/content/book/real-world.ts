import { text, type BookChapter, type BookText } from './types';
import { memoryPhotos } from '../levels/surveyor-dig';
import { sparkleKeepsakes } from '../levels/lap-lanh';
import { taiThinhPhotos, banBanhLuoiPhotos } from '../assets';

const sources = {
 surveyor: 'https://science.nasa.gov/mission/surveyor-3/',
 visit: 'https://www.jpl.nasa.gov/blog/2012/1/surveyor-3-camera-returned-from-the-moon',
 reflector: 'https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/',
 prisms: 'https://ilrs.cddis.eosdis.nasa.gov/missions/satellite_missions/current_missions/ap11_reflector.html',
 laser: 'https://www.nasa.gov/missions/laser-beams-reflected-between-earth-and-moon-boost-science/',
 seismic: 'https://www.nasa.gov/wp-content/uploads/2025/11/a12-missionreport.pdf',
 quakes: 'https://science.nasa.gov/moon/moonquakes/',
 ringing: 'https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html',
 rover: 'https://www.nasa.gov/history/50-years-ago-apollo-17-lands-at-taurus-littrow/',
 wheels: 'https://ntrs.nasa.gov/api/citations/20100000019/downloads/20100000019.pdf',
 route: 'https://science.nasa.gov/resource/apollo-17-moon-flyover-visualization/',
 soil: 'https://ares.jsc.nasa.gov/interaction/lmdp/diskdetails.cfm?class=Orange+Soil&disk=80',
 walkback: 'https://www.nasa.gov/wp-content/uploads/static/apollo50th/pdf/A17_PressKit.pdf',
 orbit: 'https://science.nasa.gov/image-article/apod-2011-september-8-apollo-17-site-a-sharper-view/',
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
 text('Trước khi con người đặt chân lên Mặt Trăng, Surveyor 3 đã đến đây vào tháng 4 năm 1967. Tàu robot mang theo camera và một xẻng nhỏ để tìm hiểu mặt đất.', 'Before people walked on the Moon, Surveyor 3 arrived in April 1967. The robotic lander carried a camera and a small scoop to investigate the ground.'),
 text('Những bức ảnh và phép thử đất giúp chuẩn bị cho các chuyến đổ bộ Apollo. Trong ảnh, hãy thử tìm các chân đáp đang đỡ thân tàu nhé.', 'Its photographs and soil tests helped prepare for Apollo landings. In the photograph, look for the legs supporting the spacecraft.')
], 'above');
add('surveyor-b01', 'surveyor', 'C1.2', text('Một camera, một chiếc xẻng', 'A camera and a scoop'), memoryPhotos.work, text('Những rãnh khảo sát của Surveyor 3. NASA.', 'Surveyor 3 soil-test trenches. NASA.'), ['surveyor'], [
 text('Camera truyền về hình ảnh vùng đất quanh tàu. Nhờ đó, nhóm nghiên cứu có thể quan sát đá, dấu chân đáp và những thay đổi sau khi xẻng làm việc.', 'The camera returned views of the ground around the lander. Researchers could examine rocks, footpad marks and changes made by the scoop.'),
 text('Chiếc xẻng gắn trên một cánh tay có thể vươn ra để đào và thử đất. Những rãnh nhỏ trở thành manh mối về tính chất của lớp đất mà tàu Apollo sẽ đáp xuống.', 'A scoop on an extending arm dug and tested the soil. Its little trenches offered clues about the material an Apollo lander would rest on.')
]);
add('clue-visit', 'surveyor', 'C1.3', text('Một cuộc gặp có thật', 'A real encounter'), memoryPhotos.visit, text('Apollo 12 đến thăm Surveyor 3. NASA.', 'Apollo 12 visits Surveyor 3. NASA.'), ['visit'], [
 text('Tháng 11 năm 1969, Pete Conrad và Alan Bean của Apollo 12 đến bên Surveyor 3. Tàu robot đã ở trên Mặt Trăng hơn hai năm.', 'In November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean visited Surveyor 3. The robot had been on the Moon for over two years.'),
 text('Họ mang camera, xẻng cùng một số bộ phận về Trái Đất. Các nhà nghiên cứu xem chúng đã thay đổi ra sao sau thời gian dài trong môi trường Mặt Trăng.', 'They returned its camera, scoop and other parts to Earth. Researchers examined how prolonged exposure to the lunar environment had affected them.')
], 'above');
add('lap-lanh', 'apollo11', 'C2.1', text('Bảng phản xạ của Apollo 11', 'Apollo 11’s reflector'), sparkleKeepsakes[0].src, text('Bảng phản xạ trên Mặt Trăng, 1969. NASA · AS11-40-5952.', 'The reflector on the Moon, 1969. NASA · AS11-40-5952.'), ['reflector'], [
 text('Một bảng nhỏ nằm yên trên đất Trăng, nhưng lại nối với những phép đo từ rất xa. Apollo 11 để lại bảng phản xạ laser này trong chuyến đổ bộ năm 1969.', 'A small panel rests on the lunar soil, yet connects to measurements made far away. Apollo 11 left this laser reflector during its 1969 landing.'),
 text('Bảng nhận ánh sáng từ Trái Đất và phản xạ trở lại. Nó không cần tự phát sáng để giúp các nhà khoa học nghiên cứu hệ Trái Đất–Mặt Trăng.', 'The panel reflects light sent from Earth back toward its source. It does not need to shine on its own to help scientists study the Earth–Moon system.')
], 'above');
add('sparkle-repair-clue', 'apollo11', 'C2.2', text('Bên trong những chiếc “gương”', 'Inside the “mirrors”'), sparkleKeepsakes[0].src, text('Các lăng kính xếp thành bảng phản xạ. NASA.', 'The prisms form a reflector array. NASA.'), ['prisms', 'reflector'], [
 text('Nhìn gần hơn, bảng Apollo 11 có 100 lăng kính bằng silica nung chảy, xếp thành mười hàng. Mỗi lăng kính rộng khoảng 3,8 cm.', 'Look closer: Apollo 11’s panel holds 100 fused-silica prisms in ten rows. Each prism is about 3.8 cm across.'),
 text('Ba mặt phản xạ vuông góc bên trong một lăng kính giúp ánh sáng quay về phía đã gửi nó tới. Cấu tạo này được gọi là bộ phản xạ góc.', 'Three mutually perpendicular reflecting faces inside a prism send light back toward its source. This is called a corner-cube reflector.'),
 text('Các lăng kính được gắn cố định trên bảng. Hai gương xoay ở trang trước chỉ giúp hình dung đường đi của ánh sáng trong một mô hình phẳng.', 'The prisms are fixed to the panel. The two turning mirrors on the previous page help illustrate light paths in a flat model.')
]);
add('sparkle-ranging-clue', 'apollo11', 'C2.3', text('Đo một hành trình ánh sáng', 'Timing a journey of light'), sparkleKeepsakes[1].src, text('Triển khai thiết bị Apollo 11. NASA · AS11-40-5945.', 'Deploying Apollo 11 equipment. NASA · AS11-40-5945.'), ['laser'], [
 text('Một đài quan sát gửi xung laser về phía Mặt Trăng rồi chờ ánh sáng phản xạ trở lại. Khoảng thời gian chờ chứa cả lượt đi và lượt về.', 'An observatory sends a laser pulse toward the Moon and waits for reflected light. The elapsed time includes both the outward and return journeys.'),
 text('Biết vận tốc ánh sáng, các nhà khoa học có thể suy ra khoảng cách. Lặp lại phép đo giúp theo dõi chuyển động của Mặt Trăng; khoảng cách ấy không phải một con số đứng yên.', 'Knowing the speed of light lets scientists calculate distance. Repeated measurements track the Moon’s motion: that distance is not a fixed number.')
]);
add('tai-thinh', 'apollo12', 'C3.1', text('Địa chấn kế Apollo 12', 'Apollo 12’s seismometer'), taiThinhPhotos.pse, text('Địa chấn kế với tấm phủ bảo vệ. NASA · AS12-47-6916.', 'The seismometer with its protective blanket. NASA · AS12-47-6916.'), ['seismic'], [
 text('Thiết bị thấp, có tấm phủ trải quanh chân này là địa chấn kế PSE. Các cảm biến ghi lại những chuyển động rất nhỏ của mặt đất.', 'This low instrument with a blanket around its base is the PSE seismometer. Its sensors recorded tiny movements of the ground.'),
 text('Tấm phủ giúp bảo vệ thiết bị trước sự thay đổi nhiệt độ. Dữ liệu đo được chuyển qua trạm trung tâm để gửi về Trái Đất.', 'The blanket helped protect it from temperature changes. Measurements passed through the central station on their way to Earth.')
], 'above');
add('tai-book-devices', 'apollo12', 'C3.1', text('Mỗi thiết bị một công việc', 'A different job for each instrument'), taiThinhPhotos.station, text('Khu thí nghiệm Apollo 12. NASA · AS12-47-6918.', 'Apollo 12 experiment site. NASA · AS12-47-6918.'), ['seismic'], [
 text('Địa chấn kế ghi rung động. Máy đo từ trường nghiên cứu từ trường ở nơi đặt thiết bị. Tuy đứng gần nhau, chúng đang tìm những loại thông tin khác nhau.', 'The seismometer recorded vibrations. The magnetometer studied the magnetic field at the site. Although nearby, they gathered different kinds of information.'),
 text('Trạm trung tâm nối các thí nghiệm với Trái Đất: nhận lệnh và truyền dữ liệu. Hãy tìm chiếc ăng-ten trong ảnh để nhận ra trạm nhé.', 'The central station linked the experiments with Earth, receiving commands and transmitting data. Look for its antenna in the photograph.')
], 'above');
add('tai-book-sources', 'apollo12', 'C3.2', text('Những rung động từ đâu đến?', 'Where do the tremors come from?'), taiThinhPhotos.pse, text('PSE: thiết bị thu nhận rung động, không phải hình đường sóng. NASA.', 'PSE: the instrument that recorded tremors, not a waveform. NASA.'), ['quakes'], [
 text('Có rung động bắt đầu sâu trong lòng Mặt Trăng dưới tác động thủy triều của Trái Đất. Có rung động gần bề mặt khi đá nóng lên, nguội đi hoặc khi một thiên thạch va xuống.', 'Some tremors begin deep within the Moon under Earth’s tidal influence. Others occur near the surface as rocks heat and cool, or when a meteoroid strikes.'),
 text('Một đường sóng là điểm bắt đầu để nghiên cứu. Thời điểm, vị trí và các phép đo liên quan giúp người đọc bản ghi tìm hiểu chuyện gì đã xảy ra.', 'A waveform is a starting point for investigation. Timing, location and related measurements help researchers work out what happened.')
]);
add('tai-book-ringing', 'apollo12', 'C3.3', text('Sau cú va chạm', 'After the impact'), image('apollo12-seismogram.png'), text('Bản ghi ba trục, hình 3-8, báo cáo Apollo 12. NASA.', 'Three-axis record, figure 3-8, Apollo 12 Mission Report. NASA.'), ['seismic', 'ringing'], [
 text('Sau khi các phi hành gia trở về tàu mẹ, tầng bay lên của tàu đổ bộ Apollo 12 được cho va xuống Mặt Trăng. Địa chấn kế đã ghi nhận sự kiện này.', 'After the astronauts returned to the command spacecraft, Apollo 12’s ascent stage was sent into the Moon. The seismometer recorded the event.'),
 text('Tín hiệu tăng dần rồi yếu đi chậm, kéo dài gần một giờ. Cách nói “ngân như chuông” mô tả rung động trong đất đá, không phải tiếng chuông truyền qua khoảng không.', 'The signal built up and then faded slowly, lasting nearly an hour. “Ringing like a bell” describes vibrations in rock, not a bell sound travelling through space.')
]);
add('tai-book-rhythm', 'apollo12', 'C3.2', text('Từ chuyển động đến bản ghi', 'From movement to a record'), image('apollo12-seismogram.png'), text('Bản ghi thật sau cú va chạm, với thước thời gian 10 phút. NASA.', 'Actual impact record with a ten-minute time scale. NASA.'), ['seismic'], [
 text('Địa chấn kế biến chuyển động của mặt đất thành tín hiệu có thể ghi lại. Khi đặt tín hiệu theo thời gian, ta có thể quan sát lúc rung bắt đầu và kéo dài bao lâu.', 'A seismometer turns ground movement into a signal that can be recorded. Arranging the signal over time reveals when shaking began and how long it lasted.'),
 text('Quan sát khoảng cách giữa các nhịp là một cách làm quen với trục thời gian. Thiết bị thật liên tục đo chuyển động; nó không chờ một nhịp bí mật để mở cửa.', 'Comparing the spacing between beats is one way to explore a time axis. The real instrument measured motion continuously; it did not wait for a secret rhythm to open a door.')
]);
add('ban-banh-luoi', 'apollo17', 'C4.1', text('Chiếc xe của Apollo 17', 'Apollo 17’s lunar rover'), banBanhLuoiPhotos.vip, text('Xe LRV ở nơi đỗ cuối. NASA · AS17-143-21933.', 'The LRV at its final parking place. NASA · AS17-143-21933.'), ['rover'], [
 text('Eugene Cernan và Harrison Schmitt dùng xe LRV để đi khảo sát thung lũng Taurus–Littrow. Xe chở người, dụng cụ và mẫu vật qua những chặng đường trên mặt Trăng.', 'Eugene Cernan and Harrison Schmitt used the LRV to explore Taurus–Littrow valley. It carried people, tools and samples across the lunar surface.'),
 text('Trong ảnh có hai ghế ngồi và camera ở phía trước xe. Sau chuyến khảo sát cuối, xe được để lại trên Mặt Trăng.', 'The photograph shows two seats and a camera at the front. After its final excursion, the rover remained on the Moon.')
], 'above');
add('ban-book-wheels', 'apollo17', 'C4.2', text('Nhìn gần một bánh xe', 'A closer look at a wheel'), banBanhLuoiPhotos.vipDetail, text('Chi tiết cắt từ ảnh xe Apollo 17. NASA.', 'Detail cropped from the Apollo 17 rover photograph. NASA.'), ['wheels'], [
 text('Bánh xe LRV được làm bằng lưới dây kim loại, với những thanh bám trên mặt bánh. Nó không có khoang hơi như lốp xe quen thuộc trên Trái Đất.', 'An LRV wheel uses wire mesh with traction strips across its surface. It has no air chamber like a familiar pneumatic tyre on Earth.'),
 text('Lưới có thể biến dạng khi tiếp xúc với mặt đất. NASA thử nghiệm các thiết kế bánh để lựa chọn cấu tạo phù hợp cho xe và điều kiện khảo sát trên Mặt Trăng.', 'The mesh can deform where it meets the ground. NASA tested wheel designs to select a structure suited to the rover and lunar exploration.')
], 'above');
add('ban-book-route', 'apollo17', 'C4.3', text('Những hành trình có thật', 'The real traverses'), image('apollo17-route.jpg'), text('Bản đồ ba chuyến khảo sát Apollo 17. NASA.', 'Map of Apollo 17’s three traverses. NASA.'), ['route', 'rover'], [
 text('Apollo 17 thực hiện ba chuyến khảo sát trên bề mặt. Trên bản đồ thật, các trạm dừng được đánh số và gắn với địa hình của thung lũng.', 'Apollo 17 made three surface excursions. On the real map, numbered stations sit within the terrain of the valley.'),
 text('Mỗi điểm dừng là cơ hội quan sát, chụp ảnh và lấy mẫu. Những tuyến đường uốn theo địa hình giúp nối các mẫu vật với nơi chúng được tìm thấy.', 'Each stop offered a chance to observe, photograph and collect samples. Routes across the terrain connect the samples with the places where they were found.')
], 'above');
add('ban-book-walkback', 'apollo17', 'C4.3', text('Luôn tính đường trở về', 'Always plan the return'), image('apollo17-route.jpg'), text('Bản đồ khảo sát Apollo 17. NASA.', 'Apollo 17 traverse map. NASA.'), ['walkback'], [
 text('Xe giúp đi xa hơn, nhưng kế hoạch vẫn phải tính đến lúc xe không chạy được. Các phi hành gia cần còn đủ nguồn sống để đi bộ về tàu đổ bộ.', 'The rover extended the crew’s range, but planning also considered a rover failure. Astronauts needed enough life-support supplies to walk back to the lunar module.'),
 text('Giới hạn đường về phụ thuộc vào oxy và chất làm mát trong hệ thống mang trên lưng. Đó là lý do quãng đường khám phá luôn đi cùng câu hỏi: mình có trở về an toàn được không?', 'The walkback limit depended on oxygen and coolant in the portable life-support systems. Exploration distance always came with a question: can we return safely?')
]);
add('ban-book-samples', 'apollo17', 'C4.4', text('Một tảng đá, nhiều manh mối', 'One boulder, many clues'), image('nansen-rock.jpg'), text('Tảng đá được lấy mẫu tại Trạm 2, vùng Nansen. NASA · AS17-137-20901.', 'Sampled boulder at Station 2, Nansen. NASA · AS17-137-20901.'), ['rover'], [
 text('Cernan và Schmitt dừng tại vùng Nansen để khảo sát những tảng đá. Họ thu thập mẫu đá và đất, ghi lại nơi lấy mẫu để các nhà khoa học nghiên cứu sau chuyến bay.', 'Cernan and Schmitt stopped in the Nansen area to investigate boulders. They collected rock and soil, recording the sampling locations for study after the flight.'),
 text('Đất dưới một phần đá nhô ra cũng được lấy mẫu để tìm hiểu ảnh hưởng của gió Mặt Trời. Vị trí của mẫu vật là một phần quan trọng trong câu chuyện nó kể.', 'They also sampled soil beneath a rock overhang to investigate solar-wind effects. A sample’s location is an important part of the story it tells.')
]);
realWorldPages[realWorldPages.length - 1].id = 'ban-book-samples-rock-reality';
add('ban-book-samples-rock-reality', 'apollo17', 'C4.4', text('Những hạt đất màu cam', 'Tiny orange grains'), image('orange-soil.jpg'), text('Ảnh mẫu đất cam trong bộ học liệu NASA.', 'Orange-soil sample in NASA’s educational collection.'), ['soil', 'rover'], [
 text('Ở hố Shorty, các phi hành gia Apollo 17 nhận ra một vùng đất màu cam. Mẫu mang về chứa những hạt tròn đỏ cam, đen và các mảnh vỡ rất nhỏ.', 'At Shorty crater, Apollo 17 astronauts noticed orange soil. Returned material contained tiny reddish-orange and black spheres and fragments.'),
 text('Các hạt hình thành từ những giọt dung nham được phun ra trong hoạt động núi lửa cổ xưa, rồi nguội đi. Một mẫu nhỏ có thể giữ dấu vết của câu chuyện rất lâu trước chuyến đi của con người.', 'The grains formed from droplets sprayed out during ancient volcanic activity, then cooled. A small sample can preserve a story much older than human exploration.')
]);
add('ban-book-legacy', 'apollo17', 'C4.6', text('Dấu vết nhìn từ trên cao', 'Traces seen from above'), banBanhLuoiPhotos.orbit, text('Bãi đáp Apollo 17 từ LRO. NASA / GSFC / Arizona State University.', 'Apollo 17 landing site from LRO. NASA / GSFC / Arizona State University.'), ['orbit'], [
 text('Ảnh từ tàu LRO cho thấy bãi đáp Apollo 17 nhiều năm sau chuyến thám hiểm. Những vệt đường và vị trí thiết bị vẫn có thể được nhận ra khi quan sát kỹ.', 'LRO images show Apollo 17’s landing site years after the expedition. Tracks and equipment locations can still be identified with careful observation.'),
 text('Bức ảnh nối hai góc nhìn: những người từng đi trên mặt đất và chiếc máy ảnh đang nhìn xuống từ quỹ đạo.', 'The image connects two viewpoints: people once travelling on the ground, and a camera looking down from orbit.')
], 'above');

/** Insert only after an available parent; never unlock a chapter through its companion page. */
export function insertRealWorldPages(pages: (string | null)[], canRead: (id: string) => boolean = () => true) {
 const append = (id: string | null): (string | null)[] => [id, ...realWorldPages.filter(p => p.after === id && canRead(p.after)).flatMap(p => append(p.id))];
 return pages.flatMap(append);
}
