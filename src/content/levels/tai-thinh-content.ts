import type { Language } from '../i18n';
import type { StoryLine } from '../earth-dialogue';
import { taiThinhPhotos } from '../assets';

// Authored M0 content, not a registered/playable level yet. Sources: docs/game3/Tu-lieu.md.
const text = (vi: string, en: string) => ({ vi, en });
const line = (id: string, speaker: StoryLine['speaker'], vi: string, en: string) => ({ id: `tai-thinh-${id}`, speaker, ...text(vi, en) });

export const taiThinhIdentity = {
  id: 'tai-thinh', chapter: '03', scene: '05',
  name: text('Tai Thính', 'Keen Ears'),
  subtitle: text('Bí mật những rung động của Mặt Trăng', 'The Moon’s quiet tremors'),
  location: text('Đại Dương Bão · Apollo 12', 'Ocean of Storms · Apollo 12'),
} as const;

export const taiThinhScript = {
  route: [
    line('route-01', 'narrator', 'Mang theo hai cánh sao sáng, Cuội rời Biển Yên Tĩnh. Ánh đèn dẫn chú qua những miền đất xa.', 'With two star points shining, Cuội leaves the Sea of Tranquility. His lantern guides him across distant lands.'),
    line('route-02', 'narrator', 'Ở Đại Dương Bão, ánh sáng dừng lại bên một cụm thiết bị. Một hòn sỏi khẽ rung rinh.', 'In the Ocean of Storms, the light rests beside a group of instruments. A little pebble trembles.'),
    line('route-03', 'cuoi', 'Nơi này yên tĩnh quá… Hình như có ai đang gọi mình?', 'It is so quiet here… Is someone calling me?'),
  ],
  arrival: [
    line('arrival-01', 'narrator', 'Cuội lần theo những gợn rung mờ trên mặt đất. Một giọng nói nhỏ cất lên giữa các thiết bị.', 'Cuội follows faint ripples across the ground. A soft voice comes from among the instruments.'),
    line('arrival-02', 'taiThinh', 'Suỵt… Bạn bước nhẹ thôi nhé. Mình đang lắng nghe.', 'Shh… Gentle steps, please. I am listening.'),
    line('arrival-03', 'cuoi', 'Mình là Cuội. Bạn nào đang nghe những rung động dưới chân mình vậy?', 'I am Cuội. Which of you is listening to the tremors beneath my feet?'),
  ],
  meeting: [
    line('meeting-01', 'taiThinh', 'Bạn tìm thấy mình rồi. Mình là Tai Thính, một địa chấn kế của Apollo 12.', 'You found me. I am Keen Ears, an Apollo 12 seismometer.'),
    line('meeting-02', 'taiThinh', 'Mình đo những chuyển động rất nhỏ của mặt đất. Tấm phủ bạc giúp giữ nhiệt độ quanh mình ổn định hơn.', 'I measure tiny movements of the ground. My silver blanket helps keep the temperature around me steadier.'),
    line('meeting-03', 'taiThinh', 'Mình còn giữ một bức ảnh ngày các phi hành gia đặt mình ở đây. Cuội cất giúp mình nhé?', 'I have a photograph from the day the astronauts placed me here. Will you keep it, Cuội?'),
  ],
  recordsIntro: [
    line('records-01', 'taiThinh', 'Mình muốn kể một câu chuyện… nhưng những thẻ chú giải trong cuốn sổ kỷ niệm của mình bị lẫn rồi.', 'I would like to tell a story… but the note cards in my memory book are mixed up.'),
    line('records-02', 'cuoi', 'Mình cùng xem từng manh mối nhé. Mỗi bản ghi đang kể điều gì?', 'Let us look at each clue together. What does each record tell us?'),
    line('records-03', 'taiThinh', 'Nhìn đường sóng thôi chưa đủ đâu. Mình cần cả những ghi chú đi cùng nữa.', 'The wave shape alone is not enough. We need the notes that go with it, too.'),
  ],
  afterRecords: [
    line('after-records-01', 'taiThinh', 'Các nhãn đã về đúng chỗ rồi! Có rung động từ lòng Trăng, từ vật rơi xuống, và cả tín hiệu cần kiểm tra.', 'The labels are back in place! Some tremors come from inside the Moon, some from impacts, and some signals need checking.'),
    line('after-records-02', 'taiThinh', 'Đây là bức ảnh cả khu làm việc. Trạm trung tâm giúp chuyển những điều mình đo được về Trái Đất.', 'Here is a photograph of our work site. The central station helped send my measurements to Earth.'),
  ],
  ringingIntro: [
    line('ringing-01', 'taiThinh', 'Ngày 20 tháng 11 năm 1969, khi các phi hành gia đã trở về tàu mẹ, tầng bay lên của tàu đổ bộ được cho va xuống Mặt Trăng.', 'On 20 November 1969, after the astronauts returned to the command module, the lunar module’s ascent stage was sent into the Moon.'),
    line('ringing-02', 'taiThinh', 'Cú va chạm đã dứt, nhưng bản ghi còn tiếp tục rất lâu. Cuội tìm giúp mình đường sóng ấy nhé?', 'The impact was over, but the record continued for a long time. Can you find that wave trace, Cuội?'),
  ],
  afterRinging: [
    line('after-ringing-01', 'taiThinh', 'Đúng rồi. Rung động mạnh dần, rồi mới yếu đi rất chậm. Người ta kể rằng nó kéo dài hơn 55 phút.', 'That is right. The tremors grew stronger, then faded very slowly. They have been described as lasting more than 55 minutes.'),
    line('after-ringing-02', 'taiThinh', 'Những lớp đá nứt vỡ làm sóng đổi hướng nhiều lần, còn năng lượng mất đi chậm. Vì vậy bản ghi kéo dài.', 'Fractured rock scatters the waves again and again, while their energy fades slowly. That makes the record last.'),
    line('after-ringing-03', 'cuoi', 'Thì ra “ngân vang” ở đây là mặt đất còn rung, chứ không phải tiếng chuông bay qua khoảng không!', 'So “ringing” means the ground is still shaking, not a bell sound travelling through space!'),
  ],
  rhythmIntro: [
    line('rhythm-01', 'taiThinh', 'Còn một bức ảnh mình cất sau cánh cửa ký ức. Trong câu chuyện này, cửa chỉ mở khi tìm đúng nhịp.', 'There is one more photograph behind my memory door. In this story, it opens when we find the matching rhythm.'),
    line('rhythm-02', 'cuoi', 'Hai nhịp gần nhau… nghỉ một chút… rồi thêm một nhịp. Mình sẽ quan sát thật kỹ.', 'Two beats close together… a little pause… then one more beat. I will watch carefully.'),
  ],
  afterRhythm: [
    line('after-rhythm-01', 'taiThinh', 'Cửa mở rồi! Bức ảnh cuối có cả người bạn đo từ trường. Mỗi thiết bị có một công việc riêng.', 'The door is open! The last photograph shows our magnetometer friend. Each instrument had its own job.'),
    line('after-rhythm-02', 'cuoi', 'Ba bức ảnh đã ở trong sách rồi. Giờ mình sẵn sàng nghe câu chuyện của bạn.', 'All three photographs are in the book. I am ready to hear your story.'),
  ],
  memoriesIntro: [
    line('memories-01', 'taiThinh', 'Cảm ơn Cuội đã kiên nhẫn với những điều nhỏ bé. Mình kể từ ngày đầu nhé.', 'Thank you for being patient with the little things, Cuội. Let me start with the first day.'),
  ],
  farewell: [
    line('farewell-01', 'taiThinh', 'Ngày 30 tháng 9 năm 1977, hệ thống ALSEP kết thúc hoạt động. Mình nghỉ lại trên Mặt Trăng.', 'On 30 September 1977, the ALSEP stations were switched off. I stayed here on the Moon.'),
    line('farewell-02', 'cuoi', 'Vậy những điều bạn ghi lại có còn không?', 'Are the things you recorded still there?'),
    line('farewell-03', 'taiThinh', 'Vẫn còn trong kho dữ liệu trên Trái Đất. Hôm nay, mình lại có một người bạn lắng nghe câu chuyện.', 'They are still in archives on Earth. And today, I have a friend to listen to my story.'),
    line('farewell-04', 'cuoi', 'Mình nhớ bạn rồi, Tai Thính. Mình sẽ mang câu chuyện của bạn đi cùng.', 'I will remember you, Keen Ears. I will carry your story with me.'),
    line('farewell-05', 'taiThinh', 'Cảm ơn bạn. Mong cánh sao này soi sáng chặng đường Cuội đi tìm chị Hằng.', 'Thank you. May this star point light your way as you search for Hằng.'),
    line('farewell-06', 'cuoi', 'Cánh sao thứ ba sáng rồi! Có những câu chuyện chỉ cần mình dừng lại và lắng nghe.', 'The third star point is shining! Some stories just need us to pause and listen.'),
  ],
} as const;

