import { restoredReadingOrder } from './restored-friends';
import { text, type BookChapter, type BookText } from './types';

/** PDF-only editorial direction. Browser copy and save identities stay untouched. */
export const pdfChapters: readonly {
  id: BookChapter; name: BookText; nickname: BookText; introduction: BookText;
  hero: string; color: readonly [number, number, number];
  timeline: readonly { date: string; text: BookText }[];
  questions: readonly { image: string; question: BookText; observation: BookText }[];
}[] = [
  {
    id: 'surveyor', name: text('Surveyor 3', 'Surveyor 3'), nickname: text('Mắt Tròn', 'Round Eye'),
    introduction: text('Một tàu robot đến trước con người. Máy ảnh và chiếc xẻng giúp tìm hiểu mặt đất Mặt Trăng.', 'A robot arrives before people. Its camera and scoop help investigate the lunar ground.'),
    hero: 'surveyor-b01.archive-photo', color: [42, 104, 103],
    timeline: [
      { date: '1967', text: text('Đáp xuống và khảo sát đất', 'Landing and soil investigations') },
      { date: '1969', text: text('Apollo 12 đến thăm', 'Apollo 12 visits') },
      { date: '1969', text: text('Một số bộ phận trở về Trái Đất', 'Selected parts return to Earth') },
    ],
    questions: [
      { image: 'surveyor-b01.archive-photo', question: text('Bạn tìm được chân tàu và dấu in trên đất không?', 'Can you find the footpads and their marks in the soil?'), observation: text('Nhìn vùng đất sát các chân tàu. Dấu tiếp xúc giúp đặt câu hỏi về lần hạ cánh.', 'Look at the ground beside the footpads. Contact marks help us ask questions about the landing.') },
      { image: 'surveyor-return-story.archive-photo', question: text('Đứng cạnh phi hành gia, con tàu trông lớn đến đâu?', 'How big does the lander look beside the astronaut?'), observation: text('So sánh chiều cao của người và tàu trong cùng ảnh. Đây là cách ước lượng bằng vật làm mốc.', 'Compare the person and the lander in the same picture. A familiar reference helps us estimate size.') },
    ],
  },
  {
    id: 'apollo11', name: text('Bảng phản xạ Apollo 11', 'Apollo 11’s reflector'), nickname: text('Lấp Lánh', 'Twinkle'),
    introduction: text('Không cần pin, không tự phát sáng. Những lăng kính giúp ánh sáng tìm đường trở lại nơi gửi nó đi.', 'No batteries and no light of its own. Prisms help light travel back towards its source.'),
    hero: 'sparkle-photo-1.photo', color: [139, 94, 36],
    timeline: [
      { date: '1969', text: text('Được mang ra bề mặt Mặt Trăng', 'Carried onto the lunar surface') },
      { date: '1969', text: text('Mở và căn chỉnh bảng phản xạ', 'The reflector is opened and aligned') },
      { date: '2004', text: text('JPL ghi nhận 35 năm thí nghiệm', 'JPL records 35 years of the experiment') },
    ],
    questions: [
      { image: 'sparkle-photo-1.photo', question: text('Phi hành gia đang mang theo mấy thiết bị?', 'How many instruments is the astronaut carrying?'), observation: text('Hãy nhìn cả hai tay rồi đọc chú thích: một máy đo địa chấn và một bảng phản xạ.', 'Look at both hands, then read the caption: a seismometer and a reflector panel.') },
      { image: 'sparkle-photo-0.photo', question: text('Bạn thấy các lăng kính được xếp như thế nào?', 'How are the prisms arranged?'), observation: text('Đối chiếu ảnh với sơ đồ: bảng có 100 lăng kính xếp thành mười hàng.', 'Compare the photograph with the diagram: 100 prisms are arranged in ten rows.') },
    ],
  },
  {
    id: 'apollo12', name: text('Apollo 12', 'Apollo 12'), nickname: text('Tai Thính', 'Sharp Ear'),
    introduction: text('Địa chấn kế ghi lại chuyển động rất nhỏ của mặt đất, giúp nghiên cứu Mặt Trăng.', 'A seismometer records tiny ground movements to help study the Moon.'),
    hero: 'tai-photo-pse.picture', color: [70, 95, 120],
    timeline: [{ date: '1969', text: text('Triển khai tại Đại Dương Bão', 'Deployed in the Ocean of Storms') }, { date: '1977', text: text('Các trạm ALSEP ngừng hoạt động', 'ALSEP stations switched off') }], questions: [],
  },
  {
    id: 'apollo17', name: text('Apollo 17', 'Apollo 17'), nickname: text('Bánh Lưới', 'Mesh Wheels'),
    introduction: text('Xe có người lái giúp phi hành gia khảo sát Taurus–Littrow và mang mẫu về tàu.', 'A crewed rover helps astronauts explore Taurus–Littrow and return samples to the lunar module.'),
    hero: 'ban-photo-vip.picture', color: [139, 97, 50],
    timeline: [{ date: '1972', text: text('Khảo sát Taurus–Littrow', 'Exploring Taurus–Littrow') }, { date: '2011', text: text('LRO chụp lại bãi đáp từ quỹ đạo', 'LRO photographs the landing site from orbit') }], questions: [],
  },
  {
    id: 'lro', name: text('LRO · Người quan sát từ xa', 'LRO · Watching from orbit'), nickname: text('Gác Trời', 'Sky Watcher'),
    introduction: text('Nhìn từ quỹ đạo để kết nối những dấu vết trên mặt đất. Mỗi bức ảnh là một lát cắt của thời gian.', 'An orbital view connects traces on the ground. Each photograph captures a moment in time.'),
    hero: 'gac-memory-lap-lanh.picture', color: [75, 88, 143],
    timeline: [
      { date: '2009', text: text('Đi vào quỹ đạo Mặt Trăng', 'Entering lunar orbit') },
      { date: '2011', text: text('Quan sát gần hơn một số bãi đáp', 'Closer views of selected landing sites') },
      { date: '2013', text: text('Ảnh giúp xác định hố va chạm mới', 'Images help identify a new impact crater') },
    ],
    questions: [
      { image: 'gac-memory-lap-lanh.picture', question: text('Đây là một nơi hay nhiều nơi ghép lại?', 'Is this one place or several places combined?'), observation: text('Đọc nhãn của từng ô. Đây là ảnh ghép sáu bãi đáp khác nhau.', 'Read the labels in each panel. This montage combines six different landing sites.') },
      { image: 'lro-impact-story.archive-photo', question: text('Bạn tìm thấy vệt sáng gần giữa ảnh không?', 'Can you find the bright feature near the centre?'), observation: text('Đọc ngày chụp và chú thích trước khi kết luận. Một ảnh riêng lẻ chưa cho biết thời điểm mọi dấu vết hình thành.', 'Read the date and caption before drawing conclusions. One image cannot date every surface feature.') },
    ],
  },
];