export type TaiThinhScriptId = keyof typeof taiThinhScript;
export const taiThinhDialogue = (language: Language, group: TaiThinhScriptId): StoryLine[] =>
  taiThinhScript[group].map(row => ({ id: row.id, speaker: row.speaker, text: row[language] }));

export const taiThinhDevices = [
  { id: 'pse', label: text('Thiết bị A', 'Instrument A'), name: text('Địa chấn kế PSE', 'PSE seismometer'),
    clue: text('Thân thấp, có tấm phủ bạc trải quanh chân. Mình cảm nhận chuyển động rất nhỏ của mặt đất.', 'A low body with a silver blanket around its base. I sense tiny movements of the ground.'),
    wrong: text('Hãy tìm thiết bị cảm nhận chuyển động của mặt đất.', 'Look for the instrument that senses ground movement.') },
  { id: 'station', label: text('Thiết bị B', 'Instrument B'), name: text('Trạm trung tâm', 'Central station'),
    clue: text('Chiếc hộp có cột ăng-ten cao. Mình nhận lệnh và gửi dữ liệu giữa các thiết bị với Trái Đất.', 'A box with a tall antenna mast. I receive commands and relay data between the instruments and Earth.'),
    wrong: text('Ăng-ten giúp gửi dữ liệu. Ai mới là người đo rung động?', 'The antenna helps send data. Which instrument measures tremors?') },
  { id: 'magnetometer', label: text('Thiết bị C', 'Instrument C'), name: text('Máy đo từ trường', 'Magnetometer'),
    clue: text('Ba cần vươn ra, mỗi đầu có một bộ cảm biến. Mình nghiên cứu từ trường quanh đây.', 'Three arms extend out, each with a sensor at its tip. I study the magnetic field here.'),
    wrong: text('Ba cảm biến này nghiên cứu từ trường. Hãy xem lại công dụng của hai bạn còn lại.', 'These three sensors study magnetic fields. Check what the other two instruments do.') },
] as const;

export const taiThinhRecords = [
  { id: 'inside', answer: 'moonquake', waveform: 'emergent', title: text('Bản ghi A', 'Record A'),
    clue: text('Ghi chú nghiên cứu: nguồn rung được xác định ở bên trong Mặt Trăng; không có vật rơi xuống trong tình huống này.', 'Research note: the source is located inside the Moon; nothing hits the surface in this example.'),
    feedback: text('Nguồn rung ở trong Mặt Trăng: đây là động đất Mặt Trăng.', 'The source is inside the Moon: this is a moonquake.') },
  { id: 'impact', answer: 'meteoroid', waveform: 'impact', title: text('Bản ghi B', 'Record B'),
    clue: text('Ghi chú tình huống: một mảnh đá từ không gian va xuống bề mặt, làm đất rung lên.', 'Scenario note: a rock from space hits the surface and makes the ground shake.'),
    feedback: text('Vật từ không gian va xuống: đây là va chạm thiên thạch.', 'An object from space hits the surface: this is a meteoroid impact.') },
  { id: 'electronics', answer: 'noise', waveform: 'square', title: text('Bản ghi C', 'Record C'),
    clue: text('Ghi chú kỹ thuật: các xung có độ cao đều nhau. Nhóm nghiên cứu nghi ngờ phần điện tử chuyển đổi dữ liệu và cần kiểm tra thêm.', 'Technical note: the pulses have equal heights. Researchers suspect the data-conversion electronics and need to investigate.'),
    feedback: text('Đây là tín hiệu nghi nhiễu điện tử, cần kiểm tra trước khi coi là rung động của đất.', 'This is suspected electronic noise. It needs checking before being treated as ground motion.') },
] as const;