/** Chronology for the reading edition, independent of discovery order in the game. */
export const pdfStoryOrder = [
  'surveyor-reality', 'photo-arrive', 'surveyor-landing-story', 'surveyor-b01',
  'photo-work', 'surveyor-observations', 'photo-visit', 'surveyor-return-story', 'clue-visit-reality',
  'lap-lanh-reality', 'apollo-deployment-story', 'sparkle-photo-1', 'sparkle-photo-0',
  'sparkle-repair-clue-reality', 'sparkle-repair-clue', 'apollo-reading-light',
  'sparkle-ranging-clue', 'apollo-measurements-story',
  ...restoredReadingOrder,
  'gac-book-orbit', 'lro-reading-images', 'lro-apollo-story',
  'gac-memory-lap-lanh', 'gac-memory-surveyor', 'gac-memory-tai-thinh', 'gac-memory-ban-banh-luoi', 'gac-book-impact', 'gac-book-impact.story',
  'lro-impact-story', 'gac-book-light',
  'surveyor-notebook', 'surveyor-notebook-visit', 'apollo-notebook', 'lro-notebook', 'lro-notebook-mapping',
];

export const pdfText: Readonly<Record<string, BookText>> = {
  'surveyor-return-story.paragraph-2': text('Họ không mang cả tàu về. Máy ảnh, xẻng cùng một số đoạn cáp và ống được tháo để trở về Trái Đất; phần còn lại vẫn ở bãi đáp. Những bộ phận trở về giúp nghiên cứu vật liệu thay đổi ra sao sau thời gian dài trên Mặt Trăng. Không còn làm việc ở đó, chúng tiếp tục được quan sát trong phòng thí nghiệm.', 'They did not bring the whole lander home. Its camera, scoop and selected cable and tubing sections returned to Earth; the remaining structure stayed at the landing site. Returned parts helped researchers study material changes after prolonged lunar exposure. They continued to provide evidence in the laboratory.'),
  'sparkle-repair-clue-reality.photo': text('Sơ đồ 100 lăng kính, nhìn từ trên; không theo tỉ lệ. Minh họa dựa trên NASA/ILRS.', 'Top-view diagram of 100 prisms; not to scale. Illustration based on NASA/ILRS.'),
  'surveyor-b01.tools': text('Máy ảnh của Surveyor 3 gửi về hình ảnh mặt đất quanh tàu. Chiếc xẻng trên cánh tay đào và thử đất, để lại những rãnh nhỏ. Ảnh do phi hành gia chụp năm 1969 vẫn cho thấy các rãnh có từ năm 1967. Những phép thử giúp tìm hiểu lớp đất mà tàu Apollo sẽ đáp xuống.', 'Surveyor 3’s camera returned pictures of the ground around the lander. Its scoop dug and tested the soil, leaving small trenches. Astronaut photographs from 1969 still show the trenches made in 1967. These tests helped investigate the ground where Apollo would land.'),
  'photo-arrive.photo': text('Tháng 4 năm 1967, Surveyor 3 đến Mặt Trăng. Tàu tự chụp lại phần chân của mình sau khi chạm đất.', 'In April 1967, Surveyor 3 reached the Moon. The lander photographed its own footpad after touching down.'),
  'photo-work.photo': text('Surveyor 3 dùng xẻng đào rãnh để tìm hiểu đất. Ảnh do phi hành gia chụp năm 1969 cho thấy những rãnh có từ năm 1967.', 'Surveyor 3 dug trenches to investigate the soil. This astronaut photograph from 1969 shows trenches made in 1967.'),
  'photo-visit.photo': text('Tháng 11 năm 1969, Pete Conrad và Alan Bean đến thăm Surveyor 3. Họ mang máy ảnh, đầu xẻng cùng một số bộ phận về Trái Đất để nghiên cứu.', 'In November 1969, Pete Conrad and Alan Bean visited Surveyor 3. They brought its camera, scoop and selected parts back to Earth for study.'),
  'sparkle-photo-1.photo': text('Buzz Aldrin đặt bảng phản xạ tại Biển Yên Tĩnh năm 1969. Trong ảnh, bảng vẫn gấp lại. Sau đó Neil Armstrong mở và căn chỉnh bảng.', 'Buzz Aldrin placed the reflector in the Sea of Tranquility in 1969. It is still folded in this photograph. Neil Armstrong later opened and aligned it.'),
  'sparkle-photo-0.photo': text('Neil Armstrong mở và căn chỉnh bảng phản xạ năm 1969. Một trăm lăng kính sẵn sàng phản xạ ánh sáng từ Trái Đất về phía nguồn.', 'Neil Armstrong opened and aligned the reflector in 1969. One hundred prisms were ready to reflect light from Earth back towards its source.'),
  'gac-memory-lap-lanh.story': text('Ảnh quỹ đạo cho thấy khu hạ cánh Apollo 11 ở Biển Yên Tĩnh. Chú thích giúp nhận ra vị trí thiết bị, dù không thấy rõ từng lăng kính.', 'This orbital picture shows Apollo 11’s landing site in the Sea of Tranquility. Labels identify instrument locations, although individual prisms cannot be seen.'),
  'gac-memory-surveyor.story': text('Conrad đứng bên Surveyor 3 trên bề mặt Mặt Trăng. Góc nhìn gần này bổ sung cho những ảnh chụp cả bãi đáp từ quỹ đạo.', 'Conrad stands beside Surveyor 3 on the lunar surface. This close view complements orbital pictures of the wider landing site.'),
  'gac-book-map.observations': text('Bản đồ chiếu sáng cực nam này được tạo từ nhiều ảnh LROC. Một mô hình với ba hướng nắng chỉ giúp hiểu cách thành hố che ánh sáng; ba lần quan sát chưa đủ để xác định vùng tối vĩnh viễn.', 'This south pole illumination map was made from many LROC images. A model with three sunlight directions can illustrate how crater walls block light; three observations cannot establish permanent shadow.'),
  'lro-apollo-story.paragraph-2': text('NASA ghi lại một đợt điều chỉnh quỹ đạo năm 2011 để LRO đi gần bề mặt hơn khi quan sát một số bãi đáp. Bức ảnh là kết quả của việc lựa chọn vị trí quan sát và công việc vận hành một con tàu thật.', 'NASA recorded a 2011 orbital adjustment that brought LRO closer to the surface to observe selected landing sites. Each picture reflects a choice of viewpoint and the work of operating a real spacecraft.'),
  'lro-apollo-story.paragraph-3': text('Hãy nhớ ảnh phi hành gia đứng cạnh Surveyor 3 ở chương đầu. Đứng bên tàu và nhìn cả bãi đáp từ trên cao là hai góc nhìn khác nhau. Mỗi kiểu ảnh trả lời tốt hơn cho một nhóm câu hỏi.', 'Recall the astronaut beside Surveyor 3 in the first chapter. Standing beside a lander and viewing a landing site from orbit offer different perspectives. Each answers a different set of questions.'),
  'lro-impact-story.paragraph-1': text('Ngày 17 tháng 3 năm 2013, một chớp sáng trên Mặt Trăng được quan sát từ Trái Đất. Sau đó, ảnh LRO giúp xác định một hố mới khoảng 18 mét. Mặt Trăng vẫn thay đổi do va chạm tự nhiên.', 'A flash on the Moon was observed from Earth on 17 March 2013. Later LRO images helped identify a new crater about 18 metres wide. Natural impacts continue to change the Moon.'),
  'lro-impact-story.paragraph-3': text('Chớp sáng quan sát từ Trái Đất và ảnh bề mặt từ quỹ đạo là hai loại bằng chứng. Ghép chúng lại giúp câu chuyện có cơ sở hơn. Vòng khoanh trên ảnh có chú thích là dấu thêm vào để hướng dẫn người đọc, không phải dấu trên Mặt Trăng.', 'A flash seen from Earth and an orbital surface image are different kinds of evidence. Combining them supports an explanation. Circles on annotated images guide readers; they are not markings on the Moon.'),
};