export const taiThinhRecordLabels = [
  { id: 'moonquake', label: text('Động đất Mặt Trăng', 'Moonquake') },
  { id: 'meteoroid', label: text('Va chạm thiên thạch', 'Meteoroid impact') },
  { id: 'noise', label: text('Nhiễu cần kiểm tra', 'Noise to investigate') },
] as const;

// Absolute beat starts in milliseconds. A is 3 evenly spaced beats; B matches;
// C has only 2 beats. The same data must drive animation, marks and narration.
export const taiThinhRhythm = {
  sample: [0, 500, 1800],
  options: [
    { id: 'a', beats: [0, 900, 1800], description: text('Ba nhịp cách đều nhau.', 'Three evenly spaced beats.') },
    { id: 'b', beats: [0, 500, 1800], description: text('Hai nhịp gần nhau, nghỉ dài, một nhịp.', 'Two close beats, a long pause, one beat.') },
    { id: 'c', beats: [0, 1800], description: text('Một nhịp, nghỉ dài, một nhịp.', 'One beat, a long pause, one beat.') },
  ],
  correct: 'b', pulseMs: 220, durationMs: 2500,
} as const;

export const taiThinhTaskCopy = {
  t01: { title: text('Ai đang lắng nghe?', 'Who is listening?'), goal: text('Tìm thiết bị đo rung động của mặt đất.', 'Find the instrument that measures ground movement.') },
  t02: { title: text('Tai Thính đã nghe thấy gì?', 'What did Keen Ears detect?'), goal: text('Đọc manh mối rồi ghép ba bản ghi với nhãn.', 'Read the clues, then match each record to a label.') },
  t03: { title: text('Vì sao Mặt Trăng ngân vang?', 'Why does the Moon ring?'), goal: text('Chọn bản ghi tiếp tục lâu sau cú va chạm.', 'Choose the record that continues long after impact.') },
  t04: { title: text('Cánh cửa của những rung động', 'The door of rhythms'), goal: text('Tìm phiến đá có nhịp giống mẫu.', 'Find the stone whose rhythm matches the sample.') },
  graphOptions: [text('A · Tắt nhanh', 'A · Fades quickly'), text('B · Tăng dần rồi tắt chậm', 'B · Builds, then fades slowly')],
  durationOptions: [text('Vài giây', 'A few seconds'), text('Hơn 55 phút', 'More than 55 minutes'), text('Nhiều ngày', 'Many days')],
  correctGraph: 1, correctDuration: 1,
  graphNote: text('Minh họa, cùng thang 0–60 phút; không phải bản ghi NASA. Hoạt ảnh được tua nhanh.', 'Illustration, shared 0–60 minute scale; not NASA data. Animation is sped up.'),
  recordNote: text('Bản ghi minh họa. Cần đọc cả manh mối, không chỉ nhìn đường sóng.', 'Illustrated records. Read the clues as well as the wave shapes.'),
  graphWrong: text('Hãy xem đường nào vẫn còn rung sau mốc 55 phút.', 'Look for the trace that is still moving after 55 minutes.'),
  durationWrong: text('Bản ghi kéo dài gần một giờ. Hãy đối chiếu mốc 55 phút.', 'The record lasts nearly an hour. Compare it with the 55-minute mark.'),
  recordWrong: text('Nhãn chưa khớp. Nguồn rung ở trong Trăng, từ vật rơi xuống, hay nghi do phần điện tử?', 'That label does not fit. Is the source inside the Moon, an impact, or suspected electronics?'),
  rhythmWrong: text('Hãy đếm hai nhịp gần nhau, khoảng nghỉ dài, rồi nhịp cuối.', 'Count two close beats, a long pause, then the final beat.'),
  rhythmDescription: text('Hai nhịp gần nhau — nghỉ dài — một nhịp.', 'Two close beats — long pause — one beat.'),
  fiction: text('Cuội, lời nói của thiết bị và cánh cửa ký ức thuộc câu chuyện tưởng tượng.', 'Cuội, the talking instruments and the memory door belong to the imagined story.'),
  inspect: text('Xem manh mối', 'Inspect clue'), confirm: text('Chọn thiết bị này', 'Choose this instrument'),
  hint: text('Gợi ý', 'Hint'), sample: text('Xem nhịp mẫu', 'Watch the sample'),
  replayRhythm: text('Xem lại nhịp', 'Replay rhythm'), choose: text('Chọn nhịp này', 'Choose this rhythm'),
  keepPhoto: text('Cất ảnh và tiếp tục', 'Keep the photo and continue'),
  next: text('Tiếp tục', 'Continue'), back: text('Trang trước', 'Previous page'),
  replayEnding: text('Xem lại đoạn kết', 'Replay the ending'), playAgain: text('Chơi lại', 'Play again'), route: text('Về lộ trình', 'View the route'),
  photoError: text('Chưa tải được ảnh tư liệu.', 'The archive photograph could not load.'), retry: text('Tải lại ảnh', 'Retry photo'),
  stageAlt: text('Cảnh Đại Dương Bão: Cuội bên trái, PSE ở giữa, trạm trung tâm phía sau và máy đo từ trường bên phải.', 'Ocean of Storms scene: Cuội on the left, PSE in the centre, central station behind, magnetometer on the right.'),
} as const;