export const pdfTitles: Readonly<Record<string, BookText>> = {
  'gac-book-impact': text('Từ chớp sáng tới chiếc hố', 'From a flash to a crater'),
  'photo-arrive': text('Dấu chân Surveyor 3', 'Surveyor 3’s footpad'),
  'photo-work': text('Những rãnh khảo sát', 'Soil-test trenches'),
  'photo-visit': text('Chuyến thăm của Apollo 12', 'Apollo 12’s visit'),
  'surveyor-b01': text('Máy ảnh và chiếc xẻng', 'A camera and a scoop'),
  'sparkle-photo-1': text('Bảng phản xạ còn gấp', 'The folded reflector'),
  'sparkle-photo-0': text('Sẵn sàng đón ánh sáng', 'Ready to receive light'),
  'sparkle-repair-clue': text('Ánh sáng đổi hướng', 'Light changes direction'),
  'sparkle-ranging-clue': text('Đo một chuyến đi và về', 'Measuring a round trip'),
  'gac-memory-lap-lanh': text('Nhìn bãi đáp Apollo 11 từ xa', 'Apollo 11’s site from orbit'),
  'gac-memory-surveyor': text('Một góc nhìn gần Surveyor 3', 'A close view of Surveyor 3'),
  'gac-book-map': text('Bản đồ ánh sáng cực nam', 'Mapping south polar illumination'),
};

/** Adjacent source pages form one reading article, without changing their IDs. */
export const pdfArticleGroups: readonly (readonly string[])[] = [
  ['surveyor-b01', 'photo-work'],
  ['surveyor-return-story', 'clue-visit-reality'],
  ['sparkle-repair-clue-reality', 'sparkle-repair-clue'],
  ['gac-book-impact', 'gac-book-impact.story', 'lro-impact-story'],
];
/** Repeated passages integrated into the named block; citations remain on the article. */
export const pdfIntegratedBlocks: Readonly<Record<string, string>> = {
  'photo-work.photo': 'surveyor-b01.tools',
  'clue-visit-reality.body-0': 'surveyor-return-story.paragraph-2',
  'gac-book-impact.story.crater': 'lro-impact-story.paragraph-1',
};