export const taiThinhMemories = [
  { id: 'pse', code: 'AS12-47-6916', date: '1969-11-19', credit: 'NASA · Alan Bean', src: taiThinhPhotos.pse, receiveAfter: 't01',
    title: text('Tấm phủ bạc của Tai Thính', 'Keen Ears’ silver blanket'),
    caption: text('PSE và lớp phủ cách nhiệt · Apollo 12 · 19/11/1969.', 'PSE and its thermal skirt · Apollo 12 · 19 November 1969.'),
    receipt: text('Ngày các phi hành gia đặt mình xuống, tấm phủ bạc đã được trải quanh chân để hạn chế nhiệt độ thay đổi.', 'When the astronauts placed me here, they spread a silver blanket around my base to reduce temperature changes.'),
    recall: text('Ngày 19 tháng 11 năm 1969, các phi hành gia Apollo 12 đặt mình ở Đại Dương Bão. Mình bắt đầu đo những rung động rất nhỏ.', 'On 19 November 1969, the Apollo 12 astronauts placed me in the Ocean of Storms. I began measuring tiny tremors.'),
    alt: text('Địa chấn kế PSE hình trụ thấp, với tấm phủ bạc nhăn trải rộng trên mặt đất.', 'A low cylindrical PSE seismometer with a wide crinkled silver thermal blanket on the ground.') },
  { id: 'station', code: 'AS12-47-6918', date: '1969-11-19', credit: 'NASA · Alan Bean', src: taiThinhPhotos.station, receiveAfter: 't02',
    title: text('Những người bạn cùng làm việc', 'Working together'),
    caption: text('PSE phía trước, trạm trung tâm phía sau · 19/11/1969.', 'PSE in front, central station behind · 19 November 1969.'),
    receipt: text('Mình ở phía trước, trạm trung tâm ở phía sau. Chúng mình làm những công việc khác nhau trong cùng khu ALSEP.', 'I am in front and the central station is behind me. We did different jobs at the same ALSEP site.'),
    recall: text('Trong buổi triển khai ấy, trạm trung tâm và các thiết bị được nối với nhau. Những phép đo được gửi về Trái Đất để mọi người nghiên cứu.', 'During deployment, the central station and instruments were connected. Measurements were sent to Earth for scientists to study.'),
    alt: text('PSE với tấm phủ bạc ở tiền cảnh; trạm trung tâm ALSEP tách riêng ở phía sau.', 'The PSE and silver skirt in the foreground, with the separate ALSEP central station behind.') },
  { id: 'magnetometer', code: 'AS12-47-6921', date: '1969-11-19', credit: 'NASA · Alan Bean', src: taiThinhPhotos.magnetometer, receiveAfter: 't04',
    title: text('Mỗi bạn một công việc', 'A different job for each friend'),
    caption: text('Máy đo từ trường phía trước; Pete Conrad lắp ăng-ten phía sau · 19/11/1969.', 'Magnetometer in front; Pete Conrad fitting the antenna behind · 19 November 1969.'),
    receipt: text('Ba cần ở phía trước thuộc máy đo từ trường. Phía sau, chú Pete Conrad đang lắp ăng-ten cho trạm trung tâm.', 'The three arms in front belong to the magnetometer. Behind it, Pete Conrad is fitting the central station’s antenna.'),
    recall: text('Sau đó, máy đo từ trường đã được triển khai và chú Pete lắp ăng-ten. Ngày hôm sau, mình ghi nhận rung động kéo dài từ cú va chạm của tầng bay lên Apollo 12.', 'Later, the magnetometer was deployed and Pete fitted the antenna. The next day, I recorded the long-lasting tremors from the Apollo 12 ascent stage’s impact.'),
    alt: text('Máy đo từ trường có ba cần ở tiền cảnh; phi hành gia Pete Conrad đứng bên trạm trung tâm ở phía xa.', 'A three-armed magnetometer in the foreground, with astronaut Pete Conrad at the distant central station.') },
] as const;

// Stable page identities; insert photos by id rather than persisting page indexes.
export const taiThinhBook = [
  { id: 'intro', unlock: 'chapter', title: text('Tiếng gọi từ lòng đất', 'A call from the ground'), body: text('Đại Dương Bão là một vùng đồng bằng trên Mặt Trăng. Tai Thính là địa chấn kế PSE của Apollo 12, được triển khai ngày 19/11/1969.', 'The Ocean of Storms is a lunar plain. Keen Ears is the Apollo 12 PSE seismometer, deployed on 19 November 1969.') },
  { id: 'devices', unlock: 't01', title: text('Ba thiết bị, ba công việc', 'Three instruments, three jobs'), body: text('Địa chấn kế đo chuyển động của đất. Trạm trung tâm nhận lệnh và gửi dữ liệu. Máy đo từ trường có cảm biến trên ba cần. Hãy đọc công dụng trước khi chọn.', 'A seismometer measures ground movement. The central station receives commands and sends data. A magnetometer has sensors on three arms. Read their jobs before choosing.') },
  { id: 'sensor', unlock: 't02', title: text('Lắng nghe bằng phép đo', 'Listening through measurements'), body: text('Địa chấn kế không có tai. Nó đo chuyển động rất nhỏ của đất và biến chúng thành tín hiệu. Các đường sóng trong trò chơi là minh họa, không phải dữ liệu NASA.', 'A seismometer has no ears. It measures tiny ground movements and turns them into signals. The game’s wave traces are illustrations, not NASA data.') },
  { id: 'sources', unlock: 't02', title: text('Nguồn rung ở đâu?', 'Where did it begin?'), body: text('Động đất Mặt Trăng bắt đầu ở bên trong Trăng. Đá từ không gian va xuống cũng làm đất rung. Muốn phân loại tín hiệu, cần cả ghi chú và phép đo khác.', 'Moonquakes begin inside the Moon. Rocks hitting it from space also shake the ground. Classifying a signal takes notes and other measurements, too.') },
  { id: 'noise', unlock: 't02', title: text('Không phải tín hiệu nào cũng là đất rung', 'Not every signal is a tremor'), body: text('Ngày 2/12/1969, Apollo 12 ghi nhận những xung đều nhau, được nghi là do phần điện tử. Nhà khoa học kiểm tra nhiễu trước khi kết luận. Hình sóng vuông tự nó chưa đủ chứng minh có lỗi.', 'On 2 December 1969, Apollo 12 recorded equal-height pulses suspected to come from electronics. Scientists check for noise before drawing conclusions. A square wave alone does not prove a fault.') },
  { id: 'impact', unlock: 't03', title: text('Một cú va chạm có chủ đích', 'A planned impact'), body: text('Ngày 20/11/1969, tầng bay lên của tàu đổ bộ Apollo 12 va xuống Mặt Trăng sau khi phi hành đoàn đã rời tàu. Tín hiệu mạnh dần trong khoảng 7–8 phút rồi suy giảm chậm.', 'On 20 November 1969, Apollo 12’s ascent stage hit the Moon after the crew had left it. The signal built for about 7–8 minutes, then faded slowly.') },
  { id: 'ringing', unlock: 't03', title: text('Vì sao bản ghi kéo dài?', 'Why does the record last?'), body: text('Nguồn lịch sử mô tả rung động kéo dài hơn 55 phút. Đá nứt vỡ làm sóng tán xạ, còn năng lượng suy giảm chậm. “Ngân vang” là cách ví von cho rung động của đất.', 'A historical account describes tremors lasting more than 55 minutes. Fractured rock scatters waves while their energy fades slowly. “Ringing” describes ground vibrations.') },
  { id: 'rhythm', unlock: 't04', title: text('Đếm nhịp và khoảng nghỉ', 'Beats and pauses'), body: text('Mẫu có hai nhịp gần nhau, nghỉ dài, rồi một nhịp. Có thể xem lại bao nhiêu lần cũng được. Cánh cửa ký ức thuộc truyện tưởng tượng; PSE thật không mở cửa bằng nhịp.', 'The sample has two close beats, a long pause, then one beat. Watch it as often as you like. The memory door is imaginary; the real PSE did not open doors with rhythms.') },
  { id: 'legacy', unlock: 'farewell', title: text('Những điều còn được lưu giữ', 'What remains'), body: text('Ngày 30/9/1977, hệ thống ALSEP ngừng hoạt động. Dữ liệu địa chấn Apollo vẫn có trong kho khoa học trên Trái Đất. Cuội mang theo lời hứa sẽ kể câu chuyện của Tai Thính.', 'The ALSEP stations were switched off on 30 September 1977. Apollo seismic data remain in scientific archives on Earth. Cuội promises to tell Keen Ears’ story.') },
] as const;

export const taiThinhBookSources: Record<typeof taiThinhBook[number]['id'], string | null> = {
  intro: 'https://apollojournals.org/alsj/a12/images12.html',
  devices: 'https://apollojournals.org/alsj/a12/images12.html',
  sensor: 'https://science.nasa.gov/moon/moonquakes/',
  sources: 'https://science.nasa.gov/moon/moonquakes/',
  noise: 'https://www.nasa.gov/wp-content/uploads/2025/11/a12-missionreport.pdf',
  impact: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html',
  ringing: 'https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html',
  rhythm: null,
  legacy: 'https://pds-geosciences.wustl.edu/missions/apollo/index.htm',
};
